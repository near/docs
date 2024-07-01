---
id: predeployed-contract
title: Pre-deployed Contract
sidebar_label: Pre-deployed Contract
---

Learn how to easily receive fungible tokens without doing any software development by using a readily-available FT smart contract.

---

## Prerequisites

To complete this tutorial successfully, you'll need:

- [A NEAR testnet account](https://testnet.mynearwallet.com)
- [NEAR-CLI-RS](../../4.tools/cli-rs.md#install)

---

## Using the FT contract

Create a new `testnet` account using the [web wallet](https://testnet.mynearwallet.com).

### Setup

Log in to your newly created account with `near-cli-rs` by running the following command in your terminal:

```bash
near account import-account using-web-wallet network-config testnet
```

Set an environment variable for your account ID to make it easy to copy and paste commands from this tutorial:

```bash
export NEARID=YOUR_ACCOUNT_NAME
```
:::note

Be sure to replace `YOUR_ACCOUNT_NAME` with the account name you just logged in with including the `.testnet`.

:::

Test that the environment variable is set correctly by running:

```bash
echo $NEARID
```

<hr className="subsection" />

### Receiving Fungible Tokens

NEAR has deployed a new Fungible Token contract to the account `ft.predeployed.examples.testnet` which allows users to freely receive some `gtNEAR` - a new fungible token aimed to promote the power of teamwork! Each `gtNEAR` is equal to `1e24 yocto-gtNEAR` similar to how 1 $NEAR is equal to 1e24 yoctoNEAR.

Using this pre-deployed contract, let's get some gtNEAR!

Start by calling the method `ft_mint` which is a custom function implemented on this contract in order to send your account some `gtNEAR`! The following command will send `0.01 gtNEAR` to your account.

```bash
near contract call-function as-transaction ft.predeployed.examples.testnet ft_mint json-args '{"account_id": "'$NEARID'", "amount": "10000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $NEARID network-config testnet sign-with-legacy-keychain send
```

<details>
<summary>Example response: </summary>
<p>

```json
Log [ft.predeployed.examples.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_mint","data":[{"owner_id":"benjiman.testnet","amount":"10000000000000000000000","memo":"FTs Minted"}]}
Transaction Id Fhqa8YDLKxnxM9jjHCPN4hn1w1RKESYrav3kwDjhWWUu
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/Fhqa8YDLKxnxM9jjHCPN4hn1w1RKESYrav3kwDjhWWUu
''
```

</p>
</details>

To view tokens owned by an account you can call the FT contract with the following `near-cli` command:

```bash
near contract call-function as-read-only ft.predeployed.examples.testnet ft_balance_of json-args '{"account_id": "'$NEARID'"}' network-config testnet now
```

<details>
<summary>Example response: </summary>
<p>

```json
'10000000000000000000000'
```

</p>
</details>

***Congratulations! You just received your first Team Tokens on the NEAR blockchain!*** 🎉

👉 Now try going to your [NEAR Wallet](https://testnet.mynearwallet.com) and view your FTs in the "Balances" tab. 👈

:::note Pre-deployed Contract
The contract used in this section has been modified such that you can infinitely get `gtNEAR` by calling `ft_mint`. This function is not part of the FT [standards](https://nomicon.io/Standards/Tokens/FungibleToken/Core) and has been implemented for the purpose of this tutorial.
:::

---

## Final remarks

This basic example illustrates all the required steps to call an FT smart contract on NEAR and receive your own fungible tokens.

Now that you're familiar with the process, you can jump to [Contract Architecture](/tutorials/fts/skeleton) and learn more about the smart contract structure and how you can build your own FT contract from the ground up.

***Happy minting!*** 🪙

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli-rs: `0.11.0`
:::
