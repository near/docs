id: reproducible-builds
title: Reproducible Builds
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Reproducible builds allow different people to build the same program and produce identical outputs. This helps users trust that deployed contracts are built correctly and correspond to the source code. To verify your contract, users can build it themselves and check that the binaries match exactly.

## Problem

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
  
If you build your contract on two different machines, you're likely to get two similar but not identical binaries. Your build artifact can be affected by locale, timezone, build path, and many other factors in your environment. As a result, the Rust community has a long history of addressing this issue.

To achieve reproducible builds, NEAR uses several components, such as [NEP-330 Source Metadata](https://github.com/near/NEPs/blob/master/neps/nep-0330.md), [cargo-near](https://github.com/near/cargo-near), [Docker](https://docker.com), and [SourceScan](https://github.com/SourceScan).

:::info
To use reproducible builds, you need to have [Docker](https://docker.com) installed on your machine.
:::

When initializing your project with `cargo near new`, the generated `Cargo.toml` will include information about the build environment and repository.

```toml
# ...
repository = "https://github.com/<xxx>/<xxx>"
# ...
[package.metadata.near.reproducible_build]
image = "sourcescan/cargo-near:0.13.5-rust-1.85.1"
image_digest = "sha256:3b0272ecdbb91465f3e7348330d7f2d031d27901f26fb25b4eaf1560a60c20f3"
passed_env = []
container_build_command = [
    "cargo",
    "near",
    "build",
    "non-reproducible-wasm",
    "--locked",
]
# ...
