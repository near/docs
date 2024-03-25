```js
import { Wallet } from './near-wallet';

const DAO_CONTRACT_ADDRESS = "nearweek-news-contribution.sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });
 
await wallet.viewMethod({
  method: 'get_proposals',
  args: { from_index: 9262, limit: 2 },
  contractId: DAO_CONTRACT_ADDRESS
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
