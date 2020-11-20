---
id: zero-to-hero
title: Zero to Hero: Writing an Oracle
sidebar_label: Zero to Hero
---

## Tutorial Overview

In this tutorial, you'll quickly get up to speed with building on the NEAR Protocol. You'll learn to build a simple Oracle that can query external APIs and provide this data to the blockchain.

Because blockchains are closed systems. Smart contracts can only interact with data that lives on the blockchain. They cannot natively interface with data in the external world. Thus an Oracle is necessary to connect the blockchain with the outside world. There are various types of Oracles. We'll be implementing the most basic one - an Inbound Oracle that provides smart contracts with data from the external world.

**Tutorial Prerequisites:**

* JavaScript experience
* Basic familiarity with [AssemblyScript (a dialect of TypeScript)](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) will be helpful

**Disclaimer**

_The following example and code has been greatly simplified for ease-of-understanding. There are obvious vulnerabilities in our Oracle implementation, and is no way suitable for production environments._

This tutorial will be broken into bite size chunks, each focused on teaching you a few core concepts. The focus will be on the actual logic + interacting with the blockchain, so we'll ignore styling and css.

Let's get started!

## Step 0: Explore the online examples

> In a new browser tab or window
> - Open [examples](https://near.dev)
>
> You can interact with example apps online, or explore the code by opening it in gitpod (online IDE). The best example to start with for this tutorial is "Example of NEAR Wallet integration". Click "Open in Gitpod" button, and the Gitpod online IDE will open with the project loaded. The project file structure is explained in more detail [here](/docs/quick-start/development-overview)

Let's look over the directory and introduce you to the *main files* you'll be interacting with during this tutorial.  These are the same files you will almost always work with when prototyping ideas using gitpod.  For deeper work on your local machine you can also download the project but please do not do that right now.

- `assembly/main.ts` - This is where the smart contract code goes.
- `assembly/model.ts` - Define the types you want to use in your contract here.
- `src/index.html` - Basic layout for your front end.
- `src/main.js` - Wire up the backend logic for your app here.
- `src/test.js` - Tests for the backend logic.

The application will run automatically when you open it the first time. Click "Open Browser" button to interact with the app.
> - Use `yarn dev` command from the IDE command line to restart the app. You may need to terminate previous process e.g. by Ctrl + C.

*Note, you can also run unit tests by using the `yarn test` command.*

## Step 1: Logging in with NEAR
### Update the front end

Let's change the front end so that it makes sense for our use case. Eventually we want to display the bitcoin price on the page, so let's update everything accordingly.

> In the file `src/index.html`
> - Replace the header "Who was the last person to say hi" with the code `<h1>Near oracle demo</h1>`. If you would like to add any other HTML changes, this is where to do this.
> - Update the button say-hi: replace it with the following
```html
  <button id="set-response" class="signed-in" style="display: none">
    Get latest data!
  </button>
```

When we authorize this application for use with our account via NEAR Wallet, we'll be prompted with a message that we want to recognize.  Changing this text will help make that step clear.


> In the file `src/main.js`
> - Rename the application to match our expectations.

```js
window.walletAccount.requestSignIn(
  window.nearConfig.contractName,
  'Zero to Hero Tutorial',     // <-- find this line and change it to match
);
```

### Test the login

Let's try running the app with the changes so far.

> In Gitpod command line, run `yarn dev` to restart the app (you may need to terminate previous process e.g. by Ctrl + C).
>
> In the application
> - Click **Sign-in with NEAR** and follow the NEAR Wallet authorization flow

When you come back to the app, you will be logged in with your NEAR account. However, the UI will not work because we have not updated the `main.js` file to work with the latest contract. Let's do that now.

## Step 2: Implement the backend code (saving and reading data using blockchain)

Now that we logged in with near, let's implement a public API endpoint to provide our Oracle with the data it needs and save it to the blockchain.

The first thing that our Oracle Contract must be able to do is read from and write to the blockchain. This way our contract can save external data onto the blockchain for other contracts to interact with.

Navigate to our API [storage docs](https://near.github.io/near-sdk-as/modules/_sdk_core_assembly_storage_.html) to review the `setString` and `getString` functions. In later steps we'll show you how to handle more complicated data types.

Data can be stored in a simple key-value store. To save a string, we only need to pass a key with the string we want to save. For now let's use the string `"response"` as our key.

Let's implement the setResponse and getResponse functions now in `assembly/main.ts`.

> In the file `assembly/main.ts`
> - Delete and replace the **entire contents of the file** with the code below

```ts
import { storage, logging } from "near-sdk-as";

export function setResponse(apiResponse: string): void {
  logging.log("Writing the string [ " + apiResponse + " ] to the blockchain ...");
  storage.setString("response", apiResponse);
}

export function getResponse(): string {
  logging.log("Reading a string from the blockchain ...");
  let result = storage.getString("response");

  if(result) {
    return result;
  }

  return "";
}
```

Check that the application still builds by running `yarn build` from the Gitpod command line.

If you have any problems up to this point, please let us know on our [discord channel](http://near.chat).

## Step 3: Wire up the frontend to call the new API
### Update the frontend code
Now let's update the UI to use the backend code that we wrote in the previous step.
> Update the smart contract "plumbing" code: in `src/main.js`, update the contract definition. Replace the values of `viewMethods` and `changeMethods` with our new smart contract methods.
```js
  // Initializing our contract APIs by contract name and configuration.
  window.contract = await window.near.loadContract(nearConfig.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['getResponse'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['setResponse'],
    // Sender is the account ID to initialize transactions.
    sender: window.accountId,
  });
```
> In `src/index.html`, add the following element `Price of bitcoin: <div id="response"></div>` after the second button.
> In `src/main.js`, add the following function to read the data from the blockchain and update the UI. (Note: you can replace the updateWhoSaidHi function with this new function).
```js
// Function to update the page data
function updateData() {
  // JavaScript tip:
  // This is another example of how to use promises. Since this function is not async,
  // we can't await for `contract.getResponse()`, instead we attaching a callback function
  // using `.then()`.
  contract.getResponse().then((response) => {
    const el = document.getElementById('response');
    el.innerText = response || 'No data available';
  });
}
```
> In `src/main.js`, update the code that automatically refreshes the page data to call the new function
Replace:
```js
setTimeout(updateWhoSaidHi, 1000);
```
with
```js
  setTimeout(updateData, 1000);
```
> Now add a function to get the price of Bitcoin from coindesk and save it to the blockchain. In `src/main.js`, add the following function
```js
async function makeApiCallAndSave() {
  //for visibility purposes
  console.log('calling api endpoint')
  //calling endpoint
  let response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/btc.json');
  let body = await response.json();
  //stripping only the data we want from the API response
  let data = body.bpi.USD.rate
  //Saving the data to the blockchain by calling the Oracle Contracts setResponse function
  await window.contract.setResponse({ apiResponse: data });
  // Check to see if the data was saved properly
  let apiResponse = await contract.getResponse();
  console.log(`${apiResponse} is the API response available to the Oracle on-chain`);
}
```

Then let's fix up the event handler of the button. Replace
```js
// Adding an event to a say-hi button.
  document.getElementById('say-hi').addEventListener('click', () => {
    // We call say Hi and then update who said Hi last.
    window.contract.sayHi().then(updateWhoSaidHi);
  });
```
with
```js
  document.getElementById('set-response').addEventListener('click', () => {
    makeApiCallAndSave();
  });
```
This saves the price of Bitcoin to the blockchain.

### Test the app
> Restart the app by using the `yarn dev` command from the Gitpod command line (you may need to terminate previous process e.g. by Ctrl + c).

Clicking on the button will fetch the latest Bitcoin and save it on the blockchain. Then the UI will update with the latest data from the blockchain.

If you run into any problems, want to share some of the cool things you've built, or just want to get more involved with the Near community, join our [discord channel](http://near.chat). Everyone is super friendly. (Really!)

**Other Tutorials + Topics to cover**

* Writing Tests
* Working with Wallets
* Running Locally
* Debugging with the blockchain explorer
* Security / Privacy
* Factory Contracts

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8> Ask it on stack overflow! </h8>
</a>
