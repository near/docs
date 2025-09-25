---
id: dao
title: Decentralized Autonomous Organizations
sidebar_label: Autonomous Organizations (DAO)
hide_table_of_contents: false
description: "Learn about Decentralized Autonomous Organizations (DAOs) on NEAR - self-organized groups that coordinate membership, decision-making, and funding through smart contract voting."
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetDAOList from "@site/src/components/docs/primitives/dao/bos/get-dao-list.md"
import BOSGetProposalList from "@site/src/components/docs/primitives/dao/bos/get-proposal-list.md"
import BOSCreateDAO from "@site/src/components/docs/primitives/dao/bos/create-dao.md"
import BOSCreateProposal from "@site/src/components/docs/primitives/dao/bos/create-proposal.md"
import BOSVoteForProposal from "@site/src/components/docs/primitives/dao/bos/vote-for-proposal.md"

import WebAppGetDAOList from "@site/src/components/docs/primitives/dao/web-app/get-dao-list.md"
import WebAppGetProposalList from "@site/src/components/docs/primitives/dao/web-app/get-proposal-list.md"
import WebAppCreateDAO from "@site/src/components/docs/primitives/dao/web-app/create-dao.md"
import WebAppCreateProposal from "@site/src/components/docs/primitives/dao/web-app/create-proposal.md"
import WebAppVoteForProposal from "@site/src/components/docs/primitives/dao/web-app/vote-for-proposal.md"

import CLIGetDAOList from "@site/src/components/docs/primitives/dao/near-cli/get-dao-list.md"
import CLIGetProposalList from "@site/src/components/docs/primitives/dao/near-cli/get-proposal-list.md"
import CLICreateDAO from "@site/src/components/docs/primitives/dao/near-cli/create-dao.md"
import CLICreateProposal from "@site/src/components/docs/primitives/dao/near-cli/create-proposal.md"
import CLIVoteForProposal from "@site/src/components/docs/primitives/dao/near-cli/vote-for-proposal.md"

import LantstoolGetDAOList from "@site/src/components/docs/primitives/dao/lantstool/get-dao-list.md"
import LantstoolGetProposalList from "@site/src/components/docs/primitives/dao/lantstool/get-proposal-list.md"
import LantstoolCreateDAO from "@site/src/components/docs/primitives/dao/lantstool/create-dao.md"
import LantstoolVoteForProposal from "@site/src/components/docs/primitives/dao/lantstool/vote-for-proposal.md"


import SmartContractCreateDAO from "@site/src/components/docs/primitives/dao/smart-contract/create-dao.md"
import SmartContractCreateProposal from "@site/src/components/docs/primitives/dao/smart-contract/create-proposal.md"
import SmartContractVoteForProposal from "@site/src/components/docs/primitives/dao/smart-contract/vote-for-proposal.md"

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

Decentralized Autonomous Organizations (DAOs) are self-organized groups that form around common purposes. Membership, decision-making, and funding are coordinated by publicly voting on proposals through a smart contract.

![dao](/docs/primitives/dao.png)

In contrast with [FT](ft.md) and [NFT](nft.md), DAO contract's are not standardized. Because of this, on this page we will use as
reference the [Astra dao](https://dev.near.org/astraplusplus.ndctools.near/widget/home?page=daos) [contract](https://github.com/near-daos/sputnik-dao-contract). The main concepts covered here should
easily generalizable to other DAO implementations.

:::tip
The simplest way to create and interact with a DAO is to go through the [AstraDAO UI](https://near.social/astraplusplus.ndctools.near/widget/home?page=daos).
:::

---

## Create a DAO

You can create a DAO by interacting with the `sputnik-dao` contract:

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppCreateDAO />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICreateDAO />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <LantstoolCreateDAO/>
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractCreateDAO />
  </TabItem>
</Tabs>

:::tip
The simplest way to create and interact with a DAO is to go through the [AstraDAO UI](https://near.social/astraplusplus.ndctools.near/widget/home?page=daos).
:::

<hr className="subsection" />

### Using Global Contract

You can deploy a new DAO using our global contract - a pre-deployed [a Sputnik DAO contract](https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao2) that you can reuse. [Global contracts](../smart-contracts/global-contracts.md) are deployed once and can be reused by any account without incurring high storage costs.

<Tabs groupId="code-tabs">
  <TabItem value="By AccountId" label="account">

    ```bash
    near contract deploy <account-id> use-global-account-id dao.globals.primitives.testnet \
      with-init-call new \
      json-args '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": ["<account-id>"]}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain \
      send
    ```

  </TabItem>
  <TabItem value="By Hash" label="hash">

    ```bash
    near contract deploy <account-id> use-global-hash Ea8tHXFSQVszVwGASyzAfLq65DjcRDhkfab4FcPaRpgD \
      with-init-call new \
      json-args '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": ["<account-id>"]}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain \
      send
    ```

  </TabItem>
</Tabs>

:::note
Deploying by **hash** creates an immutable contract that never changes. Deploying by **account ID** creates an updatable contract that changes when the referenced account's contract is updated. Choose based on whether you want your FT contract to be updatable or permanent.
:::

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
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetDAOList />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIGetDAOList />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <LantstoolGetDAOList/>
  </TabItem>
</Tabs>

---

## Query Existing Proposals

These snippets will enable you to query the proposals existing in a particular DAO.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetProposalList />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIGetProposalList />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <LantstoolGetProposalList/>
  </TabItem>
</Tabs>

---

## Create proposal

Create a proposal so other users can vote in favor or against it.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppCreateProposal />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICreateProposal />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/dao/create-proposal.json" />
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
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppVoteForProposal />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIVoteForProposal />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <LantstoolVoteForProposal/>
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractVoteForProposal />
  </TabItem>
</Tabs>

---

## Additional Resources

1. [NEAR Treasury](https://neartreasury.com/) - a Treasury management web app built on top of the Sputnik DAO Contract. Allows users to create and manage treasury funds with ease.
2. [List of DAOs as a NEAR component](https://dev.near.org/onboarder.near/widget/DAOSocialSearch)
