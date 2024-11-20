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
- **Codebase Repository:** [NearDefi/price-oracle](https://github.com/NearDeFi/price-oracle)
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
- **Official Documentation:** [Pyth NEAR Docs](https://docs.pyth.network/price-feeds/use-real-time-data/near)
- **Codebase Repository:** [pyth-network/pyth-crosschain](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/near)
- **Deployed Addresses:**
  - **Mainnet:** [pyth-oracle.near](https://nearblocks.io/address/pyth-oracle.near)
  - **Testnet:** [pyth-oracle.testnet](https://testnet.nearblocks.io/address/pyth-oracle.testnet)

---

## Using Pyth Network Oracle

> Pyth Network's NEAR smart contract has two core methods to update & get price feeds of your choice.

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

### Getting Started

To get started with Pyth oracle you will need to gather the following information which differ between networks:

- Price ID(s)
- HermesAPI Endpoint
- Smart contract address

| Network   | Price Feed IDs                                                                                   | Hermes API Address         | Contract Address                                                                 |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------------- | -------------------------------------------------------------------------------- |
| `testnet` | [NEAR `testnet` Price Feed IDs](https://www.pyth.network/developers/price-feed-ids#near-testnet) | `hermes-beta.pyth.network` | [pyth-oracle.testnet](https://testnet.nearblocks.io/address/pyth-oracle.testnet) |
| `mainnet` | [NEAR `mainnet` Price Feed IDs](https://www.pyth.network/developers/price-feed-ids#near-mainnet) | `hermes.pyth.network`      | [pyth-oracle.near](https://nearblocks.io/address/pyth-oracle.near)               |

:::info

When using Price Feed IDs, you will need to remove the `0x` prefix.

`Price Feed ID Example (testnet):`

<Github language='typescript' url='https://github.com/near-examples/near-js/blob/main/node-js/oracle-example/pyth-oracle-update.js' start='14' end='15'/>

:::

---

### `update_price_feeds`

> Updates the Pyth Oracle contract data with the price feed you provide.

- args: `data` _(off-chain hex-encoded price feed)_
- type: `object`
- example: `{ "data": "504e41...' }`

Update the Pyth Oracle contract with new price feed data in two main steps:

1. [Fetch off-chain price feed](#1-fetching-off-chain-price-feed)
2. [Update Pyth Oracle contract with off-chain price feed](#2-update-pyth-oracle-contract-price-feed)

#### 1) Fetching off-chain price feed

You can obtain an off-chain price feed using Pyth's [Hermes API](https://hermes-beta.pyth.network/docs/).

To use these endpoints, you will need to provide a Price Feed ID and ensure you are targeting the correct network. See [Getting Started](#getting-started) for more information.

Here is a node.js example of fetching the latest price feed using `/v2/updates/price/latest` endpoint:

<Language value="js" language="js">
  <Github
          url="https://github.com/near-examples/near-js/blob/main/node-js/utils/fetch-hermes-price-data.js"/>
</Language>

#### 2) Update Pyth Oracle Contract Price Feed

After [fetching an off-chain price feed](#1-fetching-off-chain-price-feed), you can now perform a contract call to the Pyth Oracle to update the price feed on-chain.

Call `update_price_feeds` on the Pyth Oracle contract with `data` as your arguments.

`example args:`

```json
{
  "data": "504e41550100000000a00100000000010070b0ee3a00d1a3c07ee440887eb34a5a35860e6f4b9230fd62f0593fe35c8a3561735a6a37d269c5f166b84ead8918f710dc1be2ee6b51db5b22340ea2c173fc01673d544b00000000001ae101faedac5851e32b9b23b5f9411a8c2bac4aae3ed4dd7b811dd1a72ea4aa7100000000061bc18c014155575600000000000ab0f04600002710f41bc8c224ed983c68dbf5dab7dd34c9129fecfa03005500ca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a600000047e2eb4ef0000000000692480ffffffff800000000673d544b00000000673d544b00000048200e66a00000000005e495a60bb9370c458dd50558b34699b5b179f45e56be22f0a1a0feb1db8469adc8c5efeb53988495bac07bf9efed07f5eee43818150c55055882f6872a228e8e9bc78459ed3ea7fe0b86f3048f6bf0aad34befc46063ab7d200beb8bc9fe5839844d2233546f0742bb665f1e610370fcf8ce5be83d0f47e584b685af87cf3ebcb79e714827dcb99dba579e1a03785052ab3c7c7147d3f7bba822b04dbda159670e9a8d29e7ccf68474b2ca85e00224d29bf65b06b09f95e91703313e053b697b48ac1e4d1c57605a71ab77e7ef276bfe8a369c268333b9a37461bf2b7cb7fd4c005500ecf553770d9b10965f8fb64771e93f5690a182edc32be4a3236e0caaa6e0581a0000000e2ba8cd280000000001b40517fffffff800000000673d544b00000000673d544b0000000e3ea44c6800000000016aee120b47b853f55949284cb8ba0b63824ff9b48cd1da8417f45421b79ee3195fc8d107540a0bbb95c2445b66065754f135cb842db09a7e7ab33f79c546a48db872bd7197b04e3d7b52fbb55b3b9f51707c5a55fac3707cb563dbcde4aadeecc3649c237454cecf519dc567c0da03d81808523aa4fa71815eab25ce7da61b48647bac645d403208135002aab5fde2d7ab3c7c7147d3f7bba822b04dbda159670e9a8d29e7ccf68474b2ca85e00224d29bf65b06b09f95e91703313e053b697b48ac1e4d1c57605a71ab77e7ef276bfe8a369c268333b9a37461bf2b7cb7fd4c"
}
```

Example of updating the Pyth Oracle contract's price feed using `near-js/client` and node.js:

<Language value="js" language="js">
  <Github fname="updatePythContract"
          url="https://github.com/near-examples/near-js/blob/main/node-js/oracle-example/pyth-oracle-update.js"/>
  <Github fname="getHermesPriceData"
          url="https://github.com/near-examples/near-js/blob/main/node-js/utils/fetch-hermes-price-data.js"/>
  <Github fname="nearConnect"
          url="https://github.com/near-examples/near-js/blob/main/node-js/utils/connect.js"/>
</Language>

:::info

Although unused deposit will be refunded, you can calculate an estimate by calling the `get_update_fee_estimate` method against the Pyth contract.

:::

---

### `get_price`

> Fetches the most recent price feed stored in the Pyth Oracle contract. Is a view method, so does not require a signature or payment.

- args: `price_identifier` _(unique [price feed identifier](#environment-variables))_
- type: `object`
- example: `{ price_identifier: 'f9c0172ba10dfa8...' }`

After [updating the price feed](#update_price_feeds), you can view the feed on-chain by calling `get_price` on the Pyth Oracle contract. Note that this is a view method and does not require a signature or deposit.

`Example:`

<Language value="js" language="js">
  <Github
          url="https://github.com/near-examples/near-js/blob/main/node-js/oracle-example/pyth-oracle-view.js"/>
</Language>
