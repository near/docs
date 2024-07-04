---
sidebar_position: 4
sidebar_label: "Add a puzzle"
title: "Adding a new puzzle now that we're using a collection that can contain multiple crossword puzzles"
---

import blankCrossword from '/docs/assets/crosswords/chapter-2-crossword-blank.png';
import teachingDeployment from '/docs/assets/crosswords/teaching-just-teacher--herogranada.near--GranadaHero.jpeg';
import recreatingSubaccount from '/docs/assets/crosswords/erase-recreate-subaccount--3one9.near--3one92.gif';

# Adding a puzzle

We're going to make a new puzzle, which means we need to provide the smart contract with a set of clues and info about the answers.

Of course, we'll not be sending the *answers* to the smart contract, otherwise everyone could see. We will, however, send details about each clue, including:

- The clue number
- Whether it's a down or across clue
- The coordinates (x and y position)
- The length of the clue. (How many letters)

Essentially, we're going to tell the smart contract enough information for an empty puzzle like this:

<img src={blankCrossword} alt="Blank crossword for chapter 2 of the crossword puzzle smart contract tutorial" width="600"/>
<br/>

(Note that we aren't showing the human-readable clues in the above screenshot, but we will provide that as well.)

## Building and deploying

Let's use the same steps we learned from the first chapter:

<figure>
    <img src={teachingDeployment} alt="Teacher shows chalkboard with instructions on how to properly deploy a smart contract. 1. Build smart contract. 2. Create a subaccount (or delete and recreate if it exists) 3. Deploy to subaccount. 4. Interact. Art created by herogranada.near" width="600"/>
    <figcaption>Art by <a href="https://twitter.com/GranadaHero" target="_blank" rel="noopener noreferrer">herogranada.near</a></figcaption>
</figure>
<br/>

Navigate to the `contract` directory, then run:

```bash
cargo near build
```

If following from the previous chapter, you'll likely have a subaccount already created. For the purpose of demonstration, we're calling the subaccount (where we deploy the contract) `crossword.friend.testnet` and the parent account is thus `friend.testnet`.

Let's delete the subaccount and recreate it, to start from a blank slate.

<figure>
    <img src={recreatingSubaccount} alt="Animation of an alien in space with a computer deleting and re-writing the account crossword.friend.testnet Art by 3one9.near" width="600"/>
    <figcaption>Art by <a href="https://twitter.com/3one92" target="_blank" rel="noopener noreferrer">3one9.near</a></figcaption>
</figure>
<br/>

Here's how to delete and recreate the subaccount using NEAR CLI:

```bash
# Delete the subaccount and send remaining balance to friend.testnet
near account delete-account crossword.friend.testnet beneficiary friend.testnet network-config testnet sign-with-legacy-keychain send

# Create the subaccount again
near account create-account fund-myself crossword.friend.testnet '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as friend.testnet network-config testnet sign-with-legacy-keychain send

# Deploy, calling the "new" method with the parameter for owner_id
cargo near deploy crossword.friend.testnet with-init-call new json-args '{"owner_id": "crossword.friend.testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-legacy-keychain send
```

Now we're ready to construct our new crossword puzzle and add it via the `new_puzzle` method. Let's start with the clues for this new puzzle.

## The clues

We're going to use these clues below for our improved puzzle. The **Answer** column will not get sent to the smart contract when we call `new_puzzle`.

| Number | Answer    | Clue | (x, y) coords | length |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 1 | paras | NFT market on NEAR that specializes in cards and comics. | (1, 1) | 5 |
| 2 | rainbowbridge | You can move assets between NEAR and different chains, including Ethereum, by visiting ______.app | (0, 2) | 13 |
| 3 | mintbase | NFT market on NEAR with art, physical items, tickets, and more. | (9, 1) | 8 |
| 4 | yoctonear | The smallest denomination of the native token on NEAR. | (3, 8) | 9 |
| 5 | cli | You typically deploy a smart contract with the NEAR ___ tool. | (5, 8) | 3 |

The x and y coordinates have their origin in the upper-left side of the puzzle grid, and each row and column start at 0.

## Solution hash

Let's derive the sha256 hash using an [easy online tool](https://www.wolframalpha.com/input/?i=sha256+%22paras+rainbowbridge+mintbase+yoctonear+cli%22) (there are many other offline methods as well) to discover the solution hash:

```
    d1a5cf9ad1adefe0528f7d31866cf901e665745ff172b96892693769ad284010
```

## Add the puzzle

Add a new puzzle using NEAR CLI with this long command, replacing `crossword.friend.testnet` with your subaccount:

```bash
near contract call-function as-transaction crossword.friend.testnet new_puzzle json-args '{
  "solution_hash": "d1a5cf9ad1adefe0528f7d31866cf901e665745ff172b96892693769ad284010",
  "answers": [
   {
     "num": 1,
     "start": {
       "x": 1,
       "y": 1
     },
     "direction": "Down",
     "length": 5,
     "clue": "NFT market on NEAR that specializes in cards and comics."
   },
   {
     "num": 2,
     "start": {
       "x": 0,
       "y": 2
     },
     "direction": "Across",
     "length": 13,
     "clue": "You can move assets between NEAR and different chains, including Ethereum, by visiting ______.app"
   },
   {
     "num": 3,
     "start": {
       "x": 9,
       "y": 1
     },
     "direction": "Down",
     "length": 8,
     "clue": "NFT market on NEAR with art, physical items, tickets, and more."
   },
   {
     "num": 4,
     "start": {
       "x": 3,
       "y": 8
     },
     "direction": "Across",
     "length": 9,
     "clue": "The smallest denomination of the native token on NEAR."
   },
   {
     "num": 5,
     "start": {
       "x": 5,
       "y": 8
     },
     "direction": "Down",
     "length": 3,
     "clue": "You typically deploy a smart contract with the NEAR ___ tool."
   }
  ]
}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as crossword.friend.testnet network-config testnet sign-with-legacy-keychain send
```

Note that our contract name and the account we're calling this from are both `crossword.friend.testnet`. That's because we added a check at the top of `new_puzzle` to make sure the predecessor is the `owner_id`.

Now our smart contract has information about this second crossword puzzle.

Let's explore how to make our frontend have a login button and truly turn this into a decentralized app (dApp)!
