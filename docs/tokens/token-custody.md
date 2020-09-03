---
id: token-custody
title: Token Custody Options
sidebar_label: Token Custody
---
There are several options available to manage your NEAR and NEAR-based assets. 

As with all blockchains, to claim or receive tokens you will need to generate a keypair which stores your crypto. You can do this directly by using a hardware wallet and the command line or indirectly by using a commercially available web or mobile wallet.  All of these options are described below.

1. Mobile Wallets
2. Custodians
3. Web Wallets

This list will be regularly updated as more products and providers offer NEAR support.


## Mobile Wallets

### Option 1: Trust Wallet

  - [Trust Wallet](https://trustwallet.com/) is a very popular, non-custodial, wallet available on iOS and Android.
  
  ***Setup Trust wallet and generate public key***
  
1. Install Trust Wallet on your phone from App Store or Play Store
2. Create a new wallet (or use existing if you already have one setup)
3. Make sure to back up your recovery seed phase as you would usually do.
4. In "Settings" in upper right corner, toggle NEAR.
5. In the main wallet view, click on "NEAR" and then "Receive".
6. You will see QR code and address in the form `NEAR2F4vDeD9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud` - this is public key you can use to claim your tokens.


### Option 2: TBD

(more added soon!)


## CLI (Recommended for developers and validators)

### Option 1: Ledger via CLI 

For users with advanced security requirements and the need for flexibility (developers and validators), we highly recommend using our command line interface [(NEAR-CLI)](https://docs.near.org/docs/development/near-cli) with a Ledger hardware device.

This [community-authored guide](https://medium.com/@bonsfi/how-to-use-ledger-with-near-cli-648d5d990517) walks through several common commands.


**Installing the NEAR Ledger App**

You can install the NEAR Ledger app using [Ledger Live](https://www.ledger.com/ledger-live) by:

1) Open Ledger Live and install any available firmware updates
2) Go to `Settings`
3) Under `Experimental Features` ensure `Developer Mode` is switched on
4) Return to the `Manager` tab and search for NEAR
5) Follow instructions to install the NEAR app on your device

**Updating the NEAR Ledger App**

You will need to have the latest Ledger device firmware installed (which can be done in Ledger Live's "Manager" tab) and the latest NEAR app.  If you previously installed the NEAR app, it may need to be updated. 

Currently, while the NEAR app is in Development Mode (while Ledger finishes reviewing it), this update may only be possible by uninstalling and reinstalling the app from the "Apps Installed" section of the "Manager" tab.
        
**To generate public keys**

1. Make sure [you have npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
1. Install `near-cli` via `sudo npm install -g near-cli` (or similar command on Windows).
2. Use the `near generate-key key --useLedgerKey` command to generate the key for your Ledger device. It will output a *public key* that can be used to claim your NEAR tokens. Note 1: in the case of generating a key using the Ledger device, the 2nd argument is ignored and can thus be anything.  Note 2: This command will output the **same key** no matter how many times it is run.  
3. If you want to generate more keys, you will need to provide an [HD path](https://ethereum.stackexchange.com/questions/70017/can-someone-explain-the-meaning-of-derivation-path-in-wallet-in-plain-english-s) as a value to the `--useLedgerKey` flag.  Each change in the last number will produce a new key and you can use any number, as the following examples show: 

        # Example 1: 
        near generate-key key --useLedgerKey="44'/397'/0'/0'/2'"
        
        # Example 2: 
        near generate-key key --useLedgerKey="44'/397'/0'/0'/11'"
        
4. After confirming the key on your Ledger device (which should be opened to the NEAR app), the result you will see output in the console is in the format:

        Using public key: ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud
    
    ...which is the public key you can use to claiming your NEAR tokens.  Note: the key includes the `ed25519:` portion, so the full key is `ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud` in this example.


### Option 2: Self custody

For professionals who have their own setup, you can self custody on an offline device or any other custom method (CloudHSM, etc).

Generally, any software that can produce valid `ed25519` key pair can be used to generate the keys. For NEAR consumption they should be encoded in base58 encoding.

For example, if you have offline device - you can install [near-cli](https://github.com/near/near-cli) via `sudo npm install -g near-cli` and generate keys in the following way:

```bash
export NEAR_ENV=mainnet
near generate-key some-account-name
```

It will output the public key in the format `Using public key: ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud`, which is the public key which you can then use for claiming your NEAR tokens (it includes the `ed25519:` portion, so the full key is `ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud` in this example).

The private key is stored in the plain-text format in `~/.near-credentials/mainnet/some-account-name.json`


## Custodians (Recommended for institutional users)

### Option 1: Finoa
*Status: Currently available*

[Finoa](https://finoa.io/) is the first qualified custodian to offer NEAR asset custody.  Check with [Finoa](https://finoa.io/contact) to see if you are eligible and [their NEAR guide](https://www.finoa.io/near) for more information about their offering.
    
### Option 2: Coinbase
*Status: Implementation Phase, no estimated date*


### Option 3: TBD

(more added soon!)


## Web Wallets

### Option 1: NEAR Wallet

The [NEAR Web Wallet](http://wallet.near.org) provides a way to interact with NEAR network from web without needing to install a wallet.

Currently, the NEAR Wallet doesn't allow you to create just a public key. Instead, if you have an allocation of NEAR tokens, ask your facilitator (eg CoinList or the NEAR Foundation) to send you a NEAR Drop and follow [this guide](https://docs.google.com/document/d/13b3K_9f0YZudFrEAmagM4RcesK3DFxPBE5DswJ37Das). 

NEAR Wallet also supports Ledger hardware devices for improved security. *Note: currently NEAR Wallet only supports single HD path on Ledger, meaning that all accounts will use the same public key.*
