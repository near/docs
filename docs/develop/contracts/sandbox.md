---
id: sandbox
title: Sandbox and near-runner
sidebar_label: Test in Sandbox
---

Once you've written some awesome contracts and performed a few unit tests the next step is to see how your contracts will behave on a real node. [near-runner] makes this easy, and supports running the same tests in both a local [NEAR Sandbox](https://github.com/near/sandbox) instance and on [TestNet](https://docs.near.org/docs/concepts/networks).

<blockquote class="info">
<strong>Coming from Ethereum?</strong><br><br>
  
If you're familiar with the `ganache` and `truffle` tools commonly used in Ethereum, then NEAR Sandbox will be familiar to you. It has similar functionality to the common Ethereum development workflow of:
  
- Writing e2e test in JavaScript
- Start a local `ganache` node
- Run `truffle test` to execute tests on either local `ganache` or Ethereum Testnet.
</blockquote>

See the [near-runner] repository for instructions on how to use it.

  [near-runner]: https://github.com/near/runner
