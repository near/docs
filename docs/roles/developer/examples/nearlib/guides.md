---
id: guides
title: Guides
sidebar_label: Guides
---

[**Create an Account**](#create-an-account)  \
*Use NEAR Wallet to Create an Account*

| duration   | directions  | difficulty |
|:-----------|:--------|:-----------|
| 1 min      | 3 steps | Trivial    |

Create your first account on the NEAR platform.  This is how users can sign in to the apps you develop.

---

[**Authenticating with NEAR Shell**](#authenticating-with-near-shell)  \
*Use NEAR Shell for Command Line Authentication*

| duration   | directions  | difficulty |
|:-----------|:--------|:-----------|
| 5 mins     | 4 steps | Trivial    |

Authenticate using NEAR Shell to take advantage of the command line interface for building projects on the NEAR platform.

---

[**Prepare Your Playground**](#prepare-your-playground)  \
*Create a safe space to try out All The Things*

| duration   | directions  | difficulty |
|:-----------|:--------|:-----------|
| 10 mins    | 5 steps | Trivial    |

Setup the simplest possible client-side application for experimenting with `nearlib` and NEAR Wallet.

---


[**Levels of Abstraction**](#levels-of-abstraction)  \
*Explore Several Levels of Abstraction within `nearlib`*

| duration   | directions  | difficulty |
|:-----------|:--------|:-----------|
| 10 mins    | 4 steps | Moderate   |

`nearlib` wraps the NEAR JSON-RPC interface with convenience functions, typed errors and NEAR primitives as first class JavaScript objects.

---

[**Send Yourself Money**](#send-yourself-money)  \
*Explore the different types of keys available on the NEAR platform*

| duration   | directions  | difficulty |
|:-----------|:--------|:-----------|
| 15 mins    | 9 steps | Moderate   |

Use NEAR Wallet to send money from one of your accounts to another.  But first you need the right keys!

---

## Create an Account

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

## Authenticating with NEAR Shell

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
<snippet id='shell-install-command'/>
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
near send YOUR_DEVELOPER_ACCOUNT YOUR_DEVELOPER_ACCOUNT 2
```

You will immediately see the confirmation of an attempt to send the transaction like this

`Sending 2 NEAR to YOUR_DEVELOPER_ACCOUNT from YOUR_DEVELOPER_ACCOUNT`


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

You've installed NEAR Shell, authorized it to sign transactions on behalf of your developer account, and used it to send a `Transfer` transaction to the NEAR network.


</blockquote>

## Prepare Your Playground

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

- Local development? use `localhost:3030`
- NEAR TestNet development? use `rpc.nearprotocol.com`
- NEAR Stake Wars curious?  use `rpc.tatooine.nearprotocol.com`

*(prefix the above with either `http://` or `https://` as appropriate)*

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




## Levels of Abstraction

`nearlib` wraps the JSON-RPC NEAR platform API.  To make development on the NEAR platform more accessible, `nearlib` uses several levels of abstraction between the JSON-RPC calls over HTTP and the JavaScript objects you will use in your code.  This lesson explores those levels of abstraction.

<blockquote class="lesson">
<strong>your turn</strong> <span>Explore the helpful abstractions provided by <code>nearlib</code></span><br><br>

- time to complete: **10 mins**
- level of difficulty: **moderate**
- prerequisites
  - make sure you already have your developer account setup via NEAR Wallet
  - confirm you have access to `nearlib`, `near` and `wallet` in the console (see [prepare your playground](/docs/roles/developer/examples/nearlib/introduction#prepare-your-playground))
</blockquote>


`Contract` represents a Smart Contract on the NEAR platform.

Looking at the [source code for the `Contract` class](https://github.com/near/near-api-js/blob/master/src/contract.ts) we see its constructor adds `view` and `change` methods as function attributes of a new contract instance.  This is a useful abstraction to help us reason about contracts as first class citizens in our application.  But what's actually happening under the hood is that `view` and `change` methods on a contract instance are just proxies for an `Account`s `viewFunction` and `functionCall` methods.  These, in turn, are just proxies for JSON RPC calls via `JsonRpcProvider`.

Of course there's more going on here than just a simple game of "hot potato" (passing something from one person to another without thinking).  These interfaces are often handling some basic data validation or sanitizing inputs and return values.  But the general structure is the same throughout `nearlib` -- anything you do that touches the network ends up as a JSON RPC call handled by `JsonRpcProvider` which itself relies on the [popular `fetch` library](https://github.com/nearprotocol/nearlib/blob/3b37c330e9c00daf087c483d0e57d6e1b30f6647/src.ts/utils/web.ts#L39) under the hood.

<ol class="steps">

<li>consider the highest level of abstraction available for calling a Smart Contract method</li>

*The following code is adapted from the [NEAR Counter Smart Contract](http://near.dev/) so have a look there quickly if this is your first time working with the NEAR platform because the code below will seem much clearer to you once you've taken 10 minutes to play with the Counter Smart Contract example and skimmed the code in `src/main.js`.*

It's not necessary, but you can copy and paste the code below into your **Playground**.

```js
// ABSTRACTION: high
// -----------------------------------------------------------------------------
// at the highest level of abstraction: using the Contract object
// -----------------------------------------------------------------------------

// Initializing our contract APIs by contract name and configuration.
let contractName = "my-counter-contract" // contract names must be globally unique

// this approach has been deprecated but appears in many examples
window.contract = await near.loadContract(contractName, {
  viewMethods: ['getCounter'],
  changeMethods: [ /* removed for simplicity */ ],
  sender: wallet.getAccountId()
});

// invoking the method will throw an error since the contract doesn't exist
// window.contract.getCounter()
// uncomment and use the line above to try calling the method on the fake contract
```

The code above produces an instance of the `Contract` object that exposes a single `view` method called `getCounter`

<blockquote class="info">
<strong>did you know?</strong><br><br>

`view` methods don't change the state of the blockchain, as opposed to `change` methods which do, and therefore require a cryptographic signature, cost a little more to compute and take a little longer to process since they're execution is recorded permanently on the blockchain (which requires consensus)

</blockquote>

<li>consider an alternate version of the code above for calling a Smart Contract method</li>

It's not necessary, but you can copy and paste the code below into your **Playground**.

```js
// ABSTRACTION: high
// -----------------------------------------------------------------------------
// STILL at the highest level of abstraction: using the Contract object
// but this is ANOTHER APPROACH to the same thing: loading a contract instance
// We include this here because the code above displays a deprecation warning
// -----------------------------------------------------------------------------
await (async () => {
  // same contract name as above
  let contractName = "my-counter-contract" // contract names must be globally unique

  // this time get a reference to an account first
  let account = await getAuthorizedAccount()

  // then create a new contract instance
  window.contract = new nearlib.Contract(account, contractName, {
    viewMethods: ['getCounter'],
    changeMethods: [ /* removed for simplicity */ ],
  });

  // ---------------------------------------------------------------------------
  // helper function to keep code above a little cleaner
  async function getAuthorizedAccount(){
    try {
      return await near.account(wallet.getAccountId())
    } catch(e){
      // this approach throws an exception if we haven't authorized NEAR Wallet first
      if(/Account ID/.test(e.message)) {
        console.warn("you should authorize this app using NEAR Wallet first")
      } else {
        console.log(e.type, e.message)
      }
    }
  }
})()

// if you're already logged in with NEAR Wallet, then invoking the contract method
// we just setup will throw an error since the contract doesn't actually exist
// window.contract.getCounter()
// uncomment and use the line above to try calling the method on the fake contract
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

Actually calling the contract method in the 2 code snippets above (and the next few in this discussion) **will throw an error because the contract account doesn't exist** (at least it didn't at the time of writing)

---

`Uncaught (in promise) Error: Querying call/my-counter-contract/getCounter failed: ` \
`Account "my-counter-contract" doesn't exist.`  \
`{`  \
`  "error": "Account \"my-counter-contract\" doesn't exist",`  \
`  "logs": []`  \
`}`

---

But why are we getting an `Account`-related error when we're working with a Smart Contract here?

Well, contracts have accounts too because they're first class citizens on the network with their own storage and compute budgets. You can read more about `Account`s on the NEAR platform in the [Nearnomicon](http://nomicon.io/DataStructures/Account.html).

</blockquote>

<li>Consider a lower level of abstraction to do the same. This is somewhere "in the middle" of the layers of abstractions made available by nearlib</li>

It's not necessary, but you can copy and paste the code below into your **Playground**.

```js
// ABSTRACTION: middle
// -----------------------------------------------------------------------------
// a little lower in the abstraction hierarchy: using the Account object
// -----------------------------------------------------------------------------
await (async () => {
  let contractName = "my-counter-contract" // contract names must be globally unique
  let methodName = "getCounter"

  window.contract = {
    getCounter: async (args) => {
      let account = await getAuthorizedAccount()
      account.viewFunction(contractName, methodName, args || {});
    }
  }

  // ---------------------------------------------------------------------------
  // helper function to keep code above a little cleaner
  async function getAuthorizedAccount(){
    try {
      return await near.account(wallet.getAccountId())
    } catch(e){
      // this approach throws an exception if we haven't authorized NEAR Wallet first
      if(/Account ID/.test(e.message)) {
        console.warn("you should authorize this app using NEAR Wallet first")
      } else {
        console.log(e.type, e.message)
      }
    }
  }
})()
```

<li>Consider the lowest level of abstraction made available by nearlib</li>

It's not necessary, but you can copy and paste the code below into your **Playground**.

```js
// ABSTRACTION: low
// -----------------------------------------------------------------------------
// now at the lowest level of abstraction: using JsonRpcProvider directly
// -----------------------------------------------------------------------------
await (async () => {
  let contractName = "my-counter-contract" // contract names must be globally unique
  let methodName = "getCounter"
  let methodArgs = {}
  let encodedArguments = nearlib.utils.serialize.base_encode(JSON.stringify(methodArgs))

  window.contract = {
    getCounter: async (args) => {
      let account = await getAuthorizedAccount()
      account.connection.provider.query(`call/${contractName}/${methodName}`, encodedArguments)
    }
  }

  // ---------------------------------------------------------------------------
  // helper function to keep code above a little cleaner
  async function getAuthorizedAccount(){
    try {
      return await near.account(wallet.getAccountId())
    } catch(e){
      // this approach throws an exception if we haven't authorized NEAR Wallet first
      if(/Account ID/.test(e.message)) {
        console.warn("you should authorize this app using NEAR Wallet first")
      } else {
        console.log(e.type, e.message)
      }
    }
  }
})()
```

</ol>

#### Did it work?

**You'll know it worked** when you see the output of the code above and the only errors are those related to the contract account not being found (assuming no one actually adds it after seeing this note just to troll you ;)

#### Did something go wrong?

**If you saw something** about a console warning that you need to login to NEAR Wallet then you should do that because the call to `wallet.getAccountId()` won't return proper data unless you're logged in.  You can check if you're logged in by calling that very method or by inspecting your `LocalStorage` and noting at least 1 private key there that's associated with the account you're trying to use.  If any of this is disorienting then your best bet it to revisit the [introduction to `nearlib`](/docs/roles/developer/examples/nearlib/introduction) that covers these details.

<blockquote class="success">
<strong>finished!</strong><br><br>

You should now have a good sense of how `nearlib` handles communications with the NEAR network and the benefits of using `nearlib` in your own applications.  The NEAR engineering team is committed to maintaining the highest possible quality of language bindings possible including JavaScript via `nearlib` and Rust via `near-bindgen`.  If you have any suggestions for improvement, comments or nits about your experience with `nearlib`, we're all ears.  Please [submit an issue](https://github.com/nearprotocol/nearlib/issues), comment on existing issues and [submit pull requests](https://github.com/nearprotocol/nearlib/pulls).  We welcome your contributions!

</blockquote>

## Send Yourself Money

We're about to use JavaScript and `nearlib` to:

- programmatically open the NEAR Wallet using JavaScript (this step mimics end user authentication in your app)
  - manually create a new user account as if we are the end user
- fetch the new account programmatically from your app
- _try_ to use the new user account to send money to your own developer account **but fail !**
- replace the local `FunctionCall` key with a `FullAccess` key (because, developers)
- try to use the new user account to send money to your own developer account **and succeed** :)

Along the way we hope you'll learn a lot about `nearlib`, NEAR Wallet and a few differences between key types on the NEAR platform that will help you reason about your own applications, all while having some fun hacking away with these tools.

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

// FYI, the signature for this method in AssemblyScript) is:
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
- explorer.nearprotocol.com/accounts/`[the user account]` 
- explorer.nearprotocol.com/accounts/`[your developer account]`

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

**If you saw something** about a `nonce` being invalid it's possible you created the `sender` object with one key and tried to call `sendMoney` with a different key.  Just refresh the page and this will disappear.  A `nonce` is just a number, an integer in this case, and the word `nonce` is short for "`n`umber used `once`". On the NEAR platform we use increasing `nonce` values to avoid the risk of replaying transactions as the network is deciding what work to do next.  Each access key tracks how many times it has been used to sign any executed transactions by incrementing an associated `nonce`.  You can read more about how NEAR uses `nonce` values in the authoritative guide to NEAR internals, the Nearnomicon, [here](http://nomicon.io/RuntimeSpec/Scenarios/FinancialTransaction.html?highlight=nonce#creating-a-transaction) and [here](http://nomicon.io/ChainSpec/Transactions.html?highlight=nonce#transaction-ordering).

<blockquote class="warning">
<strong>heads up</strong><br><br>

`NEAR` is the unit of measurement for tokens are measured in NEAR Wallet but `yoctoNEAR` is the unit of measurement for tokens in `nearlib`.

This makes sense when we're talking about vanishingly small amounts of money like the gas consumed by a transfer (you've been watching that number printed to the console in this lesson, see `console.log(final.transaction.outcome.gas_burnt`) but when we're talking about human numbers then `yoctoNEAR` is a very small number indeed.

To make this easier, we've included two helper functions for dealing with the the NEAR denominations:

`parseNearAmount()` to go from NEAR to yoctoNEAR

`formatNearAmount()`to go from yoctoNEAR to NEAR

```js
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
