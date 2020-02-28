---
id: faq
title: Developer FAQ
sidebar_label: Developer FAQ
---

## Maintaining Applications

### How do I make sure that my application is running as expected on the network?

The only parts of your application that will run on the network are storage and compute related to contract calls made directly as part of your application (or indirectly as a result of your calls to other applications).

For example if you have an application that wants to have the latest state of your contract on chain - the easiest way to track the state of your contract is to track the shard you're contract is on.

NEAR keeps each account on one and only one shard for its lifetime. All accounts include related contract code and key-value storage of the contract (stored in a ordered trie).  This means that tracking the shard your contract account is on menas you will always have access to the most accurate version for contract code and storage.

You can explicitly track shards using the `tracking_shards` setting in a network node's configuration.


### What's the timeline/plan for supporting general widely used programming languages so devs can just code in whatever they're comfortable working with?

While theoretically any language that can be compiled to Wasm can be supported, in reality we often need smart contract library to wrap around low level runtime APIs as well as providing some other high-level functionalities. 

Since we focus a lot on developer experience, it is actually not easy to provide a high quality runtime library for smart contract development. That's why we only support Rust and AssemblyScript for now. We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just us alone.

If you have a language you love, take a look a our [JSON RPC API](/docs/interaction/rpc), the primary interface for interacting with the blockchain.  You can refer to [`nearlib`, our JavaScript SDK.](https://github.com/nearprotocol/nearlib/tree/master/src.ts) for inspiration and reference on the abstractions we use for JavaScript developers.

### How do dApp updates work? If a dApp is posted on a block its code ads is essentially “immutable” right? Does a new app version get registered as a separate app on a new block or are they linked somehow.

Right now you can update your app if you have any key to the contract and to make it immutable, a developer needs to delete all full access keys to the contract. We haven't thought a lot about versioning here, but it is certainly doable through access keys.

NEAR is organized around `accounts`.  Contract code is deployed 1:1 against an account and updating that contract replaces the code associated with that account.  See [Key Concepts: Account](/docs/concepts/account) for more detail.

### Is there a plan to support GPU compute if certain validator nodes can offer that or is it just CPU?

We don't need GPU support as we are a POS chain and we require very little compute power.

You can read more about our consensus strategy on our [Validator Quickstart](/docs/validator/staking-overview) and [Validator FAQ](/docs/validator/validator-faq).

### If a dev writes a vulnerable dApp -- let's say it's vulnerable to SQL injection or has a double free or something doesn't work that put the validator's machine at risk -- is the validator implicitly taking on some risk there on behalf of the developer?

No. 

We believe that we have handled the potential damages to the network on the protocol level. For example we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc. 

That said, smart contract developers will need to be responsible for their own dApps. 

Vulnerability there can still happen but the damage will be limited to the smart contract itself.

### When renting boxes from the major providers you can Dockerize an application and run it wherever you like without worrying about whether the machine has what you need (as long as the hardware is suitable). With this approach there's very little in terms of requirements for a node to be a validator so how are required libraries / other environmental dependencies for the dApp accounted for?

Most libraries should still be usable.  However, we do have a size limit for compiled binary of a contract so it is possible that certain large libraries will not be compatible. 

On the other hand, things like interaction with storage is done through our runtime API so it reduces a lot of effort on the backend side of things.



<blockquote class="warning">
<strong>work in progress</strong> <span>Documentation to help developers get started.</span><br><br>

- Build smart contracts
- Setup your environment and toolchain
- Explore sample applications

</blockquote>
