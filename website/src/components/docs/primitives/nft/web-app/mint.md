import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="NFT Primitive" label="Reference" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = 'nft.primitives.near';
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

await wallet.callMethod({
  method: 'nft_mint',
  args: {
    token_id: '1',
    receiver_id: 'bob.near',
    token_metadata: {
      title: 'NFT Primitive Token',
      description: 'Awesome NFT Primitive Token',
      media: 'string', // URL to associated media, preferably to decentralized, content-addressed storage
    },
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 10000000000000000000000,
});
```

</TabItem>

<TabItem value="Paras" label="Paras">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = 'x.paras.near';
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

await wallet.callMethod({
  method: 'nft_mint',
  args: {
    token_series_id: '490641',
    receiver_id: 'bob.near',
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 10000000000000000000000, // Depends on your NFT metadata
});
```

:::note
In order to use `nft_mint` method of the `x.paras.near` contract you have to be a creator of a particular token series.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = 'thomasettorreiv.mintbase1.near';
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

await wallet.callMethod({
  method: 'nft_batch_mint',
  args: {
    num_to_mint: 1,
    owner_id: 'bob.near',
    metadata: {},
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 10000000000000000000000, // Depends on your NFT metadata
});
```

:::note
In order to use `nft_batch_mint` method of Mintbase store contract your account have to be a in the contract minters list.
:::

:::tip
Check how to do this using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/mint)
:::

</TabItem>

</Tabs>

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
