---
id: pagoda-api
title: Pagoda API
hide_table_of_contents: false
---

[Pagoda](https://www.pagoda.co/) is Web3 Startup Platform. They build all the tools developers need to build, launch, and grow their Web3 startup. Including API to interact with NFT.

:::info
You need to get API key to have access to Pagoda API. Include the token in a header parameter called x-api-key.
You can get you API key [here](https://console.pagoda.co/apis?tab=keys).
:::

## Get user collections overview

```bash
curl --request GET \
  --url https://near-testnet.api.pagoda.co/eapi/v1/accounts/account_id/NFT \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: '
```

- auth:
  - `x-api-key`: _`123`_

- path parameters:
  - `account_id`: _`string`_

- query parameters:
  - `block_height`: _`string`_
  - `block_timestamp_nanos`: _`string`_
  - `limit`: _`integer`_

<details>
<summary>Example response: </summary>
<p>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "nft_counts": [
    {
      "contract_account_id": "string",
      "contract_metadata": {
        "base_uri": "string",
        "icon": "string",
        "name": "string",
        "reference": "string",
        "reference_hash": "string",
        "spec": "string",
        "symbol": "string"
      },
      "last_updated_at_timestamp_nanos": "string",
      "nft_count": -2147483648
    }
  ]
}
```

</p>
</details>

## Get NFT contract metadata
```bash
curl --request GET \
  --url https://near-testnet.api.pagoda.co/eapi/v1/nep171/metadata/contract_account_id \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: '
```

- auth:
  - `x-api-key`: _`123`_

- path parameters:
  - `contract_account_id`: _`string`_

- query parameters:
  - `block_height`: _`string`_
  - `block_timestamp_nanos`: _`string`_

<details>
<summary>Example response: </summary>
<p>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "metadata": {
    "base_uri": "string",
    "icon": "string",
    "name": "string",
    "reference": "string",
    "reference_hash": "string",
    "spec": "string",
    "symbol": "string"
  }
}
```

</p>
</details>

## Get NFT history
```bash
curl --request GET \
  --url https://near-testnet.api.pagoda.co/eapi/v1/NFT/contract_account_id/token_id/history \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: '
```

- auth:
  - `x-api-key`: _`123`_

- path parameters:
  - `contract_account_id`: _`string`_
  - `token_id`: _`string`_

- query parameters:
  - `limit`: _`integer`_


<details>
<summary>Example response: </summary>
<p>

```json
{
  "block_height": "string",
  "block_timestamp_nanos": "string",
  "history": [
    {
      "block_height": "string",
      "block_timestamp_nanos": "string",
      "cause": "string",
      "new_account_id": "string",
      "old_account_id": "string",
      "status": "string"
    }
  ],
  "nft": {
    "metadata": {
      "copies": -9223372036854776000,
      "description": "string",
      "extra": "string",
      "media": "string",
      "media_hash": "string",
      "reference": "string",
      "reference_hash": "string",
      "title": "string"
    },
    "owner_account_id": "string",
    "token_id": "string"
  }
}
```

</p>
</details>