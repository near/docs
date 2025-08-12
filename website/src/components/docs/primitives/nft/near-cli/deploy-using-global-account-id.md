```bash
near contract deploy <account-id> use-global-account-id nft.globals.primitives.testnet \
  with-init-call new \
  json-args '{"owner_id": "<account-id>", "metadata": {"spec": "nft-1.0.0", "name": "MY_NFT", "symbol": "NFT2000", "icon": "data:image/svg+xml,%3Csvg xmlns='\''http://www.w3.org/2000/svg'\'' viewBox='\''0 0 288 288'\''%3E%3Cg id='\''l'\'' data-name='\''l'\''%3E%3Cpath d='\''M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'\''/%3E%3C/g%3E%3C/svg%3E"}}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain \
  send
```
