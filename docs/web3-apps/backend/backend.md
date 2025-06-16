---
id: backend-login
title: Authenticate NEAR Users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs";

Authenticating users is a common use-case for backends and web applications. This enables services to provide a personalized experience to users, and to protect sensitive data.
NEAR Enhancement Proposal [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md) defines a standard for signing messages with a NEAR account, which allows backend services to authenticate users by verifying a signature that proves ownership of a NEAR account.

## General Backend Authentication Flow with a NEAR Wallet

To authenticate a user, the backend must verify that the user is who they say they are. To do so, the backend must verify that the user has access to a full-access key that is associated with their account.

For this, three basic steps are needed:

1.  **Create a challenge** for the user to sign.
2.  Ask the user to **sign the challenge** with their wallet.
3.  **Verify the signature** corresponds to the user.

### 1. Create a Challenge
Assume we want to login the user into our application named `application-name`.

We first need to create a challenge that the user will sign with their wallet. For this, it is recommended to use a cryptographically secure random number generator to create the challenge.

```javascript
import { randomBytes } from 'crypto'
const challenge = randomBytes(32) // This is the nonce
const message = 'Login with NEAR to application-name' // A human-readable message
```

:::note
Here we use [crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) to generate a 32-byte random buffer to be used as a nonce.
:::

### 2. Ask the User to Sign the Challenge
The `signMessage` method, as defined by [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md), is needed to sign the challenge. This method is supported by most wallets in the NEAR ecosystem, and any new wallets should make sure to implement it.

The message object that the user's wallet needs to sign typically contains these fields:

- `message`: The human-readable message that the user is signing (e.g., "Login to My App").
- `recipient`: The identifier of the service or application the user is authenticating to (e.g., "myapplication.com" or "myapplication.near").
- `nonce`: The unique challenge (random buffer) generated in step 1.
- `callbackUrl` (Optional): A URL where the wallet might redirect or send the signature after signing.

```javascript
// Assuming 'wallet' is an object obtained from a wallet integration
// (e.g., via Wallet Selector or directly like fastintear)
// and 'challenge', 'message', 'recipient', 'serverAuthUrl' are defined.

async function requestSignature(wallet, message, recipient, nonce, callbackUrl) {
  const signedMessageData = await wallet.signMessage({
    message: message,
    recipient: recipient,
    nonce: nonce, // Pass the raw Buffer or Uint8Array
    callbackUrl: callbackUrl 
  });
  
  // signedMessageData will typically include:
  // - accountId: The NEAR account ID of the signer.
  // - publicKey: The public key used for signing.
  // - signature: The signature string.
  // These are then sent to your backend for verification.
  return signedMessageData;
}
```

### 3. Verify the Signature
Once the user has signed the challenge, the client application sends the `accountId`, `publicKey`, `signature`, and the original `nonce` and `message` to the backend. The backend then verifies the signature.

A conceptual example of verification logic:
<Github fname="authenticate.js" language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/verify-signature/authentication.js" />

---

## Using `near-sign-verify` for Simplified Authentication

While the above flow outlines the general process, the `near-sign-verify` package offers a streamlined way to implement NEP-413 authentication by handling much of the token creation and verification complexity. To use the package:

```bash
npm install near-sign-verify
```

