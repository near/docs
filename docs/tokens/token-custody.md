---
id: token-custody
title: Token Custody Options
sidebar_label: Token Custody
---
There are several options available to manage your NEAR and NEAR-based assets. 

As with all blockchains, to claim or receive tokens you will need to generate a keypair which stores your crypto. You can do this directly by using a hardware wallet and the command line or indirectly by using a commercially available web or mobile wallet.  All of these options are described below.

1. Mobile Wallets
2. Web Wallets
3. Custodians
4. CLI

If you have chosen an option which doesn't allow you to check balances or lockup details, you can lookup your account using [this tool](https://near.github.io/account-lookup).

This list will be regularly updated as more products and providers offer NEAR support. Feel free to send Pull Request to https://github.com/near/docs/edit/master/docs/tokens/token-custody.md with new options.

# Mobile Wallets

## Option 1: Trust Wallet

  - [Trust Wallet](https://trustwallet.com/) is a very popular, non-custodial, wallet available on iOS and Android.
  
  ***Setup Trust wallet and generate public key***
  
1. Install Trust Wallet on your phone from App Store or Play Store
2. Create a new wallet (or use existing if you already have one setup)
3. Make sure to back up your recovery seed phase as you would usually do.
4. In "Settings" in upper right corner, toggle NEAR.
5. In the main wallet view, click on "NEAR" and then "Receive".
6. You will see QR code and address in the form `NEAR2F4vDeD9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud` - this is a public key you can use to claim your tokens.

*Note: current version of Trust Wallet in App / Play Stores doesn't show the actual balance on the account. There is new version of Trust Wallet been released that will address this.*

## Option 2: MathWallet

  - [MathWallet](https://mathwallet.org/) is a multi-platform (mobile/desktop/hardware) universal crypto wallet that enables token storage of 50+ chains. 
  
  MathWallet also has Chrome extension that supports NEAR, see section below.
  
  ***Setup Near Account in MathWallet***
  
1. Install MathWallet on your phone from [https://mathwallet.org/](https://mathwallet.org/).
2. Switch to 'Near' chain.
3. Create/import a Near account.
4. You will see your Near address to send/receive tokens.

## Option 3: TBD

(more added soon!)


# Web Wallets

## Option 1: NEAR Wallet

The [NEAR Web Wallet](https://wallet.near.org) provides a way to interact with NEAR network from web without needing to install a wallet.

Currently, the NEAR Wallet doesn't allow you to create just a public key. Instead, if you have an allocation of NEAR tokens, ask your facilitator (eg CoinList or the NEAR Foundation) to send you a NEAR Drop and follow [this guide](https://docs.google.com/document/d/13b3K_9f0YZudFrEAmagM4RcesK3DFxPBE5DswJ37Das). 

NEAR Wallet also supports Ledger hardware devices for improved security. *Note: currently NEAR Wallet only supports single HD path on Ledger, meaning that all accounts will use the same public key.*

### Importing accounts from other wallets

NEAR Wallet supports importing existing accounts from other wallets.

1. Open https://wallet.near.org/recover-seed-phrase
2. Enter account ID (you can use https://near.github.io/account-lookup/ to lookup your account ID based on public key or other addresses)
3. Enter seed phrase from another wallet

This will add an account to your NEAR Wallet.

## Option 2: MathWallet Chrome Extension

[MathWallet Chrome Extension](https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc) provides MathWallet interface in the Web via a Chrome Extension.

1. Follow URL above
2. Click "Switch Network" to select NEAR
3a. To create new wallet use "Create Wallet"
3b. Or select "Import Wallet" to import an existing account: enter seed phrase of the account and account id.


# Custodians (Recommended for institutional users)

## Option 1: Finoa
*Status: Currently available*

[Finoa](https://finoa.io/) is the first qualified custodian to offer NEAR asset custody.  Check with [Finoa](https://finoa.io/contact) to see if you are eligible and [their NEAR guide](https://www.finoa.io/near) for more information about their offering.

**Delegation and Staking:** In early phases, users will be able to delegate funds to nodes run by Finoa or provided by Staking Facilities, Chorus One, Certus.One, Blockdaemon, Figment, BisonTrails or T-Systems.

    
## Option 2: Coinbase
*Status: Implementation Phase, no estimated date*

**Delegation and Staking:** Clients can delegate to any validator they want. Coinbase is not going to be running it's own validator, just setting up the functionality for clients to custody their funds with them and delegate to whichever validator they'd like whether that be a third party provider or one they'd like to run themselves. 

## Option 3: TBD

(more added soon!)


# CLI (Recommended for developers and validators)

## Option 1: Ledger via CLI 

For users with advanced security requirements and the need for flexibility (developers and validators), we highly recommend using our command line interface [(NEAR-CLI)](https://docs.near.org/docs/development/near-cli) with a Ledger hardware device.

This [community-authored guide](https://medium.com/@bonsfi/how-to-use-ledger-with-near-cli-648d5d990517) walks through several common commands.


### Installing the NEAR Ledger App

You can install the NEAR Ledger app using [Ledger Live](https://www.ledger.com/ledger-live) by:

1) Open Ledger Live and install any available firmware updates
2) Go to `Settings`
3) Under `Experimental Features` ensure `Developer Mode` is switched on
4) Return to the `Manager` tab and search for NEAR
5) Follow instructions to install the NEAR app on your device

### Updating the NEAR Ledger App

You will need to have the latest Ledger device firmware installed (which can be done in Ledger Live's "Manager" tab) and the latest NEAR app.  If you previously installed the NEAR app, it may need to be updated. 

Currently, while the NEAR app is in Development Mode (while Ledger finishes reviewing it), this update may only be possible by uninstalling and reinstalling the app from the "Apps Installed" section of the "Manager" tab.

Make sure to quit the Ledger Live app when interacting with your ledger from the CLI or you'll get an error like `Error: cannot open device with path IOService ..........`
        
### To generate public keys via Web App

There is a quick web app built to generate mulitple keys from Ledger: https://near-ledger-keygen.glitch.me/
        
### To generate public keys via CLI

1. Make sure [you have npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
1. Make sure you have quit Ledger Live (or you'll get a `Error: cannot open device with path IOService ..........` error)
1. Install `near-cli` via `sudo npm install -g near-cli` (or similar command on Windows).
1. Log in your Ledger device and open the NEAR app. A message `Peding Ledger review` will appear. To continue, confirm the receiving of the message by the standard means (press both buttons on Ledger Nano S).
2. Use the `near generate-key key --useLedgerKey` command to generate the key for your Ledger device. It will output a *public key* that can be used to claim your NEAR tokens. 
    Note 1: in the case of generating a key using the Ledger device, the 2nd argument is ignored and can thus be anything.  
    Note 2: This command will output the **same key** no matter how many times it is run.  
3. If you want to generate more keys, you will need to provide an [HD path](https://ethereum.stackexchange.com/questions/70017/can-someone-explain-the-meaning-of-derivation-path-in-wallet-in-plain-english-s) as a value to the `--useLedgerKey` flag.  Each change in the last number will produce a new key and you can use any number, as the following examples show: 

        # Example 1: 
        near generate-key key --useLedgerKey="44'/397'/0'/0'/2'"
        
        # Example 2: 
        near generate-key key --useLedgerKey="44'/397'/0'/0'/11'"
        
4. After confirming the key on your Ledger device (which should be opened to the NEAR app), the result you will see output in the console is in the format:

        Using public key: ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud
    
    ...which is the public key you can use to claiming your NEAR tokens.  Note: the key includes the `ed25519:` portion, so the full key is `ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud` in this example.
    
*Best Practice: Keep a log (eg spreadsheet) of which HD paths map to which keys and what their purpose is so you don't end up accidentally re-using public keys and potentially de-anonymizing yourself*


## Option 2: Self custody

For professionals who have their own setup, you can self custody on an offline device or any other custom method (CloudHSM, etc).

Generally, any software that can produce valid `ed25519` key pair can be used to generate the keys. For NEAR consumption they should be encoded in base58 encoding.

For example, if you have offline device - you can install [near-cli](https://github.com/near/near-cli) via `sudo npm install -g near-cli` and generate keys in the following way:

```bash
export NEAR_ENV=mainnet
near generate-key some-account-name
```

It will output the public key in the format `Using public key: ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud`, which is the public key which you can then use for claiming your NEAR tokens (it includes the `ed25519:` portion, so the full key is `ed25519:D9Brbo6cgPAPLMzXrZXza3EXfwS7hrK76SpHwBH4sEud` in this example).

The private key is stored in the plain-text format in `~/.near-credentials/mainnet/some-account-name.json`

### Using seed phrases in CLI

Seed phrases can be generated by any tools (or offline), including by other wallet like NEAR Wallet or Trust Wallet.

Given seed phrase, you can output keys and do any other actions by specifying seed phrase (and possibly HD derivation via `-seedPath`) via command line flags:

```
near generate-key --seedPhrase="words of phrase here"
```

For example, to send money using the seed phrase from another wallet, use:

```
near send <your account> <other account> --seedPhrase="words"
```


