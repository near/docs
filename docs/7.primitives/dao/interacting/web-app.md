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

---

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

---

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

---

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
      purpose: "",
      bond: "100000000000000000000000",
      vote_period: "604800000000000",
      grace_period: "86400000000000",
      policy: {
        roles: [
          {
            name: "council",
            slug: "council",
            kind: { Group: ["bob.near"] },
            permissions: [
              "*:Finalize",
              "policy:AddProposal",
              "add_bounty:AddProposal",
              "bounty_done:AddProposal",
              "transfer:AddProposal",
              "vote:AddProposal",
              "remove_member_from_role:AddProposal",
              "add_member_to_role:AddProposal",
              "config:AddProposal",
              "call:AddProposal",
              "upgrade_remote:AddProposal",
              "upgrade_self:AddProposal",
              "set_vote_token:AddProposal",
              "policy:VoteApprove",
              "policy:VoteReject",
              "policy:VoteRemove",
              "add_bounty:VoteApprove",
              "add_bounty:VoteReject",
              "add_bounty:VoteRemove",
              "bounty_done:VoteApprove",
              "bounty_done:VoteReject",
              "bounty_done:VoteRemove",
              "transfer:VoteApprove",
              "transfer:VoteReject",
              "transfer:VoteRemove",
              "vote:VoteApprove",
              "vote:VoteReject",
              "vote:VoteRemove",
              "remove_member_from_role:VoteApprove",
              "remove_member_from_role:VoteReject",
              "remove_member_from_role:VoteRemove",
              "add_member_to_role:VoteApprove",
              "add_member_to_role:VoteReject",
              "add_member_to_role:VoteRemove",
              "call:VoteApprove",
              "call:VoteReject",
              "call:VoteRemove",
              "config:VoteApprove",
              "config:VoteReject",
              "config:VoteRemove",
              "set_vote_token:VoteApprove",
              "set_vote_token:VoteReject",
              "set_vote_token:VoteRemove",
              "upgrade_self:VoteApprove",
              "upgrade_self:VoteReject",
              "upgrade_self:VoteRemove",
              "upgrade_remote:VoteApprove",
              "upgrade_remote:VoteReject",
              "upgrade_remote:VoteRemove",
            ],
            vote_policy: {},
          },
          {
            name: "all",
            slug: "all",
            kind: "Everyone",
            permissions: [],
            vote_policy: {},
          },
        ],
        default_vote_policy: {
          weight_kind: "RoleWeight",
          quorum: "0",
          threshold: [1, 2],
        },
        proposal_bond: "100000000000000000000000",
        proposal_period: "604800000000000",
        bounty_bond: "100000000000000000000000",
        bounty_forgiveness_period: "604800000000000",
      },
      config: {
        name: "primitives",
        purpose: "",
        metadata:
          "eyJsaW5rcyI6WyJodHRwczovL2RvY3MubmVhci5vcmcvIl0sImZsYWdDb3ZlciI6IiIsImZsYWdMb2dvIjoiT3ZvN3k4cWJPRFFvaWRKZWlnbTRhIiwiZGlzcGxheU5hbWUiOiJQcmltaXRpdmVzIiwibGVnYWwiOnsibGVnYWxTdGF0dXMiOiIiLCJsZWdhbExpbmsiOiIifX0=",
      },
    }),
  },
  contractId: DAO_FACTORY_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 6000000000000000000000000
});
```

---

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

---

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
