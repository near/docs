---
id: social
title: Overview
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

At the core of NEAR social interactions there is the [SocialDB smart contract](https://github.com/NearSocial/social-db) (currently deployed at [social.near](https://nearblocks.io/address/social.near)).

NEAR provides a convenient API to get data from the SocialDB contract, composed by four methods:

- [`Social.get`](#socialget)
- [`Social.getr`](#socialgetr)
- [`Social.index`](#socialindex)
- [`Social.keys`](#socialkeys)
- [`Social.set`](#socialset)

---

## Social.get

`Social.get`은 `get`을 호출하여 SocialDB 컨트랙트에서 데이터를 가져오고 데이터를 반환합니다. 데이터를 가져오는 동안 반환된 값은 `null`과 같습니다.

:::note
경로 패턴이 단일 키인 경우 첫 번째 와일드카드까지 객체의 래핑을 해제합니다.
:::

메서드는 최대 3개의 인수를 사용합니다:

 | 매개변수       | 필수 여부  | 자료형               | 설명           |
 | ---------- | ------ | ----------------- | ------------ |
 | `patterns` | **필수** | string / string[] | 경로 패턴        |
 | `finality` | _선택사항_ | `"final"` / 숫자    | 블록 높이 또는 완결성 |
 | `options`  | _선택사항_ | 객체                | `options` 객체 |

:::info options 객체

- `subscribe` _(선택 사항)_: true이면 데이터가 5초마다 새로 고쳐집니다.
- `return_deleted` _(선택 사항)_: 삭제된 값을 (`null`로) 반환할지 여부를 나타냅니다. 기본값은 `false`입니다.

:::

블록 높이 또는 완결성을 사용하여 특정 블록 높이 또는 완결성에서 데이터를 가져올 수 있습니다. 블록 높이 또는 완결성이 지정되지 않은 경우 데이터는 최적의(`optimistic`) 완결성(최신 블록 높이) 으로 가져옵니다.

블록 높이 및 완결성 `final`을 위해, VM은 NEAR RPC를 직접 호출하는 대신 소셜 API 서버를 사용하여 데이터를 가져옵니다. Social API 서버는 SocialDB에 대한 데이터를 인덱싱하고 추가 옵션을 사용하여 모든 블록 높이에서 데이터를 가져올 수 있습니다. 또한 가스 제한에 의해 영향받지 않기 때문에 RPC 호출보다 더 많은 데이터를 반환할 수 있습니다. 일반적으로 API 서버는 가상 머신에서 컨트랙트 코드를 실행하지 않기 때문에 NEAR RPC보다 데이터를 더 빠르게 제공합니다.

`Social.get` 옵션은 SocialDB의 `get` API와 유사합니다.

#### 예시

예를 들어 경로 패턴이 `mob.near/widget/*`이면 `Social.get`은 객체 랩핑을 해제하고 다음을 반환합니다:

<Tabs>
<TabItem value="request" label="Request" default>


```js
const data = Social.get("mob.near/widget/*");
```

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "HelloWorld": "return <div>Hello, World!</div>;",
  "HelloUsername": "return <div>Hello, {props.username}!</div>;"
}
```

</TabItem>
</Tabs>

예를 들어 경로 패턴이 `mob.near/widget/HelloWorld`이면 `Social.get`은 객체 랩핑을 해제하고 다음을 반환합니다:

<Tabs>
<TabItem value="request" label="Request" default>


```js
const data = Social.get("mob.near/widget/HelloWorld");
```

</TabItem>
<TabItem value="response" label="Response">

```json
"return <div>Hello, World!</div>;"
```

</TabItem>
</Tabs>

객체의 랩핑을 수동으로 풀 필요가 없는 것이 유용합니다.

---

## Social.getr

`Social.getr`은 `Social.get`의 래퍼 헬퍼일 뿐이며, 각 경로 패턴에 `**`를 추가합니다.

 | 매개변수       | 필수 여부  | 자료형               | 설명           |
 | ---------- | ------ | ----------------- | ------------ |
 | `patterns` | **필수** | string / string[] | 경로 패턴        |
 | `finality` | _선택사항_ | `"final"` / 숫자    | 블록 높이 또는 완결성 |
 | `options`  | _선택사항_ | 객체                | `options` 객체 |

:::info options 객체

- `subscribe` _(선택 사항)_: true이면 데이터가 5초마다 새로 고쳐집니다.
- `return_deleted` _(선택 사항)_: 삭제된 값을 (`null`로) 반환할지 여부를 나타냅니다. 기본값은 `false`입니다.

:::

#### 예시

예를 들어 경로 패턴이 `mob.near/profile`인 경우 `Social.getr`은 경로 패턴 `mob.near/profile/**`으로 `Social.get`을 호출합니다.

<Tabs>
<TabItem value="request" label="Request" default>


```js
const data = Social.getr("mob.near/profile");
```

</TabItem>
<TabItem value="response" label="Response">

```json
"return <div>Hello, World!</div>;"
```

</TabItem>
</Tabs>

---

## Social.keys

SocialDB의 `keys` API를 호출하여 데이터를 반환합니다. 데이터를 가져오는 동안 반환된 값은 `null`과 같습니다. 키 컨트랙트는 객체를 언랩하지 않으므로 반환되는 데이터는 SocialDB의 `keys` API와 동일합니다.

`Social.key`는 최대 3개의 인수를 사용합니다:

 | 매개변수       | 필수 여부  | 자료형               | 설명           |
 | ---------- | ------ | ----------------- | ------------ |
 | `patterns` | **필수** | string / string[] | 경로 패턴        |
 | `finality` | _선택사항_ | `"final"` / 숫자    | 블록 높이 또는 완결성 |
 | `options`  | _선택사항_ | 객체                | `options` 객체 |

:::info options 객체

- `subscribe` _(선택 사항)_: true이면 데이터가 5초마다 새로 고쳐집니다.
- `return_type` _(선택 사항)_: `"History"`, `"True"` 또는 `"Block Height"` 중 하나입니다. 지정하지 않으면 `"True"`가 반환됩니다.
- `return_deleted` _(선택 사항)_: 삭제된 값을 (`null`로) 반환할지 여부를 나타냅니다. 기본값은 `false`입니다.
- `values_only` _(선택 사항)_: 값만 반환할지 여부입니다(객체는 포함하지 않음). 기본값은 `false`입니다.

:::

:::tip
Social API 서버는 사용자 지정 옵션 `return_type: "History"`를 지원합니다. 각 일치 키에 대해 값이 오름차순으로 변경되었을 때 모든 블록 높이가 포함된 배열을 반환합니다. 값을 덮어쓰는 피드를 만드는 데 사용할 수 있습니다.
:::

#### 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
const data = Social.keys(`${accountId}/post/meme`, "final", {
  return_type: "History",
});
```

</TabItem>
<TabItem value="response" label="Response">

```json
"return <div>Hello, World!</div>;"
```

</TabItem>
</Tabs>

---

## Social.index

일치하는 인덱스 값의 배열을 반환합니다. `blockHeight`에 따라 정렬됩니다.

`Social.index` 인자:

 | 매개변수      | 필수 여부  | 자료형 | 설명                                                              |
 | --------- | ------ | --- | --------------------------------------------------------------- |
 | `action`  | **필수** | 문자열 | 표준의 `index_type`입니다. 예를 들어 경로 `index/like`에서 action은 `like`입니다. |
 | `key`     | **필수** | 문자열 | 표준의 내부 인덱스 값입니다.                                                |
 | `options` | _선택사항_ | 객체  | `options` 객체입니다.                                                |

:::info options 객체

- `subscribe` _(선택 사항)_: true이면 데이터가 5초마다 새로 고쳐집니다.
- `accountId` _(선택 사항)_: 지정된 경우 값을 필터링하려면 문자열 또는 계정 ID 배열이어야 합니다. 그렇지 않으면 계정 ID로 필터링하지 않습니다.
- `order` _(선택 사항)_: `asc` 또는 `desc` 중 하나입니다. 기본값은 `asc`입니다.
- `limit` _(선택 사항)_: 기본값은 `100`입니다. 반환할 값의 수를 의미합니다. 마지막 요소의 블록 높이가 같은 경우 인덱스 값보다 많은 값을 반환할 수 있습니다.
- `from` _(선택 사항)_: 순서에 따라 기본값은 `0` 또는 `Max`입니다.

:::

#### 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
return Social.index("test", "test-key-2");
```

```js
return Social.index("test", "test-key-2", {
  accountId: "mob.near"
});
```

```js
return Social.index("test", "test-key-2", {
  accountId: ["mob.near", "root.near"]
});
```

</TabItem>
<TabItem value="response" label="Response">

```json
[
    {
        "accountId": "mob.near",
        "blockHeight": 78672789,
        "value": "test-value-1"
    },
    {
        "accountId": "mob.near",
        "blockHeight": 78672797,
        "value": "test-value-1"
    },
    {
        "accountId": "mob.near",
        "blockHeight": 78672974,
        "value": "test-value-3"
    }
]
```

</TabItem>
</Tabs>

---

## Social.set

`data` 객체를 가져와 SocialDB에 커밋합니다. 데이터를 저장하기 위해 모달 창 프롬프트를 생성하여 `CommitButton`과 유사하게 작동하지만, Commit Button 구성 요소를 통해 트리거할 필요는 없습니다. 비동기 Promise에 의존하는 보다 유연한 코드를 작성하고 다른 이벤트 및 구성 요소를 사용할 수 있습니다. 전반적으로 SocialDB에 커밋할 때 더 많은 유연성을 제공합니다. 예를 들어, Enter 키를 눌렀을 때 커밋할 수 있습니다.

`Social.index` 인자:

 | 매개변수      | 필수 여부  | 자료형 | 설명                                                      |
 | --------- | ------ | --- | ------------------------------------------------------- |
 | `data`    | **필수** | 객체  | 커밋될 데이터 객체입니다. `CommitButton`과 마찬가지로 계정 ID로 시작하면 안 됩니다. |
 | `options` | _선택사항_ | 객체  | 추가 객체입니다.                                               |

:::info options 객체

- `force` _(선택 사항)_: 데이터를 덮어쓸지 여부를 의미합니다.
- `onCommit` _(선택 사항)_: 성공적인 커밋에서 트리거하는 함수입니다. 작성된 데이터(`accountID` 포함)를 전달합니다.
- `onCancel` _(선택 사항)_: 사용자가 커밋을 취소할 때 트리거하는 함수입니다.

:::

<details>

<summary > 확인 건너뛰기 기능 </summary>

커밋을 확인하는 모달 창이 표시되면 매번 작업을 확인할지 또는 유사한 데이터에 대한 확인 창을 표시하지 않을지 선택하는 전환 기능이 있습니다.

새 데이터의 경우 기본적으로 토글이 켜짐으로 설정되어 있으므로 다음 번에는 데이터를 확인하라는 메시지가 표시되지 않습니다. 로컬에서 결정을 기억하고 다음 번에는 이 결정이 기본적으로 적용됩니다(사용자가 건너뛰지 않기로 결정한 경우). 사용자가 토글을 켠 상태에서 커밋을 승인하면 유사한 데이터를 가진 다음 커밋은 확인 창을 건너뜁니다. 사용 권한은 위젯 소스별로 부여됩니다.

:::note
Similar data means the same top level keys on the data. `graph`, `post`, `index` 및 `settings` 등 4개의 최상위 키를 제외합니다. 이러한 키에는 두 번째 레벨 키가 사용됩니다. 새 표준이 추가되면 나중에 더 많은 키를 추가할 수 있습니다.
:::

예를 들어, 다음 버튼 위젯에서는 다음 키를 사용합니다:
```json
{
    "graph": {
      "follow": ...
    },
    "index": {
      "graph": ...
      "notify": ...
    }
  }
```

다른 내용을 수정하려고 하면 확인 모달이 다시 표시됩니다.

![saving data](https://user-images.githubusercontent.com/470453/205456503-7c0db525-7f61-4ead-8591-2b6d86065fa4.png)

</details>


#### 예시

일반 버튼을 통한 `CommitButton` and `Social.set` 사용 예시입니다. 둘다 `force`를 사용한다는 점에 유의하세요.

<Tabs>
<TabItem value="request" label="Request" default>

```js
State.init({ commitLoading: false });

const data = { experimental: { test: "test" } };

const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <div>
    <CommitButton force data={data}>
      CommitButton
    </CommitButton>
    <button
      disabled={state.commitLoading}
      onClick={() > {
        State.update({ commitLoading: true });
        Social.set(data, {
          force: true,
          onCommit: () => {
            State.update({ commitLoading: false });
          },
          onCancel: () => {
            State.update({ commitLoading: false });
          },
        });
      }}
    >
      {state.commitLoading && Loading}Social.set
    </button>
  </div>
);
```

</TabItem>
</Tabs>
