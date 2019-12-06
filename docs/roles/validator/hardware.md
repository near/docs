---
id: hardware
title: Hardware Requirements
sidebar_label: Choosing Hardware
---

This page covers the minimum and recommended hardware requirements for engaging with the NEAR platform as an application developer, validator, integrator or core contributor

## Machine Specifications

### Minimum (`Level I`)

- **CPU:** 2-Core (4-Thread) Intel i7/Xeon equivalent
- **RAM:** 4GB DDR4
- **SSD:** 50GB

Estimated monthly costs depending on operating system:

| Cloud Provider | Machine Size    | Linux | Windows |
|----------------|-----------------|-------|---------|
| AWS            | c5.large        | $25   | $100    |
| GCP            | n1-standard-2   | $50   | $150    |
| Azure          | Standard_F2s_v2 | $90   | $150    |


### Recommended (`Level II`)

- **CPU:** 4-Core (8-Thread) Intel i7/Xeon
- **RAM:** 8GB DDR4
- **SSD:** 64GB

Estimated monthly costs depending on operating system:

| Cloud Provider | Machine Size    | Linux | Windows |
|----------------|-----------------|-------|---------|
| AWS            | c5.xlarge       | $50   | $200    |
| GCP            | c2-standard-4   | $200  | $350    |
| Azure          | Standard_F4s_v2 | $200  | $300    |

### High Performance (`Level III`)

- **CPU:** 8-Core (16-Thread) Intel i7/Xeon or equivalent
- **RAM:** 16GB DDR4
- **SSD:** 120GB

Estimated monthly costs depending on operating system:

| Cloud Provider | Machine Size    | Linux | Windows |
|----------------|-----------------|-------|---------|
| AWS            | c5.2xlarge      | $100   | $400   |
| GCP            | c2-standard-8   | $250   | $700   |
| Azure          | Standard_F8s_v2 | $350   | $600   |

<blockquote class="info">
<strong>Resources for Cost Estimation</strong><br><br>

- AWS — https://aws.amazon.com/ec2/instance-types
- GCP — https://cloud.google.com/compute/docs/machine-types
- Azure — https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes-compute

</blockquote>

## Node Types

### Running a Validator Node

Validator Nodes (`vNodes`) are used to validate transactions on the network and are critical for stable, secure network operations.  People and companies are motivated to run a vNode

> NEAR recommends running `Level II` or better hardware for a vNode

### Running a Light Node

Light Nodes (`iNodes`) are used to monitor the network without validating transactions.  iNodes would be the likely choice for any person or company heavily invested in the stability and security of the NEAR platform since an iNode would maintain a local copy of the blockchain and necessarily stay in sync with new developments of the NEAR platform.

iNodes would likely be deployed to cloud or co-located servers but could also live on a modern professional-grade laptop or desktop computer as long as it is always on and connected to the internet to stay actively engaged with the NEAR network.

> NEAR recommends running `Level I` or better hardware for an iNode

### Running a Development Node

Development Nodes (`dNodes`) are used for off-network development when experimenting with new economic configurations via custom Genesis Block rules, stress testing integrations with the platform or working offline (ie.airplane mode) for general development purposes.

A modern professional-grade laptop is more than sufficient for this task with two options:

- containerized dNode — NEAR uses Docker containers
- native dNode — the NEAR platform requires a Rust development environment and can be compiled and deployed on any hardware that is supported by the Rust community

> NEAR recommends running `Level I` or better hardware for a dNode
