---
id: overview
sidebar_position: 1
sidebar_label: "Crossword Game Overview"
title: "Basics overview laying out what will be accomplished in this first section."
---

import basicCrossword from '/docs/assets/crosswords/basics-crossword.jpg';
import rustScary from '/docs/assets/crosswords/rust-scary--ksart.near.png';
import rustGood from '/docs/assets/crosswords/rust-good--ksart.near.png';

# Basics overview

This first chapter of the crossword puzzle tutorial will introduce fundamental concepts to smart contract development in a beginner-friendly way. By the end of this chapter you'll have a proof-of-concept contract that can be interacted with via [NEAR CLI](https://docs.near.org/tools/near-cli) and a simple frontend that uses the [`near-api-js` library](https://www.npmjs.com/package/near-api-js).

## It's not as bad as you think

Rust is a serious systems programming language. There are pointers, lifetimes, macros, and other things that may look foreign. Don't worry if this is how you feel:

<figure>
    <img src={rustScary} alt="Programmer looking at Rust code and looking worried. Art created by ksart.near" width="600"/>
    <figcaption>Art by <a href="https://twitter.com/ksartworks" target="_blank" rel="noopener noreferrer">ksart.near</a></figcaption>
</figure>
<br/>

The good news is the Rust SDK takes care of a lot of the heavy lifting.

We'll also have the compiler on our side, often telling us exactly what went wrong and offering suggestions. As we go through this tutorial, you'll begin to see patterns that we'll use over and over again.

So don't worry, writing smart contracts in Rust on NEAR doesn't require a heavy engineering background.

<img src={rustGood} alt="Programmer looking quite relieved at the Rust code from the NEAR SDK. Art created by ksart.near" width="600"/>

## Assumptions for this first chapter

- There will be only one crossword puzzle with one solution.
- The user solving the crossword puzzle will not be able to know the solution.
- Only the author of the crossword puzzle smart contract can set the solution.

## Completed project

Here's the final code for this chapter:

https://github.com/near-examples/crossword-tutorial-chapter-1

## How it works

<img src={basicCrossword} alt="Basic crossword puzzle" width="600" />

We'll have a rule about how to get the words in the proper order. We collect words in ascending order by number, and if there's and across and a down for a number, the across goes first.

So in the image above, the solution will be **near nomicon ref finance**. 

Let's begin!
