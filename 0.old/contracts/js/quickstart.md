---
id: jsvm-quickstart
title: NEAR-SDK-JS QuickStart
sidebar_label: Quick Start Guide
---

> Introducing a new way of writing smart contracts by using JavaScript! 🚀

In this quick start guide you'll learn:

- [Setting up a new JavaScript smart contract](#setup)
- [Compile and deploy JS smart contracts](#build)
- [Interacting with JS smart contract](#interact)

:::tip
Alternatively, you can clone the [`near-sdk-js-quickstart`](https://github.com/near-examples/near-sdk-js-quickstart) repository for a pre-built template to start from!
:::

---

## Background

NEAR natively supports smart contracts that compile to [WebAssembly](https://webassembly.org/) with two primary languages:

- [Rust](https://www.rust-lang.org/) -> [`near-sdk-rs`](https://docs.near.org/docs/develop/contracts/rust/intro)
- [AssemblyScript](https://www.assemblyscript.org/) -> [`near-sdk-as`](https://docs.near.org/docs/develop/contracts/as/intro)

In addition to developing natively on NEAR, you can also deploy your [Solidity smart contracts](https://soliditylang.org/) using [Aurora](https://aurora.dev/) (an Ethereum Virtual Machine (`EVM`), contained within a smart contract deployed on NEAR 🤯 ).

Much like Aurora, we have created a JavaScript Enclave or JavaScript Virtual Machine (`JSVM`) that is also contained within a smart contract deployed on NEAR.

This provides an isolated environment where developers can use a language they are familiar with as well as utilize JavaScript dependencies they are used to. `near-sdk-js` allows you to learn the basics of smart contract development on NEAR without needing to learn a new programming language. 💪

:::tip Tip
There are several pros and cons when comparing native `Wasm` smart contracts with `JSVM` smart contracts.
:::

| Areas                                      | Native (Wasm) | JSVM        |
| ------------------------------------------ | ------------- | ----------- |
| Synchronous Cross-Contract Calls           | ❌            | ✅          |
| Call methods on any smart contract on NEAR | ✅            | Not in v1.0 |
| Standards Support                          | ✅            | Not in v1.0 |
| Function Call Access Key Support           | ✅            | Not in v1.0 |

In addition to the ability to develop in a language you are already familiar with, the `JSVM` operates in a synchronous environment which provides an easy way to create smart contracts that interact with other contracts known as performing "cross-contract" calls.

:::warning Heads up
JavaScript smart contract development is not recommended for financial use cases as it is still very new to the NEAR ecosystem.
:::

---

## Requirements

- [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [near-cli](https://docs.near.org/docs/tools/near-cli) `v3.1.1` or greater

```bash
npm install -g near-cli
```

:::warning
If you already have `near-cli` installed, please ensure you are running `v3.1.1` or greater:
```
near --version
```
:::
---

## Creating a project

### Setup

1. Create a new directory for your project:

```bash
mkdir your-awesome-JS-project
```

2. In your newly created directory, create a `package.json` file using `npm`:

Change directory into your new project:

```bash
cd your-awesome-JS-project
```

Create a `package.json`:

```bash
npm init -y
```

This will create a `package.json` file with contents similar to:

```js
{
  "name": "your-awesome-JS-project",
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

3. Now install `near-sdk-js` by adding it as a dependency to your project:

```bash
npm install --save near-sdk-js
```

4. Once `near-sdk-js` has been successfully installed, add a script in your `package.json` that will compile your smart contract:

```diff
{
  "name": "your-awesome-js-project",
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
    "near-sdk-js": "^0.3.0"
  }
}
```

5. Create the file structure for your smart contract:

```bash
mkdir src && touch src/index.js
```

:::warning
Please note that you must have the `index.js` file located in a `src` directory at the root of your project. This allows `near-sdk-js` to find your smart contract and compile it to format that is compatible with the `JSVM`.

```
└── src
    └── index.js
```

:::

6. Create a `babel.config.json` file which allows you to configure how the contract is built.

- Run the folloing command in your project's root folder:

```bash
touch babel.config.json
```

- Add the following code to your `babel.config.json` file:

```js
{
  "plugins": [
    "near-sdk-js/src/build-tools/near-bindgen-exporter",
    ["@babel/plugin-proposal-decorators", {"version": "legacy"}]
  ]
}
```

7. Last, install all the packages!

```bash
npm install
```

Your project structure should look like this:

```
your-awesome-JS-project
├── node_modules
├── package-lock.json
├── babel.config.json
├── package.json
└── src
    └── index.js
```

---

### Writing your first contract

With the basic structure created, it's time to start writing your first contract!

These steps will create a simple smart contract that will store and retrieve a greeting written on the blockchain. You will create two methods that you can interact with by performing smart contract calls, or simply contract calls. These methods are `set_greeting` and `get_greeting`.

- `set_greeting` stores a value in the form of a string in the smart contract
- `get_greeting` will retrieve the most current value that was written on the contract

1. Start by opening the `src/index.js` file as this is where all of your smart contract logic will be written. Start by importing some dependencies from `near-sdk-js`:

```js
import { NearContract, NearBindgen, call, view } from "near-sdk-js";
```

- `NearContract`: A constructing class for creating smart contracts in the proper format.
- `NearBindgen`: allows your contract to compile to base64 which is compatible with the `JSVM`.
- `call`, `view`: decorators that allow functions in a contract to be discovered and interacted with.

2. Below the SDK imports, create a new class that extends the `NearContract`:

```js
// The NearBindgen decorator allows this code to compile to WebAssembly.
@NearBindgen
class MyContract extends NearContract {
  constructor() {
    //execute the NEAR Contract's constructor
    super();
    this.message = "Hello Web3 World!";
  }
}
```

Running the constructor will default the contract's `message` state variable to 'Hello Web3 World!'.

3. You will now need a way to retrieve this message from the blockchain. To do this, create a new `@view` function within the class:

```js
// @view indicates a 'view method' or a function that returns
// the current values stored on the blockchain. View calls are free
// and do not cost gas.
@view
get_greeting() {
    env.log(`current greeting is ${this.message}`)
    return this.message
}
```

You now have a way to initialize the contract and get the current greeting.

4. Next, create a way to change the message by passing a new variable as a string:

```js
// @call indicates that this is a 'change method' or a function
// that changes state on the blockchain. Change methods cost gas.
// For more info -> https://docs.near.org/docs/concepts/gas
@call
set_greeting({ message }) {
    env.log(`Saving greeting ${message}`)
    this.message = message
}
```
:::note Heads up
It's important that for your functions that take parameters, they're wrapped in curly brackets, `{}` such as: `set_greeting({ message })` instead of `set_greeting(message)`.
:::

That's it! Your contract should look like this:

```js
import { NearBindgen, NearContract, call, view } from "near-sdk-js";

// The NearBindgen decorator allows this code to compile to WebAssembly.
@NearBindgen
class MyContract extends NearContract {
  constructor() {
    //execute the NEAR Contract's constructor
    super();
    this.message = "Hello Web3 World!";
  }

  // @call indicates that this is a 'change method' or a function
  // that changes state on the blockchain. Change methods cost gas.
  // For more info -> https://docs.near.org/docs/concepts/gas
  @call
  set_greeting({ message }) {   
    env.log(`Saving greeting ${message}`);
    this.message = message;
  }

  // @view indicates a 'view method' or a function that returns
  // the current values stored on the blockchain. View calls are free
  // and do not cost gas.
  @view
  get_greeting() {
    env.log(`The current greeting is ${this.message}`);
    return this.message;
  }
}

```

:::note Heads up
You might see a warning from your JavaScript linter because `near-sdk-js` uses a custom decorator which is an experimental feature. This will be addressed in a future release and can be ignored for now.
:::

---

### Build

With your smart contract complete, it's time to compile it and encode it to base64. (`JSVM` requires this format)

- Use the script you created earlier by running

```
npm run build
```

Once complete, your compiled contract will be exported in `./build/contract.base64`. You can now deploy the contract and start interacting with it! 💪

---

### Deploy

The easist way to deploy your contract is to use a `near-cli` command `dev-deploy`. This will both create a new [development account](/docs/concepts/account#dev-accounts) as well as deploy the contract using this account on the `JSVM`.

Run:

```
near js dev-deploy --base64File build/contract.base64 --deposit 0.1
```

:::tip
Alternatively, if you [already have an account](/docs/develop/basics/create-account) and have [logged in with `near-cli`](https://docs.near.org/docs/tools/near-cli#near-login), you can specify the account you want to use to deploy:

```
near js deploy --accountId <YOUR_ACCOUNT_ID> --base64File build/contract.base64 --deposit 0.1
```

:::

You should see a successful response similar to:

```bash
Starting deployment. Account id: <someAccountID>, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: build/contract.base64, JSVM: jsvm.testnet
Transaction Id EvSt3A4auSkBWKUvRo2JtbP7UdwimLmRh7fyn89RZ1d4
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/EvSt3A4auSkBWKUvRo2JtbP7UdwimLmRh7fyn89RZ1d4
```

Congratulations! You have successfully deployed a JS smart contract into this `JSVM` located inside `JSVM.testnet` contract. :tada:

---

### Interact

Now that your contract is deployed, you can start interacting with it by performing contract calls on the methods you created.

1. For simplicity, export the account ID that the contract is deployed to into an environment variable:

```bash
export JS_CONTRACT="dev-1653584404106-63749024395789"
```

2. Now, initialize the contract which will set the default greeting:

```bash
near js call $JS_CONTRACT init --accountId $JS_CONTRACT --deposit 0.1
```

If you try to interact with the contract before it's initialized, you'll get an error saying _"Contract state is empty"_.

3. Once the contract is initialized, you can view the current greeting by calling the `view` method you wrote earlier:

```bash
near js view $JS_CONTRACT get_greeting
```

This should return something similar to:

```bash
View call in JSVM[jsvm.testnet]: dev-1653584404106-63749024395789.get_greeting()
Log [jsvm.testnet]: current greeting is Hello Web3 World!
'Hello Web3 World!'
```

4. Try changing the greeting by calling `set_greeting`:

```bash
near js call $JS_CONTRACT set_greeting '{"message": "GO TEAM!"}' --accountId $JS_CONTRACT --deposit 0.1
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

Congratulations! You've just successfully created a new smart contract from scratch, deployed it to the blockchain, and made a few smart contract calls all while using JavaScript! :tada:

## Storage

You may have noticed that there was a `--deposit 0.1` flag at the end of your call when interacting with your JS smart contract. This was to cover storage costs on the blockchain through a concept known as [storage staking](/docs/concepts/storage-staking).

When developing on NEAR, smart contracts must maintain enough $NEAR tokens on the account to cover data storage at a rate of 1 $NEAR per 100/kb. Using the `near-cli`, the `--deposit` flag will allow you to attach a specified amount of $NEAR to cover the extra information you are storing. You do not need to know the _exact_ amount of $NEAR required as if you overpay, you will be refunded the difference. However, if you _do not_ attach enough $NEAR to your call to cover additional storage, the contract call will fail.

## Help & Feedback 

Stuck and need help? There are several ways we can assist you!

- Post a question in #dev-support channel on [Discord](http://near.chat).
- Get live support with our [Developer Relations team](http://near.org/office-hours) (Twice daily)

Help us enhance our JavaScript SDK and participate in its development process!

- Visit our [GitHub discussions](https://github.com/near/near-sdk-js/discussions) and give us your feedback!
- Join one of our monthly [Developer Tools Community Meetings](http://near.ai/tooling-meetings) and give us your feedback or ask some questions!





