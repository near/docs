---
id: royalty
title: Royalty
sidebar_label: Royalty
---

In this tutorial you'll learn how to ...

## Introduction

We now have a fully fledged NFT contract but are missing one aspect - the ability for NFTs to have royalties. This will allow people to get a percentage of the purchase price when an NFT is purchased. For users that wanna follow along and continue with their previous work that’s fine. For users that are starting at this point, they should checkout the `5.approvals` branch. 

## Modifications to the contract

We modify the `metadata.rs` file to include royalties in the token. We also modify `internal.rs` and the `royalty.rs` files as well.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/lib.rs#L1-L3
```

We can get users to test by calling the view function `nft_payout`. We might also be able to include a publicly deployed marketplace contract for them to put something up for sale and then buy it with a second account? 

## Conclusion

At this point we have everything we need for a fully functioning NFT contract to interact with marketplaces. The last standard that we need to implement is the events standard. This allows indexers to know what functions are being called and make it easier and more reliable to keep track of information that can be used to populate the collectibles tab in the wallet for example. For the full code, checkout the `6.royalty` branch. 

## Bonus track

Maybe extend the previous marketplace to introduce royalties now? Not sure.. 
