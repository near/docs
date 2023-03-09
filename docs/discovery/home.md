---
id: home
title: Components
---

import {WidgetEditor} from "@site/src/components/social-widget"

Discovery allows you to create a decentralized frontend by writing and composing small applications known as `Components`. 

Components are stored in the NEAR blockchain, and execute locally in a custom Virtual Machine, thus ensuring the component can not access local storage or cookies.

:::info Discovery API
Components use the Discovery [**API**](./api/home.md) to process data, fetch data from other websites, and interact with blockchains.
:::

---

## Creating a Component

To create a component you simply need to implement a return statement, returning some HTML code. 

<WidgetEditor id='1' height="130px">

```ts
let greeting = "Have a great day";

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Hello</h1>
      <p> {greeting} </p>
    </div>
  </>
);
```

</WidgetEditor>

---

## Props: Receiving Input

Components can take arbitrary input, which will be reflected in the `props` variable. In the example below, we are passing as input `name="Anna"`.

<WidgetEditor id='2' height="130px" properties={{name: "Anna"}}>

```ts
let name = props.name || "User";
let greeting = "Have a great day";

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Hello {name}</h1>
      <p> {greeting} </p>
    </div>
  </>
);
```

</WidgetEditor>

---

## State: Storing Information 

Components have an internal state were they can store information.

<WidgetEditor id='3' height="150px">

```ts
State.init({greeting: "Have a great day"});

const onChange = ({target}) => { State.update({greeting: target.value}) };

return (
  <>
    <div class="container border border-info p-3 min-vw-100">
      <p><b> Greeting: </b>  {state.greeting} </p>

      <label class="text-left">Change the Greeting</label>
      <input onChange={onChange} />
    </div>
  </>
);
```

</WidgetEditor>

---

## Composing Components

To compose components you will use the [Predefined `Widget` component](./components/widget.md). For this, you will only need the NEAR username of who created the component, and the component's name.

<WidgetEditor id='4' height="200px">

```ts
const user = "gagdiez.near";
const props = { name: "Anna" };

return (
  <>
    <div class="container min-vw-100">

      <h5> Components can be composed </h5>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
  </>
);
```

</WidgetEditor>