---
id: introduction
title: introduction to nearlib
sidebar_label: Introduction
---

`nearlib` is a JavaScript/TypeScript library for development of DApps on the NEAR platform that can be used from any client or server-side JavaScript environment.


The NEAR platform is a sharded, developer-friendly, proof-of-stake public blockchain, built by a world-class team that has built some of the world's only sharded databases at scale.

With `nearlib`, we invite JavaScript developers to dive right in to writing, testing and deploying scalable decentralized applications in minutes on the most developer-friendly blockchain. It's truly the blockchain for builders.

## overview

For context, it's worth knowing that the NEAR platform API is primarily exposed via an [RPC interface](/docs/interaction/rpc).

`nearlib` wraps this RPC interface with convenience functions and exposes NEAR primitives as first class objects.

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

Sometimes a picture helps.  Here's `nearlib` in context with the rest of the NEAR platform.

If you haven't seen all of these pieces yet, open a few new tabs with the following links and come back.

- [NEAR Studio](http://near.dev/)
- [NEAR Wallet](https://wallet.nearprotocol.com/)
- [NEAR Explorer](https://explorer.nearprotocol.com/)
- [Github Organization](https://github.com/nearprotocol) (everything we do is in the open)
- HTTP endpoints that
  - mirror the RPC interface: [status](http://rpc.nearprotocol.com/status) and [network info](http://rpc.nearprotocol.com/network_info)
  - surface a collection of useful network [metrics](http://rpc.nearprotocol.com/metrics)

*Note: the links above all connect to the NEAR TestNet.  Different URLs are required to connect to the NEAR Stake Wars (and eventually NEAR MainNet)*

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
NEAR Wallet   |  -------> |   nearlib   |    RPC    |  |    NEAR runtime   |  |
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

**This is about all we'll say on the topic of Smart Contracts** in this introduction to `nearlib`.

</blockquote>


**Client and server-side development** with `nearlib` are very much the same except for two small differences: (a) how `nearlib` is referenced and (b) how `nearlib` is configured to handle storage of secure keys.

The next sections explain these differences before diving into a working example.

## client-side

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


### Authentication

The NEAR platform allows very limited network access to anonymous requests.  Without the proper credentials, only basic queries of blockchain network status are available to you.  In fact this public information is available over HTTP via [NEAR Explorer](https://explorer.nearprotocol.com/).

NEAR accounts represent people (ie. users, organizations, etc) and contracts.  To do anything meaningful, you need an account. Here "meaningful" translates directly to "sending a signed transaction to the network" (which then leads to some amount of storage being consumed and / or computation being performed).  All transactions on the network must be signed by a valid NEAR account, no exceptions.

In fact, let's make an account as an end user would experience it now.

<blockquote class="lesson">
<strong>your turn</strong> <span>create an account on the NEAR platform</span><br><br>

- time to complete: **1 min**
- level of difficulty: **trivial**
- prerequisites
  - a computer connected to the internet

</blockquote>

<ol class="steps">

<li> Open the [NEAR Wallet](https://wallet.nearprotocol.com/) in a new tab. If you're already logged in, make a new account for practice, or don't, it's your call.</li>

<li> Pick a username and click [ Create Account ].  NEAR Wallet will help guide you towards a properly formatted, available account.  Make this personal, it's yours after all.  And we'll be coming back to this account later.</li>

<li> Follow the prompts to secure your account via SMS or seed phrase which allows for recovery in case you lose your private key or decide to move to another machine.</li>

</ol>

###### did it work?

**You'll know it worked** when you see your new account name at the top right of the NEAR Wallet

###### did something go wrong?

**If anything went wrong** with this initial lesson, please let us know.  Creating a new account should be as easy as deciding to [sign up for our newsletter](https://nearprotocol.com/newsletter).

<blockquote class="success">
<strong>finished!</strong><br><br>

Ok, so there you go ... you've got 10 NEAR!

</blockquote>

Now that you have a NEAR account, you can conduct all sorts of business on the network including sending money and creating other accounts as well as deploying and invoking Smart Contracts.


<blockquote class="info">
<strong>did you know?</strong><br><br>

There was a lot that happened behind the scenes just now with NEAR Wallet

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
  It costs exactly 2 gas (at the time of this writing) to "compute the creation of a new account" on the network. Gas is measured in yoctoNEAR or yNEAR, which is 10^24 times smaller than NEAR. For a sense of scale, with just 2 of the 10 NEAR in your new account you could happily afford to create a new account for every grain of sand on the planet (actually estimates suggest about 10^21 grains of sand on earth so you could do this every day for 3 years, not just once) and still have some NEAR tokens left over for a rainy day. It's very very very small.

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

## server-side

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

### Authentication

To explore server side authentication, let's install NEAR Shell and use it to login.  What you'll notice is that logging in with NEAR Shell *still involves NEAR Wallet* unless you manually move your private keys to the local filesystem.  This will make a lot more sense before you leave this page.

<blockquote class="lesson">
<strong>your turn</strong> <span>install NEAR Shell and login</span><br><br>

- time to complete: **5 min**
- level of difficulty: **trivial**
- prerequisites
  - Node **version 10** or greater

</blockquote>

<ol class="steps">

<li> install NEAR Shell via npm </li>

```sh
npm install -g near-shell
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

You are about to login with NEAR Shell.

A folder will be created in the filesystem at your current location called `neardev` whose contents will be the private key for the account you authorize to work from the terminal.

It's best to create or choose a new working folder before logging in with NEAR Shell for clarity.

</blockquote>

<li> Login with NEAR Shell </li>

```sh
near login
```

A URL will be printed to the terminal which you should open in your browser.

`Please navigate to this url and follow the instructions to log in:`
`https://wallet.nearprotocol.com/login/?title=NEAR+Shell&public_key=ed25519 ...`

`Please enter the accountId that you logged in with:`

<li>the URL will open NEAR Wallet and ask you to authorize NEAR Shell with full access to your account.</li>

![use NEAR Wallet to authorize NEAR Shell with full access to your account](/docs/assets/authorize-near-shell.png)


<li> Once you have authorized NEAR Shell to work with your account, return to the terminal and type in the name of that account (the one you just authorized for use by NEAR Shell)</li>

`Please navigate to this url and follow the instructions to log in:`
`https://wallet.nearprotocol.com/login/?title=NEAR+Shell&public_key=ed25519 ...`

`Please enter the accountId that you logged in with:` **YOUR_DEVELOPER_ACCOUNT**

</ol>

###### did it work?

You'll know it worked when you see the message

`Logged in with` **YOUR_DEVELOPER_ACCOUNT**

You'll know it worked if you have a private key on your local filesystem -- look for a folder called `neardev` in your current path

```text
neardev
└── default
    └── YOUR_DEVELOPER_ACCOUNT.json
```

The contents of this JSON file will look something like the snippet below except the long string of `X`s would be a valid private key (with `FullAccess` permissions on the account named `YOUR_DEVELOPER_ACCOUNT` ... although you can't quite tell that from the contents of this file)

```json
{
  "account_id": "YOUR_DEVELOPER_ACCOUNT",
  "private_key": "ed25519:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

You can actually send yourself some money using NEAR Shell

Use the command `near send <sender> <receiver> <amount>` although both `sender` and `receiver` are the same in this case

```text
near send YOUR_DEVELOPER_ACCOUNT YOUR_DEVELOPER_ACCOUNT 1000
```

You will immediately see the confirmation of an attempt to send the transaction like this

`Sending 1000 NEAR to YOUR_DEVELOPER_ACCOUNT from YOUR_DEVELOPER_ACCOUNT`


And, after a few seconds of roundtrip to the NEAR TestNet and processing of the transaction, NEAR Shell will report something like this

```json
{
  "receipts": [
    {
      "id": "Ao7oouLFktqyNxFEQv8QqbgFjkPnLwkgmN6Qg46rF2wR",
      "outcome": {
        "gas_burnt": 2,
        "logs": [],
        "receipt_ids": [],
        "status": {
          "SuccessValue": ""
        }
      }
    }
  ],
  "status": {
    "SuccessValue": ""
  },
  "transaction": {
    "id": "F6qFLRgUWB4WuTo9SWvNHJHhpR9HydobstSBESCjUq2E",
    "outcome": {
      "gas_burnt": 2,
      "logs": [],
      "receipt_ids": [
        "Ao7oouLFktqyNxFEQv8QqbgFjkPnLwkgmN6Qg46rF2wR"
      ],
      "status": {
        "SuccessReceiptId": "Ao7oouLFktqyNxFEQv8QqbgFjkPnLwkgmN6Qg46rF2wR"
      }
    }
  }
}
```

The transaction ID you see above, `F6qFLRgUWB4WuTo9SWvNHJHhpR9HydobstSBESCjUq2E` is a real transaction on the NEAR TestNet and should be able to see the record of **this very transaction** via [NEAR Explorer here](https://explorer.nearprotocol.com/transactions/F6qFLRgUWB4WuTo9SWvNHJHhpR9HydobstSBESCjUq2E).  Just append your own transaction ID to the URL to see your transaction.


###### did something go wrong?

If you saw something unexpected, here's what may have happened ...

All transactions require valid credentials so if you tried to send money from an account you do not control then it wouldn't have worked.

```text
near send Not_Your_Account YOUR_DEVELOPER_ACCOUNT 1000
```

`Sending 1000 NEAR to YOUR_DEVELOPER_ACCOUNT from Not_Your_Account`  \
`Missing public key for Not_Your_Account in default`  \
`Error:  TypedError: Can not sign transactions, initialize account with available public key in Signer.`

The telltale error message above is <span class="error">`Can not sign transactions`</span> which means, precisely, that the `sender` account has no private key for the `default` network on the local machine. In other words, there's no file at the path `./neardev/default/Not_Your_Account.json`) with the private key for `Not_Your_Account`

<blockquote class="success">
<strong>finished!</strong><br><br>

You've installed NEAR Shell, authorized it to sign transactions on behalf of your developer account, and used it to send a `Transfer` transaction to the NEAR network. At this point it may be worth exploring other NEAR Shell commands. NEAR Shell uses `nearlib` under the hood, after all.

**If you're feeling curious**, see if you can match the following list of supported transactions with the commands available in NEAR Shell.  Just type `near` in your terminal and hit enter then try to match that output with the list below:


```js
nearlib.transactions.createAccount()  // create a new account
nearlib.transactions.deleteAccount()  // delete an existing account

nearlib.transactions.deployContract() // deploy a smart contract
nearlib.transactions.functionCall()   // invoke a function on a deployed contract

nearlib.transactions.transfer()       // send money from one account to another

nearlib.transactions.stake()          // "skin in the game" for validators

nearlib.transactions.addKey()         // add a key to an account
nearlib.transactions.deleteKey()      // delete a key from an account
```

</blockquote>

---

You should now have a good sense of client and server-side setup, connection and authentication using `nearlib` as well as a sense of the transactions available to you on the NEAR platform.

Next, we'll dive into an example that will do very much same things we just did -- login and send money -- but this time we'll do it programmatically using `nearlib`.

Let's dive a little deeper ...


## a first example

As a first point of entry to working with `nearlib` as a JavaScript developer, we want to do something meaningful on the NEAR platform so that the lesson is valuable but still make sure it's familiar enough that we can tease apart what we know from what we don't with some useful takeaways.

So what's about to happen?  We'll use JavaScript and `nearlib` to:

- open the NEAR Wallet using JavaScript (mimicking user login)
  - manually create a new account, acting as if we were the end user
- fetch the new user account
- try to send money from the user account to your own developer account **but fail !**
- go "under the hood" to replace the local `FunctionCall` key with a `FullAccess` key
- try again to send money from the user account to your developer account **and succeed** :)

Along the way we hope you'll learn a lot about `nearlib`, NEAR Wallet and a few differences between key types on the NEAR platform that will help you reason about your own applications, all while having some fun hacking away with these tools.

<blockquote class="warning">
<strong>heads up</strong><br><br>

While the examples below are specific to client-side JavaScript, the code can be copied almost exactly as-is to the server. The only differences are in (a) how your code references `nearlib`, (b) key storage, and of course (c) the usual differences between client and server-side JavaScript environments (ie. `window` vs `global`).

</blockquote>

**... but before we begin ...**

### Prepare Your Playground

Since this is a client-side demo, we'll be using a single HTML file with inline JavaScript to setup your environment but the same lessons apply to server-side code as well.  Just apply the differences discussed in previous sections about client vs server-side references to `nearlib` and key storage.

<blockquote class="lesson">
<strong>your turn</strong> <span>prepare your playground</span><br><br>

- time to complete: **10 mins**
- level of difficulty: **trivial**
- prerequisites
  - a computer connected to the internet with either Chrome or Firefox installed
  - working familiarity with JavaScript's [async / await](https://javascript.info/async-await) keywords

</blockquote>

<ol class="steps">

<li>Create a new, blank file called index.html in some reasonable location on your system. A new empty folder will help.</li>

<li>Copy the contents of the following snippet into the index.html file, replacing anything in there with this and only this.  We've added comments throughout to try to keep things clear.</li>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Connecting to the NEAR platform</title>
    <!-- to connect to the NEAR platform, include a reference to nearlib -->
    <script src="https://cdn.jsdelivr.net/npm/nearlib/dist/nearlib.min.js"></script>
    <script>

    // configure network settings and key storage
    const config = {
        networkId: 'default',                                             // this can be any label to namespace user accounts
        nodeUrl: "https://rpc.nearprotocol.com",                          // this endpoint must point to the network you want to reach
        walletUrl: "http://wallet.nearprotocol.com",                      // this endpoint must exist for the wallet to work
        deps: {
            keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() // keys are stored as plaintext in LocalStorage
        }
    };

    // open a connection to the NEAR platform
    (async function() {
        window.near = await nearlib.connect(config);                      // connect to the NEAR platform
        window.wallet = new nearlib.WalletAccount(window.near)            // instantiate a new wallet

          // ---------------------------------------------------------------------------
          // here you have access to `nearlib` and a valid connection object `near`
          //
          // we've added them to the window object to make working in the console convenient
          // ---------------------------------------------------------------------------

    })(window)
    </script>
</head>
<body>
<h2>nearlib client-side quickstart</h2>

To run through this demo you will need to open your <a href="https://javascript.info/devtools">JavaScript Developer Console</a><br>
<strong>(Press Cmd+Opt+J or, if you’re on Windows, then F12)</strong>

<blockquote>
  <em>
    "There are two ways to write error-free programs; only the third one works."<br>
    (Alan J. Perlis)
  </em>
</blockquote>

</body>
</html>
```

</ol>

###### did it work?

**You'll know it worked** when you open the page you just created in a browser, open the JavaScript Developer Console and confirm you have a reference to `nearlib` and `wallet` as well as a live connection to the NEAR platform via the `near` object.

<blockquote class="warning">
<strong>heads up</strong><br><br>

**If this is new to you**, how you open the `index.html` file in your browser makes a difference.  You should not open the file from the file system (if you did this you would see `file:///` and a path to the location of your file where the URL should be).

Serve it locally over HTTP instead so the URL includes with `localhost` or `127.0.0.1`.

For more support on this just check out how to setup a [local testing server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) or, if you're using Visual Studio Code, there's a popular extension called [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) that works well.

</blockquote>

To verify your playground is ready for maximum velocity fun, try copying and pasting each of the following snippets into your console:

```js
// TEST 1: do you you have a reference to nearlib?
// try using it to generate a new keypair (no network connection is needed for this part)
const keypair = nearlib.utils.KeyPair.fromRandom('ed25519')
console.log("public key: ", keypair.publicKey.toString())
console.warn("private key: ", keypair.secretKey)
```

**You'll know it worked** if you saw a public key starting with "ed25519:" and a longer private key in the console.  The private key appears yellow as a reminder to you that this is sensitive data.  Private keys are the source of truth in cryptographic identity schemes.

---

```js
// TEST 2: do you have a connection to the NEAR network?
// try using it to inspect the state of the blockchain
const networkStatus = await near.connection.provider.status()
const blockchainProgress = networkStatus.sync_info
console.table(blockchainProgress)
```

**You'll know it worked** if you see a table with several rows of data describing the current state of the blockchain including `latest_block_hash` and `latest_block_height`.  Confirm your results with the [status endpoint](http://rpc.nearprotocol.com/status) or using [NEAR Explorer](https://explorer.nearprotocol.com/).  The easiest thing to look for is that the block height is almost the same.  It changes quickly (about once per second) but should be close.  You can also re-run the snippet above as many times as you like to see the most recent changes to the blockchain.  This is live network data.

---

```js
// TEST 3: do you have a reference to a wallet object?
// try using it to confirm that you are not signed in yet (we're about to do that)
wallet.isSignedIn()   // => false
wallet.getAccountId() // => ""
```

**You'll know it worked** if you saw the same output as presented by the inline comments.  If you happen to be signed in for some reason, your experience may differ in these lessons but once we're through this introduction you'll feel much more comfortable controlling the experience for yourself and ultimately for users of the applications you build on top of the NEAR platform.

---

<blockquote class="warning">
<strong>heads up</strong><br><br>

Most of the results you are about to see will change depending on *when you run the code* since you're connected to a live network.

Also a different (valid) value for `nodeUrl` will fetch data from a *different network*.

- Local development? use http://localhost:3030
- NEAR TestNet development? use  https://rpc.nearprotocol.com
- NEAR Stake Wars curious?  use https://rpc.tatooine.nearprotocol.com

</blockquote>


###### did something go wrong?

If you saw something unexpected, here's what may have happened ...

**If you saw something** about an error related to `console.warn` or `console.table` methods not being found, it's possible that your browser doesn't support them.  If that's the case, please consider using Chrome or Firefox instead.  They're really the only game in town for client-side web development.

**If you saw nothing** for quite a while or got a timeout error then it's possible the NEAR TestNet is down or sluggish and we're almost certainly working on it.  Your results here may deviate from what's expected from time to time as we stabilize and harden our platform for MainNet.  Have a look at our [Network Status Page](https://nearprotocol.statuspal.io/) for an authoritative birds-eye view of all the moving parts.

**If you saw something** unusual in the console that looked like `Promise {<pending>}` then ...

```js
// you might see something like this in the JavaScript Developer Console
Promise {<pending>}

/**
  this happens if you forget the await keyword. check out the prerequisites.

  wait, but why though?

  well, it takes some unknown amount of time for nearlib to connect
  to the NEAR network and do its thing.  all good things take time.

  in JavaScript, an asynchronous environment, this kind of thing is handled
  using Promises, or basically "a commitment to 'come back eventually' when
  something that takes time is finished or fails".

  JavaScript introduced the async and await keywords with ES7 to clean up
  previously messy (asynchronous) code and make it look and feel like your
  regular garden variety (synchronous) code. now life is good, thanks ECMA!

  so?  well, don't forget the await keyword.  and go read the prereqs! :)
*/
```


<blockquote class="success">
<strong>finished!</strong><br><br>

Congratulations on connecting to the NEAR platform from your playground.

At this point you should feel confident that you have a working playground where we'll be able to move quickly from one lesson to the next as we explore the moving parts of `nearlib` and prepare you to develop your own blockchain-powered applications.

</blockquote>

### Send Yourself Money

As a quick reminder, we're about to use JavaScript and `nearlib` to:

- programmatically open the NEAR Wallet using JavaScript (this step mimics end user authentication in your app)
  - manually create a new user account as if we are the end user
- fetch the new account programmatically from your app
- _try_ to use the new user account to send money to your own developer account **but fail !**
- replace the local `FunctionCall` key with a `FullAccess` key (because, developers)
- try to use the new user account to send money to your own developer account **and succeed** :)

<blockquote class="lesson">
<strong>your turn</strong> <span>you've got money!</span><br><br>

- time to complete: **15 mins**
- level of difficulty: **moderate**
- prerequisites
  - make sure you already have your **developer** account setup via [NEAR Wallet](http://wallet.nearprotocol.com)
  - confirm you have access to `nearlib`, `near` and `wallet` in the console (see [prepare your playground](#prepare-your-playground))

> **unproductive confusion alert**
>
> We'll be using multiple browser tabs during this lesson so let's be explicit about them.
>
> - one of the tabs is our **Playground** where we see our `index.html` rendered
> - we will view the same NEAR Wallet account by two different means:
>   - when we call `wallet.requestSignIn()` we will be seamlessly redirected from **Playground** to **User Wallet**  and then back to **Playground** as part of the NEAR Wallet authorization process for our application
>   - later we will *manually* open the same **User Wallet** in a *new tab* to extract private keys using JavaScript because we're developers who can't be stopped!
>
> So we'll have a total of 2 tabs: **Playground** and **User Wallet**


</blockquote>

<a name="prepare-your-playground-screenshot"></a>

<blockquote class="info">
<strong>did you know?</strong><br><br>

You can watch `nearlib` using `LocalStorage` while you make various method calls if you open the JavaScript Developer Console just right.  Try to match the setup below on your end.  We're using Chrome.

![prepare your playground with JavaScript Developer Tools](/docs/assets/prepare-your-playground.png)


1. This, the browser's "local storage", is where `nearlib` stores data.  For client-side development, `nearlib` uses `BrowserLocalStorageKeyStore` to store keypairs in `LocalStorage`, a key-value store. The key is made up of 3 pieces of information,`'${PREFIX}${accountId}:${networkId}'` where the prefix defaults to "nearlib:keystore:" but can be assigned when constructing a `new BrowserLocalStorageKeyStore(mechanism, "with_your_prefix")` (note the first parameter defines the web storage mechanism and defaults to `window.localStorage` which _persists until cleared_ while `window.sessionStorage` is a compatible ephemeral option -- see [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) for details)

2. This, the "key" part of key-value in `LocalStorage`, is very active while signing in using `wallet.requestSignIn()`. As long as you're looking in the right place as per [ 1 ] above, you'll see `nearlib` writing the `accountId` and `networkId` here, prefixed by the `LOCAL_STORAGE_KEY_PREFIX`.

3. This, the "value" part of key-value in `LocalStorage`, holds the private key belonging to `accountId`

4. This, the "console", is where we'll be using the `nearlib` API

</blockquote>


<blockquote class="warning">
<strong>heads up</strong><br><br>

`LocalStorage` is scoped by domain so `localhost` is _not_ the same as `127.0.0.1` when developing locally.  This is useful because it restricts scripts on different domains from access to data they don't own but may be a little confusing for you while you're trying to track down the moving pieces of this experience.  Pay attention to the URLs when following wallet flow.

</blockquote>


<ol class="steps">

> the following steps will happen in the **Playground** tab


<li>Programmatically open the NEAR Wallet authorization flow to create an account for the user that just arrived to your app</li>

When you run this in the developer console, you will be redirected to the NEAR Wallet:

Note that it's important to create a **brand new account** in NEAR Wallet at this point (let's call it `THE_USER_ACCOUNT`). We're acting like a user who's arriving at your app to sign up via the NEAR Wallet but we're doing it through the developer console.

We'll be using this new account to send money to your **own account** that you created before starting this lesson (let's call that one `YOUR_DEVELOPER_ACCOUNT`)

```js
// type (or copy / paste) this into the console
await wallet.requestSignIn('not-a-real-contract', 'nearlib client-side quickstart')

// FYI, the signature for this method in TypeScript) is:
// async requestSignIn(contractId: string, title: string, successUrl: string, failureUrl: string)
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

Don't continue with this lesson until you have **finished the NEAR Wallet account flow**.  You'll know it worked because you will be back in your **Playground** and can type the following lines in your developer console and see the results

```js
wallet.isSignedIn()     // returns true as a boolean
wallet.getAccountId()   // returns the THE_USER_ACCOUNT as a string
```

</blockquote>

<li>Now programmatically fetch the new user account you just created</li>

```js
let sender = await near.account(wallet.getAccountId())
```

Do you notice the new entry in `LocalStorage`?  That's the data supporting `wallet.getAccountId()` above.


<li>try to use the new user account to send money to your own developer account but fail!</li>

```js
let your_developer_account = "YOUR_DEVELOPER_ACCOUNT"  // <-- replace this value with your developer account ID
let final = await sender.sendMoney(your_developer_account, 1000);
```

You should see <span class="error">`Error: The used access key requires exactly one FunctionCall action`</span>.

If not, something's off.

So what happened?  You don't have the **right *kind* of keys**, that's what happened.  There are 2 kinds of keys as of this writing with more likely to come.

<blockquote class="info">
<strong>did you know?</strong><br><br>

Your app (`index.html` in this lesson) was authorized to use a `FunctionCall` access key that has very limited permissions on the new account.  To sign and send a `Transfer` transaction (ie. send money) you need a `FullAccess` key.

It's a restricted key -- **it's designed to work like this.** -- because users want control over their accounts and `FunctionCall` access keys can be easily revoked.

</blockquote>

> still in the **Playground** tab ...

<li>Copy the user account ID from your app because we'll use it in a few moments</li>

```js
wallet.getAccountId() // copy the value returned by this line, it's the THE_USER_ACCOUNT
```

If you don't see the name of the user account that you just created, something is off.


> the following steps will happen in the **User Wallet** tab

<blockquote class="warning">
<strong>heads up</strong><br><br>

We're about to something craaaazy in the name of learning right now.

**What we're about to do won't ever happen in the real world** when you're building applications because *you don't have access to the user's computer*.

Fixing the <span class="error">error</span> we encountered above is easy and will give you a greater sense of control over how `nearlib` and NEAR Wallet manage keys.

We hope this will make development and troubleshooting of your own applications easier.

</blockquote>

<li>Open NEAR Wallet (https://wallet.nearprotocol.com) in a new tab and execute the code below in the developer console on that tab</li>


```js
let the_user_account = "THE_USER_ACCOUNT"  // get THE_USER_ACCOUNT from wallet.getAccountId() while browsing index.html on localhost
let user_account_privateKey = window.localStorage.getItem(`nearlib:keystore:${the_user_account}:default`)
console.warn(user_account_privateKey)
```

You should see the private key of the `THE_USER_ACCOUNT` appear in yellow in the console.

If you see `null` instead of a private key starting with `ed25519` then you probably forgot the replace `THE_USER_ACCOUNT` in the snippet above with the actual value of the user account name.

<li>Copy the user account private key to your clipboard. Let's call this the USER_ACCOUNT_PRIVATE_KEY</li>

> the following steps will happen in the **Playground** tab

<li>Switch back the index.html page in your playground</li>

<li>Use the code snippet below to overwrite the private key you have in your playground with the USER_ACCOUNT_PRIVATE_KEY we just copied</li>

```js
let user_account_privateKey = "USER_ACCOUNT_PRIVATE_KEY"     // <-- replace this with the private key you just copied from the other tab

let the_user_account = wallet.getAccountId()
window.localStorage.setItem(`nearlib:keystore:${the_user_account}:default`, user_account_privateKey)
```

<li>Now that you replaced the key, the same transaction above will work as expected.</li>

```js
// replace this with your developer account
let your_developer_account = 'YOUR_DEVELOPER_ACCOUNT'

// all inputs in nearlib are denominated in yoctoNEAR (1 NEAR = 10^24 yoctoNEAR)
// use this helper function to convert NEAR to yoctoNEAR
let amount_to_send = nearlib.utils.format.parseNearAmount('1') 

let sender, final

// make sure we're still signed in to the wallet
console.assert(wallet.isSignedIn(), "looks like you need to sign in again with the user account!")

try {
  // hydrate and validate we have the right to act on behalf of the sender account
  sender = await near.account(wallet.getAccountId())

  // execute a Transfer transaction using the sendMoney convenience method on the account object
  final = await sender.sendMoney(your_developer_account, amount_to_send);

  // print out the results
  console.log("transaction id", final.transaction.id)
  console.log("gas used", final.transaction.outcome.gas_burnt)

  // celebrate
  console.log("success!")

} catch (error) {
  // if anything goes sideways, error handling to the rescue
  console.warn(error.type, error.message)
}
```

</ol>


###### did it work?

**You'll know it worked when** you can send money and see the transactions appear in the developer console logs.  Look for output related to "transaction id" and "gas used"

**You'll know it worked when** you can see the transaction log on the network using either the user account or your developer account
- https://explorer.nearprotocol.com/accounts/`[the user account]`
- https://explorer.nearprotocol.com/accounts/`[your developer account]`

**You'll know it worked when** you can use NEAR Shell to query the transaction status for specific transaction IDs

```text
near tx-status ANY_TRANSACTION_ID
```

###### did something go wrong?

If you saw something unexpected, here's what may have happened ...

**If you saw nothing** after the call to `wallet.requestSignIn()` did nothing, it's almost certainly because you're already logged in with this browser on this domain.  Look for the `default_wallet_auth_key` in `LocalStorage` and delete it, or just call `wallet.signOut()`


**If you saw something** about <span class="error">Error: The used access key requires exactly one FunctionCall action</span> it was almost certainly intended as part of the lesson.  Check out step #3 above.

**If you saw something** about an `InvalidTxError::InvalidReceiver` with the message <span class="error">Invalid receiver account ID "YOUR_DEVELOPER_ACCOUNT" according to requirements</span> then it's because you forgot to change the placeholder to point to your developer account ID.

**If you saw something** like `Server error: account SOME_ACCOUNT does not exist while viewing` then you must have deleted the account in question at some point and need to recreate it.

**If you saw something** about a `nonce` being invalid it's possible you created the `sender` object with one key and tried to call `sendMoney` with a different key.  Just refresh the page and this will disappear.  A `nonce` is just a number, an integer in this case, and the word `nonce` is short for "`n`umber used `once`". On the NEAR platform we use increasing `nonce` values to avoid the risk of replaying transactions as the network is deciding what work to do next.  Each access key tracks how many times it has been used to sign any executed transactions by incrementing an associated `nonce`.  You can read more about how NEAR uses `nonce` values in the authoritative guide to NEAR internals, the Nearnomicon, [here](http://nomicon.io/Runtime/Scenarios/FinancialTransaction.html?highlight=nonce#creating-a-transaction) and [here](http://nomicon.io/BlockchainLayer/Transactions.html?highlight=nonce#transaction-ordering).

<blockquote class="warning">
<strong>heads up</strong><br><br>

`NEAR` is the unit of measurement for tokens are measured in NEAR Wallet but `yoctoNEAR` is the unit of measurement for tokens in `nearlib`.

This makes sense when we're talking about vanishingly small amounts of money like the gas consumed by a transfer (you've been watching that number printed to the console in this lesson, see `console.log(final.transaction.outcome.gas_burnt`) but when we're talking about human numbers then `yoctoNEAR` is a very small number indeed. 

To make this easier, we've included two helper functions for dealing with the the NEAR denominations: 

`parseNearAmount()` to go from NEAR to yoctoNEAR 

`formatNearAmount()`to go from yoctoNEAR to NEAR

```
let amount_in_near, amount_in_y_near

amount_in_y_near = nearlib.utils.format.parseNearAmount(amount_in_near)
amount_in_near = nearlib.utils.format.formatNearAmount(amount_in_y_near)
```

</blockquote>

<blockquote class="success">
<strong>finished!</strong><br><br>

Congratulations, you've just sent yourself (your developer account) money from another account, all programmatically using JavaScript.

At this point you should feel comfortable with your playground setup and be able to review / repeat any of the steps above to increase your confidence in the moving parts of this lesson.

In summary:
- we used `nearlib` to connect to the NEAR network in our playground
- used the `wallet.requestSignIn()` flow to create a new user account with NEAR Wallet and authorize our app with a `FunctionCall` access key
- tried to send money from this account but failed due to access key restrictions baked into the NEAR platform
- hacked our way around these restrictions by extracting the user's `FullAccess` private key used by NEAR Wallet
- pasting that key into our app and using it to sign and send a `Transfer` transaction (using the `account.sendMoney` convenience method)

</blockquote>


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

```json
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

```json
{
  "access_key": {
    "nonce": 0,                               // nonce is an incrementing counter to avoid duplicate transactions
    "permission": "FullAccess"                // this is a FullAccess access key
  },
  "public_key": "ed25519:AnNFREBskoffaCXHZWZ73LJJNJePH16BwM3T1W2c7WfH"
}
```

</blockquote>

## ready for more?

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

### Built with NEAR

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
- or find us on [Discord](https://discordapp.com/invite/jsAu4pP) or [Spectrum](https://spectrum.chat/near) and let us know how you feel.

Happy Building!

The Near Team
