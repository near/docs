---
id: near-cli
title: NEAR CLI
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create or interact with DAO from your shell using [`near-cli`](../../../4.tools/cli.md).

---

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

---

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

---

## Create DAO

This snippet will enable you to create a DAO.

```bash
near call sputnik-dao.near create '{"name":"primitives", "args":"eyJwdXJwb3NlIjoiIiwiYm9uZCI6IjEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInZvdGVfcGVyaW9kIjoiNjA0ODAwMDAwMDAwMDAwIiwiZ3JhY2VfcGVyaW9kIjoiODY0MDAwMDAwMDAwMDAiLCJwb2xpY3kiOnsicm9sZXMiOlt7Im5hbWUiOiJjb3VuY2lsIiwic2x1ZyI6ImNvdW5jaWwiLCJraW5kIjp7Ikdyb3VwIjpbImNyeXB0b2dhcmlrLm5lYXIiXX0sInBlcm1pc3Npb25zIjpbIio6RmluYWxpemUiLCJwb2xpY3k6QWRkUHJvcG9zYWwiLCJhZGRfYm91bnR5OkFkZFByb3Bvc2FsIiwiYm91bnR5X2RvbmU6QWRkUHJvcG9zYWwiLCJ0cmFuc2ZlcjpBZGRQcm9wb3NhbCIsInZvdGU6QWRkUHJvcG9zYWwiLCJyZW1vdmVfbWVtYmVyX2Zyb21fcm9sZTpBZGRQcm9wb3NhbCIsImFkZF9tZW1iZXJfdG9fcm9sZTpBZGRQcm9wb3NhbCIsImNvbmZpZzpBZGRQcm9wb3NhbCIsImNhbGw6QWRkUHJvcG9zYWwiLCJ1cGdyYWRlX3JlbW90ZTpBZGRQcm9wb3NhbCIsInVwZ3JhZGVfc2VsZjpBZGRQcm9wb3NhbCIsInNldF92b3RlX3Rva2VuOkFkZFByb3Bvc2FsIiwicG9saWN5OlZvdGVBcHByb3ZlIiwicG9saWN5OlZvdGVSZWplY3QiLCJwb2xpY3k6Vm90ZVJlbW92ZSIsImFkZF9ib3VudHk6Vm90ZUFwcHJvdmUiLCJhZGRfYm91bnR5OlZvdGVSZWplY3QiLCJhZGRfYm91bnR5OlZvdGVSZW1vdmUiLCJib3VudHlfZG9uZTpWb3RlQXBwcm92ZSIsImJvdW50eV9kb25lOlZvdGVSZWplY3QiLCJib3VudHlfZG9uZTpWb3RlUmVtb3ZlIiwidHJhbnNmZXI6Vm90ZUFwcHJvdmUiLCJ0cmFuc2ZlcjpWb3RlUmVqZWN0IiwidHJhbnNmZXI6Vm90ZVJlbW92ZSIsInZvdGU6Vm90ZUFwcHJvdmUiLCJ2b3RlOlZvdGVSZWplY3QiLCJ2b3RlOlZvdGVSZW1vdmUiLCJyZW1vdmVfbWVtYmVyX2Zyb21fcm9sZTpWb3RlQXBwcm92ZSIsInJlbW92ZV9tZW1iZXJfZnJvbV9yb2xlOlZvdGVSZWplY3QiLCJyZW1vdmVfbWVtYmVyX2Zyb21fcm9sZTpWb3RlUmVtb3ZlIiwiYWRkX21lbWJlcl90b19yb2xlOlZvdGVBcHByb3ZlIiwiYWRkX21lbWJlcl90b19yb2xlOlZvdGVSZWplY3QiLCJhZGRfbWVtYmVyX3RvX3JvbGU6Vm90ZVJlbW92ZSIsImNhbGw6Vm90ZUFwcHJvdmUiLCJjYWxsOlZvdGVSZWplY3QiLCJjYWxsOlZvdGVSZW1vdmUiLCJjb25maWc6Vm90ZUFwcHJvdmUiLCJjb25maWc6Vm90ZVJlamVjdCIsImNvbmZpZzpWb3RlUmVtb3ZlIiwic2V0X3ZvdGVfdG9rZW46Vm90ZUFwcHJvdmUiLCJzZXRfdm90ZV90b2tlbjpWb3RlUmVqZWN0Iiwic2V0X3ZvdGVfdG9rZW46Vm90ZVJlbW92ZSIsInVwZ3JhZGVfc2VsZjpWb3RlQXBwcm92ZSIsInVwZ3JhZGVfc2VsZjpWb3RlUmVqZWN0IiwidXBncmFkZV9zZWxmOlZvdGVSZW1vdmUiLCJ1cGdyYWRlX3JlbW90ZTpWb3RlQXBwcm92ZSIsInVwZ3JhZGVfcmVtb3RlOlZvdGVSZWplY3QiLCJ1cGdyYWRlX3JlbW90ZTpWb3RlUmVtb3ZlIl0sInZvdGVfcG9saWN5Ijp7fX0seyJuYW1lIjoiYWxsIiwic2x1ZyI6ImFsbCIsImtpbmQiOiJFdmVyeW9uZSIsInBlcm1pc3Npb25zIjpbXSwidm90ZV9wb2xpY3kiOnt9fV0sImRlZmF1bHRfdm90ZV9wb2xpY3kiOnsid2VpZ2h0X2tpbmQiOiJSb2xlV2VpZ2h0IiwicXVvcnVtIjoiMCIsInRocmVzaG9sZCI6WzEsMl19LCJwcm9wb3NhbF9ib25kIjoiMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwicHJvcG9zYWxfcGVyaW9kIjoiNjA0ODAwMDAwMDAwMDAwIiwiYm91bnR5X2JvbmQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJib3VudHlfZm9yZ2l2ZW5lc3NfcGVyaW9kIjoiNjA0ODAwMDAwMDAwMDAwIn0sImNvbmZpZyI6eyJuYW1lIjoicHJpbWl0aXZlcyIsInB1cnBvc2UiOiIiLCJtZXRhZGF0YSI6ImV5SnNhVzVyY3lJNld5Sm9kSFJ3Y3pvdkwyUnZZM011Ym1WaGNpNXZjbWN2SWwwc0ltWnNZV2REYjNabGNpSTZJaUlzSW1ac1lXZE1iMmR2SWpvaVQzWnZOM2s0Y1dKUFJGRnZhV1JLWldsbmJUUmhJaXdpWkdsemNHeGhlVTVoYldVaU9pSlFjbWx0YVhScGRtVnpJaXdpYkdWbllXd2lPbnNpYkdWbllXeFRkR0YwZFhNaU9pSWlMQ0pzWldkaGJFeHBibXNpT2lJaWZYMD0ifX0"}' --deposit 6 --gas 300000000000000 --accountId bob.near
```

---

## Create proposal

This snippet will enable you to create a proposal for a particular DAO.

```bash
near call primitives.sputnik-dao.near add_proposal '{"proposal": {"description": "My first proposal$$$$https://docs.near.org/", "kind": { "Transfer": {"token_id": "", "receiver_id": "bob.near", "amount": "10000000000000000000000000"}}}}'  --deposit 0.1 --gas 300000000000000 --accountId bob.near
```

---

## Vote for proposal

This snippet will enable you to cast a vote for proposal of a particular DAO.

```bash
near call primitives.sputnik-dao.near act_proposal '{"id": 0, "action": "VoteApprove"}' --gas 300000000000000 --accountId bob.near
```
