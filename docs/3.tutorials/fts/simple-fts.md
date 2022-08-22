---
id: simple-fts
title: Minting FTs (Simple)
---

In this tutorial, you'll learn how to easily create your own Fungible Tokens (FT) without doing any software development by using a readily-available smart contract.
This article will show you how to use an existing [FT smart contract](#fungible-token-contract), and you'll learn [how to mint](#minting-your-fts) fungible tokens and [view them](#checking-your-wallet) in your Wallet.

## Prerequisites

To complete this tutorial successfully, you'll need:

- [A NEAR account](#wallet)
- [NEAR command-line interface](/tools/near-cli#setup) (`near-cli`)

### Wallet

To store your fungible tokens you'll need a [NEAR Wallet](https://wallet.testnet.near.org/).
If you don't have one yet, you can create one easily by following [these instructions](https://wallet.testnet.near.org/create).

Once you have your Wallet account, you can click on the [Balances Tab](https://wallet.testnet.near.org/?tab=balances) where all your Fungible Tokens will be listed:

![Wallet](/docs/assets/fts/empty-wallet-ft-tab.png)

## Using the FT contract

Now that you have all the tools in place, you're ready to start using the FT smart contract to [mint your FTs](#minting-your-fts).

:::note
If you don't have the command line interface, please [follow these steps](/tools/near-cli#setup).
:::

Ensure you have credentials stored locally for the `testnet` account you will be using to mint tokens with by running the following `near-cli` command in your terminal:

```bash
near login
```

To make this tutorial easier to copy/paste, we're going to set an environment variable for your account ID. In the command below, replace `YOUR_ACCOUNT_NAME` with the account name you just logged in with including the `.testnet`):

```bash
export ID=YOUR_ACCOUNT_NAME
```

Test that the environment variable is set correctly by running:

```bash
echo $ID
```

### Minting your FTs

NEAR has already deployed a contract to the account `ft.examples.testnet` which allows anyone to freely mint `TeamTokens`. This is the account you'll be interacting with to mint your fungible tokens.

Now let's mint some tokens! The command below will mint `25` TeamTokens to your account.
If you look carefully, the `receiver_id` defines the new owner of the tokens you are minting, while `--accountId` specifies which accounted will be used to sign and pay for this transaction. 
Also, there is a `--deposit` flag which attaches `.001` $NEAR to the call to [pay for storage](/concepts/storage/storage-staking) on the fungible token contract. The amount is slightly less than this but you will be refunded the difference. (See the transaction in your wallet) The amount of tokens to be minted is set to 25 but you can increase this value up to 1000.

```bash
near call ft.examples.testnet ft_mint '{"receiver_id": "'$ID'", "amount": "25"}' --deposit 0.1 --accountId $ID
```

After minting your tokens you can query the contract to view the balance of any accountId passed. This is done by performing a contract `view` call and using the `ft_balance_of` endpoint on the fungible token contract. Run the following in your terminal to view the balance:

```bash
near view ft.examples.testnet ft_balance_of '{"account_id": "'$ID'"}'
```

<details>
<summary>Example response: </summary>
<p>

```json
View call: ft.examples.testnet.ft_balance_of({"account_id": "benji_test.testnet"})
'25'
```

</p>
</details>

### Checking your Wallet

:::tip
After you mint your fungible token you can [view it in your NEAR Wallet](https://wallet.testnet.near.org)!
:::

> <br/>
>
> ![Wallet with token](/docs/assets/fts/teamtoken.png)
> <br/>

**_Congratulations! You just minted your first Fungible Token on the NEAR blockchain!_** 🎉

## Final remarks

This basic example illustrates all the required steps to call a FT smart contract on NEAR and start minting your own fungible tokens.

**_Happy minting!_** 🪙

## Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `2.1.1`
