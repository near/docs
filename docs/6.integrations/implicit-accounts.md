---
id: implicit-accounts
title: Implicit Accounts
sidebar_label: Implicit Accounts
---

## Background {#background}

Implicit accounts work similarly to Bitcoin/Ethereum accounts.
 - They allow you to reserve an account ID before it's created by generating a ED25519 key-pair locally.
 - This key-pair has a public key that maps to the account ID.
 - The account ID is a lowercase hex representation of the public key.
 - An ED25519 Public key contains 32 bytes that maps to 64 characters account ID.
 - The corresponding secret key allows you to sign transactions on behalf of this account once it's created on chain.

## [Specifications](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) {#specifications}

## Creating an account locally {#creating-an-account-locally}

For the purpose of this demo, we'll use the `betanet` network. 

### Set `betanet` network {#set-betanet-network}

```bash
export NEAR_ENV=betanet
```

### Generating a key-pair first {#generating-a-key-pair-first}

```bash
near generate-key --saveImplicit
```

Example Output
```
Seed phrase: lumber habit sausage used zebra brain border exist meat muscle river hidden
Key pair: {"publicKey":"ed25519:AQgnQSR1Mp3v7xrw7egJtu3ibNzoCGwUwnEehypip9od","secretKey":"ed25519:51qTiqybe8ycXwPznA8hz7GJJQ5hyZ45wh2rm5MBBjgZ5XqFjbjta1m41pq9zbRZfWGUGWYJqH4yVhSWoW6pYFkT"}
Implicit account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8
Storing credentials for account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8 (network: testnet)
Saving key to '~/.near-credentials/testnet/8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8.json'
```

#### Using the Implicit Account
We can export our account ID to a bash env variable:
```bash
export ACCOUNT="8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8"
```

Assuming you've received tokens on your new account, you can transfer from it using the following command:
```bash
near $ACCOUNT <receiver> <amount>
```

You can also replace `$ACCOUNT` with your actual account ID, e.g.
```bash
near send 98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de <receiver> <amount>
```

## Transferring to the implicit account {#transferring-to-the-implicit-account}

Let's say someone gives you their account ID `0861ea8ddd696525696ccf3148dd706c4fda981c64d8a597490472594400c223`. You can just transfer to it by running:
```bash
near send <your_account_id> 0861ea8ddd696525696ccf3148dd706c4fda981c64d8a597490472594400c223 <amount>
```

## BONUS: Converting public key using python (for learning purposes) {#bonus-converting-public-key-using-python-for-learning-purposes}

For this flow we'll use `python3` (with version `3.5+`) with `base58` library.

You can install this library with `pip3`:
```bash
pip3 install --user base58
```

Start python3 interpreter:
```bash
python3
```

The first thing is to get the data part from the public key (without `ed25519:` prefix). Let's store it in a variable `pk58`:
```python
pk58 = 'BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX'
```

Now let's import base58:
```python
import base58
```

Finally, let's convert our base58 public key representation to bytes and then to hex:
```python
base58.b58decode(pk58).hex()
```

Output:
```
'98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de'
```

This gives us the same account ID as `near-cli`, so this is encouraging.

**Note:** The default network for `near-cli` is `testnet`. If you would like to change this to `mainnet` or `betanet`, please see [`near-cli` network selection](/tools/near-cli#network-selection) for instructions.

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol" target="_blank" rel="noopener noreferrer"> Ask it on StackOverflow! </a>
:::
