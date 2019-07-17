# Hackathon Startup Guide \(10 min\)

## Introduction to NEAR

First thing you need to do is go over some of [the Smart Contract Basics](../prerequisites/the_basics.md). You don't need to become an expert, just get acquainted at this point.

Then head over to the [Beginner Quickstart](../working-smart-contracts/). That will get you actually exploring the code.

I recommend getting familiar with how to actually write code in a smart contract in studio, and hitting the `run` button. That will give you a good foundation for local development.

For the start of the hackathon, it's fine to do development in the studio, but eventually you're going to want to set up a Github repo and share code with your team. That will be easier to do with a local setup.

This is the quick and dirty way to do that:

### Running locally

To run NEAR locally you would need docker, see [installation instructions](https://www.docker.com/get-started).

Clone the nearcore repo from here: [https://github.com/nearprotocol/nearcore/](https://github.com/nearprotocol/nearcore/)

you can use:

```bash
git clone https://github.com/nearprotocol/nearcore.git
cd nearcore
```

Then run the following:

```bash
./ops/deploy_local.sh
```

After it starts you can open studio at [http://localhost](http://localhost).

To tear it down run:

```bash
./ops/teardown_local.sh
```

### Running remotely

Similarly you deploy the network to the GCloud:

```bash
./ops/deploy_remote.sh
```

When the network is deployed it will print the address of the studio.

### Common questions and issues

Here is where you can find what common errors and issues people troubleshoot as they build.

#### **1. Sending data to your contract from the frontend**

This often shows up like this as an error in the encoder that looks similar to this:

```typescript
"ABORT: unexpected string field null : 'YOUR DATA'".
```

In the frontend you can fix this issue when you call contract. Instead of calling:

```javascript
contract.someMethod("YOUR DATA");
```

You need to send the **object** with the variable name that's going to be used in the backend, just like when calling a REST API.

```javascript
contract.someMethod({
    myData: "YOUR DATA"
})
```

**2. Where are my functions when I try to call them?!**

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

#### 3. How do I save data to the blockchain?

You can use [storage]() or [collections](). These are pretty raw in terms of documentation because they are under heavy development.

**For most cases, you can use collections.** For instance, where you would think to use a map for in-memory storage in trivial applications you can use `collections.map` to create a persistent map.

There are currently four types of collections. These all write and read from storage abstracting away a lot of what you might want to add to the storage object.

* Vector
  * Acts like a persistent array
  * You can create a vector like this:
    * `let vec = collections.vector<string>("v");`
    * See the full implementation [here]()
* Map
  * Acts like maps you'd find in most languages
  * Yau can create a map like this:
    * `let m = collections.map<string, string>("m");`
    * You can use the map with `m.set(key, value)` and `m.get(key)`
    * See the full implementation [here]()
* Deque
  * Implementation of a deque \(bidirectional queue\).
  * You can create a deque like this:
    * `let d = collections.deque<string>("d");`
    * See the full implementation [here]()
* TopN
  * Used for creating ranked lists
  * You can create a TopN collection like this:
    * `let t = collections.topN<string>("t");`
    * See the full implementation [here]()

The letter passed in as an argument \(e.g. `"v"` in the case of the vector\) is the key that gets assigned as a prefix to distinguish the collections from each other \(precisely because they're persistent\).

**NOTE**: if you're coming from JavaScript, you might not be familiar with the type declaration in the two brackets `<>`. In TypeScript, need to declare the types that any collection is going to take.

