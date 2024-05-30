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

You can use [`styled-components`](../../2.build/3.near-components/anatomy/builtin-components.md) in combination with Radix UI primitives. Here's an example:

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

These are the Decentralized Interface Guidelines (DIG) components available on the NEAR VM:

- [DIG.Accordion](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Accordion)
- [DIG.Avatar](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Avatar)
- [DIG.Badge](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Badge)
- [DIG.Button](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Button)
- [DIG.Checkbox](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Checkbox)
- [DIG.Chip](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Chip)
- [DIG.Dialog](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Dialog)
- [DIG.DropdownMenu](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.DropdownMenu)
- [DIG.Input](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Input)
- [DIG.InputSearch](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputSearch)
- [DIG.InputSelect](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputSelect)
- [DIG.InputTags](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputTags)
- [DIG.InputTextarea](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputTextarea)
- [DIG.Tabs](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Tabs)
- [DIG.Theme](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Theme)
- [DIG.Toast](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Toast)
- [DIG.Tooltip](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Tooltip)


:::tip

[DIG Overview](https://dev.near.org/near/widget/DIG.OverviewPage).

:::


### `DIG.Accordion`

An accordion built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/accordion).

:::info DIG.Accordion properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Accordion&tab=about) for properties and details.

:::

### `DIG.Avatar`

This component renders an avatar.

:::info DIG.Avatar properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Avatar&tab=about) for properties and details.

:::

### `DIG.Badge`

This component renders a badge. Badges are not meant to be clickable. Refer to [DIG.Button](#digbutton) or [DIG.Chip](#digchip) for clickable alternatives.

:::info DIG.Badge properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Badge&tab=about) for properties and details.

:::

### `DIG.Button`

A fully featured button component that can act as a `<button>` or `<a>` tag.

:::info DIG.Button properties
[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Button&tab=about) for properties and details.

:::

### `DIG.Checkbox`

A checkbox built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/checkbox).

:::info DIG.Checkbox properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Checkbox&tab=about) for properties and details.

:::

### `DIG.Chip`

A fully featured chip component that can act as a `<button>` or `<a>` tag.

:::info DIG.Chip properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Chip&tab=about) for properties and details.

:::

### `DIG.Dialog`

This Dialog component is built with the [Radix primitive](https://www.radix-ui.com/primitives/docs/components/dialog).

:::info DIG.Dialog properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Dialog&tab=about) for properties and details.

:::

### `DIG.DropdownMenu`

This dropdown menu is built with the [Radix primitive](https://www.radix-ui.com/primitives/docs/components/dropdown-menu).

:::info DIG.DropdownMenu properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.DropdownMenu&tab=about) for properties and details.

:::

### `DIG.Input`

A text input component.

:::info DIG.Input properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Input&tab=about) for properties and details.

:::

### `DIG.InputSearch`

An input component for typing a search query.

:::info DIG.InputSearch properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputSearch&tab=about) for properties and details.

:::

### `DIG.InputSelect`

A select input component built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/select).

:::info DIG.InputSelect properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputSelect&tab=about) for properties and details.

:::

### `DIG.InputTags`

An input component that handles adding and removing tags.

:::info DIG.InputTags properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputTags&tab=about) for properties and details.

:::

### `DIG.InputTextarea`

A textarea input component.

:::info DIG.InputTextarea properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputTextarea&tab=about) for properties and details.

:::

### `DIG.Tabs`

This tabs component is built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/tabs).

:::info DIG.Tabs properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Tabs&tab=about) for properties and details.

:::

### `DIG.Theme`

This component wraps all of NEAR Components so you don't need to render it yourself.

:::tip
You can use any of the [CSS variables](https://dev.near.org/near/widget/ComponentDetailsPage?src=near/widget/DIG.Theme&tab=source) defined inside `DIG.Theme`.
:::

### `DIG.Toast`

This toast component is built with [Radix primitive](https://www.radix-ui.com/primitives/docs/components/toast).

:::info DIG.Toast properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Toast&tab=about) for properties and details.

:::

### `DIG.Tooltip`

A tooltip built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/tooltip).

:::info DIG.Tooltip properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Tooltip&tab=about) for properties and details.

:::