> [!IMPORTANT]
>
> It is **highly recommended** that you implement state and nonce validation, initiated by a handshake with your backend, especially for production applications. This crucial step helps mitigate [CSRF attacks](https://auth0.com/docs/secure/attack-protection/state-parameters) and [replay attacks](https://auth0.com/docs/get-started/authentication-and-authorization-flow/implicit-flow-with-form-post/mitigate-replay-attacks-when-using-the-implicit-flow). The [Full Backend Integration](#2-full-backend-integration-recommended-for-production) example below demonstrates this secure flow.

### 1. Basic Token Creation & Verification

This approach involves the client creating a signed token and the server verifying it. `near-sign-verify` uses a timestamp-based nonce by default if a specific nonce isn't provided, which is suitable for simpler, non-production applications.

#### Client-Side: Creating the `authToken`

The `sign` function from `near-sign-verify` creates a compact `authToken` string. The `signer` option is key here.

<Tabs groupId="signer-type-basic">
<TabItem value="fastintear" label="Using fastintear">

```typescript
import * as fastIntear from "fastintear"; // Wallet object implementing signMessage
import { sign } from 'near-sign-verify';

// Initialize or get your fastintear wallet instance
// const wallet = await fastIntear.connect(...); 

const authToken = await sign("Login to My Awesome App", {
  signer: fastIntear, // fastintear's global object or a connected instance
  recipient: 'my-awesome-app.com', 
});

// Send authToken to your backend
// fetch('https://api.my-awesome-app.com/login', {
//   headers: { 'Authorization': `Bearer ${authToken}` },
// });
```

</TabItem>
<TabItem value="wallet-selector" label="Using Wallet Selector">

```typescript
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
// ... import other wallet modules like setupMyNearWallet, setupHereWallet ...
import { sign } from 'near-sign-verify';

// Assuming you have Wallet Selector setup
// const selector = await setupWalletSelector({ network: "mainnet", modules: [...] });
// const modal = setupModal(selector, { contractId: "your.contract.id" });
// modal.show();
// const wallet = await selector.wallet(); // Get the selected wallet

if (!wallet) {
  throw new Error("Wallet not selected");
}

const authToken = await sign("Login to My Awesome App", {
  signer: wallet, // The wallet object from Wallet Selector
  recipient: 'my-awesome-app.com',
});

// Send authToken to your backend
// fetch('https://api.my-awesome-app.com/login', {
//   headers: { 'Authorization': `Bearer ${authToken}` },
// });
```
</TabItem>
<TabItem value="keypair" label="Using a KeyPair">

```typescript
import { KeyPair } from '@near-js/crypto';
import { sign } from 'near-sign-verify';

const keyPair = KeyPair.fromRandom('ed25519'); // Or load an existing key
const accountId = "your-account.near"; // Account ID associated with this keyPair

const authToken = await sign("Backend operation auth", {
  signer: keyPair.toString(), // Pass the private key string
  accountId: accountId,       // Required when signer is a string
  recipient: 'my-backend-service.near',
});

// authToken can now be used, e.g., for server-to-server auth or testing
```

**Note:** Using a `KeyPair` client-side is generally not recommended for user authentication as it exposes the private key. This is more for backend-to-backend or testing scenarios. For user auth, always prefer wallet-based signing. [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md#why-using-a-fullaccess-key-why-not-simply-creating-an-functioncall-key-for-signing) also mandates Full Access Keys for signing.
</TabItem>
</Tabs>

#### Server-Side: Verifying the `authToken`

The server receives the `authToken` and uses the `verify` function.

```typescript
import { verify } from 'near-sign-verify';

// Example in an Express.js route
// app.post('/login', async (req, res) => {
//   const authHeader = req.headers.authorization;
//   const authToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

//   if (!authToken) {
//     return res.status(401).send('Auth token missing');
//   }

async function verifyAuth(authToken: string) {
  try {
    const result = await verify(authToken, {
      expectedRecipient: "my-awesome-app.com", // Must match recipient in sign
      nonceMaxAge: 300000,                     // Token valid for 5 mins from signing
      // expectedMessage: "Login to My Awesome App", // Optional: verify exact message
      // requireFullAccessKey: true, // Default, ensure FAK was used
    });

    console.log('Successfully verified for account:', result.accountId);
    console.log('Message from token:', result.message);
    
    // Authentication successful: create session, grant access, etc.
    // res.send({ status: 'success', accountId: result.accountId });

  } catch (error: any) {
    console.error('Token verification failed:', error.message);
    // res.status(401).send({ status: 'error', message: error.message });
  }
}
// });
```

### 2. Full Backend Integration (Recommended for Production)

This more secure strategy uses backend-generated nonces and states to protect against replay and CSRF attacks.

**Flow:**

1.  Client requests auth parameters (message, nonce, state) from backend.
2.  Backend generates and stores unique nonce & state, sends them to client.
3.  Client uses these parameters with `near-sign-verify`'s `sign` method and their wallet.
4.  Client sends the `authToken` to backend.
5.  Backend verifies `authToken`, including the nonce and state against stored values.

#### Client-Side: Requesting Params & Signing

<Tabs groupId="signer-type-full">
<TabItem value="fastintear" label="Using fastintear">

```typescript
import * as fastIntear from "fastintear";
import { sign } from "near-sign-verify";

async function secureLoginWithFastIntear() {
  try {
    const initiateResponse = await fetch("/api/auth/initiate-login", { method: "POST" });
    const { state, message, nonce, recipient } = await initiateResponse.json();

    // const wallet = await fastIntear.connect(...);
    const authToken = await sign(message, {
      signer: fastIntear, // fastintear global or connected instance
      recipient: recipient,
      nonce: new Uint8Array(nonce), // Ensure nonce is Uint8Array
      state: state,
    });

    const verifyResponse = await fetch("/api/auth/verify-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authToken }),
    });

    if (verifyResponse.ok) console.log("Full backend auth success!", await verifyResponse.json());
    else console.error("Full backend auth failed:", await verifyResponse.json());
  } catch (error) { console.error("Login error:", error); }
}
```

</TabItem>
<TabItem value="wallet-selector" label="Using Wallet Selector">

```typescript
// import { setupWalletSelector, ... } from "@near-wallet-selector/core";
import { sign } from "near-sign-verify";

async function secureLoginWithWalletSelector(wallet: any) { // wallet from selector.wallet()
  try {
    const initiateResponse = await fetch("/api/auth/initiate-login", { method: "POST" });
    const { state, message, nonce, recipient } = await initiateResponse.json();

    if (!wallet) throw new Error("Wallet not selected/available");

    const authToken = await sign(message, {
      signer: wallet, // Wallet object from Wallet Selector
      recipient: recipient,
      nonce: new Uint8Array(nonce), // Ensure nonce is Uint8Array
      state: state,
    });

    const verifyResponse = await fetch("/api/auth/verify-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authToken }),
    });
    
    if (verifyResponse.ok) console.log("Full backend auth success!", await verifyResponse.json());
    else console.error("Full backend auth failed:", await verifyResponse.json());
  } catch (error) { console.error("Login error:", error); }
}
```

</TabItem>
</Tabs>

#### Server-Side: Initiating Login & Verifying Login

The server-side implementation involves two main endpoints: one to provide the nonce/state, and another to verify the token.

```typescript
// Conceptual Server-Side (e.g., Express.js)
import { verify, parseAuthToken } from 'near-sign-verify';
import crypto from 'crypto';
// Use a persistent store like Redis in production for authRequests and usedNonces.
const authRequests = new Map(); // Stores { state -> { nonce, message, recipient, timestamp } }
const usedNonces = new Set<string>(); // Stores hex of used nonces

function toHex(buffer: Uint8Array): string {
  return Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Endpoint to initiate login
// app.post("/api/auth/initiate-login", (req, res) => {
function initiateLoginHandler(req: any, res: any) {
  const state = crypto.randomBytes(16).toString('hex');
  const nonce = crypto.randomBytes(32); // Fresh 32-byte nonce
  const message = "Confirm login to Our Secure Service";
  const recipient = "our-secure-service.com";

  authRequests.set(state, {
    nonce: Array.from(nonce), // Store as array for JSON
    message, recipient, timestamp: Date.now()
  });
  // Set an expiry for this request, e.g., delete from map after 5 mins

  res.json({ state, message, nonce: Array.from(nonce), recipient });
}
// });

// Endpoint to verify the signed token
// app.post("/api/auth/verify-login", async (req, res) => {
async function verifyLoginHandler(req: any, res: any) {
  const { authToken } = req.body;
  let parsedDataFromToken;

  try {
    parsedDataFromToken = parseAuthToken(authToken); // Helper to inspect token
    const { state: receivedState, nonce: receivedNonceBytes } = parsedDataFromToken;

    if (!receivedState) throw new Error("State missing from token.");
    
    const storedAuthRequest = authRequests.get(receivedState);
    if (!storedAuthRequest) throw new Error("Invalid or expired state.");

    // Optional: Check timestamp of storedAuthRequest against expiry

    const result = await verify(authToken, {
      expectedState: storedAuthRequest.state,
      expectedMessage: storedAuthRequest.message,
      // expectedRecipient: storedAuthRequest.recipient, // or use validateRecipient
      validateRecipient: (tokenRecipient) => tokenRecipient === storedAuthRequest.recipient,
      validateNonce: (nonceFromToken: Uint8Array): boolean => {
        const expectedNonce = new Uint8Array(storedAuthRequest.nonce);
        const receivedNonceHex = toHex(nonceFromToken);
        const expectedNonceHex = toHex(expectedNonce);

        if (receivedNonceHex !== expectedNonceHex) {
          console.error("Nonce mismatch.");
          return false;
        }
        if (usedNonces.has(receivedNonceHex)) {
          console.error("Nonce already used (replay attack).");
          return false;
        }
        return true; // Nonce is valid for this state and not replayed
      },
    });

    // If verification is successful:
    const finalNonceHex = toHex(new Uint8Array(parsedDataFromToken.nonce));
    usedNonces.add(finalNonceHex); // Mark nonce as used
    authRequests.delete(receivedState); // Clean up state

    // res.json({ success: true, accountId: result.accountId });
     console.log('Full backend auth success for account:', result.accountId);

  } catch (e: any) {
    console.error("Full backend auth verification failed:", e.message);
    if (parsedDataFromToken?.state && authRequests.has(parsedDataFromToken.state)) {
      authRequests.delete(parsedDataFromToken.state); // Clean up on failure too
    }
    // res.status(401).json({ success: false, error: e.message });
  }
}
// });
```
