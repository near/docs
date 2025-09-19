---
id: agent-contract
title: Agent Contract
sidebar_label: Agent Contract
description: "Learn about the key parts of the agent contract as part of the Verifiable AI DAO Shade Agent example including how to create a custom agent contract and create a yield and resume based Shade Agent."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

On this page you'll look at the DAO smart contract that uses yield and resume that uses the Shade Agent vote on its proposals within the flow of a single transaction.

When developing this example we started by forking the [default agent contract](https://github.com/NearDeFi/shade-agent-js/tree/main/contracts/sandbox). The structure of the contract is mostly the same but removes the request_signature function and implements DAO specific code. On this page you'll walk through the DAO specific code for the agent contract.

---

## Contract Structure

The agent contract includes additional state over the default contract. It stores:
- The DAO's manifesto
- A list of pending proposals
- A list of finalized proposals 
- The current proposal ID

<Github fname="lib.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/lib.rs#L33-L41"
    start="33" end="41" />

### Manifesto 

The manifesto contains two parts, the `manifesto text` itself, that states how the DAO should make decisions and the `hash` of the manifesto. The hash will be used to verify that the agent is using the correct manifesto to make its decision.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L7-L10"
    start="7" end="10" />

The manifesto and its hash are set to an empty strings when the contract is initialized.

### Pending Proposals

This stores a list of all proposals that are ready to be responded to by the agent. Each proposal request includes the `proposal text` and `yield ID`. The yield ID is a unique identifier for each active request as part of the yield and resume flow.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L14-L17"
    start="14" end="17" />

The map is set to empty when the contract is initialized.

### Finalized Proposals 

This stores a list of all proposals that have been voted on by the agent. Each finalized proposal contains the `proposal text`, the `proposal result` which is a an enum of `Approved` or `Rejected`, and the `reasoning` for the decision. The result and the reasoning are provided by the agent.

<Tabs groupId="code-tabs">
  <TabItem value="finalized-proposal" label="FinalizedProposal">

    <Github fname="dao.rs" language="rust"
        url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L21-L25"
        start="21" end="25" />

  </TabItem>
  <TabItem value="proposal-result" label="ProposalResult">

    <Github fname="dao.rs" language="rust"
        url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L29-L32"
        start="29" end="32" />
  
  </TabItem>
</Tabs>

The map is set to empty when the contract is initialized.

### Current Proposal ID

The current proposal ID is an integer identifier of the last proposal request made, it's used to identify different pending proposals. It increments each proposal request. If a proposal is not voted on by the agent then the proposal ID will still increment leading to non-consecutive proposal IDs within the finalized proposals map. Note that this the proposal ID is different to the yield ID.

The proposal ID is set to zero when the contract is initialized so the first proposal will have ID one.

---

## Setting the Manifesto

The contract has a function to set the manifesto. This function is restricted so that only the `owner` can set the manifesto. In production the owner would likely be a multisig contract. The contract owner simply provides the text of the manifesto then its hash is computed and both are stored in the contract's state.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L55-L67"
    start="55" end="67" />

---

## Creating a Proposal

When a user calls the `create_proposal` function on the contract, providing the proposal text as args, the function creates a `yielded promise`. The promise will call the specified function, `return_external_response`, function with arguments of `proposal_id` and `proposal_text` when the promise resolves. The promise will resolve when either the promise is resumed by the agent responding or the promise times out (no response within 200 blocks which is around 2 minutes).

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L83-L91"
    start="83" end="91" />

Next the function reads the `yield id` from the register for the promise that was just created. The `yield id` is a unique hash identifier for a yielded promise used to make sure the correct response goes to the correct pending proposal. The yield ID is generated by the register, the register takes an integer identifier since you can have multiple different registers in a contract, in the example the contract just uses zero for register.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L94-L97"
    start="94" end="97" />

The function then creates a new proposal request and inserts it into the map of pending proposals. This map is used so the agent can fetch the text for the proposals it needs to respond to.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L100-L105"
    start="100" end="105" />

Lastly the function returns the yielded promise so it is executed.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L108"
    start="108" end="108" />

---

## Agent Response and Validation

Once the agent has made it's decision it will call the `agent_vote` function. This function essentially does some checks that the response is valid and, if so, resumes the yielded promise.

The agent responds with the `yield_id` for the promise it intends resume, the `proposal ID` it's voting on, the `hash of the propsal`, the `hash of the manifesto`, the `vote` and the `reasoning` behind the vote.

<Tabs groupId="code-tabs">
  <TabItem value="args" label="Args">

    <Github fname="dao.rs" language="rust"
        url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L100"
        start="100" end="100" />

  </TabItem>
  <TabItem value="ai-response" label="AiResponse">

    <Github fname="dao.rs" language="rust"
        url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L35-L41"
        start="35" end="41" />
  
  </TabItem>
</Tabs>

Most importantly, the function first checks if the caller is a valid registered agent, so the contract can verify that the DAO is making its decision via the expected process.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L102"
    start="102" end="102" />

The function also checks that the manifesto hash and the proposal hash the agent submits match those stored and expected by the contract. This is done to verify that the agent is using the correct manifesto and proposal when voting on a given proposal. This is required to remove the trust on the RPC that is fetching the proposals and manifesto as there could be a problem in the RPC causing it to fetch the wrong details or the RPC could intentionally provide the wrong details to try to corrupt the vote.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L106-L120"
    start="106" end="120" />

If any of these checks fail then the function will panic and the promise will not be resumed (in this function call, it could be resumed later if called with valid args before the promise times out).

Lastly, if all checks pass, the function will resume the promise, specifying the yield_id it intends to resume and the response from the agent.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L123"
    start="123" end="123" />

---

### Proposal Finalization

When the yielded promise is resolved, the promise is resumed or it times out, the `return_external_response` function is called. It's labelled private so that accounts can't call it, only the yielded promise. 

The function takes the arguments passed both from when the promise was created and when it was resumed.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#127-L133"
    start="127" end="133" />

The function first removes the proposal that is being responded to from the map of pending proposals. It will remove the proposal from the map regardless of whether the promise was resumed or timed out.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L134"
    start="134" end="134" />

If the response is valid, i.e. the yielded promise was successfully resumed, the proposal along with the result, will be added to the map of finalized proposals and a response will be returned to the caller within the same transaction of the proposal being submitted.

<Github fname="dao.rs" language="rust"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L136-L151"
    start="136" end="151" />

If the response is invalid, i.e. the yielded promise timed out, the function will return a promise to call the `fail_on_timeout` function that will panic and produce a failed [receipt](../../../../protocol/transaction-execution) in a separate block to give a clear error to the user (the return_external_response receipt will still be successful).

<Tabs groupId="code-tabs">
  <TabItem value="promise" label="Promise">

    <Github fname="dao.rs" language="rust"
        url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L152-L161"
        start="152" end="161" />

  </TabItem>
  <TabItem value="panic-function" label="Panic function">

    <Github fname="dao.rs" language="rust"
        url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L166-L169"
        start="166" end="169" />
  
  </TabItem>
</Tabs>

:::tip
You can learn more about yield and resume in the [yield and resume section](../../../../smart-contracts/anatomy/yield-resume.md) of the docs.
:::

---

## View Functions

The contract exposes [view functions](https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L171-L205) to get the manifesto text, get the pending proposals and get finalized proposals.

---

## Next steps

Now you've looked at what goes into a yield and resume Shade Agent contract, you'll move on to looking at the decentralized, verifiable agent that queries the contract for pending requests and responds to them. Head over to the [agent page](./agent.md).