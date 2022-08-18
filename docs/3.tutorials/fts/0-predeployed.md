---
id: predeployed-contract
title: Pre-deployed Contract
sidebar_label: Pre-deployed Contract
---

> Learn how to easily receive fungible tokens without doing any software development by using a readily-available FT smart contract.

## Prerequisites

To complete this tutorial successfully, you'll need:

- [A NEAR account](/concepts/basics/accounts/creating-accounts)
- [NEAR-CLI](/tools/near-cli#setup)

## Using the FT contract

### Setup

- Log in to your newly created account with `near-cli` by running the following command in your terminal:

```bash
near login
```

 - Set an environment variable for your account ID to make it easy to copy and paste commands from this tutorial:

```bash
export NEARID=YOUR_ACCOUNT_NAME
```
:::note

Be sure to replace `YOUR_ACCOUNT_NAME` with the account name you just logged in with including the `.testnet`.

:::

- Test that the environment variable is set correctly by running:

```bash
echo $NEARID
```

### Receiving Fungible Tokens

NEAR has deployed a new Fungible Token contract to the account `ft.predeployed.examples.testnet` which allows users to freely receive some `gtNEAR` - a new fungible token aimed to promote the power of teamwork! Each `gtNEAR` is equal to `1e24 yocto-gtNEAR` similar to how 1 $NEAR is equal to 1e24 yoctoNEAR.

Using this pre-deployed contract, let's get some gtNEAR!

The very first step is to register your account on the contract. This is done by running the following command in your terminal:

```bash
near call ft.predeployed.examples.testnet storage_deposit '{"account_id": "'$NEARID'"}' --accountId $NEARID --deposit 0.01
```

Once your account is registered, you can now receive some fungible tokens! In this example, you'll receive `0.01 gtNEAR`.

```bash
near call ft.predeployed.examples.testnet ft_transfer '{"receiver_id": "'$NEARID'", "amount": "10000000000000000000000"}' --accountId ft.predeployed.examples.testnet --depositYocto 1
```

<details>
<summary>Example response: </summary>
<p>

```json
Log [ft.predeployed.examples.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_transfer","data":[{"old_owner_id":"benjiman.testnet","new_owner_id":"goteam.testnet","amount":"1000000000000000000000"}]}
Transaction Id B6yiqN3Z4v7FzA42nReTtyZYBj6mwjjxCpW58G8ZzpUk
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/B6yiqN3Z4v7FzA42nReTtyZYBj6mwjjxCpW58G8ZzpUk
''
```

</p>
</details>

- To view tokens owned by an account you can call the FT contract with the following `near-cli` command:

```bash
near view ft.predeployed.examples.testnet ft_balance_of '{"account_id": "'$NEARID'"}'
```

<details>
<summary>Example response: </summary>
<p>

```json
'2250000000000000000000'
```

</p>
</details>

***Congratulations! You just received your first Team Tokens on the NEAR blockchain!*** 🎉

👉 Now try going to your [NEAR Wallet](http://wallet.testnet.near.org) and view your FTs in the "Balances" tab. 👈 

:::note Pre-deployed Contract
The contract used in this section has been modified such that you can infinitely get `gtNEAR` by calling `ft_transfer`. In reality, the user that calls the method needs to have enough fungible tokens for the transfer to be successful. In our case, the contract automatically creates FTs for the receiver up to a max of `10 gtNEAR` (10e24 yocto-gtNEAR) per call.
:::

---

## Final remarks

This basic example illustrates all the required steps to call an FT smart contract on NEAR and receive your own fungible tokens.

Now that you're familiar with the process, you can jump to [Contract Architecture](/tutorials/fts/skeleton) and learn more about the smart contract structure and how you can build your own NFT contract from the ground up.

***Happy minting!*** 🪙

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.4.0`
:::
