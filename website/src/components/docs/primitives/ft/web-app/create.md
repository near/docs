```js
import { Wallet } from './near-wallet';

const wallet = new Wallet({});

const args = {
  args: {
    owner_id: 'bob.near',
    total_supply: '1000000000',
    metadata: {
      spec: 'ft-1.0.0',
      name: 'Test Token',
      symbol: 'test',
      icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      decimals: 18,
    },
  },
  account_id: 'bob.near',
};

await wallet.callMethod({
  method: 'create_token',
  args,
  contractId: 'tkn.primitives.near',
  gas: 300000000000000,
  deposit: '2234830000000000000000000',
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
