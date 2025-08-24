# Advanced Cross-Contract Call Architecture on NEAR

Cross-contract composition represents the cornerstone of scalable blockchain architecture. This guide explores sophisticated patterns for orchestrating multi-contract interactions, focusing on production-grade implementations that handle complex state transitions, asynchronous coordination, and failure recovery mechanisms.

## Architectural Foundations

### Promise Graph Theory

NEAR's cross-contract call system operates on a directed acyclic graph (DAG) where each promise represents a vertex and dependencies form edges. Understanding this graph structure is crucial for optimizing execution paths and managing computational complexity.

```rust
// Promise graph with complex dependencies
pub struct PromiseGraph {
    nodes: HashMap<PromiseId, PromiseNode>,
    execution_order: Vec<PromiseId>,
    dependency_matrix: Vec<Vec<bool>>,
}

impl PromiseGraph {
    pub fn optimize_execution_path(&self) -> Vec<PromiseId> {
        // Topological sort with critical path analysis
        let mut sorted = Vec::new();
        let mut visited = HashSet::new();
        
        for node_id in &self.execution_order {
            if !visited.contains(node_id) {
                self.dfs_with_critical_path(*node_id, &mut visited, &mut sorted);
            }
        }
        
        sorted
    }
}
```

### Execution Context Management

The NEAR runtime maintains execution contexts across promise boundaries. Advanced developers must understand how these contexts propagate and affect state consistency across contract boundaries.

## Transaction Atomicity Patterns

### Distributed Transaction Coordination

Implementing atomic operations across multiple contracts requires careful coordination of state changes and rollback mechanisms.

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct DistributedTransaction {
    transaction_id: String,
    participants: Vec<AccountId>,
    state: TransactionState,
    compensation_actions: Vec<CompensationAction>,
}

impl CrossContractOrchestrator {
    pub fn execute_distributed_transaction(&mut self, tx: DistributedTransaction) -> Promise {
        self.transactions.insert(tx.transaction_id.clone(), tx.clone());
        
        // Phase 1: Prepare all participants
        let prepare_promises = tx.participants.iter().map(|account| {
            ext_contract::ext(account.clone())
                .with_static_gas(Gas::from_tgas(10))
                .prepare_transaction(tx.transaction_id.clone())
        }).collect::<Vec<_>>();
        
        // Aggregate all prepare responses
        let aggregated_prepare = prepare_promises.into_iter()
            .reduce(|acc, promise| acc.and(promise))
            .unwrap();
        
        // Phase 2: Commit or abort based on prepare results
        aggregated_prepare.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(30))
                .handle_prepare_phase(tx.transaction_id)
        )
    }
    
    #[private]
    pub fn handle_prepare_phase(
        &mut self,
        transaction_id: String,
        #[callback_vec] prepare_results: Vec<Result<bool, PromiseError>>,
    ) -> Promise {
        let tx = self.transactions.get(&transaction_id).unwrap();
        let all_prepared = prepare_results.iter().all(|r| r.as_ref().unwrap_or(&false) == &true);
        
        if all_prepared {
            self.commit_transaction(tx.clone())
        } else {
            self.abort_transaction(tx.clone())
        }
    }
}
```

### Saga Pattern Implementation

For long-running distributed transactions, implement the saga pattern with compensation actions to maintain eventual consistency.

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct SagaStep {
    action: String,
    target_contract: AccountId,
    parameters: Vec<u8>,
    compensation_action: String,
    compensation_parameters: Vec<u8>,
}

impl SagaOrchestrator {
    pub fn execute_saga(&mut self, steps: Vec<SagaStep>) -> Promise {
        let saga_id = self.generate_saga_id();
        self.active_sagas.insert(saga_id.clone(), SagaExecution::new(steps.clone()));
        
        self.execute_saga_step(saga_id, 0, steps)
    }
    
    fn execute_saga_step(&self, saga_id: String, step_index: usize, steps: Vec<SagaStep>) -> Promise {
        if step_index >= steps.len() {
            return env::promise_create(
                env::current_account_id(),
                "saga_completed",
                &near_sdk::serde_json::to_vec(&saga_id).unwrap(),
                0,
                Gas::from_tgas(5),
            );
        }
        
        let step = &steps[step_index];
        env::promise_create(
            step.target_contract.clone(),
            &step.action,
            &step.parameters,
            0,
            Gas::from_tgas(20),
        ).then(
            env::promise_create(
                env::current_account_id(),
                "saga_step_callback",
                &near_sdk::serde_json::to_vec(&(saga_id, step_index, steps)).unwrap(),
                0,
                Gas::from_tgas(10),
            )
        )
    }
}
```

