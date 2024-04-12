---
id: random
title: Random Numbers
---

When writing smart contracts in NEAR you have access to a `random seed` that enables you to create random numbers/strings
within your contract.

This `random seed` is **deterministic and verifiable**: it comes from the validator that produced the block signing the previous
block-hash with their private key.

The way the random seed is created implies two things:

- Only the validator mining the transaction **can predict** which random number will come out. **No one else** could predict it because nobody knows the validator's private key (except the validator itself).

- The validator **cannot interfere** with the random number being created. This is because they need to sign the previous block, over which (with a high probability) they had no control.

However, notice that this still leaves room for three types of attacks from the validator:

1. [Frontrunning](./frontrunning.md), which we cover in another page
2. Gaming the input
3. Refusing to mine the block.

----

## Gaming the Input

Imagine you have a method that takes an input and gives a reward based on it. For example, you ask the user to choose a number,
and if it the same as your `random seed` you give them money.

Since the validator knows which `random seed` will come out, it can create a transaction with that specific input and win the prize.

----

## Refusing to Mine the Block

One way to fix the "gaming the input" problem is to force the user to send the input first, and then decide the result on a different block.
Let's call these two stages: "bet" and "resolve".

In this way, a validator cannot game the input, since the `random` number against which it will be compared is computed in a different block.

However, something that the validator can still do to increase their chance of winning is:

1. Create a "bet" transaction with an account.
2. When it's their turn to validate, decide if they want to "resolve" or not.

If the validator, on their turn, sees that generating a random number makes them win, they can add the transaction to the block. And if they
see that they will not, they can skip the transaction.

While this does not ensure that the validator will win (other good validators could mine the transaction), it can improve their chance of winning.

Imagine a flip-coin game, where you choose `heads` or `tails` in the "bet" stage, and later resolve if you won or not. If you are a validator
you can send a first transaction choosing either input.

Then, on your turn to validate, you can check if your chosen input came out. If not, you can simply skip the transaction. This brings your
probability of winning from `1/2` to `3/4`, that's a 25% increase!

These odds, of course, dilute in games with more possible outcomes.

<details>
<summary>How does the math work here?</summary>

Imagine you always bet for `heads`.

In a fair coin-flip game you have 50-50 percent chance of winning, this is because after the coin is flipped there are two possible outcomes:
`H` and `T`, and you only win in one (`H`).

However, if you can choose to flip again if `tails` comes out, now there are 4 scenarios: `H H` `T H` `H T` `T T`, and in 3 of those
you win (all the ones including an `H`)!!!.

</details>
