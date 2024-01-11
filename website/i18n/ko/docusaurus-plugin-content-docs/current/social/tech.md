---
id: tech
title: 기술 문서
---

이 문서는 Near Social의 기술적 세부 사항에 대해 설명합니다.  
저는 먼저 [Near Social의 과거, 현재, 미래](https://thewiki.near.page/PastPresentAndFutureOfNearSocial)를 읽는 것을 추천합니다.

## SocialDB

컨트랙트는 다음 계정에 배포됩니다:
- NEAR 메인넷: `social.near`
- NEAR 테스트넷: `v1.social08.testnet`

소스 코드: [social-db](https://github.com/NearSocial/social-db)

### 데이터 구성

내부적으로, 컨트랙트는 트리 구조를 사용하여 데이터를 구성합니다. 트리의 각 노드는 `VNode` 구조(업그레이드 가능한 `Node`)로 표시됩니다. 노드는 키가 `NodeId(u32)`인 `LookupMap`에 저장됩니다. 루트 노드는 인덱스 `0`을 가지며 컨트랙트 상태로 별도로 저장됩니다.

`Node` 구조에는 다음 필드가 포함됩니다:
- `block_height` - 노드가 마지막으로 수정되었을 때의 블록 높이
- `children` - 순서가 지정되지 않은 키 값 맵.

`children` 맵의 키는 문자열이며 다음과 같은 제한이 있습니다:
- `a-z`, `A-Z`, `0-9`, `-`, `_`, `.`의 문자만 허용됩니다.
- 키는 최대 256자여야 합니다

값은 노드 인덱스, 문자열 값 또는 삭제된 값입니다. 문자열 값과 삭제된 값 모두 값이 마지막으로 수정되었을 때 블록 높이를 추가로 저장합니다. 빈 문자열 키의 값은 노드 인덱스일 수 없습니다. 이것은 나중에 설명할 특별한 경우입니다.

루트 노드의 자식은 사용자의 계정 ID이며 값은 항상 노드 인덱스입니다.

#### 빈 문자열 키의 경우

사용자가 데이터 겍체를 추가할 때는 존재하지 않는 새 노드가 트리에 추가됩니다. 하지만 잎 값이 원래 문자열이었다면 어땠을까요? 예를 들어 다음과 같은 데이터가 있습니다:

```json
{
  "alex.near": {
    "profile": {
      "name": "Alex"
    }
  }
}
```

사용자가 `set` 메서드를 호출하고 다음 데이터를 추가하려고 합니다:

```json
{
  "alex.near": {
    "profile": {
      "name": {
        "foo": "bar"
      }
    }
  }
}
```

이 경우 키 `name` 값은 노드로 변환되고, 이전 값은 이 노드 아래의 빈 키로 이동됩니다:

```json
{
  "alex.near": {
    "profile": {
      "name": {
        "": "Alex",
        "foo": "bar"
      }
    }
  }
}
```

이로 인해 구현이 더욱 복잡해지지만 컨트랙트에서 이전 값을 삭제하지 않고 데이터를 유지할 수 있습니다. 그러나 더 중요한 것은 사용자가 노드 인덱스를 잃지 않고 이미 노드에 있는 키의 값을 저장할 수 있다는 것입니다. 예를 들어, 사용자는 이미지를 객체로 저장합니다:

```json
{
  "alex.near": {
    "profile": {
      "image": {
        "url": "foo://bar",
        "nft": {
          "contract": "nft.near",
          "token_id": "1"
        }
      }
    }
  }
}
```

그런 다음 사용자가 이미지를 직렬화된 값으로 저장하려고 하면 다음 데이터를 사용하여 `set` 메서드를 호출합니다:

```json
{
  "alex.near": {
    "profile": {
      "image": "{ \"url\": \"foo://bar\" }"
    }
  }
}
```

키 `image`의 값이 이미 노드이므로 값은 빈 문자열 키 아래에 저장됩니다:

```json
{
  "alex.near": {
    "profile": {
      "image": {
        "": "{ \"url\": \"foo://bar\" }",
        "url": "foo://bar",
        "nft": {
          "contract": "nft.near",
          "token_id": "1"
        }
      }
    }
  }
}
```

빈 문자열 키 아래에 값을 저장하지 않으면 컨트랙트에서 노드에 대한 인덱스를 삭제하거나 트랜잭션을 실패해야 합니다. 두 상황 모두 바람직하지 않습니다.

### 계정 및 스토리지

컨트랙트는 계정 정보를 데이터와 별도로 저장합니다. 각 계정은 `VACcount` 구조(업그레이드 가능한 `Account`)로 표시됩니다. 계정은 루트 노드의 노드 인덱스와 일치하는 `NodeId(u32)` 키로 `LookupMap`에 저장됩니다.

`Account` 구조에는 다음 필드가 포함됩니다:
- `storage_balance` - 계정에 연결된 스토리지 토큰의 양
- `used_bytes` - 계정이 데이터 및 계정 정보를 저장하기 위해 사용한 바이트 수
- `permissions` - 계정에 대한 권한의 반복 가능한 맵

사용자는 저장하는 데이터의 스토리지 비용을 부담해야 합니다. 데이터를 재정의하는 경우 추가된 바이트에 대한 비용만 지불하면 됩니다. 데이터를 삭제하면 스토리지 보증금을 해제된 바이트 수만큼 돌려받습니다. 그런 다음 사용자는 보증금을 새 데이터로 재사용하거나 컨트랙트에서 철회할 수 있습니다.

### 권한

SocialDB 컨트랙트를 통해 사용자는 다른 계정이나 기타 공개 키에 데이터를 쓸 수 있는 권한을 부여할 수 있습니다. 사용 권한은 컨트랙트 상태에 저장되며 쓰기 액세스의 유효성을 검사하는 데 사용됩니다. 기본적으로 SocialDB 컨트랙트는 데이터에 쓰기 위해 NEAR에 최소 1개의 yoctoNEAR를 지불해야 합니다. 임의의 애플리케이션에 의해 SocialDB 컨트랙트에 액세스 키를 추가하는 단순한 사용자의 실수를 방지하여 애플리케이션이 사용자 데이터의 모든 필드에 쓸 수 있도록 합니다. 따라서 애플리케이션은 사용자 데이터의 특정 하위 트리에 대한 제한된 액세스 키를 화이트리스트에 추가할 수 있는 권한을 사용자에게 요청하거나 매번 지갑을 통해 트랜잭션에 서명할 수 있는 확인을 요청해야 합니다.

다른 유형의 권한은 다른 계정에 쓰기 액세스 권한을 부여하는 것입니다. 이것은 다른 스마트 컨트랙트에 사용자의 데이터에 쓸 수 있는 권한을 부여하는 데 사용되어야 합니다. 예를 들어, 사용자가 새로 만들어진 NFT에 업데이트를 게시할 수 있는 NFT 마켓플레이스 스마트 컨트랙트가 있습니다. 또는 소셜 네트워크 스마트 컨트랙트를 통해 사용자가 소셜 그래프에서 새로운 엣지를 만들 수 있습니다.

### SocialDB API

SocialDB 컨트랙트는 `get`, `set` 및 `keys`의 세 가지 데이터 메서드를 구현합니다. 또한 권한으로 작업하는 방법도 있습니다. 자세한 내용은 [SocialDB README](https://github.com/NearSocial/social-db#permissions)을 참조하세요.

#### 데이터 저장

객체의 최상위 키는 데이터가 저장되는 계정 ID여야 합니다. 이러한 계정은 기본 데이터에 대한 스토리지를 제공합니다.

predecessor_id 또는 서명자 공개 키에는 해당 키 아래에 쓸 수 있는 권한이 있어야 합니다. predecessor_id가 최상위 키와 일치하는 경우 권한이 있거나 최소 1 yoctoNEAR가 연결되어 있는 한 해당 키 아래에 모든 데이터를 쓸 수 있습니다.

첨부된 보증금은 첫 번째 키로 송금될 것입니다. 계정이 존재하지 않으면 계정이 생성됩니다(predecessor_id가 일치해야 함).

```rust
#[payable]
pub fn set(&mut self, data: Value);
```

인자:
- `data`는 저장할 객체입니다. 리프 값은 문자열 또는 null 값이어야 합니다. 문자열 값은 추가되고 null 값은 삭제됩니다.

예시:

```js
set({
  data: {
    "alex.near": {
      "profile": {
        "name": "Alex",
        "image": {
          "url": "https://gkfjklgdfjkldfg"
        }
      },
    }
  }
})

set({
  data: {
    "alex.near": {
      "graph": {
        "follow": {
          "root.near": "",
          "bob.near": "",
        }
      }
    }
  }
})
```

#### 데이터 읽기

지정된 키 패턴 목록에 대한 데이터를 반환합니다. 하나 이상의 경로 패턴을 인수로 사용하고 일치하는 데이터를 반환합니다. 경로 패턴은 와일드카드를 포함할 수 있는 문자열입니다. 예를 들어:
- `alice.near/profile/**`는 `alice.near` 계정의 전체 프로필 데이터와 일치합니다.
- `alice.near/profile/*`는 중첩된 객체를 제외하고 프로파일의 모든 필드와 일치합니다.
- `alice.near/profile/name`은 프로파일의 이름 필드와 일치합니다.
- `*/widget/*`는 모든 계정의 모든 구성 요소와 일치합니다.

```rust
pub struct GetOptions {
    pub with_block_height: Option<bool>,
    pub with_node_id: Option<bool>,
    pub return_deleted: Option<bool>,
}

pub fn get(self, keys: Vec<String>, options: Option<GetOptions>) -> Value;
```

인자:
- `keys` - 반환할 키 패턴 배열
- `options` - 옵션을 지정하는 선택적 인수입니다.

옵션:
- `with_block_height` - true이면 모든 값과 노드에 대해 `:block` 키를 사용하여 데이터의 블록 높이를 추가합니다.
- `with_node_id` - true이면 모든 노드에 대해 `:node` 키를 사용하여 노드 인덱스를 추가합니다.
- `return_deleted` - true이면 `null` 값을 가진 삭제된 키가 포함됩니다.

합쳐진 JSON 객체를 반환합니다.

예시:

```js
get({keys: ["alex.near/profile/name"]})

get({keys: ["alex.near/profile/name", "root.near/profile/name"]})

get({keys: ["alex.near/profile/name", "alex.near/profile/description"]})

get({keys: ["alex.near/profile/tags/*"]})

get({keys: ["alex.near/profile/**"]})

get({keys: ["*/widget/*"]})

get({keys: ["alex.near/profile/tags/*"], options: {return_deleted: true}})
```

#### 키 읽기

`keys` 메서드를 사용하면 경로 패턴과 일치하는 키 목록을 가져올 수 있습니다. 값을 읽지 않고 데이터를 쿼리할 때 유용합니다. 또한 반환 유형 및 삭제된 키를 반환할지 여부를 지정하는 데 사용할 수 있는 추가 `options` 필드도 있습니다. 예를 들어:
- `alice.near/profile/*`는 중첩된 객체를 제외하고 프로파일의 모든 필드 목록을 반환합니다.
- `*/profile/image/nft`는 프로필에 NFT 이미지가 있는 모든 계정의 목록을 반환합니다.
- `return_deleted` 옵션과 함께 `alice.near/message/*`는 삭제된 이름을 포함하여 계정의 모든 구성 요소 이름 목록을 반환합니다.
- `BlockHeight`과 같은 `return_type`과 함께 `alice.near/widget/*`는 계정의 모든 구성 요소 이름 목록을 반환하며 값은 위젯이 마지막으로 업데이트되었을 때의 블록 높이가 됩니다.
- 참고: `**`는 `keys` 메서드에서 지원되지 않습니다.

```rust
pub enum KeysReturnType {
    True,
    BlockHeight,
    NodeId,
}

pub struct KeysOptions {
    pub return_type: Option<KeysReturnType>,
    pub return_deleted: Option<bool>,
}

pub fn keys(self, keys: Vec<String>, options: Option<KeysOptions>) -> Value;
```

인자:
- `keys` - 반환할 키 패턴 배열
- `options` - 옵션을 지정하는 선택적 인수

옵션:
- `return_type` - 만약 `BlockHeight`라면: `true` 대신 키의 블록 높이를 반환하고, `NodeId`인 경우 `true` 대신 키의 노드 인덱스를 반환합니다.
- `return_message` - true이면 삭제된 키가 포함됩니다.

합쳐진 JSON 객체를 반환합니다.

예시:

```js
keys({keys: ["alex.near/profile/*"]})

keys({keys: ["*/profile/image/nft"]})

keys({keys: ["alex.near/widget/*"], options: {return_deleted: true}})

keys({keys: ["alex.near/widget/*"], options: {return_type: "BlockHeight"}})
```

## NEAR Social

이제 SocialDB 컨트랙트에 익숙해지셨으니, [near.social](https://near.social)로 들어가 보겠습니다.

### Near Social VM

Near Social VM은 구성 요소의 코드를 실행하는 가상 머신입니다. 구성요소를 안전한 방식으로 렌더링할 수 있는 샌드박스 환경입니다.

[ReactJS](https://reactjs.org/)에 익숙해지고 [React 튜토리얼](https://reactjs.org/tutorial/tutorial.html)을 거치는 것을 강력히 추천합니다. 구성 요소를 더 잘 사용하는 방법을 이해하는 데 도움이 될 것입니다.

구성 요소는 React 함수 구성 요소와 비슷하지만 함수 선언이 생략되어 있습니다. 예를 들어, 반응에 다음과 같이 적을 수 있습니다:
```js
function MyComponent(props) {
  return <div>Hello, {props.username}!</div>;
}
```

그러나 Near Social VM에는 다음 함수의 본문만 기록하면 됩니다:
```js
return <div>Hello, {props.username}!</div>;
```

참고하세요. 구성 요소는 동기식으로 실행되며, VM은 대기/비동기화 작업을 지원하지 않습니다. 대신 `fetch` 또는 `Social.get`과 같은 비동기 작업은 VM에서 내부적으로 처리되며 작업이 완료되면 VM이 구성 요소의 상태를 업데이트합니다. React의 `useEffect`를 `useState`와 결합하여 사용하는 것과 유사합니다.

일반적인 읽기 전용 구성 요소는 다음 부분으로 구성됩니다:
- **입력값 준비**. 예를 들면, 전달된 속성에서 데이터를 가져오거나 컨텍스트(예: 서명된 계정 ID)에서 데이터를 가져옵니다.
- **데이터 가져오기**. 예를 들면, SocialDB 컨트랙트로부터 데이터를 가져옵니다.
- **데이터 처리**. 예를 들면, 데이터 필터링, 정렬 등이 있습니다.
- **렌더링**. 예를 들면, React 컴포넌트를 사용하는 데이터를 렌더링합니다.

모든 컴포넌트가 SocialDB 컨트랙트에서 데이터를 가져와야 하는 것은 아닙니다. 일부 컴포넌트는 완전히 정적일 수 있습니다. 각 부분에 대해 알아보겠습니다.

#### 입력값 준비

React 컴포넌트와 유사하게 컴포넌트는 `props` 객체에서 입력을 받습니다. 컴포넌트가 다른 컴포넌트의 자식인 경우 부모 컴포넌트는 데이터를 자식 컴포넌트에 전달할 수 있습니다. props에는 데이터, 함수 또는 React 컴포넌트가 포함될 수 있습니다. 데이터는 컴포넌트에 전달된 데이터의 복사본이므로, 컴포넌트가 데이터를 변경해도 부모 컴포넌트에는 영향을 미치지 않습니다.

컴포넌트에 사용할 수 있는 다른 객체는 `context`입니다. 현재는 로그인한 사용자의 계정 ID 또는 `undefined`를 저장하는 단일 필드 `accountId`만 포함합니다.

입력을 준비하는 일반적인 예는 다음과 같습니다.
```js
const accountId = props.accountId ?? context.accountId;
```

#### 데이터 가져오기

사용 가능한 API 목록은 Near Social VM API 섹션을 참조하세요.

VM은 동기식이므로 처리하기 전에 가져와야 하는 모든 데이터를 예약해야 합니다. 그러면 모든 Promise가 병렬로 실행되고 Promise가 해결될 때마다 컴포넌트를 업데이트하여 다시 렌더링합니다.

데이터를 가져오거나 주어진 데이터를 렌더링하는 컴포넌트를 빌드할 수 있습니다. 예를 들어, `accountId`에 대한 프로필을 가져오거나 props에 전달된 `profile`을 사용하려고 한다고 해 봅시다.
```js
const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}
```

React 컴포넌트와 비교할 때 `Social.getr`는 훅(Hook)이 아니므로 언제든지 컴포넌트에서 값을 반환할 수 있습니다. 이 후에 더 많은 값들을 가져오더라도 상관없습니다.

`Social.getr`에서 반환한 값은 웹 세션 기간 동안 전역적으로 캐시되며 컴포넌트의 VM에서도 캐시됩니다. 따라서 동일한 키로 `Social.getr`를 여러 번 호출하면 즉시 동일한 값을 반환합니다.

#### 데이터 처리

이제 `profile` 객체를 가져왔습니다. 데이터를 처리하거나 일부 데이터를 추출해야 하는 경우가 있습니다.

예를 들어 프로필에서 이름을 가져오고 태그 목록을 추출하려고 합니다.
```js
const name = profile.name || "No-name profile";
const tags = Object.keys(profile.tags ?? {});
```

데이터 처리 비용이 많이 드는 경우 함수로 랩핑하여 데이터가 변경된 경우에만 호출하거나, `state` 내에 이를 캐싱해야 합니다. 이에 대해서는 나중에 논의하겠습니다.

#### 렌더링

이제 데이터를 렌더링할 준비가 되었습니다. 대부분의 React 컴포넌트를 사용하여 데이터를 렌더링할 수 있습니다. 그러나 다른 컴포넌트를 포함할 수도 있습니다. [near.social](https://near.social)은 사용자 지정 CSS 클래스 지정을 허용하지 않지만 표준 [부트스트랩 5](https://getbootstrap.com/docs/5.2/getting-started/introduction/) CSS 클래스를 제공합니다.

프로필 객체를 렌더링하고 태그 목록도 포함할 수 있습니다.
```js
return (
  <div className="d-inline-block">
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          accountId,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div className="d-inline-block" style={{ maxWidth: "16em" }}>
        <div className="text-truncate">
          {name}
        </div>
        <div className="d-flex">
          <div className="d-inline-block text-secondary text-truncate">
            @{accountId}
          </div>
        </div>
        {tags.length > 0 && (
          <div className="text-truncate">
            {tags.map((tag) => (
              <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  </div>
);
```

`Widget` 객체를 사용하여 다른 컴포넌트를 포함한다는 것을 알 수 있습니다.
```js
<Widget
  src="mob.near/widget/ProfileImage"
  props={{
    profile,
    accountId,
    className: "float-start d-inline-block me-2",
  }}
/>
```

`Widget` 컴포넌트는 `src` 및 `props` 매개변수를 사용합니다.
- `src`는 컴포넌트의 이름입니다. 이는 컴포넌트에 대한 전체 경로여야 합니다(예: `mob.near/widget/ProfileImage`).
- `props`: 컴포넌트에 전달될 props가 있는 객체입니다.

이 경우에는, `mob.near/widget/ProfileImage` 컴포넌트를 사용하여 프로필 이미지를 렌더링하고 `profile` 객체를 전달하므로 컴포넌트 입장에서 이를 다시 가져올 필요가 없습니다.

전체 소스는 [mob.near/widget/ProfileDocsExample](https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/ProfileDocsExample)에서 확인할 수 있습니다.

### 컴포넌트의 상태

React 컴포넌트와 유사하게 컴포넌트에는 상태가 있습니다. 그러나 `useState` 훅을 사용하여 만들 수 있는 여러 상태 객체 대신 컴포넌트에는 `state`이라는 단일 상태 객체가 있습니다.

`state`의 기본 값은 `undefined`이므로, `State.init` 또는 `State.update` 함수를 통해 초기화해야 합니다.

`State.init` 함수는 초기 상태 객체를 사용하며, 상태가 이미 초기화된 경우 작동하지 않습니다.

`State.update` 함수는 상태 업데이트를 트리거하고, 컴포넌트는 다시 렌더링됩니다. 또한 선택적으로 `Object.assign`를 사용하여 `state` 객체 에 추가되는 인자가 존재합니다.

상태가 초기화되면 `state` 객체의 속성을 직접 변경한 다음 `State.update()`를 호출하여 새 값으로 다시 렌더링하도록 트리거할 수 있습니다.

#### 제어되는 컴포넌트 (Controlled Components)

상태가 필요한 이유 중 하나는 입력 컴포넌트를 제어하기 위해서입니다. 예를 들어 계정 ID를 입력하기 위한 입력이 필요합니다. 계정 ID는 특정 문자(예: 대문자 제외)만 포함할 수 있으므로 사용자가 대문자를 입력하면 소문자로 변환하고 유효하지 않은 모든 문자를 제거하려고 합니다.

따라서 다음 컴포넌트를 만들 수 있습니다.
```js
State.init({ accountId: "" });

return (
  <input
    type="text"
    className="form-control"
    value={state.accountId}
    onChange={(e) => {
      const accountId = e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, "");
      State.update({ accountId });
    }}
  />
);
```

#### 캐싱 데이터 처리

상태가 필요한 또 다른 이유는 데이터를 캐시하기 위해서입니다. 예를 들어 광범위한 데이터를 가져와 처리하고 싶지만 다시 렌더링할 때마다 수행하지는 않습니다. 다음과 같이 할 수 있습니다.
```js
if (!state) {
  // Fetch the data and process it.
  const tags = fetchAndComputeTags();

  if (tags !== null) {
    State.init({ tags });
  }
}
```

[mob.near/widget/TagsEditor](https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/TagsEditor)에서 더 복잡한 데이터 처리 예제를 볼 수 있습니다.

### 데이터 커밋

컴포넌트는 데이터를 SocialDB에 커밋할 수 있습니다. 프로세스를 단순화하기 위해 사용자 지정 컴포넌트 `CommitButton`이 제공됩니다.

이 `CommitButton` 컴포넌트에는 다음과 같은 세 가지 커스텀 props가 있습니다.
- `data` - 커밋할 데이터입니다. 유효한 JSON 직렬화 가능 객체일 수 있습니다. 데이터는 `accountId` 접두사로 시작할 필요가 없으며, 자동으로 추가됩니다.
- `onClick` - 사용자가 버튼을 클릭할 때 호출되지만 커밋 대화 상자가 표시되기 전에 호출되는 콜백입니다.
- `onCommit` - 사용자가 데이터를 커밋할 때 호출되는 콜백입니다.

예를 들어 메모장 컴포넌트를 만들 수 있습니다. `experimental/note` 키에서 메모를 로드하고 편집한 다음 저장할 수 있습니다.
```js
const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const note = Social.get(`${accountId}/experimental/note`);

if (note === null) {
  return "Loading";
}

State.init({ note: note || "" });

return (
  <div>
    <div className="mb-2">
      <h4>Notepad</h4>
      <textarea
        type="text"
        rows={10}
        className="form-control"
        value={state.note}
        onChange={(e) => State.update({ note: e.target.value })}
      />
    </div>
    <CommitButton data={{ experimental: { note: state.note } }}>
      Save note
    </CommitButton>
  </div>
);
```

`CommitButton` 컴포넌트는 `data` 객체를 가져오고 사용자에게 이를 SocialDB에 커밋하라는 메시지를 표시합니다.

참고:

- 향후 커밋 작업을 사용할 수 있으므로 사용자가 `CommitButton`을 클릭할 필요가 없으며, 데이터가 자동으로 커밋될 수 있습니다.
- 이전에는 커밋 작업이 항상 서명을 위해 지갑으로 리디렉션되었으므로 캐시가 완전히 새로고침 되었습니다. 그러나 현재 커밋 버튼이 항상 지갑으로 리디렉션되는 것은 아니므로, 캐시가 항상 새로고침 되는 것은 아닙니다. 영향을 받는 캐시를 자동으로 무효화하는 솔루션을 개발 중이지만, 아직은 구현되지 않았습니다.



