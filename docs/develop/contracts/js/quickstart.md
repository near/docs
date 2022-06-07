---
id: enclave-quickstart
title: NEAR-SDK-JS QuickStart
sidebar_label: Quick Start Guide
---

> Introducing a new way of writing smart contracts by using JavaScript! 🚀

In this quick start guide you'll learn: 
  - Setting up a new JavaScript smart contract 
  - Compile and deploy JS smart contracts
  - Interacting with JS smart contract
  - Connecting a simple front-end to the NEAR blockchain

---

## Background

NEAR natively supports smart contracts that compile to [WebAssembly](https://webassembly.org/) with two primary languages:

- [Rust](https://www.rust-lang.org/) -> [`near-sdk-rs`](https://docs.near.org/docs/develop/contracts/rust/intro)
- [AssemblyScript](https://www.assemblyscript.org/) -> [`near-sdk-as`](https://docs.near.org/docs/develop/contracts/as/intro)

In addition to developing natively on NEAR, you can also deploy your [Solidity smart contracts](https://soliditylang.org/) using [Aurora](https://aurora.dev/) (an `EVM`, Ethereum Virtual Machine, contained within a smart contract deployed on NEAR 🤯 ).

Much like Aurora, we have created a JavaScript Enclave or `JSVM` (JavaScript Virtual Machine) that is also contained within a smart contract deployed on NEAR.

This provides an isolated environment where developers can use a language they are familiar with as well as utilize JavaScript dependencies they are used to. `near-sdk-js` allows you to learn the basics of smart contract development on NEAR without the needing to learn a new programming language. 💪

:::tip Tip
There are several pros and cons when comparing native `Wasm` smart contracts with `JSVM` smart contracts.
:::

| Areas                                      | Native (Wasm) | JSVM        |
| ------------------------------------------ | ------------- | ----------- |
| Synchronous Cross-Contract Calls           | ❌            | ✅          |
| Call methods on any smart contract on NEAR | ✅            | ❌          |
| Standards Support                          | ✅            | Not in v1.0 |
| Function Call Access Key Support           | ✅            | Not in v1.0 |

In addition to the ability to develop in a language you are already familiar with, the `JSVM` operates in a synchronous environment which provides an easy way to create smart contracts that interact with other contracts know as performing "cross-contract calls.

:::warning Heads up
JavaScript smart contract development is not recommended for financial use cases as it is still very new to the NEAR ecosystem.
:::

## Requirements

- [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [near-cli](https://docs.near.org/docs/tools/near-cli) `v3.1.1` or greater

```bash
npm i -g near-cli
```

---

## Creating a project

Now that you have Node, npm, and the NEAR-CLI installed, create a new directory to initialize the project in.

```bash
mkdir javascript-enclave-quickstart && cd javascript-enclave-quickstart
```

Once you're in the directory, initialize a new default npm project.

```bash
npm init -y
```

This will create a `package.json` file with contents similar to:

```js
{
  "name": "javascript-enclave-quickstart",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

The next step is to install the `near-sdk-js` package and add it as a dependency for your project. This will allow for convenient ways of building and interacting with your smart contract.

```bash
npm install --save near-sdk-js
```

Once the package has successfully been installed, you can create a convenient script in your `package.json` for building your contract. Add the following line to your `package.json` under the `scripts` section:

```diff
{
  "name": "javascript-enclave-quickstart",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
+   "build": "near-sdk build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "near-sdk-js": "^0.1.1"
  }
}
```

> **Note:** This is optional and you can simply run `near-sdk build` instead.

You'll now want to create the `src` directory and initialize a new JS file `index.js` where your contract logic will live.

```bash
mkdir src && cd src && touch index.js && cd ..
```

The last step is to create a new file called `babel.config.json` which allows you to configure how the contract is built. In the project's root folder, create a new file and add the following content.

```bash
touch babel.config.json
```

```js
{
  "plugins": [
    "near-sdk-js/src/build-tools/near-bindgen-exporter",
    ["@babel/plugin-proposal-decorators", {"version": "legacy"}]
  ]
}
```

At this point, you just need to install all the packages and you will be ready to build your smart contract!

```bash
npm install
```

Your file structure should now look as follows:

```
javascript-enclave-quickstart
├── node_modules
├── package-lock.json
├── babel.config.json
├── package.json
└── src
    └── index.js
```

### Writing your first contract

Now that you have the basic structure outlined for your project, it's time to start writing your first contract. You'll create a simple contract for setting and getting a greeting message on-chain.

The contract presents 2 methods: `set_greeting` and `get_greeting`:

- `set_greeting` stores a String in the contract's parameter message,
- while `get_greeting` retrieves it.

By default, the contract returns the message "Hello".

Start by opening the `src/index.js` file as this is where your logic will go. You'll then want to add some imports that will help when writing the contract:

```js
import { NearContract, NearBindgen, call, view, near } from "near-sdk-js";
```

Let's break down these imports to help you understand why they're necessary.

- `NearContract`: allows the contract to inherit functionalities for changing and reading the contract's state. The state can be thought of as the data stored on-chain.
- `NearBindgen`: allows your contract to compile down to something that is NEAR compatible.
- `call`, `view`: allows your methods to be view-only functions or mutable (change) functions.
- `near`: allows you to access important information within your functions such as the signer, predecessor, attached deposit, etc.

Now that you've imported everything from the SDK, create a new class that extends the `NearContract`. This class will contain the core logic of your smart contract. You can also use this opportunity to create a default message variable. Below the `import` add:

```js
// Define the default message
const DEFAULT_MESSAGE = "Hello";

@NearBindgen
class StatusMessage extends NearContract {
  // Define the constructor, which initializes the contract with a default message
  constructor() {
    // Used to give access to methods and properties of the parent or sibling class
    super();
    // Default the status records to
    this.message = DEFAULT_MESSAGE;
  }
}
```

Running the constructor will default the contract's `message` state variable with the `DEFAULT_MESSAGE`. Since there's no way to get the current greeting, within the class you can add the following `view` function:

```js
// Public method - returns the greeting saved, defaulting to DEFAULT_MESSAGE
@view
get_greeting() {
    env.log(`current greeting is ${this.message}`)
    return this.message
}
```

You now have a way to initialize the contract and get the current greeting. The next step is to create a setter which will take a message as a parameter and set the contract's `message` variable equal to the passed in string.

```js
// Public method - accepts a greeting, such as "howdy", and records it
@call
set_greeting(message) {
    let account_id = near.signerAccountId()
    env.log(`Saving greeting ${message}`)
    this.message = message
}
```

At this point, your contract is finished and should look as follows:

```js
import { NearContract, NearBindgen, call, view, near } from "near-sdk-js";

// Define the default message
const DEFAULT_MESSAGE = "Hello";

@NearBindgen
class StatusMessage extends NearContract {
  // Define the constructor, which initializes the contract with a default message
  constructor() {
    // Used to give access to methods and properties of the parent or sibling class
    super();
    // Default the status records to
    this.message = DEFAULT_MESSAGE;
  }

  // Public method - returns the greeting saved, defaulting to DEFAULT_MESSAGE
  @view
  get_greeting() {
    env.log(`current greeting is ${this.message}`);
    return this.message;
  }

  // Public method - accepts a greeting, such as "howdy", and records it
  @call
  set_greeting(message) {
    let account_id = near.signerAccountId();
    env.log(`Saving greeting ${message}`);
    this.message = message;
  }
}
```

:::note Heads up
You might see a warning from your JavaScript linter because the NEAR SDK uses a custom decorator which is an experimental feature. This will be addressed in a future release of the JS SDK. It can be ignored for now.
:::

### Building

With this environment, developers will compile their contracts to base64 (instead of Wasm) and then deploy to the `JSVM` contract.

Now that your contract is finished, it's time to build and deploy it. Run the following command to build your JS code and get the `build/contract.base64` contract file.

```
yarn build
```

You can now deploy the contract and start interacting with it!

### Deploying

Start by deploying the contract using the following command. This will create a [dev account](/docs/concepts/account#dev-accounts) and deploy the contract to it.

```
near js dev-deploy --base64File build/contract.base64 --deposit 0.1
```

Alternatively, if you have an account already, you can specify the account you want to deploy to:

```
near js deploy --accountId <YOUR_ACCOUNT_ID> --base64File build/contract.base64 --deposit 0.1
```

> **Note**: When deploying the smart contract using the enclave approach, it will live on top of a virtual machine smart contract that is deployed to `jsvm.testnet`. This will act as a "middleman" and to interact with your contract, you'll need to go through the `jsvm` contract.

### Interacting

The return from the deploy should include an account address in the first line after Account id:

```bash
Starting deployment. Account id: <someAccountID>, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: build/contract.base64, JSVM: jsvm.testnet
Transaction Id EvSt3A4auSkBWKUvRo2JtbP7UdwimLmRh7fyn89RZ1d4
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/EvSt3A4auSkBWKUvRo2JtbP7UdwimLmRh7fyn89RZ1d4
```

Now that your contract is deployed, you can start interacting with it. The first thing to do is initialize the contract. For simplicity, export the account ID that the contract is deployed to into an environment variable.

```bash
export JS_CONTRACT="dev-1653584404106-63749024395789"
```

You'll now initialize the contract such that the default greeting is set. If you try to interact with the contract before it's initialized, you'll get an error saying "Contract state is empty".

```bash
near js call $JS_CONTRACT init --accountId $JS_CONTRACT --deposit 0.1
```

Once the contract is initialized, you can view the current greeting by performing a `view` call:

```bash
near js view $JS_CONTRACT get_greeting
```

This should return something similar to:

```bash
View call in JSVM[jsvm.testnet]: dev-1653584404106-63749024395789.get_greeting()
Log [jsvm.testnet]: current greeting is Hello
'Hello'
```

Now that you know how to get the current greeting, you can go ahead and call the setter `set_greeting`:

```bash
near js call $JS_CONTRACT set_greeting '["GO TEAM!"]' --accountId $JS_CONTRACT --deposit 0.1
```

This should return something similar to:

```bash
Scheduling a call in JSVM[jsvm.testnet]: dev-1653584404106-63749024395789.set_greeting(["GO TEAM!"]) with attached 0.1 NEAR
Receipts: 8w9tNKgqtAnJd9UW5WMCFuGsTXHo83vvPHD5Ph36yWJM, E9CJED2cpLC7uaTb6s67i3KKbinDzcjUQXspK7Jj7CdF
	Log [jsvm.testnet]: Saving greeting GO TEAM!
Transaction Id 8gr8gtWDvCGzwS9HQ9GerKxBqDbnbwaWr5bBjdDpDBYg
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/8gr8gtWDvCGzwS9HQ9GerKxBqDbnbwaWr5bBjdDpDBYg
''
```

Your contract is now finished and you've learned how to interact with it using the NEAR-CLI!

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol"> > <h8>Ask it on StackOverflow!</h8></a>
