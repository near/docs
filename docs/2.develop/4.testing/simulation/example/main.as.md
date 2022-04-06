<MainAs>

```ts
import {TGAS, QArgs, User, get_callback_results} from './utils'
import {context} from 'near-sdk-as'

export function query_user_funds(account_id: string): void {
  // Make sure there is enough GAS to execute the callback
  assert(context.prepaidGas >= 12*TGAS, "Please attach at least 12 Tgas")

  const args: QArgs = new QArgs(user)

  // Query the external validator, needs 5 Tgas
  const promise: ContractPromise = ContractPromise.create(
    VALIDATOR_ADDRESS, "get_user_info", args.encode(), 5*TGAS, amount
  )

  // Create a callback, needs 5 Tgas
  const callbackPromise = promise.then(
    context.contractName, "query_user_funds_callback", args.encode(), 5*TGAS
  )
}

export function query_user_funds_callback(account_id: string): void {
  const response = get_callback_result()

  if (response.status == 1) {
    // We obtained a result
    const user_info: User = decode<User>(response.result)
    log(`@{account_id} has {user_info.total_staked} NEARs in the validator`)
  } else {
    // It failed
    log("There was an error in `get_user_info`")
  }
}
```

</MainAs>