---
id: faqs
title: Frequently Asked Questions
sidebar_label: ❓ FAQs
---

---

## Working with Contracts {#working-with-contracts}

### Can I use external libraries in my contract? {#can-i-use-external-libraries-in-my-contract}

Most libraries should still be usable. However, we do have a size limit for compiled binary of a contract so it is possible that certain large libraries will not be compatible.

On the other hand, things like interaction with storage is done through our runtime API so it reduces a lot of effort on the back-end side of things.

### How do you update a property of an object within a PersistentVector? {#how-do-you-update-a-property-of-an-object-within-a-persistentvector}

**important** This question is specific to Assemblyscript.

You have to replace the whole object. Persistent collections are ultimately just wrappers around storage.get and storage.set operating on JSON-serialized objects.

### How is PersistentMap used? {#how-is-persistentmap-used}

**important** This question is specific to Assemblyscript.

PersitentMap stores a key value pair, whereby the key is either a string or number and the value is usually an object. If you want to retrieve a particular value, you have to include the key to the value.

The biggest advantage of an unordered map to a vector is, it prevents duplicate keys and saves searching time. As a result, if I have two more elements linked to the key and I want one of them to be unique, one of the solutions is to set the value type to another map.

Please refer to this [example application](https://github.com/near-examples/token-contract-as) which uses PersistentMap.

---

## Working with `near-api-js` {#working-with-near-api-js}

### Is there a way to pass `near-api-js` a private key via environment variable? {#is-there-a-way-to-pass-near-api-js-a-private-key-via-environment-variable}

Yes, here it is in Node.js

```ts
const keypair = nearApi.utils.key_pair.KeyPair.fromString(
  process.env.PRIVATE_KEY
);
```

---

## Miscellaneous {#miscellaneous}

### What's the timeline/plan for supporting general widely used programming languages so devs can just code in whatever they're comfortable working with? {#whats-the-timelineplan-for-supporting-general-widely-used-programming-languages-so-devs-can-just-code-in-whatever-theyre-comfortable-working-with}

While theoretically any language that can be compiled to Wasm can be supported, in reality we often need a smart contract library to wrap around low-level runtime APIs as well as providing some other high-level functionalities.

Right now, we support Rust and AssemblyScript. To support the functionality needed while ensuring the best user experience requires time, testing, and iteration. We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just NEAR alone.

If you have a language you love, take a look a our [JSON RPC API](/docs/api/rpc), the primary interface for interacting with the blockchain. You can refer to [`near-api-js`, our JavaScript library.](https://github.com/near/near-api-js/tree/master/src) for inspiration and reference on the abstractions we use for JavaScript developers.

### How do dApp updates work? Does a new app version get registered as a separate app on a new block or are they linked somehow? {#how-do-dapp-updates-work-does-a-new-app-version-get-registered-as-a-separate-app-on-a-new-block-or-are-they-linked-somehow}

You can update your dApp by deploying to an account for which you own full access keys. The updated function calls (like called using near-cli with near view and near call, for instance) will work as expected with the new logic. Note that state will persist. For instance, if the initial version of the smart contract sets the variable foo = “bar”, an update removes the usage, and a final update brings back the variable foo, the state will persist. That is, updating and deploying a new version of a smart contract will not wipe out the previous state. In the traditional web 2 world, you may think of it like removing a server but leaving the external database instance.

NEAR is organized around `accounts`. Contract code is deployed 1:1 against an account and updating that contract replaces the code associated with that account. See [Key Concepts: Account](/docs/concepts/account) for more detail.

### Is there a plan to support GPU compute if certain validator nodes can offer that or is it just CPU? {#is-there-a-plan-to-support-gpu-compute-if-certain-validator-nodes-can-offer-that-or-is-it-just-cpu}

We don't need GPU support as we are a POS chain and we require very little compute power.

You can read more about our consensus strategy on our [Validator Quickstart](https://github.com/near/wiki/blob/master/Archive/validators/about.md) and [Staking FAQ](https://github.com/near/wiki/blob/master/Archive/validators/faq.md).

### If a developer writes a vulnerable or malicious dApp, is a validator implicitly taking on risk? {#if-a-developer-writes-a-vulnerable-or-malicious-dapp-is-a-validator-implicitly-taking-on-risk}

No.

We have handled the potential damages to the network on the protocol level. For example, we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc.

That said, smart contract developers will need to be responsible for their own dApps, as there is no stage gate or approval process. All vulnerability can only damage the smart contract itself. Luckily, updating smart contracts is very smooth on NEAR, so vulnerabilities can be updated/patched to an account in ways that cannot be done on other blockchains.

---

## Common questions and issues {#common-questions-and-issues}

Here is where you can find what common errors and issues people troubleshoot as they build.

### Sending data to your contract from the front-end {#sending-data-to-your-contract-from-the-front-end}

Say you've got an AssemblyScript function defined in your contract that takes data:

```ts
export function someMethod(myData:string):void {
    [...]
}
```

When you call it in the front-end, you're having issues sending data. This often shows up like this as an error in the encoder that looks similar to this:

```ts
"ABORT: unexpected string field null : 'YOUR DATA'".
```

In the front-end you can fix this issue when you call contract. Instead of calling:

```javascript
contract.someMethod("YOUR DATA"); // WRONG WAY TO CALL METHOD!
```

You need to send the **object** with the variable name that's going to be used in the back-end, just like when calling a REST API.

```javascript
// RIGHT WAY TO CALL METHOD!
contract.someMethod({
  myData: "YOUR DATA",
});
```

Even though you would expect, based on function signatures in the AssemblyScript file, that the function takes just 1 parameter, when we compile it we actually force it to be a named parameter in an object that gets passed to the function.

### How do I save data to the blockchain? {#how-do-i-save-data-to-the-blockchain}

Please see our [Data Storage / Collections](/docs/concepts/data-storage) for an in-depth look at ways you can store data onchain.

The link above illustrates ways to store data using one of our two software development kits:

- [`near-sdk-as`](https://github.com/near/near-sdk-as) for [AssemblyScript](https://www.assemblyscript.org/)
- [`near-sdk-rs`](https://github.com/near/near-sdk-as) for [Rust](https://www.rust-lang.org/)

### Building smart contracts on Apple M1 (arm64) {#building-smart-contracts-on-apple-m1-arm64}

> **Note:** `arm64` is generally not supported by NEAR, but you should still be able to build smart
> contracts by following the provided workarounds.

#### near-sdk-rs {#near-sdk-rs}

If you're trying to build a Rust smart contract on an Apple M1 (`arm64`), you'll get an `unsupported platform` error such as:

```text
npm ERR! code 1
npm ERR! path /Users/near/smart-contract/node_modules/near-vm
npm ERR! command failed
npm ERR! command sh -c node ./install.js
npm ERR! /Users/near/smart-contract/node_modules/near-vm/getBinary.js:17
npm ERR!     throw new Error(`Unsupported platform: ${type} ${arch}`);
npm ERR!     ^
npm ERR!
npm ERR! Error: Unsupported platform: Darwin arm64
```

You can solve it with [this workaround](https://t.me/neardev/13310):

```sh
rustup target add x86_64-apple-darwin
rustup default stable-x86_64-apple-darwin
```

This will force Rust to compile to `x86`, and your Mac will execute the binary using Rosetta 2.

#### near-sdk-as {#near-sdk-as}

If you cannot install `near-sdk-as` and you get an `Unsupported platform: Darwin arm64` error while trying to build an AssemblyScript smart contract on an Apple M1 (`arm64`):

```text
error /Users/near/guest-book/node_modules/near-vm: Command failed.
Exit code: 1
Command: node ./install.js
Arguments:
Directory: /Users/near/guest-book/node_modules/near-vm
Output:
/Users/near/guest-book/node_modules/near-vm/getBinary.js:17
    throw new Error(`Unsupported platform: ${type} ${arch}`);
    ^

Error: Unsupported platform: Darwin arm64
```

Use this command to install the dependencies without downloading the VM:

```sh
npm install --save-dev --ignore-scripts near-sdk-as
```

> **Note:** if everything else installs correctly, you can disregard this error.
> You should still be able to build, deploy, and run the AS smart contract.

---

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
