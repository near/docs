---

id: web3-auth
title: Web3Auth Social Login Integration
sidebar_label: Web3Auth Integration
---

import {Github} from "@site/src/components/UI/Codetabs"


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

 <Github fname="config.js" language="js"
            url="https://github.com/near-examples/hello-web3auth/blob/main/modal/src/config.js"
            start="1" end="36" />

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

<Github fname="App.jsx" language="js"
            url="https://github.com/near-examples/hello-web3auth/blob/main/modal/src/App.jsx"
            start="8" end="36" />

The `Web3AuthProvider` wraps your application and provides authentication state.

#### 2. NEAR Context Provider (`src/context/provider.jsx`)

This custom provider bridges Web3Auth and NEAR:

<Github fname="provider.jsx" language="js"
            url="https://github.com/near-examples/hello-web3auth/blob/main/modal/src/context/provider.jsx"
            start="1" end="71" />


#### 3. Using the Context (`src/components/navigation.jsx`)

Components can access both Web3Auth and NEAR state:

<Github fname="navigation.jsx" language="js"
            url="https://github.com/near-examples/hello-web3auth/blob/main/modal/src/components/navigation.jsx"
            start="1" end="46" />

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
<Github fname="hello_near.jsx" language="js"
            url="https://github.com/near-examples/hello-web3auth/blob/main/modal/src/pages/hello_near.jsx"
            start="1" end="53" />

---