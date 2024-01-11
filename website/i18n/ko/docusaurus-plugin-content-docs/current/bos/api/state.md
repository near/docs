---
id: state
title: State API
sidebar_label: 상태
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

VM은 컴포넌트의 상태를 업데이트하는 편리한 API를 제공합니다. 두 가지 메서드가 존재합니다.
- [`State.init`](#stateinit)
- [`State.update`](#stateupdate)

:::note 컴포넌트 UI에서 상태에 액세스
`widget` 객체의 `state` 속성을 사용하여 컴포넌트 UI에서 상태 변수에 액세스할 수 있습니다. 예를 들어 상태 변수 `numVar`가 있는 경우 `state.numVar`를 사용하여 컴포넌트 UI에서 액세스할 수 있습니다. 다음은 상태에서 변수 `profile`에 액세스하고 컴포넌트 UI에 조건부로 표시하는 예입니다.

```javascript
return (
  <div>
  ...
    {state.profile?.length > 0 && (
      <div>
        <p>Profiles:</p>
        <ul>{state.profile}</ul>
      </div>
    )}
  ...
  </div>
);
```

:::

---

## State.init

`State.init`은 객체를 인자로 사용하고 이 객체로 컴포넌트의 상태를 초기화합니다. 상태가 이미 초기화된 경우 작동하지 않습니다.

 | 매개변수    | 필수 여부  | 자료형 | 설명             |
 | ------- | ------ | --- | -------------- |
 | `state` | **필수** | 객체  | 컴포넌트의 초기 상태 객체 |

### `State.init()` 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
const strVar = "Hello World!";
State.init({
  numVar: 0,
  strVar
});
```

</TabItem>
<TabItem value="response" label="Response">

```js
{ numVar: 0, strVar: "Hello World!" }
```

</TabItem>
</Tabs>

### `State.init()` 구현 세부사항

상태 객체는 컴포넌트 가상 머신의 `state` 속성과 리액트 컴포넌트의 `state` 속성에 모두 저장됩니다. 상태는 주어진 객체로 초기화됩니다.

```js reference title="VM.js"
https://github.com/NearSocial/VM/blob/5b68433497272c23bf7d06a992c3209f3c97a2b5/src/lib/vm/vm.js#L754-L773
```

---

## State.update

`State.update`는 상태 업데이트를 트리거하고, 컴포넌트는 다시 렌더링될 것입니다. 또한 `Object.assign`을 사용하여 `state` 객체에 추가되는 선택적 인자가 존재합니다. 상태가 아직 초기화되지 않은 경우 주어진 객체로 상태가 초기화됩니다.

 | 매개변수    | 필수 여부  | 자료형 | 설명           |
 | ------- | ------ | --- | ------------ |
 | `state` | **필수** | 객체  | 상태           |
 | `init`  | _선택사항_ | 객체  | 선택적 초기 상태 객체 |

### `State.update()` 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
State.update({
  numVar: 1,
  strVar: "Hello there!"
});
```

</TabItem>
<TabItem value="response" label="Response">

```js
{ numVar: 1, strVar: "Hello there!" }
```

</TabItem>
</Tabs>

### `State.update()` 구현 세부사항

상태는 컴포넌트의 `state` 속성 에 저장됩니다. 상태는 빈 객체 `{}`로 초기화됩니다. 상태를 업데이트하는 데에는 `Object.assign`이 사용됩니다.

```js reference title="VM.js"
https://github.com/NearSocial/VM/blob/5b68433497272c23bf7d06a992c3209f3c97a2b5/src/lib/vm/vm.js#L774-L786
```
