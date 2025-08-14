```bash
near contract deploy <account-id> use-global-account-id dao.globals.primitives.testnet \
  with-init-call new \
  json-args '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": ["<account-id>"]}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain \
  send
```
