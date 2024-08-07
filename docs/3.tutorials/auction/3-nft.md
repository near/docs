---
id: winning-an-nft
title: Winning an NFT
sidebar_label: Winning an NFT
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

No one will enter an auction if there's nothing to win, so let's add a prize. Why not an [NFT](../../2.build/5.primitives/nft.md)? NFTs are uniquely identifiable, easily swappable and their logic comes from an external contract so the prize will exist without the auction contract. Let's get to work!

---

## Listing the NFT

When we create an auction we need to list the NFT. To specify which NFT is being auctioned off we need the account ID of the NFT contract and the token ID of the NFT. We will specify these when the contract is initialized; amend `init` as such:  


<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/03-owner-claims-winner-gets-nft/src/contract.ts#L22-L28"
                start="22" end="28" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/03-owner-claims-winner-gets-nft/src/lib.rs#L32-L49"
                start="32" end="49" />

        Note that `token_id` is of type `TokenId` which is a String type alias that the NFT standards use for future-proofing.

    </TabItem>

</Tabs>

---

## Transferring the NFT to the winner

When the auction is ended - by calling the method `claim` - the NFT needs to be transferred to the highest bidder. Operations regarding NFTs live on the NFT contract, so we need to make a cross-contract call to the NFT contract telling it that the highest bidder now owns the NFT, not the auction contract. The method on the NFT contract is called `nft_transfer`.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/03-owner-claims-winner-gets-nft/src/contract.ts#L69-L74"
                start="69" end="74" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        We will create a new file in our source folder named `ext.rs`; here we are going to define the interface for the `nft_transfer` method. We define this interface as a `trait` and use the `ext_contract` macro to convert the NFT trait into a module with the method `nft_transfer`.

        <Github fname="ext.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/03-owner-claims-winner-gets-nft/src/ext.rs"
                start="2" end="10" />

        Defining external methods in a separate file helps improve the readability of our code.

        Make sure to import the interface into lib.rs.

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/03-owner-claims-winner-gets-nft/src/lib.rs#L5-L6"
                start="5" end="6" />

        Then we use this method to transfer the NFT.

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/03-owner-claims-winner-gets-nft/src/lib.rs#L94-L97"
                start="94" end="97" />

    </TabItem>

</Tabs>

When calling this method we specify the NFT contract name, that we are attaching 30 Tgas to the call, that we are attaching a deposit of 1 YoctoNEAR to the call (since the NFT contract requires this for [security reasons](../../2.build/2.smart-contracts/security/one_yocto.md)), and the arguments `reciever_id` and `token_id`.

---

## NFT ownership problems

In our contract, we perform no checks to verify whether the contract actually owns the specified NFT. A bad actor could set up an auction where the NFT being auctioned doesn't belong to the auction contract, causing `nft_transfer` to fail and the winning bidder to lose their bid funds with nothing in return. We could make a cross-contract call to the NFT contract to verify ownership on initialization but this would become quite complex. Instead, we will do this check off-chain and validate the auction in the frontend. 

---

## Testing with external contracts

In our tests, we're now going to be using two contracts; the auction contract and an NFT contract. Integration tests allow us to test multiple contracts in a realistic environment.

In our tests folder, we need the WASM for an NFT contract. For this tutorial we compiled an example NFT contract from [this repo](https://github.com/near-examples/NFT/tree/master) 

We deploy the NFT contract WASM using `dev_deploy` which creates an account with a random ID and deploys the contract to it.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/03-owner-claims-winner-gets-nft/tests/test_basics.rs#L16-L17"
                start="16" end="17" />

    </TabItem>

</Tabs>

To get the NFT to be auctioned, the auction contract calls the NFT contract to mint a new NFT with the provided data.  

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/03-owner-claims-winner-gets-nft/tests/test_basics.rs#L60-L76"
                start="60" end="76" />

    </TabItem>

</Tabs>

After `claim` is called, the tests should verify that the auction winner now owns the NFT. This is done by calling `nt_token` on the NFT contract and specifying the token ID.

---

## Conclusion 

This this part of the tutorial we have added NFTs as a reward which has taught us how to interact with NFT standards, make cross-contract calls and test multiple contracts that interact in workspaces. In the [next part](./4-ft.md) we'll learn how to interact with fungible token standards by adapting the auction to receive bids in FTs.   

