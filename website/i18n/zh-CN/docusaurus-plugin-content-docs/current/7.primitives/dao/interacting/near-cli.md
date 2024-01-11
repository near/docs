---
id: near-cli
title: NEAR CLI
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create or interact with DAO from your shell using [`near-cli`](../../../4.tools/cli.md).

***

## List of DAOs

This snippet will enable you to query list of DAOs.

```bash
near view sputnik-dao.near get_dao_list '{}'
```

<details>
<summary>Example response</summary>
<p>

```bash
[
  'ref-finance.sputnik-dao.near'
  'gaming-dao.sputnik-dao.near',
  ...
]
```

</p>

</details>

***

## List of proposals

This snippet will enable you to query list of proposals for a particular DAO.

```bash
near view nearweek-news-contribution.sputnik-dao.near get_proposals '{"from_index": 9262, "limit": 2}'
```

<details>
<summary>Example response</summary>
<p>

```bash
[
  {
    id: 9262,
    proposer: 'pasternag.near',
    description: 'NEAR, a top non-EVM blockchain, has gone live on Router’s Testnet Mandara. With Router Nitro, our flagship dApp, users in the NEAR ecosystem can now transfer test tokens to and from NEAR onto other supported chains. $$$$https://twitter.com/routerprotocol/status/1727732303491961232',
    kind: {
      Transfer: {
        token_id: '',
        receiver_id: 'pasternag.near',
        amount: '500000000000000000000000',
        msg: null
      }
    },
    status: 'Approved',
    vote_counts: { council: [ 1, 0, 0 ] },
    votes: { 'brzk-93444.near': 'Approve' },
    submission_time: '1700828277659425683'
  },
  {
    id: 9263,
    proposer: 'fittedn.near',
    description: 'How to deploy BOS component$$$$https://twitter.com/BitkubAcademy/status/1728003163318563025?t=PiN6pwS380T1N4JuQXSONA&s=19',
    kind: {
      Transfer: {
        token_id: '',
        receiver_id: 'fittedn.near',
        amount: '500000000000000000000000',
        msg: null
      }
    },
    status: 'InProgress',
    vote_counts: { 'Whitelisted Members': [ 1, 0, 0 ] },
    votes: { 'trendheo.near': 'Approve' },
    submission_time: '1700832601849419123'
  }
]
```

</p>

</details>

***

## Create DAO

This snippet will enable you to create a DAO.

```bash

export COUNCIL='["bob.near"]'
export ARGS=`echo '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": '$COUNCIL'}' | base64`

near call sputnikv2.testnet create "{\"name\": \"primitives\", \"args\": \"$ARGS\"}" --accountId bob.near --amount 6 --gas 150000000000000
```

:::note
The full list of roles and permissions you can find [here](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions).
:::

***

## Create proposal

This snippet will enable you to create a proposal for a particular DAO.

```bash
near call primitives.sputnik-dao.near add_proposal '{"proposal": {"description": "My first proposal$$$$https://docs.near.org/", "kind": { "Transfer": {"token_id": "", "receiver_id": "bob.near", "amount": "10000000000000000000000000"}}}}'  --deposit 0.1 --gas 300000000000000 --accountId bob.near
```

***

## Vote for proposal

This snippet will enable you to cast a vote for proposal of a particular DAO.

```bash
near call primitives.sputnik-dao.near act_proposal '{"id": 0, "action": "VoteApprove"}' --gas 300000000000000 --accountId bob.near
```

:::note
Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
:::
