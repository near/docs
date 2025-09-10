---
id: agent
title: Agent
sidebar_label: Agent
description: "TODO"
---

On this page we'll look at the agent component of DAO. The agent continuously indexes pending proposals, uses an LLM to vote on them and submit the vote along with reasoning back to the smart contract.

--- 

## Starting the Agent

Here talk about starting the responder, production vs local, waiting for it to be registered.


---

## Indexing Proposals

here talk about looping the indexing getting the proposal and manifesto. agentView


---

## Voting with an LLM

Here talk about how near ai is used to vote on the proposal, built for private but also verifiable, using the manifesto and proposal, use open ai. System message.
Tool call - formatted response. Non streaming.

Note that we are not actually doing the verification of the model, this is to come


---

## Submitting the Vote

Talk about hashing the proposal and manifesto, then using agentCall

--

## Next Steps 

Optionally go on to deploy it or fork it to build your own system.