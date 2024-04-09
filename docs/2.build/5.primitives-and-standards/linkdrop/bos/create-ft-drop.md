```js
const keypomContract = "v2.keypom.near";
const ftContract = "ft.primitives.near";
const dropAmount = "10000000000000000000000";

Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: dropAmount,
      ftData: {
	    	contractId: ftContract,
	    	senderId: accountId,
	    	// This balance per use is balance of human readable FTs per use. 
	    	amount: "1"
        // Alternatively, you could use absoluteAmount, which is dependant on the decimals value of the FT
        // ex. if decimals of an ft = 8, then 1 FT token would be absoluteAmount = 100000000
	    },
    },
    deposit: "23000000000000000000000", // state.publicKeys.length * dropAmount + 3000000000000000000000,
    gas: "100000000000000"
  },
]);
```