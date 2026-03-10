---
id: tools-for-ai
title: Tools for AI Agents
description: "Guide your agent on building NEAR applications"
---

import Card from '@site/src/components/UI/Card';

NEAR offers multiple tools and resources to help your AI agents build and use NEAR applications. This page provides an overview of the key tools available and how to use them effectively.

<div className="row" style={{ marginTop: '2rem' }}>
	<div className="col col--6">
		<Card title="llms.txt">
			<p>When you need to provide your agent with a quick reference to all NEAR docs.</p>
			<a href="#llms-txt">Open section →</a>
		</Card>
	</div>
	<div className="col col--6">
		<Card title="Docs MCP">
			<p>When you want agents to search docs in real-time for up-to-date details.</p>
			<a href="#docs-mcp-endpoint">Open section →</a>
		</Card>
	</div>
</div>
<div className="row" style={{ marginTop: '2rem' }}>
	<div className="col col--6">
		<Card title="Agent Skills">
			<p>When you need your agent to become an expert in a specific task (e.g. using our API).</p>
			<a href="#near-agent-skills">Open section →</a>
		</Card>
	</div>
	<div className="col col--6">
		<Card title="NEAR MCP">
			<p>When your agent needs to perform on-chain actions (e.g., transfers and function calls).</p>
			<a href="#near-mcp-server">Open section →</a>
		</Card>
	</div>
</div>

---

## llms.txt

**What it is:** Curated NEAR docs context for coding assistants.

**Use it when:** You need to provide your agent with a quick reference to all NEAR docs.

**Link:** [https://docs.near.org/llms.txt](https://docs.near.org/llms.txt)

<details>
<summary>VS Code Setup</summary>

Use `#fetch` in your prompt:

```text
How can I upgrade a contract state?
#fetch https://docs.near.org/llms.txt
```

</details>

<details>
<summary>Cursor Setup</summary>

Add docs source once in Cursor Chat:

1. `@` → `Docs` → `+ Add new doc`
2. Add: `https://docs.near.org/llms.txt`
3. Select the source while prompting

</details>

---

## Docs MCP endpoint

**What it is:** An endpoint to search NEAR documentation via MCP.

**Use it when:** You want agents to search docs in real-time for up-to-date details and narrower API lookups.

**Link:** [https://docs.near.org/mcp](https://docs.near.org/mcp)

Use two complementary layers:

1. **Static context (`llms.txt`)** for fast, high-signal docs grounding.
2. **Retrieval (Docs MCP)** when the agent needs live lookup across docs.

---

## NEAR Agent Skills

NEAR Agent Skills are reusable capabilities that package repeatable workflows.

**Use it when:** You need your agent to become an expert in specific tasks (for example, using NEAR APIs).

**Link:** [https://github.com/near/agent-skills](https://github.com/near/agent-skills)

| Skill                                                                                              | Focus                                                                      |
|----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [near-ai-cloud](https://github.com/near/agent-skills/tree/main/skills/near-ai-cloud)               | Verifiable private AI inference and attestation                            |
| [near-api-js](https://github.com/near/agent-skills/tree/main/skills/near-api-js)                   | JS/TS blockchain interaction, transactions, tokens, and wallet integration |
| [near-dapp](https://github.com/near/agent-skills/tree/main/skills/near-dapp)                       | dApp project setup, wallet integration, React/Next.js patterns             |
| [near-intents](https://github.com/near/agent-skills/tree/main/skills/near-intents)                 | Cross-chain swaps via the 1Click API                                       |
| [near-kit](https://github.com/near/agent-skills/tree/main/skills/near-kit)                         | TypeScript SDK with type-safe contracts and sandbox testing                |
| [near-smart-contracts](https://github.com/near/agent-skills/tree/main/skills/near-smart-contracts) | Rust smart contract development, security, and state management            |

---

## NEAR MCP Server

The NEAR MCP Server is a tool server (currently [23 tools](https://github.com/nearai/near-mcp/blob/main/TOOLS.md)) that enables agents to perform blockchain operations.

**Use it when:** Your agent needs to hold funds, transfer funds, interact with smart contracts, or perform any action on-chain in  NEAR Protocol

**Repo**: [https://github.com/nearai/near-mcp](https://github.com/nearai/near-mcp)

**Remote deployment guide**: [https://github.com/nearai/near-mcp/blob/main/tee.md](https://github.com/nearai/near-mcp/blob/main/tee.md)

:::warning

The NEAR MCP is designed to run **locally** or on your **trusted infrastructure** because it handles private keys. There is no hosted public version.

:::

