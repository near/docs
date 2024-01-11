---
id: quickstart
title: '⭐ 빠른 시작'
---

NEAR allows you to quicky develop fullstack decentralized applications by publishing all of its source code on-chain.

이 빠른 시작 튜토리얼에서는 이름을 입력으로 사용하고 친근한 인사말을 렌더링하는 간단한 애플리케이션을 만듭니다.

![img](/docs/quickstart-1.png)

---

## 개발 환경

컴포넌트 & 애플리케이션을 만드는 데는 두 가지 경로가 있습니다.

- [온라인 IDE](https://near.org/sandbox) - 설치 없이 빠르게 시작하여 즉시 프로토타입을 작성하고 코드를 제공할 수 있습니다.
- [Local IDE](https://docs.near.org/bos/dev/intro) - get serious and use our NEAR DevTools to setup your local dev environment

---

## 첫 번째 컴포넌트 생성

`widget`을 생성하려면 유효한 JSX 코드, 즉 HTML과 JS가 혼합된 코드만 작성하면 됩니다. 첫 번째 컴포넌트를 만들고 미리 보는 것이 얼마나 간단한지 살펴보겠습니다.

<hr class="subsection" />

### 컴포넌트 만들기
에디터에서 새 파일(웹 에디터의 `Add` 버튼)을 만들고 이름을 `Greeter`로 지정한 에디터에 다음 코드를 붙여넣습니다.

```ts
let greeting = "Have a great day";

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p> {greeting} </p>
    </div>
  </>
);
```

<hr class="subsection" />

### 미리보기
컴포넌트가 어떻게 작동하는지 미리 보려면 먼저 에디터의 `props` 탭으로 이동하고(또는 Visual Studio Code를 사용하는 경우 `props.json` 파일을 편집) 다음 속성을 추가합니다.

```json
{"name": "Anna"}
```

그런 다음 `Preview` 버튼을 눌러 컴포넌트의 미리보기를 렌더링하세요!

![img](/docs/quickstart-editor.png) *[NEAR Social 에디터](https://near.social/#/edit)를 사용하여 Hello World 컴포넌트 만들기*

<hr class="subsection" />

### 퍼블리시
NEAR 블록체인에 애플리케이션을 저장하려면 `Save Widget` 버튼을 클릭하세요. 버튼을 사용할 수 없는 경우 에디터의 `Sign In` 버튼을 사용하여 [NEAR 지갑](https://wallet.near.org)에 로그인했는지 확인하세요.

![img](/docs/quickstart-save.png) *컴포넌트를 저장할지 묻는 NEAR Social 에디터*

NEAR 지갑에서 트랜잭션을 수락하면 컴포넌트가 NEAR 블록체인에 저장됩니다.

<hr class="subsection" />

## dApp 사용
Once your application is published, it will be ready to be combined with other components, or rendered as a standalone application  using the NEAR Viewer.

<hr class="subsection" />

### 구성
A NEAR application is simply a component that puts together multiple components; this outer component acts as the entry point to your application. To use your component inside of another, simply invoke it using a `<Widget>` component. 이렇게 하면 NEAR 블록체인에서 코드를 가져와 새 애플리케이션에 포함합니다.

```ts
const user = "gagdiez.near";

return (
  <>
    <h3> Composition </h3>
    <p> Components can be composed </p>
    <hr />

    <Widget src={`${user}/widget/Greetings`} props={props} />
  </>
);
```

![img](/docs/quickstart-composition.png) *컴포지션의 렌더링*

:::info
입력 `props`를 `Greetings` 컴포넌트에 `object`로 전달하고 있음에 유의하세요.
:::

<hr class="subsection" />

### 임베디드
컴포넌트를 독립 실행형 애플리케이션으로 렌더링하려면 `https://near.social/#/<your-username>/widget/Greeter?name=Anna`로 이동하세요.

예를 들어 다른 웹사이트에 컴포넌트를 삽입할 수도 있습니다. 여기에는 다음과 같은 iframe이 있습니다. `source`는 `https://near.social/#/embed/gagdiez.near/widget/Greeter?name=Anna`입니다.
<iframe style={{"width": "100%", "height":"130px"}} src="https://near.social/#/embed/gagdiez.near/widget/Greeter?name=Anna"></iframe>
<em>이 컴포넌트는 `iframe` 내부에서 렌더링되고 있습니다.</em>

:::info
`url`에서 `props.name`를 `GET` 매개변수로 전달하고 있음에 유의하세요.
:::
