---
id: approvals
title: Approvals
sidebar_label: Approvals
---

In this tutorial you'll learn how to ...

## Introduction

We now have a working bare bones NFT contract that supports minting, transferring and querying. We can then expand and introduce the concept of allowing other accounts to transfer NFTs on your behalf. For users that wanna follow along and continue with their previous work that’s fine. For users that are starting at this point, they should checkout the `4.core` branch. 

## Modifications to the contract

We will modify the approval.rs file, and include the approval standard in the core.rs file. We will also change the metadata.rs to include the approvals in the tokens. Finally, we will modify the core.rs file to modify the transfer behavior to allow approved accounts to transfer the NFTs as well as some internal methods. 

```rust reference
https://github.com/near-examples/nft-tutorial/tree/5.approvals/nft-contract/src/lib.rs#L1-L3
```

We can get them to approve another account ID (maybe a second one they create) and allow them to approve that account and transfer the token on behalf of the original owner. 

## Conclusion

We can talk about how this will be the core behavior used in the marketplace as we will allow the market to transfer the token on our behalf once it is sold. For users that want the finished code, they can checkout the `5.approvals` branch. 

## Bonus track

Perhaps we can have a simple marketplace tutorial where NFTs are purchased without royalties? Maybe we can have this tutorial as the start and then we introduce royalties into the marketplace as an extension to the royalty tutorial?

