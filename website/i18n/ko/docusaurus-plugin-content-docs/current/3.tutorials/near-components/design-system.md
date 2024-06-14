---
id: ds-components
title: 디자인 구성 요소
---

import {WidgetEditor} from "@site/src/components/widget-editor-mainnet";

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

You can use [`styled-components`](../../2.build/3.near-components/anatomy/builtin-components.md#styled-components) in combination with Radix UI primitives. 예시는 다음과 같습니다.

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

## UI is Near

[UI is Near](https://www.uiisnear.xyz/) is community-built library offering a comprehensive collection of UI components providing a solid foundation for creating intuitive and visually appealing user interfaces for dApps, wallets or other Web3 solutions.

:::tip

You can find the documentation, available components, and code examples following this [this link](https://www.uiisnear.xyz/).

:::

## DIG 구성 요소

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

If you want to see working demos of these components, check the [DIG Overview page](https://dev.near.org/near/widget/DIG.OverviewPage).

:::

---

### `DIG.Accordion`

An accordion built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/accordion).

<WidgetEditor id="1">

```jsx
// Rendering the component with props
return (<Widget
  src="near/widget/DIG.Accordion"
  props={{
    type: "multiple",
    defaultValue: ["1"],
    items: [
      {
        value: "1",
        header: "Header 1",
        content: (
          <>
            <p>My JSX context 1.</p>
            <p>Here's another paragraph.</p>
          </>
        ),
      },
      {
        value: "2",
        header: "Header 2",
        content: (
          <>
            <p>My JSX context 2.</p>
            <p>Here's another paragraph.</p>
          </>
        ),
      },
    ],
  }}
/>);
```

</WidgetEditor>

:::info DIG.Accordion properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Accordion\&tab=about) for properties and details.

:::

---

### `DIG.Avatar`

This component renders an avatar.

<WidgetEditor id="2">

```jsx
const accountId = "root.near";
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");

// Rendering the component with props
return (
  <Widget
    src="near/widget/DIG.Avatar"
    props={{
      alt: accountId,
      image: profile.image,
      size: "medium",
    }}
  />
);
```

</WidgetEditor>

:::info DIG.Avatar properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Avatar\&tab=about) for properties and details.

:::

---

### `DIG.Badge`

This component renders a badge. Badges are not meant to be clickable. Refer to [DIG.Button](#digbutton) or [DIG.Chip](#digchip) for clickable alternatives.

<WidgetEditor id="3">

```jsx
// Rendering the component with props
return (
  <Widget
    src="near/widget/DIG.Badge"
    props={{
      label: "Hello",
      iconLeft: "ph-bold ph-pizza",
      variant: "warning",
    }}
  />
);
```

</WidgetEditor>

:::info DIG.Badge properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Badge\&tab=about) for properties and details.

:::

---

### `DIG.Button`

`<button>` 또는 `<a>` 태그 역할을 할 수 있는 완전한 기능을 갖춘 버튼 구성요소입니다

<WidgetEditor id="4">

```jsx
// Rendering the component with props
return <Widget src="near/widget/DIG.Button" props={{ label: "Click Me" }} />;
```

</WidgetEditor>

:::info DIG.Button 속성

:::

---

### `DIG.Checkbox`

A checkbox built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/checkbox).

<WidgetEditor id="5">

```jsx
// Rendering the component with props
return <Widget
  src="near/widget/DIG.Checkbox"
  props={{ id: "checkbox-item", label: "Accept terms and conditions" }}
/>
```

</WidgetEditor>

:::info DIG.Checkbox properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Checkbox\&tab=about) for properties and details.

:::

---

### `DIG.Chip`

A fully featured chip component that can act as a `<button>` or `<a>` tag.

<WidgetEditor id="6">

```jsx
// Rendering the component with props
return (<Widget src="near/widget/DIG.Chip" props={{ label: 'Click Me' }} />);
```

</WidgetEditor>

:::info DIG.Chip properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Chip\&tab=about) for properties and details.

