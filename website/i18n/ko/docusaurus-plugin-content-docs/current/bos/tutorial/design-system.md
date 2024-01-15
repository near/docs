---
id: ds-components
title: 디자인 구성 요소
---

# 디자인 시스템 구성 요소

구성 요소를 구축할 때, NEAR VM은 UI 개발을 단순화하기 위해 [Radix primitives](https://www.radix-ui.com/docs/primitives/overview/introduction)를 제공합니다.

## Radix UI

NEAR VM에서 내장 Radix primitives를 사용하는 것은 단순하고 직관적입니다. 어느 파일도 가져올 필요 없습니다.

```js
return (
    <Label.Root className="LabelRoot">
      Hello World!
    </Label.Root>
);
```

:::caution 한계

현재, NEAR VM은 Radix UI 프레임워크에서 몇 가지 한계점을 노출하고 있습니다.

- `Form` 구성 요소는 사용 불가합니다.
- `.Portal` 정의를 사용할 수 없습니다.
- CSS 사용법이 조금 다릅니다. `styled.div` 래퍼를 사용해야 합니다.

:::

### CSS 사용

다음은 `styled.div` 래퍼를 통해 CSS를 사용하는 방법에 대한 예시입니다:

```js
const Wrapper = styled.div`
  .SwitchRoot {
    ...
  }
  .SwitchThumb {
    ...
  }
`;

return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
```

:::tip 래퍼 사용

[래퍼를 사용한 예제 위젯](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/RadixTooltipTest)

:::

### `styled-components` 사용

You can use [`styled-components`](../api/builtin-components.md#styled-components) in combination with Radix UI primitives. 예시는 다음과 같습니다.

```js
const SwitchRoot = styled("Switch.Root")`
  all: unset;
  display: block;
  width: 42px;
  height: 25px;
  background-color: var(--blackA9);
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px var(--blackA7);

  &[data-state="checked"] {
    background-color: black;
  }
`;

const SwitchThumb = styled("Switch.Thumb")`
  all: unset;
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--blackA7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;

return (
  <SwitchRoot>
    <SwitchThumb />
  </SwitchRoot>
);
```

:::tip styled-components 사용

[Radix UI 스타일링을 위한 styled components를 사용한 위젯 예시](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/RadixSwitchTest)

:::

### Forward references

NEAR VM은 [React의 forwardRef](https://react.dev/reference/react/forwardRef#reference)를 `ref="forwardRef"`로 다시 구현합니다.

`ref="forwardedRef"`를 사용하여 `<Widget />`를 통해 참조를 전달하여 Radix의 `asChild` 속성을 지원할 수 있습니다:

```js title='Dialog.jsx'
<AlertDialog.Trigger asChild>
  <Widget
    src="calebjacob.near/widget/TestButton"
    props={{ label: "Click Me" }}
  />
</AlertDialog.Trigger>
```

```js title='TestButton.jsx'
const Button = styled.button`
  background: #f00;
`;

return (
  <Button type="button" ref="forwardedRef">
    {props.label}: Forwarded
  </Button>
);
```

## DIG 구성 요소

NEAR VM에서 사용할 수 있는 DIG(Design Interface Guidelines) 구성 요소는 다음과 같습니다:

- [DIG.Button](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Button)
- [DIG.Theme](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Theme)

### `DIG.Button`

`<button>` 또는 `<a>` 태그 역할을 할 수 있는 완전한 기능을 갖춘 버튼 구성요소입니다

:::info DIG.Button 속성
속성 및 세부 정보를 보려면 [여기를 클릭하세요](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Button&tab=about).

:::

### `DIG.Theme`

This component wraps all of NEAR Components so you don't need to render it yourself.

:::tip
`DIG.Theme` 내부에 정의된 [CSS 변수](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/DIG.Theme&tab=source)를 사용할 수 있습니다.
:::
