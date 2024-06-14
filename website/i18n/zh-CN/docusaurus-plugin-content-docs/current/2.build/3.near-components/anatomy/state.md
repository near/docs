---
id: state
title: Basics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/widget-editor"

Borrowing from React, Near Components use hooks such as [**`useState`**](#state) and [**`useEffect`**](#useeffect-hook) to handle the state's logic, and [**props**](#props) to receive parameters.

Near Components are stored in the blockchain, for which you will use the `NEAR VM` to [retrieve and execute them in the browser](../../2.develop/integrate/frontend-components.md).

Using a VM enforces components to be sandboxed, making them very secure since they cannot access your `LocalStorage` or other elements in the page they are incorporated to. However, because of this, components cannot import external libraries. However, they can [**import functions**](#import) from other components.

---

## State

To handle the component's state you can use `useState` hook. The `useState` hook returns a tuple of two values: the current state and a function that updates it.

<WidgetEditor>

```jsx
const [count, setCount] = useState(0);

return (
  <div>
    <p>You clicked {count} times</p>
    <button onClick={() > setCount(count + 1)}>Click me</button>
  </div>
);

```

</WidgetEditor>

Each time a state variable is updated, the component will be **re-rendered**. This means that the **whole code will run again**.

---

## Props

Each component has access to a local variable named `props` which holds the properties received as input when the component is composed.

<WidgetEditor id='2'>

```jsx
return <>
  <p> This component props: {JSON.stringify(props)} </p>
  <Widget src="influencer.testnet/widget/Greeter" 
          props={{name: "Maria", amount: 2}} />
</>
```

</WidgetEditor>

---

## useEffect Hook

The [`useEffect` hook](https://react.dev/learn/synchronizing-with-effects) is used to handle side effects. It will execute each time one of the dependencies changes.

<WidgetEditor id='3'>

```jsx
const [count, setCount] = useState(0);
const [visible, setVisible] = useState(false);

useEffect(() => {
  if(count > 5) setVisible(true);
}, [count]);

return (
  <div>
    <p>You clicked {count} times</p>
    <p className="alert alert-danger" hidden={!visible}>
      You clicked more than 5 times
    </p>
    <button onClick={() > setCount(count + 1)}>Click me</button>
  </div>
);  
```

</WidgetEditor>

---

## Import

Components can import functions from other components. This is useful to reuse code and to create libraries of components.

<WidgetEditor id='4'>

```jsx
const {add, multiply} = VM.require('influencer.testnet/widget/Math');

return <>
  <p> 2 + 3 = {add(2, 3)} </p>
  <p> 2 * 3 = {multiply(2, 3)} </p>
</>
```

</WidgetEditor>

Where the code of the `Math` component is:

```js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

return { add, multiply };
```
