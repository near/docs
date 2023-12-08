---
id: near-cli
title: NEAR CLI
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create different kinds of linkdrop from your shell using [`near-cli`](../../../4.tools/cli.md).

In order to create any kind of drop, you need to first generate key pairs. 

You will need to create one key per drop you want to generate, and you will always pass the `public` part of the key to create the drop, and give the `private` part of the key to the user you want to receive the drop.

---

## Getting key pairs

```bash
export NUMBER_OF_DROPS=2

curl https://keypom.sctuts.com/keypair/$NUMBER_OF_DROPS/rootEntrophy
```

---

## Simple Drop

This snippet will enable you to create a simple $NEAR drop. A simple drop allows you to onboard both existing and new users.

```bash
near call v2.keypom.near create_drop '{"public_keys": [<PUBLIC KEYS>], "deposit_per_use": "10000000000000000000000"}' --deposit 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```
---

## NFT Drop

This snippet will enable you to create a NFT Drop.

First of all, you need to create a NFT. See you how to do it from NEAR Component [here](../../nft/interacting/near-cli.md#mint-a-nft).

Then you need to create a drop. You can do it exactly the same way as for a simple drop, but pass extended object as `args`:

<hr class="subsection" />

### Creating a drop

```bash
near call v2.keypom.near create_drop '{"public_keys": [PUBLIC_KEYS], "deposit_per_use": "10000000000000000000000", "nft": {"sender_id": "bob.near", "contract_id": "nft.primitives.near"}}' --deposit 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```

<hr class="subsection" />


### Getting drop id

```bash
near view v2.keypom.near get_drop_supply_for_owner '{"account_id": "bob.near"}'
```

<hr class="subsection" />

### Transfering NFT

Then you should to transfer your NFT to KeyPom contract.

```bash
near call nft.primitives.near nft_transfer_call '{"receiver_id": "v2.keypom.near", "token_id": <YOUR TOKEN ID>, "msg": <YOUR DROP ID>}' --deposit 1 --gas 100000000000000 --accountId bob.near
```

---

## FT Drop

This snippet will enable you to create a FT Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to transfer FTs to KeyPom contract instead of transferring NFT and pass another set of arguments during creating drop.

<hr class="subsection" />

### Creating a drop

```bash
near call v2.keypom.near create_drop '{"public_keys": [PUBLIC_KEYS], "deposit_per_use": "10000000000000000000000", "ftData": {"contractId": "ft.primitives.near","senderId": "bob.near", "amount": "1"}}}' --deposit 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```

<hr class="subsection" />

### Transfering FT

Then you should to transfer your FTs to KeyPom contract.

```bash
near call ft.primitives.near ft_transfer '{"receiver_id": "v2.keypom.near", "amount": "1"}' --deposit 1 --gas 100000000000000 --accountId bob.near
```

---

## Function Call Drop

This snippet will enable you to create a Function Call Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to pass another set of arguments during creating drop.

```bash
near call v2.keypom.near create_drop '{"public_keys": [PUBLIC_KEYS], "deposit_per_use": "10000000000000000000000", "fcData": {"methods": [[{"receiverId": "nft.primitives.near","methodName": "nft_mint","args": {"token_id": "1", "metadata": {"title": "My NFT drop","description": "","media": ""}, "accountIdField": "receiver_id", "attachedDeposit": "10000000000000000000000"}]]}}' --deposit 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```