# Advanced Cross-Contract Calls: Solving Real Problems with Smart Contract Orchestration

Cross-contract calls become "advanced" when they solve complex business problems that single contracts cannot handle. This guide explores specific challenges and demonstrates how sophisticated cross-contract patterns provide elegant solutions.

## Problem: Building Atomic Multi-Step Operations

**Challenge**: Your DeFi application needs to swap tokens, add liquidity, and stake LP tokens in one transaction. If any step fails, users lose funds or end up in inconsistent states.

**Solution**: Atomic batch execution ensures all operations complete together or none at all.

### The Atomic Transaction Pattern

```javascript
class DeFiComposer {
    // Execute complex DeFi strategy atomically
    async executeYieldStrategy(params) {
        const { tokenA, tokenB, amount, minLiquidity, stakingContract } = params;
        
        // Create atomic batch - these execute in sequence
        const swapPromise = this.createSwapStep(tokenA, tokenB, amount);
        
        // Only executes if swap succeeds
        const liquidityPromise = swapPromise.then(() => 
            this.createLiquidityStep(tokenB, minLiquidity)
        );
        
        // Only executes if liquidity addition succeeds  
        const stakingPromise = liquidityPromise.then(() =>
            this.createStakingStep(stakingContract)
        );
        
        return stakingPromise.then(() => this.finalizeStrategy());
    }
    
    createSwapStep(tokenA, tokenB, amount) {
        return near.call(this.dexContract, 'swap_tokens', {
            token_in: tokenA,
            token_out: tokenB, 
            amount_in: amount
        }, '30000000000000'); // 30 Tgas
    }
}
```

**Why This Works**: Each step only executes after the previous succeeds. If the swap fails, liquidity and staking never happen. If liquidity fails, the swap automatically reverses.

```rust
// Rust implementation showing explicit rollback handling
impl YieldStrategy {
    pub fn execute_compound_strategy(&mut self, params: StrategyParams) -> Promise {
        // Step 1: Swap tokens
        token_swap::ext(self.swap_contract.clone())
            .with_static_gas(Gas::from_tgas(20))
            .swap_exact_tokens_for_tokens(params.clone())
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas::from_tgas(40))
                    .handle_swap_result(params)
            )
    }
    
    #[private]
    pub fn handle_swap_result(
        &mut self,
        params: StrategyParams,
        #[callback_result] swap_result: Result<SwapOutput, PromiseError>,
    ) -> Promise {
        match swap_result {
            Ok(output) => {
                // Proceed to liquidity step
                self.add_liquidity_step(params, output)
            },
            Err(_) => {
                // Swap failed - strategy ends here, no cleanup needed
                env::log_str("Swap failed, strategy aborted");
                self.create_failure_response("Swap step failed")
            }
        }
    }
}
```

## Problem: Aggregating Data from Multiple Sources

**Challenge**: Your application displays real-time market data from multiple price feeds, user portfolios across different protocols, and social sentiment. Waiting for each call sequentially takes too long.

**Solution**: Parallel execution with intelligent fallbacks.

### The Data Aggregation Pattern

```typescript
class MarketDashboard {
    
    async loadDashboardData(userId: string): Promise<DashboardData> {
        // Launch all data fetching simultaneously
        const priceDataPromise = this.fetchPriceData();
        const portfolioPromise = this.fetchUserPortfolio(userId);
        const sentimentPromise = this.fetchMarketSentiment();
        const newsPromise = this.fetchLatestNews();
        
        // Handle results as they complete
        const results = await this.gatherResults([
            priceDataPromise,
            portfolioPromise,
            sentimentPromise,
            newsPromise
        ]);
        
        return this.buildDashboard(results);
    }
    
    async gatherResults(promises: Promise<any>[]): Promise<any[]> {
        // Use Promise.allSettled to handle partial failures gracefully
        const settled = await Promise.allSettled(promises);
        
        return settled.map((result, index) => {
            if (result.status === 'fulfilled') {
                return result.value;
            } else {
                near.log(`Data source ${index} failed: ${result.reason}`);
                return this.getDefaultData(index);
            }
        });
    }
    
    getDefaultData(sourceIndex: number): any {
        const defaults = {
            0: this.getCachedPrices(),      // Cached price data
            1: { balance: '0', tokens: [] }, // Empty portfolio
            2: { sentiment: 'neutral' },     // Neutral sentiment
            3: []                            // No news items
        };
        return defaults[sourceIndex];
    }
}
```

**Why This Works**: All network calls start immediately rather than waiting in sequence. The application shows partial data when some sources are slow or unavailable, providing better user experience than blocking on failures.

