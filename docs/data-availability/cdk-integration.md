---
id: cdk-integration
title: CDK Stack
---

The folder [`./cdk-stack`](https://github.com/near/rollup-data-availability/tree/main/cdk-stack) contains some projects, too:

- `cdk-validium-contracts`: This contains the contract modifications for removing the CDK DAC signing attestations and adding the Blob commitments.
- `cdk-validium-node`: This contains the modifications for submitting Sequence batches to NEAR, and passing the commitment data through to Ethereum.

Note eventually, `cdk-validium-node` will become its repository, heavily leaning on `da-rpc-go` as a package.
