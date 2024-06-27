---
sidebar_position: 3
sidebar_label: "Seed phrase logic"
title: "Implementing the seed phrase logic from the necessary libraries"
---

# Seed phrase and key derivation

There are two separate things we'll want to do:

1. **Create a random seed phrase** for the user when they visit the crossword puzzle. This will be used if they win and don't have a NEAR account and wish to create one. They can then paste this seed phrase into NEAR Wallet afterward to import their account (which is basically like "logging in" and is currently possible at https://testnet.mynearwallet.com/recover-seed-phrase).
2. **Turn the crossword solution into a key pair**, instead of just hashing it.

## near-seed-phrase library

We can add the `near-seed-phrase` package to our project with:

```bash
npm install near-seed-phrase --save
```

:::note Code snippets for this chapter
At this point in the tutorial, it's more difficult to share code snippets that are both meaningful and meant to be copy/pasted into a project.

The snippets provided might differ slightly from the implementation of the [completed code for chapter 3](https://github.com/near-examples/crossword-tutorial-chapter-3), which might be the best place to look for the functioning code.
:::

## Generate random seed phrase for new account creation (if the winner doesn't already have an account)

```js
import { generateSeedPhrase } from 'near-seed-phrase';

// Create a random key in here
let seedPhrase = generateSeedPhrase(); // generateSeedPhrase() returns an object {seedPhrase, publicKey, secretKey}
localStorage.setItem('playerKeyPair', JSON.stringify(seedPhrase));
```

## Parse solution as seed phrase

(This security measure prevents front-running.)

```js
import { parseSeedPhrase } from 'near-seed-phrase';
// Get the seed phrase from the completed puzzle.
// The original puzzle creator would have already called this same function with the same inputs and would have
// already called `AddKey` on this contract to add the key related to this seed phrase. Here, using this deterministic
// function, the front-end will automatically generate that same key based on the inputs from the winner.
const seedPhrase = parseSolutionSeedPhrase(data, gridData); // returns a string of space-separated words
// Get the public and private key derived from the seed phrase
const {secretKey, publicKey} = parseSeedPhrase(seedPhrase);

// Set up the account and connection, acting on behalf of the crossword account
const keyStore = new nearAPI.keyStores.InMemoryKeyStore(); // Another type of key
const keyPair = nearAPI.utils.key_pair.KeyPair.fromString(secretKey);
await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair);
nearConfig.keyStore = keyStore;
const near = await nearAPI.connect(nearConfig);
const crosswordAccount = await near.account(nearConfig.contractName);

// Call the submit_solution method using the discovered function-call access key
let transaction = await crosswordAccount.functionCall(…);
```

The last line should look familiar. We did something similar in the last chapter, except we used the `WalletConnection`'s account to do the function call.

This time we're using an `InMemoryKeyStore` instead of the browser, as you can see toward the middle of the snippet.

### Key stores

We have now used almost all the key stores available in `near-api-js`:

1. `UnencryptedFileSystemKeyStore` — early on, when we used the NEAR CLI command `near login`, this created a file in our operating system's home directory containing a private, full-access key to our account.
2. `BrowserLocalStorageKeyStore` — in the last chapter, when the user first logs in, the function-call access key is saved in the browser's local storage.
3. `InMemoryKeyStore` — for this chapter, we'll simply use the computer's memory to store the private key derived from the crossword solution.

:::tip You can have multiple key stores
Technically, there's another type of key store called the `MergeKeyStore`.

Say you want to look for private keys in various directories. You can essentially have a list of `UnencryptedFileSystemKeyStore` key stores that look in different places.

Use the `MergeKeyStore` when you might want to look for a private key in more than one place.
:::
