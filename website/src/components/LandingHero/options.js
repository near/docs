import React from "react";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";

export const CATEGORY_STRINGS = [
  "AI Agents",
  "Multichain Apps",
  "Smart Contracts",
  "Decentralized Apps",
];

export const OPTIONS = [
  {
    label: "ai.js",
    buttonText: "Build AI Agents",
    buttonLink: "/ai/introduction",
    language: "js",
    code: `import { Hono } from "hono";
import { agentAccountId, agent } from "@neardefi/shade-agent-js";

const app = new Hono();

app.get("/", async (c) => {
  try {
    // Get the agents account Id
    const accountId = await agentAccountId();

    // Get the balance of the agent account
    const balance = await agent("getBalance");

    return c.json({
      accountId: accountId.accountId,
      balance: balance.balance,
    });
  } catch (error) {
    console.log("Error getting agent account:", error);
    return c.json({ error: "Failed to get agent account " + error }, 500);
  }
});

export default app;`
  },
  {
    label: "multichain.js",
    buttonText: "Build Cross-chain Apps",
    buttonLink: "/chain-abstraction/what-is",
    language: "js",
    code:  `import { Account } from "@near-js/accounts"
import { KeyPair } from "@near-js/crypto"
import { JsonRpcProvider } from "@near-js/providers"
import { KeyPairSigner } from "@near-js/signers"

import { getAdapter, chains } from "multichain.js"

async function main() {
  // NEAR Account
  const provider = new JsonRpcProvider({ url: "https://test.rpc.fastnear.com" })

  const nearAddress = "your-account.testnet"
  const signer = new KeyPairSigner(KeyPair.fromString("ed25519:..."))
  const account = new Account(nearAddress, provider, signer)

  // Ethereum Adapter
  const adapter = getAdapter({ chain: chains.ARBITRUM, mpcNetwork: "testnet" })
  const address = await adapter.getAddressControlledBy({ nearAddress })
  console.log("Address:", address)

  const balance = await adapter.getBalance({ address })
  console.log("Balance:", balance)

  const tx = await adapter.transfer({
    to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
    amount: "10000000000000000", // 0.01 ETH
    nearAccount: account,
  })

  console.log("Transaction:", tx)
}
`,
  },
  {
    label: "hello.rs",
    buttonText: "Write Smart Contracts",
    buttonLink: "/smart-contracts/quickstart",
    language: "rust",
    code:  `use near_sdk::{log, near};

#[near(contract_state)]
pub struct Contract {
    greeting: String,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            greeting: "Hello".to_string(),
        }
    }
}

#[near]
impl Contract {
    pub fn get_greeting(&self) -> String {
        self.greeting.clone()
    }

    pub fn set_greeting(&mut self, greeting: String) {
        log!("Saving greeting: {}", greeting);
        self.greeting = greeting;
    }
}    `,
  },
  {
    label: "app.jsx",
    buttonText: "Build Web3 Apps",
    buttonLink: "/web3-apps/quickstart",
    language: "jsx",
    code:  `import { useEffect, useState } from "react";
import { useWalletSelector } from "@near-wallet-selector/react-hook";

export default function HelloNear() {
  const { signedAccountId, viewFunction, callFunction } = useWalletSelector();

  const [greeting, setGreeting] = useState<string>("loading...");

  useEffect(() => {
    viewFunction({ contractId: HelloNearContract, method: "get_greeting" })
    .then((greeting) => setGreeting(greeting));
  }, []);

  const saveGreeting = async () => {
    callFunction({
      contractId: HelloNearContract,
      method: "set_greeting",
      args: { greeting }
    });
  };

  return (
    <main>
      <h1 className="w-100">
        The contract says: <code>{greeting}</code>
      </h1>
      <input
        type="text"
        className="form-control w-20"
        placeholder="Store a new greeting"
        onChange={(t) => setGreeting(t.target.value)}
      />
      <button onClick={saveGreeting}> Save </button>
    </main>
  );
}`,
  },
];
