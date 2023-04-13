---
sidebar_position: 3
---

# Components

## Overview

Components are a fundamental aspect of the Blockchain Operating System, providing a standard unit of software that packages up code and dependencies for rapid and reliable execution. These standalone, lightweight, and reusable components store HTML/CSS/JavaScript code on-chain and can be loaded into gateways for users.

You can view and create components at [bos.gg](https://bos.gg).

#### Programming language
Components are coded in a limited version of JSX (JavaScript with ReactJS) and are stored on-chain, where they are loaded and executed in a custom Virtual Machine. If you are unfamiliar with ReactJS, this [React tutorial](https://reactjs.org/tutorial/tutorial.html) should be helpful.

#### Open source with version control
Each component’s source code is stored on a public blockchain, making them open source by default. Component owners can upgrade components by updating the source code. Since the code is stored on-chain, all previous versions of a component are also available. This enables automatic version control for every component. 

#### Forking
If you are familiar with Git, you are probably familiar with the concept of forking, which enables users to fork any public repository to create their own versions. Similarly, you can fork any BOS component to get started quickly. For example, the Lido[URL] component is a great starting point.

#### Deploying
The source code of each component is stored on-chain. BOS uses the NEAR blockchain underneath. Deployment is easy, with just a few clicks. To deploy a component, you will need a NEAR account and NEAR tokens for the storage deposit. 

## Getting started

To begin building a component, we recommend following our tutorial as the best way to get started. The first two tutorials listed below are quick and easy ways to get familiar with building with BOS, taking less than 5 minutes each. In addition, the Lido example provides a fully-fledged demonstration of how to interact with a smart contract deployed on the Ethereum mainnet.

* [Hello World](Tutorials/hello-world.md)
* [Hello EthersJS](Tutorials/hello-ethersJS.md)
* [Hello Lido](Tutorials/hello-lido.md)


## Digging deeper

A typical read-only component often includes following elements:
* Input preparation - this involves retrieving data from properties passed in or from the context object.
* Data fetching - the component fetches the necessary data from a smart contract or an external endpoint.
* Data processing - the fetched data is processed by filtering and/or sorting it, for example.
* Rendering - the data is then rendered using React components.

#### Input preparation
To prepare input for BOS components, you can pass data to them through the props object, just like with React components. If a component is a child of another component, the parent component can pass data to it via props. The props object can contain data, functions, or even other React components. When data is passed to a component, it becomes a copy of the original data, which means that any changes made to the data within the component won't affect the parent component.

In addition to props, BOS components have access to another object called "context." Currently, the context object only has a single field called "accountId," which contains the account ID of the signed-in user, or undefined if the user is not signed in.

Here's an example of how to prepare input for a BOS component:

const accountId = props.accountId ?? context.accountId;

#### Fetching data

Please refer to the Virtual Machine APIs [URL]] for the list of available APIs. Because the VM is synchronous, it’s important to schedule all data that needs to be fetched before processing it. This ensures that all promises are issued in parallel. The widget will be rerendered whenever any of the promises is resolved.

Here is an example of how to use the fetch function:

```jsx
const apr = fetch(   "https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr"
  );
```

#### Processing data
After fetching data, it’s often necessary to process the data and store it in the state for future use. Here is an example:

```jsx
const apr = fetch(
    "https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr"
  );
  if (!apr) return;
  State.update({ lidoArp: JSON.parse(apr?.body?.contents) ?? "..." });
```

#### Rendering
Now that you have the data ready, you can use a variety of React components to render it. For more information, please see the Lido example.

In addition, you can embed other components using the Widget tag, like this:

```jsx
<Widget
  src="mob.near/widget/ProfileImage"
  props={{
    profile,
    accountId,
    className: "float-start d-inline-block me-2",
  }}
/>
```

#### State
BOS components have a state object, similar to React components. However, unlike React’s useState hook, BOS components have a single `state` object named state.

By default, the state equals undefined and needs to be initialized using the State.init or State.update functions. The State.init function takes the initial state object, and will be no-op if the state is already initialized. The State.update function triggers a state update and rerenders the component. It also accepts an optional argument, an object that will be added to the state object using Object.assign.

Once the state is initialized, you can change its properties directly and call State.update() to trigger re-rendering with the new values.

One of the reasons to use state is to have controlled input components. Here is an example:

```jsx
State.init({ accountId: "" });

return (
  <input
    type="text"
    className="form-control"
    value={state.accountId}
    onChange={(e) => {
      const accountId = e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, "");
      State.update({ accountId });
    }}
  />
);
```

Another reason to use state is to cache fetched data. Here is an example:

```jsx
if (!state) {
  // Fetch the data and process it.
  const tags = fetchAndComputeTags();
  
  if (tags !== null) {
    State.init({ tags });
  }
}
```
## Next steps

To begin building a component, we recommend following our tutorial as the best way to get started:

* [Hello World](Tutorials/hello-world.md)
* [Hello EthersJS](Tutorials/hello-ethersJS.md)
* [Hello Lido](Tutorials/hello-lido.md)
