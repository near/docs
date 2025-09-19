---
id: reproducible-builds
title: Reproducible Builds
description: "Reproducible builds let different people build the same program and get the exact same outputs as one another. They help users trust that deployed contracts are built correctly and correspond to the source code. To verify your contract, users can build it themselves and check that the binaries are identical."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Reproducible builds let different people build the same program and get the exact same outputs as one another. They help users trust that deployed contracts are built correctly and correspond to the source code. To verify your contract, users can build it themselves and check that the binaries are identical.

## Problem

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
  
If you build your contract on two different machines, most likely you will get two similar but not identical binaries. Your build artifact can be affected by the locale, timezone, build path, and billions of other factors in your build environment. Thus, the Rust community has a long history of addressing this issue.

To achieve reproducible builds, NEAR utilizes several components such as [NEP-330-Source Metadata](https://github.com/near/NEPs/blob/master/neps/nep-0330.md), [cargo-near](https://github.com/near/cargo-near), [Docker](https://docker.com), and [SourceScan](https://github.com/SourceScan).

:::info
In order to make use of reproducible builds, you will need [Docker](https://docker.com) installed on your machine.
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
```

When deploying with `cargo near deploy`, this information is used to clone the repository and compile the contract in a Docker container.

The compiling process will add the method `contract_source_metadata` to the contract **with no changes to the contract's code or logic** that will return the resulting metadata.

After the contract is deployed, we can see the metadata by calling the method `contract_source_metadata`, e.g.:

```zsh
near view <CONTRACT_ACCOUNT> contract_source_metadata

 INFO --- Result -------------------------
 |    {
 |      "build_info": {
 |        "build_command": [
 |          "cargo",
 |          "near",
 |          "build",
 |          "non-reproducible-wasm",
 |          "--locked"
 |        ],
 |        "build_environment": "sourcescan/cargo-near:0.13.5-rust-1.85.1@sha256:3b0272ecdbb91465f3e7348330d7f2d031d27901f26fb25b4eaf1560a60c20f3",
 |        "contract_path": "",
 |        "output_wasm_path": null,
 |        "source_code_snapshot": "<SNAPSHOT HERE>"
 |      },
 |      "link": "<GITHUB_LINK>",
 |      "standards": [
 |        {
 |          "standard": "nep330",
 |          "version": "1.3.0"
 |        }
 |      ],
 |      "version": "0.1.0"
 |    
 |    ------------------------------------
```

## Verify and Publish
In order to verify and publish your contract's code, you can use [NearBlocks](https://nearblocks.io) to trigger the verification process. Navigate to the contract's account page and under the **Contract** tab, you will see the **Verify and Publish** button. After the verification process is completed, the contract's source code, along with the metadata, will be publicly accessible on NearBlocks on the `Contract -> Contract Code` tab. 

![reproducible-build](/docs/assets/smart-contract/reproducible-build.png)
   
For a step-by-step guide on how to verify your contract, check out the [Verification Guide](https://github.com/SourceScan/verification-guide).

## Additional Resources

- [Verifying Smart Contracts on NEAR: Step-by-Step Guide](https://github.com/SourceScan/verification-guide)
- [Tools Community Call #10 - Introducing Reproducible Builds (video)](https://youtu.be/RBIAcQj7nFs?t=1742)


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