---
id: contracts-intro
title: Smart Contracts
sidebar_label: Introduction
---

## Overview

Although developers use one of two technologies to write and compile Smart Contracts on the NEAR platform:

1. **AssemblyScript** *(which looks a lot like TypeScript if you squint)*
2. and **Rust** *(a powerful language with a great developer experience)*

Whichever language you use to build your Smart Contracts, know that, once compiled to Wasm, they are eventually deployed and executed on the NEAR platform exactly the same way.

If you're familiar with JavaScript then **AssemblyScript** is the way to go for writing Smart Contracts on the NEAR platform. You can deploy your first Smart Contract in seconds, literally, with [NEAR Studio](http://near.dev). And if you'd rather build locally, check out [create-near-app](https://github.com/nearprotocol/create-near-app) to get started.  Either way, you'll be interacting with your first deployed contract in minutes.

If you prefer **Rust** then check out <code>[near-bindgen](/docs/near-bindgen/near-bindgen)</code> for authoring Smart Contracts in Rust that can be deployed using `nearlib`.  The `near-bindgen` repository has several great examples to help you get started quickly.

## Get Started

### AssemblyScript

Use [`near-runtime-ts`](/docs/runtime-ts/index) to write Smart Contracts in AssemblyScript.

### Rust

Use [`near-bindgen`](/docs/near-bindgen/near-bindgen) to write Smart Contracts in Rust.
