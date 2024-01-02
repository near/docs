---
id: quickstart
title: Hello Component
sidebar_label: ⭐ Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/social-widget"

NEAR Components are a new way to build web applications. They are composable, reusable and decentralized.

---

## React Basics
NEAR Components borrow ideas from [React](https://react.dev/). If you are familiar with React, you will find the transition to NEAR Components very easy.

Particularly, the NEAR Components:
- Use the `JSX` syntax
- Can receive input in the `props` variable
- Handle state through the [`useState`](https://react.dev/reference/react/useState) hook
- Handle side effects through the [`useEffect`](https://react.dev/reference/react/useEffect) hook

<WidgetEditor>

```jsx
const name = props.name || "Maria";
const [count, setCount] = useState(0);

return (
  <div>
    <p> {count} cheers for {name}! </p>
    <button onClick={() => setCount(count + 1)}>Cheers!</button>
  </div>
);
```

</WidgetEditor>

:::danger Contrast with React
Note that, in contrast with React, NEAR Components are not wrapped in a `function` or `class` definition.

Indeed, when writing a NEAR Component, you focus on writing the body of the component, which is a function that returns the JSX to be rendered. 
:::

---

## Interacting with NEAR
NEAR Components can readily view and call methods in the NEAR Blockchain. In order to interact with a contract, users will need to login with their NEAR account.

<WidgetEditor>

```jsx
const counter = Near.view('counter.near-examples.testnet', 'get_num')

if(counter === null) return 'Loading...'

const add = () => {
  Near.call('counter.near-examples.testnet', 'increment')
}

const subtract = () => {
  Near.call('counter.near-examples.testnet', 'decrement')
}

return <>
  <p> Counter: {counter} </p>
  {!context.accountId && <p color="red"> Please login to interact with the contract</p>}
  {context.accountId && 
  <>
    <button onClick={add}> + </button>
    <button onClick={subtract}> - </button>
  </>
  }
</>
```

</WidgetEditor>

<hr class="subsection" />

#### User Context
The `context.accountId` will be `null` until the user logs-in, at which point it will will contain the user's ID.

#### Viewing and Calling
The `counter` variable is the result of `Near.view`, which returns a `state` variable! This variable can be:
- `null` until the `Near.view` call is resolved.
- `undefined` if the call is resolved but the contract does not return a value.
- The value returned by the contract.

`Near.call` is used to call a method in the contract. If no [access key](/concepts/basics/accounts/access-keys#function-call-keys) was created during login, the user will be prompted to sign the transaction.

:::tip
Login using the button at the top navigation bar. If you don't have a NEAR account, you'll be prompted to a `testnet` account for **free**.
:::
