import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Github} from "@site/src/components/codetabs";

<Tabs groupId="nft-contract-tabs">
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "nft.primitives.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_mint',
  args: {
    token_id: "1",
    receiver_id: "bob.near", 
    token_metadata: {
      title: "NFT Primitive Token",
      description: "Awesome NFT Primitive Token",
      media: "string", // URL to associated media, preferably to decentralized, content-addressed storage
    }
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 10000000000000000000000
});
```

</TabItem>

<TabItem value="Paras" label="Paras">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "x.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_mint',
  args: {
    token_series_id: "490641",
    receiver_id: "bob.near",
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 10000000000000000000000 // Depends on your NFT metadata
});
```

:::note
In order to use `nft_mint` method of the `x.paras.near` contract you have to be a creator of a particular token series.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By using [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "thomasettorreiv.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_batch_mint',
  args: {
    num_to_mint: 1,
    owner_id: "bob.near",
    metadata: {},
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 10000000000000000000000 // Depends on your NFT metadata
});
```

:::note
In order to use `nft_batch_mint` method of Mintbase store contract your account have to be a in the contract minters list.
:::

By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/mint)

```js
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, mint, MintArgs } from '@mintbase-js/sdk';


export const MintComponent = ({ media, reference, contractAddress, owner }: MintArgs): JSX.Element => {
  const { selector } = useWallet();

  const handleMint = async (): Promise<void> => {
    const wallet = await selector.wallet();

    await execute(
      mint({ contractAddress, metadata: { media, reference }, ownerId: owner })
    );
  }

  return (
    <div>
      <button onClick={handleMint}>
        Mint
      </button>
    </div>
  );
};
```

</TabItem>

</Tabs>

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />