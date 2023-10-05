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
near generate-key tmp1
```

Example Output
```
Generated key pair with ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX public key
```

It generates a key-pair for `tmp1` account ID. The new public key is `ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`.

NEAR's string representation of a public key is `<curve>:<data>`.
- Curve is either `ed25519` or `secp256k1`. For implicit accounts we only support `ed25519`.
- Data is a base58 encoding of the public key. For `ed25519` it contains 32 bytes.

This command generated a key-pair locally and stored it locally at:
```
~/.near-credentials/betanet/tmp1.json
```

### Viewing the key-pair {#viewing-the-key-pair}

Run this command to print the content of the key-pair file:
```bash
cat ~/.near-credentials/betanet/tmp1.json
```

Content:
```json
{"account_id":"tmp1","public_key":"ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX","private_key":"ed25519:4qAABW9HfVW4UNQjuQAaAWpB21jqoP58kGqDia18FZDRat6Lg6TLWdAD9FyvAd3PPQLYF4hhx2mZAotJudVjoqfs"}
```

As you can see, it's a valid json-file and public key matches the one we generated.
The `private_key` is a secret/private key of the key pair that can be used to sign transactions with the corresponding public key.

### Converting a public key to an account ID. {#converting-a-public-key-to-an-account-id}

Let's convert a public key from NEAR string representation `ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`

The easiest way is to use `near-cli` with interactive console `repl`

1) Start `near repl`:
```bash
near repl
```

2) Store your base58 public key to a local constant:
```javascript
const pk58 = 'ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX'
```

3) Now let's parse the public key and convert it to the hex in one line:
```javascript
nearAPI.utils.PublicKey.fromString(pk58).data.toString('hex')
```

The output string is the account ID in hex (without `'`):
```javascript
'98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de'
```

Now the new account ID is `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`.

4) We can now give this account ID to someone and ask them to transfer tokens.

### Moving the temporary key-pair {#moving-the-temporary-key-pair}

Finally, we need to move `tmp1.json` key-pair to the real account ID, so that `near-cli` can use it to sign transactions.

Let's first export our account ID to a bash env variable:
```bash
export ACCOUNT="98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de"
```

Now we can move the `tmp1.json` file:
```bash
mv ~/.near-credentials/betanet/tmp1.json ~/.near-credentials/betanet/$ACCOUNT.json
```

*NOTE: While `.json` key-pair file still contains the `"account_id":"tmp1"`, it's okay. Because `near-cli` doesn't care.*

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
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
:::
