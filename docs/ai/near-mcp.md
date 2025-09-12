---
id: near-mcp
title: NEAR MCP Server
sidebar_label: NEAR MCP Server
description: "Equip AI agents with tools for using the NEAR blockchain via Model Context Protocol (MCP)."
---

import {Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The NEAR MCP Server is an open-source toolkit offers a standardized way for AI applications to integrate with NEAR. It provides [23 tools](https://github.com/nearai/near-mcp/blob/main/TOOLS.md) which enable agents to sign on-chain transactions, manage access keys, exchange tokens, interact with contracts, and more!

:::info Heads up...

MCP stands for [Model Context Protocol](https://modelcontextprotocol.io), an open-source standard for connecting AI agents with external services

Not to be confused with the MPC (Multi-Party Computation) service used by [chain signatures](../chain-abstraction/chain-signatures.md)

:::

---

## Usage Guide

Since the NEAR MCP Server needs to handle private keys, it is designed to run locally on your machine or on a trusted remote server. Currently there is **no hosted version** of the NEAR MCP server.

<hr class="subsection" />

### Quickstart
You can either install the MCP server globally and start it, or run it directly using `npx`.

<Tabs>
<TabItem value="global" label="Local">

  ```bash
  # Install and Run
  npm install -g @nearai/near-mcp@latest
  near-mcp run

  # Without Installing
  npx @nearai/near-mcp@latest run
  ```

</TabItem>

</Tabs>

:::tip

By default the MCP server will run a local input/output server, to start a web server instead add the `--port 4000 --remote` flags

```bash
npx @nearai/near-mcp@latest run --port 4000 --remote
```

:::

<hr class="subsection" />

### Local MCP Server

Once the NEAR MPC starts locally it starts what is called a [`stdio server`](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#stdio). To connect your AI agent to the server you will need to use an MCP client library:

<Github fname="near-mcp.py" language="python"
        url="https://github.com/gagdiez/minimal-ai/blob/main/examples/near-mcp.py" start="120" end="123" />

In order to use the NEAR MCP server, you will need to manually parse its tool:

<Github fname="near-mcp.py" language="python"
        url="https://github.com/gagdiez/minimal-ai/blob/main/examples/near-mcp.py#L34-L46" start="34" end="46" />

You can then use the tools as part of your prompt:

<Github fname="near-mcp.py" language="python"
        url="https://github.com/gagdiez/minimal-ai/blob/main/examples/near-mcp.py#L91-L96" start="91" end="96" />

:::tip Accounts

By default the MCP server will have no accounts loaded, your agent can either import and account using the `system_import_account` tool, or you can specify which keystore to load by setting the `NEAR_KEYSTORE` environment variable

```bash
NEAR_KEYSTORE=/path/to/keystore npx @nearai/near-mcp@latest run
```

:::

<hr class="subsection" />


### Example Prompts

The Agent using the MCP server will readily have tool to answer prompts like:

- What is the balance of `agency.testnet`?
- Add the account `example.testnet` using the private key `ed25519:...`
- Transfer 0.1 NEAR from `agency.testnet` to `example.testnet`
- Call the `ft_transfer` method on the `usdc.fakes.testnet` contract
- What are the public methods of `social.near`?

---

## Integrate With AI Clients

You can use the NEAR MCP server with any standard MCP client. Here are instructions for some popular clients:

<Tabs>

<TabItem value="cursor" label="Cursor IDE">

  Go to **Settings** > **MCP Servers**, and add a new server with the following details:

  - **Name**: near-mcp
  - **Command**: npx
  - **Arguments**: ["-y", "@nearai/near-mcp@latest", "run"]
  - **Environment Variables**: (optional) Add any necessary environment variables, e.g., `NEAR_KEYSTORE`.

  You can now use the NEAR MCP tools in your prompts.
  
</TabItem>

<TabItem value="claude_coe" label="Claude Code">

  ##### 1. Install Claude Code

  ```bash
  npm install -g @anthropic-ai/claude-code
  ```

  ##### 2. Add MCP Server to Claude Code

  ```bash
  claude mcp add near-mcp npx @nearai/near-mcp@latest run
  ```

  ##### 3. Start Claude Code and Run Tests

  ```
  claude
  ```

</TabItem>

<TabItem value="claude_desktop" label="Claude Desktop">

  Add to your JSON config:

  ```json
  {
    "mcpServers": {
      "near-mcp": {
        "command": "npx",
        "args": ["-y", "@nearai/near-mcp@latest", "run"],
        "env": {}
      }
    }
  }
  ```

</TabItem>

</Tabs>

---

## Remote MCP Server

Read these [instructions](https://github.com/nearai/near-mcp/blob/main/tee.md) to deploy the MCP server remotely on Phala Cloud.

---

## Contributing

Visit NEAR AI's [GitHub repository](https://github.com/nearai/near-mcp) to create issues or submit pull requests.
