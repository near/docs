import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

<Tabs groupId="nft-contract-tabs" className="file-tabs">

<TabItem value="Paras" label="Paras">
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/buy-nft-paras.json" />

<details>

<summary>Example response</summary>

```json
"299102:1"
```

</details>
</TabItem>

<TabItem value="Mintbase" label="Mintbase">
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/buy-nft-mintbase.json" />

<details>

<summary>Example response</summary>

```json
{
  "payout": {
    "rub3n.near": "889200000000000000000",
    "rubenm4rcus.near": "85800000000000000000"
  }
}
```

</details>
</TabItem>

</Tabs>