---
id: contracts
title: Accounts / Contracts
description: "View details about accounts and contracts, check contract state and code, and perform contract function calls using NEAR RPC API."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to view details about accounts and contracts as well as perform contract calls.

---
## View account {#view-account}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns basic account information.

    - **method**: `query`
    - **params**:
      - `request_type`: `view_account`
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
      - `account_id`: _`"example.testnet"`_
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "method_name",
          "params": {}
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.methodName();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=method_name \
          params:='{}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/contracts/get-account.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
</details>

---
## View account changes {#view-account-changes}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns account changes from transactions in a given account.

    - **method**: `EXPERIMENTAL_changes`
    - **params**:
      - `changes_type`: `account_changes`
      - `account_ids`: [`"example.testnet"`]
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "method_name",
          "params": {}
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.methodName();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=method_name \
          params:='{}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
         <TryOutOnLantstool path="docs/5.api/rpc/contracts/get-account-changes.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response: </summary>
  
</details>
---
## View contract code {#view-contract-code}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns the contract code (Wasm binary) deployed to the account.
    Please note that the returned code will be encoded in base64.

    - **method**: `query`
    - **params**:
      - `request_type`: `view_code`
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
      - `account_id`: `"example.testnet"`,
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "method_name",
          "params": {}
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.methodName();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=method_name \
          params:='{}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/contracts/get-contract-wasm.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response: </summary>
  
</details>
---
## View contract state {#view-contract-state}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns the state (key value pairs) of a contract based on the key prefix
    (base64 encoded). Pass an empty string for `prefix_base64` if you would like
    to return the entire state. Please note that the returned state will be base64
    encoded as well.

    - **method**: `query`
    - **params**:
      - `request_type`: `view_state`
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
      - `account_id`: `"example.testnet"`,
      - `prefix_base64`: `""`
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "method_name",
          "params": {}
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.methodName();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=method_name \
          params:='{}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
         <TryOutOnLantstool path="docs/5.api/rpc/contracts/get-contract-state.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  

**Note**: Currently, the response includes a `proof` field directly in the
`result`, and a `proof` fields on each element of the `values` list. In
the future, the `result.proof` will be included only if the result is **not empty**,
and the `proof` field will be removed from all `values`. When parsing the result, you
should accept objects with or without these fields set.

</details>

---
## View contract state changes {#view-contract-state-changes}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns the state change details of a contract based on the key prefix
    (encoded to base64). Pass an empty string for this param if you would like
    to return all state changes.

    - **method**: `EXPERIMENTAL_changes`
    - **params**:
      - `changes_type`: `data_changes`
      - `account_ids`: `["example.testnet"]`,
      - `key_prefix_base64`: `"base64 encoded key value"`,
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "method_name",
          "params": {}
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.methodName();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=method_name \
          params:='{}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
         <TryOutOnLantstool path="docs/5.api/rpc/contracts/get-contract-state-changes.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
</details>

---
## View contract code changes {#view-contract-code-changes}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns code changes made when deploying a contract. Change is returned is a
    base64 encoded WASM file.

    - **method**: `EXPERIMENTAL_changes`
    - **params**:
      - `changes_type`: `contract_code_changes`
      - `account_ids`: `["example.testnet"]`,
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "method_name",
          "params": {}
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.methodName();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=method_name \
          params:='{}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/contracts/get-contract-wasm-changes.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
</details>

---
## Call a contract function {#call-a-contract-function}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Allows you to call a contract method as a [view function](../../tools/near-cli#contract).

    - **method**: `query`
    - **params**:
      - `request_type`: `call_function`
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
      - `account_id`: _`"example.testnet"`_
      - `method_name`: `get_method_name` (example [`view` methods](https://github.com/near/core-contracts/blob/master/staking-pool/src/lib.rs#L317))
      - `args_base64`: `method_arguments_base_64_encoded`
  </SplitLayoutLeft>
  <SplitLayoutRight title="get_greeting example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "method_name",
          "params": {}
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.methodName();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=method_name \
          params:='{}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/contracts/call-get_greeting.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  <p>
    
    **Note**: `[34, 71, ..., 33, 34]` is an array of bytes, to be specific it is an ASCII code of
    `"Greetings from NEAR Protocol!"`. `near-sdk-rs` and `near-sdk-js` return JSON-serialized
    results.
  </p>
</details>

---

<SplitLayoutContainer>
  <SplitLayoutLeft title="get_record example">
    The `args_base64` in this example can be decoded as

    ```json
    {
      "record_id": 1
    }
    ```
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "method_name",
          "params": {}
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.methodName();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=method_name \
          params:='{}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/contracts/call-get_record.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  <p>
    
    **Note**: `[34, 72, ..., 108, 33, 34]` is an array of bytes, to be specific it is an ASCII code
    of `"Hello, Near Protocol!"`. `near-sdk-rs` and `near-sdk-js` return JSON-serialized results.
  </p>
</details>
---
