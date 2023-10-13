---
id: marketplaces
title: Marketplaces API
hide_table_of_contents: false
---

There are several NFT marketplaces in the NEAR ecosystem. Typically, each marketplace provides an API for developers. APIs allow to request various data - user NFTs, collections data, tokens, etc. However, you need to remember that every marketplace has an indexer in its architecture. They can implement their own indexer or use a third-party one. Therefore, the results of seemingly identical requests to the API of different marketplaces may be different.

:::info NFT & Marketplaces
Be mindful of not confusing an NFT with an NFT-marketplace. NFT simply store information (metadata), while NFT-marketplaces are contracts where NFT can be listed and exchanged for a price.
:::

## Paras

### Get list of user tokens
Example request: https://api-v2-mainnet.paras.id/token?owner_id=irfi.near&__skip=0&__limit=100

- params:
  - `__sort`: _`"_id::1"`_
  - `__skip`: _`100`_
  - `__limit`: _`1`_
  - `owner_id`: _`"irfi.near"`_
  - `token_id`: _`"1:1"`_
  - `token_series_id`: _`1`_
  - `is_verified`: _`true`_
  - `collection_id`: _`"genesis-by-parasnear"`_
  - `contract_id`: _`"x.paras.near"`_
  - `creator_id`: _`"irfi.near"`_

<details>
<summary>Example response: </summary>
<p>

```json
{
  "status": 1,
  "data": {
    "results": [
      {
        "_id": "6135d9467c2421015aec6e8b",
        "contract_id": "x.paras.near",
        "token_id": "1:1",
        "owner_id": "bob.near",
        "token_series_id": "1",
        "edition_id": "1",
        "metadata": {
          "title": "Key to Paras #1",
          "description": "With a simplistic shank and two collars that are connecting the bow and the bits of the key. The bit is known to be customizable; fits only the doorway that it is supposed to. Meanwhile the bow; shaped by equal pieces of bails, is left protruding so that torque can be applied by the user to the doorway.",
          "media": "bafybeigi3kbgcqj2ss65engjjs5qkxrws3rfbc3f2wlo73jukujqyqjveu",
          "media_hash": null,
          "copies": 50,
          "issued_at": "1607346917096",
          "expires_at": null,
          "starts_at": null,
          "updated_at": null,
          "extra": null,
          "reference": "bafybeifcl2kswgwm3h57da7yqtluukkyd6nnxaaedm57lmqfbqy7mg4374",
          "reference_hash": null,
          "collection": "Genesis",
          "collection_id": "genesis-by-parasnear",
          "creator_id": "paras.near",
          "blurhash": "U82jV:kERqkFZyf8kYj]cIa{ogj^ogf5bcax"
        },
        "royalty": {},
        "price": null,
        "categories": []
      }
    ],
    "skip": 0,
    "limit": 1
  }
}
```

</p>
</details>

### Get list of user collections
Example request: https://api-v2-mainnet.paras.id/owned-collections?accountId=irfi.near

<details>
<summary>Example response: </summary>
<p>

```json
{
  "status": 1,
  "result": [
    {
      "_id": "61cef434416fdd3c487e881e",
      "creator_id": "rarest.near",
      "collection": "AI DREAMS",
      "collection_id": "ai-dreams-by-rarestnear",
      "description": "We bring you AI Dreams. A collection  that comemorates creativity in connection to technological advancements. Each painting piece is AI generated from scratch (no reused assets) and the collection as a whole  capture the invisible world of AI that exists all around us. ",
      "media": "bafybeig6223btusf4boowsjntix2xqmintk4n4bkxyspdh46uz4bb6humi",
      "blurhash": "Ue8YfXa~iuo#pMWAnhWVR:jYogaykZoKWqj]",
      "createdAt": 1640952884647,
      "updatedAt": 1665924535225,
      "is_creator": true,
      "cover": "bafkreicnzdvja6xpfkq26r3xw7adv7fsbnyg77uh645jbkybcowzdqjfdy",
      "socialMedia": {
        "twitter": "",
        "discord": "",
        "website": ""
      },
      "floor_price": {
        "$numberDecimal": "0"
      },
      "has_floor_price": true,
      "avg_price": "221318840579710144927536",
      "avg_price_usd": 0.656201954827972,
      "owner_ids": [
        "wzor.near",
        "lanky_ay.near",
        "gongziyan.near",
        "multiavatar.near",
        "lscr2d2.near",
        "urri.near"
      ],
      "total_cards": 353,
      "total_owners": 153,
      "total_sales": 345,
      "volume": "76355000000000000000000000",
      "volume_usd": 226.38967441565,
      "updated_at": 1692972344980
    }
  ]
}
```

</p>
</details>

### Get token data
Example request: https://api-v2-mainnet.paras.id/token/x.paras.near::1/1:2

