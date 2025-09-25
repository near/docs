```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = 'nft.primitives.near';
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

await wallet.callMethod({
  method: 'nft_transfer',
  args: {
    token_id: '1',
    receiver_id: 'bob.near',
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 1,
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/)_
