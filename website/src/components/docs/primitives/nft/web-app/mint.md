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


_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend)_
