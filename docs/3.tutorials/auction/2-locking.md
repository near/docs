---
id: locking-the-contract
title: Locking the contract
sidebar_label: Locking the contract
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

In the basic contract claim the funds from bids on the contract the contract owner would have to log into a wallet using a key a withdraw NEAR to their main wallet. This provides poor UX but even more importantly it is a security issue. Since there is a key to the contract a keyholder can maliciously mutate the contract's storage as they wish, for example, alter the highest bidder to list their own account. The whole idea behind smart contracts is that you don't have to trust anyone when interacting with an application, thus we will [lock](../../1.concepts/protocol/access-keys.md#locked-accounts) the contract by removing all access keys and implementing a new method to `claim` the funds.

---

## Adding an auctioneer

We want to restrict this method, to claim the funds, to only be called by the individual or entity that sets up the auction. To do this we now change the `init` method to initialize the contract with an `auctioneer` (type AccountId).

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/src/lib.rs#L25-L35"
                start="25" end="35" />

    </TabItem>

</Tabs>

Let's also introduce a boolean `claimed` field to track whether the funds have been claimed by the auctioneer yet.

---

## Adding the claim method

The `claim` method should only be callable when the auction is over, can only be executed once and should transfer the funds to the auctioneer. We'll implement this as so:

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/src/lib.rs#L65-L76"
                start="65" end="76" />

    </TabItem>

</Tabs>

---

## Modifying our tests

If we update our contract to add a new functionality then we should test it. Also if the inputs/outputs of our methods change we should update our existing tests accordingly.

---

## Unit tests 


## Integration tests 


Talk about edits to tests, add claim test

deploy from near-cli-rs, command to remove all access keys, talk about how factory will deploy without keys.
