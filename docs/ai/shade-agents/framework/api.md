---
id: api
title: Shade Agent API
sidebar_label: Shade Agent API
description: "TODO"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/codetabs"

The Shade Agent API abstracts away the complexity of the TEE and interacting with the agent contract. The API is packaged as a Docker image and included in your agent when uploaded to Phala Cloud. The API is accessible internally by default on port 3140, it is not accessible from outside the TEE.

When the API image boots up it will automatically create the agents account, fund it with the NEAR_ACCOUNT_ID from the environment variables and register the agent in the agent contract.

The API can be used in any language but we maintain API wrappers in TypeScript and Python. We recommend your develop in TypeScript as it has great synergies with [chainsig.js](../../../chain-abstraction/chain-signatures/implementation.md) for building multichain transactions.

---

## Setup 

<Tabs groupId="code-tabs">

  <TabItem value="typescript" label="🌐 TypeScript">
   
    ```bash
    npm install @neardefi/shade-agent-js
    ```
   
  </TabItem>

  <TabItem value="python" label="🐍 Python">

    ```bash
    pip install shade-agent-py
    ```

  </TabItem>

  <TabItem value="other-languages" label="💻 Other Languages">

    You can use the Shade Agent API directly with any language that supports HTTP requests. The base API endpoints change depending on your deployment:

    **Local Development:**
    ```
    http://localhost:3140/api/agent
    ```

    **Production (TEE):**
    ```
    http://shade-agent-api:3140/api/agent
    ```

    All endpoints expect POST requests with JSON payloads and return JSON responses.

    If you are running your API on a port other than 3140 you should ammend the base URL accordingly.

  </TabItem>

</Tabs>

---

## Agent Account ID

Fetches the NEAR account ID of the agent.

<Tabs groupId="code-tabs">

  <TabItem value="typescript" label="🌐 TypeScript">
   
    ```ts
    import { agentAccountId } from '@neardefi/shade-agent-js';

    const res = await agentAccountId();
    const accountId = res.accountId
    ```
   

  </TabItem>

  <TabItem value="python" label="🐍 Python">

    ```py
    from shade_agent import agent_account_id
    
    res = await agent_account_id()
    account_id = res["account_id"]
    ```

  </TabItem>

  <TabItem value="other-languages" label="💻 Other Languages">

    **POST /getAccountId**

    Request body
    ```json
    {}
    ```

    Response
    ```json
    {
      "accountId": "14bc8ee18f2d1ef51e7d581bdd96797804c56247733defdae67ad41314686fd7"
    }
    ```

  </TabItem>

</Tabs>

---

## Agent Info

Fetches the code hash and checksum for the agent.
- The `code hash` is the code hash of the app image running inside the agent.
- The `checksum` is produced by the TEEs attestation and represents that the agent is registered.

This function will only return the details once the agent has successfully registered in the agent contract. For running the API locally it will only return the code hash not the checksum.

<Tabs groupId="code-tabs">

  <TabItem value="typescript" label="🌐 TypeScript">
   
    ```ts
    import { agentInfo } from '@neardefi/shade-agent-js';

    const res = await agentInfo();
    const codehash = res.codehash
    const checksum = res.checksum
    ```
   

  </TabItem>

  <TabItem value="python" label="🐍 Python">

    ```py
    from shade_agent import agent_info
    
    res = await agent_info()
    codehash = res["codehash"]
    checksum = res["checksum"]
    ```

  </TabItem>

  <TabItem value="other-languages" label="💻 Other Languages">

    **POST /view**

    Request body
    ```json
    {
      "methodName": "get_agent",
      "args": {
        "account_id": "14bc8ee18f2d1ef51e7d581bdd96797804c56247733defdae67ad41314686fd7"
      }
    }
    ```

    Response
    ```json
    {
      "codehash": "03bcd36d3ffb5346c9e1e0166a4c2734a9e7cceedee6f7d992499aeb7fa54ead",
      "checksum": "0c32c5c598bc8a3bfec47f3d7d9a9d600c8a60e5b97d90a4c2856a7c829eb6d4"
    }
    ```

  </TabItem>

</Tabs>

---

## Agent Balance 

