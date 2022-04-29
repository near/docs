<MainCplx>

```js
const { create_user, wallet_balance } = require('./methods')

describe('Donation Contract', function () {
  const alice_address = `alice.${nearConfig.contractName}`
  const bob_address = `bob.${nearConfig.contractName}`
  const cloud_address = `cloud.${nearConfig.contractName}`

  beforeAll(async function () {
    let contract = await create_user(nearConfig.contractName)
    let alice = await create_user(alice_address)
    let bob = await create_user(bob_address)
    let cloud = await create_user(cloud_address)    
  });

  describe('Donate', function () {

    it("can only be initialized by the owner", async function () {
      expect(()=>{await alice.init(alice_address)}.toThrow()

      let initialized = await contract.init(cloud_address)
      expect(initialized).toBe(true)
    })

    it("Sends donations to the beneficiary", async function () {
      const cloud_balance = await wallet_balance(cloud_address).available

      // Alice donates 1 NEAR, Bob donates 2 NEARs
      await alice.donate(1)
      await bob.donate(2)

      const new_balance = await wallet_balance(cloud_address)
      expect(new_balance.available).toBe(cloud_balance + 3, "error receiving donations")
    })

    it("Records the donations", async function () {
      let donation_idx = alice.donate(1)
      expect(donation_idx).toBe(3, "error recording donations")

      let donation = alice.get_donation_by_idx(donation_idx)
      expect(donation.account_id).toBe(alice_address, "error recording sender")
      expect(donation.amount).toBe(parseNearAmount(3), "error recording amount")
    })
  });
});
```

</MainCplx>