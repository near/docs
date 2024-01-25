import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs";

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="NFT Primitive" label="NFT Primitive" default>

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

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By using [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)

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

By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/transfer)

```js
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, transfer, TransferArgs } from '@mintbase-js/sdk';

const TransferComponent = ({ tokenId, contractAddress }: TransferArgs): JSX.Element => {
  const { selector, activeAccountId } = useWallet();

  const handleTransfer = async (): Promise<void> => {
    const wallet = await selector.wallet();

    const transferArgs: TransferArgs = {
        contractAddress: contractAddress,
        transfers: [{
          receiverId: 'mb_carol.testnet',
          tokenId: token.tokenId,
        }],
      }

    await execute(
      { wallet },
      transfer(transferArgs),
    );
  };

  return (
    <div>
      <button onClick={handleTransfer}>
        Transfer {tokenId} of {contractAddress} from {activeAccountId} to Carol
      </button>
    </div>
  );
}
```

</TabItem>
</Tabs>

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />