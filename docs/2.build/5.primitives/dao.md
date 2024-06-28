---
id: dao
title: Decentralized Autonomous Organizations
sidebar_label: Autonomous Organizations (DAO)
hide_table_of_contents: false
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetDAOList from "./dao/bos/get-dao-list.md"
import BOSGetProposalList from "./dao/bos/get-proposal-list.md"
import BOSCreateDAO from "./dao/bos/create-dao.md"
import BOSCreateProposal from "./dao/bos/create-proposal.md"
import BOSVoteForProposal from "./dao/bos/vote-for-proposal.md"

import WebAppGetDAOList from "./dao/web-app/get-dao-list.md"
import WebAppGetProposalList from "./dao/web-app/get-proposal-list.md"
import WebAppCreateDAO from "./dao/web-app/create-dao.md"
import WebAppCreateProposal from "./dao/web-app/create-proposal.md"
import WebAppVoteForProposal from "./dao/web-app/vote-for-proposal.md"

import CLIGetDAOList from "./dao/near-cli/get-dao-list.md"
import CLIGetProposalList from "./dao/near-cli/get-proposal-list.md"
import CLICreateDAO from "./dao/near-cli/create-dao.md"
import CLICreateProposal from "./dao/near-cli/create-proposal.md"
import CLIVoteForProposal from "./dao/near-cli/vote-for-proposal.md"

import SmartContractCreateDAO from "./dao/smart-contract/create-dao.md"
import SmartContractCreateProposal from "./dao/smart-contract/create-proposal.md"
import SmartContractVoteForProposal from "./dao/smart-contract/vote-for-proposal.md"

Decentralized Autonomous Organizations (DAOs) are self-organized groups that form around common purposes. Membership, decision making, and funding are coordinated by publicly voting on proposals through a smart contract.

![dao](/docs/primitives/dao.png)

In contrast with [FT](ft.md) and [NFT](nft.md), DAO contract's are not standardized. Because of this, in this page we will use as
reference the [Astra dao](https://dev.near.org/astraplusplus.ndctools.near/widget/home?page=daos) [contract](https://github.com/near-daos/sputnik-dao-contract). The main concepts covered here should
easily generalizable to other DAO implementations.

---

## Create a DAO
The simplest way to create and interact with a DAO is to go through the [AstraDAO UI](https://dev.near.org/astraplusplus.ndctools.near/widget/home?page=daos).

You can also create a DAO by interacting with the `sputnik-dao` contract.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSCreateDAO />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppCreateDAO />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICreateDAO />
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractCreateDAO />
  </TabItem>
</Tabs>

<hr className="subsection" />

### Voting policy
Currently, DAOs support two different types of [voting policies](https://github.com/near-daos/sputnik-dao-contract#voting-policy): `TokenWeight`, and `RoleWeight`. 

When the vote policy is `TokenWeight`, the council votes using [tokens](ft.md). The weigh of a vote is the proportion of tokens used for voting over the token's total supply.

When the vote policy is `RoleWeight(role)`, the vote weigh is computed as "one over the total number of people with the role".

<details>
<summary> Voting Threshold </summary>
Both voting policies further include a `threshold` for passing a proposal, which can be a ratio or a fixed number.

The ratio indicates that you need a proportion of people/tokens to approve the proposal (e.g. half the people need to vote, and to vote positively). A fixed number indicated that you need a specific number of votes/tokens to pass the proposal (e.g. 3 people/tokens are enough to approve the proposal).
</details>

---

## List of DAOs

Query the list of DAOs existing in Sputnik Dao.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSGetDAOList />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetDAOList />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIGetDAOList />
  </TabItem>
</Tabs>

---

## Query Existing Proposals

These snippets will enable you to query the proposals existing in a particular DAO.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSGetProposalList />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetProposalList />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIGetProposalList />
  </TabItem>
</Tabs>

---

## Create proposal

Create a proposal so other users can vote in favor or against it.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSCreateProposal />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppCreateProposal />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICreateProposal />
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractCreateProposal />
  </TabItem>
</Tabs>

:::info
By default, only **council members** can create proposals.
:::

---

## Vote for proposal

These snippet will enable your users to cast a vote for proposal of a particular DAO.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSVoteForProposal />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppVoteForProposal />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIVoteForProposal />
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractVoteForProposal />
  </TabItem>
</Tabs>

---

## Additional Resources

1. [AstroDAO UI](https://astrodao.com/) - the web app built on top of the Sputnik DAO Contract. Allows users to create and manage DAOs.
2. [List of DAOs as a NEAR component](https://dev.near.org/onboarder.near/widget/DAOSocialSearch)