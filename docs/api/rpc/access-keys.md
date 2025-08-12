---
id: access-keys
title: Access Keys
description: "Retrieve information about an account's access keys using the NEAR RPC API, including viewing keys, listing all keys, and tracking access key changes."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';


The RPC API enables you to retrieve information about an account's access keys.

---
## View access key {#view-access-key}

Returns information about a single access key for given account.

If `permission` of the key is `FunctionCall`, it will return more details such
as the `allowance`, `receiver_id`, and `method_names`.

- method: `query`
- params:
  - `request_type`: `view_access_key`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_
  - `public_key`: _`"example.testnet's public key"`_

Example:

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

#### What Could Go Wrong?

When API request fails, RPC server returns a structured error response with a
limited number of well-defined error variants, so client code can exhaustively
handle all the possible error cases. Our JSON-RPC errors follow
[verror](https://github.com/joyent/node-verror) convention for structuring
the error response:

```json
{
  "error": {
    "name": <ERROR_TYPE>,
    "cause": {
      "info": {..},
      "name": <ERROR_CAUSE>
    },
    "code": -32000,
    "data": String,
    "message": "Server error"
  },
  "id": "dontcare",
  "jsonrpc": "2.0"
}
```

> **Heads up**
>
> The fields `code`, `data`, and `message` in the structure above are considered
> legacy ones and might be deprecated in the future. Please, don't rely on them.

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE
        <br />
        <code>error.name</code>
      </th>
      <th>
        ERROR_CAUSE
        <br />
        <code>error.cause.name</code>
      </th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="6">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>200</td>
      <td>
        The requested block has not been produced yet or it has been garbage-collected (cleaned up
        to save space on the RPC node)
      </td>
      <td>
        <ul>
          <li>Check that the requested block is legit</li>
          <li>
            If the block had been produced more than 5 epochs ago, try to send your request to{' '}
            <a
              href="https://near-nodes.io/intro/node-types#archival-node"
              target="_blank"
              rel="noopener noreferrer"
            >
              an archival node
            </a>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td>200</td>
      <td>
        The requested <code>account_id</code> is invalid
      </td>
      <td>
        <ul>
          <li>
            Provide a valid <code>account_id</code>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>200</td>
      <td>
        The requested <code>account_id</code> has not been found while viewing since the account has
        not been created or has been already deleted
      </td>
      <td>
        <ul>
          <li>
            Check the <code>account_id</code>
          </li>
          <li>Specify a different block or retry if you request the latest state</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCESS_KEY</td>
      <td>200</td>
      <td>
        The requested <code>public_key</code> has not been found while viewing since the public key
        has not been created or has been already deleted
      </td>
      <td>
        <ul>
          <li>
            Check the <code>public_key</code>
          </li>
          <li>Specify a different block or retry if you request the latest state</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>200</td>
      <td>
        The node was unable to found the requested data because it does not track the shard where
        data is present
      </td>
      <td>
        <ul>
          <li>Send a request to a different node which might track the shard</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>200</td>
      <td>The node is still syncing and the requested block is not in the database yet</td>
      <td>
        <ul>
          <li>Wait until the node finish syncing</li>
          <li>Send a request to a different node which is synced</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>
        Passed arguments can't be parsed by JSON RPC server (missing arguments, wrong format, etc.)
      </td>
      <td>
        <ul>
          <li>Check the arguments passed and pass the correct ones</li>
          <li>
            Check <code>error.cause.info</code> for more details
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
          <li>
            Check <code>error.cause.info</code> for more details
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
---
## View access key list {#view-access-key-list}

You can query <strong>all</strong> access keys for a given account.

- method: `query`
- params:
  - `request_type`: `view_access_key_list`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_

Example:

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

#### What Could Go Wrong?

Here is the exhaustive list of the error variants that can be returned:

When API request fails, RPC server returns a structured error response with a
limited number of well-defined error variants, so client code can exhaustively
handle all the possible error cases. Our JSON-RPC errors follow
[verror](https://github.com/joyent/node-verror) convention for structuring
the error response:

```json
{
  "error": {
    "name": <ERROR_TYPE>,
    "cause": {
      "info": {..},
      "name": <ERROR_CAUSE>
    },
    "code": -32000,
    "data": String,
    "message": "Server error"
  },
  "id": "dontcare",
  "jsonrpc": "2.0"
}
```

> **Heads up**
>
> The fields `code`, `data`, and `message` in the structure above are considered
> legacy ones and might be deprecated in the future. Please, don't rely on them.


---
## View access key changes (single) {#view-access-key-changes-single}

Returns individual access key changes in a specific block. You can query multiple
keys by passing an array of objects containing the `account_id` and `public_key`.

- method: `EXPERIMENTAL_changes`
- params:
  - `changes_type`: `single_access_key_changes`
  - `keys`: `[{ account_id, public_key }]`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)

Example:

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "EXPERIMENTAL_changes",
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
        method=EXPERIMENTAL_changes \
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

#### What Could Go Wrong?{#what-could-go-wrong-2}

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE
        <br />
        <code>error.name</code>
      </th>
      <th>
        ERROR_CAUSE
        <br />
        <code>error.cause.name</code>
      </th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>200</td>
      <td>
        The requested block has not been produced yet or it has been garbage-collected (cleaned up
        to save space on the RPC node)
      </td>
      <td>
        <ul>
          <li>Check that the requested block is legit</li>
          <li>
            If the block had been produced more than 5 epochs ago, try to send your request to{' '}
            <a
              href="https://near-nodes.io/intro/node-types#archival-node"
              target="_blank"
              rel="noopener noreferrer"
            >
              an archival node
            </a>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>200</td>
      <td>The node is still syncing and the requested block is not in the database yet</td>
      <td>
        <ul>
          <li>Wait until the node finish syncing</li>
          <li>Send a request to a different node which is synced</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>
        Passed arguments can't be parsed by JSON RPC server (missing arguments, wrong format, etc.)
      </td>
      <td>
        <ul>
          <li>Check the arguments passed and pass the correct ones</li>
          <li>
            Check <code>error.cause.info</code> for more details
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
          <li>
            Check <code>error.cause.info</code> for more details
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---
## View access key changes (all) {#view-access-key-changes-all}

Returns changes to <strong>all</strong> access keys of a specific block.
Multiple accounts can be quereied by passing an array of `account_ids`.

- method: `EXPERIMENTAL_changes`
- params:
  - `changes_type`: `all_access_key_changes`
  - `account_ids`: `[ "example.testnet", "example2.testnet"]`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)

