# NEAR Crossword


## Outline

- Introduction
- Revisit versions
- Explain Version 1

## Introduction

> Present the crossword case



These slides
Crossword puzzle is a piece of paper
User will submit solution using their computer after solving
We’ll first look at it from the user’s perspective
Then crossword creator perspective
How to iterate

Literally a physical sheet of paper with a crossword on it, and access to a computer with internet once it’s solved in ink.
There are highlighted words mainly to draw attention to what might be new concepts.




## Iterations


### Version 0: Pen and paper only
Needs:
- Sheet of paper with crossword puzzle
- Computer with internet
- Existing NEAR account

The contract needs to:

- have at least 10 Ⓝ for the reward
- contain a function called `submit_solution` that checks the signer’s public key `env::signer_account_pk()`
- store the “memo” (bragging message) on chain
- use the Transfer Action for the 10 Ⓝ reward to the winner`Promise::new(reward_account).transfer(amount);`

Back to V0, let’s just focus on this.


### Version 1: Can create (and send reward to) mainnet account
Needs:
- Sheet of paper with crossword puzzle
- Computer with internet


### Version 2: Add frontend with digital crossword puzzle
Needs:
- Computer with internet

Don’t need:
- Pen
- NEAR account

---



## Version 1

### User doesn’t need mainnet account

The contract now needs to:

- be able to create a new account (not subaccount) and send the reward to it
- make a cross-contract call to the network top-level account. (term for accounts like `testnet` or `near` for the networks `testnet` and `mainnet`, respectively)
- figure out what happens if the new account is already taken, is invalid, or otherwise runs into problems

This last bullet point might be the most important part

### Version 1: User doesn’t need mainnet account

The contract now needs:
- figure out what happens if the new account is already taken, is invalid, or otherwise runs into problems. (linkdrop source below)

```
Promise::new(reward_account)
   .create_account()
   .add_full_access_key(new_public_key)
   .transfer(reward_amount)
   .then(ext_self::on_account_created_and_claimed(
       amount.into(),
       &env::current_account_id(),
       NO_DEPOSIT,
       ON_CREATE_ACCOUNT_CALLBACK_GAS,
   ))
```

This introduces us to the basic concept of a promise where we get a result. This is fundamental to understanding how to think in an asynchronous way.
Notice the “.then” which may look familiar in terms of Promises from other languages like JavaScript, we’ll get to that.
But let’s talk for a hot sec about the source code here, weirdly called Linkdrop for what we’re using it for

## Creating a new mainnet account

It’s possible to create a mainnet account using cross-contract calls.

### How?

Introducing the `linkdrop` contract:https://github.com/near/near-linkdrop
Note that the linkdrop contract is deployed to these accounts (on their respective networks):

- `betanet`
- `testnet`
- `near`


### Creating a new mainnet account
There’s ✌️nothing special✌️ about these accounts. When a user signs up for a testnet accounts and gets:
`aloha.testnet`
That is simply a subaccount of the account testnet.

The command below will create `aloha.near` by calling the method `create_account` on the smart contract deployed to the account named near. 

```bash
NEAR_ENV=mainnet
near call near create_account '{"new_account_id": "aloha.near", "new_public_key": "3cQ...tAT"}' --amount 15 --accountId mike.near --gas 3000000000000000
```

Okay maybe there some special designation in the genesis configuration that I can’t speak to, but for all intents and purposes they are accounts just like other accounts.

### JavaScript Promises are different

Let’s look at `async`/`await` in JavaScript.

```js
async function displayContent() {
  let coffee = fetchAndDecode('coffee.jpg', 'blob');
  let tea = fetchAndDecode('tea.jpg', 'blob');
  let description = fetchAndDecode('description.txt', 'text');

  let values = await Promise.all([coffee, tea, description]);
```


Reference:
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await



“These features basically act as syntactic sugar on top of promises, making asynchronous code easier to write and to read afterwards. They make async code look more like old-school synchronous code, so they're well worth learning.”
Here’s the basic concept of a promise where we get a result.
We can imagine all these fetchAndDecode calls will return when they’re done.
In the end, the variable “values”, highlighted here, will grab the results.But let’s not try to bring that over to Rust smart contract development.

