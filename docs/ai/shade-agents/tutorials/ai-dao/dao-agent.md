---
id: dao-agent
title: DAO Agent
sidebar_label: DAO Agent
description: "Learn about the key parts of the agent as part of the Verifiable AI DAO Shade tutorial that walks through how to index the agent contract, using verifiable AI, and interacting with the custom agent contract."
---

import {Github} from "@site/src/components/UI/Codetabs"

On this page, you'll examine the agent component of the DAO. The agent continuously monitors for new proposals, uses an LLM to evaluate them, and submits its vote along with reasoning back to the smart contract.

---

## Starting the Agent

Before an agent can execute any actions on-chain, it must first be `registered`. When in production (running on Phala Cloud, not locally), the agent runs a loop to check its registration status. An agent can see if it's registered using the `agentInfo` function provided by `shade-agent-js`; once registered, `agentInfo` will return a checksum.

After the agent is registered, it starts the `responder`, which contains the core logic of the agent.

<Github fname="index.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/index.ts#L26-L43"
    start="26" end="43" />

---

## Indexing Proposals

Once started, the responder begins a continuous loop to check for pending proposals by calling `get_pending_proposals` on the contract using the `agentView` function provided by `shade-agent-js`. The `agentView` function makes a view call (a gasless transaction that does not change the contract's state) to the selected function on the agent contract.

<Github fname="responder.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/responder.ts#L15-L25"
    start="15" end="25" />

If proposals are found, the agent extracts the `proposal text` and `yield ID` from the oldest pending proposal , then fetches the current manifesto from the DAO by calling `get_manifesto`.

<Github fname="responder.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/responder.ts#L30-L40"
    start="30" end="40" />

Having retrieved both the proposal and manifesto, the agent is ready to make its decision using an LLM.

---

## Voting with an LLM

To make a decision on the proposal, the agent uses an LLM provided by [NEAR AI](https://docs.near.ai/cloud/get-started/). NEAR AI provides verifiable and private inference by running LLMs in GPU TEEs. In this tutorial, the DAO uses NEAR AI for its `verifiable` component. This allows the agent verify that no one is interfering with the LLM response, as could happen with centralized model hosting. The agent knows the response from the LLM is actually a function of the input, and comes from the expected model.

:::note
In this tutorial, the agent does not actually verify the attestation from the LLM. Full verification will be added in a future update to the tutorial.
:::

The DAO uses the `Open AI SDK` to interact with the model. First, the agent sets up the client passing the `base URL` for NEAR AI and an `API key` for the Cloud (we'll explain how to obtain a key in the next section).


<Github fname="ai.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/ai.ts#L21-L24"
    start="21" end="24" />

A request to an LLM typically takes two prompts:
- **The System Message** sets the `behavior and role` of the LLM. In this tutorial, the message explains to the model that it's acting as a DAO and needs to vote Approved or Rejected on proposals, making its decisions based on the manifesto.
- **The User Message** is the `input` that the LLM responds to. In typical chat applications, this would be any message you type to the assistant. In this tutorial, the user message is a combination of the proposal and the DAO's manifesto.

<Github fname="ai.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/ai.ts#L26-L33"
    start="26" end="33" />

Next, the agent constructs the `JSON request` to send to the model. There are several important aspects of this request:
- The request specifies the `model` to call - in this tutorial, DeepSeek V3 0324. You can find a full list of [available models here](https://cloud.near.ai/models).
- The request is using `non-streaming` mode. This means the model waits until the full response is ready before returning it, rather than streaming, where the response is sent piece by piece while the model is still generating it. Non-streaming is simpler here as the agent doesn't need to display the response or take any action until the whole response is ready.
- The request uses `tool calling` to ensure that the model responds with a vote of exactly `Approved` or `Rejected` and `reasoning` for its choice. If the model fails to conform to the required output, it will return an error. You can read more on [tool calling/function calling here](https://platform.openai.com/docs/guides/function-calling).

<Github fname="ai.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/ai.ts#L37-L64"
    start="37" end="64" />

The agent then sends the request to the model, extracts the vote and reasoning from the response, and performs a double check to ensure the response is in the expected format.

<Github fname="ai.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/ai.ts#L66-L84"
    start="66" end="84" />

---

## Submitting the Vote

Once the agent receives the response from the LLM, it's nearly ready to submit the vote to the agent contract. Before sending the vote, the agent `hashes` both the proposal it's voting on and the manifesto it's using to make it's decision. This is done so the DAO can verify that the agent used the correct proposal and manifesto to vote and that the query wasn't corrupted by the RPC or intercepted and modified on transit to the agent.

<Github fname="responder.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/responder.ts#L46-L47"
    start="46" end="47" />

The agent then calls `agent_vote` on the agent contract using the `agentCall` function provided by `shade-agent-js` to cast its vote. It includes the yield ID of the proposal's yielded promise that it's resuming, along with all required response fields.

<Github fname="responder.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/responder.ts#L50-L64"
    start="50" end="64" />

---

## Next Steps

That completes the overview of the DAO system as a whole! You can now fork the [repository](https://github.com/NearDeFi/verifiable-ai-dao/tree/main) to create your own yield and resume-based Shade Agent. On the [final page](./deploying.md) of this tutorial, you'll learn how to deploy the AI DAO yourself.