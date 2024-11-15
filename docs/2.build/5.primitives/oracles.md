---
id: oracles
title: Oracles
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Blockchain Oracles](https://en.wikipedia.org/wiki/Blockchain_oracle) serve as intermediaries that connect smart contracts with external (off-chain) data.

`Example:`

- **Price Feeds:** Real-time pricing for cryptocurrencies, stocks, or commodities.
- **Event Information:** Updates on real-world events like sports results or weather conditions.
- **API Access:** Connections to external web services and systems.

:::info
Oracles, being external third-party services, require careful consideration of their reliability, security, and decentralization to avoid risks such as incorrect data, manipulation, or single points of failure.
:::

---

## Deployed Oracles on NEAR

Here is a directory of third-party oracle services deployed on the NEAR blockchain:

| Name                                                                                                     | Creator                                 | Description                                        |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------- |
| [Price Oracle](#price-oracle)                                                                            | [NearDefi](https://github.com/NearDeFi) | Open source oracle for real-time asset pricing     |
| [Pyth Network Oracle](#pyth-network-oracle)                                                              | [Pyth Network](https://pyth.network/)   | High-frequency, low-latency oracle for price feeds |
| **[[Your Project Here]](https://github.com/near/docs/edit/master/docs/2.build/5.primitives/oracles.md)** | -                                       | -                                                  |

---

## Price Oracle by NearDefi

- **Creator:** [NearDefi](https://github.com/NearDeFi)
- **Codebase:** [NearDefi/price-oracle](https://github.com/NearDeFi/price-oracle)
- **Bot for Data Feeds:** [NearDefi/near-price-oracle-bot](https://github.com/NearDeFi/near-price-oracle-bot)
- **Deployed Addresses:**
  - Mainnet: [priceoracle.near](https://nearblocks.io/address/priceoracle.near)
  - Testnet: [priceoracle.testnet](https://testnet.nearblocks.io/address/priceoracle.testnet)

### Query Assets

<Tabs>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near view priceoracle.near get_assets
near contract call-function as-read-only priceoracle.near get_assets json-args {} network-config mainnet now
```

  <details>
  
  <summary>Example Response</summary>

```json
[
  [
    'wrap.near',
    {
      reports: [
        {
          oracle_id: 'thorinoracle.near',
          timestamp: '1669795900809627816',
          price: { multiplier: '17030', decimals: 28 }
        },
        ...
      ]
    }
  ]
]
```

  </details>
</TabItem>
</Tabs>

### Get Assets Price

<Tabs>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near view priceoracle.near get_price_data
```

</TabItem>

</Tabs>

<details>

<summary>Example response</summary>

```json
{
  timestamp: '1706631861981947371',
  recency_duration_sec: 90,
  prices: [
    {
      asset_id: 'wrap.near',
      price: { multiplier: '30702', decimals: 28 }
    },
    {
      asset_id: 'aurora',
      price: { multiplier: '235662', decimals: 20 }
    },
    {
      asset_id: 'meta-pool.near',
      price: { multiplier: '38770', decimals: 28 }
    },
    {
      asset_id: 'linear-protocol.near',
      price: { multiplier: '36432', decimals: 28 }
    },
```

</details>

:::tip
For USD values, divide the `multiplier` by `10^4`.
:::

---

## Pyth Network Oracle

- **Creator:** [Pyth Network](https://pyth.network)
- **Documentation:** [Pyth NEAR Docs](https://docs.pyth.network/price-feeds/use-real-time-data/near)
- **Codebase:** [pyth-network/pyth-crosschain](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/near)
- **Deployed Addresses:**
  - Mainnet: [pyth-oracle.near](https://nearblocks.io/address/pyth-oracle.near)
  - Testnet: [pyth-oracle.testnet](https://testnet.nearblocks.io/address/pyth-oracle.testnet)

### Using Pyth Network Oracle

Pyth's NEAR smart contract has two core methods to update & get prices.

1. [`update_price_feeds`](#update_price_feeds)
   _(updates Pyth smart contract with the price feed you provide)_
   - args: `data`
   - type: `object`
   - example: `{ "data": "504e41...' }`
2. [`get_price`](#get_price) (fetches the most recent price stored in the contract)\_
   - args: `price_identifer`
   - type: `object`
   - example: `{ price_identifier: 'f9c0172ba10dfa8...' }`

:::info
For a complete list of endpoints to interact with, see [Pyth's `receiver` contract](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/near/receiver/src/ext.rs).
:::

### Network Configuration

When interacting with Pyth oracle you will need:

- Price ID(s)
- HermesAPI Endpoint
- Smart contract address

Each of these variables differ between networks:

| Network   | Price Feed IDs                                                                                   | Hermes API Address         | Contract Address                                                                 |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------------- | -------------------------------------------------------------------------------- |
| `testnet` | [NEAR `testnet` Price Feed IDs](https://www.pyth.network/developers/price-feed-ids#near-testnet) | `hermes-beta.pyth.network` | [pyth-oracle.testnet](https://testnet.nearblocks.io/address/pyth-oracle.testnet) |
| `mainnet` | [NEAR `mainnet` Price Feed IDs](https://www.pyth.network/developers/price-feed-ids#near-mainnet) | `hermes.pyth.network`      | [pyth-oracle.near](https://nearblocks.io/address/pyth-oracle.near)               |

### `update_price_feeds`

This method updates Pyth Oracle smart contract with the price feed from an external source.

This process requires the following steps:

1. [Get Price IDs](#1-get-price-ids)
2. [Fetch feed from Hermes API](#2-fetch-feed-from-hermes-api)
3. [Encode API response to hex for NEAR](#3-encode-api-response-to-hex-for-near)
4. [Call `update_price_feeds`](#4-call-update_price_feeds)

---

#### 1) Get Price IDs

Pyth Network uses price feed IDs that map to their contract addresses to uniquely identify price feeds. Find the price ID(s) for the feed you want to update:

- [NEAR `testnet` Price Feed IDs](https://www.pyth.network/developers/price-feed-ids#near-testnet)
- [NEAR `mainnet` Price Feed IDs](https://www.pyth.network/developers/price-feed-ids#near)

#### 2) Fetch feed from Hermes API

Fetch price feeds using the [Hermes API](https://docs.pyth.network/price-feeds/how-pyth-works/hermes) `/get_vaa` endpoint using the following parameters:

- Price Feed ID
- Publish Time in milliseconds

`Example:`

```js
// Define priceId and publishTime variables
// NOTE: Remove the `0x` prefix from the price feed ID
const priceId =
  'f9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b'; // BTC testnet price feed ID
const publishTime = Math.floor(Date.now() / 1000) - 1; // Current time minus 1 millisecond to account for latency

// Fetch price data from Hermes API beta endpoint for testnet
const response = await axios.get(
  `https://hermes-beta.pyth.network/api/get_vaa?id=${priceId}&publish_time=${publishTime}`
);
```

#### 3) Encode API response to hex for NEAR

NEAR requires hex-encoded price feeds, so you will need to convert the base64 response to hex.

`Example:`

```js
const base64 = Buffer.from(response.data.vaa, 'base64').toString('hex');
```

#### 4) Call `update_price_feeds`

With the hex-encoded price feed data, call `update_price_feeds` on the NEAR Pyth contract. You can do this using the `near-js/client` library.

`Example:`

```js
// https://www.npmjs.com/package/@near-js/client
const { nearConnect } = require('../utils/connect');
const { functionCall } = require('@near-js/client');

async function updatePythContractPriceFeeds() {
  const { rpcProvider, signer } = nearConnect(sender, 'testnet');

  const publishTime = Math.floor(Date.now() / 1000) - 1;
  const data = await getHermesPriceData(PRICE_IDS[0], publishTime);

  const result = await functionCall({
    sender,
    receiver,
    method: 'update_price_feeds',
    args: { data },
    deposit: 100000000000000000000000,
    deps: { rpcProvider, signer },
  });

  console.log(
    `Transaction 👉 https://testnet.nearblocks.io/txns/${result.outcome.transaction.hash}`
  );
  return result;
}

updatePythContractPriceFeeds();
```

### Full example for `testnet` using a node.js script

<Language value="js" language="js">
  <Github
          url="https://github.com/near-examples/near-js/blob/2b28f287faeecd20ef4bccaea1606434594b9507/node-js/oracle-example/pyth-oracle-update.js"/>
</Language>

### Updating Pyth Oracle Price Feeds

### `get_price`

Note: The parameters gas and attachedDeposit are specific to NEAR and must be adjusted based on your contract's demands. While any unused deposit will be refunded, it's advisable to estimate potential costs by invoking the get_update_fee_estimate method on the Pyth contract.

Updates can be submitted to this call and sourced from the [Hermes API](https://hermes-beta.pyth.network/) for testnet. To try this out, use the `get_vaa` endpoint to request a price feed
update. Remember, you must convert the returned base64 blob to
hex before using it in the `update_price_feeds` call due to NEAR requiring hex encoding for byte data.

Integrating this updating process directly within your contract can streamline operations by reducing the number of transactions needed. For implementation details, refer to the example contract linked below.

Refer to the [Pyth example contract](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/near/example) for more detailed integration approaches.

:::info
Gas and attachedDeposit are NEAR-specific parameters that you
may need to set depending on the contract's requirements. Unused
deposit will be refunded, but you can calculate an esimtate by calling
the `get_update_fee_estimate` method against the Pyth contract.
:::

## On-Chain Prices

For on-chain price interactions, see the [example contract](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/near/example) in the Pyth Github repo for an example of how to update and use prices within a NEAR contract.

A CLI-based approach can also be taken for interacting with Pyth prices,
see the [update.sh](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/near/scripts/update.sh) example script in the repository to see how to pull prices with the official NEAR cli.

## Contract Addresses

Developers will need the address of the Pyth price feed contract on their blockchain in order to use Pyth.
Please consult [Near Contract Addresses](https://docs.pyth.network/price-feeds/contract-addresses/near) to find the address for your blockchain.
