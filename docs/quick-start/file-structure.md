---
description: Take a look at the file structure of the template NEAR Projects
---

# NEAR Project File Structure

With NEAR, you can create a Dapp using whatever tools you're used to. If you've followed along with the [quickstart to generate a local project](local-development/), or if you're using Near Studio, you'll see the following files present.

## File Structure Deep Dive

{% code-tabs %}
{% code-tabs-item title="Project Directory" %}
```text
assembly/
  main.ts <-- This is where smart contract code (written in typescript) goes 
  model.ts <-- define the types you want to use in your smart contract here
  near.ts
  tsconfig.json
neardev/
  devkey.json
src/
  main.js <-- wire the logic and js for your app here
  test.js <-- for you to write tests
  config.js
  index.html <-- Basic layout for your front end
package.json
README.md
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### `package.json`

If you're coming from the JavaScript/node, you'll be familiar with `package.json`. This is a great place to get acquainted with what dependencies and commands are a part of the app. We won't go through this line by line since the dependencies frequently change. If you aren't familiar, you can read about it [here](https://docs.npmjs.com/creating-a-package-json-file).

Let's start with the meat of the application. There are two important folders: `assembly/` and `src/`

## `assembly/`

This folder is where all the smart contract related code lives as well as the [tsconfig.json file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), which is for the TypeScript compiler. The code-specific files are `main.ts` and `model.ts`. These are where you'll write the entire "backend." In this case, that is composed of a class found inside `model.ts` which is called in `main.ts`.

### `main.ts`

There are two things that you should notice in `main.ts`. The first is that there are things imported at the top from places that don't appear to be imported:

```typescript
import "allocator/arena";
export { memory };

import { context, storage, near } from "./near";
```

In your preferred IDE, you might even see that there are warnings about how the editor can't find the module or file. Something like this:

![VSCode telling me that it can&apos;t find near](../.gitbook/assets/screenshot-2019-06-04-15.26.08-1%20%281%29.png)

The reason this happens is: behind the scenes the compiler is mapping the [TypeScript runtime](https://github.com/nearprotocol/near-runtime-ts) to `near/` in order to import it from `node_modules` as if it were a local file. Something similar is true for `{ memory }` and `./model.near`. That's what allows us to import the model.

```typescript
import { Greeter } from "./model.near";
```

It also allows us to use the `encode` and `decode` helper functions that all classes declared this way have access to. This is important if you're using the `storage` library, but is handled for you in `collections`.

Below the import section is more self explanatory:

```typescript
// --- contract code goes below

// >> hello-snippet
// To be able to call this function in the contract we need to export it
// using `export` keyword.

export function hello(): string {
  let greeter = new Greeter("Hello");
  return greeter.greet("world");
}
// << hello-snippet
```

You can ignore the `hello-snippet` markers. Those are just hooks for self documentation. The most important part is the actual function declaration. The reason being that this is an entire "smart contract." This is all the backend code needed to create a hello world with NEAR. In reality, you can write the simplified version as:

```typescript
export function hello(): string {
  return "Hello World";
}
```

We included the `Greeter` class to show how you can include models in your contracts. Speaking of which...

### `model.ts`

This should be familiar to anyone with any OOP background.

```typescript
// Basic data model
export class Greeter {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  greet(userId: string): string {
    return "Hello, " + userId;
  }
}
```

As you can see, you can declare methods, attributes and use a constructor as you would expect it to work in TypeScript.

In order to actually call these functions from the frontend, you need to remember a couple of things that we will cover next.

## `src/`

This is where frontend code lives by default. There are four files that are all important to creating a dapp: `config.js`, `index.html`, `main.js`, and `test.js`. When you run `npm start` this folder is served to `localhost:5000` by default. First let's look at the index file which is what you're opening in the browser when you navigate there. We're in the part of the application that is most customizable if you're familiar with frontend tools and build processes. E.g if you want to see this implemented using webpack and react, take a look at this [forkable template](https://github.com/nearprotocol/react-template). That template uses an entirely different folder structure but relies on the same concepts we're covering here.

### `index.html`

This is the markup entry point for the application that pulls in the JavaScript dependencies needed to run the app. For this simple example, it's also setting up a hook so we can render the call to the contract for the users to see.

```markup
<!-- >> markup-snippet -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body style="background: #fff">
  <div class="container">
    Contract says:
    <h1 id="contract-message"></h1>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/nearlib@0.7.1/dist/nearlib.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <script src="./config.js"></script>
  <script src="./main.js"></script>
