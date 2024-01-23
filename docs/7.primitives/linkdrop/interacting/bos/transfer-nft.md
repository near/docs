```js
const nftTokenId = "1";

Near.call([{
  contractName: nftContract, 
  methodName: 'nft_transfer_call', 
  args: {
    receiver_id: keypomContract,
    token_id: nftTokenId,
    msg: dropId.toString()
  },
  deposit: "1",
  gas: "300000000000000"
}]);
```