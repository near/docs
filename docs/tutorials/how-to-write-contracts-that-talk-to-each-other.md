---
id: how-to-write-contracts-that-talk-to-each-other
title: How to issue your own token (ERC20)
sidebar_label: How to issue your own token (ERC20)
---

# How to write contracts that talk to each other

## Introduction

At some point you might want to call functions on existing contracts. This is called a _cross contract call_. There are plenty of reasons to do this:

* You want to leverage a code library that others have written and released
* You want your app to integrate with other contracts that have some transferable state \(For instance, a game that has transferable inventory\)
* You want to build a bot that interacts with existing contracts in some way

  Cross contract calls are really similar to calling an external API in the web 2.0 context.

In this tutorial we will build a very simple example to get you up and running with cross contract calls.

## Description

We’re going to create two simple contracts:

* `Calculator` this contract will have the calculation that we want to write for anyone to call
* `Calculator Caller` this contract \(no surprise\) will call the calculation available in the other contract

For this example, we’ll only implement the `add` functionality, but already we’ve got a problem! The accounting department at Super Evil Mega Corp sent all these numbers as strings. To make things worse, we don’t know how long these strings are going to be. Why this is a problem: the largest integer that JavaScript can deal with is [9007199254740991](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). To help out everyone who wants to add long numbers together, we’re going to deploy a contract that people can incorporate into their own calculators.

### Let’s get started!

## Step 1 - Start a new project in NEARstudio

