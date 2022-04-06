<Main>

```js
const { create_user } = require('./methods')

describe('PoolParty', function () {
  const alice_address = `alice.${nearConfig.contractName}`
  const bob_address = `bob.${nearConfig.contractName}`
  const cloud_address = `cloud.${nearConfig.contractName}`

  let guardian, dao, alice
  let last_balances = [0, 0, 0, 0, 0]

  jest.setTimeout(1200000);

  beforeAll(async function () {
    alice = await create_user(alice_address)
    bob = await create_user(bob_address)
    cloud = await create_user(cloud_address)
  });

  describe('Pool', function () {

    it("initializes", async function () {
      let res = await alice.init()
      expect(res).toBe(true)
    })

    it("responds empty user for non existing users", async function () {
      let info = await alice.get_account()
      expect(info.staked_balance).toBe(0, "non-user has tickets")
      expect(info.unstaked_balance).toBe(0, "non-user has unstaked_balance")
      expect(info.available).toBe(false, "non-user can withdraw")
    })

    it("cannot update prize immediately after", async function () {
      await expect(alice.update_prize()).rejects.toThrow()
    })

    it("ERROR: cannot access method update_prize_callback", async () => {
      await expect(bob.contract.update_prize_callback()).rejects.toThrow()
    })
  });
});
```

</Main>