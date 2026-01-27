---
id: smart-contracts
title: Smart Contracts
description: Learn about the two main types of NEAR Addresses
hide_title: true
---

import Card from '@site/src/components/UI/Card';

import Progress from "@site/src/components/Academy/Progress";
import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";

<Progress course="accounts" total={6} />

## Accounts are Smart Contracts

While we will have a dedicated quest on smart contracts later, it is important to understand that in NEAR Protocol, **every account is also a smart contract**.

This means that each account can have its own code and logic, and that we do not distinguish between user accounts and contract accounts as other chains do.

---

## Asynchronous Execution

Another important aspect of NEAR smart contracts is that they use **asynchronous execution**. This means that when a contract calls another contract, it does not wait for the response before continuing its execution.

Instead, NEAR uses a system of promises a callbacks to handle these interactions, which allows us to not halt the entire network while waiting for a response.

If a smart contract makes two parallel calls to other contracts, and one of them fails, the other can still succeed without affecting the original contract's state.

This is different from most other blockchains, where a failed cross-contract call can revert the entire transaction.

---

## Quiz

<Quiz course="accounts" id="accounts-quiz">
    <MultipleChoice question="What is the difference between accounts and smart contracts in NEAR?">
        <Option correct={true}>There is no difference; every account is a smart contract</Option>
        <Option>Accounts are totally different entities than smart contracts</Option>
        <Option>Smart contracts have more permissions than regular accounts</Option>
        <Option>Accounts can hold funds, while smart contracts cannot</Option>
    </MultipleChoice>
    <MultipleChoice question="What happens if a NEAR smart contract makes two parallel calls to other contracts, and one of them fails?">
        <Option correct={true}>The other call can still succeed without affecting the original contract's state</Option>
        <Option>The entire transaction is reverted, and no changes are made</Option>
        <Option>The original contract is paused until both calls succeed</Option>
        <Option>The original contract loses all its funds</Option>
    </MultipleChoice>
</Quiz>
