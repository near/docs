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

## Oracles as a Service

### Switchboard

- Account: **switchboard-v2.near** | **switchboard-v2.testnet**
- Creator: [Switchboard](https://twitter.com/switchboardxyz)
- Documentation: https://docs.switchboard.xyz/near/program/mainnet
- Typescript documentation: https://docs.switchboard.xyz/near/dev/javascript
- CLI documentation: https://docs.switchboard.xyz/near/dev/cli
- Integration example: https://github.com/switchboard-xyz/sbv2-near/blob/main/programs/feed-parser/src/lib.rs
- crates.io: https://crates.io/crates/sbv2-near

## Price Oracles

### Promixityfi

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

