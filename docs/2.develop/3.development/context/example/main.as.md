<MainAs>

```ts
import {context, u128} from 'near-sdk-as'

function main(): void{
  // Account ID that called this method
  const predecessor: string = context.predecessor

  // Account ID of this smart contract
  const current_account: string = context.contractName

  // Account ID that signed the first transaction leading to this execution
  const signer: string = context.sender

  // Amount of NEARs attached to the call
  const attached_amount: u128 = context.attachedDeposit

  // Balance of this smart contract (including attachedDeposit!)
  const contract_balance: u128 = context.accountBalance

  // Amount of GAS available for execution
  const gas: u64 = context.prepaidGas

  // Current timestamp
  const timestamp: u64 = context.blockTimestamp

  // Current epoch in the blockchain
  const current_epoch: u64 = context.epochHeight

  // Current block index (aka block height)
  const block_index: u64 =  context.blockIndex
  
  // Current storage used by this smart contract
  const storage_used: u64 = context.storageUsage

  // Amount of gas irreversibly used for execution
  const used_gas: u64 = context.usedGas

  // Sender Public Key
  const signer_pk: string = context.senderPublicKey
}
```

</MainAs>