---
id: deploying
title: Deploying an Agent
sidebar_label: Deploying an Agent
---

# Deploying an Agent

In this section we we'll walk through deploying your first Shade Agent. On the next page you can see how to edit the agent to work for your use case.

We'll cover two deployment scenarios:
1. **TEE Deployment**: Running the worker agent in a real Trusted Execution Environment (TEE).
2. **Local Development**: Running the agent locally for rapid testing and development.

## TEE Deployment

### Setup

First clone the template [repository](https://github.com/PiVortex/shade-agent-template).

```bash
git clone https://github.com/PiVortex/shade-agent-template.git
cd shade-agent-template
```

Later on you'll need a NEAR account. You can get a pre-funded testnet account with [cargo-near](https://github.com/near/cargo-near/releases/latest).

```bash
cargo near create-dev-account use-random-account-id autogenerate-new-keypair
```

### Deploying the contract 









## Local deployment 

