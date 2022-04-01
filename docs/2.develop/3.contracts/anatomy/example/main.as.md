<MainAs>

```ts
import { env, logging, storage } from "near-sdk-as";
import { Donation, add_donation, get_donation, set_beneficiary, get_beneficiary } from "models.as"

// Public - init function, define the beneficiary of donations
export function init(beneficiary: string){
  set_beneficiary(beneficiary)
}

// Public - donate
export function donate(): i32 {
  // Get who is calling the method, and how much NEAR they attached
  const donator: string = env.predecessor()
  const amount: u128 = env.attachedDeposit()

  // Send almost all of it to the beneficiary (deduct some to cover storage)
  const beneficiary: string = get_beneficiary()
  ContractPromiseBatch.create(beneficiary).transfer(amount - STORAGE_COST)

  // Record the donation
  const donation_number: i32 = add_donation(donator, amount)
  logging.log(`Thank you ${donator}, your donation is the number ${donation_number}`)

  // Return the donation number
  return donation_number
}

// Public - get donation by number
export function get_donation_by_number(donation_number: i32): Donation {
  return get_donation(donation_number)
}
```

</MainAs>