Example:

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "EXPERIMENTAL_changes",
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
        method=EXPERIMENTAL_changes \
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

#### What Could Go Wrong?{#what-could-go-wrong-3}

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE
        <br />
        <code>error.name</code>
      </th>
      <th>
        ERROR_CAUSE
        <br />
        <code>error.cause.name</code>
      </th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>200</td>
      <td>
        The requested block has not been produced yet or it has been garbage-collected (cleaned up
        to save space on the RPC node)
      </td>
      <td>
        <ul>
          <li>Check that the requested block is legit</li>
          <li>
            If the block had been produced more than 5 epochs ago, try to send your request to{' '}
            <a
              href="https://near-nodes.io/intro/node-types#archival-node"
              target="_blank"
              rel="noopener noreferrer"
            >
              an archival node
            </a>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>200</td>
      <td>The node is still syncing and the requested block is not in the database yet</td>
      <td>
        <ul>
          <li>Wait until the node finish syncing</li>
          <li>Send a request to a different node which is synced</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>
        Passed arguments can't be parsed by JSON RPC server (missing arguments, wrong format, etc.)
      </td>
      <td>
        <ul>
          <li>Check the arguments passed and pass the correct ones</li>
          <li>
            Check <code>error.cause.info</code> for more details
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
          <li>
            Check <code>error.cause.info</code> for more details
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---