```rust
// Rust parallel implementation with timeout handling
impl DataAggregator {
    pub fn fetch_market_overview(&self) -> Promise {
        // Create multiple parallel promises
        let price_feed1 = price_oracle1::ext(self.oracle1.clone())
            .with_static_gas(Gas::from_tgas(10))
            .get_latest_prices();
            
        let price_feed2 = price_oracle2::ext(self.oracle2.clone())
            .with_static_gas(Gas::from_tgas(10))
            .get_latest_prices();
            
        let volume_data = volume_tracker::ext(self.volume_contract.clone())
            .with_static_gas(Gas::from_tgas(10))
            .get_24h_volumes();
        
        // Combine all promises for parallel execution
        price_feed1
            .and(price_feed2)
            .and(volume_data)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas::from_tgas(15))
                    .process_aggregated_data()
            )
    }
    
    #[private]
    pub fn process_aggregated_data(
        &self,
        #[callback_result] feed1: Result<PriceData, PromiseError>,
        #[callback_result] feed2: Result<PriceData, PromiseError>,
        #[callback_result] volumes: Result<VolumeData, PromiseError>,
    ) -> MarketOverview {
        // Build comprehensive view from available data
        let price_data = self.consolidate_price_feeds(feed1, feed2);
        let volume_data = volumes.unwrap_or_default();
        
        MarketOverview {
            prices: price_data,
            volumes: volume_data,
            data_quality: self.assess_data_quality(&feed1, &feed2, &volumes),
            timestamp: env::block_timestamp(),
        }
    }
}
```

## Problem: Complex Approval Workflows

**Challenge**: Your governance system requires proposals to pass through multiple validation stages: technical review, economic impact assessment, legal compliance check, and community voting. Each stage has different contracts and approval criteria.

**Solution**: Multi-stage promise chains with conditional execution.

### The Workflow Orchestration Pattern

```javascript
class GovernanceWorkflow {
    
    async processProposal(proposalId) {
        const proposal = await this.getProposal(proposalId);
        
        // Stage 1: Technical validation (required)
        const techValidation = this.validateTechnicalAspects(proposal);
        
        // Stage 2: Economic analysis (parallel with legal review)
        const economicReview = techValidation.then(() => 
            this.analyzeEconomicImpact(proposal)
        );
        
        const legalReview = techValidation.then(() =>
            this.checkLegalCompliance(proposal)  
        );
        
        // Stage 3: Community vote (only after all reviews pass)
        const reviewResults = Promise.all([economicReview, legalReview]);
        
        const communityVote = reviewResults.then((results) => {
            const [economicResult, legalResult] = results;
            
            if (economicResult.approved && legalResult.approved) {
                return this.initiateVoting(proposal);
            } else {
                throw new Error('Proposal failed review stage');
            }
        });
        
        return communityVote.then(() => this.finalizeProposal(proposalId));
    }
    
    async validateTechnicalAspects(proposal) {
        return near.call(this.techReviewContract, 'validate_proposal', {
            proposal_id: proposal.id,
            code_changes: proposal.codeChanges,
            impact_assessment: proposal.technicalImpact
        }, '50000000000000'); // 50 Tgas for complex validation
    }
}
```

**Why This Works**: The workflow enforces business logic through promise dependencies. Technical validation must complete before other reviews begin. Both economic and legal reviews must approve before community voting starts.

## Problem: Handling Service Failures Gracefully

**Challenge**: Your application depends on external price oracles, but they sometimes go offline or return stale data. Users should still be able to interact with your application during outages.

**Solution**: Circuit breaker pattern with fallback strategies.

### The Resilient Service Pattern

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct ServiceHealthMonitor {
    failed_calls: HashMap<AccountId, u32>,
    last_successful_call: HashMap<AccountId, u64>,
    circuit_open: HashMap<AccountId, bool>,
}

impl PriceService {
    pub fn get_price_with_fallback(&mut self, asset: String) -> Promise {
        if self.is_circuit_open(&self.primary_oracle) {
            near_sdk::log!("Primary oracle circuit open, using fallback");
            return self.get_price_from_secondary(asset);
        }
        
        // Try primary oracle with circuit breaker
        oracle::ext(self.primary_oracle.clone())
            .with_static_gas(Gas::from_tgas(10))
            .get_asset_price(asset.clone())
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas::from_tgas(15))
                    .handle_price_response(asset, self.primary_oracle.clone())
            )
    }
    
    #[private]
    pub fn handle_price_response(
        &mut self,
        asset: String,
        oracle: AccountId,
        #[callback_result] price_result: Result<U128, PromiseError>,
    ) -> Promise {
        match price_result {
            Ok(price) => {
                self.record_successful_call(oracle);
                self.create_success_response(price)
            },
            Err(error) => {
                self.record_failed_call(oracle);
                
                if self.should_open_circuit(oracle.clone()) {
                    near_sdk::log!("Opening circuit for oracle: {}", oracle);
                    self.monitor.circuit_open.insert(oracle, true);
                }
                
                // Try fallback service
                self.get_price_from_secondary(asset)
            }
        }
    }
    
    fn should_open_circuit(&self, oracle: AccountId) -> bool {
        let failed_count = self.monitor.failed_calls.get(&oracle).unwrap_or(&0);
        *failed_count >= 3 // Open circuit after 3 consecutive failures
    }
}
```

**Why This Works**: The system automatically detects failing services and routes traffic to healthy alternatives. Users experience degraded but functional service rather than complete outages.

## Problem: Coordinating Complex Multi-Token Operations

**Challenge**: Your portfolio rebalancer needs to sell multiple tokens, buy different tokens, and redistribute them across various yield farming protocols. The operations must be coordinated to avoid price slippage and maintain desired allocations.

**Solution**: Staged execution with dynamic adjustment.

### The Portfolio Rebalancing Pattern

```typescript
class PortfolioRebalancer {
    
