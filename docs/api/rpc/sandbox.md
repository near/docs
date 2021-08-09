---
id: sandbox
title: RPC Endpoints
sidebar_label: Sandbox
---

## Sandbox

<blockquote class="warning">
<strong>heads up</strong><br><br>

RPC endpoints in this section are ***only*** available on the local sandbox node.

</blockquote>

---

### Patch State

> Patch account, access keys, contract code, or contract state. Only additions and mutations are supported. No deletions.
Account, access keys, contract code, and contract states have different formats. See the example for details about their format.
- method: `sandbox_patch_state`
- params:
  - `records`: an array of state records to patch. Every state record can be one of `Account`, `AccessKey`, `Contract` (for contract code), or `Data` (for contract state).

Example:

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "sandbox_patch_state",
  "params": {
    "records": [
      {
        "Account": {
          "account_id": "abcdef.test.near",
          "account": {
            "amount": "100000000000",
            "locked": "0",
            "code_hash": "7KoFshMQkdyo5iTx8P2LbLu9jQpxRn24d27FrKShNVXs",
            "storage_usage": 200000
          }
        }
      },
      {
        "Contract": {
          "account_id": "abcdef.test.near",
          "code": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="
        }
      },
      {
        "AccessKey": {
          "account_id": "abcdef.test.near",
          "public_key": "ed25519:CngrirkGDwSS75EKczcsUsciRtMmHd9iicrrYxz4uckD",
          "access_key": {
            "nonce": 0,
            "permission": "FullAccess"
          }
        }
      },
      {
        "Data": {
          "account_id": "abcdef.test.near",
          "data_key": "U1RBVEU=",
          "value": "AwAAAA8AAABhbGljZS50ZXN0Lm5lYXIFAAAAaGVsbG8NAAAAYm9iLnRlc3QubmVhcgUAAAB3b3JsZAoAAABhbGljZS5uZWFyCwAAAGhlbGxvIHdvcmxk"
        }
      }
    ]
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

<details><summary>Example response:</summary>
<p>

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {}
}
```

</p>
</details>

---
