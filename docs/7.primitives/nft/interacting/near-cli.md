---
id: near-cli
title: The NEAR CLI
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Mint a NFT

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

By calling a smart contract method

```bash
near call nft.primitive.near nft_mint, '{"token_id": "1", "receiver_id": "bob.near", "token_metadata": {"title": "NFT Primitive Token", "description": "Awesome NFT Primitive Token", "media": "string"}}' --accountId bob.near
```

</TabItem>

<TabItem value="Paras" label="Paras">

By calling a smart contract method

```bash
near call x.paras.near nft_mint '{"token_series_id": "490641", "receiver_id": "bob.near"}' --accountId bob.near
```

:::note
In order to use `nft_mint` method of the `x.paras.near` contract you have to be a creator of a particular token series.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```bash
near call thomasettorreiv.mintbase1.near nft_batch_mint '{"num_to_mint": 1, "owner_id": "bob.near", "metadata": {}}' --accountId bob.near --deposit 0.000000000000000000000001
```

:::note
In order to use `nft_batch_mint` method of Mintbase store contract your account have to be a in the contract minters list.
:::

</TabItem>
</Tabs>

## Buy a NFT

<Tabs>
<TabItem value="Paras" label="Paras" default>

```bash
near call x.paras.near buy '{"token_series_id": "299102", "receiver_id": "bob.near"}' --accountId bob.near --deposit 0.20574
```

<details>
<summary>Example response</summary>
<p>

```json
"299102:1"
```

</p>
</details>

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```bash
near call simple.market.mintbase1.near buy '{"nft_contract_id": "rubennnnnnnn.mintbase1.near", "token_id": "38"}' --accountId bob.near --deposit 0.001
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "payout": {
    "rub3n.near": "889200000000000000000",
    "rubenm4rcus.near": "85800000000000000000"
  }
}
```

</p>
</details>

</TabItem>
</Tabs>

## Query NFT data

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

By calling smart contract method

```bash
near view nft.primitive.near nft_token '{"token_id": "1"}'
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "token_id": "1",
  "owner_id": "bob.near",
  "metadata": {
    "title": "string", // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
    "description": "string", // free-form description
    "media": "string", // URL to associated media, preferably to decentralized, content-addressed storage
    "media_hash": "string", // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
    "copies": 1, // number of copies of this set of metadata in existence when token was minted.
    "issued_at": 1642053411068358156, // When token was issued or minted, Unix epoch in milliseconds
    "expires_at": 1642053411168358156, // When token expires, Unix epoch in milliseconds
    "starts_at": 1642053411068358156, // When token starts being valid, Unix epoch in milliseconds
    "updated_at": 1642053411068358156, // When token was last updated, Unix epoch in milliseconds
    "extra": "string", // anything extra the NFT wants to store on-chain. Can be stringified JSON.
    "reference": "string", // URL to an off-chain JSON file with more info.
    "reference_hash": "string" // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
  }
}
```

</p>
</details>

</TabItem>

<TabItem value="Paras" label="Paras">

By calling a Paras smart contract method

```bash
near view x.paras.near nft_token '{"token_id": "84686:1154"}'
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "token_id": "84686:1154",
  "owner_id": "bob.near",
  "metadata": {
    "title": "Tokenfox Silver Coin #1154",
    "description": null,
    "media": "bafkreihpapfu7rzsmejjgl2twllge6pbrfmqaahj2wkz6nq55c6trhhtrq",
    "media_hash": null,
    "copies": 4063,
    "issued_at": "1642053411068358156",
    "expires_at": null,
    "starts_at": null,
    "updated_at": null,
    "extra": null,
    "reference": "bafkreib6uj5kxbadfvf6qes5flema7jx6u5dj5zyqcneaoyqqzlm6kpu5a",
    "reference_hash": null
  },
  "approved_account_ids": {}
}
```

</p>
</details>

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By calling a Mintbase smart contract method