Fetches the NEAR balance of the agent's account in yoctoNEAR (1 NEAR = 10^24 yoctoNEAR).

<Tabs groupId="code-tabs">

  <TabItem value="typescript" label="🌐 TypeScript">
   
    ```ts
    import { agent } from '@neardefi/shade-agent-js';

    const res = await agent("getBalance");
    const balance = res.balance
    ```
   

  </TabItem>

  <TabItem value="python" label="🐍 Python">

    ```py
    from shade_agent import agent
    
    res = await agent("getBalance")
    balance = res["balance"]
    ```

  </TabItem>

  <TabItem value="other-languages" label="💻 Other Languages">

    **POST /getBalance**

    Request body
    ```json
    {}
    ```

    Response
    ```json
    {
      "balance": "203436730084671139765003"
    }
    ```

  </TabItem>

</Tabs>

---

## Request Signature

Requests a signature from the Shade Agent system for a multichain account. It has three arguments:
- **path** - An string that maps the signature to a specific account, the path can be set to anything and by changing the path you will be signing for a different account.
- **payload** - The hash of the transaction to be signed, given as a hex string.
- **keyType** - The signature scheme being used to sign the payload `Ecdsa` (secp256k1) or `Eddsa` (ed25519). 

It returns the signature for the transaction.

<Tabs groupId="code-tabs">

  <TabItem value="typescript" label="🌐 TypeScript">
   
    ```ts
    import { requestSignature } from '@neardefi/shade-agent-js';

    const res = await requestSignature({
      path: "ethereum-1",
      payload: "cf80cd8a...",
      keyType: "Ecdsa", // Or "Eddsa"
    });
    ```

    <details>
    <summary>Response</summary>

        For `Ecdsa` the function returns the components of the signature as hex strings. Note that to get r remove the first two hex characters from big_r.

        ```typescript
        {
          scheme: 'Secp256k1',
          big_r: {
            affine_point: '03D537AFFD52BE9AF0DA6CF41B573F4BE065434AEE2D25A500BC730C06E7EB2AF1'
          },
          s: {
            scalar: '3470037EB46DC6D1921900B635785290184EC980CFEC7109EB103B5698D4F725'
          },
          recovery_id: 0
        }
        ```

        For `Eddsa` the function returns the whole signature as a 64-byte array.

        ```typescript
        {
          scheme: 'Ed25519',
          signature: [
              5, 105,  30, 208, 192,  39, 154, 105, 252,  20, 132,
              64, 247, 207, 223, 127, 197,  43,  30, 145, 164, 224,
              1,  45, 240,  28, 155, 218, 204,   5, 136, 111, 238,
              40, 120, 122, 249, 166, 193, 174, 120,  94, 177,  39,
              179, 193, 170, 117,  37,  36, 155,  38,  72,  24, 118,
              235, 187, 110, 129,  26, 186,   7,   0,   8
          ]
        }
        ```

        If your using the chainsig.js library you don't need to worry about the format of these responses since the library handles it.

    </details>

  </TabItem>

  <TabItem value="python" label="🐍 Python">

    ```py
    from shade_agent import request_signature

    res = await request_signature(
      path="ethereum-1", 
      payload="cf80cd8a...", 
      key_type="Ecdsa", # Or "Eddsa"
    )
    ```

    <details>
    <summary>Response</summary>

        For `Ecdsa` the function returns the components of the signature as hex strings. Note that to get r remove the first two hex characters from big_r.

        ```python
        {
          'scheme': 'Secp256k1',
          'big_r': {
            'affine_point': '03D537AFFD52BE9AF0DA6CF41B573F4BE065434AEE2D25A500BC730C06E7EB2AF1'
          },
          's': {
            'scalar': '3470037EB46DC6D1921900B635785290184EC980CFEC7109EB103B5698D4F725'
          },
          'recovery_id': 0
        }
        ```

        For `Eddsa` the function returns the whole signature as a 64-byte array.

        ```python
        {
          'scheme': 'Ed25519',
          'signature': [
            5, 105,  30, 208, 192,  39, 154, 105, 252,  20, 132,
            64, 247, 207, 223, 127, 197,  43,  30, 145, 164, 224,
            1,  45, 240,  28, 155, 218, 204,   5, 136, 111, 238,
            40, 120, 122, 249, 166, 193, 174, 120,  94, 177,  39,
            179, 193, 170, 117,  37,  36, 155,  38,  72,  24, 118,
            235, 187, 110, 129,  26, 186,   7,   0,   8
          ]
        }
        ```

    </details>

  </TabItem>

  <TabItem value="other-languages" label="💻 Other Languages">

    **POST /call**

    Request body
    ```json
    {
      "methodName": "request_signature",
      "args": {
        "path": "ethereum-1",
        "payload": "cf80cd8a...",
        "key_type": "Ecdsa"
      }
    }
    ```

