---
id: usecases
title: Interacting with a Contract
sidebar_label: 💡 Interacting with a Contract
---

Here we enumerate case scenarios, and point to where the documentation is present.

---

## Integrating Contracts into a Web App
If you are developing a website (or a web-app), then you will be using `near-api-js` to communicate with the blockchain. Go to the [website](/tools/near-api-js/quick-reference) for more information about it.

---

## Command Line Interface
You can use [NEAR CLI](./cli.md) to automatize tasks from the command line such as:
- Creating sub-accounts
- Deploying contracts to them
- Calling initialization methods

---

## Querying Post Hoc Information
The [NEAR Indexer](./indexer4explorer.md) enables you to query information from a deployed contract such as:

1. Which users called a specific method?
2. How much money they attached?
3. How much GAS was used?

It is very useful for analyzing scenarios that happened in the past.

---

## Getting Real Time Information
If you want to track real time information from your contract, then you need the [Events framework](/tools/realtime).

