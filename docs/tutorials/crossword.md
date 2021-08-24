---
id: crossword
title: Crossword Tutorials
sidebar_label: Crossword Tutorials
---

Writing distributed applications (dApps) and smart contracts involves a paradigm shift. This paradigm includes new concepts (state, transfer, account, etc.) that are critical to building full-fledged applications on the blockchain. This way of thinking also has its own learning curve, and might feel like an additional entry barrier. This tutorial series provides easy onboarding to NEAR concepts, Rust, and smart contract development.

## Introduction

The example presented in this article is a simple Crossword puzzle game. In this game, anyone can play and try to solve the puzzle. The first player to submit the correct answers gets a 10 Ⓝ prize. Behind this well-known game, a smart contract validates the answers and awards tokens to the winner.

In this tutorial, we’ll first look at the crossword game from the player’s point of view, and then focus on the smart contract supporting the game, taking the developer's perspective. No previous blockchain development experience is required to follow this guide. The concepts and tools required to complete this tutorial will be explained along the way.

> **Tip:** If you're familiar with smart contract development, you may choose to jump straight into the [crossword source code](https://github.com/near-examples/near-crossword).

## Iterations

To flatten the learning curve, we are dividing the crossword puzzle solution into three iterative versions. Each version will add new features and grow in complexity, and we'll explain these changes throughout the series. 

### Crossword v0

The Crossword puzzle in the first version is just a piece of paper. Literally it only needs a physical sheet of paper with a crossword on it, and access to a computer with Internet once it’s solved in ink.
Players will use their computers to submit a solution after solving the puzzle.

The first version (v0) of the Crossword smart contract is only focused on validating the answers and sending a reward to the winner. This minimum solution needs:

- Sheet of paper with the crossword puzzle
- Computer with Internet
- Existing NEAR account

### Crossword v1

This improved version (v1) of the Crossword smart contract can create a NEAR `mainnet` account and send the reward to it. This version requires:

- Sheet of paper with the crossword puzzle
- Computer with Internet


### Crossword v2

The final version of the Crossword (v2) adds a frontend with the digital crossword puzzle. It has only one requirement:

- Computer with Internet


## Version 0

This version is really simple: the crossword owner designs a puzzle, and shares the hints along with a blank puzzle sheet to the players. Participants write down words that match the clues, and they fill in the puzzle. When complete, they have a seed phrase.

```
e.g.,
                 s
  sharding       i
  u              m
  b     i        u
  a     nonfungible
  c     d        a
 accesskey       t
  o     x     defi
  u     e     a  o
  n     rpc   o  n
  t

```

### The first user to solve it wins

Steps for the player (solving the crossword) are:

1. Find pen.
2. Solve the crossword puzzle.
3. Install NEAR CLI.
4. Create the key pair from the solution.
5. Send a transaction to the crossword puzzle smart contract.
6. Profit! (receive 10 Ⓝ)

Okay back on track…
(end) this is all well and good from the user’s perspective, but what was the setup here? Let’s rewind and talk about how this puzzle would be set up

## Seed phrase

> **Tip:** A seed phrase (also called mnemonic seed or mnemonic phrase) is a random sequence of words. This sequence, entered in the right order, is converted using formulas to numbers that gives access to a wallet and the public/private key pairs that it contains.

Let's apply it to our puzzle: each word of the seed phrase corresponds to the hint numbers on the crossword, with across before down when applicable.

In this example:

1. sharding 
2. subaccount 
3. accesskey 
4. indexer 
5. nonfungible 
6. rpc 
7. simulation
8. init 
9. defi 
10. dao

Next step is to install [`near-cli`](/docs/tools/near-cli) so you can generate the key pair based on the crossword answers.

