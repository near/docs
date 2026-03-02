---
id: ai-inference
title: AI Inference
sidebar_label: AI Inference
description: "Learn how to use AI with Shade Agents."
---

Your agent can call AI inference in two main ways; they have different trust assumptions and privacy guarantees.

---

### NEAR AI Cloud

NEAR AI Cloud provides **verifiable private inference** using TEEs. You get cryptographic proof that inputs stayed private and that the output was produced by the intended model. If you use NEAR AI Cloud, you should verify the TEE attestations in your agent.

You can learn more about NEAR AI Cloud [here](https://docs.near.ai/cloud/private-inference).

---

### Other Inference Providers

You can use other inference providers like OpenAI, Anthropic, etc. However, you need to place a certain level of trust in the provider that the inputs remain private and the output was produced by the intended model.
