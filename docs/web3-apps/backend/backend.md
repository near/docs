---
id: backend-login
title: Authenticate NEAR Users 
---

import {Github} from "@site/src/components/codetabs"

Recently NEAR has approved a new standard that, among other things, enables users to authenticate into a backend service.

The basic idea is that the user will sign a challenge with their NEAR wallet, and the backend will verify the signature. If the signature is valid, then the user is authenticated.

---

## Backend Auth with a NEAR Wallet
Authenticating users is a common use-case for backends and web applications. This enables services to provide a personalized experience to users, and to protect sensitive data.

To authenticate a user, the backend must verify that the user is who they say they are. To do so, the backend must verify that the user has access to a full-access key that is associated with their account.

For this three basic steps are needed:

1. Create a challenge for the user to sign.
2. Ask the user to sign the challenge with the wallet.
3. Verify the signature corresponds to the user.

### 1.  Create a Challenge
Assume we want to login the user into our application named `application-name`.

We first need to create a challenge that the user will sign with their wallet. For this, it is recommended to use a cryptographically secure random number generator to create the challenge.

```js
import { randomBytes } from 'crypto'
const challenge = randomBytes(32)
const message = 'Login with NEAR'
```

:::note
Here we use [crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) to generate a 32 byte random buffer.
:::

### 2. Ask the User to Sign the Challenge
The `signMessage` method needed to sign the challenge is supported by these wallets:
- Meteor Wallet
- Here Wallet
- Near Snap
- Nightly Wallet
- WELLDONE Wallet
- NearMobileWallet
- MyNearWallet
- Sender


The message that the user needs to sign contains 4 fields:
- Message: The message that the user is signing.
- Recipient: The recipient of the message.
- Nonce: The challenge that the user is signing.
- Callback URL: The URL that the wallet will call with the signature.

```js
// Assuming you setup a wallet selector so far
const signature = wallet.signMessage({ message, recipient, nonce: challenge, callbackUrl: <server-auth-url> })
```

### 3. Verify the Signature
Once the user has signed the challenge, the wallet will call the `callbackUrl` with the signature. The backend can then verify the signature.

<Github fname="authenticate.js" language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/verify-signature/authentication.js" />
