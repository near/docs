<Blockchain>

```ts
// Functions to interact with the NEAR network
const { keyStores: { InMemoryKeyStore }, Near, KeyPair, Account,
				Contract, utils: {format: { parseNearAmount } }, transactions: { deployContract } } = nearAPI
const BN = require('bn.js')
const fs = require("fs")

// Load credentials
const credPath = `./neardev/${nearConfig.networkId}/${nearConfig.contractName}.json`

let credentials
try {
	credentials = JSON.parse(fs.readFileSync(credPath));
} catch(e) {
	console.warn(e)
	/// attempt to load backup creds from local machine
	credentials = JSON.parse(
		fs.readFileSync(
			`${process.env.HOME}/.near-credentials/${nearConfig.networkId}/${nearConfig.contractName}.json`
		)
	);
}

// Create an InMemoryKeyStore
const keyStore = new InMemoryKeyStore();

keyStore.setKey(
	nearConfig.networkId,
	nearConfig.contractName,
	KeyPair.fromString(credentials.private_key)
);

// Connect to the NEAR blockchain
const near = new Near({
	networkId: nearConfig.networkId, nodeUrl:nearConfig.nodeUrl, deps: { keyStore } 
});

// Aux function to create accounts
const DEFAULT_NEW_ACCOUNT_AMOUNT = "20"

async function createAccount(accountId, fundingAmount = DEFAULT_NEW_ACCOUNT_AMOUNT, secret) {
	const contractAccount = new Account(near.connection, nearConfig.contractName);
	const newKeyPair = secret ? KeyPair.fromString(secret) : KeyPair.fromRandom('ed25519');
	await contractAccount.createAccount(accountId, newKeyPair.publicKey, new BN(parseNearAmount(fundingAmount)));
	keyStore.setKey(nearConfig.networkId, accountId, newKeyPair);
	return new Account(near.connection, accountId);
}

// Get the account or create it if it doesn't exists
async function getOrCreateAccount(accountId) {
	// accountId must be with `${something}.${contractName}`
	const account = new Account(near.connection, accountId);
	try {
		await account.state();
		return account;
	} catch(e) {
		if (!/does not exist/.test(e.toString())) {
			throw e;
		}
	}
	return await createAccount(accountId);
};

// Create Contract
async function create_contract(accountId, viewMethods, changeMethods){
	let account = await getOrCreateAccount(accountId)
	const contractMethods = { viewMethods, changeMethods };
	return new Contract(account, nearConfig.contractName, contractMethods);
}

wallet_balance = async function (account_id) {
	let account = await near.account(account_id)
	let balance = await account.getAccountBalance()
	balance.total = parseFloat(formatNearAmount(balance.total))
	balance.available = parseFloat(formatNearAmount(balance.available))
	return balance
}

module.exports = {create_contract, wallet_balance}
```

</Blockchain>