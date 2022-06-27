---
id: deploy-to-mainnet
title: Deploy Smart Contracts to MainNet
sidebar_label: Deploy to MainNet
---

Once you are ready to deploy your smart contract to MainNet
you'll need to change your network by prepending `NEAR_ENV=mainnet`
to all `near-cli` commands.

1. Start off by logging into the account you want to deploy your contract
   to:

```bash
NEAR_ENV=mainnet near login
```

2. Next deploy your contract:

```bash
NEAR_ENV=mainnet near deploy --accountId YOUR_CONTRACT_ACCOUNT.near --wasmFile out/YOUR_CONTRACT.wasm
```

3. Finally, you can call any initialization contract methods:

```bash
NEAR_ENV=mainnet near call YOUR_CONTRACT_ACCOUNT.near init '{}' --accountId YOUR_CONTRACT_ACCOUNT.near
```