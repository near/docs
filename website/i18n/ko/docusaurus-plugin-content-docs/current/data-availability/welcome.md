---
id: welcome
title: Rollup Data Availability
sidebar_label: Rollup Data Availability
---

Utilizing NEAR as storage data availability with a focus on lowering rollup DA fees.

- [Blob Store Contract](./blob-contract): A contract that provides the store for arbitrary DA blobs.
- [Light Client](./light-client): A trustless off-chain light client for NEAR with DA-enabled features.
- [RPC Client](./rpc): The defacto client for submitting data blobs to NEAR.
- [Integrations](./integrations): Proof of concept works for integrating with L2 rollups.

:::tip
For the latest information, please check the [Near DA](https://github.com/near/rollup-data-availability/) repository.
:::

***

## System Context

This outlines the system components that we build and how it interacts with external components.

Red lines denote external flow of commitments.
White lines denote flow of blob data.

:::note

`Fisherman` is just an example how a rollup can work with the light client in the initial stage of DA, until we implement a more non-interactive approach, such as KZG.

:::

```mermaid
C4Context
    title NEAR Data Availability System Context

    Enterprise_Boundary(b1, "Ethereum") {
        System_Ext(SystemEth, "Ethereum")

        System_Boundary(b2, "Rollup") {
            System_Ext(SystemRollup, "Rollup", "Derives blocks, execute transactions, posts commitments & sequence data")
            System(SystemNearDa, "NEAR DA Client", "Submits/Gets blob data, creates commitments")
        }
        BiRel(SystemRollup, SystemEth, "Posts sequences, proofs of execution, DA frame references")
        BiRel(SystemRollup, SystemNearDa, "Post batches, retrieves commitments")
        Rel(fisherman, SystemEth, "Looks for commitments, posts results")
    }      
    
    Enterprise_Boundary(b0, "NEAR") {
        
        System(SystemLc, "Light Client", "Syncs headers, provides inclusion proofs")
        System(SystemNear, "NEAR Protocol", "NEAR validators, archival nodes")
        
        Rel(SystemLc, SystemNear, "Syncs headers")    
        Rel(SystemNearDa, SystemNear, "Submits/Gets blob")

        %% This doesn't exist yet
        %% System(SystemDas, "Data Availability Sampling", "Data redundancy, retrieval, sample responses")
        %% BiRel(SystemDas, SystemLc, "Commitments")
    }
     
    Person_Ext(fisherman, "Fisherman")
    Rel(fisherman, SystemLc, "Requests inclusion proofs, validates inclusion proofs")
      

    UpdateRelStyle(fisherman, SystemEth, $offsetY="-10" $lineColor="red")
    UpdateRelStyle(fisherman, SystemLc, $offsetY="-10", $lineColor="red")
    UpdateRelStyle(SystemRollup, SystemEth, $offsetY="-30", $lineColor="white")
    UpdateElementStyle(fisherman, $bgColor="grey", $borderColor="red")

    UpdateRelStyle(SystemRollup, SystemNearDa, $offsetX="-200", $lineColor="white", $textColor="white")
    UpdateRelStyle(SystemNearDa, SystemNear, $textColor="white", $lineColor="white", $offsetY="10")
    UpdateRelStyle(SystemNearLc, SystemNear, $offsetX="30")
```
