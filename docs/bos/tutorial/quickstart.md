---
id: quickstart
title: Hello Component
sidebar_label: ⭐ Build a Component
---

import {WidgetEditor} from "@site/src/components/social-widget"

NEAR enables to create components that can readily talk with the NEAR network as well as multiple EVM compatible chains.

In this quickstart tutorial we will create a simple application that takes a name as input and renders a friendly greeting.

![img](/docs/quickstart-1.png)

---

## Pre-requisites
To follow this tutorial you will need a NEAR account. There are two ways to get one:
1. Go to the [NEAR main page](https://near.org) and create an account using your email. It's free!
2. Create an account through one of the wallets (e.g. https://mynearwallet.near.com).

![img](/docs/near-create-account.png)
*The simplest way to create a NEAR account is through https://near.org*

:::tip
Creating an account through the NEAR main page will allow you to follow this tutorial without acquiring NEAR. If you create an account through a wallet, you will to manually fund it with some NEAR.
:::

---

## The Online IDE

NEAR `Components` are built using [JSX code](https://legacy.reactjs.org/docs/introducing-jsx.html), which is a mixture of HTML and JS. 

To build the component, we will use the NEAR [online editor](https://near.org/sandbox). Open it, and click in `Create New Component`.

An IDE should appear with buttons to create new components, rename them, preview them, and publish them:

![img](/docs/quickstart-editor-new.png)
*The NEAR [online editor](https://near.org/sandbox) allows you to create and publish components directly from the browser*

:::info Local Development
You can also setup your computer to develop [components locally](/bos/dev/intro). Local development is better when you want to collaborate with other people or create multiple components ar the same time.
:::

---

## Creating Your First Component

Copy the following code into the editor:

```ts
let greeting = "Have a great day";

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p> {greeting} </p>
    </div>
  </>
);
```

Notice that the code makes use of a `props` variable. To add a test property, go to the `props` tab and add the following property: `{"name": "Anna"}`.

<details> 
<summary> What are props? </summary>

The `props` are a set of input parameters that are passed to the component when it is rendered. In this case, we are expecting a `name` property.

```jsx
<Component ... props={{name: "Anna"}} />
```

They will be passed to the component as an JSON object, so you can add as many properties as you want. For example, you could add a `color` property to change the color of the text.

</details>

<br />

Now, simply hit the `Preview Render` button and see your component come to life!

![img](/docs/quickstart-editor-preview.png)
*A simple hello widget saying hi!*

---

## Publish
Give a name to your component using the `Rename` button, for example `HelloNear`. Then, click on the `Publish` button.

![img](/docs/quickstart-save.png)
*The NEAR Social Editor asking if we want to store the component*

<details>
<summary> No Publish Button? </summary>
 If the button is not available, make sure you have signed-in to your [NEAR wallet](https://wallet.near.org) using the `Sign In` button of the editor.
</details>

The site will ask you if you want to save the source code of your new component in the SocialDB (currently deployed at social.near). Indeed, all components are stored as plain text in a NEAR smart contract!

Storing code in a smart contract means that your code is publicly available, so everyone can audit it before using it. Don't worry, nobody can mingle with your code, only you have access to your user's storage in the SocialDB contract. 

---

## Using Your Component
Once your application is published, it will be ready to be combined with other components, or rendered as a standalone application using the BOS Viewer. 

To view your application within [NEAR's main portal](https://near.org) you can enter to `https://near.org/<your-username.near>/widget/<component-name>?name=Anna`.

Here is mine for example: https://near.org/gagdiez.near/widget/Greeter?name=Anna

---

## Composing Components
One of the main advantages of components is that they can be reused and composed with other components.

A BOS application is simply a component that puts together multiple components; this outer component acts as the entry point to your application.
To use your component inside of another one, simply invoke it using a `<Widget>` primitive. This will fetch the code from the NEAR blockchain, and include it inside of your new application.

<WidgetEditor>

```ts
const user = "gagdiez.near";

return (
  <>
    <h3> Composition </h3>
    <p> Components can be composed </p>
    <hr />

    <Widget src={`${user}/widget/Greeter`} props={{name: "Anna"}} />
  </>
);
```
</WidgetEditor>

:::info
Notice that we are passing the input `props` as an `object` to the `Greeter` component.
:::

---

## Embed into your App

Check our [WebApp quickstart guide](develop/integrate/quickstart-frontend) to see how you can create an app that fetch and render Near components in your React application.

#### Using iframes
Another option is to add the component as an `iframe`, thought this would mean that the component will have limited capabilities (e.g. the user won't be able to save data in the chain).

<iframe style={{"width": "100%", "height":"130px"}} src="https://near.org/#/embed/gagdiez.near/widget/Greeter?name=Anna"></iframe>
<em>This component is being rendered inside an `iframe`</em>

Above we included an iframe with source `https://near.org/#/embed/gagdiez.near/widget/Greeter?name=Anna`.