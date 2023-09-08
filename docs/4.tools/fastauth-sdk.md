# FastAuth SDK

## Introduction
FastAuth is a key management system that allows dApp developers to offer an easy and familiar onboarding flow to new users. Users can sign up for an account using just their email address, and they can easily recover access to that account using the same email they used during sign up. Furthermore, dApp developers can also choose to subsidize gas for a certain smart contract, so that users can start interacting with their dApp immediately, without having to fund their account. 

### System components
The FastAuth system is comprised of 3 main components:

- **FastAuth Signer App**: An app that can be embedded on your website to allow FastAuth users to sign transactions.
- **MPC Recovery Service**: service used to create and restore user accounts, as well as signing transactions on behalf of the user. This service uses the OIDC protocol and leverages multiple MPC nodes, each of them containing a secret key. Each action must be signed by all nodes, and those signatures are then combined into a single signature on the leader node.
- **Transaction Relayer**: an http server that relays transactions to the network via RPC on behalf of new users who haven't yet acquired NEAR as part of the onboarding process.

## Getting started

:::info 
This is a preview of the SDK Documentation for FastAuth. The FastAuth SDK Beta will be available in late September, 2023.
:::

### Gaining access to the Beta
FastAuth is currently on a closed early-access Beta. You can apply to be part of the Beta through [this form](https://forms.gle/pyuW3fXPZwPffYju6). Once approved, you can continue following this guide.

During the Beta, user accounts created via FastAuth will be constrained to your own dApp, and won't be interoperable with other domains. In a future FastAuth release, you'll be given the option to make your user accounts interoperable across the ecosystem.

### Setting up Firebase
During the Beta period, you'll need to set up a Firebase instance to be able to use [Firebase Authentication](https://firebase.google.com/docs/auth/web/email-link-auth) to validate the user's email. 

To do that, you should use the following configuration (coming soon). Once the instance is up and running, take note of its Firebase Project ID.

### Setting up the transaction relayer
In order to be able to pay for gas on behalf of the users, and get them started immediately without having to fund their new accounts, you'll need to set up a transaction relayer.  

:::info 
If you’d rather not run your own relayer, let us know during the Beta onboarding process so we can discuss other options.
:::

You can find the relayer repository and set up instructions on Github (coming soon). Once your relayer is up and running, set up a domain for it and generate a UUID V4 key to be used as your API key. 

Before you start onboarding users via FastAuth, you'll also need to top up the relayer's NEAR account with $NEAR that will be used to pay for gas.

### Configure your smart contract
You'll now need to configure the relayer domain on the smart contract you want to call, as well as allow account creation transactions from `account_creator.near`. You can see an example of this here (coming soon).

### Activate access to the MPC Recovery Service
In order for your users to be able to sign up, recover their accounts, and sign transactions, we'll need to whitelist you in the MPC Recovery Service.

Once you complete the steps above, submit an activation request (coming soon) and include: Firebase Project ID, Relayer URL, and Relayer API Key. You'll receive an email when your activation is complete.

#### Acceptable use policy
In order to use the MPC Recovery Service, you'll need to comply with our Acceptable Use Policy (coming soon). Your traffic and access may be limited or revoked in case of suspected abuse. 

### Deploying the signer app
The FastAuth signer app will be embedded on your application and is used for users to confirm and sign transactions. You can set up your instance of the signing app by deploying this Docker image (coming soon) to Google Cloud. You can learn more about this process in [this guide](https://cloud.google.com/run/docs/quickstarts/deploy-container). Take note of the signer app URL.

You'll also need to add your Firebase Project ID as the environment variable `firebaseProjectID`. You can do so by following [these steps](https://cloud.google.com/run/docs/configuring/services/environment-variables).

### Integrating your frontend
As a last step, you'll need to install and instantiate the FastAuth npm module:

```bash
npm install --save @pagoda/fastauth
```

And then, on your app:

```js
import { FastAuth } from "@pagoda/fastauth";

FastAuth.setupFastAuth(signer_url) // replace 'signer_url' with the URL of your signer app instance
```
