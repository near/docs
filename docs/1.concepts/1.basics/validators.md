---
id: validators
title: Validators
---
Intro to validators

<blockquote class="info">
<strong>Is there a plan to support GPU compute if certain validator nodes can offer that or is it just CPU?</strong><br /><br />
  
We don't need GPU support as we are a POS chain and we require very little compute power. <br />

You can read more about our consensus strategy on our <a href="https://github.com/near/wiki/blob/master/Archive/validators/about.md">Validator Quickstart</a> and <a href="https://github.com/near/wiki/blob/master/Archive/validators/faq.md">Staking FA</a>.
</blockquote>

<blockquote class="info">
<strong>If a developer writes a vulnerable or malicious dApp, is a validator implicitly taking on risk?</strong><br /><br />
  
No. We have handled the potential damages to the network on the protocol level. For example, we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc. <br />

That said, smart contract developers will need to be responsible for their own dApps, as there is no stage gate or approval process. All vulnerability can only damage the smart contract itself. Luckily, updating smart contracts is very smooth on NEAR, so vulnerabilities can be updated/patched to an account in ways that cannot be done on other blockchains.
</blockquote>