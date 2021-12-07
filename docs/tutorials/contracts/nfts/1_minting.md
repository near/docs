---
id: minting
title: Minting
sidebar_label: Minting
---

In this tutorial you'll learn how to ...

## Introduction

Talks about how this is a 0 to hero set of tutorials and how this specific tutorial will go through just the minting process and how we need to modify the skeleton in order to get an NFT minted and showing up in the wallet.

## Modifications to the contract

Start by writing the main Contract struct variables. Explain what they are and their purpose. We then move forward with the initialization function. At first, write the `new` function and then introduce the `new_default_meta` so that users don’t have to manually put all the metadata in the CLI everytime. 

```rust reference
https://github.com/near-examples/nft-tutorial/tree/2.minting/nft-contract/src/lib.rs#L1-L3
```

We then introduce the actual minting logic and go through the code for that. We can then add a function for measuring storage and explain that we’ll make users front the cost of storing the information on chain. At this point we’ll have coded the lib.rs, mint.rs, metadata.rs and 3 functions within internal.rs. We can then talk about deploying the contract and we can introduce upgrading the contract. 

We’ll go through and deploy the contract and mint an NFT. we’ll go to the wallet and see that the NFT isn’t showing up. At this point we can upgrade the contract and explain that in order for the NFT to show up in wallet, an enumerable method needs to be implemented which is the `nft_tokens_for_owner` We can implement this method and apply a patch fix to the contract and redeploy. The state will remain and we don’t need to re-mint the NFT. Once redeployed, we can refresh the wallet page and the NFT should show up. 

## Conclusion

Talk about how we minted an NFT, had it show up in the wallet, and explored upgrading the contract if we need to patch fix something. Talk about the enumeration standard and how we’re gonna move on and extend the tutorial to introduce enumerable methods. 

Talk about how if you wanna use the finished code for this tutorial you can checkout the `2.minting` branch. 

## Bonus track

We can link the blockcraft tutorial as a practical application / extension to the tutorial.
