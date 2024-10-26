---
id: oracles
title: Oracles
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Oracles](https://en.wikipedia.org/wiki/Blockchain_oracle) act as a bridge between a blockchain platform and off-chain data allowing smart contracts the ability to access information from the outside-world. Because blockchain platforms operate in a closed ecosystem or "walled garden", these third party oracle services are essential in providing access to external data, events, or APIs.

Examples include:

- **Price Feeds** -> _Real-time price information for cryptocurrencies, stocks, or commodities._
- **Event Information** -> _Reporting occurrences such as sporting events or weather conditions_
- **APIs** -> _Connecting smart contracts to external web services or systems._

---

## Price Oracles

- Account: **priceoracle.near** | **priceoracle.testnet**
- Creator: [NearDefi](https://github.com/NearDeFi)
- Smart contract: https://github.com/NearDeFi/price-oracle
- Bot to fill contract: https://github.com/NearDeFi/near-price-oracle-bot

## Query Assets

<Tabs>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near view priceoracle.near get_assets
```

</TabItem>

</Tabs>

<details>

<summary>Example response</summary>

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
        {
          oracle_id: 'npo-aurora.near',
          timestamp: '1706631791706032710',
          price: { multiplier: '30641', decimals: 28 }
        },
        {
          oracle_id: 'gloriafoster.near',
          timestamp: '1706631808550973590',
          price: { multiplier: '30666', decimals: 28 }
        },
        ...
```

</details>

---

## Get Assets Price

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

Divide the returned `multiplier` by `10000` to obtain the price in USD.

:::
