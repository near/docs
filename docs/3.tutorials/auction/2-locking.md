---
id: locking-the-contract
title: Locking the contract
sidebar_label: Locking the contract
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

In the basic contract, the auctioneer would claim the tokens from the final bid of the contract via logging into the contract accounts wallet using a key. It is a security issue for there to exist a key for a smart contract since the key holder can take the funds from the contract at any point, maliciously change the contract or just delete the contract as a whole. To stop exploitation we will [lock](../../1.concepts/protocol/access-keys.md#locked-accounts) the contract by removing all access keys and implementing a new method to `claim` the tokens.

---

## Adding an auctioneer

When we introduce the `claim` method we want to make sure that the individual or entity that set up the auction receives the $NEAR tokens. To do this we now change the `init` method to initialize the contract with an `auctioneer`.

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

Let's also introduce a boolean field named `claimed` to track whether the tokens have been claimed by the auctioneer yet.

---

## Adding the claim method

The `claim` method should only be callable when the auction is over, can only be executed once and should transfer the tokens to the auctioneer. We'll implement this as so:

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

We will now also test the `claim` method. The test will check that the `auctioneer` account has received the correct amount of $NEAR tokens.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/02-owner-claims-money/sandbox-test/main.ava.js#L70-L81"
                start="70" end="81" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/02-owner-claims-money/tests/test_basics.rs#L96-L112"
                start="96" end="112" />

    </TabItem>

</Tabs>

Note that the test doesn't check that the auctioneer has exactly 12 $NEAR since the auctioneer uses tokens through gas fees when calling `claim`.

---

## Deploying and locking

Go ahead and test, build, and deploy your new contract, as in part 1. Remember to add the `auctioneer` argument when initializing.

Now that we have the `claim` method, we can deploy the contract without keys. Later, we will introduce a factory contract that deploys auctions to a locked account, but for now, we can manually remove the keys using the CLI to lock the account.

```
near account delete-keys 
```

Next specify the contract account and click the right arrow → to delete all the keys. Make sure to select testnet 

:::caution
Be extra careful to delete the keys from the correct account as you'll never be able to access the account again!
:::

---

## Conclusion

In this part of the tutorial, you learned how to lock a contract by creating a new method to claim tokens, specify an account on initialization that will claim the tokens, and how to delete the contract account's keys with the CLI. 

In the [next part](./3-nft.md), we'll add a prize to the auction by introducing a new primitive; spoiler, the primitive is an NFT. We'll look at how to use non-fungible token standards to send NFTs and interact with multiple interacting contracts in sandbox testing.