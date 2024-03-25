import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="NFT Primitive" label="Reference" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "nft.primitives.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_transfer',
  args: {
    token_id: "1",
    receiver_id: "bob.near"
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 1
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

</TabItem>

<TabItem value="Paras" label="Paras">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "x.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_transfer',
  args: {
    token_id: "490641",
    receiver_id: "bob.near"
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 1
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "thomasettorreiv.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_transfer',
  args: {
    token_id: "490641",
    receiver_id: "bob.near"
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 1
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

:::tip

Check how to also do this using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/transfer)

:::

</TabItem>

</Tabs>
