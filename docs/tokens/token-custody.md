---
id: token-custody
title: Token Custody Options
sidebar_label: Token Custody
---
There are several options available to manage your NEAR and NEAR-based assets. This list is regularly updated as more products and providers offer NEAR support.

## Web Wallets

- ### NEAR Wallet

  - The [NEAR Web Wallet](http://wallet.near.org) is the easiest way to get started on NEAR. If you have an allocation of NEAR tokens, ask your facilitator (CoinList or the NEAR Foundation) to send you a NEAR Drop and follow [this guide](https://docs.google.com/document/d/13b3K_9f0YZudFrEAmagM4RcesK3DFxPBE5DswJ37Das). 
  - NEAR Wallet also supports Ledger hardware devices for improved security.

## Mobile Wallets

- ### Trust Wallet

  - [Trust Wallet](https://trustwallet.com/) is a very popular, non-custodial, wallet available on iOS and Android.

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

  - ### Self custody
      - For professionals who have their own setup, you can self custody on an offline device or any other custom method (CloudHSM, etc).
      - Generally, any software that can produce valid `ed25519` key pair can be used to generate the keys.
      - For NEAR consumption they should be encoded in base58 encoding.
      - For example, if you have offline device - you can install [near-cli](https://github.com/near/near-cli) and generate keys in the next way:

    ```bash
    export NEAR_ENV=mainnet
    near generate-key some-account-name
    ```

      - It will output the public key and also store the plain-text private key in `~/.near-credentials/mainnet/some-account-name.json`

## Custodians (Recommended for institutional users)
  - ### Finoa
    - [Finoa](https://finoa.io/) is the first qualified custodian to offer NEAR asset custody
    - Check with [Finoa](https://finoa.io/contact) to see if you are eligible
