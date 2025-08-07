## What is the Coin Flip Contract All About?

md
---
id: coin-flip
title: Coin Flip
description: "Learn to build a coin flip game smart contract with randomness, betting mechanics, and reward distribution on NEAR Protocol."
---

## What is the Coin Flip Contract All About?

Think of a coin flip game you might play with a friend. One person flips a coin, and the other person guesses if it will be "heads" or "tails." If you guess right, you win a point. If you guess wrong, you lose a point.

That's exactly what this Coin Flip smart contract does, but on the blockchain!

- **It's a game**: Players log in with their NEAR account and try to guess the outcome of a virtual coin flip.
- **It keeps score**: The contract remembers how many points each player has, so you can see who's winning.
- **It's on the blockchain**: This means the game's logic and the score are all transparent and secure. No one can cheat or change the score.

It's a perfect example for beginners because it's simple yet shows off some key concepts of how a blockchain dApp (decentralized application) works.

---

## How Does Randomness Work?

> The Big Idea: Randomness on a Blockchain is Tricky

On a regular computer, randomness is easy. But on the blockchain, it’s a whole different game. Everything must be **deterministic** — if every computer on the NEAR network doesn't agree on the same result, the network breaks.

That means traditional "random number generators" don’t work. If each node got a different result for a coin flip, no one would agree on the outcome.

### How the Coin Flip Contract Handles It

The contract uses a simple (non-secure) simulation of randomness inside a function called `simulateCoinFlip()`. It’s not secure enough for real betting or financial use — but it's perfect for learning.

---

## A Walkthrough of the Code

There are two versions of the smart contract: JavaScript and Rust. They do the same thing. We’ll focus on the **JavaScript** version for simplicity.

### The Key Functions:

- `flip_coin` — lets the user guess heads or tails
- `points_of` — shows the player’s current score

---

### 1. `flip_coin`

```ts
@call({})
flip_coin({ player_guess }: { player_guess: Side }): Side {
  const player: AccountId = near.predecessorAccountId();
  near.log(`${player} chose ${player_guess}`);

  const outcome = simulateCoinFlip();

  let player_points: number = this.points.get(player, { defaultValue: 0 })

  if (player_guess == outcome) {
    near.log(`The result was ${outcome}, you get a point!`);
    player_points += 1;
  } else {
    near.log(`The result was ${outcome}, you lost a point`);
    player_points = player_points ? player_points - 1 : 0;
  }

  this.points.set(player, player_points)

  return outcome
}

What it does:
	•	Gets the player’s account using near.predecessorAccountId()
	•	Flips the coin with simulateCoinFlip()
	•	Compares their guess to the outcome
	•	Adds or subtracts points (never below zero)
	•	Saves the new score
	•	Returns the coin flip result

points_of

ts
@view({})
points_of({ player }: { player: AccountId }): number {
  const points = this.points.get(player, { defaultValue: 0 })
  near.log(`Points for ${player}: ${points}`)
  return points
}

What it does:
	•	Reads a player’s current score
	•	Doesn’t change anything (read-only)
	•	Free to call (view function)

⸻

Before You Try It Yourself

Here’s what you need:
	•	A NEAR account
	•	Basic programming knowledge (JavaScript or Rust)
	•	A code editor or use Gitpod (recommended)

⸻

The Easiest Way to Try It

Use the Gitpod link to launch the app in your browser with no setup:

Gitpod	Clone locally
	git clone https://github.com/near-examples/coin-flip-examples.git
Once running:
	•	Log in with your NEAR account
	•	Try guessing heads or tails
	•	Watch your score change

Testing

You can run the tests using:

bash
# For JavaScript contract
yarn test

# For Rust contract
./test.sh

Both versions test core logic like flipping the coin and updating scores.

⸻

Final Notes on Randomness

Randomness on blockchain is tricky. This example uses simple, fake randomness for learning purposes. In real apps (like gambling), you’d want secure randomness from oracles or NEAR’s randomness beacon. Learn more here: Randomness & Security

⸻

Additional Resources
	•	JS contract: contract.ts
	•	Rust contract: lib.rs
	•	JS frontend: index.js



---
id: coin-flip
title: Coin Flip
description: "Learn to build a coin flip game smart contract with randomness, betting mechanics, and reward distribution on NEAR Protocol."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

This example demonstrates a simple coin flip game on the NEAR blockchain, where players can guess the outcome of a coin flip and earn points. It includes both the smart contract and the frontend components.

![img](/docs/assets/examples/coin-flip.png)

---

## Starting the Game
Coin Flip is a game where the player tries to guess the outcome of a coin flip. It is one of the simplest contracts implementing random numbers.

You have two options to start the example:
1. **Recommended:** use the app through Gitpod (a web-based interactive environment)
2. Clone the project locally.

| Gitpod                                                                                                                                                            | Clone locally                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------  |
| <a href="https://gitpod.io/#https://github.com/near-examples/coin-flip-examples.git" target="_blank" rel="noopener noreferrer"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | `https://github.com/near-examples/coin-flip-examples.git` |


If you choose Gitpod, a new browser window will open automatically with the code. Give it a minute, and the front-end will pop up (ensure the pop-up window is not blocked).

If you are running the app locally, you should build and deploy a contract (JavaScript or Rust version) and a client manually.

---

## Interacting With the Counter
Go ahead and log in with your NEAR account. If you don't have one, you can create one on the fly. Once logged in, use the `tails` and `heads` buttons to try to guess the next coin flip outcome.

![img](/docs/assets/examples/coin-flip.png)
*Frontend of the Game*

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code in Rust is in the `/contract-rs` folder.
3. The smart contract code in JavaScript is in the `/contract-ts` folder.

:::note
Both Rust and JavaScript versions of the contract implement the same functionality.
:::

### Contract
The contract presents 2 methods: `flip_coin`, and `points_of`.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts"
            start="23" end="56" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs"
            start="46" end="70" />
  </Language>
</CodeTabs>

### Running the Frontend

To start the frontend you will need to install the dependencies and start the server.

```bash
cd frontend
yarn
yarn dev
```

<hr class="subsection" />

### Understanding the Frontend

The frontend is a [Next.JS](https://nextjs.org/) project generated by [create-near-app](https://github.com/near/create-near-app). Check `_app.js` and `index.js` to understand how components are displayed and interacting with the contract.

<Language value="js" language="js">
  <Github fname="_app.js"
          url="https://github.com/near-examples/coin-flip-workshop-js/blob/main/frontend/src/pages/_app.js"/>
  <Github fname="index.js"
          url="https://github.com/near-examples/coin-flip-workshop-js/blob/main/frontend/src/pages/index.js"/>                        
</Language>

---

## Testing

When writing smart contracts, it is very important to test all methods exhaustively. In this
project you have integration tests. Before digging into them, go ahead and perform the tests present in the dApp through the command `yarn test` for the JavaScript version, or `./test.sh` for the Rust version.

### Integration test

Integration tests can be written in both Rust and JavaScript. They automatically deploy a new
contract and execute methods on it. In this way, integration tests simulate interactions
from users in a realistic scenario. You will find the integration tests for the `coin-flip`
in `contract-ts/sandbox-ts` (for the JavaScript contract) and `contract-rs/tests` (for the Rust contract).

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
            start="32" end="57" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/tests/tests.rs"
            start="25" end="82" />
  </Language>
</CodeTabs>

---

## A Note On Randomness

Randomness in the blockchain is a complex subject. We recommend you to read and investigate about it.
You can start with our [security page on it](../../smart-contracts/security/random.md).

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