### Rust Promises

#### 🚨 WRONG WAY 🚨

```rust
let creation_result = Promise::new(“aloha.mike.near”)
   .create_account();
// check creation_result for value…		
```

I’ve seen people try, you cannot do this
Let’s also visualize in our head what’s going on with a smart contract. A transaction is sent, the VM spins up the smart contract, a method is called, it spins down.

#### 😌 good stuff 😌

```rust
...

   Promise::new(new_subaccount)
       .create_account()
       .then(ext_self::on_account_created(
           &env::current_account_id(),
           NO_DEPOSIT,
           ON_CREATE_ACCOUNT_CALLBACK_GAS,
       ))
}

/// Callback after executing create_account.
#[private]
pub fn on_account_created(&mut self) {
   let creation_succeeded = is_promise_success();

...   
```

Here we see only one `.then` but you can have multiple. Which brings us to the next distinction.

### JavaScript promises

Rust Promises are also different from JavaScript. 

```js
promise1
.then(value => { return value + ' and bar'; })
.then(value => { return value + ' and bar again'; })
.then(value => { return value + ' and again'; })
.then(value => { return value + ' and again'; })
.then(value => { console.log(value) })
.catch(err => { console.log(err) });

```

Reference:
developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


Back to JavaScript
Notice how you can immediately get the value and act upon it. In an async chain, when you do a cross-contract call, you can’t just pause execution or something. You’ll need to get the “value” in a callback.
Similarly, for errors, you need a callback.

### JS promises


```
const promiseA = new Promise( (resolve, reject) => {
    resolve('is');
});

function lastThing() {
  console.log('The future…');
}

promiseA
.then(value => `${value} NEAR`)
// .then(value => { throw("uh oh"); })
.then(value => {
  lastThing();
  return value
})
// .then(value => { throw("uh oh"); })
.then(value => console.log(value));

```

https://codepen.io/mikedotexe/pen/oNZbgmv?editors=1111



If an error is thrown, execution doesn’t continue to following code in the 
.then code blocks.
Uncomment the bottom line, we only see
lastThing’s console log
Uncomment the top line and lose all console logs.


### NEAR SDK Promises

You may chain multiple `.then` calls, but when the method that’s called finishes, all the promises will be called regardless of whether a previous one failed.
It’s commonplace to have only one or two .thens and you’ll see that in most if not all examples.
Wait, why are we talking about this so much? Oh yeah…

### Version 1: User doesn’t need mainnet account

The contract now needs to:
be able to create a new account (not subaccount) and send the reward to it
make a cross-contract call to the network top-level account. (Term for accounts like testnet or near for the networks testnet and mainnet, respectively)
figure out what happens if the new account is already taken, is invalid, or otherwise runs into problems
(oh yeah) we needed to talk about how we might conceptualize the highlighted section here from a previous slide
So that’s where we’d have to do a cross-contract call, designate a callback, and then we can see if the promise succeeded or, if applicable, a value was returned from the promise.
Alright, lotta talk about concepts, what the heck does a basic smart contract look like…

### How do I begin?

The imports will typically be found automatically with your IDE; a few of us use CLion, which among the JetBrains family of products.
Fields and methods are in a struct, if you remember that from like C++ or Java, Rust is structs everywhere
Unit tests are okay for simple things and will be good enough for Version 0 and 1 of the crossword puzzle. For Version 2 we can add in simulation tests, but we won’t cover that at this time.
I will note briefly that unit tests are a good way to iterate, especially when getting started with Rust. If you quickly want to check, “did I do this right?” this is a good approach, because there is no “main function” and you can’t just run the smart contract. This is better explained in the Rust tutorial in docs.near.org

[Check out Rust book to get familiar!](https://doc.rust-lang.org/1.30.0/book)Chapters 1-11 should be enough to started.

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

docs.rs/near-sdk/3.1.0/near_sdk/collections

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
So this will potentially use all of the highlighted actions. All but Stake and DeleteAccount.

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
