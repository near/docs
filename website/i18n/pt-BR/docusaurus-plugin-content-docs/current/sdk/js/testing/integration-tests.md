---
sidebar_position: 2
---

# Integration Tests

:::note Simulation tests are no longer actively supported. 
NEAR Simulator was meant to be an in-place replacement of a blockchain environment for the purpose of testing NEAR contracts. However, simulating NEAR ledger turned out to be a much more complex endeavor than was anticipated. Eventually, the idea of workspaces was born - a library for automating workflows and writing tests for NEAR smart contracts using a real NEAR network (localnet, testnet or mainnet). Thus, NEAR Simulator is being deprecated in favor of [`workspaces-rs`](https://github.com/near/workspaces-rs), the Rust edition of workspaces. As the two libraries have two vastly different APIs [this guide](/develop/testing/workspaces-migration) was created to ease the migration process for developers.
:::

## Setup

We place integration tests in JS in a separate directory at the same level as `/src`, called `/integration-tests` ([read more](https://doc.rust-lang.org/cargo/reference/cargo-targets.html#integration-tests)), placing this folder within a `/tests` folder at root-level that contains the unit tests folder would also be plausible. Refer to this folder structure below:

```sh
├── package.json                ⟵ contains `dependencies` for contract and `devDependencies` for workspaces-js tests
├── src
│  └── index.js                 ⟵ contract code
├── node_modules
└── integration-tests           ⟵ integration test directory
   └── tests.js                 ⟵ integration test file
```

A sample configuration for this project's `package.json` is shown below:

```json
{
  "name": "simple-example",
  "version": "0.1.0",
  "description": "Simple json file example",
  "main": "index.js",
  "type": "module",
  "license": "MIT",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "build": "near-sdk-js build",
    "test": "ava"
  },
  "dependencies": {
    "near-sdk-js": "0.6.0"
  },
  "devDependencies": {
    "ava": "^4.3.3",
    "near-workspaces": "^3.2.2"
  },
  "ava": {
    "files": [
      "test/**/*.ava.js"
    ],
    "require": [],
    "failFast": false,
    "timeout": "2m",
    "failWithoutAssertions": true,
    "environmentVariables": {},
    "verbose": true,
    "nodeArguments": []
  }
}
```

The `tests.js` file above will contain the integration tests. These can be run with the following command from the same level as the test `package.json` file:

    npm test

<!-- TODO: add snippets of code, living everywhere spread across docs -->