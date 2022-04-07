<Methods>

```js
const { wallet_balance, create_contract } = require('./utils')
const { utils: { format: { formatNearAmount, parseNearAmount } }, } = nearAPI

const TGAS = 1000000000000

donate = async function (amount, contract) {
	amount = parseNearAmount(amount.toString())
	return await contract.account.functionCall(
		{ contractId: nearConfig.contractName, methodName: 'donate', args: {},
			gas: 5*TGAS, attachedDeposit: amount }
	)
}

init = async function (beneficiary, contract) {
	return await contract.init({args:{beneficiary}})
}

class User {
	constructor(accountId) {
		this.accountId = accountId;
		this.contract;
	}

  init(beneficiary) { return init(beneficiary, this.contract) }
	donate(amount) { return donate(amount, this.contract) }
}

async function create_user(accountId) {
	let user = new User(accountId)
	user.contract = await create_contract(accountId)
	return user
}

module.exports = { create_user, wallet_balance }
```

</Methods>