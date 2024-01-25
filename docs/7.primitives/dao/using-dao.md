---
id: using-dao
title: Using DAO
hide_table_of_contents: false
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetDAOList from "./interacting/bos/get-dao-list.md"
import BOSGetProposalList from "./interacting/bos/get-proposal-list.md"
import BOSCreateDAO from "./interacting/bos/create-dao.md"
import BOSCreateProposal from "./interacting/bos/create-proposal.md"
import BOSVoteForProposal from "./interacting/bos/vote-for-proposal.md"

import WebAppGetDAOList from "./interacting/web-app/get-dao-list.md"
import WebAppGetProposalList from "./interacting/web-app/get-proposal-list.md"
import WebAppCreateDAO from "./interacting/web-app/create-dao.md"
import WebAppCreateProposal from "./interacting/web-app/create-proposal.md"
import WebAppVoteForProposal from "./interacting/web-app/vote-for-proposal.md"

import CLIGetDAOList from "./interacting/near-cli/get-dao-list.md"
import CLIGetProposalList from "./interacting/near-cli/get-proposal-list.md"
import CLICreateDAO from "./interacting/near-cli/create-dao.md"
import CLICreateProposal from "./interacting/near-cli/create-proposal.md"
import CLIVoteForProposal from "./interacting/near-cli/vote-for-proposal.md"

import SmartContractCreateDAO from "./interacting/smart-contract/create-dao.md"
import SmartContractCreateProposal from "./interacting/smart-contract/create-proposal.md"
import SmartContractVoteForProposal from "./interacting/smart-contract/vote-for-proposal.md"

Decentralized Autonomous Organizations (DAOs) are self-organized groups that form around common purposes. Membership, decision making, and funding are coordinated by publicly voting on proposals through a smart contract.

This section provides some examples how to create or interact with DAO from [a NEAR component](./interacting/bos.md), [web app](./interacting/web-app.md), [near-cli](./interacting/near-cli.md) and [smart contract](./interacting/smart-contract.md).

:::note
In this section we will use as reference the [sputnik dao implementation](https://github.com/near-daos/sputnik-dao-contract).
:::

---

## List of DAOs

These snippets will enable you to query list of DAOs.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSGetDAOList />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppGetDAOList />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIGetDAOList />
  </TabItem>
</Tabs>

---

## List of proposals

These snippets will enable you to query list of proposals for a particular DAO.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSGetProposalList />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppGetProposalList />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIGetProposalList />
  </TabItem>
</Tabs>

---

## Create DAO

These snippets will enable your users to create a DAO.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSCreateDAO />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppCreateDAO />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLICreateDAO />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract">
    <SmartContractCreateDAO />
  </TabItem>
</Tabs>

---

## Create proposal

These snippets will enable your users to create a proposal for a particular DAO.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSCreateProposal />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppCreateProposal />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLICreateProposal />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract">
    <SmartContractCreateProposal />
  </TabItem>
</Tabs>

---

## Vote for proposal

These snippet will enable your users to cast a vote for proposal of a particular DAO.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSVoteForProposal />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppVoteForProposal />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIVoteForProposal />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract">
    <SmartContractVoteForProposal />
  </TabItem>
</Tabs>

---

## Additional Resources

1. [AstroDAO UI](https://astrodao.com/) - the web app built on top of the Sputnik DAO Contract. Allows users to create and manage DAOs.
2. [List of DAOs as a NEAR component](https://near.org/onboarder.near/widget/DAOSocialSearch)