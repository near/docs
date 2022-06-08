---
id: enclave-quickstart
title: NEAR-SDK-JS QuickStart
sidebar_label: Quick Start Guide
---

> Introducing a new way of writing smart contracts by using JavaScript! 🚀

In this quick start guide you'll learn:

- [Setting up a new JavaScript smart contract](#setup)
- [Compile and deploy JS smart contracts](#build)
- [Interacting with JS smart contract](#interact)
- Connecting a simple front-end to the NEAR blockchain

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
    "near-sdk-js": "^0.1.1"
  }
}
```

5. Create the file structure for your smart contract:

```bash
mkdir src && cd src && touch index.js && cd ..
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
@NearBindgen
class StatusMessage extends NearContract {
  // Define the constructor, which initializes the contract with a default message
  constructor() {
    // Used to give access to methods and properties of the parent or sibling class
    super();
    // Default the status records to
    this.message = "Hello Web3 World!";
  }
}
```

Running the constructor will default the contract's `message` state variable to 'Hello Web3 World!'.

3. You will now need a way to retrieve this message from the blockchain. To do this, create a new `@view` function within the class:

```js
// Public method - returns the greeting saved, defaulting to 'Hello Web3 World!'
@view
get_greeting() {
    env.log(`current greeting is ${this.message}`)
    return this.message
}
```

You now have a way to initialize the contract and get the current greeting.

4. Next, create a way to change the message by passing a new variable as a string:

```js
// Public method - accepts a greeting, such as "howdy", and records it on-chain
@call
set_greeting(message) {
    env.log(`Saving greeting ${message}`)
    this.message = message
}
```

That's it! Your contract should look like this:

```js
import { NearContract, NearBindgen, call, view } from "near-sdk-js";

@NearBindgen
class StatusMessage extends NearContract {
  // Define the constructor, which initializes the contract with a default message
  constructor() {
    // Used to give access to methods and properties of the parent or sibling class
    super();
    // Default the status records to
    this.message = "Hello Web3 World!";
  }

  // Public method - returns the greeting saved, defaulting to 'Hello Web3 World!'
  @view
  get_greeting() {
    env.log(`current greeting is ${this.message}`);
    return this.message;
  }

  // Public method - accepts a greeting, such as "howdy", and records it on chain
  @call
  set_greeting(message) {
    env.log(`Saving greeting ${message}`);
    this.message = message;
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
Alternatively, if you [already have an account](docs/develop/basics/create-account) and have [logged in with `near-cli`](https://docs.near.org/docs/tools/near-cli#near-login), you can specify the account you want to use to deploy:

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

Congratulations! You've just successfully created a new smart contract from scratch, deployed it to the blockchain, and made a few smart contract calls all while using JavaScript! :tada:

## Storage?

When developing on NEAR, any accounts storing information on the blockchain must maintain enough $NEAR in their account to cover that storage. This is the traditional approach and is known as [storage staking](). You could have an account with 100 $NEAR and over time, as the account stores more and more information, that 100 $NEAR will slowly become locked and will only become available once the storage is released.

This model is slightly different when developing on the JSVM contract. On JSVM, whenever **any** extra information is added to the contract, you **must** attach a deposit. Storage can't be pre-paid in the same way as the storage staking model. At any given moment, each contract on the JSVM account will always contain exactly enough $NEAR to pay for the storage they're using up. No more and no less. If you attach more $NEAR than what is needed, the JSVM contract will refund you. Similarly, if you call a method that frees up some storage, you will be refunded for whatever was released.

Let's look at an example where a simple status message contract is deployed to the JSVM. It stores a message that can be updated and viewed at any given moment. 
- The first thing that must be payed for is the initial deployment costs since the contract code (base64 encoded) must be stored on the JSVM.
- If Benji then sets the status message to "Go Team!", he must attach enough $NEAR to cover the cost of storing that message. 
- If Josh then changes the status message to "The Team Most Certainly Goes!", he will have to attach whatever extra $NEAR it costs to change the message. In this case, the first message was 8 characters and the new message is 29 characters meaning Josh would need to cover the cost for storing the extra 21 characters on the contract.
- If Benji decides to shorten the new message to "Hi!", he won't need to attach any $NEAR and will in fact be refunded for the storage that was released. The old message was 29 characters and the new message is 3 therefore he will be refunded for 26 characters worth of storage.

The current costs for storing information on NEAR are 1 $NEAR per 100kb. This is the same for both the JSVM and traditional storage staking approaches.



## Help & Feedback 

Stuck and need help? There are several ways we can assist you!

- Post a question in #dev-support channel on [Discord](http://near.chat).
- Get live support with our [Developer Relations team](http://near.org/office-hours) (Twice daily)
- Build from scratch using our [JS SDK Quick Start Guide](https://docs.near.org/docs/develop/contracts/js/enclave-quickstart) in docs.

Help us enhance our JavaScript SDK and participate in its development process!

- Visit our [GitHub discussions](https://github.com/near/near-sdk-js/discussions) and give us your feedback!
- Join one of our monthly [Developer Tools Community Meetings](http://near.ai/tooling-meetings) and give us your feedback or ask some questions!





