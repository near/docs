---
id: introduction
title: Introduction to nearlib
sidebar_label: Introduction
---

`nearlib` is a JavaScript/TypeScript library for development of DApps on the NEAR platform that can be used from any client or server-side JavaScript environment.


The NEAR platform is a sharded, developer-friendly, proof-of-stake public blockchain, built by a world-class team that has built some of the world's only sharded databases at scale.

With `nearlib`, we invite JavaScript developers to dive right in to writing, testing and deploying scalable decentralized applications in minutes on the most developer-friendly blockchain. It's truly the blockchain for builders.

## Overview

For context, it's worth knowing that the core NEAR platform API is a [JSON-RPC interface](/docs/interaction/rpc).

`nearlib` wraps this RPC interface with convenience functions and exposes NEAR primitives as first class JavaScript objects.

We use `nearlib` internally in tools like [NEAR Shell](https://github.com/nearprotocol/near-shell) and [NEAR Studio](https://github.com/nearprotocol/NEARStudio/blob/master/templates/01-hello-username).

You will use `nearlib` as your primary interface with the NEAR platform anytime you are writing JavaScript (client or server-side).

### Features

`nearlib` includes support for the essentials like:
- generating key pairs
- creating transactions
- signing transactions
- sending transactions to the network

`nearlib` also supports interacting with other parts of the system and managing important NEAR primitives including:
- keys and key stores
- accounts
- contracts
- wallets (client-side only)
- connection providers (currently [RPC](/docs/interaction/rpc) only)


### Context

This is `nearlib` in context with the rest of the NEAR platform.

If you haven't seen all of these pieces yet, open a few new tabs with the following links and come back.

- [NEAR Studio](http://near.dev/)
- [NEAR Wallet](https://wallet.nearprotocol.com/)
- [NEAR Explorer](https://explorer.nearprotocol.com/)
- [Github Organization](https://github.com/nearprotocol) (everything we do is in the open)
- HTTP endpoints that
  - mirror the RPC interface: [status](http://rpc.nearprotocol.com/status) and [network info](http://rpc.nearprotocol.com/network_info)
  - surface a collection of useful network [metrics](http://rpc.nearprotocol.com/metrics)

*Note: the links above all connect to the NEAR TestNet.  Different URLs are required to connect to the NEAR Stake Wars Tatooine network (and eventually NEAR MainNet)*

```text
          ----
              |
Your New App  |
              |
          ----+
              |
NEAR Explorer |                                     o ----------------------- o
              |                                     |                         |
          ----+           o ----------- o           |  +-------------------+  |
              |    use    |             |  ------>  |  |                   |  |
NEAR Wallet   |  -------> |   nearlib   |    RPC    |  |  NEAR blockchain  |  |
              |           |             |  <------  |  |                   |  |
          ----+           o ----------- o           |  +-------------------+  |
              |                                     |                         |
NEAR Studio   |                                     o ----------------------- o
              |
          ----+
              |
NEAR Shell    |
              |
          ----
```

<blockquote class="info">
<strong>did you know?</strong><br><br>

Let's talk about Smart Contracts for a minute.

Although developers use `nearlib` to connect to the NEAR platform from any **JavaScript** environment, they use one of two *other* technologies to write and compile Smart Contracts so they can be deployed to the NEAR blockchain.

1. **AssemblyScript** *(which looks a lot like TypeScript if you squint)*
2. and **Rust** *(a powerful language with a great developer experience)*

Whichever language you use to build your Smart Contracts, know that, once compiled to Wasm, they are eventually deployed and executed on the NEAR platform exactly the same way using `nearlib`.

If you're familiar with JavaScript then **AssemblyScript** is the way to go for writing Smart Contracts on the NEAR platform. You can deploy your first Smart Contract in seconds, literally, with [NEAR Studio](http://near.dev). And if you'd rather build locally, check out [create-near-app](https://github.com/nearprotocol/create-near-app) to get started.  Either way, you'll be interacting with your first deployed contract in minutes.

If you prefer **Rust** then check out <code>[near-bindgen](/docs/near-bindgen/near-bindgen)</code> for authoring Smart Contracts in Rust that can be deployed using `nearlib`.  The `near-bindgen` repository has several great examples to help you get started quickly.

<blockquote class="warning">
<strong>heads up</strong><br><br>

AssemblyScript is for non financial use cases.

</blockquote>

**This is about all we'll say on the topic of Smart Contracts** in this introduction to `nearlib`.

</blockquote>


**Client and server-side development** with `nearlib` are very much the same except for two small differences: (a) how `nearlib` is referenced and (b) how `nearlib` is configured to handle storage of secure keys.

The next sections explain these differences before diving into a working example.

## Client-Side

For concrete examples of using `nearlib` on the client-side, [NEAR Studio](http://near.dev) includes several web based sample applications that rely on `nearlib` for all of their NEAR platform connectivity and interaction.  NEAR Studio lets you prototype your Smart Contracts and client-side web apps in a single environment.

All client-side applications using `nearlib` share a similar pattern for connecting to the network.

### Setup

To reference `nearlib` in the browser, include it via CDN or add it to your asset pipeline as you would any other JavaScript library:

```html
<script src="https://cdn.jsdelivr.net/npm/nearlib/dist/nearlib.min.js"></script>
```

CDNs like JSDelivr also support versioning.  See the `nearlib` page on JSDelivr for more: https://www.jsdelivr.com/package/npm/nearlib

### Connection

To do anything useful on the NEAR platform you have to first establish a connection.

```js
// configure minimal network settings and key storage
const config = {
  nodeUrl: 'https://rpc.nearprotocol.com',
  deps: {
    keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore()
  }
};

// open a connection to the NEAR platform
(async function() {
  window.near = await nearlib.connect(config);

  // ---------------------------------------------------------------------------
  // here you have access to `nearlib` and a valid connection object `near`
  // ---------------------------------------------------------------------------

})(window)
```


<blockquote class="warning">
<strong>heads up</strong><br><br>

When troubleshooting, the configuration of `nodeUrl` is worth careful attention.  This is the entry point for all RPC communications with the NEAR network or even a single node if running locally.  NEAR Studio and NEAR Shell handle this for you behind the scenes.

- **Local** development? use `http://localhost:3030`
- **TestNet** development? use `https://rpc.nearprotocol.com`

For NEAR Stake Wars connect via `https://rpc.tatooine.nearprotocol.com`

</blockquote>


<blockquote class="info">
<strong>did you know?</strong><br><br>

`nearlib` supports different key stores depending on whether your code is running on the client-side or server-side.

- **client-side** applications should use `BrowserLocalStorageKeyStore`
- **server-side** applications should use `UnencryptedFileSystemKeyStore`

</blockquote>



## Server-Side

For a concrete example of using `nearlib` on the server-side, NEAR Shell is a Node.JS application that relies on `nearlib` to generate secure keys, connect to the NEAR platform and send transactions to the network on your behalf.  The NEAR Shell [source code](https://github.com/nearprotocol/near-shell) is instructive but if you're going that route then you may as well head straight for the [`nearlib` tests](https://github.com/nearprotocol/nearlib/tree/master/test) where you'll find loads of useful sample code.

All server-side applications using `nearlib` share a similar pattern for connecting to the network.

### Setup

To reference `nearlib` in your Node.JS project, [install via npm](https://www.npmjs.com/package/nearlib):

```text
npm install nearlib
```

### Connection

To do anything useful on the NEAR platform you first have to establish a connection.

```js
// configure network settings and key storage
const config = {
  nodeUrl: 'https://rpc.nearprotocol.com',
  deps: {
    keyStore: new nearlib.keyStores.UnencryptedFileSystemKeyStore()
  }
};

// open a connection to the NEAR platform
(async function() {
  global.near = await nearlib.connect(config);

  // ---------------------------------------------------------------------------
  // here you have access to `nearlib` and a valid connection object `near`
  // ---------------------------------------------------------------------------

})(global)
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

As a reminder, `nearlib` **requires a different key store** depending on whether your code is running on the client or server-side.

- **client-side** applications should use `BrowserLocalStorageKeyStore`
- **server-side** applications should use `UnencryptedFileSystemKeyStore`

</blockquote>


## Authentication

The NEAR platform allows very limited network access to anonymous requests.  Without the proper credentials, only basic queries of blockchain network status are available to you.  In fact this public information is available over HTTP via [NEAR Explorer](https://explorer.nearprotocol.com/).

NEAR accounts represent people (ie. users, organizations, etc) and contracts.  To do anything meaningful, you need an account. Here "meaningful" translates directly to "sending a signed transaction to the network" (which then leads to some amount of storage being consumed and / or computation being performed).  All transactions on the network must be signed by a valid NEAR account, no exceptions.


<blockquote class="info">
<strong>did you know?</strong><br><br>

If you're new to the world of blockchain, terms like keys, wallets, faucets and gas can be a little disorienting. Let's try to clear these up right now.

If you're already familiar with these terms then feel free to skip ahead.

- **keys are a cryptographic mechanism for claiming identity and proving ownership**  \
  A little bit like your driver's license and hand written signature, your public key (*driver's license*) is presented to anyone who asks to confirm that your private key (*hand written signature*) was used to sign off on something. This is why having someone's private key is very powerful -- you can forge their signature perfectly and undeniably -- so keep your private keys safe)

- **accounts represent anything (ie. person or contract) that intends to participate in a transaction on the NEAR platform**  \
  Accounts are identified by friendly, human readable names like "Adam" or "Eve" (people) and "check-if-apple-was-eaten" (contract) but they all require at least one keypair, a public and matching private key, to participate on the network

- **the only way to create a new account on the NEAR platform is to have another, pre-existing account sign off on the transaction using a pair of cryptographic keys**  \
  The relevant transaction in this case is `CreateAccount`, one of many supported transaction types, and signed transactions are a fundamental requirement of a blockchain to guarantee that every transaction is verifiable and traceable

- **all accounts must pay some small amount of rent to remain on the network because accounts take up space and space costs money**   \
  Accounts must pay the network for their own storage and compute as well as fees for processing transactions they initiate

- **the cost of data storage and computation on the network is measured in units of gas which is a configurable bit of network economics but is usually vanishingly small**  \
  It costs exactly 2 gas (at the time of this writing) to "compute the creation of a new account" on the network. Gas is measured in yoctoNEAR or yNEAR, which is 10^24 times smaller than NEAR. For a sense of scale, with just 2 of the 10 NEAR in your new account you could happily afford to create a new account for every grain of sand on the planet (actually estimates suggest about 10^21 grains of sand on earth so you could do this every day for 3 years, not just once) and still have some NEAR tokens left over for a rainy day. Gas is measured as very very very small fraction of NEAR tokens.

- **new accounts receive an initial gift of tokens, like a budget to exist and operate, which is funded by a pre-existing account called a faucet**  \
  These pre-existing accounts are commonly known as faucets because, I suppose, they pour money into new accounts at the time of creation

- **using NEAR Wallet is currently the only way for new users to create an account**  \
  A key part of the functionality of NEAR Wallet is to wrap a faucet account with a friendly user interface so `CreateAccount` transactions can be signed and funded by a pre-existing faucet account behind the scenes

</blockquote>

**When you use NEAR Wallet** to create a new account, this is what happens behind the scenes:
- it uses a faucet account to sign off on the `CreateAccount` transaction for you
- it uses the same faucet account to fund your new account with 10 NEAR
- it saves the private key for your new account in your browser's `LocalStorage`

**When you use NEAR Shell** to create a new account, you need what's called a `masterAccount`, a valid account (for which you control the private key, stored in a folder called `neardev` on your file system) to sign transactions before sending them to the network.  We'll discuss this in detail when we get to the server-side shortly.

**End users shouldn't have to think about any of this**.  Users of applications you build with `nearlib` should be directed to NEAR Wallet for a seamless account creation and onboarding experience.  It's your challenge as a developer to gracefully guide your users towards the value of your application and we hope NEAR Wallet is a helpful step in that direction.


<blockquote class="info">
<strong>did you know?</strong><br><br>

The NEAR platform currently supports 2 kinds of keys: `FullAccess` and `FunctionCall` keys.

When you made a call to `wallet.requestSignIn()` what you were actually doing was asking the user (the new account you just created) for permission to *act on their behalf*.  Did you notice the restriction NEAR Wallet put on this request?

> This does not allow the app to **transfer any tokens.**

If you didn't see it, run the NEAR Wallet flow again and read carefully below the message "nearlib client-side quickstart"

Can't transfer tokens?! Well, that's exactly what we're trying to do!  So it fails. Wump wump.

---

If you have NEAR Shell installed you can use the `near keys <account>` command to see the list of keys available for any account.

```sh
near keys THE_USER_ACCOUNT  # get THE_USER_ACCOUNT from wallet.getAccountId() while browsing index.html on localhost
```

At least one key will look like this with `FunctionCall` permissions (your public_key will differ):

```js
{
  "access_key": {
    "nonce": 0,                               // nonce is an incrementing counter to avoid duplicate transactions
    "permission": {
      "FunctionCall": {                       // this is a FunctionCall access key
        "allowance": "100000000000000",       // with about 100 trillion units of gas (yoctoNEAR)
        "method_names": [],                   // allowed method names (we didn't specify any in our call)
        "receiver_id": "not-a-real-contract"  // this is what we named our contract
      }
    }
  },
  "public_key": "ed25519:7kuoy3S5jLT8HMd1MTzfUxzVyL7CLa8GE1Jix1YnzcXw"
}

```

And at least one key will look like this with `FullAccess` permissions (your public_key will differ):

```js
{
  "access_key": {
    "nonce": 0,                               // nonce is an incrementing counter to avoid duplicate transactions
    "permission": "FullAccess"                // this is a FullAccess access key
  },
  "public_key": "ed25519:AnNFREBskoffaCXHZWZ73LJJNJePH16BwM3T1W2c7WfH"
}
```

</blockquote>

## Ready For More?

### Sample Applications

- NEAR Studio
  - [try](http://near.dev/) several samples using NEAR Studio
  - explore the [source code](https://github.com/nearprotocol/NEARStudio/tree/master/templates) on GitHub
- Hello World
  - this application is used as part of our test environment to exercise `nearlib`
  - explore the [source code](https://github.com/nearprotocol/near-hello/)
- Counter Bot
  - [try](https://app.near.ai/app/uja2rf3j1/) this fun take on the classic counter demo by [Yifang Ma](https://www.linkedin.com/in/yifang-ma/)
  - explore the [source code](https://studio.nearprotocol.com/?f=uja2rf3j1) which is based on the NEAR Studio example "Counter Smart Contract"

### Built With Near

Checkout https://builtwithnear.com for more sample applications

- CryptoCorgies
  - [try](https://corgis.nearprotocol.com/) our delightful clone of the famous CryptoKitties application that brought the Ethereum network to a grinding halt.
  - explore the [source code](https://github.com/nearprotocol/crypto-corgis-solution)



<blockquote class="info">
<strong>did you know?</strong><br><br>

While exploring the applications listed above, if an application was developed and deployed via NEAR Studio to our `app.near.ai` hosting environment, you can easily inspect the original source code by appending the `APP_ID` to the NEAR Studio editor URL.

So, for example, if a **deployed application** is available at a URL like this:
- https://app.near.ai/app/`APP_ID`/

then you can view the **source code of that application** using NEAR Studio like this:
- https://studio.nearprotocol.com/?f=`APP_ID`

*note this is **NOT** the general case for all applications deployed to the NEAR platform as they are compiled to Wasm*

</blockquote>


---

Hopefully you found this introduction to `nearlib` and the NEAR platform useful.

If you have feedback or suggestions for improvement, please don't keep quiet about it.

- please file an [issue](https://github.com/nearprotocol/docs/issues) on our docs repo or submit a [pull request](https://github.com/nearprotocol/docs/pulls) with your edits
- or find us on [Discord](http://near.chat) or [Spectrum](https://spectrum.chat/near) and let us know how you feel.

Happy Building!

The Near Team
