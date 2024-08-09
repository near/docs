---
id: bidding-with-FTs
title: Bidding with FTs
sidebar_label: Bidding with FTs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

To further develop this contract we're going to introduce another primitive: [fungible tokens](../../2.build/5.primitives/ft.md). Instead of placing bids in NEAR tokens, they will be placed in FTs. This may be useful if, for example, an auctioneer wants to keep the bid amounts constant in terms of dollars as an auction is carried out, so bids can be placed in stablecoins such as $USDC. Another use case is if a project like Ref Finance were holding their own auction and want the auction to happen in their project's token $REF.

---

## Defining the FT interface


<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        Unlike NEAR tokens, fungible token amounts are not tracked on the user's account but rather they have their own contract (as do NFTs); so we're going to have to define an interface to interact with the FT contract in `ext.rs`. We will use the method `ft_transfer` to send fungible tokens to a specified account from our contract.

        <Github fname="ext.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/ext.rs#L8-11"
                start="8" end="11" />

    </TabItem>

</Tabs>

---

## Specifying the FT contract 

We want our bids to only happen in one type of fungible token; accepting many different FTs would make the value of each bid difficult to compare. We're also going to adjust the contract so that the auctioneer can specify a starting price for the NFT.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L33-53"
                start="33" end="53" />

    </TabItem>

</Tabs>

---

## Accepting bids in FTs

For making bids in NEAR we call the contract directly and add NEAR tokens to the call. With fungible tokens, since the balance lives on a separate contract, we call the FT contract to call the auction contract and to transfer tokens. The method on the FT contract to do this is named `ft_transfer_call` and it will always call a method in the target contract named `ft_on_transfer`. Take a look [here](../../2.build/5.primitives/ft.md#attaching-fts-to-a-call) for more information. 

**insert FT diagram**

Thus we swap our `bid` method for `ft_on_transfer`.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L56"
                start="56" end="56" />

    </TabItem>

</Tabs>


We do a check to confirm that the user is using the required fungible token contract by checking the predecessor's account ID. Since it is the FT contract that called the auction contract, the predecessor is now the FT contract.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L62-L63"
                start="62" end="63" />

    </TabItem>

</Tabs>

The bidder's account ID is now given by the argument `sender_id`.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L65-L69"
                start="65" end="69" />

    </TabItem>

</Tabs>

Now when we want to return the funds to the previous bidder we make a cross-contract call the the FT contract. We shouldn't transfer funds if it is the first bid so we'll implement a check for that as well.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L81-L86"
                start="65" end="69" />

    </TabItem>

</Tabs>

The method `ft_on_transfer` needs to return the number of unused tokens in the call so the FT contract can refund the sender. We will always use the full amount of tokens in this call so we simply return 0.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L88"
                start="88" end="88" />

    </TabItem>

</Tabs>

---

## Claiming the FTs

When the auction is complete we need to send the fungible tokens to the auctioneer, we implement a similar call as when we were returning the funds just changing the arguments.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/src/lib.rs#L103-L106"
                start="103" end="106" />

    </TabItem>

</Tabs>

---

## Registering the user in the FT contract

For one to receive fungible tokens first their account ID must be [registered](../../2.build/5.primitives/ft.md#registering-a-user) in the FT contract. We don't need to register the accounts that we transfer tokens back to since to make a bid in the first place they would need to be registered, but we do need to register the auction contract in the FT contract to receive bids and the auctioneer to receive the funds at the end of the auction. It is most convenient to register users from the frontend rather than the contract.

---

## Updating the tests



---

## Unit tests

TODO

---

## Integration tests

Just as with the NFT contract, we will deploy an FT contract in workspaces using a WASM file from **ADD MORE**.

When the contract is deployed it is initialized with `new_default_meta` which sets the token's metadata, including things like its name and symbol, to default values while requiring the owner (where the token supply will sent), and the total supply of the token.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L28-L37"
                start="28" end="37" />

    </TabItem>

</Tabs>

As mentioned previously, to own FTs you have to be registered in the FT contract. So let's register all the accounts that are going to interact with FTs.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L91-L106"
                start="91" end="106" />

    </TabItem>

</Tabs>

Then we will transfer the bidders FTs so they can use them to bid.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L109-L113"
                start="109" end="113" />

    </TabItem>

</Tabs>

As stated previously, to bid on the auction the bidder now calls `ft_transfer_call` on the FT contract and specifies the auction contract as an argument.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/04-ft-owner-claims-winner-gets-nft/tests/test_basics.rs#L126-L132"
                start="126" end="132" />

    </TabItem>

</Tabs>

---

## Auction architecture 

When creating an application there are numerous ways to structure it. Here, we have one contract per auction meaning we have to deploy a new contract each time we want to host an auction. To make this easier we would leverage a factory contract to deploy auction contracts for an auctioneer. Deploying code for each auction gets expensive, with 100kb of storage costing 1 NEAR, since each auction stores all the same type of information and implements the same methods one could instead decide to have multiple auctions per contract. 

In such case, the Contract struct would be a map of auctions. We would implement a method to create a new auction by adding an entry to the map with the specific details of that individual auction.

```rust 
pub struct Contract {
    auctions: IterableMap<String, Auction>
}
```

However, this architecture could be deemed less secure since if a bad actor were to gain access to the contract they would have access to every auction instead of just one.

--- 

## Conclusion

