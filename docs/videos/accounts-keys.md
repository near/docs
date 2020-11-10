---
id: accounts-keys
title: NEAR accounts and access keys
sidebar_label: Accounts & keys
---

## Part 1 - account creation, key examination, key addition/removal, and more…

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ganXZ0Iw1C8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Content overview

This video walks through the steps of creating a new account on NEAR Wallet using the "seed phrase" option for recovery. To keep things simpler, we stop before the step to enable two-factor authentication. Using NEAR CLI and NEAR Wallet's interface, we show that two full access keys have been created on this account.

The NEAR CLI command to view the keys is:

    near keys videos.testnet

**Where are the two private keys from?**

1. The seed phrase from the recovery option
2. The browser local storage (you may see this in Chrome/Brave by right-clicking in the browser window… select "Inspect"… select the "Applications" tab… then on the left pane under "Local Storage" select the Wallet site)

Using NEAR CLI we can determine a public key from a private key.

##### From seed phrase:

    near generate-key --seedPhrase 'special style height timber defense leave vote behave elbow scare gallery side'
    
##### From private key:

    near repl    
    # shows a prompt beggining with '>'
    nearAPI.KeyPair.fromString('3by8kdJoJHu7uUkKfoaLJ2Dp1q1TigeWMGpHu9UGXsWdREqPcshCM223kWadmrMKpV9AsWG5wL9F9hZzjHSRFXud').publicKey.toString()
    # returns 'ed25519:6gaTj2kWoCAYGNJs1CR1bACsy4DRXwvd5B9cqUmx2CJw'
    
From here we discuss the two different key types: full access and function-call access keys. (The second one may sometimes be referred to as "limited access keys")
Full access keys have all the "Actions" available, and we list them on Nomicon:

https://nomicon.io/RuntimeSpec/Actions.html

Note that a smart contract's function may execute these actions as well. For instance, a function-call access key could be created for a user, allowing them to call a function `create_my_contract` that programmatically creates a subaccount and deploys a contract to it. `CreateAccount` and `DeployContract` are called from the contract's account, not the signer. So while the results of this function-call access key call are more powerful, full access-like Actions, a malicious contract cannot, for instance, delete the signer's account. It could only programmatically delete its *own account*.

Moving on, we take a look at the three types of key storage with NEAR.

1. Browser local storage (like we saw in Wallet)
2. Unencrypted file storage (like what happens after `near login` where the key file is stored in the OS's home directory at `~/.near-credentials/`)
3. In memory key store (purely in memory)

Note that `MergeKeyStore` is a way to have multiple of these types, like if there are several locations to look for unencrypted key files.

Lastly we cover two final concepts: top-level accounts (TLA) and subaccounts. TLAs are accounts that do not have the typical network suffix. (On mainnet, ending in `.near`, on testnet ending in `.testnet` and so on.) Subaccounts are of the form `child.parent.testnet` where the only account that can create it is `parent.testnet`. Subaccounts work exactly like standalone accounts, meaning that after creation, the parent account no longer has any special control or access to the subaccount.

---

## Part 2 - generating and adding a key, 2FA, and the multisig contract

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/4Q4K03t2P48" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Content overview

This video picks up from Part 1, and "restores" the brower local storage key we removed in there. Using NEAR CLI, we discuss the difference between:

    near generate-key
    
and

    near add-key

For reference, see the examples and documentation here:
- [generate-key](/docs/development/near-cli#near-generate-key)
- [add-key](/docs/development/near-cli#near-add-key)

Then we step through the process of adding an email recovery using the NEAR Wallet interface, and then enabling two-factor authentication.

Next, we take a look at the diagrams of a normal workflow and a 2FA workflow. We discuss the [multisig contract](https://github.com/near/core-contracts/tree/master/multisig) used for 2FA.

Then we learn how the various pieces fit together: the RPC, [NEAR Contract Helper](https://github.com/nearprotocol/near-contract-helper), a request transaction, a confirmation transaction, etc.

By the end of this video a developer will understand how multisig and 2FA works, as well as understand how powerful access keys are at NEAR.