<details>
  <summary>Response</summary>

    For `Ecdsa` the function returns the components of the signature as hex strings. Note that to get r remove the first two hex characters from big_r.

    ```json
    {
      "scheme": "Secp256k1",
      "big_r": {
        "affine_point": "03D537AFFD52BE9AF0DA6CF41B573F4BE065434AEE2D25A500BC730C06E7EB2AF1"
      },
      "s": {
        "scalar": "3470037EB46DC6D1921900B635785290184EC980CFEC7109EB103B5698D4F725"
      },
      "recovery_id": 0
    }
    ```

    For `Eddsa` the function returns the whole signature as a 64-byte array.

    ```json
    {
      "scheme": "Ed25519",
      "signature": [
        5, 105,  30, 208, 192,  39, 154, 105, 252,  20, 132,
        64, 247, 207, 223, 127, 197,  43,  30, 145, 164, 224,
        1,  45, 240,  28, 155, 218, 204,   5, 136, 111, 238,
        40, 120, 122, 249, 166, 193, 174, 120,  94, 177,  39,
        179, 193, 170, 117,  37,  36, 155,  38,  72,  24, 118,
        235, 187, 110, 129,  26, 186,   7,   0,   8
      ]
    }
    ```

</details>

  </TabItem>

</Tabs>

---

## Agent Call

Makes a function call to the agent contract from the agent. This is used for custom contracts when you want to call a function other than request_signature. It returns the result of the function call.

<Tabs groupId="code-tabs">

  <TabItem value="typescript" label="🌐 TypeScript">
   
    ```ts
    import { agentCall } from '@neardefi/shade-agent-js';

    const res = await agentCall({
      methodName: "example_call_method",
      args: {
        arg1: "Value1",
        arg2: "Value2",
      },
      gas: "30000000000000", // Optional 
    })
    ```

  </TabItem>

  <TabItem value="python" label="🐍 Python">

    ```py
    from shade_agent import agent_call

    res = await agent_call({
      "methodName": "example_call_method",
      "args": {
        "arg1": "Value1",
        "arg2": "Value2,
      },
      "gas": "30000000000000", # Optional
    })
    ```

  </TabItem>

  <TabItem value="other-languages" label="💻 Other Languages">

    **POST /call**

    Request body
    ```json
    {
      "methodName": "example_call_method",
      "args": {
        "arg1": "value1",
        "arg2": "value2"
      },
      "gas": "30000000000000" // Optional
    }
    ```

  </TabItem>

</Tabs>
    

---

## Agent View

Makes a function call to a view method (a method that does not require gas) on the agent contract. It returns the result of the function call. 

<Tabs groupId="code-tabs">

  <TabItem value="typescript" label="🌐 TypeScript">
   
    ```ts
    import { agentView } from '@neardefi/shade-agent-js';

    const res = await agentView({
      methodName: "example_view_method",
      args: {
        arg1: "value1",
        arg2: "value2",
      },
    })
    ```

  </TabItem>

  <TabItem value="python" label="🐍 Python">

    ```py
    from shade_agent import agent_view

    res = await agent_view({
      "methodName": "example_view_method",
      "args": {
        "arg1": "value1",
        "arg2": "value2",
      },
    })
    ```

  </TabItem>

  <TabItem value="other-languages" label="💻 Other Languages">

    **POST /view**

    Request body
    ```json
    {
      "methodName": "example_view_method",
      "args": {
        "arg1": "value1",
        "arg2": "value2"
      }
    }
    ```

  </TabItem>

</Tabs>