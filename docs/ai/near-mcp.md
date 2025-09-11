---
id: near-mcp
title: NEAR MCP Server
sidebar_label: NEAR MCP Server
description: "Equip AI agents with tools for using the NEAR blockchain via Model Context Protocol (MCP)."
---

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
<TabItem value="npx" label="Remote">

  ```bash
  # Install and Run
  npm install -g @nearai/near-mcp@latest
  near-mcp run

  # Without Installing
  npx @nearai/near-mcp@latest run --port 4000 --remote
  ```
</TabItem>

</Tabs>

<hr class="subsection" />

### Local MCP Server

When the server starts
Using the server will variate depending if you are using a local or remote deployment.

<Tabs>
<TabItem value="local" label="Local Deployment">

  By default, the MCP server will use your local NEAR CLI keystore at `~/.near-keystore/`. Make sure you have some accounts with keys there. You can create and manage accounts with the [NEAR CLI](https://docs.near.org/tools/near-cli).

  You can also specify a different keystore path with the `NEAR_KEYSTORE` environment variable:

  ```bash
  NEAR_KEYSTORE=/path/to/keystore npx @nearai/near-mcp@latest run
  ```

</TabItem>

</Tabs>

:::tip Advanced
Read these [instructions](https://github.com/nearai/near-mcp/blob/main/tee.md) to deploy the MCP server remotely on Phala Cloud.
:::


---

## Integrate With AI Clients

You can use the NEAR MCP server with any standard MCP client. Here are instructions for two popular clients: Claude Code and Claude Desktop.

<Tabs>
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

## Example Prompts

The MCP server will readily understand prompts like:

- List available NEAR MCP tools
- What is the balance of `agency.testnet`?
- What are the public methods of `social.near`?

---

## Manual Setup

You can also run the NEAR MCP server manually


### Verify

You should see this:

```json
{"method":"notifications/message","params":{"level":"info","data":{"message":"NEAR MCP server started..."}}}
{"method":"notifications/message","params":{"level":"info","data":{"message":"Using NEAR keystore at: ~/.near-keystore"}}}
```

## Security

:::caution WARNING
This MCP server is meant for **local use only**.
:::

- Private keys are stored unencrypted at `~/.near-keystore/`
- NEAR MCP tools handle signing without exposing private keys
- **Exception:** `system_import_account` tool requires giving a private key to the model

## Contributing

Visit NEAR AI's [GitHub repository](https://github.com/nearai/near-mcp) to create issues or submit pull requests.
