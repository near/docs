<MainRs>

```ts
// We receive the user's money and stake it in a validator
export function deposit_and_stake(): void {
  // Make sure there is enough GAS to execute the callback
  assert(context.prepaidGas >= 80*TGAS, "Use at least 80Tgas")

  const amount: u128 = context.attachedDeposit

  // Deposit the money in a validator
  const promise: ContractPromise = ContractPromise.create(
    EXTERNAL_POOL, "deposit_and_stake", "{}", 12*TGAS, amount
  )

  // Create a callback
  const args: UserAmountParams = new UserAmountParams(user, amount)

  const callbackPromise = promise.then(
    context.contractName, "deposit_and_stake_callback", args.encode(), 45*TGAS
  )
}

// In the callback we handle the 
export function deposit_and_stake_callback(user: string, amount: u128): void {
  const response = get_callback_result()

  if (response.status == 1) {
    // We are sure that the deposit is staked in the validator
  } else {
    // It failed
    // You need to manually rollback any changes to the contract
    // and return the user's money
    ContractPromiseBatch.create(user).transfer(amount)
  }
}
```

</MainRs>