---
id: dao
sidebar_label: Autonomous Organizations
title: Decentralized Autonomous Organizations
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Decentralized Autonomous Organizations (DAOs) are self-organized groups that form around common purposes. Membership, decision making,
and funding are coordinated by publicly voting on proposals through a smart contract. 

In contrast with [FT](ft.md) and [NFT](nft.md), DAO contract's are not standardized. Because of this, in this page we will use as
reference the [sputnik dao implementation](https://github.com/near-daos/sputnik-dao-contract). The main concepts covered here should
easily generalizable to other DAO implementations.

---

## Creating a DAO
To create a DAO you first need to deploy the [DAO contract factory](https://github.com/near-daos/sputnik-dao-contract#setup), and initialize it.

Once deployed and initialized, you can ask the factory to `create` a new DAO for you. On creation, you will define parameters such as the DAO's name, its purpose, and its council. Defining the right council is important since its members are the **only** accounts allowed to vote on proposals.


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  # 1. Deploy the contract in a testnet account
  near dev-deploy <factory-account> --wasmFile=<sputnikdao-factory> --accountId <your-account>

  # 2. Initialize factory contract
  near call <factory-account> new --accountId  <your-account> --gas 100000000000000

  # 3. Define a council and create DAO
  export COUNCIL='["<council-member-1>", "<council-member-2>"]'
  export ARGS=`echo '{"config": {"name": "<name>", "purpose": "<purpose>", "metadata":"<metadata>"}, "policy": '$COUNCIL'}' | base64`

  near call  <factory-account> create "{\"name\": \"<name>\", \"args\": \"$ARGS\"}" --accountId <your-account> --amount 10 --gas 150000000000000
  ```

  </TabItem>
</Tabs>


### Voting policy
Currently, the DAO supports two different types of [voting policies](https://github.com/near-daos/sputnik-dao-contract#voting-policy): `TokenWeight`, and `RoleWeight`. 

When the vote policy is `TokenWeight`, the council votes using [tokens](ft.md). The weigh of a vote is the proportion of tokens used for voting over the token's total supply.

When the vote policy is `RoleWeight(role)`, the vote weigh is computed as "one over the total number of people with the role".

Both voting policies further include a "threshold" for passing a proposal, which can be a ratio or a fixed number. The ratio indicates that you need a proportion of people/tokens to approve the proposal (e.g. half the people need to vote, and to vote positively). A fixed number indicated that you need a specific number of votes/tokens to pass the proposal (e.g. 3 people/tokens are enough to approve the proposal).

<hr class="subsection"/>

## Adding a Proposal
By default, anyone can add a proposal to the DAO, but a minimum of 1Ⓝ needs to be attached as a bond. This however can be changed by [setting roles in the DAO](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions). The type of proposals that can be added [is predefined](https://github.com/near-daos/sputnik-dao-contract#proposal-types), and include actions such as:

1. Adding a member to the council.
2. Calling a method in a smart contract.
3. Transferring NEAR or a FT to some account.

Each action has its own kind of arguments. The complete list of actions can be [found here](https://github.com/near-daos/sputnik-dao-contract#proposal-types).

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <dao-account> add_proposal \
'{"proposal": {"description": "<description>", "kind": {"<proposalKind>": {"<argument>": "<value>", "<argument>": "<value>"}}}}' \
--accountId proposer.testnet \
--amount 1

  ```

  </TabItem>
</Tabs>

<hr class="subsection"/>

## Acting on a Proposal
Once a proposal is added, **council members** can act on them calling the `act_proposal` method. The available actions are one of the following: AddProposal, RemoveProposal, VoteApprove, VoteReject, VoteRemove, Finalize, or MoveToHub.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <dao-account> act_proposal '{"id": <proposal-id>, "action": "<action>"}' --accountId <a-council-account-id>
  ```

  </TabItem>
</Tabs>

Each time somebody acts on the proposal, the DAO checks if the proposal has enough votes to be approved. If the proposal is approve, then the DAO executes the proposal (for example, adding a new member to the council).