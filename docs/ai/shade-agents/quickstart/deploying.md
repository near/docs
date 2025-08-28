---
id: deploying
title: Deploying an Agent
sidebar_label: Deploying an Agent
description: "Learn how to deploy Shade Agents to production environments with full contract customization and flexible architecture for real-world applications."
---

import { SigsSupport } from '@site/src/components/sigsSupport';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this section, we'll walk you through deploying a Shade Agent. The Shade Agent Framework abstracts the complexities of creating a agent by removing TEE specific code and handling the deployment of the agent contract under hood.

The [template](https://github.com/NearDeFi/shade-agent-template) we're using is a simple Shade Agent built with Hono and written in TypeScript that acts as a verifiable ETH price oracle. It fetches the price of Eth from two different APIs, takes the average, and then pushes the price to an Ethereum contract. 

We'll cover two deployment scenarios:
1. **Local Development**: Running the agent locally for rapid testing and development.
2. **TEE Deployment**: Running the agent in a real Trusted Execution Environment (TEE).

On the [next page](./components.md), you'll see how to edit this agent for your specific use case.

---

## Prerequisites

- First, `clone` the [template](https://github.com/NearDeFi/shade-agent-template).

  ```bash
  git clone https://github.com/NearDeFi/shade-agent-template
  cd shade-agent-template
  ```

- Install NEAR and Shade Agent tooling:

  ```bash
  # Install the NEAR CLI
  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh

  # Install the Shade Agent CLI
  npm i -g @neardefi/shade-agent-cli
  ```

- Create a `NEAR testnet account` and record the account name and `seed phrase`:

  ```bash
  export ACCOUNT_ID=example-name.testnet
  near account create-account sponsor-by-faucet-service $ACCOUNT_ID autogenerate-new-keypair save-to-keychain network-config testnet create
  ```

  replacing `example-name.testnet` with a unique account Id.

- Set up Docker if you have not already:

  - Install Docker for [Mac](https://docs.docker.com/desktop/setup/install/mac-install/) or [Linux](https://docs.docker.com/desktop/setup/install/linux/) and create an account.

  - Log in to Docker, using `docker login` for Mac or `sudo docker login` for Linux.

- Set up a free Phala Cloud account at https://cloud.phala.network/register, then get an API key from https://cloud.phala.network/dashboard/tokens.

<details>

<summary> What is a Phala Cloud </summary>

Phala Cloud is a cloud service that supports hosting applications in a TEE. It makes it easy to run an agent in TEE.

</details>

---

## Set up

- Rename the `.env.development.local.example` file name to `.env.development.local` and configure your environment variables.

- Start up Docker:

  <Tabs groupId="code-tabs">

    <TabItem value="linux" label="Linux">

      ```bash
      sudo systemctl start docker
      ```

    </TabItem>

    <TabItem value="mac" label="Mac">

      Simply open the Docker Desktop application or run: 

      ```bash
      open -a Docker
      ```

    </TabItem>

  </Tabs>

- Install dependencies 

  ```bash
  npm i
  ```

---

:::warning
This technology has not yet undergone a formal audit. Please conduct your own due diligence and exercise caution before integrating or relying on it in production environments.
:::

---

## Local Development

- Make sure the `NEXT_PUBLIC_contractId` prefix is set to `ac-proxy.` followed by your NEAR accountId.

- In one terminal, run the Shade Agent CLI:

  ```bash
  shade-agent-cli
  ```

  The CLI on Linux may prompt you to enter your `sudo password`. 

- In another terminal, start your app:

  ```bash
  npm run dev
  ```

  Your app will start on http://localhost:3000

---

## TEE Deployment

- Change the `NEXT_PUBLIC_contractId` prefix to `ac-sandbox.` followed by your NEAR accountId.

- Run the Shade Agent CLI

  ```bash
  shade-agent-cli
  ```

  The CLI on Linux may prompt you to enter your `sudo password`.

  The last `URL` the CLI outputs is the URL of your app. If your application is not working, head over to your App on the Phala Dashboard and review the logs.

---

## Interacting with the Agent

You can interact with your agent via the APIs directly or via a lightweight frontend contained in this repo.

### Direct

For Phala deployments, swap localhost:3000 for your deployment URL.

- Get the Agent account ID and its balance:

  ```
  http://localhost:3000/api/agent-account
  ```

- Get the derived Ethereum Sepolia price pusher account ID and its balance (you will need to fund this account):

  ```
  http://localhost:3000/api/eth-account
  ```

- Send a transaction through the agent to update the price of Eth:

  ```
  http://localhost:3000/api/transaction
  ```

### Frontend

To start the frontend, run:

```bash
cd frontend
npm i
npm run dev
```

To use the frontend with your Phala deployment change the `API_URL` to Phala URL in your [config.js](https://github.com/NearDeFi/shade-agent-template/blob/main/frontend/src/config.js) file.

--- 

## Next Steps

Now that you've successfully deployed your first Shade Agent, proceed to the [key components page](./components.md) to understand how agents work and learn how to customize it for your specific use case. 

<SigsSupport />