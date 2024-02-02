import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="Paras" label="Paras">

```js
Near.call(
  "marketplace.paras.near",
  "storage_deposit",
  {
    receiver_id: "bob.near"
  },
  undefined,
  9390000000000000000
);

Near.call(
  "nft.primitives.near",
  "nft_approve",
  {
    token_id: "1e95238d266e5497d735eb30",
    account_id: "marketplace.paras.near",
    msg: {
      price: "200000000000000000000000",
      market_type: "sale",
      ft_token_id: "near"
    }
  }
);
```

The method `nft_approve` will call `nft_on_approve` in `marketplace.paras.near`.

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
Near.call(
  "simple.market.mintbase1.near",
  "deposit_storage",
  {
    autotransfer: true
  },
  undefined,
  9390000000000000000
);

Near.call(
  "nft.primitives.near",
  "nft_approve",
  {
    token_id: "3c46b76cbd48e65f2fc88473",
    account_id: "simple.market.mintbase1.near",
    msg: {
      price: "200000000000000000000000"
    }
  }
);
```

The method `nft_approve` will call `nft_on_approve` in `simple.market.mintbase1.near`.

</TabItem>
</Tabs>