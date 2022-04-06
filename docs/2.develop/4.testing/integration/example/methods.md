<Methods>

```js
const { near, create_contract } = require('./utils')
const { utils: { format: { formatNearAmount, parseNearAmount } }, } = nearAPI

const MGAS = 300000000000000

wallet_balance = async function (account_id) {
	let account = await near.account(account_id)
	let balance = await account.getAccountBalance()
	balance.total = parseFloat(formatNearAmount(balance.total))
	balance.available = parseFloat(formatNearAmount(balance.available))
	return balance
}

deposit_and_stake = async function (amount, contract) {
	amount = parseNearAmount(amount.toString())
	return await contract.account.functionCall(
		{ contractId: nearConfig.contractName, methodName: 'deposit_and_stake', args: {}, gas: MGAS, attachedDeposit: amount }
	)
}

class User {
	constructor(accountId) {
		this.accountId = accountId;
		this.contract;
	}

  deposit_and_stake(amount) { return deposit_and_stake(amount, this.contract) }
	unstake(amount) { return unstake(amount, this.contract) }
}

async function create_user(accountId) {
	let user = new User(accountId)
	user.contract = await create_contract(accountId)
	return user
}

module.exports = { create_user }
```

</Methods>