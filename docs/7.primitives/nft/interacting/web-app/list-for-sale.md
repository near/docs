import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs";

<Tabs groupId="nft-contract-tabs">
<TabItem value="Paras" label="Paras">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "marketplace.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'storage_deposit',
  args: {
    receiver_id: "bob.near"
  },
  contractId: CONTRACT_ADDRESS,
  gas: 300000000000000, // attached GAS (optional)
  deposit: 9390000000000000000 // attached deposit in yoctoNEAR (optional)
});

await wallet.callMethod({
  method: 'nft_approve',
  args: {
    token_id: "1e95238d266e5497d735eb30",
    account_id: "marketplace.paras.near",
    msg: {
      price: "200000000000000000000000",
      market_type: "sale",
      ft_token_id: "near"
    }
  },
  contractId: "nft.primitives.near"
});
```

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `marketplace.paras.near` as a callback.

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "simple.market.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'deposit_storage',
  args: {
      autotransfer: true
    },
  contractId: CONTRACT_ADDRESS,
  gas: 300000000000000, // attached GAS (optional)
  deposit: 9390000000000000000 // attached deposit in yoctoNEAR (optional)
});

await wallet.callMethod({
  method: 'nft_approve',
  args: {
    args: {
      token_id: "3c46b76cbd48e65f2fc88473",
      account_id: "simple.market.mintbase1.near",
      msg: {
        price: "200000000000000000000000"
      }
    },
  },
  contractId: "nft.primitives.near"
});
```

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `simple.market.mintbase1.near` as a callback.

By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/list)

```js
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, list, ListArgs } from '@mintbase-js/sdk';

export const ListComponent = ({ contractAddress, marketAddress , tokenId, price }: ListArgs):JSX.Element => {
  const { selector } = useWallet();

  const handleList = async (): Promise<void> => {
    const wallet = await selector.wallet();
    
    await execute(
        { wallet },
        list({
         contractAddress: nftContractId, 
         marketAddress: marketId, 
         tokenId: tokenId, 
         price: price
        })
      )
  }

  return (
    <div>
      <button onClick={handleList}>
        DeployContract with name= {name} and owner= {owner}
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