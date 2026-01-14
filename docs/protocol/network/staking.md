---
id: staking
title: Validator Staking
sidebar_label: Staking
description: "Learn how to stake NEAR, delegate to validators, track rewards, and withdraw staked tokens safely."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs"

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

NEAR uses a Proof-of-Stake (PoS), meaning that users chose the active node validators by delegating their tokens to them.

In this article you'll find a detailed explanation of the staking process, including delegating, viewing balances, and withdrawing using the [NEAR CLI](../../tools/cli.md).

:::note Contract source code
You can review the Staking pool smart contract source code in [this GitHub repository](https://github.com/near/core-contracts/tree/master/staking-pool).
:::

---

## Delegate NEAR tokens

Before delegating, you need to choose a validator (a node that participates in staking).

Check [NearBlocks](https://nearblocks.io/node-explorer), [Pikespeak](https://pikespeak.ai/validators/overview) or [Near Staking](https://near-staking.com/), and look for validators with a good track record, uptime, and reasonable commission rates.

<details>

  <summary> List validators using CLI </summary>

  If you prefer, you can get the list of current validators by using the [`near-validator`](../../tools/cli.md#validator-extension) CLI:

  ```sh
  near-validator validators network-config mainnet now
  ```

</details>

<hr class="subsection" />

### Stake Tokens

<Tabs groupId="cli-commands">
  <TabItem value="Staking CLI">
    ```sh
    near staking delegation <user-account.near> deposit-and-stake '100 NEAR' <my_validator> network-config mainnet sign-with-keychain
    ```
  </TabItem>
  <TabItem value="Function Call">
    ```sh
    near call <my_validator> deposit_and_stake --useAccount <user-account.near> --deposit 100
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/staking/deposit-and-stake.json" />
  </TabItem>
</Tabs>

:::tip

You will start earning staking rewards after the next epoch (approximately 12 hours)

:::

<hr class="subsection" />

### Staked Balance
To check your staked balance on the `<my_validator>` pool for the `<user-account.near>` account, run the following command:

<Tabs groupId="cli-commands">
  <TabItem value="Staking CLI">
    ```sh
    near staking delegation <user-account.near> view-balance <my_validator> network-config mainnet now
    ```
  </TabItem>
  <TabItem value="Function Call">
    ```sh
    near view <my_validator> get_account_staked_balance '{"account_id": "<user-account.near>"}'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/staking/account-staked-balance.json" />
  </TabItem>
</Tabs>

<details>
  <summary>Staking pool balances</summary>

  You can view additional information and balances from the staking pool using the following CLI commands:

  #### Total staked balance of the entire pool
  <Tabs groupId="cli-commands">
    <TabItem value="🖥️ CLI" label="🖥️ CLI">
      ```sh
      near view <my_validator> get_total_staked_balance '{}'
      ```
    </TabItem>
    <TabItem value="Lantstool" label={<LantstoolLabel />}>
      <TryOutOnLantstool path="docs/2.build/5.primitives/staking/pool-total-staked-balance.json" />
    </TabItem>
  </Tabs>


  #### Owner of the staking pool
  <Tabs groupId="cli-commands">
    <TabItem value="🖥️ CLI" label="🖥️ CLI">
      ```sh
      near view <my_validator> get_owner_id '{}'
      ```
    </TabItem>
    <TabItem value="Lantstool" label={<LantstoolLabel />}>
      <TryOutOnLantstool path="docs/2.build/5.primitives/staking/pool-owner.json" />
    </TabItem>
  </Tabs>


  #### Current reward fee
  <Tabs groupId="cli-commands">
    <TabItem value="🖥️ CLI" label="🖥️ CLI">
      ```sh
      near view <my_validator> get_reward_fee_fraction '{}'
      ```
    </TabItem>
    <TabItem value="Lantstool" label={<LantstoolLabel />}>
      <TryOutOnLantstool path="docs/2.build/5.primitives/staking/reward-fee.json" />
    </TabItem>
  </Tabs>


  #### Owner's balance
  <Tabs groupId="cli-commands">
    <TabItem value="🖥️ CLI" label="🖥️ CLI">
      ```sh
      near view <my_validator> get_account_total_balance '{"account_id": "owner"}'
      ```
    </TabItem>
    <TabItem value="Lantstool" label={<LantstoolLabel />}>
      <TryOutOnLantstool path="docs/2.build/5.primitives/staking/owner-balance.json" />
    </TabItem>
  </Tabs>


  #### Staking key
  <Tabs groupId="cli-commands">
    <TabItem value="🖥️ CLI" label="🖥️ CLI">
      ```sh
      near view <my_validator> get_staking_key '{}'
      ```
    </TabItem>
    <TabItem value="Lantstool" label={<LantstoolLabel />}>
      <TryOutOnLantstool path="docs/2.build/5.primitives/staking/staking-key.json" />
    </TabItem>
  </Tabs>

</details>

---

## Withdrawing Staked Tokens

To withdraw your staked tokens, you will first need to "un-delegate" them from the validator.

Your tokens will enter a 4 epoch (~24 hours) unbonding period before they can be withdrawn.

<hr class="subsection" />

### Unstake Tokens

<Tabs groupId="cli-commands">
  <TabItem value="Staking CLI">

```sh
near staking delegation <user-account.near> unstake '1 NEAR' <my_validator> network-config mainnet sign-with-keychain
```

:::info

Use the `unstake-all` command to to unstake all tokens at once:

```sh
near staking delegation <user-account.near> unstake-all <my_validator> network-config mainnet sign-with-keychain
```

:::

  </TabItem>
  <TabItem value="Function Call">

    ```sh
    near call <my_validator> unstake '{"amount": "100000000000000000000000000"}' --useAccount <user-account.near>
    ```

    :::info
    Call the `unstake_all` method to unstake all tokens at once
    :::

  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/staking/unstake.json" />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Query Unstaked Balance

<Tabs groupId="cli-commands">
  <TabItem value="Staking CLI">

```sh
near staking delegation <user-account.near> view-balance <my_validator> network-config mainnet now
```

  </TabItem>
  <TabItem value="Function Call">

```sh
near view <my_validator> get_account_unstaked_balance '{"account_id": "<user-account.near>"}'
```

  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/staking/account-unstaked-balance.json" />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Withdraw Tokens

Once the unbonding period has passed, you can withdraw your unstaked tokens:

<Tabs groupId="cli-commands">
  <TabItem value="Staking CLI">

```sh
near staking delegation <user-account.near> withdraw '1 NEAR' <my_validator> network-config mainnet sign-with-keychain
```

:::info

If you want to withdraw all available tokens, you can use the `withdraw-all` command:

```sh
near staking delegation <user-account.near> withdraw-all <my_validator> network-config mainnet sign-with-keychain
```

:::

  </TabItem>
  <TabItem value="Function Call">

```sh
near call <my_validator> withdraw '{"amount": "100000000000000000000000000"}' --useAccount <user-account.near>
```

  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/staking/withdraw-unstaked-tokens.json" />
  </TabItem>
</Tabs>

---

## Tools and Resources

- Supported wallets for staking and managing your tokens:
  - [Ecosystem Wallets](https://wallet.near.org/)
- To explore validators and staking pools:
  - [NearBlocks](https://nearblocks.io/)
  - [Pikespeak](https://pikespeak.ai/)
  - [NEAR Staking](https://near-staking.com/)
