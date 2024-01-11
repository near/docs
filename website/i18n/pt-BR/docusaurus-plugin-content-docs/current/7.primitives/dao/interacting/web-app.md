---
id: web-app
title: Web Application
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create or interact with DAO directly from a web app.

:::info
All the examples are using a `Wallet` object, which comes from our [basic template](https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js)
:::

***

## List of DAOs

This snippet will enable you to query list of DAOs.

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

***

## List of proposals

This snippet will enable you to query list of proposals for a particular DAO.

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

***

## Create DAO

This snippet will enable your users to create a DAO.

```js
import { Wallet } from './near-wallet';

const DAO_FACTORY_CONTRACT_ADDRESS = "sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_FACTORY_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'create',
  args: {
    name: "primitives",
    args: btoa({
      config: {
        name: "Primitives",
        purpose: "Building primitives on NEAR",
        metadata: ""
      },
      policy: ["bob.near"]
    }),
  },
  contractId: DAO_FACTORY_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 6000000000000000000000000
});
```

:::note
The full list of roles and permissions you can find [here](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions).
:::

***

## Create proposal

This snippet will enable your users to create a proposal for a particular DAO.

```js
import { Wallet } from './near-wallet';

const DAO_CONTRACT_ADDRESS = "primitives.sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'add_proposal',
  args: {
    proposal: {
      description: "My first proposal$$$$https://docs.near.org/",
      kind: {
        Transfer: {
          token_id: "",
          receiver_id: "bob.near",
          amount: "10000000000000000000000000",
        },
      },
    },
  },
  contractId: DAO_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 100000000000000000000000
});
```

***

## Vote for proposal

This snippet will enable your users to cast a vote for proposal of a particular DAO.

```js
import { Wallet } from './near-wallet';

const DAO_CONTRACT_ADDRESS = "primitives.sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'act_proposal',
  args: { id: 0, action: "VoteApprove" },
  contractId: DAO_CONTRACT_ADDRESS,
  gas: 300000000000000,
});
```

:::note
Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
:::
