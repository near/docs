import React from "react";

export const OPTIONS = [
  {
    name: "Smart Contracts",
    label: "hello.rs",
    buttonText: "Build Your First Contract",
    buttonLink: "/smart-contracts/quickstart",
    description: "Build smart contracts using languages you already know like Rust, Javascript and Python",
    language: "rust",
    code:  `$> npx create-near-app@latest

✅ What do you want to build? › Smart Contract
✅ Name your project to create a contract: hello-near
✅ Success! Created 'hello-near', a smart contract in Rust


Build, test, and deploy your contract using cargo:
 * cargo near build
 * cargo test
 * cargo near deploy`,
  },
  {
    name: "Multichain Apps",
    label: "multichain.js",
    buttonText: "Go Multichain",
    buttonLink: "/chain-abstraction/what-is",
    description: "Handle assets on every chain through the power of chain signatures and intents",
    language: "ts",
    code:  `import { Account, KeyPair, JsonRpcProvider, KeyPairSigner } from "near-api-js"
import { getAdapter, chains } from "multichain.js"

async function main() {
  const nearProvider = new JsonRpcProvider({ url: "https://test.rpc.fastnear.com" })
  const nearAccount = new Account("account.testnet", nearProvider, "ed25519:...")

  const arbitrum = getAdapter({ chain: chains.ARBITRUM, mpcNetwork: "testnet" })
  const arbAddress = await arbitrum.getAddressControlledBy({ nearAddress: nearAccount.accountId })
  const arbBalance = await arbitrum.getBalance({ address: arbAddress })
  console.log("Controlled Account", { arbAddress, arbBalance })

  await arbitrum.transfer({
    to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
    amount: "10000000000000000", // 0.01 ETH
    nearAccount,
  })
}
`,
  },
  {
    name: "Decentralized Apps",
    label: "app.jsx",
    buttonText: "Build a Web3 App",
    buttonLink: "/web3-apps/quickstart",
    description: "Integrate NEAR into your app in seconds thanks to our APIs and wallet connectors",
    language: "rust",
    code:  `$> npx create-near-app@latest

✅ What do you want to build? › A Web App
✅ Select a framework for your frontend › Vite (React)
✅ Name your project: hello-near

- Creating a new NEAR app...
- Installing dependencies, this might take a while...

✅ Success! Created 'hello-near', a web-app using Vite React.
 * cd hello-near
 * npm run dev
`,
  },
  {
    name: "AI Agents",
    label: "ai.js",
    description: "Build agents that anyone can verify and trust, with seamless cross-chain capabilities",
    buttonText: "Build an AI Agent",
    buttonLink: "/ai/introduction",
    language: "js",
    code: `import { Hono } from "hono";
import { agentAccountId, agent } from "@neardefi/shade-agent-js";

const app = new Hono();

app.get("/", async (c) => {
  const accountId = await agentAccountId();
  const balance = await agent("getBalance");

  return c.json({
    accountId: accountId.accountId,
    balance: balance.balance,
  });
});


export default app;`,
  },
];
