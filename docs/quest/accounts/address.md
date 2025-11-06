---
id: address
title: Address Types
description: Learn about the different types of accounts in NEAR Protocol
hide_title: true
---

import Card from '@site/src/components/UI/Card';

import Progress from "@site/src/components/Academy/Progress";
import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";

<Progress course="accounts" total={3} />

## Address Types in NEAR Protocol

Each account in NEAR protocol is identified by a **single and unique** address. While NEAR supports multiple types of addresses, most accounts use one of two: **named address** or **implicit address**.

<div class="row" style={{marginTop: '2rem'}}>
  <div class="col col--6">
    <Card title="Named Addresses" >
    Named addresses are human-readable addresses that are easy to remember and share, making them ideal for everyday use:

    - <a>`near` / `account.near` / `account.sweat` / `app.finance.tg`</a>

    </Card>
  </div>
  <div class="col col--6">
    <Card title="Implicit Address" >
    Implicit addresses are derived from cryptographic key pairs and are a long strings of 64 characters

    - <a>`757503837a63ece206449d450ec77ae8d79c88ccda5e62a810f4eeb51db93050`</a>
    </Card>
  </div>
</div>
<div class="row" style={{marginTop: '2rem'}}>
    <div class="col col--6">
        <Card title="Ethereum Address" >
        NEAR Protocol supports Ethereum-like addresses to allow interoperability with EVM-based applications and tools

        - <a>`0x32Be343B94f860124dC4fEe278FDCBD38C102D88`</a>
        </Card>
    </div>
    <div class="col col--6">
        <Card title="Other Addresses" >
        NEAR supports more addresses in order to accommodate various use cases, an address is valid if:
        
        - <a>It has between 2 and 64 chars</a>
        - <a>Uses valid chars (`a-z`, `0-9`, `-`, `_`, `.`)</a>
        - <a>Does not start or finish on a special character (`.`,`-`,`_`)</a>
        
        </Card>
    </div>
</div>

---

## Quiz

<Quiz course="accounts" id="accounts-quiz">
    <MultipleChoice question="What are the two main types of NEAR accounts?">
        <Option> A. Public accounts and private accounts.</Option>
        <Option correct> B. Named accounts (like alice.near) and implicit accounts (like 0x123...).</Option>
        <Option> C. Personal accounts and business accounts.</Option>
        <Option> D. Main accounts and backup accounts.</Option>
    </MultipleChoice>
    <MultipleChoice question="What is a key advantage of named accounts over implicit accounts?">
        <Option> A. Named accounts are more secure than implicit accounts.</Option>
        <Option correct> B. Named accounts are human-readable and easy to remember, like alice.near.</Option>
        <Option> C. Named accounts cost less to create than implicit accounts.</Option>
        <Option> D. Named accounts can hold more tokens than implicit accounts.</Option>
    </MultipleChoice>
    <MultipleChoice question="In NEAR's hierarchical account system, who can create the sub-account 'store.bob.near'?">
        <Option> A. The 'near' account can create it.</Option>
        <Option correct> B. Only the 'bob.near' account can create it.</Option>
        <Option> C. Any account can create it.</Option>
        <Option> D. Only the registrar can create it.</Option>
    </MultipleChoice>
    <MultipleChoice question="What is the difference between a Full Access Key and a Function Call Key?">
        <Option> A. Full Access Keys are free, Function Call Keys cost money.</Option>
        <Option correct> B. Full Access Keys have complete control, Function Call Keys have limited permissions for specific contracts.</Option>
        <Option> C. Full Access Keys work on mainnet, Function Call Keys work on testnet.</Option>
        <Option> D. Full Access Keys are for named accounts, Function Call Keys are for implicit accounts.</Option>
    </MultipleChoice>
    <MultipleChoice question="How do NEAR transaction costs compare to Ethereum?">
        <Option> A. NEAR transactions cost more than Ethereum transactions.</Option>
        <Option correct> B. NEAR transactions cost tenths of a cent, while Ethereum transactions often cost dollars.</Option>
        <Option> C. NEAR and Ethereum have the same transaction costs.</Option>
        <Option> D. NEAR transactions are always free.</Option>
    </MultipleChoice>
</Quiz>


