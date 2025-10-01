---
id: deployment
title: Deploying and Interacting with Your Contract
sidebar_label: Deployment & Interaction
description: Now is the time to Deploy and Interact with your Smart Contract
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Let's deploy your randomness contract and interact with it on NEAR testnet.

## Prerequisites

Ensure you have:
- NEAR CLI installed: `npm install -g near-cli-rs`
- A testnet account: create one at [mynearwallet.com](https://testnet.mynearwallet.com)
- Your contract compiled (`.wasm` file)

## Creating a Dev Account

The easiest way to deploy for testing:

```bash
# Deploy to a dev account (creates new account automatically)
near dev-deploy build/coin_flip.wasm

# Note the deployed account ID (e.g., dev-1234567890123-12345678901234)
export CONTRACT_ID=dev-1234567890123-12345678901234
```

## Deploying to a Named Account

For production or persistent testing:

```bash
# Create a subaccount
near account create-account sponsor-by-faucet-service coin-flip.YOUR_ACCOUNT.testnet autogenerate-new-keypair save-to-keychain network-config testnet create

# Deploy the contract
near contract deploy coin-flip.YOUR_ACCOUNT.testnet use-file ./build/coin_flip.wasm without-init-call network-config testnet sign-with-keychain send
```

## Interacting with the Contract

### Playing the Coin Flip Game

<Tabs>
  <TabItem value="cli" label="NEAR CLI" default>

```bash
# Flip the coin (guess heads)
near contract call-function as-transaction $CONTRACT_ID flip_coin json-args '{"player_guess":"heads"}' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' sign-as YOUR_ACCOUNT.testnet network-config testnet sign-with-keychain send

# Check your points
near contract call-function as-read-only $CONTRACT_ID points_of json-args '{"player":"YOUR_ACCOUNT.testnet"}' network-config testnet now
```

  </TabItem>
  <TabItem value="js" label="JavaScript">

```javascript
const { connect, keyStores, utils } = require("near-api-js");

// Setup
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(
  `${process.env.HOME}/.near-credentials`
);

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
};

const near = await connect(config);
const account = await near.account("YOUR_ACCOUNT.testnet");

// Play the game
const result = await account.functionCall({
  contractId: "coinflip.near-examples.testnet",
  methodName: "flip_coin",
  args: { player_guess: "heads" },
  gas: "30000000000000",
});

console.log("Result:", result);

// Check points
const points = await account.viewFunction({
  contractId: "coinflip.near-examples.testnet",
  methodName: "points_of",
  args: { player: "YOUR_ACCOUNT.testnet" },
});

console.log("Your points:", points);
```

  </TabItem>
</Tabs>

## Building a Simple Frontend

Create a basic web interface:

```html
<!DOCTYPE html>
<html>
<head>
    <title>NEAR Coin Flip</title>
    <script src="https://cdn.jsdelivr.net/npm/near-api-js/dist/near-api-js.min.js"></script>
</head>
<body>
    <h1>Coin Flip Game</h1>
    <button onclick="flip('heads')">Heads</button>
    <button onclick="flip('tails')">Tails</button>
    <div id="result"></div>
    <div id="points"></div>

    <script>
        const CONTRACT_ID = 'coinflip.near-examples.testnet';
        
        async function flip(guess) {
            const keyStore = new nearApi.keyStores.BrowserLocalStorageKeyStore();
            const config = {
                networkId: "testnet",
                keyStore,
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://testnet.mynearwallet.com",
            };
            
            const near = await nearApi.connect(config);
            const wallet = new nearApi.WalletConnection(near);
            
            if (!wallet.isSignedIn()) {
                wallet.requestSignIn({ contractId: CONTRACT_ID });
                return;
            }
            
            const account = wallet.account();
            const result = await account.functionCall({
                contractId: CONTRACT_ID,
                methodName: 'flip_coin',
                args: { player_guess: guess }
            });
            
            document.getElementById('result').innerText = 
                `Result: ${result}`;
            
            updatePoints();
        }
        
        async function updatePoints() {
            // View function call to get points
            const points = await near.connection.provider.query({
                request_type: "call_function",
                account_id: CONTRACT_ID,
                method_name: "points_of",
                args_base64: btoa(JSON.stringify({
                    player: wallet.getAccountId()
                })),
                finality: "optimistic",
            });
            
            document.getElementById('points').innerText = 
                `Points: ${JSON.parse(atob(points.result))}`;
        }
    </script>
</body>
</html>
```

## Using the Example Frontend

The repository includes a complete Next.js frontend:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

The frontend demonstrates:
- Wallet integration with multiple wallet providers
- Real-time game interactions
- Score tracking
- Animated coin flips

## Monitoring Your Contract

View contract activity:

```bash
# Check recent transactions
near account view-account-summary $CONTRACT_ID network-config testnet now

# View contract state size
near contract view-state $CONTRACT_ID view-state-all network-config testnet now
```

## Best Practices for Production

1. **Set up monitoring** for randomness distribution
2. **Implement rate limiting** to prevent spam
3. **Add events** for important actions
4. **Consider upgradability** patterns
5. **Audit your randomness** usage regularly

## Next Steps

- Build more complex games using randomness patterns
- Add social features like leaderboards
- Implement different game modes
- Study other randomness use cases in DeFi and NFTs

Congratulations! You've learned how to implement secure on-chain randomness in NEAR smart contracts.