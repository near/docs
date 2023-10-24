---
id: bos
title: NEAR Component
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section shows how to interact with an NFT smart contract directly from a [NEAR Component](../../../bos/components.md)

---

## Mint a NFT

This snippet will enable your users to mint NFTs in one of the NFT solutions.

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```js
const tokenData = Near.call("nft.primitives.near", "nft_mint", {
  token_id: "1",
  receiver_id: "bob.near", 
  token_metadata: {
    title: "NFT Primitive Token",
    description: "Awesome NFT Primitive Token",
    media: "string", // URL to associated media, preferably to decentralized, content-addressed storage
  }
});
```

</TabItem>

<TabItem value="Paras" label="Paras">

```js
const tokenData = Near.call("x.paras.near", "nft_mint", {
  token_series_id: "490641",
  receiver_id: "bob.near",
});
```

:::note
In order to use `nft_mint` method of the `x.paras.near` contract you have to be a creator of a particular token series.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
const tokenData = Near.call(
  "thomasettorreiv.mintbase1.near",
  "nft_batch_mint",
  {
    num_to_mint: 1,
    owner_id: "bob.near",
    metadata: {},
  },
  undefined,
  1
);
```

:::note
In order to use `nft_batch_mint` method of Mintbase store contract your account have to be a in the contract minters list.
:::

</TabItem>
</Tabs>

---

## Buy a NFT

This snippet will enable your users to buy NFTs in one of the NFT solutions.

<Tabs>
<TabItem value="Paras" label="Paras" default>

```js
const tokenData = Near.call(
  "x.paras.near",
  "nft_buy",
  {
    token_series_id: "299102",
    receiver_id: "bob.near",
  },
  undefined,
  205740000000000000000000 // NFT price + storage cost
);
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

```js
const tokenData = Near.call(
  "simple.market.mintbase1.near",
  "buy",
  {
    nft_contract_id: "rubennnnnnnn.mintbase1.near",
    token_id: "38",
    referrer_id: null,
  },
  undefined,
  1000000000000000000000 // NFT price + storage cost (optional, depends on a contract)
);
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

---

## Query NFT data

This snippet will enable your users to query NFT data in one of the NFT solutions.

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```js
const tokenData = Near.view("nft.primitives.near", "nft_token", {
  token_id: "1",
});
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

```js
const tokenData = Near.view("x.paras.near", "nft_token", {
  token_id: "84686:1154",
});
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

By calling a Paras API method

```js
const tokenData = fetch("https://api-v2-mainnet.paras.id/token?token_id=84686:1154");
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "status": 1,
  "data": {
    "results": [
      {
        "_id": "61dfbf27284abc1cc0b87c9d",
        "contract_id": "x.paras.near",
        "token_id": "84686:1154",
        "owner_id": "bob.near",
        "token_series_id": "84686",
        "edition_id": "1154",
        "metadata": {
          "title": "Tokenfox Silver Coin #1154",
          "description": "Holding this silver coin in your wallet will bring you health and happiness \uD83D\uDE0A",
          "media": "bafkreihpapfu7rzsmejjgl2twllge6pbrfmqaahj2wkz6nq55c6trhhtrq",
          "media_hash": null,
          "copies": 4063,
          "issued_at": null,
          "expires_at": null,
          "starts_at": null,
          "updated_at": null,
          "extra": null,
          "reference": "bafkreib6uj5kxbadfvf6qes5flema7jx6u5dj5zyqcneaoyqqzlm6kpu5a",
          "reference_hash": null,
          "collection": "Tokenfox Collection Cards",
          "collection_id": "tokenfox-collection-cards-by-tokenfoxnear",
          "creator_id": "tokenfox.near",
          "blurhash": "U7F~gc00_3D%00~q4n%M_39F-;RjM{xuWBRj",
          "score": 0,
          "mime_type": "image/png"
        },
        "royalty": {
          "tokenfox.near": 1000
        },
        "price": null,
        "approval_id": null,
        "ft_token_id": null,
        "has_price": null,
        "is_creator": true,
        "total_likes": 8,
        "likes": null,
        "categories": [],
        "view": 4
      }
    ],
    "count": 1,
    "skip": 0,
    "limit": 10
  }
}
```

</p>
</details>

:::info
See the [Paras API documentation](https://parashq.github.io/) for the full list of methods.
:::

:::note
When you call Paras smart contract method it returns data that are stored in the Paras NFT smart contract. It means a response contains only data about NFTs which were minted via Paras NFT contract. 

When you call Paras API methods it returns data from other NFT contracts as well, due to the work of the indexer. It means you might want to pass more parameters like `contract_id` or `owner_id` to make the response more accurate.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By calling a Mintbase smart contract method

```js
const tokenData = Near.view("anthropocene.mintbase1.near", "nft_token", {
  token_id: "17960",
});
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

