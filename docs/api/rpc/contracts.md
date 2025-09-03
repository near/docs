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

## Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| [`view_account`](#view-account) | Query account info | Get basic account information |
| [`view_account_changes`](#view-account-changes) | Track account changes | Monitor account state changes |
| [`view_code`](#view-contract-code) | Query contract code | Get deployed contract WASM code |
| [`view_state`](#view-contract-state) | Query contract state | Get contract storage data |
| [`data_changes`](#view-contract-state-changes) | Track state changes | Monitor contract state changes |
| [`contract_code_changes`](#view-contract-code-changes) | Track code changes | Monitor contract deployments |
| [`call_function`](#call-a-contract-function) | Call view functions | Execute read-only contract methods |

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
          "method": "query",
          "params": {
            "request_type": "view_account",
            "finality": "final",
            "account_id": "account.rpc-examples.testnet"
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.query({
          request_type: 'view_account',
          finality: 'final',
          account_id: 'account.rpc-examples.testnet',
        });
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=query \
          params:='{
            "request_type": "view_account",
            "finality": "final",
            "account_id": "account.rpc-examples.testnet"
          }'
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
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "amount": "999788200694421800000000",
      "block_hash": "56xEo2LorUFVNbkFhCncFSWNiobdp1kzm14nZ47b5JVW",
      "block_height": 187440904,
      "code_hash": "11111111111111111111111111111111",
      "locked": "0",
      "storage_paid_at": 0,
      "storage_usage": 410
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---
## View account changes {#view-account-changes}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns account changes from transactions in a given account.

    - **method**: `changes`
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
          "method": "changes",
          "params": {
            "changes_type": "account_changes",
            "account_ids": ["contract.rpc-examples.testnet"],
            "block_id": 187310139
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.accountChanges(['contract.rpc-examples.testnet'], {
          blockId: 187310139,
        });
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://archival-rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=changes \
          params:='{
            "changes_type": "account_changes",
            "account_ids": ["contract.rpc-examples.testnet"],
            "block_id": 187310139
          }'
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
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "block_hash": "8woqfx6kyjgfgU1S2L6Kur27h5jpBtDTmG8vQ8vpAUut",
      "changes": [
        {
          "cause": {
            "receipt_hash": "FseKd4rmjPSAuEz9zh9b5PfUS4jJV4rB6XkeHwVkyXkk",
            "type": "receipt_processing"
          },
          "change": {
            "account_id": "contract.rpc-examples.testnet",
            "amount": "4999184472524996100000000",
            "code_hash": "GVvBFWDPNmomMwXH4LvQW2cRaZJ8N6gxsdBhbJ8ReVJf",
            "locked": "0",
            "storage_paid_at": 0,
            "storage_usage": 81621
          },
          "type": "account_update"
        },
        {
          "cause": {
            "receipt_hash": "FseKd4rmjPSAuEz9zh9b5PfUS4jJV4rB6XkeHwVkyXkk",
            "type": "action_receipt_gas_reward"
          },
          "change": {
            "account_id": "contract.rpc-examples.testnet",
            "amount": "4999212038891301300000000",
            "code_hash": "GVvBFWDPNmomMwXH4LvQW2cRaZJ8N6gxsdBhbJ8ReVJf",
            "locked": "0",
            "storage_paid_at": 0,
            "storage_usage": 81621
          },
          "type": "account_update"
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

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
          "method": "query",
          "params": {
            "request_type": "view_code",
            "finality": "final",
            "account_id": "contract.rpc-examples.testnet"
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.query({
          request_type: 'view_code',
          finality: 'final',
          account_id: 'contract.rpc-examples.testnet',
        });
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=query \
          params:='{
            "request_type": "view_code",
            "finality": "final",
            "account_id": "contract.rpc-examples.testnet"
          }'
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
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "block_hash": "bxucHpnP8VsiB3pLvA7DpBwri9x1DCZxVfBNkrdWbqn",
      "block_height": 187441984,
      "code_base64": "AGFzbQEAAAABugEbYAJ/fwF/YAN/f38Bf2ACf38AYAN/...",
      "hash": "GVvBFWDPNmomMwXH4LvQW2cRaZJ8N6gxsdBhbJ8ReVJf"
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

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
          "method": "query",
          "params": {
            "request_type": "view_state",
            "finality": "final",
            "account_id": "contract.rpc-examples.testnet",
            "prefix_base64": ""
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.query({
          request_type: 'view_state',
          finality: 'final',
          account_id: 'contract.rpc-examples.testnet',
          prefix_base64: '',
        });
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=query \
          params:='{
            "request_type": "view_state",
            "finality": "final",
            "account_id": "contract.rpc-examples.testnet",
            "prefix_base64": ""
          }'
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
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "block_hash": "GN5R7S8mMTEkUT1njWu9jARV29G7izVDjdSNs976BJVw",
      "block_height": 187442491,
      "values": [
        {
          "key": "U1RBVEU=",
          "value": "HQAAAEdyZWV0aW5ncyBmcm9tIE5FQVIgUHJvdG9jb2whAQAAAHI="
        },
        {
          "key": "cgEAAAAAAAAA",
          "value": "FQAAAEhlbGxvLCBOZWFyIFByb3RvY29sIQ=="
        }
      ]
    },
    "id": "dontcare"
  }
  ```

**Note**: Currently, the response includes a `proof` field directly in the
`result`, and a `proof` fields on each element of the `values` list. In
the future, the `result.proof` will be included only if the result is **not empty**,
and the `proof` field will be removed from all `values`. When parsing the result, you
should accept objects with or without these fields set.

</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---
## View contract state changes {#view-contract-state-changes}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns the state change details of a contract based on the key prefix
    (encoded to base64). Pass an empty string for this param if you would like
    to return all state changes.

    - **method**: `changes`
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
          "method": "changes",
          "params": {
            "changes_type": "data_changes",
            "account_ids": ["contract.rpc-examples.testnet"],
            "key_prefix_base64": "",
            "block_id": 187310139
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.contractStateChanges(
          ['contract.rpc-examples.testnet'],
          { blockId: 187310139 },
          ''
        );
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://archival-rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=changes \
          params:='{
            "changes_type": "data_changes",
            "account_ids": ["contract.rpc-examples.testnet"],
            "key_prefix_base64": "",
            "block_id": 187310139
          }'
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
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "block_hash": "8woqfx6kyjgfgU1S2L6Kur27h5jpBtDTmG8vQ8vpAUut",
      "changes": [
        {
          "cause": {
            "receipt_hash": "FseKd4rmjPSAuEz9zh9b5PfUS4jJV4rB6XkeHwVkyXkk",
            "type": "receipt_processing"
          },
          "change": {
            "account_id": "contract.rpc-examples.testnet",
            "key_base64": "U1RBVEU=",
            "value_base64": "HQAAAEdyZWV0aW5ncyBmcm9tIE5FQVIgUHJvdG9jb2whAQAAAHI="
          },
          "type": "data_update"
        },
        {
          "cause": {
            "receipt_hash": "FseKd4rmjPSAuEz9zh9b5PfUS4jJV4rB6XkeHwVkyXkk",
            "type": "receipt_processing"
          },
          "change": {
            "account_id": "contract.rpc-examples.testnet",
            "key_base64": "cgEAAAAAAAAA",
            "value_base64": "FQAAAEhlbGxvLCBOZWFyIFByb3RvY29sIQ=="
          },
          "type": "data_update"
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---
## View contract code changes {#view-contract-code-changes}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns code changes made when deploying a contract. Change is returned is a
    base64 encoded WASM file.

    - **method**: `changes`
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
          "method": "changes",
          "params": {
            "changes_type": "contract_code_changes",
            "account_ids": ["contract.rpc-examples.testnet"],
            "block_id": 187309439
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.contractCodeChanges(
          ['contract.rpc-examples.testnet'],
          { blockId: 187309439 }
        );
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://archival-rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=changes \
          params:='{
            "changes_type": "contract_code_changes",
            "account_ids": ["contract.rpc-examples.testnet"],
            "block_id": 187309439
          }'
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
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "block_hash": "D1ZY3y51Z2v5tXq2nZPmXHgA3zZsPBzbtwHXjCvAEuLV",
      "changes": [
        {
          "cause": {
            "receipt_hash": "AR4cxtxc52WfnZcGEZHmPfQ1Dk3vQNb7vjSyicykfJWZ",
            "type": "receipt_processing"
          },
          "change": {
            "account_id": "contract.rpc-examples.testnet",
            "code_base64": "AGFzbQEAAAABugEbYAJ/fwF/YAN/f38Bf2ACf38AYAN/..."
          },
          "type": "contract_code_update"
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

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
          "method": "query",
          "params": {
            "request_type": "call_function",
            "finality": "final",
            "account_id": "contract.rpc-examples.testnet",
            "method_name": "get_greeting",
            "args_base64": ""
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.query({
          request_type: 'call_function',
          finality: 'final',
          account_id: 'contract.rpc-examples.testnet',
          method_name: 'get_greeting',
          args_base64: '',
        });
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=query \
          params:='{
            "request_type": "call_function",
            "finality": "final",
            "account_id": "contract.rpc-examples.testnet",
            "method_name": "get_greeting",
            "args_base64": ""
          }'
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
    ```json
    {
      "jsonrpc": "2.0",
      "result": {
        "block_hash": "GTZdXfNmnL6TkJFdBeVMHCadgLuKChVfRNCSVsEQoJ7L",
        "block_height": 187444191,
        "logs": [],
        "result": [
          34, 71, 114, 101, 101, 116, 105, 110, 103, 115, 32, 102, 114, 111, 109, 32, 78, 69, 65, 82,
          32, 80, 114, 111, 116, 111, 99, 111, 108, 33, 34
        ]
      },
      "id": "dontcare"
    }
    ```
    
    **Note**: `[34, 71, ..., 33, 34]` is an array of bytes, to be specific it is an ASCII code of
    `"Greetings from NEAR Protocol!"`. `near-sdk-rs` and `near-sdk-js` return JSON-serialized
    results.
  </p>
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

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
          "method": "query",
          "params": {
            "request_type": "call_function",
            "finality": "final",
            "account_id": "contract.rpc-examples.testnet",
            "method_name": "get_record",
            "args_base64": "ewogICJyZWNvcmRfaWQiOiAxCn0="
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.query({
          request_type: 'call_function',
          finality: 'final',
          account_id: 'contract.rpc-examples.testnet',
          method_name: 'get_record',
          args_base64: 'ewogICJyZWNvcmRfaWQiOiAxCn0=',
        });
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=query \
          params:='{
            "request_type": "call_function",
            "finality": "final",
            "account_id": "contract.rpc-examples.testnet",
            "method_name": "get_record",
            "args_base64": "ewogICJyZWNvcmRfaWQiOiAxCn0="
          }'
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
    ```json
    {
      "jsonrpc": "2.0",
      "result": {
        "block_hash": "8Gp8x1ZcanL3C2ris9rgk1nY8v6MuickLWeM6Gj2jGKs",
        "block_height": 187445443,
        "logs": [],
        "result": [
          34, 72, 101, 108, 108, 111, 44, 32, 78, 101, 97, 114, 32, 80, 114, 111, 116, 111, 99, 111,
          108, 33, 34
        ]
      },
      "id": "dontcare"
    }
    ```
    
    **Note**: `[34, 72, ..., 108, 33, 34]` is an array of bytes, to be specific it is an ASCII code
    of `"Hello, Near Protocol!"`. `near-sdk-rs` and `near-sdk-js` return JSON-serialized results.
  </p>
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---

## Error Handling

### Common Error Types

| Error Code | Description | Solution |
|------------|-------------|----------|
| `UnknownAccount` | Account does not exist | Check account ID spelling and existence |
| `InvalidAccount` | Invalid account format | Use valid account ID format (e.g., `account.near`) |
| `UnknownBlock` | Block not found | Use a valid block hash or height |
| `GarbageCollectedBlock` | Block too old | Use archival node or more recent block |
| `TooManyInputs` | Too many accounts in request | Reduce number of accounts per request |
| `NoContractCode` | Account has no contract deployed | Verify the account has a deployed contract |
| `MethodNotFound` | Contract method does not exist | Check method name and contract ABI |
| `InvalidArgs` | Invalid method arguments | Verify args format and encoding |

---

## Best Practices

- **Use specific queries**: Query only the data you need instead of broad state queries
- **Validate inputs**: Always validate method arguments before contract calls