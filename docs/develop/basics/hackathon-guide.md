---
id: hackathon-startup-guide
title: Hackathon Startup Guide
sidebar_label: Hackathon Guide
---

Welcome to hacking on NEAR! We're glad you're here. Let's set up the basics first:

- [Rust toolchain](#installing-the-rust-toolchain)
- [A NEAR account](#creating-a-near-account)
- [NEAR command-line interface](#installing-the-near-cli) (`near-cli`)


## Setting up the requirements

In this section, you'll install and set up the basic tools to create smart
contracts in Rust. Along with the Rust environment, you'll create a NEAR account and
install the `near-cli`.

### Installing the Rust toolchain

The following instructions are taken from the official [Rust installation
guide](https://www.rust-lang.org/tools/install). If you already have the Rust toolchain,
you can [skip these steps](#creating-a-near-account).

> **Tip:** If you're new to the Rust programming language,
[the online book](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch00-00-introduction.html)
from the official Rust site is a great resource to start with.


#### 1. Install Rustup

Run `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

#### 2. Configure your current shell

Run `source $HOME/.cargo/env`

> **Note:** alternatively you can simply relaunch your terminal window

#### 3. Add `wasm` target to your toolchain

Run `rustup target add wasm32-unknown-unknown`


<blockquote class="info">
  <a href="https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/webassembly-support.html" target="_blank">Why <code>unknown-unknown</code>?</a>
</blockquote>


### Creating a NEAR account

The easiest way to create an account on NEAR is using the [NEAR Wallet](https://wallet.testnet.near.org/).
NEAR has several [development networks](/docs/concepts/networks) operating independently of
each other with their own accountIDs. For this Hackathon guide, you'll create a new
[`testnet`](/docs/develop/basics/create-account#creating-a-testnet-account) account.

If you already have a NEAR `testnet` account, you can [skip these steps](#installing-the-near-cli).

> **Tip:** If you have any issues, we've created [this easy guide](/docs/develop/basics/create-account) to help you out.

#### 1. Reserve an Account ID

* Navigate to https://wallet.testnet.near.org and click on "Create Account".
* Next, enter your desired account name.
  
#### 2. Secure your account

* Choose your account recovery method. For simplicity, in this tutorial you can select
  "E-mail Account Recovery", although "Recovery Phrase" and [Ledger](https://www.ledger.com/)
  are the most secure methods.

#### 3. E-mail / Phone Number Account Recovery

* Enter the account activation code that you received.

#### 4. Success!

* You just created a `testnet` account and received 200 Ⓝ! Upon recovery method confirmation
  you should be directed to your account dashboard.


### Installing the `near-cli`

Now it's time to install [`near-cli`](/docs/tools/near-cli#setup). This is a command line interface
that allows you to interact seamlessly with NEAR. [This page](/docs/tools/near-cli) has all of the
`near-cli` commands with examples.

The following instructions are taken from the `near-cli` [installation
guide](https://docs.near.org/docs/tools/near-cli#setup). If you already have the command line
interface, you can [skip these steps](#first-steps).

> **Note:** Make sure you have a current version of `npm` and `NodeJS` installed.

#### Linux and macOS

1. Install `npm` and `node` using a package manager such as `nvm`. Sometimes there are issues
   using Ledger due to how macOS handles node packages related to USB devices.
   [[click here]](https://nodejs.org/en/download/package-manager/)
2. Ensure you have installed Node version 12 or above.
3. Install `near-cli` globally by running:

```bash
npm install -g near-cli
```

#### Windows

> **Note:** For Windows users, we recommend using Windows Subsystem for Linux (`WSL`).

1. Install `WSL` [[click here]](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros)
2. Install ` Node.js` [[click here]](https://nodejs.org/en/download/package-manager/)
3. Change `npm` default directory [[click here]](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory)
   - This is to avoid any permission issues with `WSL`
4. Open `WSL` and install `near-cli` globally by running:

```bash
npm install -g near-cli
```

## First steps

1) Now that you have an account, test out a simple `testnet` app and interact with the blockchain.
Try out [Guest Book](https://near-examples.github.io/guest-book/) and sign and send your first transaction on the blockchain.

2) Look around in [NEAR Explorer](https://explorer.testnet.near.org). Here you can search for all transactions
and blocks produced on NEAR. Try searching for the account you just created and see the transactions you've
created with Guest Book. 

3) Try running your first `near-cli` command: [`near login`](/docs/tools/near-cli#near-login). This will
redirect you to your NEAR Wallet and save your `testnet` account keys locally. _Look for them in a hidden file
under your HOME folder (`~/.near-credentials`)_

4) Try `create-near-app`! Run `npx create-near-app your-awesome-project` in your terminal. _(Note: this requires
[Node.js](https://nodejs.org/en/).)_ This is the easiest way to launch a fullstack app on the NEAR blockchain
in under 5 minutes.

4) Head to [NEAR Examples](https://near.dev) and test out some example applications. You can clone and play
around with the code or simply click on the Gitpod button to launch an online instance!

6) Ready to dive in? Checkout some more [boilerplate apps](#boilerplate-apps) with accompanying video
walkthroughs [ [here](https://github.com/near-apps/) ].


## Understanding Smart Contracts

Smart Contracts are the back-end of your application, which lives on the blockchain. The application still needs the same front-end stuff (HTML/CSS/JS) you're used to, but all of your data, or "state," will be stored _on-chain_.

- The Smart Contract runs code and stores data on the blockchain network.
- The front-end talks to the Smart Contract using an API (JSON RPC Interface).
- `near-api-js` is a JavaScript library we've created to interact with NEAR.
  
- We currently support developing smart contracts in
  - [Rust](https://www.rust-lang.org/)
  - [AssemblyScript](https://assemblyscript.org/introduction.html) (Note: AssemblyScript is not recommended for mission-critical contracts)


## Boilerplate apps

TBD

## Common questions and issues

### 1. Sending data to your contract from the front-end

Say you've got an Rust function defined in your contract that takes data:

```ts
pub fn some_method(&mut self, my_data: String) {
    [...]
}
```

When you call it in the front-end, you'd have trouble sending data, much like in the error below:

```ts
"ABORT: unexpected string field null : 'YOUR DATA'".
```

You can fix this issue in the front-end when you call contract. Because NEAR uses a JSON-RPC-API, all methods are called using _objects_. 

Instead of calling:

```javascript
contract.someMethod("BAD"); // WRONG WAY TO CALL METHOD!
```

You need to send the **object** with the variable name that's going to be used in the back-end, just like when you call a REST API.

```javascript
// RIGHT WAY TO CALL METHOD!
contract.someMethod({
    myData: "GOOD"
})
```

### 2. Where are my functions when I try to call them?!

You need to do two things in order to access your smart contract calls on the front-end.

1. Define the methods you intend to call in your contract, and make sure they are public. \(You're probably good on this one!\)
2. Declare the methods that you want to call during the initialization of the contract on the front-end. \(You probably forgot this one.\)

```javascript
// Initializing our contract APIs by contract name and configuration.
window.contract = await near.loadContract(config.contractName, {
...
  // View methods are read only. They don't modify the state, but usually return some value.
  viewMethods: ["hello"],
  // Change methods can modify the state. But you don't receive the returned value when called.
  changeMethods: [],
...
});
```

The call to `loadContract` is actually making an object with your functions that gets assigned to the `window.contract` variable, so that later, on you can call `window.contract.myFunction`. Note that `window` is always in scope, so you can just call `contract.myFunction`.

### 3. How do I save data to the blockchain?

Please see our [Data Storage / Collections](/docs/concepts/data-storage) for an in-depth look at ways you can store data on-chain.

The link above illustrates ways to store data using one of our two software development kits (SDKs):

* [`near-sdk-rs`](https://github.com/near/near-sdk-as) for [Rust](https://www.rust-lang.org/)
* [`near-sdk-as`](https://github.com/near/near-sdk-as) for [AssemblyScript](https://www.assemblyscript.org/)

> Running into trouble? Reach out on our [Discord channel](https://near.chat) and we'll help!
