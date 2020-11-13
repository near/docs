---
id: startup-guide
title: Hackathon Startup Guide
sidebar_label: Hackathon Startup Guide
---

## Welcome to NEAR

You might have come to this site because you are
1. In a room, packed with great minds, who are eager to develop some amazing applications in the next few hours, days, or month;
2. A student, looking for a badass CS project;
3. Really curious on getting started - fast.

If you want to get started developing on NEAR you are at the right place. Let's kick things off!

## Why are we building NEAR?

You might have heard of distributed computing, databases, or computer networks; all of which play a role in blockchains.

Currently, most web-services utilise a single server and a single database to process your request and provide information. This infrastructure is usually managed by an individual entity, who is treating all of their data processing like a black box. Meaning, the request goes in, something happens, and the user receives an output.

While the company may make claims, and rely on third-parties to verify those, the user will never be able to verify what happened in the black box. This system relies on trust between users and companies.

NEAR is similar in principle to the “cloud-based” infrastructure that developers currently build applications on top of except the cloud is no longer controlled by a single company running a giant data center — that data center is actually made up of all the people around the world who are operating nodes of that decentralized network. Instead of a “company-operated cloud” it is a “community-operated cloud”.

To set the stage, we’re building a “base-layer blockchain”, meaning that it’s on the same level of the ecosystem as projects like Ethereum, Cosmos or EOS. That means everything else will be built on top of us, including your application.

### The main advantage of a public blockchain, such as NEAR
* The biggest security advantages come from broad public decentralization that allows all nodes in the network to verify the information.
* The goal is to empower users. The only person with access to someone's data, storage and state update, should be the user, who generates the data.
* Users are able to interact with an application without having to trust the service. The user grants a platform access to their data. Similarly, when the user is no longer interested in a service, they can revoke this access.

## Smart Contracts
Smart Contracts are the backend of your application, which live on the blockchain. The application still needs the same front-end stuff (HTML/CSS/JS) served from somewhere, eg. a cloud or a static hosting site or P2P network. The front end talks to the Smart Contract using its API (via [wallet](/docs/local-setup/create-account)). The Smart Contract runs code and stores data on the blockchain network.
We currently support developing smart contracts in [AssemblyScript](https://assemblyscript.org/introduction.html) or [Rust](https://www.rust-lang.org/).

<blockquote class="warning">
<strong>heads up</strong><br><br>

AssemblyScript is for non financial use cases.

</blockquote>

## Sounds amazing, how do I get started?

The very first thing that you will have to do is set-up your wallet by creating a [NEAR Account](/docs/local-setup/create-account). Once you have done this, please come back to this page and we will continue.

There is no "right" way of starting development on NEAR. Depending on your goal, you can start differently. We have outlined some of the options and steps below.

### Quick Start Development

You want to check-out some applications built on NEAR, have a look at smart contracts, and run a dApp (decentralized Application) in no time.

1. Open the [examples](https://near.dev/). There you will have a selection of sample projects to check out.
2. To learn more about smart contracts, please head over to the Quick Start Section.
    * [Examples](http://near.dev)
    * Lastly, have a look at the file structure in the [NEAR Development Overview](/docs/quick-start/development-overview).

When you are using gitpod, the IDE will handle deploying your smart contracts to the NEAR blockchain.

For the start of the hackathon, it's fine to do development in gitpod, but eventually you're going to want to set up a GitHub repo and share code with your team. That will be easier to do with a local setup.

### Setup a local environment
Let's set up your development environment.

1. First, you want to install the [NEAR CLI](/docs/development/near-cli) in your terminal;
2. Now it is time to setup your project. Please follow the set-up guidelines on [local development on local testnet](/docs/local-setup/local-dev-testnet).

### Get started Coding
You are all setup and want to start building your application. Below are a few resources to help you on the technical side.
* [Writing Smart Contracts in AssemblyScript](/docs/roles/developer/contracts/assemblyscript)
* [Writing Smart Contracts in Rust](/docs/roles/developer/contracts/near-sdk-rs)
* [Calling Smart Contracts](/docs/development/calling-smart-contracts)
* To make calls to the blockchain, have a look at [RPC (remote procedure calls)](/docs/api/rpc)

## Common questions and issues

Here is where you can find what common errors and issues people troubleshoot as they build.

### **1. Sending data to your contract from the frontend**

Say you've got an AssemblyScript function defined in your contract that takes data:

```ts
export function someMethod(myData:string):void {
    [...]
}
```

When you call it in the frontend, you're having issues sending data. This often shows up like this as an error in the encoder that looks similar to this:

```ts
"ABORT: unexpected string field null : 'YOUR DATA'".
```

In the frontend you can fix this issue when you call contract. Instead of calling:

```javascript
contract.someMethod("YOUR DATA"); // WRONG WAY TO CALL METHOD!
```

You need to send the **object** with the variable name that's going to be used in the backend, just like when calling a REST API.

```javascript
// RIGHT WAY TO CALL METHOD!
contract.someMethod({
    myData: "YOUR DATA"
})
```

Even though you would expect, based on function signatures in the AssemblyScript file, that the function takes just 1 parameter, when we compile it we actually force it to be a named parameter in an object that gets passed to the function.

### 2. Where are my functions when I try to call them?!

You need to do two things in order to access your smart contract calls on the frontend.

1. Defining the methods you intend to call in your contract, and making sure they are public. \(You're probably good on this one\)
2. Declaring the methods that you want to call during the initialization of the contract on the frontend. \(You probably forgot this one.\)

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

### 3. How do I save data to the blockchain?

You can use [Storage](https://near.github.io/near-sdk-as/modules/_sdk_core_assembly_storage_.html) or collections (described below). These are pretty raw in terms of documentation because they are under heavy development.

**For most cases, you can use collections.** For instance, if you want to use a map for saving data to storage you can use `PersistentMap` to create a persistent map.
Please note that the data stored in this map will be persistent, which means that your application will have to pay rent for whatever data stored there. If you do not want to persist data in storage, it's better to use `Map` instead which will mean your data will only be available in memory during the life of the function call.

There are currently four types of collections. These all write and read from storage abstracting away a lot of what you might want to add to the storage object.

* PersistentVector
  * Acts like a persistent array
  * You can create a vector like this:
    * `let vec = PersistentVector<string>("v");`
    * See [this page](/docs/roles/developer/contracts/assemblyscript) for details
* PersistentMap
  * Acts like maps you'd find in most languages
  * Yau can create a map like this:
    * `let m = PersistentMap<string, string>("m");`
    * You can use the map with `m.set(key, value)` and `m.get(key)`
    * See [this page](/docs/roles/developer/contracts/assemblyscript) for details
* PersistentDeque
  * Implementation of a deque \(bidirectional queue\).
  * You can create a deque like this:
    * `let d = PersistentDeque<string>("d");`
    * See [this page](/docs/roles/developer/contracts/assemblyscript) for details
* PersistentSet
  * Used for creating sets of unique values
  * You can create a set like this:
    * `let t = PersistentSet<string>("t");`
    * See [this page](/docs/roles/developer/contracts/assemblyscript) for details

The letter passed in as an argument (e.g. `"v"` in the case of the vector) is the key that gets assigned as a prefix to distinguish the collections from each other (precisely because they're persistent).

**NOTE**: if you're coming from JavaScript, you might not be familiar with the type declaration in the two brackets `<>`. In AssemblyScript, you need to declare the types that any collection is going to take.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8> Ask it on stack overflow! </h8>
</a>
