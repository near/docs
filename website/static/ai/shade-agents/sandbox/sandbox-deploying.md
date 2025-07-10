---
id: sandbox-deploying
title: Using the Sandbox
sidebar_label: Using the Sandbox
---




The Shade Agent Sandbox is a development workflow that allows you to get up and running with Shade Agents as quickly as possible with minimum prerequisites. 

The [sandbox template](https://github.com/NearDeFi/shade-agent-sandbox-template) we're using is a simple Shade Agent built with NextJS that acts as a verifiable ETH price oracle. It takes prices from two different APIs, takes the average, and then pushes the price to an Ethereum contract. A pre-deployed Sandbox Template can be found [here](https://27a9031b5b3c5e792db95ffe3867be72bf4c1b6c-3000.dstack-prod8.phala.network/#).

We'll cover two deployment scenarios:
1. **Local Development**: Running the agent locally for rapid testing and development.
2. **TEE Deployment**: Running the worker agent in a real Trusted Execution Environment (TEE).

On the [next page](./components.md), you'll see how to edit this agent for your specific use case.

---

## Prerequisites

- First, `clone` the [template repository](https://github.com/NearDeFi/shade-agent-sandbox-template).

```bash
git clone https://github.com/NearDeFi/shade-agent-sandbox-template shade-agent
cd shade-agent
```

- Install NEAR and Shade Agent tooling:

```bash
# Install the NEAR CLI
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh

# Install the Shade Agent CLI
npm i -g @neardefi/shade-agent-cli

# Install the Phala Cloud CLI
npm install -g phala
```

If you already have the NEAR CLI installed, check that you have the `most recent version`.

- Create a `NEAR testnet account` and record the account name and `seed phrase`:

```bash
near account create-account sponsor-by-faucet-service <example-name.testnet> autogenerate-new-keypair print-to-terminal network-config testnet create
```

- Install Docker for [Mac](https://docs.docker.com/desktop/setup/install/mac-install/) or [Linux](https://docs.docker.com/desktop/setup/install/linux/) and set up an account.

- Set up a free Phala Cloud account at https://cloud.phala.network/register then get an API key from https://cloud.phala.network/dashboard/tokens.

<details>

<summary> What is a Phala Cloud </summary>

Phala Cloud is a service that offers secure and private hosting in a TEE using [Dstack](https://docs.phala.network/overview/phala-network/dstack). Phala Cloud makes it easy to run a TEE, that's why we use it in our template!

</details>

---

:::warning
This technology has not yet undergone a formal audit. Use at your own risk. Please conduct your own due diligence and exercise caution before integrating or relying on it in production environments.
:::

---

## Local Development

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

- Make sure the `NEXT_PUBLIC_contractId` prefix is set to `ac.proxy.` followed by your NEAR accountId.

- In one terminal, run the Shade Agent CLI:

```bash
shade-agent-cli
```

The CLI will prompt you to enter your `sudo password`. 

- In another terminal, start the frontend :

```bash
yarn start
```

---

## TEE Deployment 

- Change the `NEXT_PUBLIC_contractId` prefix to `ac.sandbox.` followed by your NEAR accountId.

- Run the Shade Agent CLI

```bash
shade-agent-cli
```

The CLI will prompt you to enter your `sudo password`. 

This command will take about 5 minutes to complete.

- Head over to your Phala Cloud dashboard https://cloud.phala.network/dashboard

- Once the deployment is finished, click on your deployment, then head to the `network tab` and open the endpoint that is running on `port 3000`.

<SigsSupport />
