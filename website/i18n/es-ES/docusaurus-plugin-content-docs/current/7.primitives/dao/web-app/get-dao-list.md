```js
import { Wallet } from './near-wallet';

const DAO_FACTORY_CONTRACT_ADDRESS = "sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_FACTORY_CONTRACT_ADDRESS });
 
await wallet.viewMethod({
  method: 'get_dao_list',
  args: {},
  contractId: DAO_FACTORY_CONTRACT_ADDRESS
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
