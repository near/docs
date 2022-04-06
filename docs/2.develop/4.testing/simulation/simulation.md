---
id: simulation_test
title: Simulation
---



---

## Unit Testing
While developing your smart contract you will want to test that it works as it is supposed to, and moreover, it does in a safe way.
Unit tests allow you to test the contract methods individually. They are suitable to check if, given a specific input, a method
returns the expected value and changes the state accordingly.

Unit tests are written in the same language as your contract and executed localy

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">
    <Tabs className="file-tabs">
      <TabItem value="as-main" label="main.ts">
        <MainAs></MainAs>
      </TabItem>
      <TabItem value="as-external" label="utils.ts">
        <ExternalAs></ExternalAs>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">
    <Tabs className="file-tabs">
      <TabItem value="as-main" label="main.ts">
        <MainRs></MainRs>
      </TabItem>
      <TabItem value="as-external" label="utils.ts">
        <ExternalRs></ExternalRs>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>


