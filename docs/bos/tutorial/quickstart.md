---
id: quickstart
title: ⭐ Quickstart
---

NEAR allows you to quicky develop fullstack decentralized applications by publishing all of its source code on-chain.

In this quickstart tutorial we will create a simple application that takes a name as input and renders a friendly greeting.

![img](/docs/quickstart-1.png)

---

## Development Environment

There are two pathways to creating components & applications:  

- [Online IDE](https://near.org/sandbox) - quickly get started w/ zero setup allowing you to instantly prototype & ship code
- [Local IDE](https://docs.near.org/bos/dev/intro) - get serious and use our NEAR DevTools to setup your local dev environment

---

## Creating Your First Component

To create a `widget` you only need to write valid JSX code, i.e. a mixture of HTML and JS. Let's see how simple it is to create and preview your first component.

<hr class="subsection" />

### Create the Component
In any of the editors, create a new file (`Add` button in the web editors) and name it `Greeter`, then, paste the following code on the editor:

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

<hr class="subsection" />

### Preview
To preview how your component will work, go first to the `props` tab on your editor (or edit the `props.json` file if you are using Visual Studio Code) and add the following property:

```json
{"name": "Anna"}
```

After, simply press the `Preview` button to render the preview of your component!

![img](/docs/quickstart-editor.png)
*Creating a Hello World component using the [NEAR Social Editor](https://near.social/#/edit)*

<hr class="subsection" />

### Publish
Click on the `Save Widget` button to store your application in the NEAR Blockchain. If the button is not available, make sure you have signed-in to your [NEAR wallet](https://wallet.near.org) using the `Sign In` button of the editor.

![img](/docs/quickstart-save.png)
*The NEAR Social Editor asking if we want to store the component*

Accept the transaction in your NEAR Wallet, so the component gets stored in the NEAR blockchain.

<hr class="subsection" />

## Using Your dApp
Once your application is published, it will be ready to be combined with other components, or rendered as a standalone application  using the NEAR Viewer. 

<hr class="subsection" />

### Composition
A NEAR application is simply a component that puts together multiple components; this outer component acts as the entry point to your application. To use your component inside of another, simply invoke it using a `<Widget>` component. This will fetch the code from the NEAR blockchain, and include it inside of your new application.

```ts
const user = "gagdiez.near";

return (
  <>
    <h3> Composition </h3>
    <p> Components can be composed </p>
    <hr />

    <Widget src={`${user}/widget/Greetings`} props={props} />
  </>
);
```

![img](/docs/quickstart-composition.png)
*Rendering of the Composition*

:::info
Notice that we are passing the input `props` as an `object` to the `Greetings` component.
:::

<hr class="subsection" />

### Embedded
To render your component as a standalone application, go to `https://near.social/#/<your-username>/widget/Greeter?name=Anna`.

You can also embed your component in other websites, for example, here we simply have an iframe which `source` is `https://near.social/#/embed/gagdiez.near/widget/Greeter?name=Anna`:


<iframe style={{"width": "100%", "height":"130px"}} src="https://near.social/#/embed/gagdiez.near/widget/Greeter?name=Anna"></iframe>
<em>This component is being rendered inside an `iframe`</em>


:::info
Notice that we are passing the `props.name` as a `GET` parameter in the `url`.
:::
