---
id: hardware
title: Hardware Requirements
sidebar_label: Choosing Hardware
---

This page covers the minimum and recommended hardware requirements for engaging with the NEAR platform as an application developer, validator, integrator or core contributor.

## Machine Specifications

- **CPU:** 4-Core (8-Thread) Intel i7/Xeon or equivalent with AVX support
- **RAM:** 16GB DDR4
- **Storage:** 100GB SSD

_Verify AVX support on Linux by issuing the command ```$ lscpu | grep -oh  avx```. If the output is empty, your CPU is not supported._

Estimated monthly costs depending on operating system:

| Cloud Provider | Machine Size    | Linux                  |
| -------------- | --------------- | ---------------------- |
| AWS            | c5.2xlarge      | $150 CPU + $20 storage |
| GCP            | c2-standard-8   | $250 CPU + $20 storage |
| Azure          | Standard_F8s_v2 | $180 CPU + $10 storage |

<blockquote class="info">
<strong>Resources for Cost Estimation</strong><br><br>

All prices reflect *reserved instances* which offer deep discounts on all platforms with a 1 year commitment

- AWS
  - cpu: https://aws.amazon.com/ec2/pricing/reserved-instances/pricing
  - storage: https://aws.amazon.com/ebs/pricing
- GCP
  - cpu: https://cloud.google.com/compute/vm-instance-pricing
  - storage: https://cloud.google.com/compute/disks-image-pricing
- Azure — https://azure.microsoft.com/en-us/pricing/calculator

</blockquote>

