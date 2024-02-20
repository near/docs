---
id: arbitrum
title: Arbitrum Nitro
sidebar_label: Arbitrum Nitro
---

To support Arbitrum Nitro, we have integrated a small plugin into the DAC `daserver`. This is much like our http sidecar and provides a very modular integration into NEAR DA whilst supporting Arbitrum 
DACs. 

In the future, this will likely be the easiest way to support NEAR DA as it acts as an independent sidecar which can be scaled as needed. This also means that the DAC
can opt-in and out of NEAR DA, lowering their infrastructure burden. With this approach, the DAC committee members just need to have a _"dumb"_ signing service, with the store backed
by NEAR.

:::info

You can find more details about the Arbitrum Nitro integration in our [`near/nitro` GitHub repository](https://github.com/near/nitro).

:::
