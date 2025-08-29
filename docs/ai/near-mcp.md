# NEAR MCP Server

## Introduction

This open-source toolkit offers a standardized way for AI applications to integrate with NEAR.

It provides [23 tools](https://github.com/nearai/near-mcp/blob/main/TOOLS.md) which enable agents to sign on-chain transactions, manage access keys, exchange tokens, interact with contracts, and more!

#### Capabilities

- **System Administration:** list, import, remove local keypairs
- **Account Operations:** create, sign, verify, export, delete
- **Token Transfers:** send NEAR or searchable NEP-141 assets
- **Contract Interactions:** view functions, get data, call methods
- **DeFi Activities:** find liquidity pools, get quotes, swap tokens

#### What is MCP?

[Model Context Protocol](https://modelcontextprotocol.io) connects AI agents and large language models with the real world. MCP tools are simply executable functions that can be invoked to perform _actions_.

:::info Heads up...
MCP is not MPC (multi-party computation)
:::

## Usage Guide

### Prerequisites

#### You will need:

- Node.js v16+
- NEAR account
- MCP client

The `near-mcp` server works with any standard MCP client.

Here is a list of [example clients](https://modelcontextprotocol.io/clients).

### Quickstart

#### Option 1: [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)

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

#### Option 2: [Claude Desktop](https://claude.ai/download)

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

:::tip Advanced
Read these [instructions](https://github.com/nearai/near-mcp/blob/main/tee.md) to deploy the MCP server remotely on Phala Cloud.
:::

### Testing

#### Example Prompts:

- List available NEAR MCP tools
- What is the balance of `agency.testnet`?
- What are the public methods of `social.near`?

### Manual Setup

_for use with other MCP clients or custom configurations_

#### Option 1: Global Installation

```bash
npm install -g @nearai/near-mcp@latest
near-mcp run
```

#### Option 2: Run Server Directly

```bash
npx @nearai/near-mcp@latest run
```

#### Verify

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
