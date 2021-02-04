---
id: dev-accounts
title: Dev Accounts
sidebar_label: Dev Accounts
---

## What is a "Dev Account"

Dev accounts are special accounts made automatically by tools like near-cli and the wallet to help you automate testing and deploying of contracts.

Since every account can have a contract, but re-deploying contracts DOES NOT create new state, you often want to deploy to a completely different account when testing.

### How to create a dev account

When you the command `dev-deploy` from near-cli, it looks for a file here `/neardev/dev-account` with the dev account ID to deploy to.

If it doesn't find one, it creates a dev-account (using our cloud helper service for creating test accounts) and then creates the folder for you with the `dev-account` file.

It will also create the associated credentials, a public and private keypair here: `~/.near-credentials/default/[dev-account-id].json`. Go ahead and try it:
```
code ~/.near-credentials/default/[dev-account-id].json
```
Replace dev-account-id with the account ID here `/neardev/dev-account` and open the json file up in your editor of choice (code for VS Code).

### How do I get another one

Delete the folder `/neardev` and run `near dev-deploy [wasmFile default="/out/main.wasm"]` and you'll see a new dev account was created in `neardev` and credentials are also stored for you.

### Ok I have a dev account, so what?

These accounts and associated keypairs found in the json file are super useful for automating your testing.

Many examples in the NEAR ecosystem use some sort of `yarn dev:deploy` script that deploys contracts and maybe even runs some tests. It's important to know how these accounts are created, where their credentials are stored and how you can use them yourself.
