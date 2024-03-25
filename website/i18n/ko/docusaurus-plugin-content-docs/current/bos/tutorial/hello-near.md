---
id: interaction
title: 스마트 컨트랙트 상호작용
---

프론트엔드는 내장된 Discovery API를 사용하여 다양한 블록체인과 상호 작용할 수 있습니다. NEAR 스마트 컨트랙트에서 인사말을 읽고 저장하는 애플리케이션을 만드는 방법에 대해 알아보겠습니다.

![widgets](/docs/hello-near-logedin.png) *사용자가 로그인했을 때 Hello Near 앱 보기*

:::info
[near.social 코드 페이지](https://near.social/#/mob.near/widget/WidgetSource?src=gagdiez.near/widget/HelloNear)에서 완성된 코드를 확인하세요.
:::

---

## 컨트랙트

`Hello.near=example.near`의 NEAR 네트워크에 `Hello World` 스마트 컨트랙트를 구축했습니다. 이 컨트랙트는 두 가지 공개 메서드를 가지고 있습니다.
- `set_greeting(greeting: string): void`: 인사말을 받아 컨트랙트 상태 내에 저장합니다.
- `get_greeting(): string`: 저장된 인사말을 반환합니다.

---

## 인사말 반환
NEAR 네트워크와 상호 작용하기를 원하므로 Discovery API의 `Near` 객체를 사용합니다.

```ts
const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

return <div>{greeting} World</div>;
```

컨트랙트에 `"Hello"`가 저장되어 있다고 가정하면 다음과 같은 간단한 정보가 제공됩니다:

```json
Hello World
```

---

## 인사말 변경
인사말을 수정하려면 `Near.call`을 사용하여 `set_greeting` 메서드를 호출하기만 하면 됩니다. 그러나 이를 위해서는 사용자가 새 인사말을 입력할 수 있는 프론트엔드가 필요합니다.

다음 두 단계를 통해 생성합니다:
1. 렌더링할 HTML 작성
2. Add the logic to handle the function call

<hr className="subsection" />

### 1. HTML 컴포넌트
다음 코드를 사용하여 제목, 인사말을 변경하는 입력 양식 및 변경사항을 제출하는 버튼로 구성된 간단한 프론트엔드를 만듭니다.

```js
const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

// Define components
const greetingForm = (
  <>
    <div className="border border-black p-3">
      <label>Update greeting</label>
      <input placeholder="Howdy" onChange={onInputChange} />
      <button className="btn btn-primary mt-2" onClick={onBtnClick}>
        Save
      </button>
    </div>
  </>
);

const notLoggedInWarning = <p> Login to change the greeting </p>;

// Render
return (
  <>
    <div className="container border border-info p-3">
      <h3 className="text-center">
        The contract says:
        <span className="text-decoration-underline"> {greeting} </span>
      </h3>

      <p className="text-center py-2">
        Look at that! A greeting stored on the NEAR blockchain.
      </p>

      {context.accountId ? greetingForm : notLoggedInWarning}
    </div>
  </>
);
```

:::info 관련 HTML
위의 코드에서 주의해야 할 두 가지 중요한 사항이 있습니다:

1. **onChange & onClick**: 우리는 어떤 일이 발생했을 때 행동할 수 있도록 우리의 `<input>`와 `<button>`을 준비했습니다. 특히, 우리는 두 가지 메서드를 만들 것입니다: 하나는 입력이 바뀔 때, 하나는 버튼을 눌렀을 때.

2. **context.accountId**: `context.accountId`가 설정되어 있는지 확인합니다. 이를 통해 사용자가 NEAR 계정을 사용하여 로그인했는지 여부를 알 수 있으므로 NEAR 컨트랙트와 상호 작용할 수 있습니다.
:::

<hr className="subsection" />

### 2. 사용자 입력 처리
컴포넌트의 보기를 준비했으므로 이제 사용자가 새 인사말을 입력하고 `Submit` 버튼을 누를 때의 로직을 정의해야 합니다. 즉, `onInputChange` 및 `onBtnClick` 메서드를 정의해야 합니다.

#### onInputChange
사용자가 새 인사말을 입력할 때 `Submit` 버튼을 누를 때까지 어딘가에 저장하려고 합니다. 이 경우 [애플리케이션의 State](../api/state.md)를 사용할 수 있습니다.

Discovery에서는 `State.init`를 통해 상태가 초기화되고 `State.update`로 업데이트되며 `state` 변수를 통해 액세스됩니다(소문자 구분). 새 인사말을 앱의 상태로 저장합니다:

```js
State.init({ new_greeting: "" });

const onInputChange = ({ target }) => {
  State.update({ new_greeting: target.value });
};
```

#### onBtnClick
이제 사용자가 `Submit` 버튼을 클릭할 때 처리해야 합니다. 우리가 원하는 것은 사용자가 인사말을 변경했는지 확인하고 컨트랙트에 제출하는 것입니다.

```js
const onBtnClick = () => {
  if (!state.new_greeting) {
    return;
  }

  Near.call(contract, "set_greeting", {
    greeting: state.new_greeting,
  });
};
```

---

## 완전한 예제
이 예제의 전체 버전을 NEAR 블록체인에 배포했으므로 코드를 확인하고 사용할 수 있습니다.

:::tip
- **코드**: [near.social code page](https://near.social/#/mob.near/widget/WidgetSource?src=gagdiez.near/widget/HelloNear)에서 이 예제의 코드를 확인하세요.

- **연습**: [near.social page](https://near.social/#/gagdiez.near/widget/HelloNear)에서 애플리케이션과 상호 작용해 보세요.
:::
