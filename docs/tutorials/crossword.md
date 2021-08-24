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

Let’s look at that parameter on the second line of the screenshot: `memo`

- Maybe limit of 32 characters or so.
- Store all winners and memos, as well as a scoreboard of 10 recent winners.

Photo by Element5 Digital on Unsplash
Besides, this could be useful later for learning
Allow folks to look back at all previous crossword puzzles and the winners’ associated memos.

### What happened before?

- Someone wrote a smart contract.
- Some user crafted a puzzle and the answers.
- There was more than 10 Ⓝ in that account containing the contract to pay out the reward.
- A special, function-call access key was added to the contract.


We can talk about storing multiple crossword puzzles later, maybe from different creators, but not now.

```
near generate-key v0.crossword.puzzle.near --seedPhrase "sharding subaccount accesskey indexer nonfungible rpc simulation init defi dao"

Key pair with ed25519:CpqW...2uLp public key for an account "v0.crossword.puzzle.near"
```

```
near keys v0.crossword.puzzle.near
```

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

Top is a recap that we created a key pair created earlier, note the public key.
In the bottom we see a NEAR CLI command that shows all the keys associated with a NEAR account. Yes you can have multiple keys that are either function-call or full-access keys. {orange} (We’ll get to that on the next slide)
Note that we have `submit_solution` as the only method name in the array. [blue] 
This is a good time to note that sometimes you’ll see this as an empty array, and this, counterintuitively perhaps, means all methods can be called. (Well, unless it requires a deposit, which can only be done with a full-access key. This is another point to raise, the allowance cannot be transferred as Ⓝ, it can only be used as gas for transactions to that one method.Also, we haven’t shown how these keys got added, so don’t feel lost, but let’s talk a bit about this…

## Access keys in NEAR (briefly)

- Function-call access
  - Great for logging into decentralized apps (dApps)
  - Onboarding users who don’t have a NEAR account
  - Sky’s the limit
- Full access
  - Should be protected
  - Used to deploy a contract, send Ⓝ and other more powerful
  - Actions


### Actions for crossword submission

We’ve seen three things happen:

1. Create a key pair locally (no interaction with a blockchain)
2. Use that key pair to send a transaction calling a method
3. See the keys available on an account, meaning at some point they were added.

The NEAR “Actions” under the hood:

1. `FunctionCall` — when you submit the solution w/ memo
2. `AddKey` — when the puzzle and answer was created
3. `Transfer` — paying 10 Ⓝ to the first correct submission

Returning to the crossword example so far…

That was the NEAR CLI command `near generate-key` with the flag `seedPhrase`
`near call` command, which changes state on the blockchain
`near keys` command, which simply reads from the blockchain
As we talk about iterations on the MVP, we may consider removing the access key, too.

### All Actions (real briefly)

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

[Your resource for NEAR spec details](https://nomicon.io)
Stake is different than delegating. Only validators will use the Stake Action
nomicon.io is an official NEAR site, not a community-contributed site 

### Crossword Actions in use

The Actions we’ve discussed were “sent to the blockchain.”
You can also use Actions inside a smart contract. These can only act on that account itself.
It can:

- add a key to itself
- remove a key from itself
- even deploy to itself. It cannot deploy to a random account. However, it can deploy during creation of a subaccount.

I want to emphasize the deploy to a random account because I’ve seen two fairly knowledgeable folks who missed this.
I swear we’ll get back to the crossword puzzle, but let’s take another detour.

### Subaccounts

Yeah. NEAR accounts are human-readable, like:
`mike.near`

Unlike Ethereum Name Service (ENS), it’s not a mapping; this is your actual account name.
`mike.near` can make `aloha.mike.near`
`aloha.mike.near` is a completely separate account, and by default can’t be controlled by `mike.near` afterward.
By default, `aloha.mike.near` might as well be `kevin.near`
A difference, however, is that you know `mike.near` created it, which is quite handy.
Also, note that mike.near can’t create `hello.folks.mike.near`, can only create “one level deeper”
There are also such a thing as top-level accounts, mainnet accounts that don’t end in `.near`, but check that out in the docs.
Let’s not get caught up in this, just a side quest

### Actions

From earlier slide:
“However, an account can deploy during creation of a subaccount.”
You can “batch” Actions within a smart contract. 
For instance, creating a subaccount, deploying code, then making a function call to it, etc.

From a previous slide, with a small addition. This allows for factories.
(end) we’ll look at code next

### Show me! Batch Actions in Rust

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

Memorize `near-sdk-rs` examples. The above taken from: https://github.com/near/near-sdk-rs/blob/d97fbcd122987f3a2db0cb3289c5a69275931c28/examples/cross-contract-high-level/src/lib.rs#L46-L52

Notice in the middle of the page how these actions are chained
Oh interesting, `.transfer` eh? Like if a person is the first to submit an answer, they get 10 NEAR as a prize, kinda transfer, yes.
Also, look at the line below transfer, `env::signer_account_pk()`, yes, that gets the public key of the signer.
These are blatant hints I’m throwing out as we want to build this thing. The signer’s public key is essentially the output of the crossword puzzle. This is the thing that’ll be checked immediately when someone submits a solution.
Batch Actions only apply to a single contract. You cannot batch a FunctionCall Action to Contract A, and another to Contract B.
(We may even want to start calling this Batch Actions more)

### Needs for crossword MVP

Creator

| To do | Use (or can use) |
|-------|------------------|
| Create puzzle + answer | Brain, NEAR docs |
| Deploy contract | NEAR CLI |
| Add key (answer to puzzle) | NEAR CLI |
| Add at least 10 Ⓝ as reward | NEAR CLI |


Player


| To do | Use (or can use) |
|-------|------------------|
| Solve crossword puzzle | Sheet of paper, brain, NEAR docs |
| Create key | NEAR CLI |
| Submit answer | NEAR CLI |

Remember that one of the params is your NEAR account to send the reward to.
What else are we missing though?
What if a person doesn’t have a NEAR account already? How do they receive the 10 NEAR?
Okay, let’s control scope and not get too far ahead

## Iterations


### Version 0
The contract needs to:

- have at least 10 Ⓝ for the reward
- contain a function called `submit_solution` that checks the signer’s public key `env::signer_account_pk()`
- store the “memo” (bragging message) on chain
- use the Transfer Action for the 10 Ⓝ reward to the winner`Promise::new(reward_account).transfer(amount);`

Back to V0, let’s just focus on this.



### How do I begin?

The imports will typically be found automatically with your IDE; a few of us use CLion, which among the JetBrains family of products.
Fields and methods are in a struct, if you remember that from like C++ or Java, Rust is structs everywhere
Unit tests are okay for simple things and will be good enough for Version 0 and 1 of the crossword puzzle. For Version 2 we can add in simulation tests, but we won’t cover that at this time.
I will note briefly that unit tests are a good way to iterate, especially when getting started with Rust. If you quickly want to check, “did I do this right?” this is a good approach, because there is no “main function” and you can’t just run the smart contract. This is better explained in the Rust tutorial in docs.near.org

[Check out Rust book to get familiar!](https://doc.rust-lang.org/1.30.0/book)
Chapters 1-11 should be enough to started.

For instance, let’s return to the retro arcade scoreboard idea, with the memo.

45 minutes is enough time with the Rust book. The chapters are real short
You’d want to store the memo, probably as a mapping. Like, unique identifier for the puzzle » to the » memo of the winner. Yeah I think they mention that stuff in the Rust book and online tutorials

### Oh wait…

If you end up having tons of crossword puzzles this may not be the best, especially if your scoreboard only shows the last 10 winners.
A standard HashMap would load the entire map every time. 
NEAR has specialized collections to consider using instead.
Oh yeah, chapter 8 in the Rust book talks about Rust mapping, like this one…


#### Oh wait…

Structs

- `LazyOption`:	An persistent lazy option, that stores a value in the storage.
LegacyTreeMap	
- `TreeMap`: based on AVL-tree
- `LookupMap`:	An non-iterable implementation of a map that stores its content directly on the trie.
- `LookupSet`: An non-iterable implementation of a set that stores its content directly on the trie.
- `TreeMap`:	TreeMap based on AVL-tree
- `UnorderedMap`:	An iterable implementation of a map that stores its content directly on the trie.
- `UnorderedSet`:	An iterable implementation of a set that stores its content directly on the trie.
- `Vector`:	An iterable implementation of vector that stores its content on the trie. Uses the following map: index -> element.

[NEAR SDK Collections](docs.rs/near-sdk/3.1.0/near_sdk/collections)

Phew, glad we caught that. More often than not these collections are used in the core contracts at NEAR, especially for data structures that have the potential to grow quite large.
Anyway, besides that enjoy your journey with the Rust book linked earlier; it’s good stuff. And buy a Rust Ferris plushie, too.

#### Zooming in…
Great for testing the given public key for the solution.

Just highlighting the unit tests, this is a short version of how you set up unit tests.
`get_context` is a common helper function, allowing you to kind of override a set of default contextual info about a transaction.
To be explicit, let’s look at the VMContextBuilder to see what other things we can modify besides the `signer_account_pk` (for public key) here.

### Unit tests: stuff you can modify
Common gotcha: using `signer_account_id` when you mean `predecessor_account_id`.
🎗️
Ideas for crossword unit tests:

- Correct/incorrect public key
- memo is at most 32 chars
- “10 most recent winners” scoreboard function works as expected


Want to highlight some important ones here.
(end) What about paying out the winner? Looking at the left screenshot, that’s more of context around a transaction. Kind of. Like if Alice is the winner of a puzzle, looking this… it’s not clear how, or IF you can query her “user account” to see if the balance has increased… right? You can try to do this with unit tests, but when you do, listen that cold, sinking feeling in your stomach telling you it ain’t right.

## Simulation tests (the other kind)

Ideas for crossword simulation tests:

- Did the winner get their reward
- Did the cross-contract call to create a new account work
- Soon: how much gas does a common transaction burn

(end) okay, so that’s testing stuff. Let’s talk about Version 2 and beyond, with the frontend, where we abandon our pen.

## Enough talk, how do I begin?
To best illustrate concepts, suggested plan:

1. Focus on building Version 0 and 1 with the 10 Ⓝ reward hardcoded.
2. Add reward as a field to the contract so reward can change.

Document confusion / difficulties.
Well, there’s more talk yet, sadly.
This will allow us to experience firsthand what happens when you redeploy a contract after changing method parameters vs. changing/adding a field.

### in the sky for Version 2

The user does nothing but play the game.
The victor claims their reward after winning.
Version 2 is the frontend one where all you need is a computer with internet.
Release three different crosswords at 5 pm PST, CET, India Standard Time

Let’s talk this through…

Ah, shoot, and then we need that memo field… this is a mess.
Plus! Players are losing precious crossword-solving time filling this out.
Back to the drawing board

Let’s start over… what if we can just have this. Each key press is an event.The moment you complete the puzzle, it “reserves your spot” on chain, or… something.

K so like… how are we gonna do this.

We need something unique from the winner
github.com/fingerprintjs/fingerprintjs


coveryourtracks.eff.org/learn

### We need something unique from the winner
Keys in NEAR (briefly)
- File
- Browser local storage
- Only computer memory

When a user loads the page the first time, a random private key is created. 
The public key can be sent to submit_solution, maybe no other params? You tell me, you’re the one building it.
You may remember this middle part from an earlier slide, this is where we get to use the second type of key.

The blue key at the top is the “solution key” that’s derived from the seed phrase of the crossword answers.
The red key is a randomly-generated key pair, where the only place in the universe the private key lives is in the browser. We can add the public key to this contract as a way to “reserve it” if you will. To say, “hey, I solved the puzzle first, hold my spot while I think of a really clever memo and which account I want to fund or whether I want to create a new mainnet account.”


### All Actions (real briefly)

```rust
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
```

So this will potentially use all of the highlighted actions. All but `Stake` and `DeleteAccount`.

## Recap of learnings

- NEAR CLI can create keys & send transactions
- How keys work
- How NEAR accounts/subaccounts work
- What Actions are
- How batch Actions work
- How Promises work and are different from JS
- Basic “sections” of a simple contract
- That NEAR collections may be preferable
- Unit tests vs. simulation tests

Imports/setup, contract fields and methods, unit tests

### Oh look: resources!
Build a frontend!
A frontend can also use near-api-js, the same library used in with NEAR CLI.
https://www.sitepoint.com/how-built-pure-css-crossword-puzzle
Base a lot off of serde crate.
Add introduction section. Highlight important aspects like the crate containing sim-tests, as that will be hard to find way down in the left sidebar.


### Oh look, more resources!

- 🔥https://github.com/MichaelWehar/Crossword-Layout-Generator
- ✅https://mitchum.blog/building-a-crossword-puzzle-generator-with-javascript/


“This crossword layout generator takes in a list of answers and outputs a crossword layout. Our program does not generate the answers or the clues.”

So you can feed it an array of clues + answers and it’ll figure out the crossword puzzle arrangement for you.

### Reminders/thoughts for Version 0
Methods
- `submit_solution` see slide 7
- `get_scoreboard` (let’s say 10 most recent completed puzzles)

Fields
Mapping of public key » `CrosswordPuzzle` object (having status and memo)ORDifferent fields for uncompleted and completed puzzles?
Function-call access keys exist on smart contract.
Created using NEAR CLIORProgrammatically inside the contract?

### Various states of a puzzle
- Unsolved
- Solved
- Solved and claimed (Version 2 with frontend)

### Divide and conquer (if people want)

- Right Rust way to do scoreboard. (top 10 most recent winners’ messages)
- Gather a list of clues » words
- Try out the open source frontend links near the end of these slides
- Take notes of developer struggles
- Person with most dumb questions wins.
