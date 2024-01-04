---
id: state
title: Component State
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/social-widget"

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
    <p class="alert alert-danger" hidden={!visible}>
      You clicked more than 5 times
    </p>
    <button onClick={() => setCount(count + 1)}>Click me</button>
  </div>
);  
```
</WidgetEditor>