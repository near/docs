import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="Paras" label="Paras">

```bash
near call marketplace.paras.near storage_deposit '{"receiver_id": "bob.near"}' --accountId bob.near --deposit 0.00939

near call nft.primitives.near nft_approve '{"token_id": "1e95238d266e5497d735eb30", "account_id": "marketplace.paras.near", "msg": {"price": "200000000000000000000000", "market_type": "sale", "ft_token_id": "near"}}' --accountId bob.near
```

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `marketplace.paras.near` as a callback.

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```bash
near call simple.market.mintbase1.near deposit_storage '{"autotransfer": "true"}' --accountId bob.near --deposit 0.00939

near call nft.primitives.near nft_approve '{"token_id": "3c46b76cbd48e65f2fc88473", "account_id": "simple.market.mintbase1.near", "msg": {"price": "200000000000000000000000"}}' --accountId bob.near
```

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `simple.market.mintbase1.near` as a callback.

</TabItem>

</Tabs>
