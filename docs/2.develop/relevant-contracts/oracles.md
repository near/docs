---
id: oracles
title: Oracles
sidebar_label: 🔮 Oracles
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Oracles are smart contracts that enable you to query the current price of an asset. Since smart contracts cannot connect to
internet and pull information, Oracles rely on having someone constantly updating their prices. Because of that, be mindful
when using an oracle that there might be a delay between the market's latest information and the Oracles data.

In contrast with [FT](ft.md) and [NFT](nft.md), Oracle contract's are not standardized. We will here list different providers
and how to use their Oracle as they are built.

---

## Price Oracle - Promixityfi

- Account: **price-oracle.near** | **price-oracle.testnet**
- Creator: [Proximity](https://twitter.com/proximityfi)
- Smart contract: https://github.com/NearDeFi/price-oracle
- Bot to fill contract: https://github.com/NearDeFi/near-price-oracle-bot

#### Query Assets

<Tabs>
  <TabItem value="cli" label="CLI">

  ```bash
  NEAR_ENV=mainnet near view priceoracle.near get_assets
  ```
    
  </TabItem>

<!--  
  <TabItem value="xcc-rs" label="Contract Call">
  ```rs
  pub type AssetId = String;
  #[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
  #[serde(crate = "near_sdk::serde")]
  pub struct Asset {
      pub reports: Vec<Report>,
      pub emas: Vec<AssetEma>,
  }
  #[ext_contract(price_oracle)]
  trait Oracle {
    fn get_assets(&mut self) -> Vec<(AssetId, Asset)>;
  }
  // Use this call in your method
  let promise = price_oracle::ext("price-oracle.near".parse().unwrap())
    .with_static_gas(Gas(5*TGAS))
    .get_assets();
  ```
  </TabItem> 
-->
</Tabs>

#### Get Assets Price

<Tabs>
  <TabItem value="cli" label="CLI">

  ```bash
  NEAR_ENV=mainnet near view priceoracle.near get_price_data
  ```

  </TabItem>
</Tabs>

:::tip
  Divide the returned `multiplier` by `10000` to obtain the price in USD.
:::

## RedStone oracles

RedStone is a data ecosystem that delivers frequently updated, reliable and diverse data for your dApps and smart contracts.

It uses a radically different way of putting oracle data on-chain:

- RedStone data providers need to sign provided data and broadcast it using the decentralized [Streamr](https://streamr.network/) pub-sub network. Providers **don't need to push the data on-chain**, which allows them to provide way **more types of data** with significantly **higher update frequency**
- End users can receive signed oracle data from the Streamr network and self-deliver it on-chain, attaching it to their transactions
- On-chain Smart Contracts can verify the data integrity using cryptographic signatures and timestamps

Additionally, RedStone:

- Uses token incentives to motivate data providers to maintain data integrity and uninterrupted service
- Leverages [Arweave blockchain](https://www.arweave.org/) as a cheap and permanent decentralized storage for archiving Oracle data and maintaining data providers' accountability


To learn more about RedStone oracles use the following links:

- [RedStone documentation](https://docs.redstone.finance/docs/introduction)
- [Supported Price Feeds (1000+)](https://docs.redstone.finance/docs/smart-contract-devs/price-feeds)
- [Data from custom URLs](https://docs.redstone.finance/docs/smart-contract-devs/custom-urls)
- [NFT Data Feeds](https://docs.redstone.finance/docs/smart-contract-devs/nft-data-feeds)
- [Verifiable entropy](https://docs.redstone.finance/docs/smart-contract-devs/pseudo-randomness)

### How to integrate RedStone

**IMPORTANT**: RedStone codebase is still undergoing security audit and we are working on the infrastructure secutiry improvements. So, before using RedStone oracles in production dApps, please reach out to us on [Discord](https://discord.com/invite/PVxBZKFr46). We will be happy to help you with the integration and will set up a new pool of data provider nodes if there is a need.

- [Integrate RedStone Oracles with NEAR contracts in **RUST**](https://github.com/redstone-finance/redstone-near-connectors/blob/main/rust/README.md)
- [Integrate RedStone Oracles with NEAR contracts in **JS**](https://github.com/redstone-finance/redstone-near-connectors/blob/main/js/README.md)

If you would like to use RedStone oracles on the [Aurora]() chain, just go to the main [RedStone documentation](https://docs.redstone.finance/docs/smart-contract-devs/getting-started). It provides comprehensive explanation of integration with EVM-compatible chains.

### Contact RedStone team
- [Website](https://redstone.finance/)
- [Discord](https://discord.com/invite/PVxBZKFr46)
- [Twitter](https://twitter.com/redstone_defi)