<details>
<summary>Example response: </summary>
<p>

```json
{
  "_id": "6135d9467c2421015aec6e8c",
  "contract_id": "x.paras.near",
  "token_id": "1:2",
  "owner_id": "narwallets.near",
  "token_series_id": "1",
  "edition_id": "2",
  "metadata": {
    "title": "Key to Paras #2",
    "description": "With a simplistic shank and two collars that are connecting the bow and the bits of the key. The bit is known to be customizable; fits only the doorway that it is supposed to. Meanwhile the bow; shaped by equal pieces of bails, is left protruding so that torque can be applied by the user to the doorway.",
    "media": "https://ipfs.fleek.co/ipfs/bafybeigi3kbgcqj2ss65engjjs5qkxrws3rfbc3f2wlo73jukujqyqjveu",
    "media_hash": null,
    "copies": 50,
    "issued_at": "1607346931683",
    "expires_at": null,
    "starts_at": null,
    "updated_at": null,
    "extra": null,
    "reference": "https://ipfs.fleek.co/ipfs/bafybeifcl2kswgwm3h57da7yqtluukkyd6nnxaaedm57lmqfbqy7mg4374",
    "reference_hash": null,
    "collection": "Genesis",
    "collection_id": "genesis-by-parasnear",
    "creator_id": "paras.near",
    "blurhash": "U82jV:kERqkFZyf8kYj]cIa{ogj^ogf5bcax",
    "score": 0,
    "mime_type": "image/jpeg"
  },
  "royalty": {},
  "price": null,
  "has_price": null,
  "is_creator": true
}
```

</p>
</details>

This is only part of available Paras API methods.

:::info
See the [Paras API documentation](https://parashq.github.io/) for the full list.
:::

## Mintbase

Mintbase works with GraphQL queries to their API.

### Get list of user tokens
[Example request](https://cloud.hasura.io/public/graphiql?endpoint=https%3A%2F%2Fgraph.mintbase.xyz%2Fmainnet&header=mb-api-key%3Aanon&query=query+MyQuery+%7B%0A++mb_views_nft_tokens%28%0A++++where%3A+%7Bowner%3A+%7B_eq%3A+%22nate.near%22%7D%2C+_and%3A+%7Bburned_timestamp%3A+%7B_is_null%3A+true%7D%2C+last_transfer_timestamp%3A+%7B_is_null%3A+false%7D%7D%7D%0A++++limit%3A+30%0A++++order_by%3A+%7Blast_transfer_timestamp%3A+desc%7D%0A++%29+%7B%0A++++nft_contract_id%0A++++title%0A++++description%0A++++media%0A++++last_transfer_receipt_id%0A++%7D%0A%7D%0A)

### Get token metadata
[Example request](https://cloud.hasura.io/public/graphiql?endpoint=https%3A%2F%2Fgraph.mintbase.xyz%2Fmainnet&header=mb-api-key%3Aanon&query=query+MyQuery+%7B%0A++nft_metadata%28%0A++++where%3A+%7Breference%3A+%7B_eq%3A+%22nb0-oBR379DzoFYeYv-LesjVNmrVlDs5IqQ8hfDfnMU%22%7D%7D%0A++%29+%7B%0A++++id%0A++++media%0A++++reference_blob%0A++%7D%0A%7D%0A)

### Get unburned tokens on a contract
[Example request](https://cloud.hasura.io/public/graphiql?endpoint=https%3A%2F%2Fgraph.mintbase.xyz%2Fmainnet&header=mb-api-key%3Aanon&query=query+MyQuery+%7B%0A++nft_tokens%28%0A++++where%3A+%7Bnft_contract%3A+%7Bid%3A+%7B_eq%3A+%22midjourny.mintbase1.near%22%7D%7D%2C+burned_timestamp%3A+%7B_is_null%3A+false%7D%7D%0A++%29+%7B%0A++++burned_receipt_id%0A++++burned_timestamp%0A++++copies%0A++++expires_at%0A++++issued_at%0A++++last_transfer_receipt_id%0A++++last_transfer_timestamp%0A++++metadata_id%0A++++mint_memo%0A++++minted_receipt_id%0A++++minted_timestamp%0A++++minter%0A++++reference%0A++++reference_hash%0A++++royalties%0A++++royalties_percent%0A++++splits%0A++++starts_at%0A++++updated_at%0A++++nft_contract+%7B%0A++++++id%0A++++++name%0A++++++owner_id%0A++++%7D%0A++%7D%0A%7D%0A)

:::info
See the [Mintbase API documentation](https://docs.mintbase.xyz/dev/mintbase-graph) for the full list of available methods.
:::

:::tip
Mintbase provides [Mintbase JS SDK](https://docs.mintbase.xyz/dev/mintbase-sdk-ref) with methods to get data from blockchain, interact with Mintbase contracts, etc.
:::