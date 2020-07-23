---
id: development-overview
title: Project Structure
sidebar_label: Project Structure
---

<blockquote class="danger">
<strong>heads up</strong><br><br>

We are **currently migrating away from NEAR Studio** to a better experience for developers.  This article includes references to NEAR Studio which is being phased out.

For the most up to date examples of building on the NEAR platform, please refer to https://examples.near.org

</blockquote>

Many of our tutorials use examples to create the basic project structure needed before diving into the details.  This page explains that structure.

```text
assembly/
  main.ts <-- This is where smart contract code (written in AssemblyScript) goes
  model.ts <-- define the types you want to use in your smart contract here
  tsconfig.json
neardev/
out/
src/
  wallet/
  config.js <-- Config file
  index.html <-- Basic layout for your front end
  main.js <-- wire the logic and js for your app here
  test.js <-- for you to write tests
gulpfile.js
package-lock.json
package.json
README.md
```

### `package.json`

If you're coming from the JavaScript/node, you'll be familiar with `package.json`. This is a great place to get acquainted with what dependencies and commands are a part of the app. We won't go through this line by line since the dependencies frequently change. If you aren't familiar, you can read about it [here](https://docs.npmjs.com/creating-a-package-json-file).

Let's start with the meat of the application. There are two important folders: `assembly/` and `src/`

## `assembly/`

This folder is where all the smart contract related code lives as well as the [tsconfig.json file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), which is for the AssemblyScript compiler. The code-specific files are `main.ts` and `model.ts`. These are where you'll write the entire "backend." In this case, that is composed of a class found inside `model.ts` which is called in `main.ts`.

### `main.ts`

There are two things that you should notice in `main.ts`.

```ts
//@nearfile
import { context, storage } from "near-sdk-as";
import { Greeter } from "./model";
```

`near-sdk-as` is what allows us to write contracts using AssemblyScript. It also allows us to use the `encode` and `decode` helpers that all classes have access to. This is important if you're using the `storage` library, and is handled for you in `collections`.

```ts
// --- contract code goes below

// To be able to call this function in the contract we need to export it
// using `export` keyword.

export function hello(): string {
  let greeter = new Greeter("Hello");
  return greeter.greet("world");
}
```

You can ignore the `hello-snippet` markers. Those are just hooks for self documentation. The most important part is the actual function declaration. The reason being that this is an entire "smart contract." This is all the backend code needed to create a hello world with NEAR. In reality, you can write the simplified version as:

```ts
export function hello(): string {
  return "Hello World";
}
```

We included the `Greeter` class to show how you can include models in your contracts. Speaking of which...

### `model.ts`

This should be familiar to anyone with any OOP background.

```ts
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

As you can see, you can declare methods, attributes and use a constructor as you would expect it to work in TypeScript although it's not, it's AssemblyScript.

In order to actually call these functions from the frontend, you need to remember a couple of things that we will cover next.

## `src/`

This is where frontend code lives by default. There are four files that are all important to creating a dapp: `config.js`, `index.html`, `main.js`, and `test.js`. When you run `npm start` this folder is served to `localhost:5000` by default. First let's look at the index file which is what you're opening in the browser when you navigate there. We're in the part of the application that is most customizable if you're familiar with frontend tools and build processes. E.g if you want to see this implemented using webpack and react, take a look at this [forkable template](https://github.com/nearprotocol/react-template). That template uses an entirely different folder structure but relies on the same concepts we're covering here.

### `index.html`

This is the markup entry point for the application that pulls in the JavaScript dependencies needed to run the app. For this simple example, it's also setting up a hook so we can render the call to the contract for the users to see.

Furthermore we've included some logic and css classes that helps branch the login flow from the logged in flow.

```markup
    <div id="signed-in-flow" class="d-none">
      <div class="row">
        <h3>Hi, <i id="account-id"></i>!</h3>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <button id="say-hi" class="btn btn-success btn-lg btn-block ">Say "Hi!"</button>
        </div>
        <div class="col-sm-3">
          <button id="sign-out-button" class="btn btn-danger btn-lg btn-block">Sign-out</button>
        </div>
      </div>
    </div>
```

The important part of this file is where the dependencies are called in  \(You should see these near the closing  `</body>` tag.

```markup
  <script src="https://cdn.jsdelivr.net/gh/nearprotocol/near-api-js/dist/near-api-js.js"></script>
```

This is pulling in [near-api-js](https://github.com/near/near-api-js), which is what will allow us to interact with the smart contract defined before.

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

If you want to specify a name for you contract, you can do that in config.js. This is found at the top of the file.

\(_If you're not familiar with why this is wrapped in parentheses, it's just to immediately invoke this when the file is loaded in order to add these to the global scope so we can use them elsewhere. Normally, dumping things into global scope is not advised, but in this case we're overriding a `getConfig` elsewhere for the specific sake of local development.\)_

```javascript
(function() {
  const CONTRACT_NAME = 'near-hello-testnet'; /* TODO: fill this in! */
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
                    nodeUrl: 'https://rpc.testnet.near.org/',
                    helperUrl: 'https://helper.testnet.near.org'
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

For instance, you can set `networkId`, `nodeUrl` and `helperUrl` using options flags in [near-shell](https://github.com/nearprotocol/near-shell).


**The thing to remember about `config.js` is that it adds the config specific to your app to the global scope.**

### `main.js`

This is the entry point for any js for your application. For a small application it can also hold the entirety of your frontend. For the initialization, there are two important parts to keep in mind.

```javascript
async function initContract() {
  console.log("nearConfig", nearConfig);

  // Initializing connection to the NEAR testnet.
  window.near = await nearAPI.connect(Object.assign({ deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletAccount = new nearAPI.WalletAccount(window.near);

  // Getting the Account ID. If unauthorized yet, it's just empty string.
  window.accountId = window.walletAccount.getAccountId();

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(nearConfig.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["whoSaidHi"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ["sayHi"],
    // Sender is the account ID to initialize transactions.
    sender: window.accountId,
  });
}
```

The first piece of the puzzle is the `initContract` function itself. You can name this whatever you want, but it's necessary to use the `async` keyword when you declare the function. Read about that [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

**Important:** Inside of `initContract`, you need to use `near.loadContract` to register the methods defined in `main.ts`. If you don't do this step, the methods are unavailable on the frontend.

The way to do this is just to set them as strings in the arrays for `viewMethods` and `changeMethods`. A detailed discussion on
`viewMethods` vs `changeMethods` can be found [here](/docs/roles/developer/contracts/assemblyscript).

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
  // Setting up refresh button
  document.getElementById('refresh-button').addEventListener('click', updateWhoSaidHi);

  // Based on whether you've authorized, checking which flow we should go.
  if (!window.walletAccount.isSignedIn()) {
    signedOutFlow();
  } else {
    signedInFlow();
  }
}
```

From here, we branch the logic between `signedOutFlow` and `signedInFlow`.

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
  near = await nearAPI.dev.connect(testSettings);
  accountId = testSettings.accountId ? testSettings.accountId : nearAPI.dev.myAccountId;
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