> **Tip:** follow the instructions from the `near-cli` [installation guide](/docs/tools/near-cli#setup). If you already have the command line interface, you can skip these steps.

### Create key pair

Now you can use NEAR CLI and generate a key pair based on the crossword answers. Open a terminal window and type:

```bash
near generate-key v0.crossword.puzzle.near --seedPhrase "sharding subaccount accesskey indexer nonfungible rpc simulation init defi dao"
```

You should get:

```
Key pair with ed25519:CpqW...2uLp public key for an account "v0.crossword.puzzle.near"
```

The key pair is created. You have created a key for an account using the crossword answers as seed phrase.

### Keys in NEAR

Let’s briefly talk about keys in NEAR. Access keys can be saved in different storage locations:

- File storage
- Browser local storage
- Computer memory only

In this case by using NEAR CLI you generated a file on your computer. These live in the operating system’s “home directory” in a folder for the network you’re using. (e.g., `testnet`, `mainnet`, `local`, etc.)

In macOS and Linux:

```
~/.near-credentials/testnet/v0.crossword.puzzle.near.json
```

> **Note:** you can have a set of fallbacks for these keys, like you can look in one place, then the next place, etc.

Boy that’s a long account name, `v0.crossword.puzzle.near`, oh my. What’s up with accounts with periods like that? We’ll get to that.

## Call the smart contract

You're ready to call the smart contract and submit the crossword solution:

```bash
near call v0.crossword.puzzle.near submit_solution '{"memo": "Mike King of da Hill!", "reward_account": "mike.near"}' --accountId v0.crossword.puzzle.near
```

The contract checks the public key, verifies that the seed phrase derived from the “crossword solution” is correct, then stores a memo on-chain of the winner bragging, and where to send the “reward” to.

About `near call`: as opposed to it’s sister `near view`, `near call` calls a mutable function, costs gas, can make cross-contract calls, etc. Where `near view` is read-only.


> **Note:** the first thing the method `submit_solution` does is assert that the signer’s public key is what it’s supposed to be. This is an interesting and very atypical kind of check, but this is a unique use case. What’s unique here is that you’re calling a smart contract using a key that belongs to the smart contract. Like it’s calling itself? Yes.

### Avoid front-running

Front running is the act of placing a transaction in a queue with the knowledge of a future transaction. For example, on the Ethereum blockchain, front running can occur when bots are able to quote a higher gas price than a pending trade, thus, hastening its processing.

If you can send parameters to the method `submit_solution`, why not just send the crossword solution as parameters?

Because we want to avoid front-running. One similarity that NEAR has with Ethereum is the idea of a mempool where transactions sit before they’re picked up and executed. By using the answers as a seed phrase, no one can front-run the solution unless they’ve created the key.

Recommended reading: [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)

### “memo” for retro arcade feels

Let’s look at the `memo` parameter:

- Store all winners and memos, as well as a scoreboard of 10 recent winners.

This could be useful later, allowing folks to look back at all previous crossword puzzles and the winners’ associated memos.

### Quick recap

- Someone wrote a smart contract.
- Some user crafted a puzzle and the answers.
- There was more than 10 Ⓝ in that account containing the contract to pay out the reward.
- A special, function-call access key was added to the contract.


```
near generate-key v0.crossword.puzzle.near --seedPhrase "sharding subaccount accesskey indexer nonfungible rpc simulation init defi dao"

Key pair with ed25519:CpqW...2uLp public key for an account "v0.crossword.puzzle.near"
```

> **Note:** We created a key pair, note the public key `CpqW...`.


```
near keys v0.crossword.puzzle.near
```

NEAR CLI will show all the keys associated with a NEAR account. 
Note that you have `submit_solution` as the only method name in the array. 

> **Tip:** you can have multiple keys that are either function-call or full-access keys. 

```json
Keys for account v0.crossword.puzzle.near
[
  {
    public_key: 'ed25519:CpqW...2uLp',
    access_key: { 
    	nonce: 0, 
    	permission: {
    		FunctionCall: {
    			allowance: '30000000000000000000',
    			receiver_id: 'v0.crossword.puzzle.near',
    			method_names: [ 'submit_solution' ]
    		}
    	} 
    }
  },
  {
    public_key: 'ed25519:Aru3jxYxvBVFiVrFNFYA8SACngfUXtAjE4p9YQnHtauc',
    access_key: { nonce: 55169034000008, permission: 'FullAccess' }
  }
]

```


This is a good time to mention that sometimes you’ll see this as an empty array, and this means that all methods can be called. (Unless it requires a deposit, which can only be done with a full-access key. This is another point to raise, the allowance cannot be transferred as Ⓝ, it can only be used as gas for transactions to that one method.)

## Access keys in NEAR

NEAR uses human readable account IDs instead of a public key hash as the account identifier and many keys (public/private key pairs) can be created for each account that we call [Access Keys](/docs/concepts/account#access-keys). 

Currently, there are two types of access keys:

- Function-call access (`FunctionCall`)
  - Great for logging into decentralized apps (dApps)
  - Onboarding users who don’t have a NEAR account
  - Sky’s the limit
- Full access (`FullAccess`)
  - Should be protected
  - Used to deploy a contract, send Ⓝ and other powerful activities
  - Actions


### Actions for crossword submission

We’ve seen three things happen:

1. Create a key pair locally, using `near-cli` (no interaction with a blockchain)
   > That was the NEAR CLI command `near generate-key` with the flag `seedPhrase`

2. Use that key pair to send a transaction calling a method (`submit_solution`)
   > `near call` command, which changes state on the blockchain

3. See the keys available on an account, meaning at some point they were added.
   > `near keys` command, which simply reads from the blockchain


The NEAR _Actions_ under the hood:

1. `FunctionCall` — when you submit the solution with a memo
2. `AddKey` — when the puzzle and answer was created
3. `Transfer` — paying 10 Ⓝ to the first correct submission

Returning to the crossword example so far: as we talk about iterations on the MVP, we may consider removing the access key, too.

### All Actions

If you want to learn more about _Actions_, please visit [nomicon.io](https://nomicon.io), your official resource for [NEAR spec details](https://nomicon.io/RuntimeSpec/Actions.html).

```rust
#![allow(unused)]
fn main() {
	pub enum Action {
	    CreateAccount(CreateAccountAction),
	    DeployContract(DeployContractAction),
	    FunctionCall(FunctionCallAction),
	    Transfer(TransferAction),
	    Stake(StakeAction),
	    AddKey(AddKeyAction),
	    DeleteKey(DeleteKeyAction),
	    DeleteAccount(DeleteAccountAction),
	}
}
```

> **Note:** `Stake` is different than delegating. Only validators will use the `Stake` Action

### Crossword Actions in use

The _Actions_ we’ve discussed were “sent to the blockchain.”
You can also use _Actions_ inside a smart contract. These can only act on that account itself. They can:

- add a key to itself
- remove a key from itself
- even deploy to itself. It cannot deploy to a random account. However, it can deploy during creation of a subaccount.


### Subaccounts

We’ll get back to the crossword puzzle, but let’s take a small detour.
As mentioned, NEAR accounts are human-readable, like:
`mike.near`.

Unlike Ethereum Name Service (ENS), it’s not a mapping; this is your actual account name.
`mike.near` can create `aloha.mike.near`, but `aloha.mike.near` is a completely separate account, and by default can’t be controlled by `mike.near` afterwards.
By default, `aloha.mike.near` might as well be `kevin.near`. A difference, however, is that you know `mike.near` created it, which is quite handy.
Also, note that `mike.near` can’t create `hello.folks.mike.near`, it can only create one level deeper.

There are also such a thing as top-level accounts, mainnet accounts that don’t end in `.near`, but check that out [in the docs](https://nomicon.io/DataStructures/Account.html).


### Batch Actions in Rust

As stated, an account can deploy during creation of a subaccount, so you can “batch” _Actions_ within a smart contract. 
For instance, creating a subaccount, deploying code, then making a function call to it.

> **Note:** batch _Actions_ only apply to a single contract. You cannot batch a `FunctionCall` Action to Contract A, and another to Contract B.

This allows for factories. For example:


```rust
#[near_bindgen]
impl CrossContract {
    pub fn deploy_status_message(&self, account_id: String, amount: U128) {
        Promise::new(account_id)
            .create_account()
            .transfer(amount.0)
            .add_full_access_key(env::signer_account_pk())
            .deploy_contract(
                include_bytes!("../../status-message/res/status_message.wasm").to_vec(),
            );
    }
```

> **Tip:** to learn more about batch actions, check `near-sdk-rs` [examples](https://github.com/near/near-sdk-rs/).

Notice in the middle of the code how these actions are chained.
Oh interesting, `.transfer`?. In our example, if a person is the first to submit an answer, they get 10 NEAR as a prize.
Also, look at the line below transfer, `env::signer_account_pk()`: that gets the public key of the signer.

The signer’s public key is essentially the output of the crossword puzzle. This is the thing that’ll be checked immediately when someone submits a solution.


## Smart contract

### Crossword MVP

| Creator to do | Use (or can use) |
|-------|------------------|
| Create puzzle + answer | Brain, NEAR docs |
| Deploy contract | NEAR CLI |
| Add key (answer to puzzle) | NEAR CLI |
| Add at least 10 Ⓝ as reward | NEAR CLI |


| Player to do | Use (or can use) |
|-------|------------------|
| Solve crossword puzzle | Sheet of paper, brain, NEAR docs |
| Create key | NEAR CLI |
| Submit answer | NEAR CLI |


### Version 0

The contract needs to:

- have at least 10 Ⓝ for the reward
- contain a function called `submit_solution` that checks the signer’s public key `env::signer_account_pk()`
- store the `memo` (bragging message) on chain
- use the `Transfer` Action for the 10 Ⓝ reward to the winner`Promise::new(reward_account).transfer(amount);`


### How to start

The preferred programming language for writing smart contracts on NEAR is [Rust](https://www.rust-lang.org/). If you don't have the Rust toolchain, [follow these instructions](/docs/develop/contracts/rust/intro#installing-the-rust-toolchain) to install Rust on your computer.

In Rust, fields and methods are in a `struct`; if you remember that from C++ or Java, Rust is structs everywhere.

> **Tip:** if you're new to Rust, [check out Rust book to get familiar](https://doc.rust-lang.org/1.30.0/book). Chapters 1-11 should be enough to started. (The chapters are real short, so 45 minutes is enough time with it) 


Unit tests are okay for simple things and will be good enough for Version 0 and 1 of the crossword puzzle. For Version 2 you can add simulation tests, but we won’t cover that at this time.

Unit tests are a good way to iterate, especially when getting started with Rust. If you quickly want to check, “did I do this right?” this is a good approach, because there is no “main function” and you can’t just run the smart contract. This is better explained in the [Rust Quick-start guide](/docs/develop/contracts/rust/intro).


### Specialized collections

Let’s return to the retro arcade scoreboard idea, with the `memo`.
You’d want to store the memo, probably as a mapping. Like, unique identifier for the puzzle » to the » memo of the winner.

If you end up having tons of crossword puzzles this may not be the best solution, especially if your scoreboard only shows the last 10 winners.
A standard `HashMap` would load the entire map every time. 
NEAR has [specialized collections](https://docs.rs/near-sdk/3.1.0/near_sdk/collections) to consider using instead.


#### Structs

More often than not these collections are used in the core contracts at NEAR, especially for data structures that have the potential to grow quite large.


- `LazyOption`:	An persistent lazy option, that stores a value in the storage.
LegacyTreeMap	
- `TreeMap`: based on AVL-tree
- `LookupMap`:	An non-iterable implementation of a map that stores its content directly on the trie.
- `LookupSet`: An non-iterable implementation of a set that stores its content directly on the trie.
- `TreeMap`:	TreeMap based on AVL-tree
- `UnorderedMap`:	An iterable implementation of a map that stores its content directly on the trie.
- `UnorderedSet`:	An iterable implementation of a set that stores its content directly on the trie.
- `Vector`:	An iterable implementation of vector that stores its content on the trie. Uses the following map: index -> element.

> **Tip:** [NEAR SDK Collections](https://docs.rs/near-sdk/3.1.0/near_sdk/collections)


### Unit tests: stuff you can modify

Just highlighting the unit tests, this is a short version of how you set up unit tests.
`get_context` is a common helper function, allowing you to kind of override a set of default contextual info about a transaction.

```rust
mod tests {
/* uses */

fn get_context(pub_key: Vec<u8>) -> VMContextBuilder {
	let mut builder = VMContextBuilder::new();
	builder.signer_account_pk(pub_key);
	builder
}

#[test]
fn test_something() {
	let pub_key = "GhrYaAMZaCwknVkc3gddDxsVumU6ZrwoRFKPxQTPgnU8";
	let context = get_context(Vec::from(pub_key));
	testing_env!(context.build());
	// testing logic here
}
```

Great for testing the given public key for the solution.

To be explicit, let’s look at the `VMContextBuilder` to see what other things we can modify besides the `signer_account_pk` (for public key) here.


```rust
impl VMContextBuilder {
	pub fn new() -> Self {
		Self {
			context: VMContext {
				current_account_id: alice(),
				signer_account_id: bob(),
				signer_account_pk: vec![0u8; 32],
				predecessor_account_id: bob(),
				input: vec![],
...				
```

Common issue: using `signer_account_id` when you mean `predecessor_account_id`.

Ideas for crossword unit tests:

- Correct/incorrect public key
- memo is at most 32 chars
- “10 most recent winners” scoreboard function works as expected


## How do I begin?

To best illustrate concepts, a suggested development plan could be:

1. Focus on building Version 0 with the 10 Ⓝ reward hardcoded.
2. Add reward as a field to the contract so reward can change.
3. Add `memo` field and "most recent winners".


## Recap of learnings

- NEAR CLI can create keys & send transactions
- How keys work
- How NEAR accounts/subaccounts work
- What Actions are
- How batch Actions work
- Basic “sections” of a simple contract
- That NEAR collections may be preferable
- Unit tests vs. simulation tests

## Resources


- [near-api-js](https://near.github.io/near-api-js/): A frontend can also use `near-api-js`, the same library used in with NEAR CLI.
- [Crossword layout generator](https://github.com/MichaelWehar/Crossword-Layout-Generator): takes in a list of answers and outputs a crossword layout. - https://www.sitepoint.com/how-built-pure-css-crossword-puzzle
The program does not generate the answers or the clues.
- https://mitchum.blog/building-a-crossword-puzzle-generator-with-javascript/
