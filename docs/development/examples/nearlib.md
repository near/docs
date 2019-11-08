---
id: nearlib
title: nearlib examples
sidebar_label: nearlib
---

## overview

`nearlib` is a JavaScript/TypeScript library for development of DApps on the NEAR platform that can be used from any client or server-side JavaScript environment.

For example, it's used by [NEAR Shell](https://github.com/nearprotocol/near-shell/blob/master/package.json#L34) to generate keypairs and interface with the NEAR platform.  It's also used by our demo web DApps available in [NEAR Studio](https://github.com/nearprotocol/NEARStudio/blob/master/templates/01-hello-username/src/index.html#L33) to connect to the NEAR platform and access wallet information for DApp authentication flow.

If you're writing JavaScript, you want `nearlib`.

<blockquote class="info">
If you're writing Rust, check out <a href="/docs/near-bindgen/near-bindgen"><code>near-bindgen</code></a> instead.
</blockquote>

## setup

Depending on how you're planning to interact with the NEAR platform, you will want to reference `nearlib` from your client-side or server-side code.

### client side

To reference `nearlib` in the browser, just include it via CDN or add it to your asset pipeline as you would any other JavaScript library:


<a name="client-side-include"></a>

```html
<script src="https://cdn.jsdelivr.net/npm/nearlib@0.17.0/dist/nearlib.js"></script>
```

[NEAR Studio](http://near.dev) includes several client-side sample applications that rely on `nearlib` for all of their NEAR platform connectivity and interactions.

### server side

To reference `nearlib` in a Node.JS project, [install via npm](https://www.npmjs.com/package/nearlib):

```text
npm install nearlib
```

[NEAR Shell](https://docs.nearprotocol.com/docs/development/near-clitool) is an example of a Node.JS application that relies on `nearlib` to [generate secure keys](https://github.com/nearprotocol/near-shell/blob/master/commands/generate-key.js#L16), [connect to the NEAR platform](https://github.com/nearprotocol/near-shell/blob/master/utils/connect.js#L10) and confirm that a Smart Contract was [executed on the blockchain](https://github.com/nearprotocol/near-shell/blob/master/index.js#L110).


## examples

A few examples are included below.  Many of these were extracted from the sample applications provided with [NEAR Studio](http://near.dev/) so you can see them in context there.

### connecting

To do anything useful on the NEAR platform you have to first establish a connection.

<a name="connecting-example-01"></a>

```js
// configure network settings and key storage
const config = {
  nodeUrl: 'https://rpc.nearprotocol.com',
  deps: {
    keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore()
  }
};

// open a connection to the NEAR platform
(async function() {
  window.near = await nearlib.connect(config);
})(window)
```

*This code has been modified slightly from [our examples](https://github.com/nearprotocol/NEARStudio/blob/master/templates/01-hello-username/src/main.js#L6). See the complete [example of config.js](https://github.com/nearprotocol/NEARStudio/blob/master/templates/01-hello-username/src/config.js) from one of our demo DApps. In our sample applications, the configuration script is [included](https://github.com/nearprotocol/NEARStudio/blob/master/templates/01-hello-username/src/index.html#L35) on the web page and [cached](https://github.com/nearprotocol/NEARStudio/blob/master/templates/01-hello-username/src/config.js#L62) in a cookie.*


#### try it out

*prerequisite:* working familiarity with [async / await](https://javascript.info/async-await) in JavaScript

<blockquote class="info">
  time to complete: <strong>5 mins</strong>
</blockquote>


1. Create a blank HTML file with boilerplate content

2. Include the `script` tag [from above](#client-side) to pull `nearlib` in

3. Copy and paste the code block from the [connection example above](#connecting) into an inline `script` tag

<blockquote class="success">done</blockquote>

<h3>did it work?</h3>

Open the page and, in the JavaScript console, try pasting each of the following lines, one at a time, and hitting enter.

Confirm that you're looking at live data by comparing your results to [NEAR Explorer](https://explorer.nearprotocol.com/).



```js
// confirm you're connected to the NEAR platform
await near.connection.provider.status()

// check out the current state of the blockchain
(await near.connection.provider.status()).sync_info

// get the latest block height live (!) from the blockchain
(await near.connection.provider.status()).sync_info.latest_block_height
```

<em>Notice the block height in your console matches (or is very close to) the block height in NEAR Explorer.  Blocks are produced about once per second depending on a few factors so this number will change often.</em>

---


## ready for more?

### Sample Applications

- NEAR Studio
  - [try](http://near.dev/) several samples using NEAR Studio
  - explore the [source code](https://github.com/nearprotocol/NEARStudio/tree/master/templates) on GitHub
- Hello World
  - this application is used as part of our test environment to exercise `nearlib`
  - explore the [source code](https://github.com/nearprotocol/near-hello/)
- Counter Bot
  - [try](https://app.near.ai/app/uja2rf3j1/) this fun take on the classic counter demo by one of NEAR's engineers [Yifang Ma](https://www.linkedin.com/in/yifang-ma/)
  - explore the [source code](https://studio.nearprotocol.com/?f=uja2rf3j1) which is based on the NEAR Studio example "Counter Smart Contract"

<blockquote class="info">
  <strong>did you know?</strong><br><br>
  if an application was developed and deployed via NEAR Studio to our <code>app.near.ai</code> hosting environment, you can easily inspect the original source code by appending the <code>APP_ID</code> to the NEAR Studio editor URL.
  <br><br>
  <ul>
    <li>
      if the deployed app is available at a URL like this: <br>
      <strong>https://app.near.ai/app/<code>APP_ID</code>/</strong>
    </li>
    <li>
      then you can open the source code like this: <br>
      <strong>https://studio.nearprotocol.com/?f=<code>APP_ID</code></strong>
    </li>
  </ul>

  <em>note this is <strong>NOT</strong> the general case for all applications deployed to the NEAR platform as they are compiled to Wasm</em>
</blockquote>


### Built with NEAR

Checkout https://builtwithnear.com for more sample applications

- CryptoCorgies
  - [try](https://corgis.nearprotocol.com/) our delightful clone of the famous CryptoKitties application that brought the Ethereum network to a grinding halt.
  - explore the [source code](https://github.com/nearprotocol/crypto-corgis-solution)

---

## --- WIP ---

---

<blockquote class="error">
everything below is work-in-progress<br><br>
<em>this would not appear in public versions of this document</em>
</blockquote>


---

> candidate topics:

- keys
  - briefly why we use them
  - TweetNacl interface in nearlib (keypair, sign, verify)
- accounts
  - briefly what are they  different "types" (?)
    - `near.account` (ie. master account)
    - `new nearlib.WalletAccount;` (ie. wallet account)
    - `new nearlib.Contract;` (ie. contract account)
  - createAccount / deleteAccount / getAccountDetails / state
  - addKey / deleteKey / getAccessKeys
  - deployContract / viewFunction / functionCall
  - sendMoney
  - stake
- wallets
  - briefly what are they
  - requestSignIn / signOut / isSignedIn
  - getAccountId
- contracts
  - briefly what are they
  - viewMethods / changeMethods
  - new nearlib.Contract (replaces near.loadContract)


### keys

```js
// nearlib uses
let keypair = nearlib.utils.KeyPair.fromRandom('ed25519')
let {publicKey: pk, secretKey: sk} = keypair

// https://stackoverflow.com/a/37902334/2836874
// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
keypair.sign
keypair.verify
// --------------

```

---

### accounts



---

### wallets

```js
window.walletAccount = new nearlib.WalletAccount(window.near);
```


---

### contracts

- contracts (ie. blockchain Smart Contracts) are collections of functions designed to execute on the blockchain

- contracts on the NEAR platform are written in AssemblyScript which looks a lot like TypeScript (with some differences) if you squint

- the AssemblyScript is compiled to Wasm and executed on virtual machines (VMs) running on the blockchain.  the way this happens is a lot like serverless functions: when a contract method is called, a dedicated VM is spun up on the blockchain, passed the Wasm for the contract, the method is executed and the results returned to the caller.  *all of this is transparent to DApp developers*

- to call functions on a contract, developers use `nearlib`.  a constructor (`new nearlib.Contract`) returns a `Contract` object with "view" and "change" methods exposed as attributes (this was previously done via `near.loadContract`, since deprecated)

- the only difference between "view" and "change" methods is that "change" methods consume resources to execute on the blochain while "view" methods do not.  you can see this difference in the implementation of attaching [viewMethods](https://github.com/nearprotocol/nearlib/blob/master/src.ts/contract.ts#L14) vs [changeMethods](https://github.com/nearprotocol/nearlib/blob/master/src.ts/contract.ts#L23) to a contract.

- if you follow this code, you'll see the function signatures for a [viewFunction](https://github.com/nearprotocol/nearlib/blob/master/src.ts/account.ts#L180) takes no "gas" (the measure of computational and storage costs on a blockchain) vs a [functionCall](https://github.com/nearprotocol/nearlib/blob/master/src.ts/account.ts#L154) which does consume computational resources and requires a kindof "deposit to execute" before being accepted into the system (this is to guarantee that anyone running a NEAR node doesn't end up doing unpaid work where "work" here means "compute and / or storage" on their node)

#### a *very* brief intro to AssemblyScript on NEAR

> note: for sure this isn't the right place for this. it's just a sketch of an idea

the code snippet below is taken from one of our samples available in [NEAR Studio](http://near.dev/) called "Counter Smart Contract".  have a look and read the comments

```ts
// storage and logging are two of many features
// of the NEAR runtime environment
import { storage, logging } from "near-runtime-ts";

// Smart Contracts must export at least one function
// to be accessible to the outside world
export function incrementCounter(value:i32): void {
  // ... ommitted for brevity
}

// notice the parameters and return values are typed
export function decrementCounter(value:i32): void {
  // ... ommitted for brevity
}

// choosing the appropriate data types and methods
// will have an impact on the operational cost of
// your contract.
export function getCounter(): i32 {
  return storage.getPrimitive<i32>("counter", 0);
}

// we can read from and write to the NEAR platform
// and send log output from the blockchain to the browser
export function resetCounter(): void {
  storage.set<i32>("counter", 0);
  logging.log("Counter is reset!") // this message appears in the browser's JavaScript console
}
```


#### try it out

*prerequisite:* working familiarity with JavaScript

<blockquote class="info">
  time to complete: <strong>10 mins</strong>
</blockquote>

1. open [NEAR Studio](http://near.dev) and choose *Counter Smart Contract*
2. explore `main.ts` in the `assembly` folder to see the full version of the previous code sample

<blockquote class="success">done</blockquote>

---

#### implementing contracts on the blockchain

- the details and syntax of contract development on the NEAR platform are included in the section on [Writing Smart Contracts](/docs/development/writing-smart-contracts)
- at a high level, contracts are written in AssemblyScript and deployed to the NEAR platform as part of a [build process](https://github.com/nearprotocol/near-shell/blob/master/blank_project/gulpfile.js#L4) that we give you.  while you don't need to know any of the details of this process, it's nice to know that, since NEAR is open source, we can dive right in and see exactly how
  - the build process [compiles the AssemblyScript to Wasm](https://github.com/nearprotocol/near-shell/blob/master/gulp-utils.js#L12)
  - then [deploys it](https://github.com/nearprotocol/near-shell/blob/master/index.js#L95-L101) (as happens with with [several other kinds of actions](https://github.com/nearprotocol/nearlib/blob/master/src.ts/transaction.ts#L39-L46)
  - where it lives as a [primitive on the NEAR blockchain](https://github.com/nearprotocol/nearcore/blob/master/runtime/runtime/src/actions.rs#L260)


#### invoking contract methods from JavaScript

- the details and syntax of workign with Smart Contracts on the NEAR platform is included in the section on [Calling Smart Contracts](/docs/development/calling-smart-contracts)
- at a high level, to get a reference to a contract deployed on the NEAR platform you need
  - the contract name (which must be globally unique)
  - the account using the contract (called "sender" because they're "sending a message to, ie. invoking, the contract")
  - a list of view methods and change methods that you expect to use in your JavaScript application

<blockquote class="info">
you don't have to include all the view and change methods that are implemented on the contract, just the ones that you plan to use in this context.
</blockquote>

 the code snippet below is building a JavaScript object that knows how to "talk to" the deployed contract

```js
window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ["getCounter"],
    changeMethods: ["incrementCounter", "decrementCounter"],
    sender: window.walletAccount.getAccountId()
  });
```

<blockquote class="warning">
<code>near.loadContract</code> <br><br>
although this method is <strong>deprecated</strong>, it's included in these examples because it may appear in sample applications and in the wild until DApp developers resolve the warnings
<br><br>
<code>new nearlib.Contract</code> is the correct way to build a reference to a deployed contract
</blockquote>
