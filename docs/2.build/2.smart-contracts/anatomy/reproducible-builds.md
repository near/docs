---
id: reproducible-builds
title: Reproducible Builds
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Reproducible builds let different people build the same program and get the exact same outputs as one another. It helps users trust that deployed contracts are built correctly and correspond to the source code. To verify your contract user can build it themselves and check that the binaries are identical.

## Problem

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
  
If you will build your contract on two different machines, most likely you will get two similar but not identical binaries. Your build artifact can be affected by the locale, timezone, build path, and billion other factors in your build environment. Rust community has a long story of fighting this issue but still, [it is not achieved yet](https://github.com/rust-lang/rust/labels/A-reproducibility).

### CI solution

We recommend you to build your contracts with the use of our [Contract Builder](https://github.com/near/near-sdk-rs/tree/master/contract-builder). It's is using Docker, controlled and sharable environment that can be used by both you and your users. Docker image is available [here](https://hub.docker.com/r/nearprotocol/contract-builder). The contract built in it will result in a binary that is the same if built on other machines.

  </TabItem>
  <TabItem value="python" label="🐍 Python">
  
For Python smart contracts, reproducibility is less of an issue since the Python SDK doesn't compile to WebAssembly directly. Instead, the Python code is executed in a Python-to-WASM interpreter that's embedded in the contract runtime.

When you deploy a Python smart contract, you're deploying your Python source code directly (or in a lightly processed form), rather than a compiled binary. This makes the deployment process more deterministic, as there's less opportunity for build environment factors to influence the resulting artifact.

### Ensuring Reproducible Python Contracts

To ensure your Python contracts are reproducible:

1. **Pin your dependencies**: If your contract uses any third-party libraries, make sure to specify exact versions.

2. **Use consistent formatting**: Use tools like Black or YAPF to ensure consistent code formatting.

3. **Document Python version**: Make sure to document which Python version your contract was developed with.

4. **Avoid system-specific code**: Don't rely on features that might behave differently across operating systems.

  </TabItem>
</Tabs>
