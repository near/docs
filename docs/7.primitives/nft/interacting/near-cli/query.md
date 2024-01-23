import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs">
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```bash
near view nft.primitives.near nft_token '{"token_id": "1"}'
```

**Example response:**

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


</TabItem>

<TabItem value="Paras" label="Paras">

```bash
near view x.paras.near nft_token '{"token_id": "84686:1154"}'
```

**Example response:**

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


</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```bash
near view anthropocene.mintbase1.near nft_token '{"token_id": "17960"}'
```

**Example response:**

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


:::note
When someone creates a NFT on Mintbase they need to deploy their own NFT contract using Mintbase factory. Those smart contract are subaccounts of mintbase1.near, e.g. `anthropocene.mintbase1.near`.
:::

</TabItem>
</Tabs>
