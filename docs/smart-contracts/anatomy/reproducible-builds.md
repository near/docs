---
id: reproducible-builds
title: Reproducible Builds
---

Reproducible builds let different people build the same program and get the exact same outputs as one another. It helps users trust that deployed contracts are built correctly and correspond to the source code. To verify your contract user can build it themselves and check that the binaries are identical.

## Problem
If you will build your contract on two different machines, most likely you will get two similar but not identical binaries. Your build artifact can be affected by the locale, timezone, build path, and billion other factors in your build environment. Rust community has a long story of fighting this issue but still, [it is not achieved yet](https://github.com/rust-lang/rust/labels/A-reproducibility).

## CI solution
We recommend you to build your contracts with the use of our [Contract Builder](https://github.com/near/near-sdk-rs/tree/master/contract-builder). It's is using Docker, controlled and sharable environment that can be used by both you and your users. Docker image is available [here](https://hub.docker.com/r/nearprotocol/contract-builder). The contract built in it will result in a binary that is the same if built on other machines.
