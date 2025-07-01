import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="NFT Primitive" label="Reference" default>

```js
const tokenData = Near.call(
  'nft.primitives.near',
  'nft_mint',
  {
    token_id: '1',
    receiver_id: 'bob.near',
    token_metadata: {
      title: 'NFT Primitive Token',
      description: 'Awesome NFT Primitive Token',
      media: 'string', // URL to associated media, preferably to decentralized, content-addressed storage
    },
  },
  undefined,
  10000000000000000000000, // Depends on your NFT metadata
);
```

</TabItem>

<TabItem value="Paras" label="Paras">

```js
const tokenData = Near.call(
  'x.paras.near',
  'nft_mint',
  {
    token_series_id: '490641',
    receiver_id: 'bob.near',
  },
  undefined,
  10000000000000000000000, // Depends on your NFT metadata
);
```

:::note
In order to use `nft_mint` method of the `x.paras.near` contract you have to be a creator of a particular token series.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
const tokenData = Near.call(
  'thomasettorreiv.mintbase1.near',
  'nft_batch_mint',
  {
    num_to_mint: 1,
    owner_id: 'bob.near',
    metadata: {},
  },
  undefined,
  10000000000000000000000,
);
```

:::note
In order to use `nft_batch_mint` method of Mintbase store contract your account have to be a in the contract minters list.
:::

</TabItem>

</Tabs>
