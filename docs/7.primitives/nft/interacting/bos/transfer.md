import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs">
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```js
const tokenData = Near.call(
  "nft.primitives.near",
  "nft_transfer",
  {
    token_id: "1",
    receiver_id: "bob.near"
  },
  undefined,
  1,
);
```

</TabItem>

<TabItem value="Paras" label="Paras">

```js
const tokenData = Near.call(
  "x.paras.near",
  "nft_transfer",
  {
    token_id: "490641",
    receiver_id: "bob.near"
  },
  undefined,
  1
);
```

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
const tokenData = Near.call(
  "thomasettorreiv.mintbase1.near",
  "nft_transfer",
  {
    token_id: "490641",
    receiver_id: "bob.near"
  },
  undefined,
  1
);
```

</TabItem>
</Tabs>