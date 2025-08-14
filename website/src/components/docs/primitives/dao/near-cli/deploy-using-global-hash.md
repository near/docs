```bash
near contract deploy <account-id> use-global-hash Ea8tHXFSQVszVwGASyzAfLq65DjcRDhkfab4FcPaRpgD \
  with-init-call new \
  json-args '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": ["<account-id>"]}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain \
  send
```
