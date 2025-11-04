---

id: web3-auth
title: Web3Auth Social Login Integration
sidebar_label: Web3Auth Integration
---

# Integrating Web3Auth with NEAR

This tutorial demonstrates how to integrate [Web3Auth](https://web3auth.io/) into a NEAR application, enabling users to log in with social accounts (Google, Facebook, Twitter, etc.) while maintaining full blockchain functionality.

:::tip What is Web3Auth?

Web3Auth is a pluggable authentication infrastructure that allows users to authenticate using familiar Web2 logins (OAuth providers like Google, Facebook, etc.) while generating a cryptographic key pair for Web3 interactions. This provides a seamless onboarding experience without requiring users to manage seed phrases or private keys directly.

:::

## Clone and Install

Start by cloning the repository and installing dependencies:

```bash
git clone https://github.com/near-examples/hello-web3auth.git
cd hello-web3auth/modal
yarn install
```

---


## Get Web3Auth Credentials

To enable social login, you need to create a Web3Auth project and obtain a Client ID.

### Create a Web3Auth Account

1. Go to [Web3Auth Dashboard](https://dashboard.web3auth.io/)
2. Sign up or log in with your preferred method
3. You'll be redirected to the dashboard

### Create a New Project

1. Click on **"Add new project"**
2. Fill in the project details:
   - **Project Name**: Choose a descriptive name (e.g., "NEAR Social Login")
   - **Environment**: Select **"Sapphire Devnet"** for development
   - **Chain Namespace**: Choose **"Other"** (since NEAR is not natively supported)
3. Click **"Create"**

### Configure Your Project

1. Once created, click on your project to open its settings.In this section you can find Client ID and Client Secret which will be used in the application configuration.
2. Change the **Select Product** to **MPC Core Kit**
3. Change **Project platform** to **Web Application**
4. Go to the **"Domains"** tab
5. Add your application's URLs:
   - **Whitelist URLs**: Add `http://localhost:5173` for local development
   - For production, add your deployed URL (e.g., `https://yourdomain.com`)

---

## Configure Google OAuth (Optional but Recommended)

While Web3Auth provides default OAuth providers, setting up your own Google OAuth gives you more control and branding.

### Create a Google Cloud Project

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Click Select a project → New Project (or choose an existing project).
3. Enter a project name (for example, NEAR Web3Auth) and click Create.
4. In the left sidebar, go to **APIs & Services** → **OAuth consent screen** ([direct link](https://console.cloud.google.com/auth/overview/create)).


### Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** (unless you have a Google Workspace)
3. Fill in the required information:
   - **App name**: Your application name
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Click **"Save and Continue"**
5. On the **Scopes** page, click **"Save and Continue"** (default scopes are fine)
6. On the **Test users** page, add your email for testing
7. Click **"Save and Continue"**

### Create OAuth Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** → **"OAuth client ID"** ([direct link](https://console.cloud.google.com/auth/clients/create))
3. Select **"Web application"**
4. Configure:
   - **Name**: Choose a descriptive name
   - **Authorized JavaScript origins**:
     - Add `http://localhost:5173` (for development)
     - Add your production domain (when ready)
   - **Authorized redirect URIs**:
     - Add `https://auth.web3auth.io/auth`
     - This is Web3Auth's callback URL
5. Click **"Create"**
6. Copy the **Client ID** and **Client Secret**

### Add Google Credentials to Web3Auth

1. Return to [Web3Auth Dashboard](https://dashboard.web3auth.io/)
2. Go to the **Authentication** in left sidebar
3. Click on **Google** in social Logins
4. Click on **Add connection** and fill in the following details:
   - **Auth Connection ID***: Your desired connection ID (e.g., `near-login`),This use for verifier value in application configuration.
   - **Enter Google Client ID***: Your Google OAuth Client Secret from previous step.(e.g., `17426988624-32m2gh1o1n5qve6govq04ue91sioruk7WWapps.googleusercontent.com`)

---

## Configure Your Application

Now that you have your Web3Auth Client ID, update your application configuration.

### Update the Config File

Open `src/config.js` and replace the `clientId` with your own:

```javascript
// Web3Auth Config
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base'
import { CommonPrivateKeyProvider } from '@web3auth/base-provider'

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.OTHER,
  chainId: 'near:testnet',
  rpcTarget: 'https://rpc.testnet.near.org',
  displayName: 'NEAR Testnet',
  blockExplorerUrl: 'https://nearblocks.io',
  ticker: 'NEAR',
  tickerName: 'NEAR',
}

const privateKeyProvider = new CommonPrivateKeyProvider({
  config: { chainConfig }
})

export const web3AuthContextConfig = {
  web3AuthOptions: {
    clientId: 'YOUR_WEB3AUTH_CLIENT_ID_HERE', // Replace with your Client ID
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    chainConfig,
    privateKeyProvider,
  }
}

// NEAR Config
const contractPerNetwork = {
  mainnet: 'hello.near-examples.near',
  testnet: 'hello.near-examples.testnet',
}

export const NetworkId = 'testnet'
export const providerUrl = 'https://test.rpc.fastnear.com'
export const HelloNearContract = contractPerNetwork[NetworkId]
```

---

## Run the Application

Start the development server:

```bash
yarn run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Testing the Integration

1. Click the **"Login"** button in the navigation bar
2. The Web3Auth modal will appear with various login options
3. Choose **"Continue with Google"** (or another provider)
4. Complete the authentication flow
5. Once logged in, you'll see:
   - Your derived NEAR account ID in the navigation
   - Your NEAR balance
   - A logout button with your email/name

---

## Understanding the Implementation

### Architecture Overview

This integration uses two main components:

1. **Web3Auth Modal** (`@web3auth/modal-react-hooks`): Provides the UI and authentication flow
2. **NEAR Integration** (custom provider): Derives NEAR keys from Web3Auth and manages blockchain interactions

### Key Components

#### 1. Web3Auth Provider (`App.jsx`)

```jsx
import { Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { web3AuthContextConfig } from './config';

function App() {
  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <NEARxWeb3Auth>
        {/* Your app components */}
      </NEARxWeb3Auth>
    </Web3AuthProvider>
  )
}
```

The `Web3AuthProvider` wraps your application and provides authentication state.

#### 2. NEAR Context Provider (`src/context/provider.jsx`)

This custom provider bridges Web3Auth and NEAR:

```jsx
// near api js
import { JsonRpcProvider } from '@near-js/providers'
import { Account } from '@near-js/accounts'

// utils
import { base58 } from '@scure/base'

// config
import { useEffect } from 'react'
import { useState } from 'react'
import { NearContext } from './useNear'
import { providerUrl } from '../config'
import { useWeb3Auth } from '@web3auth/modal-react-hooks'
import { KeyPair } from '@near-js/crypto'
import { KeyPairSigner } from '@near-js/signers'
import { getED25519Key } from '@web3auth/base-provider'

// Provider
const provider = new JsonRpcProvider({ url: providerUrl })

// eslint-disable-next-line react/prop-types
export function NEARxWeb3Auth({ children }) {
  const [walletId, setWalletId] = useState(null)
  const [nearAccount, setNearAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Get Web3Auth Modal state - this provides the authenticated session
  const { isConnected, authenticateUser, userInfo, provider: web3authProvider } = useWeb3Auth()

  // Sync MPC Core Kit with Web3Auth Modal authentication
  useEffect(() => {
    const syncAuth = async () => {
      if (!isConnected) {
        setWalletId(null)
        setNearAccount(null)
        setLoading(false)
        return
      }

      if (!web3authProvider) return;

      const privateKey = await web3authProvider.request({ method: 'private_key' })
      const privateKeyEd25519 = getED25519Key(privateKey).sk // Already a Uint8Array

      // Create keypair and derive account ID from public key
      const keyPair = KeyPair.fromString(`ed25519:${base58.encode(privateKeyEd25519)}`);
      const signer = new KeyPairSigner(keyPair);
      const accountId = Array.from(keyPair.getPublicKey().data).map(b => b.toString(16).padStart(2, '0')).join('')
      const account = new Account(accountId, provider, signer);
      
      setWalletId(account.accountId)
      setNearAccount(account)
      setLoading(false)
    }

    syncAuth()
  }, [isConnected, authenticateUser, userInfo, web3authProvider])

  return (
    <NearContext.Provider
      value={{
        provider,
        nearAccount,
        walletId,
        loading,
      }}
    >
      {children}
    </NearContext.Provider>
  )
}
```

#### 3. Using the Context (`src/components/navigation.jsx`)

Components can access both Web3Auth and NEAR state:

```jsx
import { useEffect, useState } from 'react'

import NearLogo from '@/assets/near-logo.svg'
import { Link } from 'react-router'
import styles from '@/styles/app.module.css'

import { useNEARxWeb3Auth } from '../context/useNear'
import { useWeb3Auth } from '@web3auth/modal-react-hooks'
import { NEAR } from '@near-js/tokens'

export const Navigation = () => {
  const [action, setAction] = useState(() => {})
  const [label, setLabel] = useState('Loading...')
  const [balance, setBalance] = useState(0)
  
  // Web3Auth Modal for easy login UI
  const { connect, logout, isConnected, userInfo } = useWeb3Auth()
  
  // MPC Core Kit for NEAR transaction signing
  const { walletId, nearAccount, loading } = useNEARxWeb3Auth()

  useEffect(() => {
    if (loading) {
      setLabel('Loading...')
      return
    }

    if (isConnected) {
      const userId = userInfo?.email || userInfo?.name || 'User'
      setAction(() => logout)
      setLabel(`Logout ${userId}`)
    } else {
      setAction(() => connect)
      setLabel('Login')
      setBalance(null)
    }
  }, [isConnected, walletId, loading, userInfo, logout, connect])

  useEffect(() => {
    if (walletId && nearAccount) {
      nearAccount
        .getBalance()
        .then((b) => setBalance(Number(NEAR.toDecimal(b)).toFixed(2)))
        .catch(() => setBalance(0))
    }
  }, [walletId, nearAccount])
}
```

### How It Works

1. **User Authentication**: User logs in via Web3Auth (Google, etc.)
2. **Key Derivation**: Web3Auth generates a private key based on the user's social login
3. **NEAR Key Conversion**: The private key is converted to NEAR's ED25519 format
4. **Account ID Generation**: A deterministic account ID is derived from the public key
5. **Blockchain Interaction**: The NEAR account instance can now sign transactions

:::warning NEAR Provider Implementation

After a user logs in, they receive a provider from the Embedded Wallets SDK. However, there is no native provider for NEAR, so we use the private key to make RPC calls directly. This is why we extract the private key from Web3Auth's provider and create a custom NEAR account instance using `@near-js/accounts` and `@near-js/providers`.

:::

---

## Interacting with Smart Contracts

Once authenticated, you can interact with NEAR smart contracts. Here's an example from `src/pages/hello_near.jsx`:

```jsx
import { useEffect, useState } from 'react'

import { Cards } from '@/components/cards'
import styles from '@/styles/app.module.css'

import { HelloNearContract } from '@/config'
import { useNEARxWeb3Auth } from '../context/useNear'
import { useCallback } from 'react'

// Contract that the app will interact with
const CONTRACT = HelloNearContract

export default function HelloNear() {
  const [greeting, setGreeting] = useState('loading...')
  const [newGreeting, setNewGreeting] = useState('loading...')
  const [loggedIn, setLoggedIn] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  const { provider, nearAccount, walletId } = useNEARxWeb3Auth()

  const fetchGreeting = useCallback(async () => {
    const greeting = await provider.callFunction(CONTRACT, 'get_greeting', {})
    setGreeting(greeting)
  }, [provider])

  const saveGreeting = async () => {
    nearAccount
      .callFunction({
        contractId: CONTRACT,
        methodName: 'set_greeting',
        args: { greeting: newGreeting },
      })
      .catch((e) => {
        alert(
          `Error, did you deposit any NEAR Ⓝ? You can get some at https://dev.near.org/faucet`
        )
        console.log(`Error saving greeting: ${e.message}`)
        fetchGreeting()
      })

    setShowSpinner(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setGreeting(newGreeting)
    setShowSpinner(false)
  }

  useEffect(() => {
    setLoggedIn(!!walletId)
  }, [walletId])

  useEffect(() => {
    fetchGreeting()
  }, [fetchGreeting])
}
```

---