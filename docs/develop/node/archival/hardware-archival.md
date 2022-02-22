---
id: hardware-archival
title: Hardware Requirements for Archival Node
sidebar_label: Hardware Requirements
description: NEAR Archival Node Hardware Requirements
---

This page covers the minimum and recommended hardware requirements for engaging with the NEAR platform as an Archival node.


## Recommended Hardware Specifications {#recommended-hardware-specifications}

| Hardware       |  Recommended Specifications                                               |
| -------------- | -----------------------------------------------------------------------   |
| CPU            | 8-Core (16-Thread) Intel i7/Xeon or equivalent with AVX support           |
| RAM            | 16GB DDR4                                                                 |
| Storage        | 7 Terabyte SSD                                                            |

_Verify AVX support on Linux by issuing the command ```$ lscpu | grep -oh  avx```. If the output is empty, your CPU is not supported._


## Minimal Hardware Specifications {#minimal-hardware-specifications}

| Hardware       |  Minimal Specifications                                                    |
| -------------- | -------------------------------------------------------------------------- |
| CPU            | 8-Core (16-Thread) Intel i7/Xeon or equivalent with AVX support            |
| RAM            | 8GB DDR4                                                                   |
| Storage        | 7 Terabyte SSD                                                           |

_Verify AVX support on Linux by issuing the command ```$ lscpu | grep -oh  avx```. If the output is empty, your CPU is not supported._

## Cost Estimation {#cost-estimation}

Estimated monthly costs depending on operating system:

| Cloud Provider | Machine Size    | Linux                     |
| -------------- | --------------- | ------------------------  |
| AWS            | c5.2xlarge      | $250 CPU + $800 storage † |
| GCP            | c2-standard-8   | $220 CPU + $800 storage † |
| Azure          | Standard_F8s_v2 | $180 CPU + $800 storage † |

_( † ) The storage cost will grow overtime as an archival node stores more data from the growing NEAR blockchain._


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

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol"> > <h8>Ask it on StackOverflow!</h8></a>
