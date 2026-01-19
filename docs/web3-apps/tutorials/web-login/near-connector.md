id: near-connector
title: Modern NEAR Wallet Connection
description: "Connect users to NEAR wallets with the modern NEAR Connect library"
---

# NEAR Connect

**NEAR Connect** (`@hot-labs/near-connect`) is the modern wallet connector for NEAR. Created by Andrei Zhevlakov (CTO at HOT Labs), it solves the maintenance issues of `near-wallet-selector` with zero dependencies and sandboxed security.

![Preview](https://github.com/user-attachments/assets/c4422057-38bb-4cd9-8bd0-568e29f46280)

## Quick Start

```bash
yarn add @hot-labs/near-connect
```

```tsx
import { NearConnector } from "@hot-labs/near-connect";

const connector = new NearConnector();

connector.on("wallet:signIn", async (data) => {
  const wallet = await connector.wallet();
  const accountId = data.accounts[0].accountId;
  
  // Use wallet API (compatible with near-wallet-selector)
  await wallet.signMessage({
    message: "Authenticate with NEAR",
    recipient: "your-app.near",
    nonce: Buffer.from(crypto.randomUUID())
  });
});

// Connect wallet
connector.connect();
```

## Configuration

```tsx
// Filter wallets by features
const connector = new NearConnector({
  features: {
    signMessage: true,
    testnet: true
  },
  
  // Optional: request limited access key
  signIn: {
    contractId: "game.near",
    methods: ["action"]
  },
  
  // Optional: WalletConnect support
  walletConnect: walletConnectClient
});
```

## Available Wallets

- HOT Wallet
- Meteor Wallet
- Intear Wallet
- MyNearWallet
- Nightly Wallet
- Near Mobile Wallet
- Unity Wallet
- OKX Wallet
- Any WalletConnect wallet

## Transaction Formats

### Legacy format (backward compatible)
```tsx
await wallet.signAndSendTransaction({
  receiverId: "contract.near",
  actions: [{
    type: "FunctionCall",
    params: {
      methodName: "method_name",
      args: { param: "value" },
      gas: "30000000000000",
      deposit: "0"
    }
  }]
});
```

### NEAR API JS format (recommended)
```tsx
import { functionCall } from "@near-js/transactions";

await wallet.signAndSendTransaction({
  receiverId: "contract.near",
  actions: [
    functionCall("method_name", { param: "value" }, "30000000000000", "0")
  ]
});
```

## Architecture

Wallets run in isolated iframes with controlled access:
- **Sandboxed security** - wallet code isolated from dApp
- **Dynamic updates** - wallets update independently without app changes
- **Zero dependencies** - lightweight and secure

For more information, visit [github.com/azbang/near-connect](https://github.com/azbang/near-connect)