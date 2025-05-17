import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="NFT Primitive" label="Reference" default>

```js
const tokenData = Near.view('nft.primitives.near', 'nft_token', {
  token_id: '1',
});
```

<details>

<summary> Example response </summary>

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

</details>

</TabItem>

<TabItem value="Paras" label="Paras">

```js
const tokenData = fetch('https://api-v2-mainnet.paras.id/token?token_id=84686:1154');
```

<details>

<summary> Example response </summary>

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

</details>

:::info

See the [Paras API documentation](https://parashq.github.io/) for the full list of methods.

:::

:::note

Paras API methods returns data from all NFT contracts in NEAR. You might want to pass more parameters like `contract_id` or `owner_id` to make the response more accurate.

:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
const tokenData = fetch('https://graph.mintbase.xyz', {
  method: 'POST',
  headers: {
    'mb-api-key': 'anon',
    'Content-Type': 'application/json',
    'x-hasura-role': 'anonymous',
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

<summary> Example response </summary>

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

</details>

:::note

In the future, users may be required to register using an api key. For now, simply passing the value `anon` for `mb-api-key` will work.

:::

</TabItem>

</Tabs>
