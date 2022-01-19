---
id: hardware-rpc
title: Hardware Requirements for RPC Node
sidebar_label: Hardware Requirements
description: NEAR RPC Node Hardware Requirements
---

This page covers the minimum and recommended hardware requirements for engaging with the NEAR platform as a RPC node.

For testing your RPC once the node is fully sync'd, see [this example RPC request.](https://docs.near.org/docs/api/rpc#node-status)

## Recommended Hardware Specifications {#recommended-hardware-specifications}

| Hardware       |  Recommended Specifications                                               |
| -------------- | -----------------------------------------------------------------------   |
| CPU            | 8-Core (16-Thread) Intel i7/Xeon or equivalent with AVX support           |
| RAM            | 16GB DDR4                                                                 |
| Storage        | 1TB SSD (NVMe SSD is recommended. HDD will be enough for localnet only )  |

_Verify AVX support on Linux by issuing the command ```$ lscpu | grep -oh  avx```. If the output is empty, your CPU is not supported._


## Minimal Hardware Specifications {#minimal-hardware-specifications}

| Hardware       |  Minimal Specifications                                                    |
| -------------- | -------------------------------------------------------------------------- |
| CPU            | 8-Core (16-Thread) Intel i7/Xeon or equivalent with AVX support            |
| RAM            | 8GB DDR4                                                                   |
| Storage        | 500GB SSD (NVMe SSD is recommended. HDD will be enough for localnet only)  |

_Verify AVX support on Linux by issuing the command ```$ lscpu | grep -oh  avx```. If the output is empty, your CPU is not supported._

## Cost Estimation {#cost-estimation}

Estimated monthly costs depending on operating system:

| Cloud Provider | Machine Size    | Linux                  |
| -------------- | --------------- | ---------------------- |
| AWS            | c5.2xlarge      | $250 CPU + $80 storage |
| GCP            | c2-standard-8   | $220 CPU + $80 storage |
| Azure          | Standard_F8s_v2 | $180 CPU + $40 storage |

<blockquote class="info">
<strong>Resources for Cost Estimation</strong><br /><br />

All prices reflect *reserved instances* which offer deep discounts on all platforms with a 1 year commitment

- AWS
  - cpu: https://aws.amazon.com/ec2/pricing/reserved-instances/pricing
  - storage: https://aws.amazon.com/ebs/pricing
- GCP
  - cpu: https://cloud.google.com/compute/vm-instance-pricing
  - storage: https://cloud.google.com/compute/disks-image-pricing
- Azure — https://azure.microsoft.com/en-us/pricing/calculator

</blockquote>

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
