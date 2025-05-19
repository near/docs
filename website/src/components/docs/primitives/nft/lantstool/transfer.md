import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

<Tabs groupId="nft-contract-tabs" className="file-tabs">

<TabItem value="NFT Primitive" label="Reference" default>
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/transfer-nft-reference.json" branch="nft"/>
</TabItem>

<TabItem value="Paras" label="Paras">
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/transfer-nft-paras.json" branch="nft"/>
</TabItem>

<TabItem value="Mintbase" label="Mintbase">
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/transfer-nft-mintbase.json" branch="nft"/>
</TabItem>

</Tabs>