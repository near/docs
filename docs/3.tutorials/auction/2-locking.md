---
id: locking-the-contract
title: Locking the contract
sidebar_label: Locking the contract
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

In the basic contract to claim the tokens from the final bid on the contract, the contract owner would have to log into a wallet using a key a withdraw NEAR to their main wallet. This provides a poor UX, but even more importantly it is a security issue. Since there is a key to the contract a keyholder can maliciously mutate the contract's storage as they wish, for example, alter the highest bidder to list their own account. The core principle of smart contracts is that they eliminate the need for trust when interacting with an application, thus we will [lock](../../1.concepts/protocol/access-keys.md#locked-accounts) the contract by removing all access keys and implementing a new method to `claim` the tokens.

---

## Adding an auctioneer

We want to restrict the method to claim the tokens, to only the individual or entity that sets up the auction. To do this we now change the `init` method to initialize the contract with an `auctioneer`.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/02-owner-claims-money/src/contract.ts#L17-L21"
                start="17" end="21" />

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

            <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/02-owner-claims-money/src/contract.ts#L56-L61"
                start="56" end="61" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/src/lib.rs#L65-L76"
                start="65" end="76" />

    </TabItem>

</Tabs>

---

## Updating the tests

If we update our contract then we should update our tests accordingly. For example, the tests will now need to add `auctioneer` to the arguments of `init`.


We will also now also test the `claim` method. The test will check that the `auctioneer` account has received the correct amount of $NEAR tokens.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/02-owner-claims-money/sandbox-test/main.ava.js#L88-L107"
                start="88" end="107" />

        The auctioneer should now have 2 more $NEAR tokens to match the highest bid on the auction. Note that the balances are rounded since some tokens are used for gas when calling `claim`.

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/tests/test_basics.rs#L114-128"
                start="114" end="128" />

        Whilst the auctioneer starts with 5 tokens and receives 2 from the auction, note that we don't check for an account balance of strictly 7 since some tokens are used for gas when calling `claim`.

    </TabItem>

</Tabs>


---

## Deploying and locking

Go ahead and test, build and deploy your new contract, as in part 1. Remember to add the "auctioneer" arguments now when initializing.

Now we have an auctioneer and the claim method, we can deploy the contract without keys. Later we will introduce a factory contract that deploys auctions to a locked account, but for now, we can manually remove the keys using the CLI to lock the account.


near > account > delete-keys > specify your account ID > → (to delete all) > 

:::caution
Be extra careful to delete the keys from the correct account as you'll never be able to access the account again!
:::

---

## Conclusion

In this part of the tutorial, we learned how to lock a contract by creating a new method to claim tokens, specify an account on initialization that will claim the tokens and how to delete the contract account's keys with the CLI. In the [next part](./3-nft.md), we'll add a prize to the auction by introducing a new primitive.