Go to [The Studio](https://near.dev) and start a new project by selecting "Token Smart Contract" and click "Create".

![](../.gitbook/assets/screenshot-2019-07-30-13.23.01.png)

This sample project has a token smart contract and also some JavaScript tests that invoke smart contract functions. You can try running these tests right away to see the code interacting with the blockchain by clicking "Test".

It should open a new window and show the test results using the standard Jasmine browser UI.

**We are not going to keep any of the code from this template. It's just there as a starting point.**

## Step 2 - Write the `Calculator` contract

We’re interested in writing only one function for this example. A function that takes in two strings `a` and `b` and returns the result of adding them together as a string.

* Navigate to assembly/main.ts
* Delete everything that is there underneath the comment: `// --- contract code goes below` 
* Implement the `addLongNumbers` function below the contract init functions. 

Here’s the solution to add long numbers below in TypeScript.

{% code-tabs %}
{% code-tabs-item title="assembly/main.ts" %}
```typescript
import { context, storage, near, collections } from "./near";

// --- contract code goes below
export function addLongNumbers(a: string, b: string): string {
  const aReversed = a.split("").reverse();
  const bReversed = b.split("").reverse();

  const maxLength = max(a.length, b.length);
  let resultArray = new Array<String | null>(maxLength + 1);
  let result = ""
  let carry = 0;
  for (let i = 0; i < maxLength; ++i) {
    let aDigit = (i < a.length) ? U32.parseInt(aReversed[i]) : 0;
    let bDigit = (i < b.length) ? U32.parseInt(bReversed[i]) : 0;
    let digitSum = aDigit + bDigit + carry;

    if (digitSum >= 10) {
      carry = 1;
      digitSum -= 10;
    } else {
      carry = 0;
    }
    resultArray[i] = digitSum.toString();
  }

  if (carry > 0) {
    resultArray[maxLength] = carry.toString();
  }
  let reversedResultArray = resultArray.reverse();
  return reversedResultArray.join("");
}

```
{% endcode-tabs-item %}
{% endcode-tabs %}

Make sure to save the new files and click the `run` button. That’s it for our `Calculator` typescript code for now!

## Step 3 - Write some tests for the contract

It’s a good habit to test code as soon as we’ve finished writing it, so that’s exactly what we’re going to do.

* Navigate to `src/test.js`
* Delete everything there and replace it with the code below. Then click the `test` button and hope for all green! Here we’re testing for use cases that we might expect.

{% code-tabs %}
{% code-tabs-item title="src/test.js" %}
```javascript
describe("Calculator", function() {
    let near;
    let contract;
    let alice;
    let bob = "bob.near";
    let eve = "eve.near";

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    // Common setup below
    beforeAll(async function () {
      near = await nearlib.connect(nearConfig);
      accountId = nearConfig.contractName;
      contract = await near.loadContract(accountId, {
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value. 
        viewMethods: ["hello", "addLongNumbers"],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [],
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
          a: "15",
          b: "4"
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
{% endcode-tabs-item %}
{% endcode-tabs %}

Normally, we would create a UI at this point, but since we’re calling this from elsewhere, let’s move on the the second contract.

## Step 4 - Create a new contract for `Calculator Caller`

Keep the tab open that you’ve been working on, you're going to need the ID of the contract you just created later.

Open a new tab or window. Once again, go to The Studio and start a new project by selecting "Token Smart Contract" and click "Create".

We’re doing this because we need to create an entirely separate contract deployed at a different address to demonstrate the capabilities of cross contract calls.

## Step 5 - Write the `Calculator Caller` code

We want to implement code that actually passes the numbers over to the contract we’re calling. Here we’re going to do this by creating a single `callAddNumbers` function and add the piping which allows us to make this function work.

We’re going to need three things to make this happen:

* The native `ContractPromise` class from the `near-runtime`
* `CalculatorAPI`  a class we’ll create that will send the numbers we want to add to the other contract through an `add` mehtod.
* `AddArgs` a class that serves as our data model for to encode the arguments we’re sending, and finally,
* `callAddNumbers` function which will call the `CalculatorAPI` method we create to add the numbers.

This time around, we’re going to start by creating a model.

* Navigate to the `assembly` folder 
* Create a file inside of `assembly` and name it `model.ts` 
* Write the following model that we’ll use later

```typescript
export class AddArgs { 
    a: string; 
    b: string; 
}
```

This will allow us to encode arguments to send. Next we’ll create the API that we can use to call the contract we’ve previously deployed.

* navigate to `assembly/main.ts`
* Delete everything in the file!
* Replace the top imports block with:

```typescript
import { context, storage, near, collections, ContractPromise } from "./near";
import { AddArgs } from "./model.near";
```

Notice that we’re importing `AddArgs` from the model we created using the syntax `./model.near` AND we’re importing `ContractPromise` from `./near` Next we’ll create the API to call the function we’re want in the other contract

* Implement the `CalculatorApi` class below

  Here, we’re creating a single method `add` that takes the strings we want to add and returns a `ContractPromise`. In order to create this `ContractPromise`, we need to know:

* The ID of the contract that we created before. You’ll need to replace
* Whatever function we’re trying to call on the `Calculator` contract.

  \(For more info on CotnractPromise, check out [https://docs.nearprotocol.com/client-api/ts/classes/contractpromise-contractpromiseresult](https://docs.nearprotocol.com/client-api/ts/classes/contractpromise-contractpromiseresult)\)

  We’re also using the `AddArgs` model we created to package the strings we want to send to the other contract. When we call `args.encode()` it’s a lot like something like `JSON.stringify(args)` to allow us to send this data.

```typescript
export class CalculatorApi {
  add(a: string, b: string): ContractPromise {
    let args: AddArgs = { a, b };
    let promise = ContractPromise.create("studio-[ORIGINAL_CONTRACT_ID]”, "addLongNumbers", args.encode(), 1);t 
    return promise;
  }
}
```

You’ll need to replace `[ORIGINAL_CONTRACT_ID]` with the actual contract id.

* You can find that in the url of the page after `?f=`.

![](../.gitbook/assets/screenshot-2019-04-19-20.09.33-2.png)

* After you paste the id, this argument will look something like `"studio-tykeruhic”` 

Next, we’re going to use the `CalculatorApi` we just created.

* Below the `CalculatorAPI` class, write the following code:

```typescript
export function calculate(): void {
  const a = "1";
  const b = "99";
  let calculator = new CalculatorApi();
  let promise = calculator.add(a, b);
  promise.returnAsResult();
}
```

This is a bit confusing because the contract is returning a promise, but because it’s calling a function elsewhere, the compiler thinks that this is returning void.

\(For now, you can set the return type of the function to `void`. In future releases this will be changed.\)

When it’s all finished it should look something like this:

{% code-tabs %}
{% code-tabs-item title="assembly/main.ts" %}
```typescript
[...]
import "allocator/arena";
export { memory };
import { context, storage, near, collections, ContractPromise } from "./near";
import { AddArgs } from "./model.near";
// --- contract code goes below

export class CalculatorApi {
  add(a: string, b: string): ContractPromise {
    let args: AddArgs = { a, b };
    let promise = ContractPromise.create("studio-tykeruhic", "addLongNumbers", args.encode(), 1);
    return promise;
  }
}
export function calculate(): void {
  const a = "1";
  const b = "99";
  let calculator = new CalculatorApi();
  let promise = calculator.add(a, b);
  promise.returnAsResult();
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The part that says `studio-tykeruhic` should contain whatever id your original smart contract was associated with. And that’s it for the smart contracts!

## Step 6 - More Tests!

Just to demonstrate that it’s working, we’ll only write one test.

* Navigate to `src/test.js` and replace everything there with:

```typescript
describe("CalculatorAPI", function() {
    let near;
    let contract;
    let alice;
    let bob = "bob.near";
    let eve = "eve.near";
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    
    // Common setup below
    beforeAll(async function () {
      near = await nearlib.connect(nearConfig);
      accountId = nearConfig.contractName;
      contract = await near.loadContract(accountId, {
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value. 
        viewMethods: ["calculate", "addLongNumbers"],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ["calculate"],
        sender: nearConfig.contractName
      });
      window.near = near;
    });
    
    // Multiple tests can be described below. Search Jasmine JS for documentation.
    describe("simple", function() {
      beforeAll(async function() {
        // There can be some common setup for each test.
      });
      it("add one digit", async function() {
        const params = {
          a: "1",
          b: "3"
        };
        const result = await contract.calculate();
        console.log(result);
        expect(result.lastResult).toBe("100");
      });
  });
});
```

And we're done!

This is a simple example of a contract that calls another contract, but this opens up a lot of opportunities.

Now, see if you can figure out how to build the frontend by checking out our [other tutorials](./) and modifying `src/main.js`.

You’re ready to cross as many contracts as you want! Happy coding! 🚀

