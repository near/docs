---
sidebar_position: 1
sidebar_label: "Overview"
title: "Intermediate concepts (cross-contract calls and more)"
---

import accessKeys from '/docs/assets/crosswords/keys-cartoon-good--alcantara_gabriel.near--Bagriel_5_10.png';

# Intermediate concepts

This chapter will go a bit faster than the previous ones.

We're going to be covering an important part of smart contract development: cross-contract calls.

## Cross-contract calls

A cross-contract call is when a smart contract calls another smart contract. For instance, if `alice.near` calls contract A, and contract A makes a call to contract B.

NEAR has asynchronous transactions, and some cross-contract calls will have callbacks in order to determine the result of the call. This works a bit different from other blockchains, as we'll explain more in this chapter.

## Access keys

Last chapter covered access keys, and we implemented a login system where a user "logs in" by adding a function-call access key to their account which is tied to the crossword puzzle dApp.

Login is a common use case for access keys, but let's think bigger!

Remember the two (smaller, gray) function-call access keys from the keychain illustration?

<figure>
    <img src={accessKeys} width="600" alt="A keychain with three keys. A large, gold key represents the full-access keys on NEAR. The two other keys are gray and smaller, and have detachable latches on them. They represent function-call access key. Art created by alcantara_gabriel.near" />
    <figcaption>Art by <a href="https://twitter.com/Bagriel_5_10" target="_blank" rel="noopener noreferrer">alcantara_gabriel.near</a></figcaption>
</figure><br/>

Notice that they have a clasp to make them removable.

While it's unlikely you'll want to give another person a full-access key, there are times when you could give a function-call access key to another person or make it public. Why? This can help enable a smooth onboarding experience, as we'll do soon.

## Completed project

Here's the final code for this chapter:

https://github.com/near-examples/crossword-tutorial-chapter-3
