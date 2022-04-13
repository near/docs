---
id: developer-faq
title: Developer FAQ
sidebar_label: Developer FAQ
---

## Working with Contracts {#working-with-contracts}

### How do I know that my smart contract is working? {#how-do-i-know-that-my-smart-contract-is-working}

Each method call on a contract is recorded as a transaction. This transaction can be viewed with the near [explorer](http://explorer.testnet.near.org/). A transaction includes

- Arguments to the function (encoded json)
- Return values (if any)
- Logs (if any)
- Gas costs and tokens sent

### Is there a way to get the senders public key inside smart contract? {#is-there-a-way-to-get-the-senders-public-key-inside-smart-contract}

**Rust**

```rust
env::signer_account_pk()
```

Here it is being used to [add a key](https://github.com/near/near-sdk-rs/blob/d9ed6a32675ea5ef224873e2d5ceabe5296868fd/examples/cross-contract-high-level/src/lib.rs#L47-L55) to a newly deployed contract

**AssemblyScript**

The `context` object has everything you may need.

This specific feature is [in progress](https://github.com/near/near-sdk-as/pull/86/files#diff-72938f36d88209530d31f7f2ca9de91fR20-R23)

### Is there a way to attach NEAR tokens to a call? {#is-there-a-way-to-attach-near-tokens-to-a-call}

There are 2 different perspectives to consider here:

1. From **outside a contract** (ie. via `near-api-js`) you can attach tokens to a call like this:

```js
const ATTACHED_GAS = Big(1)
  .times(10 ** 16)
  .toFixed(); // NEAR --> 10k picoNEAR conversion
const ATTACHED_TOKENS = Big(1)
  .times(10 ** 24)
  .toFixed(); // NEAR --> yoctoNEAR conversion

contract.someMethodName(
  { param1: "param-value" },
  ATTACHED_GAS,
  ATTACHED_TOKENS
);
```

See here for an [example in our Guestbook](https://github.com/near-examples/guest-book/blob/master/src/App.js#L27-L30)

2. From **inside a contract** (ie. via `near-sdk-rs` or `near-sdk-as`) you can attach tokens to a cross-contract call like this:

**Rust**

See here for an [example in our Rust library test fixtures](https://github.com/near/near-sdk-rs/blob/d9ed6a32675ea5ef224873e2d5ceabe5296868fd/examples/cross-contract-high-level/src/lib.rs#L125)

```rust
ext_status_message::set_status(message, &account_id, 0, SINGLE_CALL_GAS);
```

**AssemblyScript**

See here for an [example in our AssemblyScript workshop](https://github.com/near-examples/workshop--exploring-assemblyscript-contracts/blob/master/assembly/A.sample-projects/07.cross-contract-calls/assembly/sentences/index.ts#L25-L31)

```ts
// call another contract

let promise = ContractPromise.create(
  "some-other-contract", // contract account name
  "method-on-other-contract", // contract method name
  null, // serialized contract method arguments encoded as Uint8Array
  10000000, // attach gas to the call
  u128.Zero // attach a deposit to be sent with the call
);
```

### Why is my call to `get` a value with default not passing type checks? {#why-is-my-call-to-get-a-value-with-default-not-passing-type-checks}

You may need to use the TypeScript [non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator) if you're trying to get a value, supplying a default and still failing type checks:

```ts
storage.get("my-var", "hello, default")!; // notice the ! at the end
```

### Can I use external libraries in my contract? {#can-i-use-external-libraries-in-my-contract}

Most libraries should still be usable. However, we do have a size limit for compiled binary of a contract so it is possible that certain large libraries will not be compatible.

On the other hand, things like interaction with storage is done through our runtime API so it reduces a lot of effort on the back-end side of things.

### How do you update a property of an object within a PersistentVector? {#how-do-you-update-a-property-of-an-object-within-a-persistentvector}

**important** This question is specific to AssemblyScript.

You have to replace the whole object. Persistent collections are ultimately just wrappers around storage.get and storage.set operating on JSON-serialized objects.

### How is PersistentMap used? {#how-is-persistentmap-used}

**important** This question is specific to AssemblyScript.

PersitentMap stores a key value pair, whereby the key is either a string or number and the value is usually an object. If you want to retrieve a particular value, you have to include the key to the value.

The biggest advantage of an unordered map to a vector is, it prevents duplicate keys and saves searching time. As a result, if I have two more elements linked to the key and I want one of them to be unique, one of the solutions is to set the value type to another map.

Please refer to this [example application](https://github.com/near-examples/token-contract-as) which uses PersistentMap.

## Working with `near-api-js` {#working-with-near-api-js}

### Is there a way to pass `near-api-js` a private key via environment variable? {#is-there-a-way-to-pass-near-api-js-a-private-key-via-environment-variable}

Yes, here it is in Node.js

```ts
const keypair = nearApi.utils.key_pair.KeyPair.fromString(
  process.env.PRIVATE_KEY
);
```

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

You can read more about our consensus strategy on our [Validator Quickstart](https://wiki.near.org/validators/staking-overview) and [Staking FAQ](https://wiki.near.org/validators/faq).

### If a developer writes a vulnerable or malicious dApp, is a validator implicitly taking on risk? {#if-a-developer-writes-a-vulnerable-or-malicious-dapp-is-a-validator-implicitly-taking-on-risk}

No.

We have handled the potential damages to the network on the protocol level. For example, we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc.

That said, smart contract developers will need to be responsible for their own dApps, as there is no stage gate or approval process. All vulnerability can only damage the smart contract itself. Luckily, updating smart contracts is very smooth on NEAR, so vulnerabilities can be updated/patched to an account in ways that cannot be done on other blockchains.

### What's the best way to get an access keys' allowance for a specific contract? {#whats-the-best-way-to-get-an-access-keys-allowance-for-a-specific-contract}

You can query a key directly through RPC.

For example,

```
http post https://rpc.testnet.near.org jsonrpc=2.0 method=query id=idontcare  \
          params:='["access_key/bowen/Hvpz887t27jjtyqa5wpJtS99TpvMg3kbMKBsaL9db1vs", ""]'
```

Learn more about our [RPC API here](/docs/api/rpc).

## Common questions and issues {#common-questions-and-issues}

Here is where you can find what common errors and issues people troubleshoot as they build.

### **1. Sending data to your contract from the front-end** {#1-sending-data-to-your-contract-from-the-front-end}

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

### 2. Where are my functions when I try to call them?! {#2-where-are-my-functions-when-i-try-to-call-them}

You need to do two things in order to access your smart contract calls on the front-end.

1. Defining the methods you intend to call in your contract, and making sure they are public. \(You're probably good on this one\)
2. Declaring the methods that you want to call during the initialization of the contract on the front-end. \(You probably forgot this one.\)

```javascript
// Initializing our contract APIs by contract name and configuration.
window.contract = await near.loadContract(config.contractName, {
...
  // View methods are read only. They don't modify the state, but usually return some value.
  viewMethods: ["hello"],
  // Change methods can modify the state. But you don't receive the returned value when called.
  changeMethods: [],
...
});
```

The call to `loadContract` is actually making an object with your functions that gets assigned to the `window.contract` variable so later on you can call `window.contract.myFunction`. Note that `window` is always in scope so you can just call `contract.myFunction`.

### 3. How do I save data to the blockchain? {#3-how-do-i-save-data-to-the-blockchain}

Please see our [Data Storage / Collections](/docs/concepts/data-storage) for an in-depth look at ways you can store data onchain.

The link above illustrates ways to store data using one of our two software development kits:

- [`near-sdk-as`](https://github.com/near/near-sdk-as) for [AssemblyScript](https://www.assemblyscript.org/)
- [`near-sdk-rs`](https://github.com/near/near-sdk-as) for [Rust](https://www.rust-lang.org/)

### 4. Building smart contracts on Apple M1 (arm64) {#4-building-smart-contracts-on-apple-m1-arm64}

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


> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