    async rebalancePortfolio(userId: string, targetAllocations: Allocation[]) {
        const currentPortfolio = await this.getCurrentPortfolio(userId);
        const rebalanceplan = this.calculateRebalanceplan(currentPortfolio, targetAllocations);
        
        // Phase 1: Execute all sells in parallel (order doesn't matter)
        const sellPromises = rebalanceplan.sells.map(sell => 
            this.executeSell(sell.token, sell.amount)
        );
        
        const sellResults = await Promise.allSettled(sellPromises);
        const availableFunds = this.calculateAvailableFunds(sellResults);
        
        // Phase 2: Execute buys based on actual funds available
        const adjustedBuys = this.adjustBuyOrders(rebalanceplan.buys, availableFunds);
        
        const buyPromises = adjustedBuys.map(buy =>
            this.executeBuy(buy.token, buy.amount)
        );
        
        const buyResults = await Promise.allSettled(buyPromises);
        
        // Phase 3: Distribute to yield protocols (sequential to avoid conflicts)
        return this.distributeToProtocols(buyResults, targetAllocations);
    }
    
    async distributeToProtocols(buyResults: any[], allocations: Allocation[]) {
        let distributionPromise = Promise.resolve();
        
        // Process each protocol sequentially to avoid race conditions
        for (const allocation of allocations) {
            distributionPromise = distributionPromise.then(() => 
                this.deployToProtocol(allocation.protocol, allocation.tokens)
            );
        }
        
        return distributionPromise;
    }
    
