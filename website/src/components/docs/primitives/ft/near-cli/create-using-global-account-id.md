```bash
near contract deploy <account-id> use-global-account-id ft.globals.primitives.testnet \
  with-init-call \
  new_default_meta \
  json-args '{"owner_id": "<account-id>", "total_supply": "100000000000000000000000000000"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain send
```