:::

---

### `DIG.Dialog`

This Dialog component is built with the [Radix primitive](https://www.radix-ui.com/primitives/docs/components/dialog).

<WidgetEditor id="7">

```jsx
State.init({
  dialogIsOpen: false,
});

function handleCancelFunction() {
  console.log("cancel");
}

function handleConfirmFunction() {
  console.log("confirm");
}

// Rendering the component with props
return (
  <>
    <Widget
      src="near/widget/DIG.Button"
      props={{
        label: "Open Dialog",
        onClick: () => State.update({ dialogIsOpen: true }),
      }}
    />

    <Widget
      src="near/widget/DIG.Dialog"
      props={{
        type: "alert",
        title: "Header",
        description: "Some description",
        onCancel: handleCancelFunction,
        onConfirm: handleConfirmFunction,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
        open: state.dialogIsOpen,
        onOpenChange: (value) => State.update({ dialogIsOpen: value }),
      }}
    />
  </>
);
```

</WidgetEditor>

:::info DIG.Dialog properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Dialog\&tab=about) for properties and details.

:::

---

### `DIG.DropdownMenu`

This dropdown menu is built with the [Radix primitive](https://www.radix-ui.com/primitives/docs/components/dropdown-menu).

<WidgetEditor id="8">

```jsx
// Rendering the component with props
return (<Widget
  src="near/widget/DIG.DropdownMenu"
  props={{
    trigger: (
      <Widget src="near/widget/DIG.Button" props={{ label: "Open Menu" }} />
    ),
    header: "Dropdown header",
    items: [
      {
        name: "Profile",
        iconLeft: "ph ph-user-circle",
        iconRight: "ph ph-user-focus",
      },
      {
        subHeader: "Sub header here",
        name: "Settings",
      },
    ],
  }}
/>);
```

</WidgetEditor>

:::info DIG.DropdownMenu properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.DropdownMenu\&tab=about) for properties and details.

:::

---

### `DIG.Input`

A text input component.

<WidgetEditor id="9">

```jsx
State.init({
  myValue: "",
});

// Rendering the component with props
return (
  <Widget
    src="near/widget/DIG.Input"
    props={{
      assistiveText: "My assistive text",
      label: "My Label",
      iconLeft: "ph-bold ph-pizza",
      placeholder: "Placeholder...",
      onInput: (e) => State.update({ myValue: e.target.value }),
      value: state.myValue,
    }}
  />
);
```

</WidgetEditor>

:::info DIG.Input properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Input\&tab=about) for properties and details.

:::

---

### `DIG.InputSearch`

An input component for typing a search query.

<WidgetEditor id="10">

```jsx
// Rendering the component with props
return (
  <Widget
    src="near/widget/DIG.InputSearch"
    props={{
      onQueryChange: (query) => console.log(query),
    }}
  />
);
```

</WidgetEditor>

:::info DIG.InputSearch properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputSearch\&tab=about) for properties and details.

:::

---

### `DIG.InputSelect`

A select input component built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/select).

<WidgetEditor id="11">

```jsx
State.init({
  myValue: "c",
});

// Rendering the component with props
return (
  <Widget
    src="near/widget/DIG.InputSelect"
    props={{
      assistiveText: "My assistive text",
      groups: [
        {
          label: "Group One",
          items: [
            {
              label: "Option A",
              value: "a",
            },
            {
              label: "Option B",
              value: "b",
              disabled: true,
            },
          ],
        },
        {
          label: "Group Two",
          items: [
            {
              label: "Option C",
              value: "c",
            },
            {
              label: "Option D",
              value: "d",
            },
          ],
        },
      ],
      label: "My Label",
      placeholder: "Placeholder...",
      rootProps: {
        value: state.myValue,
        onValueChange: (value) => {
          State.update({ myValue: value });
        },
      },
    }}
  />
);
```

</WidgetEditor>

:::info DIG.InputSelect properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputSelect\&tab=about) for properties and details.

