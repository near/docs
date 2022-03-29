<ModelAs>

```ts
import { storage, u128 } from "near-sdk-as";

// Class and vector holding donations
@nearbindgen
class Donation{
  account_id: string,
  amount: u128
}

const donations: PersistentVector<Donation>("unique-id-1")

export function set_beneficiary(beneficiary: string): void{
  assert(!storage.contains("beneficiary"), "A beneficiary already exists")
  storage.set<string>("beneficiary", beneficiary)
}

// Returns the beneficiary
export function get_beneficiary(): string{
  assert(storage.contains("beneficiary"), "Please init the contract")
  return storage.getSome<string>("beneficiary")
}

export function add_donation(account_id: string, amount: u128): i32 {
  const new_donation = new Donation(account_id, amount)
  donations.append(new_donation)
  return donations.length()
}

export function get_donation(donation_number: i32): Donation {
  assert(idx > 0 &&  idx <= donations.length(), "Invalid donation number")
  return donations[donation_number - 1]
}
```

</ModelAs>