```bash
near view anthropocene.mintbase1.near nft_token '{"token_id": "17960"}'
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "token_id": "17960",
  "owner_id": "876f40299dd919f39252863e2136c4e1922cd5f78759215474cbc8f1fc361e14",
  "approved_account_ids": {},
  "metadata": {
    "title": null,
    "description": null,
    "media": null,
    "media_hash": null,
    "copies": 1,
    "issued_at": null,
    "expires_at": null,
    "starts_at": null,
    "updated_at": null,
    "extra": null,
    "reference": "F-30s_uQ3ZdAHZClY4DYatDPapaIRNLju41RxfMXC24",
    "reference_hash": null
  },
  "royalty": {
    "split_between": {
      "seventhage.near": {
        "numerator": 10000
      }
    },
    "percentage": {
      "numerator": 100
    }
  },
  "split_owners": null,
  "minter": "anthropocene.seventhage.near",
  "loan": null,
  "composeable_stats": { "local_depth": 0, "cross_contract_children": 0 },
  "origin_key": null
}
```

</p>
</details>

:::note
When someone creates a NFT on Mintbase they need to deploy their own NFT contract using Mintbase factory. Those smart contract are subaccounts of mintbase1.near, e.g. `anthropocene.mintbase1.near`.
:::

</TabItem>
</Tabs>

## Transfer a NFT

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```bash
near call nft.primitive.near nft_transfer '{"token_id": "1", "receiver_id": "bob.near"}' --accountId bob.near --deposit 0.000000000000000000000001
```

</TabItem>

<TabItem value="Paras" label="Paras">

```bash
near call x.paras.near nft_transfer '{"token_id": "490641", "receiver_id": "bob.near"}' --accountId bob.near --deposit 0.000000000000000000000001
```

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```bash
near call thomasettorreiv.mintbase1.near nft_transfer '{"token_id": "490641" "receiver_id": "bob.near"}' --accountId bob.near --deposit 0.000000000000000000000001
```

</TabItem>
</Tabs>

## List a NFT up for a sale

Usually, a basic NFT contract following [the NEP-171 and NEP-177 standards](https://nomicon.io/Standards/Tokens/NonFungibleToken) doesn't implement marketplace functionality such as listing NFT up for a sale. For this purpose, there are special marketplaces in the ecosystem, like [Paras](https://paras.id/) or [Mintbase](https://www.mintbase.xyz/). They use dedicated marketplace contracts (e.g., `marketplace.paras.near` or `simple.market.mintbase1.near`).

<Tabs>

<TabItem value="Paras" label="Paras">

By calling a smart contract method

In order to put a NFT for a sale on Paras you need to do two actions: cover data storage costs in `marketplace.paras.near` contract (by calling the `storage_deposit` method) and add a marketplace contract address as approved one in your NFT contract (by calling the `nft_approve` method).

There is an example how to do it:

```bash
near call marketplace.paras.near storage_deposit '{"receiver_id": "bob.near"}' --accountId bob.near --deposit 0.00939

near call nft.primitive.near nft_approve '{"token_id": "1e95238d266e5497d735eb30", "account_id": "marketplace.paras.near", "msg": {"price": "200000000000000000000000", "market_type": "sale", "ft_token_id": "near"}}' --accountId bob.near
```

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `marketplace.paras.near` as a callback.

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By calling a smart contract method

In order to put a NFT for a sale on Mintbase you need to do two actions: cover data storage costs in `simple.market.mintbase1.near` contract (by calling the `deposit_storage` method) and add a marketplace contract address as approved one in your NFT contract (by calling the `nft_approve` method).

There is an example how to do it:

```bash
near call simple.market.mintbase1.near deposit_storage '{"autotransfer": "true"}' --accountId bob.near --deposit 0.00939

near call nft.primitive.near nft_approve '{"token_id": "3c46b76cbd48e65f2fc88473", "account_id": "simple.market.mintbase1.near", "msg": {"price": "200000000000000000000000"}}' --accountId bob.near
```

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `simple.market.mintbase1.near` as a callback.

</TabItem>
</Tabs>

:::info
More examples of how to mint NFT, query metadata, attach NFTs to a contract call using `near-cli` you can [read here](/develop/relevant-contracts/nft).
:::