import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

<Tabs groupId="nft-contract-tabs" className="file-tabs">

<TabItem value="NFT Primitive" label="Reference" default>
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/mint-nft-reference.json" branch="nft"/>
</TabItem>

<TabItem value="Paras" label="Paras">
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/mint-nft-paras.json" branch="nft"/>

:::note
In order to use `nft_mint` method of the `x.paras.near` contract you have to be a creator of a particular token series.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/mint-nft-mintbase.json" branch="nft"/>

:::note
In order to use `nft_batch_mint` method of Mintbase store contract your account have to be a in the contract minters list.
:::

</TabItem>
</Tabs>