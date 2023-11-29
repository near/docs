---
id: bos
title: NEAR Component
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create or interact with DAO directly from a [NEAR Component](../../../bos/components.md).

---

## List of DAOs

This snippet will enable you to query list of DAOs.

```js
const result = Near.view("sputnik-dao.near", "get_dao_list");
```

<details>
<summary>Example response</summary>
<p>

```js
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

```js
const result = Near.view(
  "nearweek-news-contribution.sputnik-dao.near",
  "get_proposals",
  { from_index: 9262, limit: 2 }
);
```

<details>
<summary>Example response</summary>
<p>

```js
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

This snippet will enable your users to create a DAO.

```js
const args = {
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
};
Near.call(
  "sputnik-dao.near",
  "create",
  {
    name: "primitives",
    args: Buffer.from(JSON.stringify(args)).toString("base64"),
  },
  300000000000000,
  6000000000000000000000000
);
```

---

## Create proposal

This snippet will enable your users to create a proposal for a particular DAO.

```js
Near.call(
  "primitives.sputnik-dao.near",
  "add_proposal",
  {
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
  300000000000000,
  100000000000000000000000
);
```

---

## Vote for proposal

This snippet will enable your users to cast a vote for proposal of a particular DAO.

```js
Near.call(
  "primitives.sputnik-dao.near",
  "act_proposal",
  { id: 0, action: "VoteApprove" },
  300000000000000
);
```