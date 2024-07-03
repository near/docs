---
sidebar_position: 2
sidebar_label: "Store multiple puzzles"
title: "Store multiple crossword puzzles using a specialized collection in NEAR called a LookupMap"
---
import {Github} from "@site/src/components/codetabs"

import bookPagination from '/docs/assets/crosswords/paging-through-hashes-swing--pierced_staggg.near--pierced_stag.jpg';
import guardsAroundContract from '/docs/assets/crosswords/guards-contract-permissions--connoisseur_dane.near--connoisseurdane.png';

# Using collections

As mentioned in the previous chapter, the [online Rust Book](https://doc.rust-lang.org/stable/book) is a great reference for folks getting started with Rust, but there are concepts that differ when we're dealing with the blockchain. One of these differences is the use of collections.

The reference-level documentation of the Rust SDK explains this concept well:

:::note  Motivation for specialized collections
>Collections that offer an alternative to standard containers from [Rust's] std::collections::* by **utilizing the underlying blockchain trie storage more efficiently**.<br/>
>For example, the following smart contract does not work with state efficiently, because **it will load the entire HashMap at the beginning of the contract call**, and will save it entirely at the end, in cases when there is state modification. **This is fine for small number of elements, but very inefficient for large numbers**.

— [NEAR SDK reference documentation](https://docs.rs/near-sdk/latest/near_sdk/collections/index.html)
:::

In chapter 1, we set the crossword puzzle solution hash when we first deployed the contract and called the initialization method `new`, passing it. This would only allow us to have only one puzzle, but let's allow for many.

At a high level, let's discuss what we'll want to add if our contract is to store multiple crossword puzzles. First, we'll have the concept of many puzzles where some of them will have different states (unfinished and finished) and we'll want to know which ones are unsolved in quick way. Another thing, which is a general rule of thumb when writing smart contracts, is to anticipate what might happen if it gets a lot of usage. What if we end up with 10,000 crossword puzzles? How might that affect how many data structures we use and which ones?

## LookupMap and UnorderedSet

Let's try having two specialized NEAR collections:

1. A [LookupMap](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.LookupMap.html) which will store key-value pairs. (Solution hash » Puzzle object)
2. An [UnorderedSet](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.UnorderedSet.html) containing a set (list with no duplicates) of the solution hashes for puzzles which have not been solved yet.

As you look at the list of specialized collections in the Rust SDK, you might notice some begin with `Lookup` while others have `Unordered`. As is written in the reference documentation, the `Lookup` is non-iterable while the `Unordered` collections are iterable. This means if you will need to loop through the list of contents of this data structure, you'll likely use an iterable data structure. If you'll only ever be adding and retrieving data by the key, and the key will always be known, it's more efficient to use a non-iterable collection.

So why would we have two data structures here? Again, if we end up with a large number of puzzles, we might not be able to loop through all the puzzles, looking for ones that are unsolved. Because of the limit of gas execution per transaction, we must be conscious that there can be operations which will eventually exceed this limit. I suppose we could assume  that our `UnorderedSet` of unsolved puzzles wouldn't contain tens of thousands of puzzles. That's one way to avoid running into limits, but we could also learn how to utilize **pagination** through an iterable collection like an `UnorderedSet` which we'll get to later.

<figure>
    <img src={bookPagination} alt="Book showing pagination of hashes. Art created by pierced_staggg.near" width="600"/>
    <figcaption>Think of our collection as having multiple pages of puzzle hashes.<br/>Art by <a href="https://twitter.com/pierced_stag" target="_blank" rel="noopener noreferrer">pierced_staggg.near</a></figcaption>
</figure>
<br/>

As we remember from the previous chapter, every smart contract has a primary struct containing the `#[near(contract_state)]` macro.

:::note Naming the primary struct
Note in the [previous chapter](../01-basics/01-set-up-skeleton.md#start-writing-rust) we named our primary struct `Contract`, but in this chapter we'll call it `Crossword.`

The name of the struct doesn't matter and there's nothing special about naming it `Contract`, though you might see that convention used in several smart contracts on NEAR. We've named it something different simply to illustrate that there's no magic behind the scenes. This *does* mean, however, that our `impl` block will also be `Crossword`.
:::

Here's how our struct will look with the iterable and non-iterable NEAR collections:

<Github language="rust" start="62" end="72" url="https://github.com/near-examples/crossword-tutorial-chapter-2/blob/master/contract/src/lib.rs" />

Above, we have the `puzzles` and `unsolved_puzzles` fields which are collections.

We also have an `owner_id` so we can exercise a common pattern in smart contract development: implementing a rudimentary permission system which can restrict access to certain functions. We'll expand on this thought in a moment.

The snippet below shows the first method in the implementation of the `Crossword` struct, where the `new` function sets up these two specialized collections.

<Github language="rust" start="74" end="83" url="https://github.com/near-examples/crossword-tutorial-chapter-2/blob/master/contract/src/lib.rs" />

So during the initialization function (`new`) we're setting the `owner_id`. For our purposes the owner will likely be the contract itself, but there can be several reasons to have it be a DAO or another user. Next, let's look at the `b"c"` and `b"u"` bits for the collection fields.

## Collections have prefixes

Above, the `new` function is initializing the struct's fields by giving them a unique prefix. You can learn more about [the prefixes here](../../../2.build/2.smart-contracts/anatomy/collections.md), but know that these prefixes (`c` and `u`) should be short and different.

Let's take a peek at how we'll add a new crossword puzzle. Note that there will be a new struct here, `Answer`, which we haven't defined yet. We'll also be introducing the concept of enums, like `PuzzleStatus::Solved` and `PuzzleStatus::Unsolved`. We'll be covering these in the next section.

Unlike the previous chapter where there was only one crossword puzzle, we'll be inserting into our new collections, so let's create a `new_puzzle` method.

<Github language="rust" start="140" end="157" url="https://github.com/near-examples/crossword-tutorial-chapter-2/blob/master/contract/src/lib.rs" />

Now we're set up to store multiple puzzles!

## Permissions or permissionless?

<figure>
    <img src={guardsAroundContract} alt="Guards or bouncers in front of a futuristic club with the label of a NEAR smart contract. Art created by connoisseur_dane.near" width="600"/>
    <figcaption>Guarding which accounts can enter the smart contract logic.<br/>Art by <a href="https://twitter.com/connoisseurdane" target="_blank" rel="noopener noreferrer">connoisseur_dane.near</a></figcaption>
</figure>
<br/>

**Is NEAR permissionless?**

Yes.

**What did you mean by a permission system earlier, and what are the ways you can control permissions?**

There are two ways that permissions can be controlled:

1. In the smart contract code itself
2. When using function-call access keys

We'll get to the second topic in later in this chapter, but will focus on the first item.

As you can see in the previous snippet, the first thing that happens in the `new_puzzle` method is a check. It looks to see if the predecessor (the person who most recently called this method, sometimes the same as the signer) is the same as the `owner_id` that we set during the contract's initialization.

If someone else is trying to call `new_puzzle`, this check will fail and the smart contract will panic, going no further. This example is the simplest form of a permission. Much more complex system can exist for users. The SputnikDAO smart contracts, for instance, implement custom policies. It's up the smart contract developer to write their roles/policies and apply them to users. Sometimes an allow-list (or whitelist) is used.

In short, **any account with a full-access key can call any method on a smart contract**, but that doesn't mean the smart contract will let them continue execution. It's up to the developer to protect their functions with guards like the one in `new_puzzle`.

---

Let's dive into structs and enums next.