By calling a Mintbase GraphQL API method

```js
const tokenData = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "anon",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query getToken{
        tokens: nft_tokens(
          where: {
            token_id: { _eq: "84686:1154" }
          }
        ) {
          tokenId: token_id
          ownerId: owner
          contractId: nft_contract_id
          reference
          issuedAt: issued_at
          copies
          metadataId: metadata_id
        }
      }
    `,
  }),
});
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "ok": true,
  "status": 200,
  "contentType": "application/json",
  "body": {
    "data": {
      "tokens": [
        {
          "tokenId": "84686:1154",
          "ownerId": "bob.near",
          "contractId": "x.paras.near",
          "reference": "bafkreib6uj5kxbadfvf6qes5flema7jx6u5dj5zyqcneaoyqqzlm6kpu5a",
          "issuedAt": "2022-01-13T05:56:51.068358",
          "copies": 4063,
          "metadataId": "x.paras.near:5210047642790498956c9669d6a37b98"
        }
      ]
    }
  }
}
```

</p>
</details>

:::note
In the future, users may be required to register using an api key. For now, simply passing the valueanon for `mb-api-key` will work.
:::

</TabItem>
</Tabs>

---

## Transfer a NFT

This snippet will enable your users to transfer NFTs in one of the NFT solutions.

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

By calling a smart contract method

```js
const tokenData = Near.call("nft.primitives.near", "nft_transfer", {
  token_id: "1",
  receiver_id: "bob.near"
});
```

</TabItem>

<TabItem value="Paras" label="Paras">

By calling a smart contract method

```js
const tokenData = Near.call("x.paras.near", "nft_transfer", {
  token_id: "490641",
  receiver_id: "bob.near"
});
```

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By calling a smart contract method

```js
const tokenData = Near.call("thomasettorreiv.mintbase1.near", "nft_transfer", {
  token_id: "490641",
  receiver_id: "bob.near"
});
```

</TabItem>
</Tabs>

---

## List a NFT for a sale

Basic NFT contracts following [the NEP-171 and NEP-177 standards](https://nomicon.io/Standards/Tokens/NonFungibleToken) do not implement marketplace functionality.

For this purpose, there are ecosystem apps such as [Paras](https://paras.id/) or [Mintbase](https://www.mintbase.xyz/), that use dedicated marketplace contracts.

In order to put a NFT for a sale on a marketplace you need to do two actions: 

1. Cover data storage costs in the marketplace contract. 
2. Approve the marketplace to sell the NFT in your NFT contract.


<Tabs>

<TabItem value="Paras" label="Paras">

```js
Near.call(
  "marketplace.paras.near",
  "storage_deposit",
  {
    receiver_id: "bob.near"
  },
  undefined,
  9390000000000000000
);

Near.call(
  "nft.primitives.near",
  "nft_approve",
  {
    token_id: "1e95238d266e5497d735eb30",
    account_id: "marketplace.paras.near",
    msg: {
      price: "200000000000000000000000",
      market_type: "sale",
      ft_token_id: "near"
    }
  }
);
```

The method `nft_approve` will call `nft_on_approve` in `marketplace.paras.near`.

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
Near.call(
  "simple.market.mintbase1.near",
  "deposit_storage",
  {
    autotransfer: true
  },
  undefined,
  9390000000000000000
);

Near.call(
  "nft.primitives.near",
  "nft_approve",
  {
    token_id: "3c46b76cbd48e65f2fc88473",
    account_id: "simple.market.mintbase1.near",
    msg: {
      price: "200000000000000000000000"
    }
  }
);
```

The method `nft_approve` will call `nft_on_approve` in `simple.market.mintbase1.near`.

</TabItem>
</Tabs>