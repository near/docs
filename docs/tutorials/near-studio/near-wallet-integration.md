---
id: near-wallet-integration
title: Understanding Contract Structure
sidebar_label: Contract Structure
---

<<<<<<< HEAD
This tutorial presents the NEAR sample application called NEAR Wallet Integration
=======

<blockquote class="danger">
<strong>heads up</strong><br><br>

We are **currently migrating away from NEAR Studio** to a better experience for developers.  This article includes references to NEAR Studio which is being phased out.

For the most up to date examples of building on the NEAR platform, please refer to https://examples.nearprotocol.com

</blockquote>

This tutorial presents the NEAR Studio sample application called NEAR Wallet Integration
>>>>>>> add notice re: NEAR Studio moving to Gitpod

![NEAR Wallet Integration sample]


<blockquote class="info">
<strong>did you know?</strong><br><br>

NEAR Wallet is also discussed in the following Guides

- [JavaScript SDK Guides - Create an Account](/docs/roles/developer/examples/nearlib/guides)
- [JavaScript SDK Guides - Send Yourself Money](/docs/roles/developer/examples/nearlib/guides)

</blockquote>

If you haven't done so already ...

> In a new browser tab or window
> - Open [Examples](https://near.dev)
>
> - Select **Example of NEAR Wallet Integration**
> - Click **Open in Gitpod**

The sample application will be created and opened.  You can immediately test and deploy, everything should work.

> In Gitpod
> - To test, run the following command in the gitpod command line box
```bash
yarn test
```

![NEAR tests for NEAR Wallet integration sample](/docs/assets/near-studio-tests-near-wallet-integration.png)

Note: you may need to increase the timeout for the tests if they fail

> In the file `src/test.js`
> - Find the line for setting `DEFAULT_TIMEOUT_INTERVAL` and increase to `20000`

```js
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;  // <-- edit this line
```

> In Gitpod
> - To start the application, run the following command in the gitpod command line box
```bash
<snippet id='examples-start'/>
```

### Understanding the environment

> In the file `src/config.js`
> - Open the file and inspect its contents to understand the configuration settings.

```js
(function() {
  const CONTRACT_NAME = 'near-hello-devnet'; /* TODO: fill this in! */
  const DEFAULT_ENV = 'development';

  function getConfig(env) {
    switch (env) {

    case 'production':
    case 'development':
      return {
        networkId: 'default',
        nodeUrl: 'https://rpc.nearprotocol.com',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.nearprotocol.com',
        helperUrl: 'https://helper.nearprotocol.com',
      };
    case 'devnet':
      return {
        networkId: 'devnet',
        nodeUrl: 'https://rpc.devnet.nearprotocol.com',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.devnet.nearprotocol.com',
        helperUrl: 'https://helper.devnet.nearprotocol.com',
      };
    case 'betanet':
      return {
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.nearprotocol.com',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.betanet.nearprotocol.com',
        helperUrl: 'https://helper.betanet.nearprotocol.com',
      };
    case 'local':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
        contractName: CONTRACT_NAME,
      };
    case 'test':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        contractName: CONTRACT_NAME,
        masterAccount: 'test.near',
      };
    case 'test-remote':
    case 'ci':
      return {
        networkId: 'shared-test',
        nodeUrl: 'http://shared-test.nearprotocol.com:3030',
        contractName: CONTRACT_NAME,
        masterAccount: 'test.near',
      };
    case 'ci-staging':
      return {
        networkId: 'shared-test-staging',
        nodeUrl: 'http://staging-shared-test.nearprotocol.com:3030',
        contractName: CONTRACT_NAME,
        masterAccount: 'test.near',
      };
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
  }

  const cookieConfig = typeof Cookies != 'undefined' && Cookies.getJSON('fiddleConfig');
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = getConfig;
  } else {
    window.nearConfig =  cookieConfig && cookieConfig.nearPages ? cookieConfig : getConfig(DEFAULT_ENV);
  }
})();
```


### Understanding the contract

> In the file `assembly/main.ts`
> - Open the file and read the comments to understand how it works

Note that:
- all files in this folder *must* start with `//@nearfile` for the build process to work
- smart contracts depend on [`near-runtime-ts`](https://github.com/nearprotocol/near-runtime-ts) for all NEAR-specific features
- smart contracts must `export` functions to make them available for use
- `context.sender` represents the account that is calling the contract
- `logging.log()` is used to send messages to the JavaScript Developer Console in the browser
- `storage.setString()` and `storage.getString()` are used to read and write data to a key-value store dedicated to the smart contract

```ts
//@nearfile
import { context, storage, logging } from "near-runtime-ts";
// --- contract code goes below

// It's good to use common constant, but not required.
const LAST_SENDER_KEY = "last_sender";

// This is our change method. It modifies the state of the contract by
// storing the account_id of the sender under the key "last_sender" on the blockchain
export function sayHi(): void {
  // context.sender is the account_id of the user who sent this call to the contract
  // It's provided by the Blockchain runtime. For now we just store it in a local variable.
  let sender = context.sender;
  // `near` class contains some helper functions, e.g. logging.
  // Logs are not persistently stored on the blockchain, but produced by the blockchain runtime.
  // It's helpful to use logs for debugging your functions or when you need to get some info
  // from the change methods (since change methods don't return values to the front-end).
  logging.log(sender + " says \"Hi!\"");
  // storage is a helper class that allows contracts to modify the persistent state
  // and read from it. setString allows you to persitently store a string value for a given string key.
  // We'll store the last sender of this contract who called this method.
  storage.setString(LAST_SENDER_KEY, sender);
}

// This is our view method. It returns the last account_id of a sender who called `sayHi`.
// It reads value from the persistent store under the key "last_sender" and returns it.
export function whoSaidHi(): string | null {
  // getString returns a string value for a given string key.
  return storage.getString(LAST_SENDER_KEY);
}
```

### Understanding the front end


> In the file `src/main.js`
> - Open the file and read the comments to understand how it works

Note that:
- `initContract()` kicks off the loading of the app
- `nearlib.connect()` is how we connect to the NEAR blockchain
- `BrowserLocalStorageKeyStore` is what we use to store keys (in your LocalStorage)
- `viewMethods` and `changeMethods` are the smart contract methods where `viewMethods` do not modify the state of the blockchain and `changeMethods` do

```js
// Initializing contract
async function initContract() {
  console.log('nearConfig', nearConfig);

  // Initializing connection to the NEAR DevNet.
  window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

  // Initializing Wallet based Account. It can work with NEAR DevNet wallet that
  // is hosted at https://wallet.nearprotocol.com
  window.walletAccount = new nearlib.WalletAccount(window.near);

  // Getting the Account ID. If unauthorized yet, it's just empty string.
  window.accountId = window.walletAccount.getAccountId();

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(nearConfig.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['whoSaidHi'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['sayHi'],
    // Sender is the account ID to initialize transactions.
    sender: window.accountId,
  });
}

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

// Function that initializes the signIn button using WalletAccount
function signedOutFlow() {
  // Displaying the signed out flow container.
  document.getElementById('signed-out-flow').classList.remove('d-none');
  // Adding an event to a sing-in button.
  document.getElementById('sign-in-button').addEventListener('click', () => {
    window.walletAccount.requestSignIn(
      // The contract name that would be authorized to be called by the user's account.
      window.nearConfig.contractName,
      // This is the app name. It can be anything.
      'Who was the last person to say "Hi!"?',
      // We can also provide URLs to redirect on success and failure.
      // The current URL is used by default.
    );
  });
}

// Main function for the signed-in flow (already authorized by the wallet).
function signedInFlow() {
  // Displaying the signed in flow container.
  document.getElementById('signed-in-flow').classList.remove('d-none');

  // Displaying current account name.
  document.getElementById('account-id').innerText = window.accountId;

  // Adding an event to a say-hi button.
  document.getElementById('say-hi').addEventListener('click', () => {
    // We call say Hi and then update who said Hi last.
    window.contract.sayHi().then(updateWhoSaidHi);
  });

  // Adding an event to a sing-out button.
  document.getElementById('sign-out-button').addEventListener('click', () => {
    walletAccount.signOut();
    // Forcing redirect.
    window.location.replace(window.location.origin + window.location.pathname);
  });
}

// Function to update who said hi
function updateWhoSaidHi() {
  // JavaScript tip:
  // This is another example of how to use promises. Since this function is not async,
  // we can't await for `contract.whoSaidHi()`, instead we attaching a callback function
  // usin `.then()`.
  contract.whoSaidHi().then((who) => {
    // If the result doesn't have a value we fallback to the text
    document.getElementById('who').innerText = who || 'Nobody (but you can be the first)';
  });
}

// Loads nearlib and this contract into window scope.
window.nearInitPromise = initContract()
  .then(doWork)
  .catch(console.error);
```