:::

---

### `DIG.InputTags`

An input component that handles adding and removing tags.

<WidgetEditor id="12">

```jsx
State.init({
  myTags: ["food", "watermelon"],
});

// Rendering the component with props
return (
  <Widget
    src="near/widget/DIG.InputTags"
    props={{
      assistiveText: "My assistive text",
      label: "My Label",
      placeholder: "Placeholder...",
      tags: state.myTags,
      onTagsChange: (value) => State.update({ myTags: value }),
    }}
  />
);
```

</WidgetEditor>

:::info DIG.InputTags properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputTags\&tab=about) for properties and details.

:::

---

### `DIG.InputTextarea`

A textarea input component.

<WidgetEditor id="13">

```jsx
State.init({
  myValue: "",
});

// Rendering the component with props
return (
  <Widget
    src="near/widget/DIG.InputTextarea"
    props={{
      assistiveText: "My assistive text",
      label: "My Label",
      placeholder: "Placeholder...",
      onInput: (e) => State.update({ myValue: e.target.value }),
      value: state.myValue,
    }}
  />
);
```

</WidgetEditor>

:::info DIG.InputTextarea properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.InputTextarea\&tab=about) for properties and details.

:::

---

### `DIG.Tabs`

This tabs component is built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/tabs).

<WidgetEditor id="14">

```jsx
// Rendering the component with props
return (<Widget
  src="near/widget/DIG.Tabs"
  props={{
    variant: "line",
    size: "default",
    items: [
      {
        name: "Label 1",
        value: "1",
        content: "Hello 1",
        icon: "ph ph-browser",
      },
      {
        name: "Label 2",
        value: "2",
        content: "Hello 2",
        count: "12",
        icon: "ph ph-browser",
      },
      {
        name: "Label 3",
        value: "3",
        content: "Hello 3",
        disabled: true,
        icon: "ph ph-browser",
      },
    ],
  }}
/>);
```

</WidgetEditor>

:::info DIG.Tabs properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Tabs\&tab=about) for properties and details.

:::

---

### `DIG.Theme`

This component wraps all of NEAR Components so you don't need to render it yourself.

:::tip
You can use any of the [CSS variables](https://dev.near.org/near/widget/ComponentDetailsPage?src=near/widget/DIG.Theme\&tab=source) defined inside `DIG.Theme`.
:::

---

### `DIG.Toast`

This toast component is built with [Radix primitive](https://www.radix-ui.com/primitives/docs/components/toast).

<WidgetEditor id="16">

```jsx
State.init({ showToast: false });

// Rendering the component with props
return (
  <Widget
    src="near/widget/DIG.Toast"
    props={{
      title: "Title",
      description: "This is the toast description",
      type: "success",
      open: state.showToast,
      onOpenChange: (value) => State.update({ showToast: value }),
      trigger: (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            label: "Show Toast",
            onClick: () => State.update({ showToast: true }),
          }}
        />
      ),
      action: (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            label: "Dismiss",
            onClick: () => State.update({ showToast: false }),
          }}
        />
      ),
      providerProps: { duration: 1000 },
    }}
  />
);
```

</WidgetEditor>

:::info DIG.Toast properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Toast\&tab=about) for properties and details.

:::

---

### `DIG.Tooltip`

A tooltip built with the [Radix primitive](https://www.radix-ui.com/docs/primitives/components/tooltip).

<WidgetEditor id="17">

```jsx
// Rendering the component with props
return (<Widget
  src="near/widget/DIG.Tooltip"
  props={{
    content: "This is my tooltip content.",
    trigger: (
      <Widget src="near/widget/DIG.Button" props={{ label: "Hover Me" }} />
    ),
  }}
/>);
```

</WidgetEditor>

:::info DIG.Tooltip properties

[Click here](https://dev.near.org/#/near/widget/ComponentDetailsPage?src=near/widget/DIG.Tooltip\&tab=about) for properties and details.

:::