</body>
</html>
<!-- << markup-snippet -->
```

Once again, the `markup-snippet` is just for auto-documentation. The important parts of this file are the dependencies it calls in.

```markup
<script src="https://cdn.jsdelivr.net/npm/nearlib@0.7.1/dist/nearlib.js"></script>
```

This is pulling in [nearlib](https://github.com/nearprotocol/nearlib), which is what will allow us to interact with the smart contract defined before.

```markup
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
```

Pulls in the `js-cookie` dependency that we happen to pull into `config.js`.

```markup
<script src="./config.js"></script>
<script src="./main.js"></script>
```

These are the scripts that are going to set up and initialize our contract.

### `config.js`

In order to deploy an application to TestNet, you will need to modify this file by changing the contract name. This is found at the top of the file.

\(_If you're not familiar with why this is wrapped in parentheses, it's just to immediately invoke this when the file is loaded in order to add these to the global scope so we can use them elsewhere. Normally, dumping things into global scope is not advised, but in this case we're overriding a `getConfig` elsewhere for the specific sake of local development.\)_

```javascript
(function() {
  const CONTRACT_NAME = 'near-hello-devnet'; /* TODO: fill this in! */
  const DEFAULT_ENV = 'development';
[...]
```

DEFAULT\_ENV is set here, but can be overridden in the terminal. It's important to set CONTRACT\_NAME to whatever you created in the terminal. For example, if we run this in bash:

```bash
near create_account "potato.peter"
```

Then we would want the config.js to reflect that:

```javascript
const CONTRACT_NAME = 'potato.peter';
```

The other settings in the switch statement are set when you run commands in terminal.

```javascript
function getConfig(env) {
    switch (env) {
        case 'production':
        case 'development':
            return {
                networkId: 'default',
                    nodeUrl: 'https://studio.nearprotocol.com/devnet',
                    helperUrl: 'https://studio.nearprotocol.com/contract-api',
                    contractName: CONTRACT_NAME,
            };
        case 'local':
        case 'test':
            return {
                networkId: 'local',
                    nodeUrl: 'http://localhost:3030',
                    contractName: CONTRACT_NAME
            };
        default:
            throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
}
```

For instance, you can set `networkId`, `nodeUrl` and `helperUrl` using options flags in [near-shell](https://github.com/nearprotocol/near-shell). Check out [the docs](file-structure.md) for more on those options.

For the most part, you can ignore `cookieConfig`. It's just handling the overhead of getting config from the [NEARStudio IDE](http://near.dev) if you upload your project.

**The thing to remember about `config.js` is that it adds the config specific to your app to the global scope.**

### `main.js`

This is the entry point for any js for your application. For a small application it can also hold the entirety of your frontend. For the initialization, there are two important parts to keep in mind.

```javascript
async function initContract() {
  // Initializing connection to the NEAR DevNet or local node.
  window.near = await nearlib.dev.connect(nearConfig);
  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(nearConfig.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["hello"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: [],
    // Sender is the account ID to initialize transactions.
    // For devnet we create accounts on demand. See other examples on how to authorize accounts.
    sender: nearlib.dev.myAccountId
  });
}
```

The first piece of the puzzle is the `initContract` function itself. You can name this whatever you want, but it's necessary to use the `async` keyword when you declare the function. Read about that [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

**Important:** Inside of `initContract`, you need to use `near.loadContract` to register the methods defined in `main.ts`. If you don't do this step, the methods are unavailable on the frontend. This is only necessary while we're developing the runtime, in the future it will be handled for you.

The way to do this is just to set them as strings in the arrays for `viewMethods` and `changeMethods`.

The second piece of the puzzle is making sure to _call_ to `initContract` in a way that allows you to do things once it's fully initialized.

Here, this is accomplished with:

```javascript
window.nearInitPromise = initContract()
  .then(doWork)
  .catch(console.error);
```

Calling `then` on the `initContract` function allows us to use the contract that we created wherever we want in the frontend. All of this together is what actually us to call `doWork`.

```javascript
// Using initialized contract
async function doWork() {
  // Calling method hello on the blockchain for our contract.
  // .hello() returns a promise which we awaiting.
  const message = await contract.hello();
  // Displaying the message once we have it.
  document.getElementById('contract-message').innerText = message;
}
```

Now that everything is defined and initialized, you can also call methods on the contract in the browser console.

We've got one more thing to do before we're done: write tests!

### `test.js`

The default library for testing when you generate a project is [Jasmine](https://jasmine.github.io/). The benefit of a contract that you can pass to the frontend is that you can unit test your project just like you would unit test a frontend application. I'm not going to cover Jasmine specific syntax. Visit [their docs](https://jasmine.github.io/tutorials/your_first_suite) to get an idea for how to declare tests.

```javascript
[...]
// Common setup below
beforeAll(async function () {
  if (window.testSettings === undefined) {
    window.testSettings = {};
  }
  near = await nearlib.dev.connect(testSettings);
  accountId = testSettings.accountId ? testSettings.accountId : nearlib.dev.myAccountId;
  const contractName = testSettings.contractName ?
    testSettings.contractName :
    (new URL(window.location.href)).searchParams.get("contractName");
  contract = await near.loadContract(contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["hello"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: [],
    sender: accountId
  });
});
[...]
```

We need to init the contract the same way that we did in `config.js`, the main thing we need to be concerned with is pulling in the contract methods in the same way we did in `main.js`. After that we simply write our tests and run!

```bash
npm run test
```

That's it for scaffolding and exploring the generated blank project created by the template generator in the CLI. Happy hacking!

