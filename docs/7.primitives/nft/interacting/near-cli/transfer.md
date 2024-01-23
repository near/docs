import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs">
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```bash
near call nft.primitives.near nft_transfer '{"token_id": "1", "receiver_id": "bob.near"}' --accountId bob.near --deposit 0.000000000000000000000001
```

</TabItem>

<TabItem value="Paras" label="Paras">

```bash
near call x.paras.near nft_transfer '{"token_id": "490641", "receiver_id": "bob.near"}' --accountId bob.near --deposit 0.000000000000000000000001
```

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```bash
near call thomasettorreiv.mintbase1.near nft_transfer '{"token_id": "490641" "receiver_id": "bob.near"}' --accountId bob.near --deposit 0.000000000000000000000001
```

</TabItem>
</Tabs>
