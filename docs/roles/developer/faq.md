---
id: faq
title: Developer FAQ
sidebar_label: Developer FAQ
---

### How do I know that my smart contract is working?

Each method call on a contract is recorded as a transaction. This transaction can be viewed with the near [explorer](http://explorer.testnet.nearprotocol.com/). A transaction includes
- Arguments to the function (encoded json)
- Return values (if any)
- Logs (if any)
- Gas costs and tokens sent

### What's the timeline/plan for supporting general widely used programming languages so devs can just code in whatever they're comfortable working with?

While theoretically any language that can be compiled to Wasm can be supported, in reality we often need a smart contract library to wrap around low-level runtime APIs as well as providing some other high-level functionalities.

Right now, we support Rust and AssemblyScript. To support the functionality needed while ensuring the best user experience requires time, testing, and iteration. We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just Near alone.

If you have a language you love, take a look a our [JSON RPC API](/docs/interaction/rpc), the primary interface for interacting with the blockchain.  You can refer to [`near-api-js`, our JavaScript library.](https://github.com/near/near-api-js/tree/master/src) for inspiration and reference on the abstractions we use for JavaScript developers.

### How do dApp updates work? Does a new app version get registered as a separate app on a new block or are they linked somehow?

You can update your dApp by deploying to an account for which you own full access keys. The updated function calls (like called using near-shell with near view and near call, for instance) will work as expected with the new logic. Note that state will persist. For instance, if the initial version of the smart contract sets the variable foo = “bar”, an update removes the usage, and a final update brings back the variable foo, the state will persist. That is, updating and deploying a new version of a smart contract will not wipe out the previous state. In the traditional web 2 world, you may think of it like removing a server but leaving the external database instance.

NEAR is organized around `accounts`.  Contract code is deployed 1:1 against an account and updating that contract replaces the code associated with that account.  See [Key Concepts: Account](/docs/concepts/account) for more detail.

### Is there a plan to support GPU compute if certain validator nodes can offer that or is it just CPU?

We don't need GPU support as we are a POS chain and we require very little compute power.

You can read more about our consensus strategy on our [Validator Quickstart](/docs/validator/staking-overview) and [Validator FAQ](/docs/validator/validator-faq).

### If a developer writes a vulnerable or malicious dApp, is a validator implicitly taking on risk?

No. 

We have handled the potential damages to the network on the protocol level. For example, we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc.

That said, smart contract developers will need to be responsible for their own dApps, as there is no stage gate or approval process. All vulnerability can only damage the smart contract itself. Luckily, updating smart contracts is very smooth on NEAR, so vulnerabilities can be updated/patched to an account in ways that cannot be done on other blockchains.

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

### What's the best way to get an access keys' allowance for a specific contract?

You can query a key directly through RPC. 

For example, 

```
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 method=query id=idontcare  \
          params:='["access_key/bowen/Hvpz887t27jjtyqa5wpJtS99TpvMg3kbMKBsaL9db1vs", ""]' 
```

Learn more about our [RPC API here](/docs/interaction/rpc).

---

<blockquote class="warning">
<strong>work in progress</strong> <span>Documentation to help developers get started.</span><br><br>

- Build smart contracts
- Setup your environment and toolchain
- Explore sample applications

</blockquote>
