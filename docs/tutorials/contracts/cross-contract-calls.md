---
id: cross-contract-calls
title: Guide to Cross-contract calls
sidebar_label: AssemblyScript - Example
---

<blockquote class="info">
This tutorial demonstrates an introduction to cross-contract calls in AssemblyScript. If you'd like to dig deeper into this subject, please <a href="https://github.com/near-examples/cross-contract-calls" target="_blank">see this example</a>.
</blockquote>

## Introduction

At some point you might want to call functions on existing contracts. This is called a _cross-contract call_. There are plenty of reasons to do this:

* You want to leverage a code library that others have written and released
* You want your app to integrate with other contracts that have some transferable state (For instance, a game that has transferable inventory)
* You want to build a bot that interacts with existing contracts in some way

Cross-contract calls are really similar to calling an external API in the web 2.0 context.

In this tutorial we will build a very simple example to get you up and running with cross-contract calls.

## Description

We're going to create two simple contracts:

* `Calculator` this contract will have the calculation that we want to write for anyone to call
* `Calculator Caller` this contract \(no surprise\) will call the calculation available in the other contract

For this example, we'll only implement the `add` functionality, but already we've got a problem! The accounting department at Super Evil Mega Corp sent all these numbers as strings. To make things worse, we don't know how long these strings are going to be. Why this is a problem: the largest integer that JavaScript can deal with is [9007199254740991](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). To help out everyone who wants to add long numbers together, we're going to deploy a contract that people can incorporate into their own calculators.

### Let's get started!

## Step 1 - Create a new Token Contract Project in Gitpod

