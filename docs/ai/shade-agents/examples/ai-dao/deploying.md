---
id: deploying
title: Deploying
sidebar_label: Deploying
description: "Learn how to deploy the Verifiable AI DAO Shade Agent which includes how to deploy a custom agent contract."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

On this page we'll guide you through deploying your own instance of the AI DAO.

---

## Prerequisites  

- First please make sure you have all the [prerequisites from our quickstart](../../quickstart/deploying.md#prerequisites).

- Additionally, you'll need to set up an account on `NEAR AI Cloud`, fund it, and obtain an API key. This can be done through the [NEAR AI Cloud Dashboard](https://cloud.near.ai/dashboard/overview).

---

- First, `clone` the [example](https://github.com/NearDeFi/verifiable-ai-dao/tree/main).

  ```bash
  git clone https://github.com/NearDeFi/shade-agent-template
  cd shade-agent-template
  ```

- Rename the `.env.development.local.example` file name to `.env.development.local` and configure your `environment variables`.

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

## Local Development

In this example, the AI DAO uses a `custom agent contract`. Because of this, you need to manually switch the contract deployed depending on whether you're developing locally or deploying the agent to a TEE.

- For local development, you need to comment out the [require approved code hash line](https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L102) within the `agent_vote` function. This allows anyone to call the function, not just a registered agent. By design, it's impossible for an agent to register when running locally, as it can't provide a valid TEE attestation.

    <Github fname="dao.rs" language="rust"
        url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L101-L102"
        start="101" end="102" />

- Since the AI DAO uses a custom agent contract, you need to compile it yourself.

    <Tabs groupId="code-tabs">

    <TabItem value="linux" label="Linux">

        ```bash
        cargo near build non-reproducible-wasm
        ```

    </TabItem>

    <TabItem value="mac" label="Mac">

        ```bash
        docker run --rm -v "$(pwd)":/workspace pivortex/near-builder@sha256:cdffded38c6cff93a046171269268f99d517237fac800f58e5ad1bcd8d6e2418 cargo near build non-reproducible-wasm
        ```

    </TabItem>

    </Tabs>

- Make sure that the NEXT_PUBLIC_contractId prefix is set to `ac-proxy.` followed by your NEAR account ID so the CLI is configured for local deployment.

- Run the Shade Agent CLI with the `wasm` and `funding` flags. The wasm flag tells the CLI the path to the wasm file of the agent contract you're deploying, and the funding flag tells the CLI how much NEAR to fund the deployment with. 7 NEAR is sufficient for the size of the DAO contract.

    ```bash
    shade-agent-cli --wasm contract/target/near/contract.wasm --funding 7
    ```

    The CLI may prompt you to enter your sudo password.

---

## TEE Deployment 

- Re-introduce the [require approved code hash line](https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L102) so it requires an agent to be registered, meaning it's running in a genuine TEE and executing the expected agent code.

    <Github fname="dao.rs" language="rust"
        url="https://github.com/NearDeFi/verifiable-ai-dao/blob/main/contract/src/dao.rs#L101-L102"
        start="101" end="102" />

- Because the contract has changed since you last deployed it, you need to compile it again. 

    <Tabs groupId="code-tabs">

    <TabItem value="linux" label="Linux">

        ```bash
        cargo near build non-reproducible-wasm
        ```

    </TabItem>

    <TabItem value="mac" label="Mac">

        ```bash
        docker run --rm -v "$(pwd)":/workspace pivortex/near-builder@sha256:cdffded38c6cff93a046171269268f99d517237fac800f58e5ad1bcd8d6e2418 cargo near build non-reproducible-wasm
        ```

    </TabItem>

    </Tabs>

- Change the NEXT_PUBLIC_contractId prefix to `ac-sandbox.` followed by your NEAR account ID so the CLI is configured for TEE deployment.

- Run the Shade Agent CLI with the `wasm` and `funding` flags. 

    ```bash
    shade-agent-cli --wasm contract/target/near/contract.wasm --funding 7
    ```

    The CLI may prompt you to enter your sudo password.

---

### Interacting with the AI DAO

- Set the DAO manifesto in the contract. Since the `NEAR_ACCOUNT_ID` in your environment variables is automatically assigned the `owner` of the agent contract, you need to sign this transaction using its `SEED_PHRASE`.

    ```bash
    near contract call-function as-transaction YOUR_CONTRACT_ID set_manifesto json-args '{"manifesto_text": "This DAO only approves gaming-related proposals and rejects everything else"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as YOUR_ACCOUNT_ID network-config testnet sign-with-seed-phrase 'YOUR_SEED_PHRASE' --seed-phrase-hd-path 'm/44'\''/397'\''/0'\''' send
    ```

    Make sure to replace `YOUR_CONTRACT_ID`, `YOUR_ACCOUNT_ID`, and `YOUR_SEED_PHRASE` with the appropriate values before executing the command. You can optionally change the manifesto_text as well.

-  Set your `NEXT_PUBLIC_contractId` in the frontend's [config.js](https://github.com/NearDeFi/verifiable-ai-dao/blob/main/frontend/src/config.js) file.

- Start the frontend

    ```bash
    cd frontend
    npm i
    npm run dev
    ```