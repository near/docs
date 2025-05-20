import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

<Tabs groupId="nft-contract-tabs" className="file-tabs">

<TabItem value="Paras" label="Paras">

<TryOutOnLantstool path="docs/2.build/5.primitives/nft/mp-storage-deposit-paras.json" />
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/mp-nft-sell-approve-paras.json" />

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `marketplace.paras.near` as a callback.

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

<TryOutOnLantstool path="docs/2.build/5.primitives/nft/mp-storage-deposit-mintbase.json" />
<TryOutOnLantstool path="docs/2.build/5.primitives/nft/mp-nft-sell-approve-mintbase.json" />

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `simple.market.mintbase1.near` as a callback.

</TabItem>

</Tabs>