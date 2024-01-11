---
id: oracles
title: Decentralized Oracles
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

오라클은 자산의 현재 가격을 조회할 수 있는 스마트 컨트랙트입니다. 스마트 컨트랙트는 인터넷에 연결하여 정보를 가져올 수 없기 때문에, 오라클은 누군가 지속적으로 가격을 업데이트하는 데 의존합니다. 그렇기 때문에 시장의 최신 정보와 오라클 데이터 사이에 지연이 있을 수 있다는 점을 오라클을 사용할 때 염두에 두어야 합니다.

[FT](ft.md) 및 [NFT](nft.md)와 달리 오라클 컨트랙트는 표준화되지 않았습니다. 여기서는 다양한 제공업체와 구축된 오라클을 사용하는 방법을 나열합니다.

---

## 가격 오라클

### Native Oracle

- Account: **priceoracle.near** | **priceoracle.testnet**
- Creator: [NearDefi](https://github.com/NearDeFi)
- 스마트 컨트랙트: https://github.com/NearDeFi/price-oracle
- 컨트랙트 체결 봇: https://github.com/NearDeFi/near-price-oracle-bot

#### 자산 쿼리

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

#### 자산 가격 가져오기

<Tabs>
  <TabItem value="cli" label="CLI">

```bash
NEAR_ENV=mainnet near view priceoracle.near get_price_data
```

  </TabItem>
</Tabs>

:::tip Divide the returned `multiplier` by `10000` to obtain the price in USD. :::
