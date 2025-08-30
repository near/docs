---
id: advanced-xcc
title: "Advanced XCC: Interact with any other contract on NEAR"
description: "Core patterns for advanced cross-contract calls (XCC): batching, multi-contract parallelism, and callbacks with robust result handling."
---

Cross-contract calls (**XCC**) are how a contract on NEAR talks to other contracts.  
This tutorial focuses on *advanced* patterns you’ll actually use in production:

- **Batch actions**: sequential, atomic calls to one receiver  
- **Parallel calls**: fan-out to multiple receivers, join results in a callback  
- **Callbacks**: collect the last result vs. all results, handle errors, and budget gas correctly

---

## When to use each pattern

**Batch actions (sequential, atomic)**  
Bundle several function calls to the *same* contract. They execute in order, and if one fails the chain reverts. Use for **atomic multi-step updates** (e.g., `approve → transfer → log`).

**Parallel calls (fan-out across contracts)**  
Trigger calls to different contracts in parallel, then combine their results. Perfect for **aggregations** (balances, metadata, oracles). One failure **does not** revert the others.

**Callbacks**  
- **Last result**: useful in sequential batches where only the final call matters.  
- **All results**: useful in parallel fan-out where each contract returns something.

---

## 1. Batch actions (sequential, atomic)

<Tabs groupId="lang">
  <TabItem value="rust" label="🦀 Rust">

```rust
#[near_bindgen]
impl Contract {
    pub fn batch_actions(&mut self, target: AccountId) -> Promise {
        Promise::new(target.clone())
            .function_call("step_one".into(), b"{}".to_vec(), 0, Gas(30_000_000_000_000))
            .function_call("step_two".into(), b"{}".to_vec(), 0, Gas(30_000_000_000_000))
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(10_000_000_000_000))
                    .on_batch_done()
            )
    }

    #[private]
    pub fn on_batch_done(&self) -> Option<String> {
        match env::promise_result(0) {
            PromiseResult::Successful(bytes) => String::from_utf8(bytes).ok(),
            _ => None,
        }
    }
}

@NearBindgen
class Contract {
  @call
  batch_actions({ target }: { target: string }) {
    const p = Near.promiseBatchCreate(target);
    Near.promiseBatchActionFunctionCall(p, "step_one", "{}".encode(), 0n, 30_000_000_000_000n);
    Near.promiseBatchActionFunctionCall(p, "step_two", "{}".encode(), 0n, 30_000_000_000_000n);
    return Near.promiseThen(
      p,
      Near.promiseBatchCreate(Near.currentAccountId()),
      "on_batch_done",
      "{}".encode(),
      0n,
      10_000_000_000_000n,
    );
  }

  @private @view
  on_batch_done(): string | null {
    const r = Near.promiseResult(0);
    return r.status === 1 ? r.bufferResult.decode() : null;
  }
}

#[near_bindgen]
impl Contract {
    pub fn multiple_contracts(&self, accounts: Vec<AccountId>) -> Promise {
        let mut p: Option<Promise> = None;
        for a in accounts {
            let call = Promise::new(a).function_call(
                "get_value".into(),
                b"{}".to_vec(),
                0,
                Gas(10_000_000_000_000),
            );
            p = Some(match p { None => call, Some(prev) => prev.and(call) });
        }
        p.unwrap().then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas(20_000_000_000_000))
                .on_multi_done()
        )
    }

    #[private]
    pub fn on_multi_done(&self) -> Vec<Result<String, String>> {
        let n = env::promise_results_count();
        (0..n).map(|i| match env::promise_result(i) {
            PromiseResult::Successful(bytes) => Ok(String::from_utf8(bytes).unwrap_or_default()),
            _ => Err("failed".into()),
        }).collect()
    }
}

@NearBindgen
class Contract {
  @call
  multiple_contracts({ accounts }: { accounts: string[] }) {
    const ps = accounts.map((a) =>
      Near.promiseBatchActionFunctionCall(
        Near.promiseBatchCreate(a),
        "get_value",
        "{}".encode(),
        0n,
        10_000_000_000_000n
      )
    );
    const joined = Near.promiseAndAll(ps);
    return Near.promiseThen(
      joined,
      Near.promiseBatchCreate(Near.currentAccountId()),
      "on_multi_done",
      "{}".encode(),
      0n,
      20_000_000_000_000n,
    );
  }

  @private @view
  on_multi_done(): Array<{ ok?: string; err?: string }> {
    const out: Array<{ ok?: string; err?: string }> = [];
    for (let i = 0; i < Near.promiseResultsCount(); i++) {
      const r = Near.promiseResult(i);
      out.push(r.status === 1 ? { ok: r.bufferResult.decode() } : { err: "failed" });
    }
    return out;
  }
}
