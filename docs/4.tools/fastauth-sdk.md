---
id: fastauth-sdk
title: FastAuth SDK
sidebar_label: FastAuth SDK
---

## Introduction

FastAuth is a key management system that allows dApp developers to offer an easy and familiar onboarding flow to new users. Users can sign up for an account using just their email address, and they can easily recover access to that account using the same email they used during sign up. Furthermore, dApp developers can also choose to subsidize gas for a certain smart contract, so that users can start interacting with their dApp immediately, without having to fund their account. 

### System components

The FastAuth system is comprised of 3 main components:

- **FastAuth Signer App**: An app that can be embedded on your website to allow FastAuth users to sign transactions.
- **MPC Recovery Service**: service used to create and restore user accounts, as well as signing transactions on behalf of the user. This service uses the OIDC protocol and leverages multiple MPC nodes, each of them containing a secret key. Each action must be signed by all nodes, and those signatures are then combined into a single signature on the leader node.
- **Transaction Relayer**: an http server that relays transactions to the network via RPC on behalf of new users who haven't yet acquired NEAR as part of the onboarding process.

## Getting started

### Setting up Firebase

#### Create a project

- Go to [Firebase](https://firebase.com)
- Create or sign in to an account
- Go to "Get started", then "Add project"
- Call this project `my-fastauth-issuer`
- Disable Google Analytics (recommended)
- Click on "Create project"

#### Set up passwordless authentication

- Go to "Authentication", then "Get started", and "Add new provider"
- Enable "Email/Password" and "Email link (passwordless sign-in)"
- Hit "Save"

#### Add user device information to Firestore

- Return to "Project Overview"
- Go to "Cloud Firestore", then "Create database"
- Select "Start in production mode", then "Next"
- Select your preferred location, then "Enable"
- Go to the "Rules" tab
- Change the rules to the following:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
  	match /users/{userId}/{document=**} {
      allow create, read, update, delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

- Hit "Publish"
- Go to the "Data" tab
- Click on "Start collection"
- Set the Collection ID to `users` and hit "Next"
- Add a Document ID of `root` and press "Save"

#### Get the application credentials

- Press the gear button next to "Project Overview", and go to "Project settings"
- Under "Your apps", click on the `</>` button
- Set the app nickname as `issuer-gcp` and hit "Register app"
- You should see the code needed for initilization and authentication of Firestore, such as:
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "my-fastauth-issuer-123.firebaseapp.com",
  projectId: "my-fastauth-issuer-123",
  storageBucket: "my-fastauth-issuer-123.appspot.com",
  messagingSenderId: "12345678910",
  appId: "1:12345678910:web:12345678910"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

### Setting up your relayer

#### Setting up a NEAR account

First ensure that `cargo` is installed on your local machine. Try [rustup](https://rustup.rs/) if you haven't already installed it.

```bash
cargo install near-cli-rs
NEAR_ENV=mainnet
near account create-account fund-later use-auto-generation save-to-folder ~/.near-credentials/implicit
```

This should output something like:

```bash
The file "~/.near-credentials/implicit/275f14eecb0afcb1f46f2b71b7933afd2de6d4ae8b08e9b11fc538a5a81406b7.json" was saved successfully
```

In this example. `275f14eecb0afcb1f46f2b71b7933afd2de6d4ae8b08e9b11fc538a5a81406b7` is your funded account. We'll refer to this as `$FUNDED_ACCOUNT` from now on.

Send some NEAR to this address.

#### Adding multiple keys (Recommended)

This account has been created with one key. However, due to [this](https://near.zulipchat.com/#narrow/stream/295302-general/topic/.E2.9C.94.20The.20trouble.20with.20nonces/near/389649443), you should create an account with `N` keys where `N` is the number of requests you expect to get in a second, at peak load.

To generate an additional key, run the following command:

```bash
near account add-key $FUNDED_ACCOUNT grant-full-access autogenerate-new-keypair save-to-keychain network-config mainnet sign-with-access-key-file ~/.near-credentials/implicit/$FUNDED_ACCOUNT.json send
```


#### Deploying the relayer

Run the following command:

```bash
git clone https://github.com/near/pagoda-relayer-rs
```

Go to `config.toml` and change:

```toml
network = "mainnet"
num_keys = 3  # correlates to the number of keys in `keys_filenames`. Will be optional in the future.
relayer_account_id = "$FUNDED_ACCOUNT"
keys_filenames = [
    # The original account
    "~/.near-credentials/mainnet/$FUNDED_ACCOUNT.json",

    # Other keys you've optionally created. This will allow rotating through each key as to avoid nonce races.
    "~/.near-credentials/mainnet/$FUNDED_ACCOUNT/ed25519_4ryLkp4AuzBD8yuyRJKb91hvHZ4zgqouWcJzu1gNEvLv.json",
    "~/.near-credentials/mainnet/$FUNDED_ACCOUNT/ed25519_7K3jF8Ft5dKFEPYRH1T4mncvsZGgSoGKsvsnnKEmqubT.json"
]
```

Optionally, if you need to generate additional access keys for the `$FUNDED_ACCOUNT`, run the following command N times. Note that this will create keys for implicit accounts, but we'll then tie them to `$FUNDED_ACCOUNT`.

```bash
near generate-key
near add-key $FUNDED_ACCOUNT exampleImplicitPublicKeyCxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

Then run:

```bash
docker compose up
```

You should do this on a VM server of your choice. We will refer to the URL of this VM as `$RELAYER_URL` from now on.

### Setting up the frontend

#### Deploying the signer app

- Go to GCP's Cloud Run console and press "Create Service".
- In the field "Container image URL", paste `gcr.io/fa-signer/signer-app:version2`.
- Go to the "Container, Networking, Security" fold out and then "Environment Variables"
- Click on "Add Variable"
- Set the following environment variables from the `firebaseConfig` you generated earlier.

```yaml
NETWORK_ID:                           'mainnet',
RELAYER_URL:                          '$RELAYER_URL',
FIREBASE_API_KEY:                     'apikey',
FIREBASE_AUTH_DOMAIN:                 'my-fastauth-issuer-123.firebaseapp.com',
FIREBASE_PROJECT_ID:                  'my-fastauth-issuer-123',
FIREBASE_STORAGE_BUCKET:              'my-fastauth-issuer-123.appspot.com',
FIREBASE_MESSAGING_SENDER_ID:         '12345678910',
FIREBASE_APP_ID:                      '1:12345678910:web:12345678910',
```

Alternatively if you're doing a `testnet` deployment, do:

```yaml
NETWORK_ID:                           'testnet',
RELAYER_URL_TESTNET:                  '$RELAYER_URL',
FIREBASE_API_KEY_TESTNET:             'apikey',
FIREBASE_AUTH_DOMAIN_TESTNET:         'my-fastauth-issuer-123.firebaseapp.com',
FIREBASE_PROJECT_ID_TESTNET:          'my-fastauth-issuer-123',
FIREBASE_STORAGE_BUCKET_TESTNET:      'my-fastauth-issuer-123.appspot.com',
FIREBASE_MESSAGING_SENDER_ID_TESTNET: '12345678910',
FIREBASE_APP_ID_TESTNET:              '1:12345678910:web:12345678910',
```

- Click on "Create Application"
- Then, inside your app's control panel copy the app's URL, such as `https://signer-app-123456-ab.a.run.app`. We will refer to the deploy URL as `$WALLET_URL`.

#### Authorizing a domain on Firebase

- Go back to the Firebase Console
- Go to "Authentication" in the sidebar, and then the "Settings" tab
- Click on the "Authorized domains" menu item
- Add `$WALLET_URL` to the list

#### Deploying your application frontend

First, install the `@near-js/iframe-rpc` package from the NPM registry.

```js
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import { setupWalletSelector } from '@near-wallet-selector/core';

// Initialize wallet selector
const selector = setupWalletSelector({
          network: networkId,
          modules: [
            setupFastAuthWallet({
              relayerUrl: "$RELAYER_URL",
              walletUrl: "$WALLET_URL"
            })
          ]
      })

// EITHER setup onClick function for login
const onCLick = () => selector.then((selector: any) => selector.wallet('fast-auth-wallet'))
      .then((fastAuthWallet: any) =>
        fastAuthWallet.signIn({
          contractId: "$CONTRACT_ID",
          email: "<USERS_EMAIL_ADDRESS>",
          isRecovery: true,
        }),);

// OR setup onClick function for login
const onCLick = () => selector.then((selector: any) => selector.wallet('fast-auth-wallet'))
      .then((fastAuthWallet: any) =>
        fastAuthWallet.signIn({
          contractId: "$CONTRACT_ID",
          email: "<USERS_EMAIL_ADDRESS>",
          accountId: "<USERS_DESIRED_NEAR_ADDRESS>.near"
          isRecovery: false,
        }),);
```

Wehenever the user tries to login, call `onClick`.

### Getting added to the MPC recovery service

As a last step, we'll need to add your app to our MPC recovery service.
To get added, please send us your `$FIREBASE_PROJECT_ID`, `$RELAYER_API_KEY` and `$RELAYER_URL` through this [form](https://forms.gle/cDfXj2D5bm9sohBx6).
