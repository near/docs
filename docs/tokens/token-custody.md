---
id: token-custody
title: Token Custody Options
sidebar_label: Token Custody
---
There are several options available to manage your NEAR and NEAR-based assets. This list is regularly updated as more products and providers offer NEAR support.

## Mobile Wallets

- ### Trust Wallet

  - [Trust Wallet](https://trustwallet.com/) is a very popular, non-custodial, wallet available on iOS and Android.
  
  ***Setup Trust wallet and generate public key***
  
  - Install Trust Wallet on your phone from App Store or Play Store
  - Create a new wallet (or use existing if you already have one setup)
  - Make sure to back up your recovery seed phase as you would usually do.
  - In "Settings" in upper right corner, toggle NEAR.
  - In the main wallet view, click on "NEAR" and then "Receive".
  - You will see QR code and address in the form `NEAR2F4vDeD9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud` - this is public key you can use to claim your tokens.

## CLI (Recommended for developers and validators)

  - ### Ledger via CLI 
      - For users with advanced security requirements and the need for flexibility (developers and validators), we highly recommend using our command line interface [(NEAR-CLI)](https://docs.near.org/docs/development/near-cli) with a Ledger hardware device.
      - This [community-authored guide](https://medium.com/@bonsfi/how-to-use-ledger-with-near-cli-648d5d990517) walks through several common commands
      
      **Installing the NEAR Ledger App**
      - You can install the NEAR Ledger app using [Ledger Live](https://www.ledger.com/ledger-live) by:
        1) Open Ledger Live and install any available firmware updates
        2) Go to `Settings`
        3) Under `Experimental Features` ensure `Developer Mode` is switched on
        4) Return to the `Manager` tab and search for NEAR
        5) Follow instructions to install the NEAR app on your device
        
      **To generate public keys**
      - Install `near-cli` via `sudo npm install -g near-cli` (or similar command on Windows, make sure [you have npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)).
      - Use `near generate-key key --useLedgerKey` command that will output a *public key* that can be used to claim your NEAR tokens. *Note: in the case of generating key using Ledger device, the 2nd argument is ignored*.
      - If you want to generate more keys, you can use provide an HD path to `--useLedgerKey` flag, e.g. `--useLedgerKey="44'/397'/0'/0'/2'"` or `--useLedgerKey=44'/397'/0'/0'/11'`.
      - The result you will see output in the console in the format `Using public key: ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud`. This is the public key you can use to claiming your NEAR tokens.

  - ### Self custody
      - For professionals who have their own setup, you can self custody on an offline device or any other custom method (CloudHSM, etc).
      - Generally, any software that can produce valid `ed25519` key pair can be used to generate the keys.
      - For NEAR consumption they should be encoded in base58 encoding.
      - For example, if you have offline device - you can install [near-cli](https://github.com/near/near-cli) via `sudo npm install -g near-cli` and generate keys in the next way:

    ```bash
    export NEAR_ENV=mainnet
    near generate-key some-account-name
    ```

      - It will output the public key in the format `Using public key: ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud` you can use for claiming your NEAR tokens.
      - The private key is stored in the plain-text format in `~/.near-credentials/mainnet/some-account-name.json`

## Custodians (Recommended for institutional users)
  - ### Finoa
    - [Finoa](https://finoa.io/) is the first qualified custodian to offer NEAR asset custody
    - Check with [Finoa](https://finoa.io/contact) to see if you are eligible

## Web Wallets

- ### NEAR Wallet

  - The [NEAR Web Wallet](http://wallet.near.org) provides a way to interact with NEAR network from web without needing to install a wallet.
  - Currently NEAR Wallet doesn't allow to create just a public key. 
  - Instead if you have an allocation of NEAR tokens, ask your facilitator (CoinList or the NEAR Foundation) to send you a NEAR Drop and follow [this guide](https://docs.google.com/document/d/13b3K_9f0YZudFrEAmagM4RcesK3DFxPBE5DswJ37Das). 
  - NEAR Wallet also supports Ledger hardware devices for improved security.
