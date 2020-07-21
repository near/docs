---
id: assemblyscript
title: AssemblyScript
sidebar_label: AssemblyScript
---

The NEAR platform supports writing contracts in Rust and AssemblyScript.

AssemblyScript is a dialect of TypeScript that compiles to Wasm.  See the [official AssemblyScript docs](https://assemblyscript.org/introduction.html) for more details.

This document aims to introduce developers already comfortable with TypeScript to writing AssemblyScript on the NEAR platform.

If you are not familiar with TypeScript then this [introduction](https://learnxinyminutes.com/docs/typescript/) will be worth a quick look but do keep in mind that **AssemblyScript is a *dialect of TypeScript*** so not all of the features of TypeScript are supported.

<blockquote class="warning">
<strong>heads up</strong><br><br>

AssemblyScript smart contract development is for non financial use cases.

</blockquote>

## Quickstart

- You may use [`create-near-app`](https://github.com/nearprotocol/create-near-app) to get started locally or explore [examples](http://near.dev/) to work online in gitpod online IDE.
- You write contracts in [AssemblyScript](https://assemblyscript.org/introduction.html) and use `near-sdk-as` to interact with the blockchain (storage, context, etc)
- The AssemblyScript is compiled to [Wasm](https://learnxinyminutes.com/docs/wasm/) and (using either NEAR Shell, `near-api-js` or our RPC interface) it is deployed to an account on the NEAR platform
- When a method on the contract is invoked, NEAR routes the request to the proper shard (the one with the account that "holds" or "owns" the contract, see [more about accounts here](/docs/concepts/account))
- The contract method is executed on a [virtual machine](https://github.com/nearprotocol/nearcore/tree/master/runtime/near-vm-logic) which is spun up just for this execution (you can think of it like a serverless function on AWS lambda if you like)
- The results of the call are returned to your execution context (if using `near-api-js`, for example, log output from the contract will appear in your JavaScript developer console)

For rich examples of AssemblyScript written for the NEAR platform check out:

- [examples](http://near.dev): sample applications you can explore online with gitpod IDE.
- [CryptoCorgis*](https://github.com/nearprotocol/corgis): a playful take on NFTs (non-fungible tokens)
- [NEAR Chess](https://github.com/nearprotocol/near-chess/tree/master/assembly): a NEAR implementation of [chessboard.js](https://chessboardjs.com/)
- [`near-sdk-as`](https://github.com/near/near-sdk-as/tree/master/assembly): our library for writing near smart contracts

*CryptoCorgis is currently a private repo available here: `github.com/near/corgis`

## Basics

### Contracts

What is a "contract?"  It's the container for all the variables, functions and state of the blockchain portion of your application.

This is a fully functioning smart contract with 1 method called `hello` that takes no arguments:

```ts
export function hello(): string {
  return "Hello, World!";
}
```

We can call this method using NEAR Shell which in turn calls `near-api-js` which in turn calls our JSON RPC interface.  As a developer we can leverage any of these interfaces depending on which level of abstraction we want to work with.  NEAR Shell is most convenient from the terminal, `near-api-js` makes sense from a client or server-side JavaScript application and the RPC interface would be most useful if we prefer to make raw HTTP requests from some other context like a different programing language or environment not currently provided by the NEAR community.

From within this contract method you can also access the blockchain execution context by importing the `context` object from `near-sdk-as`. This gives you access to blockchain data like the `sender` who signed the original transaction that caused the execution of this contract method.  or the contract's name via `contractName`.

### File Structure

The fastest way to get started locally is to use [`create-near-app`](https://github.com/nearprotocol/create-near-app) from your terminal or explore [examples](http://near.dev/) if you would rather work online.  Regardless of which of these environments you choose, the development and build process is similar.

Contracts have [all of the features of AssemblyScript](https://assemblyscript.org/introduction.html) at their disposal and contract files end with `.ts` since AssemblyScript is a dialect of TypeScript.

```bash
assembly
  ├── main.ts   # contains code for the contract
  └── model.ts  # contains code for the model(s) accessible to the contract
```

Contracts are a named collection of (exported) functions that have access (via `near-sdk-as`) to their execution context (sender, receiver, block height, etc) as well as storage services (key-value pair and convenience collections like Map, Vector and Deque), logging services and some utility functions.

To keep things organized, contracts can use one or more data objects which are commonly added to the `model.ts` file.

### Environment

#### Imports

All contracts and models must explicitly import features of the NEAR runtime they intend to use.  Not all of these features are used all of the time of course.

```ts
import {
  context,            // visibility into account, contract and blockchain details
  logging,            // append to the execution environment log (appears in JS Developer Console when using near-api-js)

  storage,            // key-value store for the contract (used by PersistentMap, PersistentVector and PersistentDeque)

  PersistentMap,      // data structure that wraps storage to appear like a Map
  PersistentVector,   // data structure that wraps storage to appear like a Vector
  PersistentDeque,    // data structure that wraps storage to appear like a Deque
  PersistentSet,      // data structure that wraps storage to appear like a Set

  ContractPromise,    // make asynchronous calls to other contracts and receive callbacks

  base58,             // utility base58 encoder
  base64,             // utility base64 encoder / decoder
  math,               // utility math functions for hashing using SHA and Keccak as well as pseudo-random data
  utils               // utility type conversion and read_register
} from "near-sdk-as";
```

#### AssemblyScript

AssemblyScript provides [a rich environment](https://assemblyscript.org/environment.html) including an `assert` function to improve the quality of your code, among others.

```ts
assert<T>(isTrueish: T, message?: string): T

// usage
let output: i8 = 1;
assert(output == 1, "The value of output is not 1");
```

AssemblyScript is under heavy, active development including by members of our team.  Language features include several built-in [types](https://assemblyscript.org/types.html), [static type checking](https://assemblyscript.org/environment.html#static-type-checks), [sizing](https://assemblyscript.org/environment.html#sizes-and-alignments) and a few [utility](https://assemblyscript.org/environment.html#utility) functions.  A unit testing framework called [`as-pect`](https://github.com/jtenner/as-pect) is also available which we are currently integrating into our own samples.

For more on AssemblyScript, consider the small AssemblyScript examples included with [Wasm by Example](https://wasmbyexample.dev/all-examples-list.html) or more significant bodies of work that are [Built with AssemblyScript](https://assemblyscript.org/built-with-assemblyscript.html#built-with-assemblyscript).

## Development

If you choose to use `create-near-app`, we provide a set of helpful scripts in the `package.json` file that handle building and deployment as well as some useful local development automation.

You can run `npm dev` to start working with the provided sample and `npm start` to deploy the example (using a temporary dev account) to TestNet.

See the full list of scripts in `create-near-app`'s `package.json`:

```json
{
  "scripts": {
    "build": "npm run build:contract && npm run build:web",
    "build:contract": "node asconfig.js",
    "build:web": "parcel build src/index.html --public-url ./",
    "dev:deploy:contract": "near dev-deploy",
    "deploy:contract": "near deploy",
    "deploy:pages": "gh-pages -d dist/",
    "deploy": "npm run build && npm run deploy:contract && npm run deploy:pages",
    "prestart": "npm run build:contract && npm run dev:deploy:contract",
    "start": "env-cmd -f ./neardev/dev-account.env parcel src/index.html",
    "dev": "nodemon --watch assembly -e ts --exec \"npm run start\"",
    "test": "asp --nologo && npm run build:contract && jest test --runInBand"
  },
}
```


### Models

There are [multiple examples of model implementations](https://github.com/search?q=org%3Anearprotocol+filename%3Amodel.ts+size%3A%3E50&type=Code) on our GitHub organization.

The most sophisticated models currently available as open source are:

- models for [Meta NEAR](https://github.com/nearprotocol/metanear-src/blob/master/assembly/model.ts)
- models for [NEAR Place](https://github.com/nearprotocol/near-place/blob/master/assembly/model.ts)
- models for [`near-sdk-as` tests](https://github.com/near/near-sdk-as/blob/master/assembly/__tests__/model.ts)
- models for [NEAR Chess](https://github.com/nearprotocol/near-chess/blob/master/assembly/model.ts)

*Note that some of the projects listed above may need to have some updates applied before a successful deployment is possible*

For convenience, here are highlights of just a few of the simpler examples.

#### Models define new types

At the most basic level, a model is a custom data container that defines a new type not currently available (as opposed to primitive types like integers, strings and bool which are always available)

```ts
@nearBindgen
export class TextMessage {
  sender: string;
  text: string;
  number: u64;
  isRead: bool;
}
// see https://github.com/near/near-sdk-as/blob/master/assembly/__tests__/runtime/model.ts
```

#### Models are composable

Models can build on top of one another as with the sample below, taken from [CryptoCorgis](https://github.com/nearprotocol/corgis), which includes 3 models:

- `CorgiMetaData` which wraps an array of strings
- the `Corgi` model which includes strings, an integer and also uses `CorgiMetaData`
- and finally a `CorgiArray` which includes an array of `Corgi`s and maintains the length of that array as well

```ts
@nearBindgen
export class CorgiMetaData {
  dna: Array<string>;
}

export class Corgi {
  owner: string;
  sender:string;
  message:string;
  dna: string;
  name: string;
  color:string;
  backgroundColor: string;
  rate: string;
  sausage : string;
  quote: string;
  level: i32;
  metadata: CorgiMetaData;
}

export class CorgiArray {
  corgis: Array<Corgi>;
  len: i32;
}
// see https://github.com/nearprotocol/corgis/blob/master/assembly/model.ts
```

#### Models are just classes

Since models are just AssemblyScript classes, they support custom constructors and behavior, not just data, as with the example here:

```ts
@nearBindgen
export class Greeter {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  greet(userId: string): string {
    return "Hello, " + userId;
  }
}
// see https://github.com/nearprotocol/blockbuster/blob/master/assembly/model.ts
```

### Context

Contracts can import the blockchain `context` from `near-sdk-as`.

```ts
import { context } from 'near-sdk-as'

// contract code below this line can now make use of the context object
```

This object provides context for contract execution including information about the transaction sender, blockchain height, and attached deposit available for use during contract execution, etc.  The snippet below is the complete interface as currently implemented.

```ts
// REFERENCE ONLY
// interface provided by the context object imported above

class Context {

  // Context API
  get sender(): string            // account ID that signed the original transaction that led to this execution (aka. signer account id)
  get contractName(): string      // account ID of current contract being executed (aka. current account id)
  get blockIndex(): u64           // current block index (aka. height)
  get storageUsage(): u64         // contract account storage usage before the contract execution

  // Economics API
  get attachedDeposit(): u128     // balance that was attached to the call that will be immediately deposited before the contract execution starts.
  get accountBalance(): u128      // balance attached to the given account. Excludes the `attachedDeposit` that was attached to the transaction.
  get prepaidGas(): u64           // gas attached to the call and available to pay for the gas fees
  get usedGas(): u64              // gas that was irreversibly used for contract execution (aka. burnt gas) + gas attached to any promises (cannot exceed prepaidGas)
}
```

## State and Data

Contract function calls are stateless. Any state that you want to save to the blockchain needs to be explicitly saved by interacting with the `storage` object.

This object provides an interface to the blockchain storage. It is a standard key-value store where keys are strings and the values can be multiple types including `string`, `bytes`, `u64`. Anything else needs to be first converted into these types.

All contract data is stored in the same key-value data store on the blockchain (called "storage" and imported from `near-sdk-as`) with a few convenience methods for reading, writing, searching and deleting keys and values using various data types.

We also provide a few collections for convenience including `PersistentMap`, `PersistentVector`, `PersistentDeque` and `PersistentSet` which wrap the `Storage` class to mimic a Map, Vector (aka. Array), Deque and Set.  And of course you can use these as examples as inspiration for your own custom data structures.

### Storage

The `Storage` class represents the only data store on the blockchain.  All blockchain data uses this one interface.

Contracts can import a reference to `storage` from `near-sdk-as`.

```ts
import { storage } from 'near-sdk-as'

// contract code below this line can now make use of the storage object
```

The complete interface for the `Storage` class is provided by the snippet below with inline comments.

```ts
// REFERENCE ONLY
// this is the interface provided by the storage object

class Storage {
  // read and write text to storage
  setString(key: string, value: string): void
  getString(key: string): string | null

  // read and write an array of bytes to storage
  setBytes(key: string, value: Uint8Array): void
  getBytes(key: string): Uint8Array | null

  // check whether a key exists
  contains(key: string): bool
  hasKey(key: string): bool       // alias for contains()

  // delete a key from storage
  delete(key: string): void

  // get string and data objects defined in model.ts
  // return defaultValue if key not found
  // (prefer getPrimitive<T> for bool or integer and getSome<T> if key is known to exist)
  set<T>(key: string, value: T): void
  get<T>(key: string, defaultValue: T | null = null): T | null

  // get bool or integer value stored under the key
  // return defaultValue if key not found
  // throw if any other type (use get<T>)
  // (prefer get<T> for string or data objects defined in model.ts and getSome<T> if key is known to exist)
  getPrimitive<T>(key: string, defaultValue: T): T

  // get bool, integer, string and data objects defined in model.ts
  // throw if key not found
  // (prefer get<T> for string or data objects defined in model.ts and getPrimitive<T> for bool or integer)
  getSome<T>(key: string): T
}
```

See the [`Storage` class implementation here](https://github.com/near/near-sdk-as/blob/master/assembly/sdk/storage.ts) for details


### Collections

Several collections are provided including `PersistentMap`, `PersistentVector` and `PersistentDeque`.

There are currently four types of collections. These all write and read from storage abstracting away a lot of what you might want to add to the storage object.

These collection wrap the `Storage` class with convenience methods so you must always use a unique storage prefix for different collections to avoid data collision.

```ts
import {
  PersistentMap,      // implementation of a map you would find in most languages
  PersistentVector,   // implementation of an array you would find in most languages
  PersistentDeque,    // implementation of a deque (bidirectional queue)
} from 'near-sdk-as'

// contract code below this line can now make use of these collections
```

#### PersistentMap

*Acts like a map you would find in most languages*

A map class that implements a persistent unordered map.  Note that `PersistentMap` doesn't store keys, so if you need to retrieve them, include keys in the values.

- To create a map
  ```ts
  let map = new PersistentMap<string, string>("m")
  ```

- To use the map
  ```ts
  m.set(key, value)
  m.get(key)
  ```

The complete interface for the `PersistentMap` class is provided by the snippet below with inline comments.

```ts
// REFERENCE ONLY
// this is the interface provided by the PersistentMap object

class PersistentMap<K, V> {
  constructor(prefix: string)                              // unique prefix to avoid data collision

  set(key: K, value: V): void                              // wraps Storage#set<V>
  get(key: K, defaultValue: V | null = null): V | null     // wraps Storage#get<V>
  getSome(key: K): V                                       // wraps Storage#getSome<V>, use if key is known to exist

  contains(key: K): bool                                   // wraps Storage#contains
  delete(key: K): void                                     // wraps Storage#delete
}
```

Sample code using `PersistentMap` is in the [tests for `near-sdk-as`](https://github.com/near/near-sdk-as/blob/master/assembly/__tests__/runtime/main.ts)


#### PersistentVector

*Acts like an array*

A vector class that implements a persistent array.

  - To create a vector
    ```ts
    let vec = new PersistentVector<string>("v")
    ```
  - To use the vector
    ```ts
    vec.push(value)
    vec.pop(value)
    vec.length
    ```

The complete interface for the `PersistentVector` class is provided by the snippet below with inline comments.

```ts
// REFERENCE ONLY
// this is the interface provided by the PersistentVector object

class PersistentVector<T> {             // referred to as "pv" below
  constructor(prefix: string)         // unique prefix to avoid data collision

  containsIndex(index: i32): bool     // confirms that index is within range
  get length(): i32                   // get length of the pv
  get isEmpty(): bool                 // check whether pv is empty

  @operator("[]")                     // (index: i32): T                  wraps Storage#getSome<T> with checks
  @operator("[]=")                    // (index: i32, value: T): void     wraps Storage#set<T> with checks
  @operator("{}")                     // (index: i32): T                  wraps Storage#getSome<T>
  @operator("{}=")                    // (index: i32, value: T): void     wraps Storage#set<T>

  push(element: T): i32               // wraps Storage#set<T>
  pushBack(element: T): i32           // alias for pv.push

  pop(): T                            // wraps Storage#get<T> and Storage#delete
  popBack(): T                        // alias for pv.pop

  get front(): T                      // get first/front of pv (wraps Storage#getSome with checks)
  get first(): T                      // alias for pv.front

  get back(): T                       // get last/back of pv (wraps Storage#getSome with checks)
  get last(): T                       // alias for pv.back
}
```

Sample code using `PersistentVector` is in the [tests for `near-sdk-as`](https://github.com/near/near-sdk-as/blob/master/assembly/__tests__/runtime/main.ts)


#### PersistentDeque

*Implementation of a deque (bidirectional queue)*

A deque class that implements a persistent bidirectional queue.

  - To create a deque
    ```ts
    let dq = new PersistentDeque<string>("d")
    ```
  - To use a deque
    ```ts
    dq.pushFront(value)
    dq.popBack()
    ```

The complete interface for the `PersistentDeque` class is provided by the snippet below with inline comments.

```ts
// REFERENCE ONLY
// this is the interface provided by the PersistentDeque object

class PersistentDeque<T> {            // referred to as "pdq" below
  constructor(prefix: string)         // unique prefix to avoid data collision

  containsIndex(index: i32): bool     // checks whether pdq contains the given index
  get length(): i32                   // get length of the pdq
  get isEmpty(): bool                 // check whether pdq is empty

  @operator("[]")                     // (index: i32): T                  wraps Storage#getSome<T> with checks to get T
  @operator("{}")                     // (index: i32): T                  wraps Storage#getSome<T> to get T
  @operator("{}=")                    // (index: i32, value: T): void     wraps Storage#set<T> to set value<T> at index

  pushFront(element: T): i32          // add element to front of pdq (wraps Storage#set<T>)
  popFront(): T                       // get and remove first/front element (wraps Storage#getSome<T> and Storage#delete)

  pushBack(element: T): i32           // add element to back of pdq (wraps Storage#set<T>)
  popBack(): T                        // get and remove last/back element (wraps Storage#getSome<T> and Storage#delete)

  get front(): T                      // get first/front of pdq (wraps Storage#getSome with checks)
  get first(): T                      // alias for pdq.front

  get back(): T                       // get last/back of pdq (wraps Storage#getSome with checks)
  get last(): T                       // alias for pdq.back
}
```

Sample code using `PersistentDeque` is in the [tests for `near-sdk-as`](https://github.com/near/near-sdk-as/blob/master/assembly/__tests__/runtime/main.ts)

<blockquote class="info">
<strong>did you know?</strong><br><br>

If you're coming from JavaScript, you might not be familiar with the type declaration in the two brackets `<>`.

In AssemblyScript, need to declare the types that any collection is going to take.  This enforces that any data added to the collection must have the same type.  If not, an error will be raised by the AssemblyScript compiler insisting that the types must all match.  This adds a little up-front effort when programming but means far fewer run time errors happen because of type mismatches.

</blockquote>


<blockquote class="warning">
<strong>heads up</strong><br><br>

The letter passed in as an argument (ie. `"m"` in the case of the `PersistentMap`) is the key that gets assigned as a prefix to distinguish the collections from one another (precisely because they're persisted using the same underlying key-value storage that is controlled by the contract account).

</blockquote>

It's important when storing data to carefully consider the key in the key-value pair.

With collection types, be sure to add a **prefix** that is unique to the account which will own the data *when the contract is deployed*.

To understand why, consider that a single representation of "storage" (set of key-value pairs) is used by each account and so each key in the key-value pair must uniquely identify its data.

This should come as no surprise until we consider that a collection type like `PersistentVector` (which behaves like an array) is using *exactly the same underlying account storage*.  This is why we expose a **prefix** in the constructor of these collection types -- to avoid data collision with other collections.

This means that storage used by a contract must always use a **unique storage prefix** for each collection to avoid data collision.

NEAR persists all blockchain data as part of an account.  For example, all `Storage` data is stored with the account that controls / owns the related contract.  This is often an account dedicated to funding the operation of the contract (as is the case with all NEAR examples) or, if the design of your application requires that contracts are deployed to individual user accounts (as with one proposed design of an [open web](https://github.com/metanear/metanear-web)) then the contract, along with all of its data, will be stored on each user account that participates in the application.

You can read more about accounts [here](/docs/concepts/account)

## AssemblyScript Tips

### Arrays

Arrays are similar to Arrays in other languages. One key difference is in how they are initialized, and what that means for your app. Check out more details in the [AssemblyScript docs](https://assemblyscript.org/stdlib/array.html#array).

*(from the AssemblyScript documentation):*

```ts
// The Array constructor implicitly sets `.length = 10`, leading to an array of
// ten times `null` not matching the value type `string`. So, this will error:
var arr = new Array<string>(10);
// arr.length == 10 -> ERROR

// To account for this, the .create method has been introduced that initializes
// the backing capacity normally but leaves `.length = 0`. So, this will work:
var arr = Array.create<string>(10);
// arr.length == 0 -> OK

// When pushing to the latter array or subsequently inserting elements into it,
// .length will automatically grow just like one would expect, with the backing
// buffer already properly sized (no resize will occur). So, this is fine:
for (let i = 0; i < 10; ++i) arr[i] = "notnull";
// arr.length == 10 -> OK
```

There is currently no syntactic sugar for array iterators like `map`.

### Iteration

Iteration follows the standard AssemblyScript format:

```ts
// set i to a type u64
for (let i: u64 = startIndex; i < someValue; i++) {
  // do stuff
}
```

### Classes

Classes are normal AssemblyScript classes and more information can be found in the [AssemblyScript (a dialect of TypeScript) Handbook](https://www.typescriptlang.org/docs/handbook/classes.html). We don't have structs, we have AssemblyScript classes instead.

You will generally want to define your classes in a different file and then import them:

```ts
// 1. define the class in the `assembly/model.ts` file
export class PostedMessage {
  sender: string;
  text: string;
}
```

```ts
// 2. Import the class to your `assembly/main.ts` file
import { PostedMessage } from "./model";
```

There are no structs.

### Functions

Function declarations follow standard AssemblyScript conventions, including the parameters they take, optional arguments and return values. See the [AssemblyScript (a dialect of TypeScript) Handbook](https://www.typescriptlang.org/docs/handbook/functions.html) for more info.

### Events

Sometimes you want your front end to automatically update if something changes on the back end. For example, if you have a messaging app that should update your screen when your friend sends you a message. Currently, you will need to poll the chain to make this happen.

In the future, we may expose event emitters and listeners as syntactic sugar. If this is important to you, reach out [on Discord](http://near.chat).

### Math

Mathematical operations in AssemblyScript are done in the same way as JavaScript. See more in [these AssemblyScript examples](https://github.com/AssemblyScript/examples).


```ts
export namespace math {
  export function hash32Bytes(data: Uint8Array): u32        // hash a given Uint8Array. Returns hash as 32-bit integer.
  export function hash32<T>(data: T): u32                   // hash given data. Returns hash as 32-bit integer.
  export function hash<T>(data: T): Uint8Array              // hash given data. Returns hash as 32-byte array.
  export function randomBuffer(len: u32): Uint8Array        // fill a buffer of length len with random data
  export function sha256(inp: Uint8Array): Uint8Array       // return a SHA256 hash of the input
  export function keccak256(inp: Uint8Array): Uint8Array    // return a keccak256 hash of the input
  export function keccak512(inp: Uint8Array): Uint8Array    // return a keccak512 hash of the input
  export function randomSeed(): Uint8Array                  // return a random seed (used by randomBuffer() above)
}
```

You can find several examples of in our GitHub organization [using this link](https://github.com/search?utf8=%E2%9C%93&q=org%3Anearprotocol+randomBuffer+filename%3Amain.ts&type=Code)

```ts
// a function to generate DNA for Crypto Corgis
function generateRandomDna(): string {
  let buf = math.randomBuffer(DNA_DIGITS);
  let b64 = base64.encode(buf);
  return b64;
}
```

```ts
// a function to generate random numbers
function randomNum(): u32 {
  let buf = math.randomBuffer(4);
  return (
    (0xff & buf[0]) << 24 |
    (0xff & buf[1]) << 16 |
    (0xff & buf[2]) << 8 |
    (0xff & buf[3]) << 0
  ) % 100;
}

// using the randomNum() function above to build a useful heuristic
function generateRandomLabel(): string {
  let rand = randomNum();
  if (rand > 10) {
    return "COMMON";
  } else if (rand > 5) {
    return "UNCOMMON";
  } else if (rand > 1) {
    return "RARE";
  } else if (rand > 0) {
    return "VERY RARE";
  } else {
    return "ULTRA RARE";
  }
}
```

### Time

Time is one of the most difficult concepts in blockchains. In a single-server-based environment like web developers are used to, the server's (or database's) clock is ok to rely on for creating timestamps.

Because the blockchain's state is determined by a consensus among many nodes and must be deterministic and adversary-resistant, there is no way to settle on a "correct" clock time while code is being run.

You can pull timestamps from the client side (ie. the JavaScript running on the user's computer) but that should come with all the usual warning about not trusting anything a client sends.

For less exact measures of time, the block index value is sufficient. This will look something like:

```ts
// Note: Not implemented yet...
contractContext.blockIndex();
```

Some solutions to the time issue include using "trusted oracles" but that's outside the scope of this doc.

## Potential Gotchas

### View and Change functions

There are two types of functions that can interact with the blockchain -- "view" functions and "change" functions.
The difference, however, does not exist on the contract level. Rather, developers, if they wish to use view functions,
can mark certain functions to be "view functions" in the frontend or calling them through `near view` in [NEAR Shell](https://github.com/nearprotocol/near-shell).

1. **View** functions do not actually change the state of the blockchain. Imagine a function which, for instance, just checks the balance of a particular account. Because no state is changed, these functions are lightweight and generally safe.  \
  \
A view function will fail if it tries to change the state or calls the following binding methods that are exposed from nearcore:
- `signer_account_id`
- `signer_account_pk`
- `predecessor_account_id`
- `attached_deposit`
- `prepaid_gas`
- `used_gas`
- `promise_create`
- `promise_then`
- `promise_and`
- `promise_batch_create`
- `promise_batch_then`
- `promise_batch_action_create_account`
- `promise_batch_action_deploy_account`
- `promise_batch_action_function_call`
- `promise_batch_action_transfer`
- `promise_batch_action_stake`
- `promise_batch_action_add_key_with_full_access`
- `promise_batch_action_add_key_with_function_call`
- `promise_batch_action_delete_key`
- `promise_batch_action_delete_account`
- `promise_results_count`
- `promise_result`
- `promise_return`

2. **Change** functions modify state, for example by updating the balance someone holds in their account. You need to be careful with these functions so they typically require explicit user authorization and are treated somewhat differently.

### Private and Public Functions

Methods with names prepended by an underscore `_` are not callable from outside the contract. All others are available publicly in the client.

```ts
function _myPrivateFunction(someInput: string): void {
  // Code here!
}

export function myPublicFunction(someInput: string): void {
  // Code here!
}
```
