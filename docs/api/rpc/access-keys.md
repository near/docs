---
id: access-keys
title: Access Keys
description: "Retrieve information about an account's access keys using the NEAR RPC API, including viewing keys, listing all keys, and tracking access key changes."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to retrieve information about an account's access keys. Access keys are cryptographic keys that allow actions to be performed on behalf of an account, with different permission levels for security.

## Access Key Types

- **Full Access Keys**: Can perform any action on the account, including deploying contracts, managing other keys, and transferring funds
- **Function Call Keys**: Restricted to calling specific contract methods with limited allowance for gas fees

## Quick Reference

| Method                                                         | Endpoint               | Purpose                              |
|----------------------------------------------------------------|------------------------|--------------------------------------|
| [`view_access_key`](#view-access-key)                          | Query single key       | Get details of a specific access key |
| [`view_access_key_list`](#view-access-key-list)                | Query all keys         | List all access keys for an account  |
| [`single_access_key_changes`](#view-access-key-changes-single) | Track specific changes | Monitor changes to specific keys     |
| [`all_access_key_changes`](#view-access-key-changes-all)       | Track all changes      | Monitor all key changes for accounts |


---

## View access key {#view-access-key}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns information about a single access key for a given account.
  
    If `permission` of the key is `FunctionCall`, it will return more details such as the `allowance`, `receiver_id`, and `method_names`.

    - **method**: `query`
    - **params**:
      - `request_type`: `view_access_key`
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
      - `account_id`: `"example.testnet"`
      - `public_key`: `"ed25519:..."`

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
            "request_type": "view_access_key",
            "finality": "final",
            "account_id": "account.rpc-examples.testnet",
            "public_key": "ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd"
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.query({
          request_type: 'view_access_key',
          finality: 'final',
          account_id: 'account.rpc-examples.testnet',
          public_key: 'ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd',
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
            "request_type": "view_access_key",
            "finality": "final",
            "account_id": "account.rpc-examples.testnet",
            "public_key": "ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd"
          }'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/access-keys/get-account-key.json" />
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
      "block_hash": "J1zkrK8sHuzzV8pkXsEPrZH7SQZeJ2NSEs9L1hSWzVgg",
      "block_height": 187316844,
      "nonce": 187309654000001,
      "permission": {
        "FunctionCall": {
          "allowance": "149788200694421800000000",
          "method_names": [
            "write_record",
            "get_record",
            "get_greeting",
            "__contract_abi",
            "contract_source_metadata"
          ],
          "receiver_id": "contract.rpc-examples.testnet"
        }
      }
    },
    "id": "dontcare"
  }
  ```

</details>

---

## View access key list {#view-access-key-list}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns all access keys for a given account.

    - **method**: `query`
    - **params**:
      - `request_type`: `view_access_key_list`
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
      - `account_id`: `"example.testnet"`

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
        "request_type": "view_access_key_list",
        "finality": "final",
        "account_id": "account.rpc-examples.testnet"
      }
    }
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
    ```js
    const response = await near.connection.provider.query({
      request_type: 'view_access_key_list',
      finality: 'final',
      account_id: 'account.rpc-examples.testnet',
    });
    ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id="dontcare" \
      method=query \
      params:='{
        "request_type": "view_access_key_list",
        "finality": "final",
        "account_id": "account.rpc-examples.testnet"
      }'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/access-keys/get-account-keys.json" />
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
      "block_hash": "29G6xeV4ufkVsY24YZPfiRwLMTNoKrAMitrjg6nvVZqq",
      "block_height": 187319080,
      "keys": [
        {
          "access_key": {
            "nonce": 187309654000000,
            "permission": "FullAccess"
          },
          "public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
        },
        {
          "access_key": {
            "nonce": 187309654000001,
            "permission": {
              "FunctionCall": {
                "allowance": "149788200694421800000000",
                "method_names": [
                  "write_record",
                  "get_record",
                  "get_greeting",
                  "__contract_abi",
                  "contract_source_metadata"
                ],
                "receiver_id": "contract.rpc-examples.testnet"
              }
            }
          },
          "public_key": "ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd"
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>

---

## View access key changes (single) {#view-access-key-changes-single}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns individual access key changes in a specific block. You can query multiple
    keys by passing an array of objects containing the `account_id` and `public_key`.

    - **method**: `changes`
    - **params**:
      - `changes_type`: `single_access_key_changes`
      - `keys`: `[{ account_id, public_key }]`
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
          "changes_type": "single_access_key_changes",
          "keys": [
            {
              "account_id": "account.rpc-examples.testnet",
              "public_key": "ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd"
            }
          ],
          "block_id": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w"
        }
      }
      ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
      ```js
      const response = await near.connection.provider.singleAccessKeyChanges(
        [
          {
            account_id: 'account.rpc-examples.testnet',
            public_key: 'ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd',
          },
        ],
        { blockId: '6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w' },
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
          "changes_type": "single_access_key_changes",
          "keys": [
            {
              "account_id": "account.rpc-examples.testnet",
              "public_key": "ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd"
            }
          ],
          "block_id": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w"
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/access-keys/get-changes-for-account-key.json" />
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
        "block_hash": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w",
        "changes": [
          {
            "cause": {
              "tx_hash": "J3KbUXF9YPu2eGnbDCACxGvmMDZMdP7acGYhVLHGu9y2",
              "type": "transaction_processing"
            },
            "change": {
              "access_key": {
                "nonce": 187309654000001,
                "permission": {
                  "FunctionCall": {
                    "allowance": "142924791772640836536480",
                    "method_names": [
                      "write_record",
                      "get_record",
                      "get_greeting",
                      "__contract_abi",
                      "contract_source_metadata"
                    ],
                    "receiver_id": "contract.rpc-examples.testnet"
                  }
                }
              },
              "account_id": "account.rpc-examples.testnet",
              "public_key": "ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd"
            },
            "type": "access_key_update"
          }
        ]
      },
      "id": "dontcare"
    }
    ```
</details>

---

## View access key changes (all) {#view-access-key-changes-all}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns changes to **all** access keys of a specific block.
    Multiple accounts can be queried by passing an array of `account_ids`.

    - **method**: `changes`
    - **params**:
      - `changes_type`: `all_access_key_changes`
      - `account_ids`: `[ "example.testnet", "example2.testnet"]`
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
          "changes_type": "all_access_key_changes",
          "account_ids": ["account.rpc-examples.testnet"],
          "block_id": 187309655
        }
      }
      ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
      ```js
      const response = await near.connection.provider.accessKeyChanges(['account.rpc-examples.testnet'], {
        blockId: 187309655,
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
          "changes_type": "all_access_key_changes",
          "account_ids": ["account.rpc-examples.testnet"],
          "block_id": 187309655
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/access-keys/get-changes-for-account-keys.json" />
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
        "block_hash": "6EDgS3zF9aoBMfdHqthQTQtudt7JzdLBbkTb6Jn4wfP9",
        "changes": [
          {
            "cause": {
              "receipt_hash": "9meU2ibDyJS2ga4se7j5knsWetKrXaw5qBpwrYgN1Qeh",
              "type": "receipt_processing"
            },
            "change": {
              "access_key": {
                "nonce": 187309654000000,
                "permission": "FullAccess"
              },
              "account_id": "account.rpc-examples.testnet",
              "public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
            },
            "type": "access_key_update"
          },
          {
            "cause": {
              "receipt_hash": "9meU2ibDyJS2ga4se7j5knsWetKrXaw5qBpwrYgN1Qeh",
              "type": "receipt_processing"
            },
            "change": {
              "access_key": {
                "nonce": 187309654000000,
                "permission": {
                  "FunctionCall": {
                    "allowance": "150000000000000000000000",
                    "method_names": [
                      "write_record",
                      "get_record",
                      "get_greeting",
                      "__contract_abi",
                      "contract_source_metadata"
                    ],
                    "receiver_id": "contract.rpc-examples.testnet"
                  }
                }
              },
              "account_id": "account.rpc-examples.testnet",
              "public_key": "ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd"
            },
            "type": "access_key_update"
          }
        ]
      },
      "id": "dontcare"
    }
    ```
</details>

---

## Best Practices

- **Use specific queries**: Use `view_access_key` when you know the exact key instead of listing all keys
- **Cache results**: Access key information does not change frequently, consider caching
- **Batch operations**: When checking multiple keys, use `single_access_key_changes` with multiple keys
- **Archival nodes**: Only use archival endpoints when historical data is required
