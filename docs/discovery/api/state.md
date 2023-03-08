---
id: state
title: State API
sidebar_label: State
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## State APIs

VM provides a convenient API to update the state of the component. There are two methods:
- [`State.init`](#stateinit)
- [`State.update`](#stateupdate)

:::note Accessing the State from the Component UI
You may access state variables from the component UI using the `state` property of the `widget` object. For example, if you have a state variable `numVar` you can access it from the component UI using `state.numVar`. Here's an example of accessing a variable `profile` from the state and showing it conditionally on the component UI:

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

See this [full example on GitHub here](https://github.com/near/near-search/blob/main/widget/SearchBar.jsx).

:::

---

## State.init

`State.init` takes an object as an argument and initializes the state of the component with this object. It'll be no-op if the state is already initialized.

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `state`      |  **required** | object   | an initial state object for the component  |

### `State.init()` Example

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

### `State.init()` Implementation Details

The state object is both stored in the `state` property of the component virtual machine and in the `state` property of the react component. The state is initialized with the given object.

```js reference title="VM.js"
https://github.com/NearSocial/VM/blob/5b68433497272c23bf7d06a992c3209f3c97a2b5/src/lib/vm/vm.js#L754-L773
```

---

## State.update

The `State.update` will trigger the state update, and the component will be re-rendered.
It also has an optional argument, the object that will be added to the `state` object using `Object.assign`.
The state will be initialized with the given object if it's not initialized yet.

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `state`      |  **required** | object   | the state  |
 | `init`      |  _optional_ | object   | an optional initial state object  |

### `State.update()` Example

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

### `State.update()` Implementation Details

The state is stored in the `state` property of the component. The state is initialized with an empty object `{}`. `Object.assign` is used to update the state.

```js reference title="VM.js"
https://github.com/NearSocial/VM/blob/5b68433497272c23bf7d06a992c3209f3c97a2b5/src/lib/vm/vm.js#L774-L786
```
