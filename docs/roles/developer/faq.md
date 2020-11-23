---
id: faq
title: Developer FAQ
sidebar_label: Developer FAQ
---

## Working with Contracts

### How do I know that my smart contract is working?

Each method call on a contract is recorded as a transaction. This transaction can be viewed with the near [explorer](http://explorer.testnet.near.org/). A transaction includes
- Arguments to the function (encoded json)
- Return values (if any)
- Logs (if any)
- Gas costs and tokens sent

### Is there a way to get the senders public key inside smart contract?

**Rust**

```rs
env::signer_account_pk()
```

Here it is being used to [add a key](https://github.com/near/near-sdk-rs/blob/d9ed6a32675ea5ef224873e2d5ceabe5296868fd/examples/cross-contract-high-level/src/lib.rs#L47-L55) to a newly deployed contract

**AssemblyScript**

The `context` object has everything you may need.

This specific feature is [in progress](https://github.com/near/near-sdk-as/pull/86/files#diff-72938f36d88209530d31f7f2ca9de91fR20-R23)

### Is there a way to attach NEAR tokens to a call?

There are 2 different perspectives to consider here: 

1. From **outside a contract** (ie. via `near-api-js`) you can attach tokens to a call like this:

```js
const ATTACHED_GAS = Big(1).times(10 ** 16).toFixed() // NEAR --> 10k picoNEAR conversion
const ATTACHED_TOKENS = Big(1).times(10 ** 24).toFixed() // NEAR --> yoctoNEAR conversion

contract.someMethodName({ param1: 'param-value' }, ATTACHED_GAS, ATTACHED_TOKENS)
```

See here for an [example in our Guestbook](https://github.com/near-examples/guest-book/blob/master/src/App.js#L27-L30)

2. From **inside a contract** (ie. via `near-sdk-rs` or `near-sdk-as`) you can attach tokens to a cross-contract call like this:

**Rust**

See here for an [example in our Rust library test fixtures](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-high-level/src/lib.rs#L125)


```rs
ext_status_message::set_status(message, &account_id, 0, SINGLE_CALL_GAS);
```

**AssemblyScript**

See here for an [example in our AssemblyScript workshop](https://github.com/near-examples/workshop--exploring-assemblyscript-contracts/blob/master/assembly/A.sample-projects/07.cross-contract-calls/assembly/sentences/index.ts#L25-L31)


```ts
// call another contract

let promise = ContractPromise.create(
  'some-other-contract', // contract account name
  'method-on-other-contract', // contract method name
  null, // serialized contract method arguments encoded as Uint8Array
  10000000, // attach gas to the call
  u128.Zero // attach a deposit to be sent with the call
);
```


### Why is my call to `get` a value with default not passing type checks?

You may need to use the TypeScript [non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator) if you're trying to get a value, supplying a default and still failing type checks:

```ts
storage.get('my-var', "hello, default")! // notice the ! at the end
```


### Can I use external libraries in my contract?

Most libraries should still be usable.  However, we do have a size limit for compiled binary of a contract so it is possible that certain large libraries will not be compatible. 

On the other hand, things like interaction with storage is done through our runtime API so it reduces a lot of effort on the backend side of things.


### How do you update a property of an object within a PersistentVector?

**important** This question is specific to Assemblyscript.

You have to replace the whole object. Persistent collections are ultimately just wrappers around storage.get and storage.set operating on JSON-serialized objects.

### How is PersistentMap used?

**important** This question is specific to Assemblyscript.

PersitentMap stores a key value pair, whereby the key is either a string or number and the value is usually an object. If you want to retrieve a particular value, you have to include the key to the value. 

The biggest advantage of an unordered map to a vector is, it prevents duplicate keys and saves searching time. As a result, if I have two more elements linked to the key and I want one of them to be unique, one of the solutions is to set the value type to another map.

Please refer to this [example application](https://github.com/near-examples/token-contract-as) which uses PersistentMap.


## Working with `near-api-js`

### Is there a way to pass `near-api-js` a private key via environment variable?

Yes, here it is in Node.js

```ts
const keypair = nearApi.utils.key_pair.KeyPair.fromString(process.env.PRIVATE_KEY);
```


## Miscellaneous

### What's the timeline/plan for supporting general widely used programming languages so devs can just code in whatever they're comfortable working with?

While theoretically any language that can be compiled to Wasm can be supported, in reality we often need a smart contract library to wrap around low-level runtime APIs as well as providing some other high-level functionalities.

Right now, we support Rust and AssemblyScript. To support the functionality needed while ensuring the best user experience requires time, testing, and iteration. We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just Near alone.

If you have a language you love, take a look a our [JSON RPC API](/docs/api/rpc), the primary interface for interacting with the blockchain.  You can refer to [`near-api-js`, our JavaScript library.](https://github.com/near/near-api-js/tree/master/src) for inspiration and reference on the abstractions we use for JavaScript developers.

### How do dApp updates work? Does a new app version get registered as a separate app on a new block or are they linked somehow?

You can update your dApp by deploying to an account for which you own full access keys. The updated function calls (like called using near-cli with near view and near call, for instance) will work as expected with the new logic. Note that state will persist. For instance, if the initial version of the smart contract sets the variable foo = “bar”, an update removes the usage, and a final update brings back the variable foo, the state will persist. That is, updating and deploying a new version of a smart contract will not wipe out the previous state. In the traditional web 2 world, you may think of it like removing a server but leaving the external database instance.

NEAR is organized around `accounts`.  Contract code is deployed 1:1 against an account and updating that contract replaces the code associated with that account.  See [Key Concepts: Account](/docs/concepts/account) for more detail.

### Is there a plan to support GPU compute if certain validator nodes can offer that or is it just CPU?

We don't need GPU support as we are a POS chain and we require very little compute power.

You can read more about our consensus strategy on our [Validator Quickstart](/docs/validator/staking-overview) and [Staking FAQ](/docs/validator/staking-faq).

### If a developer writes a vulnerable or malicious dApp, is a validator implicitly taking on risk?

No. 

We have handled the potential damages to the network on the protocol level. For example, we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc.

That said, smart contract developers will need to be responsible for their own dApps, as there is no stage gate or approval process. All vulnerability can only damage the smart contract itself. Luckily, updating smart contracts is very smooth on NEAR, so vulnerabilities can be updated/patched to an account in ways that cannot be done on other blockchains.

### What's the best way to get an access keys' allowance for a specific contract?

You can query a key directly through RPC. 

For example, 

```
http post https://rpc.testnet.near.org jsonrpc=2.0 method=query id=idontcare  \
          params:='["access_key/bowen/Hvpz887t27jjtyqa5wpJtS99TpvMg3kbMKBsaL9db1vs", ""]' 
```

Learn more about our [RPC API here](/docs/api/rpc).

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8> Ask it on stack overflow! </h8>
</a>
