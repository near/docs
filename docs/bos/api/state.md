---
id: state
title: Basics (State, Props, Hooks)
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/social-widget"

### Introduction (State, Props, Hooks)
Borrowing from React, Near Components use the same concepts of state, props and hooks to handle the component's logic.

---

## State
To handle the component's state you can use `useState` hook. The `useState` hook returns a tuple of two values: the current state and a function that updates it.

<WidgetEditor>

```jsx
const [count, setCount] = useState(0);

return (
  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>Click me</button>
  </div>
);

```
</WidgetEditor>

<details markdown="1">
<summary > State API (deprecated) </summary>

You might encounter some components that use the `State` object to handle state. The `State` API was the first implementation to interact with a component's state, but is now not recommended to use it.

### State.init

`State.init` takes an object as an argument and initializes the state of the component with this object. It'll be no-op if the state is already initialized.

 | param   | required     | type   | description                               |
 |---------|--------------|--------|-------------------------------------------|
 | `state` | **required** | object | an initial state object for the component |

### State.update

The `State.update` will trigger the state update, and the component will be re-rendered.
It also has an optional argument, the object that will be added to the `state` object using `Object.assign`.
The state will be initialized with the given object if it's not initialized yet.

 | param   | required     | type   | description                      |
 |---------|--------------|--------|----------------------------------|
 | `state` | **required** | object | the state                        |
 | `init`  | _optional_   | object | an optional initial state object |

</details>

---

## Props
To handle the component's props you can use `useProps` hook. The `useProps` hook returns the current props of the component.

<WidgetEditor id='2'>

```jsx
return JSON.stringify(props);
```
</WidgetEditor>

---

## Hooks

### useEffect
The `useEffect` hook is used to handle side effects. It will execute each time one of the dependencies changes.

### Example with Counter
<WidgetEditor id='3'>

```jsx
const likes = Social.index("like", "I<3Near", { subscribe: true });

return likes;

```
</WidgetEditor>