    async deployToProtocol(protocolContract: string, tokens: TokenAmount[]) {
        return near.call(protocolContract, 'deposit_multiple_tokens', {
            tokens: tokens.map(t => ({
                contract_id: t.contractId,
                amount: t.amount
            }))
        }, '100000000000000'); // 100 Tgas for complex deployment
    }
}
```

**Why This Works**: Sells execute in parallel for speed, buys are adjusted based on actual proceeds, and protocol deposits happen sequentially to avoid conflicts. The system adapts to market conditions and partial failures.

## Problem: Implementing Secure Multi-Signature Operations

**Challenge**: Your multi-sig wallet needs to collect signatures from multiple parties, validate them, and execute transactions only when threshold requirements are met. The process must be secure against various attack vectors.

**Solution**: Signature aggregation with validation checkpoints.

### The Multi-Signature Coordination Pattern

```rust
impl MultiSigCoordinator {
    pub fn execute_transaction(&mut self, tx_id: u64) -> Promise {
        let transaction = self.get_pending_transaction(tx_id);
        
        // Collect signatures from all signers in parallel
        let signature_collection: Vec<Promise> = transaction.required_signers
            .iter()
            .enumerate()
            .map(|(index, signer)| {
                signature_service::ext(self.signature_validator.clone())
                    .with_static_gas(Gas::from_tgas(10))
                    .validate_signature(
                        signer.clone(),
                        transaction.transaction_hash.clone(),
                        index as u8
                    )
            })
            .collect();
        
        // Combine all signature validations
        let combined_validation = signature_collection
            .into_iter()
            .reduce(|acc, promise| acc.and(promise))
            .expect("At least one signer required");
        
        combined_validation.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(30))
                .process_signature_results(tx_id)
        )
    }
    
    #[private]
    pub fn process_signature_results(
        &mut self,
        tx_id: u64,
        #[callback_vec] signature_results: Vec<Result<bool, PromiseError>>,
    ) -> Promise {
        let valid_signatures = signature_results
            .iter()
            .filter(|result| result.as_ref().unwrap_or(&false) == &true)
            .count();
        
        let transaction = self.get_pending_transaction(tx_id);
        
        if valid_signatures >= transaction.required_threshold {
            self.execute_validated_transaction(tx_id)
        } else {
            env::log_str(&format!("Insufficient signatures: {}/{}", 
                valid_signatures, transaction.required_threshold));
            self.create_rejection_response(tx_id)
        }
    }
    
    fn execute_validated_transaction(&mut self, tx_id: u64) -> Promise {
        let transaction = self.get_pending_transaction(tx_id);
        
        // Execute the actual transaction
        env::promise_create(
            transaction.target_contract,
            &transaction.method_name,
            &transaction.arguments,
            transaction.attached_deposit,
            Gas::from_tgas(50)
        ).then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(10))
                .finalize_transaction(tx_id)
        )
    }
}
```

**Why This Works**: Signature validation happens in parallel for speed, threshold checking prevents unauthorized transactions, and the final execution is atomic with proper cleanup.

## Testing Complex Cross-Contract Scenarios

Real-world cross-contract applications require comprehensive testing that covers success paths, failure scenarios, and edge cases.

### Integration Test Strategies

```javascript
describe('Advanced Cross-Contract Scenarios', () => {
    let contracts;
    
    beforeEach(async () => {
        contracts = await setupMultiContractEnvironment();
    });
    
    test('atomic operations roll back on failure', async () => {
        // Setup: Make one of the operations fail
        await contracts.helper.call('setFailureMode', { shouldFail: true });
        
        const initialState = await contracts.main.view('getState');
        
        // Execute atomic batch that should fail
        const result = await contracts.main.call('executeAtomicBatch', {});
        
        expect(result.success).toBe(false);
        
        // Verify no partial changes occurred
        const finalState = await contracts.main.view('getState');
        expect(finalState).toEqual(initialState);
    });
    
    test('parallel operations handle partial failures', async () => {
        // Make some operations fail
        await contracts.service1.call('setFailureMode', { shouldFail: true });
        
        const result = await contracts.main.call('executeParallelOperations', {});
        
        // Should have partial success
        expect(result.successful_operations).toBeGreaterThan(0);
        expect(result.failed_operations).toBeGreaterThan(0);
        expect(result.fallback_used).toBe(true);
    });
});
```

## Performance Optimization Strategies

### Gas Management for Complex Workflows

```rust
// Gas estimation for complex operations
const GAS_PER_SIGNATURE_CHECK: u64 = 5_000_000_000_000; // 5 Tgas
const GAS_PER_PARALLEL_CALL: u64 = 10_000_000_000_000; // 10 Tgas
const CALLBACK_OVERHEAD: u64 = 5_000_000_000_000; // 5 Tgas

impl GasOptimizer {
    pub fn estimate_required_gas(&self, operation: &Operation) -> Gas {
        let base_gas = match operation.operation_type {
            OperationType::AtomicBatch => {
                operation.steps.len() as u64 * 15_000_000_000_000 // 15 Tgas per step
            },
            OperationType::ParallelExecution => {
                operation.parallel_calls.len() as u64 * GAS_PER_PARALLEL_CALL
            },
            OperationType::MultiSigValidation => {
                operation.signature_count as u64 * GAS_PER_SIGNATURE_CHECK
            }
        };
        
        Gas::from_tgas(base_gas + CALLBACK_OVERHEAD)
    }
    
    pub fn optimize_batch_size(&self, operations: Vec<Operation>) -> Vec<Vec<Operation>> {
        let mut batches = Vec::new();
        let mut current_batch = Vec::new();
        let mut current_gas = 0u64;
        
        for operation in operations {
            let required_gas = self.estimate_required_gas(&operation).0;
            
            if current_gas + required_gas > MAX_GAS_PER_TRANSACTION {
                if !current_batch.is_empty() {
                    batches.push(current_batch);
                    current_batch = Vec::new();
                    current_gas = 0;
                }
            }
            
            current_batch.push(operation);
            current_gas += required_gas;
        }
        
        if !current_batch.is_empty() {
            batches.push(current_batch);
        }
        
        batches
    }
}
```

## Best Practices Summary

**Design for Failure**: Every cross-contract call can fail. Design your system to handle failures gracefully and provide meaningful feedback to users.

**Use Appropriate Patterns**: Choose atomic batches when consistency matters, parallel execution when speed matters, and mixed patterns when you need both.

**Monitor Performance**: Track gas usage, success rates, and execution times. Use this data to optimize your cross-contract interactions.

**Test Thoroughly**: Test not just success scenarios but also various failure combinations. Real networks have failures, delays, and partial outages.

**Plan for Scale**: Design your systems to handle increasing numbers of contracts, users, and operations without degrading performance.

Advanced cross-contract calls solve real business problems by enabling sophisticated coordination between smart contracts. The key is matching the right pattern to your specific problem while maintaining reliability and performance.
