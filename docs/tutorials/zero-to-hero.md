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

* Javascript experience
* Basic familiarity with [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) will be helpful

#### Disclaimer

The following example and code has been greatly simplified for ease-of-understanding. There are obvious vulnerabilities in our Oracle implementation, and is no way suitable for production environments.

This tutorial will be broken into bite size chunks, each focused on teaching you a few core concepts. The focus will be on the actual logic + interacting with the blockchain, so we'll ignore styling and css.

Let's get started!

## Step 0 - Get familiar with the Near IDE + the basic Layout of a Near Project

Go to [**The Studio**](https://studio.nearprotocol.com/) and start a new project by clicking "New" on the top nav, selecting "Counter Smart Contract" and then clicking "Create". Check out our [NEAR Project File Structure](../quick-start/file-structure.md) for a more in-depth look at the file structure.

Let's look over the directory and introduce you to the main files you'll normally be interacting with:

`assembly/main.ts` - This is where the smart contract code goes. Smart contracts are written in Typescript.

`assembly/near.ts` - If you're curious to learn how some of the internal functions work, look over this file. Most importantly, it defines the functions for reading + writing to global storage, as well as the context / information available to you for contract execution \(e.g. transaction sender, etc.\)

`assembly/model.ts` - Define the types you want to use in your smart contract here. _This file doesn't exist yet, but we'll create it later!_

`src/index.html` - Basic layout for your front end

`src/main.js` - Wire the logic for your app here

`src/test.js` - For you to write tests

To test your code, hit "Test". To deploy the app, hit "Run". \(Pretty self explanatory huh?\)

## Step 1: Store + retrieve information from the blockchain

Now that you're familiar with the Near IDE and the various files in your project, let's get started coding!

The first thing that our Oracle Contract must be able to do is **write + read to the blockchain**. This way our contract can save external data onto the blockchain for other contracts to interact with.

In the counter example you can see the code for storing and retrieving numbers. Let's look at how to set and retrive strings.

Navigate to the `assembly/near.ts` file to review the `setString` and `getString` functions. \(In later steps we'll show you how to handle more complicated data types.\)

It looks like **data is stored in a simple key-value store**. To save a string, we only need to pass a key with the string we want to save. For now let's use the string `'response'` as our key.

### Writing Smart Contract functions

Let's implement the setResponse and getResponse function now in `assembly/main.ts`.

```typescript
// assembly/main.ts
...
// --- contract code goes below
export function setResponse(apiResponse: string): void {
  storage.setString("response", apiResponse);
  near.log("Response is now: " + apiResponse);
}

export function getResponse(): string {
  return storage.getString("response");
}
```

You can replace the existing functions, we won't need them.

### Wiring the functions

Great! Now that we've implemented these functions, let's ensure they're available in the window object. We won't need to do this in the future, but for now we have to specify it manually.

Navigate to `src/main.js` and replace the viewMethods and changeMethods with the ones we just wrote.

```javascript
// src/main.js
async function connect() {
  ...
  window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ["getResponse"],
    changeMethods: ["setResponse"],
    sender: window.walletAccount.getAccountId()
  });
}
```

### Cleaning up the front end

Now let's clean up the front end. Navigate to `src/index.html` and let's replace the html in the `div.after-sign-in`.

```markup
<!-- src/index.html -->
...
<h1>Set and get a response from the blockchain</h1>
<p>Run these commands in the dev console to test it out!</p>
<p>To set a response:</p>
<pre>
    await contract.setResponse({ apiResponse: 'string' });
</pre>
<p>To get the response:</p>
<pre>
    await contract.getResponse();
</pre>
```

### Calling the functions

Let's try calling these functions! Open up the dev console, and try running the above commands. Easy as pie right?

**An important caveat:** Contract functions don't accept positional parameters. Instead, you pass a json to call the function. So instead of calling `await contract.setResponse('string');` you must call `await contract.setResponse({newResponse: 'string'});`

### Your turn:

Now it's your turn. Try creating two new methods: `setResponseByKey`, and `getResponseByKey`, which accepts a `key` parameter as well \(i.e. you should be able to save and retrieve a string by key\).

How did it go? Here's our solution

```typescript
// assembly/main.ts
...
export function setResponseByKey(key: string, newResponse: string): void {
  storage.setString(key, newResponse);
}

export function getResponseByKey(key: string): string {
  return storage.getString(key);
}
```

Don't forget to wire the functions in the main.js file.

```javascript
// src/main.js
...
window.contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ["getResponse", "getResponseByKey"],
  changeMethods: ["setResponse", "setResponseByKey"],
  sender: window.walletAccount.getAccountId()
});
```

**Remember: When you call the function make sure to pass in a json**  
`await contract.setResponseByKey({ key: 'foo', newResponse: 'bar' });
await contract.getResponseByKey({ key: 'foo' });`

## Step 2: Inject external API information into the blockchain

Now that we can write and read to the blockchain, let's call an API endpoint and save the response to the blockchain.

Our code will lie in the `src/main.js` as the call needs to be made off chain. We'll then use our setResponse method we created in Step 1 to save the data to the blockchain.

```javascript
// src/main.js
...
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
  console.log(`${apiResponse} is the API response`);
}
```

Now let's pop open the dev console and run the function `makeApiCallAndSave()`. This should save the price of Bitcoin to the blockchain.

To check if everything worked successfully, we can run the `await contract.getResponse();` function to retrieve the data we saved to the blockchain.

## Step 3: Building + wiring the front end

Let's now wire these functions to the front end.

It would be great if we could create two buttons:

* the first button should get the price of btc and save it to the blockchain
* the second button should display the saved price of btc to the front end 

### Building the front end

Navigate to `src/index.html` and let's create these inputs. You can replace the code inside the `div.after-sign-in`.

```markup
<!-- src/index.html -->
...
<button onClick={makeApiCallAndSave()}>Make API call and save response to blockchain</button>
<button onClick={fetchAndDisplayResponse()}>Retrieve response and display</button>
<!--Creating a div to insert our API response to-->
<div id="response"></div>
```

Now that we've created our front end elements, we need to code the functions we've set to be called `onClick`.

### Wiring up our front end elements

The function `makeApiCallAndSave` has already been defined, but we need to write the function `fetchAndDisplayResponse`. Navigate to `src/main.js` and let's do that now.

```javascript
// src/main.js
...
async function fetchAndDisplayResponse() {
  // getting the response from the blockchain
  let apiResponse = await contract.getResponse();
  // logging on the console for some feedback
  console.log(apiResponse);
  // Displaying the message once we have it.
  document.getElementById('response').innerText = apiResponse;
}
```

Now clicking the "Make API Call" button will make the api call and save the response to the blockchain. \(You can keep the dev console open to make sure it's happening\).

Clicking the "Get Response And Display" button will get the response from the blockchain, and display it to the front end.

Great work! You've now built an end-to-end application on the Near Protocol. Piece of cake, right?

### Your turn:

Try wiring the methods `setResponseByKey`, and `getResponseByKey`, to the front end.

The front end should allow for the following functionality:

* The user should be able to save a key and its corresponding response to the blockchain
* The user should be able to input a key and retrieve the corresponding response from the blockchain

How did it go? Here's our solution Front end:

Front end: `src/index.html`

```markup
<!-- src/index.html -->
...
<div>
  <label>Key:</label>
  <input id="key-input" />
  <label>Response:</label>
  <input id="key-response-input" />
  <button onClick={saveResponseByKey()}>Save Response By Key</button>
</div>
<!-- Creating a div for visibility-->
<div id="status"></div>
<div>
  <label>Key:</label>
  <input id="key-query-input" />
  <button onClick={fetchResponseByKey()}>Fetch Response By Key</button>
</div>
<!-- Creating a div to show the response-->
<div id="response-by-key"></div>
```

Back end: `src/main.js`

```typescript
// src/main.js
...
async function saveResponseByKey(){
  let key = document.getElementById("key-input").value
  let response = document.getElementById("key-response-input").value
  let status = document.getElementById("status")
  await contract.setResponseByKey({ key: key, newResponse: response })
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

Ultimately we want to build an Oracle that can query any endpoint we designate. It should grab the data we specify from the API response, and save that to the blockchain with some unique identifier \(UID\).

Our Oracle will be made up of two parts. An Oracle Contract which lives on chain, and an Oracle Service which lives off chain.

### Oracle Requirements

The Oracle Contract has functions:

* `setOracleQueryParams` which saves an API endpoint, callback, and UID to the blockchain
* `getOracleQueryParams` which returns the api params that was saved to the blockchain
* `setResponseByKey` which saves the UID and corresponding data to the blockchain

The Oracle Service has the function `fetchOracleResponseAndSave` which:

* gets the API Params from the Oracle Contract
* makes the call to the API endpoint
* selects the appropriate data according to some key string \(e.g. bpi.usd.rate\)
* saves the data with the corresponding UID

### Oracle Flow

So what does the full flow look like?

First we save the API params \(endpoint, callback, and UID\) by calling the `setOracleQueryParams` function on the Oracle Contract.

The Oracle Service then fetches the API params by calling `fetchOracleQueryParams`.

With the specifics in hand, the Oracle Service calls the endpoint, selects the appropriate data from the API response, and saves it to the blockchain with the UID provided `fetchOracleResponseAndSave`.

Now the smart contract can query the blockchain using the UID, and retrieve the data necessary to run its logic.

![oracle flow](https://i.imgur.com/8gZhSXA.gif)

For now we won't handle the setting of multiple API params \(i.e. only one endpoint can be queried at a time and saving a new endpoint will replace the old one\). Nevertheless, we might go over this in a later tutorial, or you could try implementing this yourself as a bonus.

## Step 5: Build the Oracle Contract

We need to define two new functions `setOracleQueryParams`, and `getOracleQueryParams`. These functions should save the api parameters to the blockchain, and retrieve them.

We've saved strings to the blockchain before, but rather than saving these params as three separate strings \(uid, url, callback\) let's save them as one large object. Let's learn to save and retrieve more complex data types.

The first thing we want to do is define a new datatype. Let's call it `OracleQueryParams`. It's an object with three properties: uid, url, and callback - all of which are strings

Let's create a new file `assembly/model.ts`. To do so, right click the directory `assembly` and click `new file`. Select the filetype `typescript` and name it `model.ts`. Now insert the following.

```typescript
// assembly/model.ts
export class OracleQueryParams {
  uid: string;
  url: string;
  callback: string;
}
```

Now that we've defined our type OracleQueryParams, let's import that type so we can use it when writing our contract functions.

Navigate to `assembly/main.ts` and insert the following.

```typescript
// assembly/main.ts
import { OracleQueryParams } from "./model";
...
export function setOracleQueryParams(uid: string, url: string, callback: string): void {

  let oracleQueryParams = new OracleQueryParams()
  oracleQueryParams.uid = uid
  oracleQueryParams.url = url
  oracleQueryParams.callback = callback

  storage.setBytes(`oracleQueryParams`, oracleQueryParams.encode().serialize())
}

export function getOracleQueryParams(): OracleQueryParams {
  return OracleQueryParams.decode(storage.getBytes('oracleQueryParams'))
}
```

To save an object to the blockchain, all we need to do is use the `setBytes` function and call the `.encode().serizialize()` methods. To retrieve the object, we use the `getBytes` function and call the `.decode()` method.

Now I'm sure you're wondering - "wait... where did the `encode`/`decode` functions come from?"

Great question. Our gulpfile actually has a task which binds the `encode`, `decode` functions to our types.

Now let's code up the front end, placing this html within `div.after-sign-in`:

```markup
<!-- src/index.html -->
...
<!-- we're pre-setting the value fields to simplify the call, but you could change these values to whatever you'd like --> 
<label for="uid">UID</label><input id="uid" value="btc-price" />
<label for="url">URL</label><input id="url" value="https://api.coindesk.com/v1/bpi/currentprice/btc.json" />
<label for="callback">Callback</label><input id="callback" value="bpi.USD.rate" />
<button onClick={saveOracleQueryParams()}>Save API Params to Blockchain</button>
```

As our last step, let's create the helper function `saveOracleQueryParams` which connects our form with the `setOracleQueryParams` function on our Oracle contract. Also, don't forget to list our contract functions when we call `load contract`.

```javascript
// src/main.js
...
async function doInitContract() {
  ...
  window.contract = await near.loadContract(nearConfig.contractName, {
      viewMethods: ["getResponse", "getResponseByKey", "getOracleQueryParams"],
      changeMethods: ["setResponse", "setResponseByKey", "setOracleQueryParams"],
      sender: window.walletAccount.getAccountId()
  });
}
...
async function saveOracleQueryParams() {
  let url = document.getElementById('url').value
  let uid = document.getElementById('uid').value
  let callback = document.getElementById('callback').value
  let status = document.getElementById("status")
  // logging for visibility
  console.log('sending Params to the blockchain')
  status.innerText = "sending Params to the blockchain"

  await contract.setOracleQueryParams({ url: url, uid: uid, callback, callback });
  // logging for visibility
  console.log('Params saved to the blockchain')
  status.innerText = "Params saved to the blockchain"
  setTimeout(() => status.innerText = "", 1500)
}
```

Awesome. We now have a front end which allows us to save API params to the blockchain. Easy-peasy right?

Check to make sure everything is working by clicking the button `Save API Params to Blockchain`, and then calling `getOracleQueryParams` on the dev console to make sure our params were saved correctly.

`let params = await contract.getOracleQueryParams()`

## Step 6: Build the Oracle Service

We previously wrote the function `makeApiCallAndSave`. However, we've currently hardcoded the endpoint we want to hit.

Let's rewrite this function to ensure our new Oracle Implementation can:

* retrieve the API params from the blockchain
* call the endpoint specified
* access the nested javascript object with a string key, \(e.g. bpi.usd.rate\), 
* save the response to the blockchain with the corresponding UID.

We could make our Oracle service poll our Oracle Contract at set intervals, but for now, let's just keep our function wired to the button click.

Let's rewrite our `makeApiCallAndSave` function in `src/main.js`.

```javascript
// src/main.js
...
async function makeApiCallAndSave() {
  // getting API Params from the Oracle
  let params = await contract.getOracleQueryParams();
  // logging for visibility
  console.log(params.uid, params.url, params.callback)
  // making the api call
  let response = await fetch(params.url);
  let body = await response.json();
  // stripping the correct value based off of the string key
  let value = params.callback.split('.').reduce((p,c)=>p&&p[c]||"did not find the correct data", body)
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

```markup
...
<h4>Step 1: Save the API Params to the blockchain</h4>
<div>
  <!-- we're pre-setting the value fields to simplify the call, but you could change these values to whatever you'd like --> 
  <label for="uid">UID</label><input id="uid" value="btc-price" />
  <label for="url">URL</label><input id="url" value="https://api.coindesk.com/v1/bpi/currentprice/btc.json" />
  <label for="callback">Callback</label><input id="callback" value="bpi.USD.rate" />
  <button onClick={saveOracleQueryParams()}>Save API Params to Blockchain</button>
</div>
<h4>Step 2: get the API Params, call the endpoint, get the data, and save it to the blockchain</h4>
<button onClick={makeApiCallAndSave()}>Make API call and save response to blockchain</button>
<!-- Creating a div for visibility-->
<div id="status"></div>
<h4>Step 3: Query the blockchain for the data with the corresponding UID</h4>
<div>
  <label>Key:</label>
  <input id="key-query-input" />
  <button onClick={fetchResponseByKey()}>Fetch Response By Key</button>
</div>
<!-- Creating a div to show the response-->
<div id="response-by-key"></div>
```

## Oracle Flow

**Step 1: Save the API Params to the blockchain**

UID: btc-price  
URL: [https://api.coindesk.com/v1/bpi/currentprice/btc.json](https://api.coindesk.com/v1/bpi/currentprice/btc.json)  
Callback: bpi.USD.rate  
Save API Params to Blockchain

**Step 2: get the API Params, call the endpoint, get the data, and save it to the blockchain**

Make API call and save to blockchain

**Step 3: Query the blockchain for the data with the corresponding UID**

Key: Fetch Response By UID \(in this case btc-price\)

Let's test it out and see if it works!

* Save the API Params to the blockchain by clicking `Save API Params to Blockchain`
* Click the `Make API call and save response to blockchain` button.
* pass the UID `btc-price` to the `fetchResponseByKey` function + input we coded previously

We should see the price of BTC we got from Coindesk!

Your Oracle should work with any simple 'get' endpoint. Try it with these params:

UID: latin  
Endpoint: [https://jsonplaceholder.typicode.com/todos/1](https://jsonplaceholder.typicode.com/todos/1)  
Callback: title

You should get the string `delectus aut autem` when you query by the uid `latin`.

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

How did it go? You can see how we did it here...

`assembly/main.ts`

```typescript
export function finalizeBet(): void {
  let price = storage.getString("btc-price")
  if (price) {
    let btcPrice: f64 = parseFloat(price.split(',').join(''));
    let outcome: string;
    if (btcPrice >= 5000) {
      outcome = "BTC price is " + btcPrice.toString() + "- Pay Moon Hodler 2000 USD"
    } else {
      outcome = "BTC price is " + btcPrice.toString() + "- Pay FUD Hodler 2000 USD"
    }
    storage.setString("betOutcome", outcome)
  } else {
    storage.setString("betOutcome", "btc price is undefined")    
  }
}
```

`src/main.js`

```javascript
...
async function doInitContract() {
  ...
  window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ["getResponse", "getResponseByKey", "getOracleQueryParams"],
    changeMethods: ["setResponse", "setResponseByKey", "setOracleQueryParams", "finalizeBet"],
    sender: window.walletAccount.getAccountId()
  });
}
...
  async function finalizeBet() {
    await contract.finalizeBet()
    let outcome = await contract.getResponseByKey({ key: "betOutcome" })
    console.log(outcome)
    document.getElementById("betOutcome").innerText = outcome
  }
```

`src/index.html`

```markup
    <button onClick={finalizeBet()}>Run Wager Smart Contract Code + Print Outcome</button>
    <div class="container" style="background-color:blue; color:white;">
      The Bet Outcome is: 
      <div id="betOutcome">
      </div>
    </div>
```

## Conclusion

Great Job! If you want to see the above code with a more polished front end, you can check it out [here](https://app.near.ai/app/mk79nudvm).

Of course our Oracle implementation is lacking in various aspects. So feel free to implement your own improvements, or use your new found skills to build something completely different. If you'd like to contribute to this tutorial, open up a pull request!

If you run into any problems, want to share some of the cool things you've built, or just want to get more involved with the Near community, join our [discord channel](https://discordapp.com/invite/gBtUFKR). Everyone is super friendly. \(Really!\)

**Other Tutorials + Topics to cover**

* Writing Tests
* Working with Wallets
* Running Locally
* Debugging with the blockchain explorer
* Security / Privacy
* Factory Contracts

