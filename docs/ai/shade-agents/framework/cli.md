---
id: cli
title: Shade Agent CLI
sidebar_label: Shade Agent CLI
description: "TODO"
---

The [Shade Agent CLI](https://github.com/NearDeFi/shade-agent-cli/tree/main) abstracts away the complexity of deploying a Shade Agent.

Under the hood the CLI:
- Builds and publishes the Docker Image for your agent app
- Creates the agent contract account, deploys the agent contract to it and initializes it with the ACCOUNT_ID as the owner
- Approves the image code hashes for your agent (app and API image)
- Deploys the agent to a TEE on Phala Cloud

---

## Local vs Production

The `NEXT_PUBLIC_contractId` in your environment variables prefix should be set to `ac-proxy.` for local development and `ac-sandbox.` for TEE deployment.

For local deployment the CLI works a little differently:
- No Docker Image is built or published for your agent app
- An agent contract that doesn't require agent registration is deployed instead (since it cannot produce a valid TEE attestation)
- The API image is hosted locally instead of deploying anything to a TEE

---

## Installation 

```bash
npm i -g @neardefi/shade-agent-cli
```

---

## Usage

The Shade Agent CLI is a single command with standard configurations. Run the command within the root of your project.

```bash
shade-agent-cli
```

Your project root must contain your `.env.development.local`, `Dockerfile` and `docker-compose.yaml` files.

---

## Flags 

The CLI comes with a list of flags to configure the CLI and turn different elements off. If you need further customizability when deploying your agent we suggest your turn off the relevant part via a flag and complete that step manually using native tools - [Docker CLI](https://docs.docker.com/reference/cli/docker/), [NEAR CLI](https://docs.near.org/tools/near-cli) and [Phala CLI](https://docs.phala.network/phala-cloud/phala-cloud-cli/overview)



---

## Custom RPC

To use a non default RPC with the CLI and the API create a filed named `near-rpc.json` with your projects root and configure the RPCs you would like to use:

```json
{
  "nearRpcProviders": [
    {
      "connectionInfo": {
        "url": "https://neart.lava.build:443"
      },
      "options": {
        "retries": 3,
        "backoff": 2,
        "wait": 1000
      }
    },
    {
      "connectionInfo": {
        "url": "https://test.rpc.fastnear.com"
      },
      "options": {
        "retries": 3,
        "backoff": 2,
        "wait": 1000
      }
    }
  ]
}
```

If required, you can specify headers under connectionInfo.
