---
id: ds-components
title: Design Components
---

# Design System Components

When building components, the NEAR VM provides a complete set of [Radix primitives](https://www.radix-ui.com/docs/primitives/overview/introduction) to simplify UI development.

## Radix UI

Using embedded Radix primitives on the NEAR VM is simple and straight-forward. You don't need to import any files:

```js
return (
    <Label.Root className="LabelRoot">
      Hello World!
    </Label.Root>
);
```

:::caution Limitations

Currently, NEAR VM impose some limitations on the Radix UI framework:

- `Form` component is not available.
- You can't use `.Portal` definitions.
- Using CSS is different. You'll have to use a `styled.div` wrapper.

:::

### Using CSS

Here is an example on how to use CSS through the `styled.div` wrapper:

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

:::tip Using Wrapper

[Example widget using Wrapper](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/RadixTooltipTest)

:::

### Using `styled-components`

You can use [`styled-components`](../api/builtin-components.md#styled-components) in combination with Radix UI primitives. Here's an example:

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

:::tip Using styled components

[Example widget using styled components to style Radix UI](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/RadixSwitchTest).

:::

### Forward references

The NEAR VM re-implements [React's forwardRef](https://react.dev/reference/react/forwardRef#reference) as `ref="forwardedRef"`.

You can use `ref="forwardedRef"` to forward references through `<Widget />` to support Radix's `asChild` property:

```js title='Dialog.jsx'
<AlertDialog.Trigger asChild>
  <Widget
    src="near/widget/TestButton"
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

## DIG components

These are the Design Interface Guidelines (DIG) components available on the NEAR VM:

- [DIG.Button](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Button)
- [DIG.Theme](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Theme)

### `DIG.Button`

A fully featured button component that can act as a `<button>` or `<a>` tag.

:::info DIG.Button properties
[Click here](https://near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Button&tab=about) for properties and details.

:::

### `DIG.Theme`

This component wraps all of NEAR Components so you don't need to render it yourself.

:::tip
You can use any of the [CSS variables](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/DIG.Theme&tab=source) defined inside `DIG.Theme`.
:::