## Advanced Promise Chaining Techniques

### Dynamic Promise Construction

Build promise chains dynamically based on runtime conditions and contract states.

```rust
pub struct DynamicPromiseBuilder {
    conditions: Vec<Box<dyn PromiseCondition>>,
    promise_factories: HashMap<String, Box<dyn PromiseFactory>>,
}

trait PromiseCondition {
    fn evaluate(&self, context: &ExecutionContext) -> bool;
    fn get_promise_key(&self) -> String;
}

trait PromiseFactory {
    fn create_promise(&self, context: &ExecutionContext) -> Promise;
}

impl DynamicPromiseBuilder {
    pub fn build_conditional_chain(&self, context: &ExecutionContext) -> Promise {
        let applicable_conditions: Vec<_> = self.conditions
            .iter()
            .filter(|condition| condition.evaluate(context))
            .collect();
        
        let promise_chain = applicable_conditions
            .iter()
            .map(|condition| {
                let key = condition.get_promise_key();
                self.promise_factories.get(&key).unwrap().create_promise(context)
            })
            .reduce(|acc, promise| acc.then(promise));
        
        promise_chain.unwrap_or_else(|| {
            env::promise_create(
                env::current_account_id(),
                "no_op",
                b"{}",
                0,
                Gas::from_tgas(5),
            )
        })
    }
}
```

### Circuit Breaker Pattern

Implement circuit breakers to prevent cascade failures across contract boundaries.

```rust
#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub struct CircuitBreakerState {
    failure_count: u32,
    last_failure_time: u64,
    state: CircuitState,
    threshold: u32,
    timeout: u64,
}

#[derive(BorshSerialize, BorshDeserialize, Clone, PartialEq)]
pub enum CircuitState {
    Closed,
    Open,
    HalfOpen,
}

impl CircuitBreaker {
    pub fn execute_with_circuit_breaker<T>(&mut self, 
        contract_id: AccountId,
        operation: impl Fn() -> Promise,
    ) -> Promise {
        let state = self.circuit_states.get(&contract_id).cloned()
            .unwrap_or_else(|| CircuitBreakerState::default());
        
        match state.state {
            CircuitState::Open => {
                if env::block_timestamp() - state.last_failure_time > state.timeout {
                    self.transition_to_half_open(contract_id.clone());
                    self.execute_monitored_operation(contract_id, operation)
                } else {
                    self.create_fallback_response()
                }
            },
            CircuitState::Closed | CircuitState::HalfOpen => {
                self.execute_monitored_operation(contract_id, operation)
            }
        }
    }
    
    fn execute_monitored_operation<T>(&self, 
        contract_id: AccountId,
        operation: impl Fn() -> Promise,
    ) -> Promise {
        operation().then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(5))
                .circuit_breaker_callback(contract_id)
        )
    }
    
    #[private]
    pub fn circuit_breaker_callback(
        &mut self,
        contract_id: AccountId,
        #[callback_result] result: Result<Vec<u8>, PromiseError>,
    ) {
        match result {
            Ok(_) => self.record_success(contract_id),
            Err(_) => self.record_failure(contract_id),
        }
    }
}
```

## State Synchronization Strategies

### Eventual Consistency Models

Design systems that maintain eventual consistency across distributed contract states.

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct VectorClock {
    clocks: HashMap<AccountId, u64>,
}

impl VectorClock {
    pub fn happens_before(&self, other: &VectorClock) -> bool {
        let mut strictly_less = false;
        
        for (node, &timestamp) in &self.clocks {
            match other.clocks.get(node) {
                Some(&other_timestamp) => {
                    if timestamp > other_timestamp {
                        return false;
                    }
                    if timestamp < other_timestamp {
                        strictly_less = true;
                    }
                },
                None => return false,
            }
        }
        
        strictly_less
    }
    
