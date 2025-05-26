import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="Paras" label="Paras" default>

```js
const tokenData = Near.call(
  'x.paras.near',
  'nft_buy',
  {
    token_series_id: '299102',
    receiver_id: 'bob.near',
  },
  undefined,
  205740000000000000000000, // NFT price + storage cost
);
```

**Example response:**

```json
"299102:1"
```

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
const tokenData = Near.call(
  'simple.market.mintbase1.near',
  'buy',
  {
    nft_contract_id: 'rubennnnnnnn.mintbase1.near',
    token_id: '38',
    referrer_id: null,
  },
  undefined,
  1000000000000000000000, // NFT price + storage cost (optional, depends on a contract)
);
```

**Example response:**

```json
{
  "payout": {
    "rub3n.near": "889200000000000000000",
    "rubenm4rcus.near": "85800000000000000000"
  }
}
```

</TabItem>

</Tabs>
