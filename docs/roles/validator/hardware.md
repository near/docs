---
id: hardware
title: Hardware Requirements
sidebar_label: Choosing Hardware
---

This page covers the minimum and recommended hardware requirements for engaging with the NEAR platform as an application developer, validator, integrator or core contributor

## Machine Specifications

### Validator

- **CPU:** 2-Core (4-Thread) Intel i7/Xeon equivalent
- **RAM:** 4GB DDR4
- **SSD:** 50GB

Estimated monthly costs depending on operating system:

| Cloud Provider | Machine Size    | Linux | Windows |
|----------------|-----------------|-------|---------|
| AWS            | c5.large        | $25   | $100    |
| GCP            | n1-standard-2   | $50   | $150    |
| Azure          | Standard_F2s_v2 | $90   | $150    |

### Track all shards

Currently, if you want to ensure full security immediately after finality gadget is done, the easiest way is to run node that tracks all shards.

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

