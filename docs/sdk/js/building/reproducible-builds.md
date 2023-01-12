---
sidebar_position: 2
---

# Reproducible Builds
Reproducible builds let different people build the same program and get the exact same outputs as one another. It helps users trust that deployed contracts are built correctly and correspond to the source code. To verify your contract user can build it themselves and check that the binaries are identical.

## Problem
If you will build your contract on two different machines, most likely you will get two similar but not identical binaries. Your compiled `.wasm` file is dependent on several factors as the node version used and dependency sub versions. 

## Control for Dependencies
We recommend sharing lockfiles (and updating them only when dependencies are added or removed) between machines and specifying node versions to ensure that the same dependencies are used. 
