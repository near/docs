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

## Updating the tests

If we update our contract to add a new functionality then we should test it. Also if the inputs/outputs of our methods change we should update our existing tests accordingly.

---

## Unit tests 

TODO

---

## Integration tests 

Now we have added the `claim` method we need to initialize our contract with an auctioneer. We just create a new account, as in part 1, called "auctioneer" and call the `init` function with this account as an argument. 

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/tests/test_basics.rs#L52"
                start="52" end="52" />

    </TabItem>

</Tabs>

We will now test the `claim` method itself. First, we try to call claim without changing the sandbox environment. We expect this to fail since the current time is less than the auction's `end_time`.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/tests/test_basics.rs#L104-L110"
                start="104" end="110" />

    </TabItem>

</Tabs>

Next, we will call claim again but first, we need to advance the time inside of the sandbox. 

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/tests/test_basics.rs#L114-L115"
                start="114" end="115" />

    </TabItem>

</Tabs>

Once an auction is properly claimed the NEAR tokens are sent to the auctioneer. We should check that the auctioneer account has received these tokens.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/tests/test_basics.rs#L126-128"
                start="126" end="128" />

    </TabItem>

</Tabs>

Whilst the auctioneer starts with 5 tokens and receives 2 from the auction, note that we don't check for an account balance of strictly 7 since some tokens are used for gas when calling claim.

We also can add one more test to check that the auction cannot be claimed twice.

---

## Deploying and locking

Go ahead and test, build and deploy your new contract as in part 1. Remember to add the "auctioneer" argument now when initializing.

Now we have an auctioneer and the claim method we can deploy the contact without keys. Later we will introduce a factory contract that deploys auctions to a locked account, but for now, we can manually remove the keys using the CLI to lock the account.


near > account > delete-keys > specify your account ID > → (to delete all) > 

:::caution
Be extra careful to delete the keys from the correct account as you'll never be able to access the account again!
:::

---

## Conclusion

In this part of the tutorial, we've learned how to lock a contract by creating a new method to claim tokens, specifying an account on initialization that can claim the tokens and how to delete the contract account's keys with the CLI. In the [next part](./3-nft.md), we'll add a prize to the auction by introducing a new primitive.