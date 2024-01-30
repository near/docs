import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="Paras" label="Paras" default>

```bash
near call x.paras.near buy '{"token_series_id": "299102", "receiver_id": "bob.near"}' --accountId bob.near --deposit 0.20574
```

**Example response:**

```json
"299102:1"
```


</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```bash
near call simple.market.mintbase1.near buy '{"nft_contract_id": "rubennnnnnnn.mintbase1.near", "token_id": "38"}' --accountId bob.near --deposit 0.001
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
