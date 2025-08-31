---
id: coin-flip
title: Coin Flip
description: "Learn to build a coin flip game smart contract with randomness, betting mechanics, and reward distribution on NEAR Protocol."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

This tutorial shows how to build a simple **coin flip game** on NEAR while introducing on-chain `randomness`.


![img](/docs/assets/examples/coin-flip.png)

---

## Concept Overview
Creating on-chain randomness is difficult since blockchains are deterministic, but on NEAR the `randomSeed` function which comes from the validator that produced the block signing the previous block-hash with their private key creating a pseudo-random values

:::note
pseudo-random values here are those values which are deterministic for similar Block Hash (case for `randomSeed` on NEAR)
:::

 How it works?
1. The user calls `flip_coin` with a guess: **Heads** or **Tails**
2. In JavaScript, `near.randomSeed().toString()` derives a pseudo-random value from the block hash
3. In Rust, `env::random_seed().get(0).unwrap()` retrieves a byte from the seed to determine the outcome
4. The contract uses the character code modulo (`% 2`) to decide between Heads and Tails
<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts"
            start="6" end="12" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs"
            start="12" end="22" />
  </Language>
</CodeTabs>

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
The contract presents 2 methods: `flip_coin`, and `points_of`
`filp_coin` : It Stores Player guess while running `simulate_coin_flip` method to determine `random` outcome
`points_of` : It rewards player if there guess was accurate to the `random` outcome

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

## A Note On Randomness

Randomness in the blockchain is a complex subject since, the Validator knows which `random seed` will come out it can use various methods to attack on contract

Even if you force the user to send the input first still here is what he can do to increase there chance of winning:
1. Create a "bet" transaction with an account.
2. When it's their turn to validate, decide if they want to "resolve" or not.

If the validator, on their turn, sees that generating a random number makes them win, they can add the transaction to the block. And if they
see that they will not, they can skip the transaction.

While this does not ensure that the validator will win (other good validators could mine the transaction), it can improve their chance of winning.



