<Main>

```js
describe('Counter', function () {
  // Connect to the deployed smart contract
  beforeAll(async function () {
    const near = await nearlib.connect(nearConfig);
    const accountId = nearConfig.contractName;
    const contract = await near.loadContract(
      nearConfig.contractName, {
        viewMethods: ['get_num'],
        changeMethods: ['increment', 'decrement', 'reset'],
        sender: accountId
      });
  });

  // Test it
  describe('Interacting with Counter', function () {
    it('can be incremented', async function () {
      const startCounter = await contract.get_num();
      await contract.increment();
      const endCounter = await contract.get_num();
      expect(endCounter).toEqual(startCounter + 1);
    });

    it('can be decremented', async function () {
      await contract.increment();
      const startCounter = await contract.get_num();
      await contract.decrement();
      const endCounter = await contract.get_num();
      expect(endCounter).toEqual(startCounter - 1);
    });

    it('can be reset', async function () {
      await contract.increment();
      const startCounter = await contract.get_num();
      await contract.reset();
      const endCounter = await contract.get_num();
      expect(endCounter).toEqual(0);
    });
  });
});
```

</Main>