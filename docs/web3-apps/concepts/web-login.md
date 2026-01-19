---
title: Web Login Methods for NEAR
id: web-login
description: "Learn wallet connection options for your NEAR web app"
---

NEAR offers multiple wallet connection methods. The modern NEAR Connect approach is recommended for new projects.

| Method | Dependencies | Maintenance | Recommendation |
|--------|--------------|--------------|----------------|
| **NEAR Connect** | Zero | Distributed | **Recommended** |
| Wallet Selector | Multiple | Centralized | Legacy |
| Privy | Third-party | Third-party | Social login |
| Web3Auth | Third-party | Third-party | Social login |

---

## NEAR Connect (Recommended)

[NEAR Connect](https://github.com/azbang/near-connect) is modern wallet connector for NEAR. Created by Andrei Zhevlakov (CTO at HOT Labs), it solves maintenance issues of the legacy approach.

![Preview](https://github.com/user-attachments/assets/c4422057-38bb-4cd9-8bd0-568e29f46280)

### Key Benefits
- Zero dependencies
- Sandboxed security
- Dynamic wallet updates
- Better performance

```bash
yarn add @hot-labs/near-connect
```

```tsx
import { NearConnector } from "@hot-labs/near-connect";

const connector = new NearConnector();
connector.on("wallet:signIn", async (data) => {
  const wallet = await connector.wallet();
  // Use wallet API (compatible with near-wallet-selector)
});
```

[View full NEAR Connect tutorial](../tutorials/web-login/near-connector.md)

---

## Wallet Selector (Legacy)

The [Wallet Selector](https://github.com/near/wallet-selector) is the traditional approach with maintenance challenges:
- Monolithic codebase
- Bundled wallet code
- Slow update cycle

![Preview](/assets/docs/tools/wallet-selector-preview.png)

:::note
Consider using [NEAR Connect](#near-connect-recommended) for new projects instead.
:::

---

## Social Login Options

### Privy

[Privy](https://www.privy.io/) enables social login (email, Google, Facebook) with NEAR wallet creation.

### Web3Auth

[Web3Auth](https://web3auth.io/) provides social login with NEAR wallet creation.

:::warning
Web3Auth's Ethereum wallet login won't work with NEAR contracts.
:::