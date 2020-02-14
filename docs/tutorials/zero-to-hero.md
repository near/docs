---
id: zero-to-hero
title: Zero to Hero: Writing an Oracle
sidebar_label: Zero to Hero
---

## Tutorial Overview

In this tutorial, you'll quickly get up to speed with building on the NEAR Protocol. You'll learn to build a simple [Oracle](https://blockchainhub.net/blockchain-oracles/) that can query external APIs and provide this data to the blockchain.

Because blockchains are closed systems. Smart contracts can only interact with data that lives on the blockchain. They cannot natively interface with data in the external world. Thus an Oracle is necessary to connect the blockchain with the outside world. There are various types of [Oracles](https://blockchainhub.net/blockchain-oracles/). We'll be implementing the most basic one - an Inbound Oracle that provides smart contracts with data from the external world.

Once we've built the Oracle, we'll finish this tutorial with a real world example where we get the price of Bitcoin from CoinDesk, and then create a simple "Wager" contract that pays out the winner between two gamblers who have bet on the "over-under" price of Bitcoin.

**Tutorial Pre-requisites:**

* JavaScript experience
* Basic familiarity with [AssemblyScript (a dialect of TypeScript)](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) will be helpful

**Disclaimer**

_The following example and code has been greatly simplified for ease-of-understanding. There are obvious vulnerabilities in our Oracle implementation, and is no way suitable for production environments._

This tutorial will be broken into bite size chunks, each focused on teaching you a few core concepts. The focus will be on the actual logic + interacting with the blockchain, so we'll ignore styling and css.

Let's get started!

## Step 0: Get familiar with NEAR Studio + the basic layout of a NEAR app

> In a new browser tab or window
> - Open [NEAR Studio](https://near.dev)
>
> In the *Create New Project* screen that appears
> - Select **Example of NEAR Wallet integration**
> - Click **Create**

NEAR Studio will appear with the project loaded.

All our sample projects work out of the box.  The project file structure is explained in more detail [here](/docs/quick-start/development-overview)

Let's look over the directory and introduce you to the *main files* you'll be interacting with during this tutorial.  These are the same files you will almost always work with when prototyping ideas using NEAR Studio.  For deeper work on your local machine you can also download the project but please do not do that right now.

- `assembly/main.ts` - This is where the smart contract code goes.
- `assembly/model.ts` - Define the types you want to use in your contract here.
- `src/index.html` - Basic layout for your front end
- `src/main.js` - Wire the logic for your app here
- `src/test.js` - For you to write tests

Let's run the application
> - Click **Run** (near the top of the window) to deploy the application and try it out.

A new tab will open with the running sample application.  You can play with the example for a few minutes or close this tab immediately since we'll be making significant changes to this sample project.

*Note, you can also run unit tests by clicking **Test**.*

## Step 1: Store and retrieve information from the blockchain

Now that you're familiar with NEAR Studio and the various files in your project, let's get started coding!

The first thing that our Oracle Contract must be able to do is read from and write to the blockchain. This way our contract can save external data onto the blockchain for other contracts to interact with.

Navigate to our API [storage docs](/docs/runtime-ts/classes/storage) to review the `setString` and `getString` functions. In later steps we'll show you how to handle more complicated data types.

Data can be stored in a simple key-value store. To save a string, we only need to pass a key with the string we want to save. For now let's use the string `"response"` as our key.

### Writing Smart Contract functions

Let's implement the setResponse and getResponse functions now in `assembly/main.ts`.

> In the file `assembly/main.ts`
> - Delete and replace the **entire contents of the file** with the code below

```ts
//@nearfile
import { storage, logging } from "near-runtime-ts";

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

*The single line comment `//@nearfile` is **necessary as the first line** as part of our build process.*

### Wiring the functions

Great! Now that we've implemented these functions, let's ensure they're available in the window object.

To use these functions, we need to "attach" them to the contract object made available by our JavaScript SDK `nearlib`.  This is easily done by adding their name (as a string) to an collection of available contract methods.

NEAR contracts support two types of methods:
- `view` methods to read from the blockchain without changing state
- `change` methods to alter the state of the blockchain

We have one of each.

> In the file `src/main.js`
> - Replace the values of `viewMethods` and `changeMethods` with our new smart contract methods.

```js
window.contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ["getResponse"],     // <-- find this line and change it to match
  changeMethods: ["setResponse"],   // <-- find this line and change it to match
  sender: window.accountId
});
```

The edits we just made will allow us to invoke these methods on the contract object using basic JavaScript object syntax like this `contract.setResponse("hello world")` and `contract.getResponse()`.

<blockquote class="info">
<strong>did you know?</strong><br><br>

We've just exposed a NEAR smart contract to our JavaScript client side code.

Once deployed (this happens automagically in NEAR Studio when we click Run) the smart contract will be compiled to Wasm and deployed to the NEAR blockchain.   We can then invoke its methods using JavaScript which you will do in a few moments.

If you're curious about how this works under the hood, have a look at the [`nearlib` source code](https://github.com/nearprotocol/nearlib/blob/master/src.ts/contract.ts).  You'll find we're just wrapping a couple of layers of abstraction around our RPC interface.

</blockquote>

### Cleaning up the front end

Now let's clean up the front end.

> In the file `src/index.html`
> - Replace the contents of `div.jumbotron` (the div with **class**="jumbotron") with the following code

```html
<h3>Zero to Hero Tutorial</h3>
<strong>Set and get a response from the blockchain</strong>
```

> Also in the same file `src/index.html`
> - Replace the contents of `div#signed-in-flow` (the div with **id**="signed-in-flow") with the following code

```html
<h3>Hi, <i id="account-id"></i>! </h3>
<button id="sign-out-button" class="btn btn-danger btn-lg">Sign-out</button>
<hr>
<p>To run through this demo you will need to open your <a href="https://javascript.info/devtools">JavaScript Developer Console</a><br>
<strong>(Press Cmd+Opt+J or, if you’re on Windows, then F12)</strong>
</p>

<p>To SET the response, copy and paste the line below into your browser's developer console:</p>
<pre>    await contract.setResponse({ apiResponse: 'hello world' });</pre>

<p>To GET the response, copy and paste the line below into your browser's developer console:</p>
<pre>    await contract.getResponse();</pre>
```

### Renaming the sample application

When we authorize this application for use with our account via NEAR Wallet, we'll be prompted with a message that we want to recognize.  Changing this text will help make that step clear.


> In the file `src/main.js`
> - Rename the application to match our expectations.

```js
window.walletAccount.requestSignIn(
  window.nearConfig.contractName,
  'Zero to Hero Tutorial',     // <-- find this line and change it to match
);
```

### Cleaning up our sample JavaScript

Since we're modifying a sample application, we should take care to avoid errors caused by the edits we made.  One type of error that we've introduced is related to deleted HTML.  Let's comment out the lines of JavaScript that are expecting that HTML to exist.

> In the file `src/main.js`
> - Comment out the following lines of code.  There are 4 of them in total.

```js
// HEADS UP!  Only comment out the lines indicated below.  Leave the others as is.

async function doWork() {
  // document.getElementById('refresh-button').addEventListener('click', updateWhoSaidHi);
}

function signedInFlow() {
  // document.getElementById('say-hi').addEventListener('click', () => {
  //   window.contract.sayHi().then(updateWhoSaidHi);
  // });
}
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

If you see any JavaScript errors in your console while running the application in later steps, it's likely that you did not comment out the correct lines of code or you commented out too many lines of code.

Take care to avoid these errors because once an error is raised by the JavaScript interpreter, the browser **stops executing** all other JavaScript so you will not see the expected results.

</blockquote>

### Calling the functions

Let's try calling these functions!

> In NEAR Studio
> - Click **Run** to launch the project
>
> In the application
> - Click **Sign-in with NEAR** and follow the NEAR Wallet authorization flow
>   - Once signed in with NEAR you will see "Hi, *`YOUR ACCOUNT`*!"
> - Follow the instructions on the web page to invoke the contract methods

<blockquote class="warning">
<strong>heads up</strong><br><br>

Contract methods don't accept positional parameters. You must pass a JSON object to the function with named parameters.

So instead of calling `await contract.setResponse('hello world')` you must call `await contract.setResponse({ apiResponse: 'hello world' })`

</blockquote>

You'll know you've succeeded when you see the log output from your smart contract appear in the developer console just below the two method calls you copied and pasted.

## Step 2: Inject external API information into the blockchain

Now that we can read from and write to the blockchain, let's call a public API endpoint to provide our Oracle with the data it needs.  We will save the response to the blockchain.

We will add our code to the `src/main.js` as the call needs to be made off chain. We'll then use the `setResponse` method we created above to save the data to the blockchain.

> In the file `src/main.js`
> - Copy and paste the following code to the bottom of the file
>
> In NEAR Studio
> - Click **Run** to redeploy the application
>
> In the developer console
> - Invoke the new function using `await makeApiCallAndSave()`.
> - Invoke the previous contract method using `await contract.getResponse()`
> - Compare the results.  They should be identical.  In fact one function uses the other.

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
  await contract.setResponse({ apiResponse: data });
  // Check to see if the data was saved properly
  let apiResponse = await contract.getResponse();
  console.log(`${apiResponse} is the API response available to the Oracle on-chain`);
}
```

This should save the price of Bitcoin to the blockchain.

If you have any problems up to this point, please let us know on our [discord channel](http://near.chat).

### Your turn!

Now it's your turn to enhance our smart contract with two new methods that accept a dynamic key name instead of just assuming the key name is `"response"`.

Try creating two new methods: `setResponseByKey(key: string, apiResponse: string): void`, and `getResponseByKey(key: string): string` which are almost the same as the previous methods but now accept a `key` parameter as well (i.e. you should be able to save and retrieve a string using a key).

Take a few minutes to think through this now.

> On your own
> - Consider which file(s) you would edit to implement these smart contract methods
> - Consider what the body of each of these methods would be

Did you take some time to think about this?  How did it go?

Here's our solution.  The file being edited is included as a comment at the top of each code snippet.

First we implement the contract methods in AssemblyScript in the file.

> In the the file `assembly/main.ts`
> - Append the code below to the bottom of the file

```ts
export function setResponseByKey(key: string, apiResponse: string): void {
  logging.log("Writing the string [ " + apiResponse + " ] to the blockchain using the key [ " + key + " ]");
  storage.setString(key, apiResponse);
}

export function getResponseByKey(key: string): string {
  logging.log("Reading a from the blockchain using the key [ " + key + " ]");
  let result = storage.getString(key);

  if(result) {
    return result;
  }

  return "";
}
```

Then we surface these methods by attaching them to the JavaScript contract object in the `src/main.js` file.

> In the the file `src/main.js`
> - Replace the values of `viewMethods` and `changeMethods` with our new smart contract methods.

```js
window.contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ["getResponse", "getResponseByKey"],     // <-- find this line and change it to match
  changeMethods: ["setResponse", "setResponseByKey"],   // <-- find this line and change it to match
  sender: window.accountId
});
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

When you invoke these methods, make sure you're passing an object with named parameters

- `await contract.setResponseByKey({ key: 'foo', apiResponse: 'bar' });`
- `await contract.getResponseByKey({ key: 'foo' });`

</blockquote>

We'll make use of these new methods later when we save our response using a dynamic key based on the specific data we're working with, whether it's the price of BTC or something else entirely.

Of course you're welcome (encouraged?) to try them now yourself the same way we tested our previous methods to build confidence in your understanding of the code.  Just click **Run** and invoke the methods from the developer console using any sensible values.

## Step 3: Building + wiring the front end

Let's now wire these functions to the front end.

It would be great if we could create two buttons:

* the first button should get the price of BTC and save it to the blockchain
* the second button should display the saved price of BTC to the front end

### Building the front end

> In the file `src/index.html`
> - Replace the contents of `div.signed-in-flow` with the code below

```html
<h3>Hi, <i id="account-id"></i>! </h3>
<button id="sign-out-button" class="btn btn-danger btn-lg">Sign-out</button>
<hr>
<button class="btn btn-primary btn-lg" onClick={makeApiCallAndSave()}>Make API call and save response to blockchain</button>
<button class="btn btn-secondary btn-lg" onClick={fetchAndDisplayResponse()}>Retrieve response and display</button>
<!--Creating a div to insert our API response to-->
<hr>
<div class="p-2 bg-success text-white" id="response"></div>
```

Now that we've created our front end elements, we need to code the functions we've set to be called `onClick`.

The first button will work right away and will print the results of our API call to the console as expected.  We haven't implemented the code for the second button yet, but we will.

### Wiring up our front end elements

The function `makeApiCallAndSave` has already been defined, but we need to write the function `fetchAndDisplayResponse`.

> In the file `src/main.js`
> - Copy and paste the following code to the bottom of the file

```js
async function fetchAndDisplayResponse() {
  // getting the response from the blockchain
  let apiResponse = await contract.getResponse();
  // logging on the console for some feedback
  console.log(apiResponse);
  // Displaying the message once we have it.
  document.getElementById('response').innerText = apiResponse;
}
```

Now clicking the "Make API Call" button will make the API call and save the response to the blockchain. (You should keep the dev console open to make sure it's happening as expected).

Clicking the "Get Response And Display" button will get the response from the blockchain, and display it to the front end.

Great work! You've now built an end-to-end application on the Near Protocol. Piece of cake, right?

Again, feel free to click **Run** and test out the controls you've just added.

### Your turn

Try wiring the contract methods you created, `setResponseByKey` and `getResponseByKey`, to the front end.

The front end should allow for the following functionality:

* The user should be able to save a key and its corresponding response to the blockchain
* The user should be able to input a key and retrieve the corresponding response from the blockchain

How did it go?

Here's our solution.

**Front end**

> In the file `src/index.html`
> - We appended the following HTML to `div.signed-in-flow` (just before the closing `</div>` tag)

```html
<div>
  <label>Key:</label>
  <input id="key-input" />
  <label>Response:</label>
  <input id="key-response-input" />
  <button onClick={saveResponseByKey()}>Save Response By Key</button>
</div>
<!-- Creating a div for visibility-->
<div class="p-2" id="status"></div>
<div>
  <label>Key:</label>
  <input id="key-query-input" />
  <button onClick={fetchResponseByKey()}>Fetch Response By Key</button>
</div>
<hr>
<!-- Creating a div to show the response-->
<div class="p-2 bg-success text-white" id="response-by-key"></div>
```

**Back end**

> In the file `src/main.js`
> - We appended the following JavaScript to the bottom of the file

```ts
async function saveResponseByKey(){
  let key = document.getElementById("key-input").value
  let response = document.getElementById("key-response-input").value
  let status = document.getElementById("status")
  await contract.setResponseByKey({ key: key, apiResponse: response })
  status.innerText = "api response saved"
  setTimeout(() => status.innerText = "", 1500)
}

async function fetchResponseByKey(){
  let uid = document.getElementById("key-query-input").value
  let response = await contract.getResponseByKey({ key: uid })
  document.getElementById("response-by-key").innerText = response
}
```

## Step 4: Understanding how our Oracle implementation will work

You've successfully injected some external data into the blockchain and connected your smart contract to the front end. Let's now dive into some of the more advanced concepts.

Ultimately we want to build an Oracle that can query any endpoint we designate. It should grab the data we specify from the API response, and save that to the blockchain with some unique identifier (UID).

Our Oracle will be made up of two parts. An Oracle Contract which lives on chain, and an Oracle Service which lives off chain.

### Oracle Requirements

The Oracle Contract has functions:

* `setOracleQueryParams` which saves an API endpoint, payload, and UID to the blockchain
* `getOracleQueryParams` which returns the api params that was saved to the blockchain
* `setResponseByKey` which saves the UID and corresponding data to the blockchain

The Oracle Service has the function `fetchOracleResponseAndSave` which:

* gets the API Params from the Oracle Contract
* makes the call to the API endpoint
* selects the appropriate data according to some key string (e.g. bpi.usd.rate)
* saves the data with the corresponding UID

### Oracle Flow

So what does the full flow look like?

First we save the API params (endpoint, payload, and UID) by calling the `setOracleQueryParams` function on the Oracle Contract.

The Oracle Service then fetches the API params by calling `fetchOracleQueryParams`.

With the specifics in hand, the Oracle Service calls the endpoint, selects the appropriate data from the API response, and saves it to the blockchain with the UID provided `fetchOracleResponseAndSave`.

Now the smart contract can query the blockchain using the UID, and retrieve the data necessary to run its logic.

![oracle flow](/docs/assets/oracle-flow.gif)

For now we won't handle the setting of multiple API params (i.e. only one endpoint can be queried at a time and saving a new endpoint will replace the old one). Nevertheless, we might go over this in a later tutorial, or you could try implementing this yourself as a bonus.

## Step 5: Build the Oracle Contract

We need to define two new functions `setOracleQueryParams`, and `getOracleQueryParams`. These functions should save the api parameters to the blockchain, and retrieve them.

We've saved strings to the blockchain before, but rather than saving these params as three separate strings (uid, url, payload) let's save them as one large object. Let's learn to save and retrieve more complex data types.

The first thing we want to do is define a new datatype. Let's call it `OracleQueryParams`. It's an object with three properties: uid, url, and payload - all of which are strings

Let's create a new file `assembly/model.ts`.

To do so, right click the directory `assembly` and click `new file`. Select the filetype `typescript` and name it `model.ts`. Now insert the following.

> In the file `assembly/model.ts`
> - Delete and replace the **entire contents of the file** with the code below

```ts
//@nearfile
export class OracleQueryParams {
  uid: string;
  url: string;
  payload: string;
}
```

*The single line comment `//@nearfile` is **necessary as the first line** as part of our build process.*


Now that we've defined our type OracleQueryParams, let's import that type so we can use it when writing our contract functions.

> In the file `assembly/main.ts`
> - Add the following line of code near the top of the file after any other imports

```ts
import { OracleQueryParams } from "./model";
```

> Also in the same file `assembly/main.ts`
> - Append the code below to the end of the file

```ts
export function setOracleQueryParams(uid: string, url: string, payload: string): void {

  let oracleQueryParams = new OracleQueryParams()
  oracleQueryParams.uid = uid
  oracleQueryParams.url = url
  oracleQueryParams.payload = payload

  storage.setBytes("oracleQueryParams", oracleQueryParams.encode())
}

export function getOracleQueryParams(): OracleQueryParams {
  return decode<OracleQueryParams>(storage.getBytes("oracleQueryParams"));
}
```

To save an object to the blockchain, all we need to do is use the `setBytes` function and call the `.encode()` method. To retrieve the object, we use the `getBytes` function and typecast the decoded results. In this case we typecast the results to OracleQueryParams by calling `decode<OracleQueryParams>()`.

<blockquote class="info">
<strong>did you know?</strong><br><br>

If you're hungry for more examples about how to read and write data using AssemblyScript on the NEAR platform, have a look at the [tests for `near-runtime-ts`](https://github.com/nearprotocol/near-runtime-ts/tree/master/tests/assembly).  You'll find hundreds of examples there.

</blockquote>

Now let's code up the front end.

> In the file `src/index.html`
> - Replace the entire contents of `div.signed-in-flow` with the code below

```html
<h3>Hi, <i id="account-id"></i>! </h3>
<button id="sign-out-button" class="btn btn-danger btn-lg">Sign-out</button>
<hr>
<!-- we're pre-setting the value fields to simplify the call, but you could change these values to whatever you'd like -->
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">UID</span>
  </div>
  <input type="text" class="form-control" id="uid" value="btc-price" >
</div>

<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">URL</span>
  </div>
  <input type="text" class="form-control" id="url" value="https://api.coindesk.com/v1/bpi/currentprice/btc.json">
</div>

<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">Payload</span>
  </div>
  <input type="text" class="form-control" id="payload" value="bpi.USD.rate">
</div>

<button class="btn btn-primary btn-large" onClick={saveOracleQueryParams()}>Save API Params to Blockchain</button>

<!-- Creating a div for visibility-->
<div class="p-2 bg-success text-white" id="status"></div>
```

As our last steps, let's surface our contract functions to our JavaScript context. We also need to create the helper function `saveOracleQueryParams` which connects our form with the `setOracleQueryParams` function on our Oracle contract.

> In the file `src/main.js`
> - Update the `view` and `change` method collections with our new contract methods

```js
window.contract = await near.loadContract(nearConfig.contractName, {
  // find the line below and change it to match
  viewMethods: ["getResponse", "getResponseByKey", "getOracleQueryParams"],
  // find the line below and change it to match
  changeMethods: ["setResponse", "setResponseByKey", "setOracleQueryParams"],
  sender: window.accountId
});
```

> Also in the same file `src/main.js`
> - Append the code below to the bottom of the file

```js
async function saveOracleQueryParams() {
  let url = document.getElementById('url').value
  let uid = document.getElementById('uid').value
  let payload = document.getElementById('payload').value
  let status = document.getElementById("status")
  // logging for visibility
  console.log('sending Params to the blockchain')
  status.innerText = "sending Params to the blockchain"

  await contract.setOracleQueryParams({ url, uid, payload });
  // logging for visibility
  console.log('Params saved to the blockchain')
  status.innerText = "Params saved to the blockchain"
  setTimeout(() => status.innerText = "", 1500)
}
```

Awesome. We now have a front end which allows us to save API params to the blockchain. Easy-peasy right?

Let's check to make sure everything is working by clicking the button `Save API Params to Blockchain`, and then calling `getOracleQueryParams` on the dev console to make sure our params were saved correctly.

> In NEAR Studio
> - Click **Run** to redeploy the application
>
> In the application
> - click **Save API Params to Blockchain**
>
> In the developer console
> - Invoke our new contract method using the following line of code

```js
await contract.getOracleQueryParams()
```

You should see the following output from the blockchain printed to the developer console

```js
{
  uid: "btc-price",
  url: "https://api.coindesk.com/v1/bpi/currentprice/btc.json",
  payload: "bpi.USD.rate"
}
```

## Step 6: Build the Oracle Service

We previously wrote the function `makeApiCallAndSave`. However, we've currently hardcoded the endpoint we want to hit.

Let's rewrite this function to ensure our new Oracle Implementation can:

* retrieve the API params from the blockchain
* call the endpoint specified
* access the nested javascript object with a string key, (e.g. bpi.usd.rate),
* save the response to the blockchain with the corresponding UID.

We could make our Oracle service poll our Oracle Contract at set intervals, but for now, let's just keep our function wired to the button click.

Let's rewrite our `makeApiCallAndSave` function in `src/main.js`.

> In the file `src/main.js`
> - Replace the `makeApiCallAndSave` function with the following implementation

```js
async function makeApiCallAndSave() {
  // getting API Params from the Oracle
  let params = await contract.getOracleQueryParams();
  // logging for visibility
  console.log(params.uid, params.url, params.payload)
  // making the api call
  let response = await fetch(params.url);
  let body = await response.json();
  // stripping the correct value based off of the string key
  let value = params.payload.split('.').reduce((p,c)=>p&&p[c]||"did not find the correct data", body)
  // logging for visibility
  let status = document.getElementById("status")
  console.log('saving value to the blockchain')
  status.innerText = "saving value to the blockchain"
  // saving the response to the blockchain
  await contract.setResponseByKey({ key: params.uid, apiResponse: value });
  status.innerText = "api response saved"
  setTimeout(() => status.innerText = "", 1500)
}
```

If you want to clean up your html, feel free to use this code. You can replace all the html inside `div.after-sign-in` with the following:

```html
<h3>Hi, <i id="account-id"></i>! </h3>
<button id="sign-out-button" class="btn btn-danger btn-lg">Sign-out</button>

<hr>

<h4>Step 1: Save the API Params to the blockchain</h4>
<div>
  <!-- we're pre-setting the value fields to simplify the call, but you could change these values to whatever you'd like -->
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">UID</span>
    </div>
    <input type="text" class="form-control" id="uid" value="btc-price" >
  </div>

  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">URL</span>
    </div>
    <input type="text" class="form-control" id="url" value="https://api.coindesk.com/v1/bpi/currentprice/btc.json">
  </div>

  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">Payload</span>
    </div>
    <input type="text" class="form-control" id="payload" value="bpi.USD.rate">
  </div>

  <button class="btn btn-primary btn-large" onClick={saveOracleQueryParams()}>Save API Params to Blockchain</button>

  <!-- Creating a div for visibility-->
  <div class="p-2" id="status"></div>
</div>

<hr>

<h4>Step 2: get the API Params, call the endpoint, get the data, and save it to the blockchain</h4>
<button onClick={makeApiCallAndSave()}>Make API call and save response to blockchain</button>
<!-- Creating a div for visibility-->
<div class="p-2" id="status"></div>

<hr>

<h4>Step 3: Query the blockchain for the data with the corresponding UID</h4>
<div>
  <label>Key:</label>
  <input id="key-query-input" value="btc-price"/>
  <button onClick={fetchResponseByKey()}>Fetch Response By Key</button>
</div>
<!-- Creating a div to show the response-->
<div class="p-2" id="response-by-key"></div>
```

> Feel free to redeploy and test by following the Oracle Flow described below

## Oracle Flow

**Step 1: Save the API Params to the blockchain**

- UID: btc-price
- URL: [https://api.coindesk.com/v1/bpi/currentprice/btc.json](https://api.coindesk.com/v1/bpi/currentprice/btc.json)
- Payload: bpi.USD.rate

Save API Params to Blockchain

**Step 2: get the API Params, call the endpoint, get the data, and save it to the blockchain**

Make API call and save to blockchain

**Step 3: Query the blockchain for the data with the corresponding UID**

Key: Fetch Response By UID (in this case btc-price)

Let's test it out and see if it works!

* Save the API Params to the blockchain by clicking `Save API Params to Blockchain`
* Click the `Make API call and save response to blockchain` button.
* pass the UID `btc-price` to the `fetchResponseByKey` function + input we coded previously

We should see the price of BTC we got from Coindesk!

**Going further**

Your Oracle should work with any HTTP endpoint that responds to a GET request.  Try the following variations on your own.  There's no need to redeploy, you will just change the values in the application inputs to match the following, then step through the Oracle Flow.

*Variation #1*

- UID: latin
- Endpoint: [https://jsonplaceholder.typicode.com/todos/1](https://jsonplaceholder.typicode.com/todos/1)
- Payload: title

You should get the string `delectus aut autem` when you query by the uid `latin`.

*Variation #2*

- UID: near
- Endpoint: https://rpc.nearprotocol.com/status
- Payload: chain_id

You should get the string `testnet` when you query by the uid `near`.

## Step 7: Create a simple smart contract which uses the inbound data

To wrap up this tutorial, your mission, should you choose to accept it, is to create a simple smart contract that uses the price of bitcoin that we saved to the blockchain.

The pseudo code is simple:

```text
btcPrice = price of btc
if btcPrice >= 5000:
  betOutcome = "Pay Moon Hodler 2000 USD"
else:
  betOutcome = "Pay FUD Hodler 2000 USD"

save betOutcome to blockchain with key of 'betOutcome'
```
Although in this smart contract, we're just saving a string to the blockchain, you could imagine that we could instead replace that with logic which pays out a specific wallet address.

As a final touch, build out a "finalize outcome" button on the front end that kicks off this logic, and then display the outcome on the screen.

> Now you try it.
> - Implement a new function in AssemblyScript on the smart contract that provides the expected behavior of the pseudo code above.  (hint: use the following signature)  \
> `export function finalizeBet(): void { /* your implementation */ }`
> - Surface the new contract method in JavaScript as before (hint: it's a `change` method)
> - Implement a new function in JavaScript in that invokes `contract.finalizeBet()` as per the pseudo code above
> - Add a button to invoke the method (and optionally render the result to the console or div)

Hints:
- string --> number `I32.parseInt(numberAsText)`
- number --> string `someNumber.toString()`
- at the time of writing, one should avoid using `i32()` and friends for typecasting strings to numbers


How did it go?

You can see how we did it here...

> In the file `assembly/main.ts`
> - We appended the code below to the bottom of the file

```ts
export function finalizeBet(): void {
  let price = storage.getString("btc-price");

  // expecting price as string in the format #,###.####
  price = price.split(',').join('').split('.')[0];

  if (price) {
    let btcPrice: i32 = I32.parseInt(price);
    let overUnderPrice: i32 = 6000;
    let outcome: string;

    if (btcPrice > overUnderPrice) {
      outcome = "BTC price is " + btcPrice.toString() + " - Pay Moon Hodler 2000 USD"
    } else {
      outcome = "BTC price is " + btcPrice.toString() + " - Pay FUD Hodler 2000 USD"
    }

    storage.setString("betOutcome", outcome)

  } else {
    storage.setString("betOutcome", "btc price is undefined")
  }
}
```

> In the file `src/main.js`
> - We surfaced the new contract method `finalizeBet` to our JavaScript contract

```js
window.contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ["getResponse", "getResponseByKey", "getOracleQueryParams"],
  // find the line below and change it to match
  changeMethods: ["setResponse", "setResponseByKey", "setOracleQueryParams", "finalizeBet"],
  sender: window.accountId
});
```

> Also in the same file `src/main.js`
> - We appended the code below to the bottom of the file

```js
async function finalizeBet() {
  await contract.finalizeBet()
  let outcome = await contract.getResponseByKey({ key: "betOutcome" })
  console.log(outcome)
  document.getElementById("betOutcome").innerText = outcome
}
```

> In the file `src/index.html`
> - We appended the code below just before the closing tag of `div.after-sign-in`

```html
<button onClick={finalizeBet()}>Run Wager Smart Contract Code + Print Outcome</button>
<div class="container" style="background-color:blue; color:white;">
  The Bet Outcome is:
  <div id="betOutcome"></div>
</div>
```

## Conclusion

Great Job! If you want to see the outcome of this tutorial working on a live demo, you can check it out [here](https://app.near.ai/app/jdvw47f9j/).

Of course our Oracle implementation is lacking in various aspects. So feel free to implement your own improvements, or use your new found skills to build something completely different. If you'd like to contribute to this tutorial, open up a pull request!

If you run into any problems, want to share some of the cool things you've built, or just want to get more involved with the Near community, join our [discord channel](http://near.chat). Everyone is super friendly. (Really!)

**Other Tutorials + Topics to cover**

* Writing Tests
* Working with Wallets
* Running Locally
* Debugging with the blockchain explorer
* Security / Privacy
* Factory Contracts
