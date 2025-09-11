---
id: agent
title: Agent
sidebar_label: Agent
description: "TODO"
---

import {Github} from "@site/src/components/codetabs"

On this page you'll look at the agent component of DAO. The agent continuously indexes pending proposals, uses an LLM to vote on them and submit the vote along with reasoning back to the smart contract.

--- 

## Starting the Agent

Before an agent can do any actions on chain it first needs to be registered. The agent, when in production (running on Phala Cloud, not locally), will keep looping to see whether it is registered. An agent can see if it's registered by using the `agent_info` function provided by `shade-agent-js` and checking that the checksum is not null.

When the function returns a checksum the agent can start its service, in this case the `responder`.

<Github fname="index.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/index.ts#L26-L44"
    start="26" end="44" />

---

## Indexing Proposals

Once started, the responder will keep looping to check for proposals by calling `get_pending_proposals` on the contract using the `agentView` function provided by `shade-agent-js`. The `agentView` function makes a view call (a gasless transaction that does not change state) to the specified function on the agent contract.

<Github fname="responder.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/responder.ts#L15-L25"
    start="15" end="25" />

If a proposals are found, the agent will extract the proposal text and yield id from the oldest proposal that is pending and then fetch the current manifesto from the DAO by calling `get_manifesto`.

<Github fname="responder.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/responder.ts#L30-L40"
    start="30" end="40" />

Now the agent has the current manifesto and a proposal to vote on, it can now use the LLM to cast a vote.

---

## Voting with an LLM

To make a decision on the proposal the agent uses an LLM provided by [NEAR AI Cloud](https://docs.near.ai/cloud/get-started/). NEAR AI Cloud provides verifiable and private inference by running LLMs in GPU TEEs, in this example it for its verifiable component. This lets the agent verify that no one is interfering with the response from the LLM as could be done by using a centralized model hosting platform; the response from the LLM is actually a function of the input, and its coming from the expected model being called. 

:::note
In this example the agent does not actually verify the attestation from the LLM. This will be coming soon.
:::

The example uses the Open AI SDK to interact with the model. First the agent sets up the client passing the base URL that NEAR AI provides and an API key required to use the NEAR AI Cloud (in the next section we'll explain how to obtain a key). 

<Github fname="ai.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/ai.ts#L21-L24"
    start="21" end="24" />

A request to an LLM usually takes two prompts:
- **The System Message** sets the behavior and role of the LLM, in the example the message explains to the model that it's acting as a DAO and needs to vote Approved or Rejected on proposals it's sent.
- **The User Message** is the input that the LLM responds to, with a chat assistant this is any message you type to the assistant, in the example the user message is the DAO's manifesto and the proposal.

<Github fname="ai.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/ai.ts#L26-L33"
    start="26" end="33" />

Next the agent then constructs the JSON request to be sent to the model. There are a few important things to note about the contents of this request:
- The request specifies the model to call, in this example DeepSeek V3 0324. You can find a full list of [available models here](https://cloud.near.ai/models).
- The request is using non-streaming. mode This means the model will wait till the full response is ready before returning it, rather than streaming where the response is sent piece by piece while the model is still generating it. Non-streaming is simpler here as the agent doesn't need to display the response or do any action until the whole response is ready.
- The request uses `tool calling` to ensure that the model responds with a vote that is be either `Approved` or `Rejected` and `reasoning` for its choice. If the model fails to conform to the required output then it will return an error. You can read more on [tool calling/function calling here](https://platform.openai.com/docs/guides/function-calling).

<Github fname="ai.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/ai.ts#L37-L64"
    start="37" end="64" />

The agent can now send the request to the model, extract the vote and reasoning from the response, and then do a double check that the output is in the form expected.

<Github fname="ai.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/ai.ts#L66-L84"
    start="66" end="84" />

---

## Submitting the Vote

Now the agent has the response from the LLM it's nearly ready to submit the response back to the agent contract. Before sending the response the agent hashes the proposal it's voting on and the manifesto it's using to vote. This is done so the DAO can verify that the agent was using the correct proposal and manifesto to vote and that the query wasn't either corrupted by the RPC or intercepted and modified on transit to the agent.

<Github fname="responder.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/responder.ts#L46-L47"
    start="46" end="47" />

The agent then calls `agent_vote` on the agent contract using the `agentCall` function provided by `shade-agent-js` to cast it's vote with the yield ID of the proposal yielded promise it's resuming and the required response arguments.

<Github fname="responder.ts" language="typescript"
    url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/src/responder.ts#L50-L64"
    start="50" end="64" />

---

## Next Steps 

That's the DAO system as a whole! We now suggest that you fork the [repo](https://github.com/NearDeFi/verifiable-ai-dao/tree/main) to create your own yield and resume based Shade Agent. In the final page of this example we'll share how you can deploy the AI DAO. 