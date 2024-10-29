---
id: oracles
title: Oracles
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Blockchain Oracles](https://en.wikipedia.org/wiki/Blockchain_oracle) serve as intermediaries that connect blockchain platforms with off-chain data. As blockchain platforms operate in a closed ecosystem or "walled garden", these third party oracle services are essential in providing access to external data, events, or APIs.

Oracles can provide:

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

### Pyth Network Capabilities

Pyth's NEAR smart contract provides the following core price feed methods:

- `update_price_feeds`: Refreshes multiple feeds with fresh data.
- `get_price`: Fetches current prices for specific feeds.

See Pyth's [`receiver` contract methods documentation](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/near/receiver/src/ext.rs) for a complete detailed list.

### Integrating Price Feeds

1. **Install the NEAR JavaScript SDK:**

   ```bash
   npm install near-api-js
   # or
   yarn add near-api-js
   ```

2. **Interact with the Contract:**

   ```javascript
   // Using async/await for NEAR API calls
   async function updatePriceFeeds(data) {
     const near = await connect(config);
     const result = await account.functionCall({
       contractId: 'pyth.testnet',
       methodName: 'update_price_feeds',
       args: { data },
       gas: new utils.BN('30000000000000'),
       attachedDeposit: utils.format.parseNearAmount('1'),
     });
     console.log('Update Price Feeds Result: ', result);
   }
   ```

   ```js
   async function fetchPriceFeed() {
   const near = await connect(config);
   const account = await near.account();
   const contractId = "pyth-oracle.testnet";
   const identifier = "PriceIdentifier";

   const priceFeed = await account.viewFunction(
    contractId,
    "get_price",
    args: { identifier }
   );

   console.log("Price Feed Data: ", priceFeed);
   }
   ```

Furthermore,

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