    pub fn merge(&mut self, other: &VectorClock) {
        for (node, &timestamp) in &other.clocks {
            let current = self.clocks.entry(node.clone()).or_insert(0);
            *current = (*current).max(timestamp);
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct StateUpdate {
    vector_clock: VectorClock,
    update_data: Vec<u8>,
    conflict_resolution_strategy: ConflictResolutionStrategy,
}
```

### Conflict Resolution Mechanisms

Implement sophisticated conflict resolution for concurrent state modifications.

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub enum ConflictResolutionStrategy {
    LastWriterWins,
    FirstWriterWins,
    MergeFunctions(String),
    UserDefinedResolution,
}

impl StateManager {
    pub fn resolve_state_conflict(&mut self, 
        current_state: &StateUpdate,
        incoming_state: &StateUpdate,
    ) -> StateUpdate {
        match &incoming_state.conflict_resolution_strategy {
            ConflictResolutionStrategy::LastWriterWins => {
                if incoming_state.vector_clock.happens_before(&current_state.vector_clock) {
                    current_state.clone()
                } else {
                    incoming_state.clone()
                }
            },
            ConflictResolutionStrategy::MergeFunctions(merge_fn) => {
                self.execute_merge_function(merge_fn, current_state, incoming_state)
            },
            _ => self.apply_default_resolution(current_state, incoming_state),
        }
    }
    
    fn execute_merge_function(&self,
        merge_fn: &str,
        state1: &StateUpdate,
        state2: &StateUpdate,
    ) -> StateUpdate {
        // Dynamic merge function execution
        match merge_fn {
            "numeric_sum" => self.merge_numeric_states(state1, state2),
            "set_union" => self.merge_set_states(state1, state2),
            "custom_business_logic" => self.apply_business_merge(state1, state2),
            _ => panic!("Unknown merge function: {}", merge_fn),
        }
    }
}
```

## Performance Engineering

### Gas Optimization Through Promise Batching

Minimize gas consumption by intelligently batching operations and optimizing promise structures.

```rust
pub struct GasOptimizedBatch {
    operations: Vec<BatchOperation>,
    gas_budget: Gas,
    priority_queue: BinaryHeap<PrioritizedOperation>,
}

#[derive(BorshSerialize, BorshDeserialize, Eq, PartialEq)]
struct PrioritizedOperation {
    operation: BatchOperation,
    estimated_gas: u64,
    priority_score: u64,
    deadline: u64,
}

impl Ord for PrioritizedOperation {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        // Sort by priority score, then by gas efficiency
        self.priority_score.cmp(&other.priority_score)
            .then_with(|| other.estimated_gas.cmp(&self.estimated_gas))
    }
}

impl GasOptimizedBatch {
    pub fn optimize_batch_execution(&mut self) -> Vec<Promise> {
        let mut batches = Vec::new();
        let mut current_batch_gas = 0u64;
        let mut current_batch = Vec::new();
        
        while let Some(op) = self.priority_queue.pop() {
            if current_batch_gas + op.estimated_gas > self.gas_budget.0 {
                if !current_batch.is_empty() {
                    batches.push(self.create_batch_promise(current_batch.clone()));
                    current_batch.clear();
                    current_batch_gas = 0;
                }
            }
            
            current_batch.push(op.operation);
            current_batch_gas += op.estimated_gas;
        }
        
        if !current_batch.is_empty() {
            batches.push(self.create_batch_promise(current_batch));
        }
        
        batches
    }
}
```

### Memory-Efficient Promise Management

Implement memory-efficient data structures for managing large numbers of concurrent promises.

```rust
pub struct PromisePool {
    active_promises: HashMap<PromiseId, PromiseMetadata>,
    promise_recycler: Vec<PromiseId>,
    memory_threshold: usize,
    gc_strategy: GarbageCollectionStrategy,
}

#[derive(Clone)]
struct PromiseMetadata {
    creation_time: u64,
    estimated_completion: u64,
    memory_footprint: usize,
    dependency_count: u32,
}

impl PromisePool {
    pub fn allocate_promise(&mut self, metadata: PromiseMetadata) -> Option<PromiseId> {
        if self.should_trigger_gc() {
            self.garbage_collect();
        }
        
        if let Some(recycled_id) = self.promise_recycler.pop() {
            self.active_promises.insert(recycled_id, metadata);
            Some(recycled_id)
        } else if self.can_allocate_new() {
            let new_id = self.generate_promise_id();
            self.active_promises.insert(new_id, metadata);
            Some(new_id)
        } else {
            None // Pool exhausted
        }
    }
    
    fn garbage_collect(&mut self) {
        let current_time = env::block_timestamp();
        let mut candidates: Vec<_> = self.active_promises
            .iter()
            .filter(|(_, metadata)| {
                current_time > metadata.estimated_completion + GC_GRACE_PERIOD
            })
            .map(|(&id, _)| id)
            .collect();
        
        // Sort by memory footprint (largest first)
        candidates.sort_by_key(|&id| {
            std::cmp::Reverse(self.active_promises[&id].memory_footprint)
        });
        
        let target_freed = self.memory_threshold / 4;
        let mut freed = 0;
        
        for id in candidates {
            if freed >= target_freed {
                break;
            }
            
            if let Some(metadata) = self.active_promises.remove(&id) {
                freed += metadata.memory_footprint;
                self.promise_recycler.push(id);
            }
        }
    }
}
```

## Monitoring and Observability

### Distributed Tracing Implementation

Implement comprehensive tracing across contract boundaries for performance analysis and debugging.

```rust
#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub struct TraceSpan {
    trace_id: String,
    span_id: String,
    parent_span_id: Option<String>,
    operation_name: String,
    start_time: u64,
    end_time: Option<u64>,
    tags: HashMap<String, String>,
    logs: Vec<LogEntry>,
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub struct LogEntry {
    timestamp: u64,
    level: LogLevel,
    message: String,
    fields: HashMap<String, String>,
}

impl DistributedTracer {
    pub fn start_cross_contract_trace(&mut self, operation: &str) -> TraceSpan {
        let trace_id = self.generate_trace_id();
        let span_id = self.generate_span_id();
        
        TraceSpan {
            trace_id,
            span_id,
            parent_span_id: None,
            operation_name: operation.to_string(),
            start_time: env::block_timestamp(),
            end_time: None,
            tags: HashMap::new(),
            logs: Vec::new(),
        }
    }
    
    pub fn propagate_trace_context(&self, span: &TraceSpan) -> String {
        // Serialize trace context for cross-contract propagation
        near_sdk::serde_json::to_string(&TraceContext {
            trace_id: span.trace_id.clone(),
            parent_span_id: span.span_id.clone(),
        }).unwrap()
    }
    
    pub fn extract_trace_context(&self, context_data: &str) -> Option<TraceContext> {
        near_sdk::serde_json::from_str(context_data).ok()
    }
}
```

### Advanced Metrics Collection

Implement sophisticated metrics collection for performance optimization and SLA monitoring.

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct MetricsCollector {
    histograms: HashMap<String, Histogram>,
    counters: HashMap<String, Counter>,
    gauges: HashMap<String, Gauge>,
    percentile_trackers: HashMap<String, PercentileTracker>,
}

impl MetricsCollector {
    pub fn record_cross_contract_latency(&mut self, operation: &str, duration_ns: u64) {
        self.histograms
            .entry(format!("cross_contract_latency_{}", operation))
            .or_insert_with(|| Histogram::new(LATENCY_BUCKETS.to_vec()))
            .record(duration_ns);
        
        self.percentile_trackers
            .entry(format!("latency_p99_{}", operation))
            .or_insert_with(|| PercentileTracker::new(0.99, 1000))
            .record(duration_ns);
    }
    
    pub fn increment_error_counter(&mut self, error_type: &str, contract: &AccountId) {
        let key = format!("errors_{}_{}", error_type, contract);
        self.counters
            .entry(key)
            .or_insert_with(|| Counter::new())
            .increment();
    }
    
    pub fn set_active_promises_gauge(&mut self, count: u64) {
        self.gauges
            .entry("active_promises".to_string())
            .or_insert_with(|| Gauge::new())
            .set(count);
    }
}
```

## Security Considerations

### Advanced Access Control Patterns

Implement sophisticated access control mechanisms for cross-contract interactions.

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct AccessControlMatrix {
    permissions: HashMap<(AccountId, String), PermissionSet>,
    role_hierarchy: HashMap<String, Vec<String>>,
    time_based_permissions: HashMap<String, TimeWindow>,
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub struct PermissionSet {
    allowed_operations: HashSet<String>,
    rate_limits: HashMap<String, RateLimit>,
    conditions: Vec<AccessCondition>,
}

impl AccessControlMatrix {
    pub fn check_cross_contract_permission(&self,
        caller: &AccountId,
        target_operation: &str,
        context: &CallContext,
    ) -> Result<(), AccessDenied> {
        let permission_key = (caller.clone(), target_operation.to_string());
        
        let permissions = self.permissions
            .get(&permission_key)
            .ok_or(AccessDenied::NoPermission)?;
        
        // Check basic operation permission
        if !permissions.allowed_operations.contains(target_operation) {
            return Err(AccessDenied::OperationNotAllowed);
        }
        
        // Check rate limits
        if let Some(rate_limit) = permissions.rate_limits.get(target_operation) {
            if !self.check_rate_limit(caller, target_operation, rate_limit)? {
                return Err(AccessDenied::RateLimitExceeded);
            }
        }
        
        // Evaluate conditional permissions
        for condition in &permissions.conditions {
            if !condition.evaluate(context) {
                return Err(AccessDenied::ConditionNotMet);
            }
        }
        
        Ok(())
    }
}
```

### Reentrancy Protection Mechanisms

Implement advanced reentrancy protection for complex cross-contract scenarios.

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct ReentrancyGuard {
    call_stack: Vec<CallFrame>,
    max_depth: usize,
    protected_operations: HashSet<String>,
    call_graph: HashMap<AccountId, HashSet<AccountId>>,
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
struct CallFrame {
    caller: AccountId,
    target: AccountId,
    operation: String,
    timestamp: u64,
    gas_used: u64,
}

impl ReentrancyGuard {
    pub fn enter_protected_section(&mut self, 
        operation: &str,
        target: &AccountId,
    ) -> Result<CallGuard, ReentrancyError> {
        if self.protected_operations.contains(operation) {
            self.detect_reentrancy_attack(operation, target)?;
        }
        
        let frame = CallFrame {
            caller: env::predecessor_account_id(),
            target: target.clone(),
            operation: operation.to_string(),
            timestamp: env::block_timestamp(),
            gas_used: env::used_gas().0,
        };
        
        self.call_stack.push(frame);
        
        if self.call_stack.len() > self.max_depth {
            return Err(ReentrancyError::MaxDepthExceeded);
        }
        
        Ok(CallGuard::new(self))
    }
    
    fn detect_reentrancy_attack(&self, 
        operation: &str,
        target: &AccountId,
    ) -> Result<(), ReentrancyError> {
        // Check for circular call patterns
        let current_caller = env::predecessor_account_id();
        
        if self.call_graph.get(&current_caller)
            .map_or(false, |targets| targets.contains(target)) {
            return Err(ReentrancyError::CircularCallDetected);
        }
        
        // Check for suspicious call patterns
        let recent_calls: Vec<_> = self.call_stack
            .iter()
            .rev()
            .take(5)
            .filter(|frame| frame.operation == operation)
            .collect();
        
        if recent_calls.len() > 2 {
            return Err(ReentrancyError::SuspiciousPattern);
        }
        
        Ok(())
    }
}
```

## Conclusion

Advanced cross-contract call patterns on NEAR require deep understanding of distributed systems principles, careful attention to gas optimization, and robust error handling mechanisms. The patterns presented here—from distributed transaction coordination to sophisticated monitoring—form the foundation for building production-scale multi-contract applications.

Success in implementing these patterns depends on thorough testing, comprehensive monitoring, and iterative optimization based on real-world performance data. As the NEAR ecosystem evolves, these architectural patterns will continue to be refined, but the fundamental principles of atomicity, consistency, availability, and partition tolerance remain constant.

The key differentiator between basic cross-contract calls and advanced implementations lies in the systematic approach to handling edge cases, optimizing for performance under load, and maintaining security guarantees across contract boundaries. Master these patterns, and you'll be equipped to build the next generation of composable blockchain applications.
