---
id: pikespeak
title: Pikespeak
description: "Pikespeak allows you to fetch blockchain events and aggregated analytics on wallets, validators, delegators, money transfers, dApps activity, and more."
---

[Pikespeak](https://pikespeak.ai) allows you to fetch blockchain events and aggregated analytics on wallets, validators, delegators, money transfers, dApps activity, and more.

Use case includes:
- Querying account balances
- Querying the most active wallets
- Querying historic account events

:::tip Documentation

You can find the complete API endpoint list in [this page](https://doc.pikespeak.ai/)

:::

---

## Endpoints

To access the Pikespeak API you'll need to [register and create an account](https://pikespeak.ai/plans). Once you're registered, under the [`My Account`](https://pikespeak.ai/myaccount) page you can get your API key.

- Mainnet: `https://api.pikespeak.ai`

---

## Examples

Check the account balance for `root.near`:

```sh
curl -X 'GET' \
  'https://api.pikespeak.ai/account/balance/root.near' \
  -H 'accept: application/json' \
  -H 'x-api-key: YOUR-PIKESPEAK-API-KEY'
```

<details>
  <summary> Response </summary>

```json
[
  {
    "contract": "Near",
    "amount": 5796.337470826706,
    "symbol": "NEAR",
    "isParsed": true,
    "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2AAAANgCAIAAADF8JzzAAA...
  }
]
```

</details>

<hr className="subsection" />

Most active wallets NEAR senders:

```sh
curl -X 'GET' \
  'https://api.pikespeak.ai/hot-wallets/near' \
  -H 'accept: application/json' \
  -H 'x-api-key: YOUR-PIKESPEAK-API-KEY'
```

<details>
  <summary> Response </summary>

```json
{
  "totalAmount": "43620883.893401468080059376309428",
  "totalUSDValue": "0",
  "topAccounts": [
    {
      "account": "jap1m48ko2uu.users.kaiching",
      "amount": "0.00642925390730650000000",
      "txCount": "1",
      "usdValue": "0"
    },
    {
      "account": "jb6050zkcoky.users.kaiching",
      "amount": "0.00924935417618550000000",
      "txCount": "1",
      "usdValue": "0"
    },
    ...
    ]
}
```

</details>

<hr className="subsection" />

Get historic account events for `keypom.near`:

```sh
curl -X 'GET' \
  'https://api.pikespeak.ai/event-historic/keypom.near' \
  -H 'accept: application/json' \
  -H 'x-api-key: YOUR-PIKESPEAK-API-KEY'
```

<details>
  <summary> Response </summary>

```json
[
  {
    "direction": "send",
    "transaction_id": "Beh3TGHXWveH7n2aWmPoVUsFMuMSWUyKStZNccYbnUJA",
    "receipt_id": "DvMhKedP25koZTw2RJ2DW3A8Ch4C7FsrZQZFv8hNCRkk",
    "index": 0,
    "sender": "keypom.near",
    "receiver": "chaotictempest.near",
    "type": "NEAR_TRANSFER",
    "block_height": "132716642",
    "timestamp": "1731632151999",
    "transaction_type": "SEND_RECEIVE",
    "token": null,
    "2fa": false,
    "amount": "5.00000000000000000000000",
    "transaction_view": {
      "type": "NEAR_TRANSFER",
      "index": 0,
      "amount": 5,
      "sender": "keypom.near",
      "status": true,
      "two_fa": false,
      "receiver": "chaotictempest.near",
      "timestamp": 1731635751999756300,
      "receipt_id": "DvMhKedP25koZTw2RJ2DW3A8Ch4C7FsrZQZFv8hNCRkk",
      "block_height": 132716642,
      "transaction_id": "Beh3TGHXWveH7n2aWmPoVUsFMuMSWUyKStZNccYbnUJA",
      "transaction_type": "SEND_RECEIVE"
    },
    "amount_numeric": "5.00000000000000000000000"
  },
  ...
]
```

</details>