> In a new browser tab or window
> - Open a new Token Contract Project in [Gitpod](https://gitpod.io/#https://github.com/near-examples/token-contract-as)

When this opens in GitPod, the code will generate a unique NEAR account for this project and build then deploy the template files. You can take a look at what we're starting with by clicking "Open Browser" to see the token example running.

This sample project has a token smart contract and also some JavaScript tests that invoke smart contract functions. You can try running these tests right away to see the code interacting with the blockchain.

> In Gitpod
> - click **Terminal** » **New Terminal** 
>
> In the new tab that opens at the bottom of Gitpod
> - type `yarn jest` in the command prompt

Once finished, the tests running in your terminal will appear like this:

![Default Token Contract Test ](/docs/assets/default-token-contract-test.png)

Note that `test-account-XXXXXXXXX_tTIMESTAMP-XXXXXXX` here is an automatically generated NEAR account for this particular project. Don't be distracted by these details, just compare the developer log output with the statements in the file `src/test.js`.

<blockquote class="warning">
<strong>heads up</strong><br><br>

We are not going to keep any of the code from this template. It's just there as a starting point.

</blockquote>

## Step 2 - Write the `Calculator` contract

We're interested in writing only one function for this example. A function that takes in two strings `a` and `b` and returns the result of adding them together as a string.

> In the file `assembly/main.ts`
> - Replace the **entire contents of the file** with the code below  \
>   *(note: this code implements addition of two large numbers as we do on paper)*

```ts
import { context, storage, logging } from "near-sdk-as";

export function addLongNumbers(a: string, b: string): string {
  // sends logs to the terminal of the contract placing call and the NEAR Explorer
  logging.log("-------------------------------------------------------")
  logging.log('Contract Called : ' + context.contractName)
  logging.log('Contract Signer : ' + context.predecessor)
  logging.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - -")
  logging.log("Caculating : " + a + " + " + b)
  // Similar to long addition by hand, we start with the least significant digits first
  const aReversed = a.split("").reverse();
  const bReversed = b.split("").reverse();

  // We initialize our resultant variable to be one more than the largest number's length
  const maxLength = max(a.length, b.length);
  let resultArray = new Array<String | null>(maxLength + 1);
  let result = "";
  let carry = 0;

  // Loop through each digit adding the value to the other number, if it exists
  for (let i = 0; i < maxLength; ++i) {
    let aDigit = (i < a.length) ? U32.parseInt(aReversed[i]) : 0;
    let bDigit = (i < b.length) ? U32.parseInt(bReversed[i]) : 0;
    let digitSum = aDigit + bDigit + carry;

    // Keep track of the carry amount
    if (digitSum >= 10) {
      carry = 1;
      digitSum -= 10;
    } else {
      carry = 0;
    }

    resultArray[i] = digitSum.toString();
  }

  // If the final addition has a carry, add it to the extra slot we initialized for it
  if (carry > 0) {
    resultArray[maxLength] = carry.toString();
  }

  // Reverse again and combine the values for the final result
  let reversedResultArray = resultArray.reverse();

  // More terminal / NEAR Explorer logs
  logging.log(">>> RESULT : " + reversedResultArray.join(""))
  logging.log("-------------------------------------------------------")
  return reversedResultArray.join("");
}

```

Now that we've modified files in our assembly folder we will need to re-deploy the contract. 

> In your terminal windows 
> - Select the first terminal tab on the left that has localhost server running
> - Hold `CTRL + C` to stop the server and display the command prompt
> - Type `yarn dev` to rebuild and redeploy your modified contract

That's it for our `Calculator` for now.

## Step 3 - Write some tests for the contract

It's a good habit to test code as soon as we've finished writing it, so that's exactly what we're going to do.

> In the file `src/test.js`
> - Replace **everything in the file** with the code below
>
> After that is complete
> - Click **File** » **Save All** to save your changes

```js
describe("Calculator", function() {
  let near;
  let contract;
  let alice;
  let bob = "bob.near";
  let eve = "eve.near";
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  // Common setup below
  beforeAll(async function () {
    near = await nearAPI.connect(nearConfig);
    accountId = nearConfig.contractName;
    contract = await near.loadContract(accountId, {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: [],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["addLongNumbers"],
      sender: nearConfig.contractName
    });
    window.near = near;
  });

  // Multiple tests can be described below. Search Jasmine JS for documentation.
  describe("simple", function() {
    beforeAll(async function() {
    // There can be some common setup for each test.
    });

    it("adds one digit", async function() {
      const params = {
        a: "1",
        b: "3"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("4");
    });

    it("should work with first string longer", async function() {
      const params = {
        a: "10",
        b: "3"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("13");
    });

    it("should work with second string longer", async function() {
      const params = {
        a: "4",
        b: "15"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("19");
    });

    it("should work with carry", async function() {
      const params = {
        a: "19",
        b: "22"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("41");
    });

    it("should work when result is one digit longer than largest input", async function() {
      const params = {
        a: "91",
        b: "22"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("113");
    });

    it("should work with really large input", async function() {
      const params = {
        a: "29348756231984613809465238956138947136497182364018246710289467102946710289467198046",
        b: "1"
      };
      const result = await contract.addLongNumbers(params);
      expect(result).toBe("29348756231984613809465238956138947136497182364018246710289467102946710289467198047");
    });
  });
});

```
> Now lets run your new tests!
> - type `yarn jest` in the command prompt

Once finished, the completed test in your terminal will appear like this:

![Jest tests running for Calculator Contract](/docs/assets/jest-tests-for-calculator-contract.png)

<blockquote class="warning">
<strong>heads up</strong><br><br>
Just make a mental note that the in the logs, "Contract Called" and the "Contract Signer" are the same. This will be important later.
</blockquote>

Normally, we would create a UI at this point, but since we're calling this from elsewhere, let's move on to the second contract.

## Step 4 - Create a new contract for `Calculator Caller`

<blockquote class="warning">
<strong>heads up</strong><br><br>

Keep the tab open that you've been working on, you're going to need the ID of the contract you just created later.

The rest of the ID is the prefix "dev-" to be something like `dev-159372XXXX-XXXXXXX`.  In fact the ID of the contract is just the NEAR account created for the contract by Gitpod automatically.

You can read more about [accounts on the NEAR platform here](/docs/concepts/account).

</blockquote>

So let's make another smart contract.  Following the same steps as before in a _new_ tab or window...

> In a new browser tab or window
> - Open another new Token Contract Project in [Gitpod](https://gitpod.io/#https://github.com/near-examples/token-contract-as)
> - You should see a **Create Fresh Workspace** box at the top of your window
> - click **Create** in the upper right hand corner

![Create fresh workspace](/docs/assets/gitpod-create-fresh-workspace.png)


We're doing this because we need to create an entirely separate contract deployed at a different address to demonstrate the capabilities of cross-contract calls.

## Step 5 - Write the `Calculator Caller` code

We want to implement code that actually passes the numbers over to the contract we're calling. Here we're going to do this by creating a single `callAddNumbers` function and add the piping which allows us to make this function work.

We're going to need a few things to make this happen:

- To send two pieces of data (the two numbers we want to add) from one contract to another, we'll create a new *model* for our contract to use.  `AddArgs` will be a class that we'll use to encode the arguments we're sending.
- Cross-contract calls are always asynchronous so, to capture the return value from the other contract, we'll take advantage of the native `ContractPromise` class from `near-sdk-as`.
- To `CalculatorAPI`, a class we'll create that will send the numbers we want to add to the other contract through an `add` method

- `callAddNumbers`, function which will call the `CalculatorAPI` method we create to add the numbers

Let's start by creating the model first.

> Create a new file `assembly/model.ts`
> - Click on the `assembly` folder on the left-hand side in your explorer
> - Then click **File** » **New File**
> - Enter `model.ts` and then click **OK**
> - **Copy/Paste** the code below into this new file
> - Click **File** » **Save**

```ts
@nearBindgen
export class AddArgs {
  a: string;
  b: string;
}
```

This will allow us to encode arguments to send between contracts as a single value.

Next we'll create the API that we can use to call the contract we've previously deployed.

> In the file `assembly/main.ts`
> - Replace the **entire contents of the file** with the following code

```ts
import { context, storage, logging, ContractPromise } from "near-sdk-as";
import { AddArgs } from "./model";
```

Notice that we're importing `AddArgs` from the model we just created using the syntax `"./model"` AND we're importing `ContractPromise` from `near-sdk-as`.

Here, we're creating a single method `add` that takes the strings we want to add and returns a `ContractPromise`.

We're also using the `AddArgs` model we created to package the strings we want to send to the other contract. When we call `args.encode()` it's a lot like something like `JSON.stringify(args)` to allow us to send this data.

> In the file `assembly/main.ts`
> - Append the following code to the file
>
> *In order to create this `ContractPromise`, we need to know:*
> - The ID of the contract that we created before. **You'll need to replace this with your own.**
> - Whatever function we're trying to call on the `Calculator` contract.

```ts
const OTHER_CONTRACT = "dev-REPLACE_THIS_IDENTIFIER";

export class CalculatorApi {
  add(a: string, b: string): ContractPromise {
    let args: AddArgs = { a, b };
    let promise = ContractPromise.create(OTHER_CONTRACT, "addLongNumbers", args.encode(), 100000000000000);
    logging.log("OTHER_CONTRACT: " + "(" + OTHER_CONTRACT + ")")
    return promise;
  }
}
```

*(For more info on making cross-contract calls using `ContractPromise`, check out [ContractPromise](https://near.github.io/near-sdk-as/classes/_sdk_core_assembly_contract_.contractpromise.html) and [ContractPromiseResult](https://near.github.io/near-sdk-as/classes/_sdk_core_assembly_contract_.contractpromiseresult.html)*

<blockquote class="warning">
<strong>heads up</strong><br><br>

**As a reminder**, using the previous contract (the tab you kept open earlier), find the ID of the contract.  You will use this to replace `dev-REPLACE_THIS_IDENTIFIER`.

You can find your contract ID stored in `neardev/dev-account.env`. In addition, you will see your contract ID displayed in the first terminal window with the running server. Towards the bottom there will be a line that stats: "Done deploying to dev-1594333XXXXXX-XXXXXXX". 

</blockquote>

Next, we're going to use the `CalculatorApi` we just created.

> In the file `assembly/main.ts`
> - Append the following code to the file

```ts
export function calculate(a: string , b: string): void {
  let calculator = new CalculatorApi();
  let promise = calculator.add(a, b);
  promise.returnAsResult();
}
```

You may notice this function returns `void`, which is a bit confusing because the contract is returning a promise. This is because it's calling a function elsewhere and the compiler thinks it's void.

(In future releases this will be changed.)

>Now save your changes and redeploy the contract
>
> - Click **File** » **Save**
>
>Then navigate to your terminal windows 
> - Select the first terminal tab on the left that has localhost server running
> - Hold `CTRL + C` to stop the server and display the command prompt
> - Type `yarn dev` to rebuild and redeploy your modified contract 
>

## Step 6 - More Tests!

Let's make sure things are working as expected.

> In the file `src/test.js`
> - Replace the **entire contents of the file** with the code below

```ts
const getConfig = require('./config');
let nearConfig = getConfig("development");
require('dotenv').config({ path: '/workspace/token-contract-as/neardev/dev-account.env' })

describe("CalculatorAPI", function() {
  let near;
  let contract;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  // Common setup below
  beforeAll(async function () {
    near = await nearAPI.connect({
    deps: {
     keyStore: new nearAPI.keyStores.UnencryptedFileSystemKeyStore('../../../home/gitpod/.near-credentials')
    },
    ...nearConfig
  })
    accountId = process.env.CONTRACT_NAME;
    contract = await near.loadContract(accountId, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: [],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ["calculate", "addLongNumbers"],
    sender: process.env.CONTRACT_NAME
    });
  });

  // Multiple tests can be described below. Search Jasmine JS for documentation.
  describe("simple", function() {
    beforeAll(async function() {
    // There can be some common setup for each test.
    });

    it("add one digit", async function() {
      const params = {
        a: "1",
        b: "99"
      };

      const result = await contract.calculate(params);
      expect(result).toBe("100");
    });
  });
});

```

> After that is complete
> - Click **File** » **Save All** to save your changes

Now let's test it out!

> In Gitpod
> - click **Terminal** » **New Terminal** 
>
> In the new tab that opens at the bottom of Gitpod
> - type `yarn jest` in the command prompt

You should see a successful test that looks something like this: 

![Cross contract call Jest test](/docs/assets/cross-contract-call-jest-test.png)


<blockquote class="warning">
<strong>heads up</strong><br><br>

Remember when we took a note that the 'Contract Called' and the 'Contract Signer' were the same in the test environment? Notice that they are different now! Can you figure out what this means?

</blockquote>

And we're done!

You can also view the details of your account & transactions by using the [NEAR Explorer](https://explorer.testnet.near.org/).

This is a simple example of a contract that calls another contract, but this opens up a lot of opportunities.

You're ready to cross as many contracts as you want! Happy coding! 🚀

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
