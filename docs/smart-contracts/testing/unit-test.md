---
id: unit-test
title: Unit Testing
description: "Learn how to write and run unit tests for NEAR smart contracts to test individual methods and functions in isolation."
---
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs"

Unit tests allow you to test the contract methods individually. They are suitable to check the storage is updated correctly, and that methods return their expected values. They are written in the contract's language and execute locally.

If you used one of our [examples](https://github.com/near-examples/docs-examples) as template, then you simply need to navigate to the contract's folder, and use `yarn test`. In case you didn't, then we recommend you copy the necessary node files (e.g. `package.json`) from one of our templates.

:::tip
You can run `yarn test` from the root folder of each project to run both unit and [integration](integration-test.md) tests.
:::

For **Go contracts**, unit tests must be run with the `near-go` CLI, which uses **TinyGo** under the hood. The SDK's `system` package uses TinyGo-specific `//go:wasmimport` declarations that cannot be compiled by the standard Go toolchain.

```bash
# Run tests for the entire project
near-go test project

# Run tests only for the current package
near-go test package
```

Go unit tests use the `MockSystem` from `near-sdk-go` to simulate the NEAR environment locally without a blockchain.

:::info Prerequisites
You need [TinyGo](https://tinygo.org/getting-started/install/) and the `near-go` CLI installed. The `near-go` CLI handles everything — install it with `go install github.com/vlmoon99/near-cli-go@latest`.
:::

---

## Snippet I: Testing a Counter

The tests in the [Counter Example](https://github.com/near-examples/counters) rely on basic functions to check that the `increment`, `decrement`, and `reset` methods work properly.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/counters/blob/main/contract-rs/src/lib.rs"
            start="47" end="68" />
    <Github fname="Cargo.toml"
            url="https://github.com/near-examples/counters/blob/main/contract-rs/Cargo.toml"
            start="18" end="19" />
  </Language>
  <Language value="go" language="go">

```go
package main

import (
	"testing"

	"github.com/vlmoon99/near-sdk-go/env"
	"github.com/vlmoon99/near-sdk-go/system"
)

func init() {
	env.SetEnv(system.NewMockSystem())
}

func setupTest(t *testing.T) *CounterContract {
	mockSys, ok := env.NearBlockchainImports.(*system.MockSystem)
	if !ok {
		t.Fatal("Environment is not set to MockSystem")
	}
	mockSys.Storage = make(map[string][]byte)

	contract := &CounterContract{}
	contract.Init()
	return contract
}

func TestCounter_Increment(t *testing.T) {
	contract := setupTest(t)

	contract.Increment()
	contract.Increment()

	if contract.GetCount() != 2 {
		t.Errorf("Expected count 2, got %d", contract.GetCount())
	}
}

func TestCounter_Decrement(t *testing.T) {
	contract := setupTest(t)

	contract.Increment()
	contract.Decrement()

	if contract.GetCount() != 0 {
		t.Errorf("Expected count 0, got %d", contract.GetCount())
	}
}

func TestCounter_Reset(t *testing.T) {
	contract := setupTest(t)

	contract.Increment()
	contract.Increment()
	contract.Reset()

	if contract.GetCount() != 0 {
		t.Errorf("Expected count 0 after reset, got %d", contract.GetCount())
	}
}
```

  </Language>
</CodeTabs>

---

## Snippet II: Modifying the Context

While doing unit testing you can modify the [Environment variables](../anatomy/environment.md) through the `VMContextBuilder`. This will enable you to, for example, simulate calls from different users, with specific attached deposit and GAS. Here we present a snippet on how we test the `donate` method from our [Donation Example](https://github.com/near-examples/donation-examples) by manipulating the `predecessor` and `attached_deposit`.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
            start="58" end="105" />
    <Github fname="Cargo.toml"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/Cargo.toml"
            start="18" end="19" />
  </Language>
  <Language value="go" language="go">

```go
package main

import (
	"testing"

	"github.com/vlmoon99/near-sdk-go/env"
	"github.com/vlmoon99/near-sdk-go/system"
	"github.com/vlmoon99/near-sdk-go/types"
)

func init() {
	env.SetEnv(system.NewMockSystem())
}

func TestDonate_RecordsCorrectDonor(t *testing.T) {
	mockSys, _ := env.NearBlockchainImports.(*system.MockSystem)
	mockSys.Storage = make(map[string][]byte)

	// Simulate alice.testnet calling with 1 NEAR deposit
	mockSys.PredecessorAccountIdSys = "alice.testnet"
	oneNear, _ := types.U128FromString("1000000000000000000000000") // 1 NEAR in yoctoNEAR
	mockSys.AttachedDepositSys = oneNear

	contract := &DonationContract{}
	contract.Init("beneficiary.testnet")

	contract.Donate()

	donations := contract.GetDonations()
	if len(donations) != 1 {
		t.Fatalf("Expected 1 donation, got %d", len(donations))
	}
	if donations[0].Donor != "alice.testnet" {
		t.Errorf("Expected donor alice.testnet, got %s", donations[0].Donor)
	}
}

func TestDonate_MultipleDonors(t *testing.T) {
	mockSys, _ := env.NearBlockchainImports.(*system.MockSystem)
	mockSys.Storage = make(map[string][]byte)

	contract := &DonationContract{}
	contract.Init("beneficiary.testnet")

	halfNear, _ := types.U128FromString("500000000000000000000000") // 0.5 NEAR

	donors := []string{"alice.testnet", "bob.testnet", "carol.testnet"}
	for _, donor := range donors {
		mockSys.PredecessorAccountIdSys = donor
		mockSys.AttachedDepositSys = halfNear
		contract.Donate()
	}

	donations := contract.GetDonations()
	if len(donations) != 3 {
		t.Errorf("Expected 3 donations, got %d", len(donations))
	}
}
```

  </Language>
</CodeTabs>

---

## ⚠️ Limitations

Unit tests are useful to check for code integrity, and detect basic errors on isolated methods. However, since unit tests do not run on a blockchain, there are many things which they cannot detect. Unit tests are not suitable for:

- Testing [gas](../anatomy/environment.md) and [storage](../anatomy/storage.md) usage
- Testing [transfers](../anatomy/actions.md)
- Testing [cross-contract calls](../anatomy/crosscontract.md)
- Testing complex interactions, i.e. multiple users depositing money on the contract

For all these cases it is necessary to **complement** unit tests with [integration tests](integration-test.md).
