---
id: protocol
title: Protocol
description: "Learn how to retrieve the current genesis and protocol configuration with the NEAR RPC API."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to retrieve the current genesis and protocol configuration.

---

## Quick Reference

| Method | Parameters | Description |
| --- | --- | --- |
| [`EXPERIMENTAL_genesis_config`](#genesis-config) | _none_ | Returns current genesis configuration |
| [`EXPERIMENTAL_protocol_config`](#protocol-config) | `finality` OR `block_id` | Returns protocol configuration for latest or specific block |

---

## Genesis Config {#genesis-config}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns current genesis configuration.

    - **method**: `EXPERIMENTAL_genesis_config`
    - **params**: _none_
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "EXPERIMENTAL_genesis_config",
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.experimental_protocolConfig({
          sync_checkpoint: 'genesis',
});
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=EXPERIMENTAL_genesis_config \
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/protocol/get-genesis-config.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "avg_hidden_validator_seats_per_shard": [0],
      "block_producer_kickout_threshold": 80,
      "chain_id": "testnet",
      "chunk_producer_assignment_changes_limit": 5,
      "chunk_producer_kickout_threshold": 90,
      "chunk_validator_only_kickout_threshold": 80,
      "dynamic_resharding": false,
      "epoch_length": 43200,
      "fishermen_threshold": "340282366920938463463374607431768211455",
      "gas_limit": 1000000000000000,
      "gas_price_adjustment_rate": [1, 100],
      "genesis_height": 42376888,
      "genesis_time": "2020-07-31T03:39:42.911378Z",
      "max_gas_price": "10000000000000000000000",
      "max_inflation_rate": [1, 20],
      "max_kickout_stake_perc": 100,
      "min_gas_price": "5000",
      "minimum_stake_divisor": 10,
      "minimum_stake_ratio": [1, 6250],
      "minimum_validators_per_shard": 1,
      "num_block_producer_seats": 200,
      "num_block_producer_seats_per_shard": [200],
      "num_blocks_per_year": 31536000,
      "num_chunk_only_producer_seats": 300,
      "num_chunk_producer_seats": 100,
      "num_chunk_validator_seats": 300,
      "online_max_threshold": [99, 100],
      "online_min_threshold": [90, 100],
      "protocol_reward_rate": [1, 10],
      "protocol_treasury_account": "near",
      "protocol_upgrade_stake_threshold": [4, 5],
      "protocol_version": 29,
      "shard_layout": {
        "V0": {
          "num_shards": 1,
          "version": 0
        }
      },
      "shuffle_shard_assignment_for_chunk_producers": false,
      "target_validator_mandates_per_shard": 68,
      "total_supply": "2089646653180081825096998107194444",
      "transaction_validity_period": 86400,
      "use_production_config": false,
      "validators": [
        {
          "account_id": "masternode24.pool.f863973.m0",
          "amount": "2096547887468158804726149840014",
          "public_key": "ed25519:9E3JvrQN6VGDGg1WJ3TjBsNyfmrU6kncBcDvvJLj6qHr"
        },
        {
          "account_id": "lunanova.pool.f863973.m0",
          "amount": "6023592217250515747116857534108",
          "public_key": "ed25519:2fZ59qfo9QHNLijoht9cwUb9enSNcnRmXbQn1gKZxvkw"
        },
        {
          "account_id": "node0",
          "amount": "7017386808510582905904716139001",
          "public_key": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX"
        },
        {
          "account_id": "node1",
          "amount": "7021733510638228632380895173752",
          "public_key": "ed25519:6DSjZ8mvsRZDvFqFxo8tCKePG96omXW7eVYVSySmDk8e"
        },
        {
          "account_id": "nodeasy.pool.f863973.m0",
          "amount": "350028003459257633077889642325",
          "public_key": "ed25519:25Dhg8NBvQhsVTuugav3t1To1X1zKiomDmnh8yN9hHMb"
        },
        {
          "account_id": "valeraverim.pool.f863973.m0",
          "amount": "2460437541222457077732687804254",
          "public_key": "ed25519:3686ABqNUZc1qhLWLHg5xZpBzrWPiUCMNZxcCNmg3e2s"
        },
        {
          "account_id": "node2",
          "amount": "7022280566885326956797181813724",
          "public_key": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5"
        },
        {
          "account_id": "orangeclub.pool.f863973.m0",
          "amount": "3073208665436498671483798256985",
          "public_key": "ed25519:HezFeSzcwuR5wvkqccgMCMnpf1eQkVCfk52tXZEdKZHz"
        },
        {
          "account_id": "tribe-pool.pool.f863973.m0",
          "amount": "502021509894008520748060961431",
          "public_key": "ed25519:CRS4HTSAeiP8FKD3c3ZrCL5pC92Mu1LQaWj22keThwFY"
        },
        {
          "account_id": "staked.pool.f863973.m0",
          "amount": "1835541810883701332840668361355",
          "public_key": "ed25519:D2afKYVaKQ1LGiWbMAZRfkKLgqimTR74wvtESvjx5Ft2"
        },
        {
          "account_id": "node3",
          "amount": "7025309465335462891886410729905",
          "public_key": "ed25519:ydgzeXHJ5Xyt7M1gXLxqLBW1Ejx6scNV5Nx2pxFM8su"
        },
        {
          "account_id": "moonlet.pool.f863973.m0",
          "amount": "396044187712024170314465720781",
          "public_key": "ed25519:3e1nVCVGNS3yr6CcUvpDAs3BhiWtyM9uTBWkyVR5Xn3K"
        },
        {
          "account_id": "sweden.pool.f863973.m0",
          "amount": "385869819054217573549654420144",
          "public_key": "ed25519:2RVUnsMEZhGCj1A3vLZBGjj3i9SQ2L46Z1Z41aEgBzXg"
        },
        {
          "account_id": "shawnpool.pool.f863973.m0",
          "amount": "326196336737920044305254508558",
          "public_key": "ed25519:6dfAfW3oy1kp4u9ePuticHy3Y2WDcHwx8yKSdyLNMPSr"
        },
        {
          "account_id": "chorus-one.pool.f863973.m0",
          "amount": "1318859742119402879751178031888",
          "public_key": "ed25519:6LFwyEEsqhuDxorWfsKcPPs324zLWTaoqk4o6RDXN7Qc"
        },
        {
          "account_id": "inotel.pool.f863973.m0",
          "amount": "4945759122706953812641339874642",
          "public_key": "ed25519:C55jH1MCHYGa3tzUyZZdGrJmmCLP22Aa4v88KYpn2xwZ"
        },
        {
          "account_id": "p2p.pool.f863973.m0",
          "amount": "991547852404615467434919132596",
          "public_key": "ed25519:4ie5979JdSR4f7MRAG58eghRxndVoKnAYAKa1PLoMYSS"
        },
        {
          "account_id": "dokia.pool.f863973.m0",
          "amount": "4004628852742744225484204285260",
          "public_key": "ed25519:935JMz1vLcJxFApG3TY4MA4RHhvResvoGwCrQoJxHPn9"
        },
        {
          "account_id": "01node.pool.f863973.m0",
          "amount": "1416856356232757387343764992394",
          "public_key": "ed25519:3iNqnvBgxJPXCxu6hNdvJso1PEAc1miAD35KQMBCA3aL"
        },
        {
          "account_id": "legends.pool.f863973.m0",
          "amount": "303006135607766172564337480878",
          "public_key": "ed25519:AhQ6sUifJYgjqarXSAzdDZU9ZixpUesP9JEH1Vr7NbaF"
        },
        {
          "account_id": "blazenet.pool.f863973.m0",
          "amount": "1892937440977093265954787297596",
          "public_key": "ed25519:DiogP36wBXKFpFeqirrxN8G2Mq9vnakgBvgnHdL9CcN3"
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>
---

## Protocol Config {#protocol-config}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns most recent protocol configuration or a specific queried block.
    Useful for finding current storage and transaction costs.

    - **method**: `EXPERIMENTAL_protocol_config`
    - **params**:
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "EXPERIMENTAL_protocol_config",
          "params": {
            "finality": "final"
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.experimental_protocolConfig({
          finality: "final"
        });
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=EXPERIMENTAL_protocol_config \
          params:='{"finality": "final"}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/protocol/get-protocol-config.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
  ```json
{
  "jsonrpc": "2.0",
  "result": {
    "avg_hidden_validator_seats_per_shard": [0, 0, 0, 0, 0, 0],
    "block_producer_kickout_threshold": 80,
    "chain_id": "testnet",
    "chunk_producer_kickout_threshold": 80,
    "chunk_validator_only_kickout_threshold": 70,
    "dynamic_resharding": false,
    "epoch_length": 43200,
    "fishermen_threshold": "340282366920938463463374607431768211455",
    "gas_limit": 1000000000000000,
    "gas_price_adjustment_rate": [1, 100],
    "genesis_height": 42376888,
    "genesis_time": "2020-07-31T03:39:42.911378Z",
    "max_gas_price": "10000000000000000000000",
    "max_inflation_rate": [1, 20],
    "max_kickout_stake_perc": 30,
    "min_gas_price": "5000",
    "minimum_stake_divisor": 10,
    "minimum_stake_ratio": [1, 62500],
    "minimum_validators_per_shard": 1,
    "num_block_producer_seats": 20,
    "num_block_producer_seats_per_shard": [20, 20, 20, 20, 20, 20],
    "num_blocks_per_year": 31536000,
    "num_chunk_only_producer_seats": 0,
    "online_max_threshold": [99, 100],
    "online_min_threshold": [90, 100],
    "protocol_reward_rate": [1, 10],
    "protocol_treasury_account": "near",
    "protocol_upgrade_stake_threshold": [4, 5],
    "protocol_version": 73,
    "runtime_config": {
      "account_creation_config": {
        "min_allowed_top_level_account_length": 65,
        "registrar_account_id": "registrar"
      },
      "congestion_control_config": {
        "allowed_shard_outgoing_gas": 1000000000000000,
        "max_congestion_incoming_gas": 400000000000000000,
        "max_congestion_memory_consumption": 1000000000,
        "max_congestion_missed_chunks": 5,
        "max_congestion_outgoing_gas": 10000000000000000,
        "max_outgoing_gas": 300000000000000000,
        "max_tx_gas": 500000000000000,
        "min_outgoing_gas": 1000000000000000,
        "min_tx_gas": 20000000000000,
        "outgoing_receipts_big_size_limit": 4718592,
        "outgoing_receipts_usual_size_limit": 102400,
        "reject_tx_congestion_threshold": 0.8
      },
      "storage_amount_per_byte": "10000000000000000000",
      "transaction_costs": {
        "action_creation_config": {
          "add_key_cost": {
            "full_access_cost": {
              "execution": 101765125000,
              "send_not_sir": 101765125000,
              "send_sir": 101765125000
            },
            "function_call_cost": {
              "execution": 102217625000,
              "send_not_sir": 102217625000,
              "send_sir": 102217625000
            },
            "function_call_cost_per_byte": {
              "execution": 1925331,
              "send_not_sir": 47683715,
              "send_sir": 1925331
            }
          },
          "create_account_cost": {
            "execution": 3850000000000,
            "send_not_sir": 3850000000000,
            "send_sir": 3850000000000
          },
          "delegate_cost": {
            "execution": 200000000000,
            "send_not_sir": 200000000000,
            "send_sir": 200000000000
          },
          "delete_account_cost": {
            "execution": 147489000000,
            "send_not_sir": 147489000000,
            "send_sir": 147489000000
          },
          "delete_key_cost": {
            "execution": 94946625000,
            "send_not_sir": 94946625000,
            "send_sir": 94946625000
          },
          "deploy_contract_cost": {
            "execution": 184765750000,
            "send_not_sir": 184765750000,
            "send_sir": 184765750000
          },
          "deploy_contract_cost_per_byte": {
            "execution": 64572944,
            "send_not_sir": 47683715,
            "send_sir": 6812999
          },
          "function_call_cost": {
            "execution": 780000000000,
            "send_not_sir": 200000000000,
            "send_sir": 200000000000
          },
          "function_call_cost_per_byte": {
            "execution": 2235934,
            "send_not_sir": 47683715,
            "send_sir": 2235934
          },
          "stake_cost": {
            "execution": 102217625000,
            "send_not_sir": 141715687500,
            "send_sir": 141715687500
          },
          "transfer_cost": {
            "execution": 115123062500,
            "send_not_sir": 115123062500,
            "send_sir": 115123062500
          }
        },
        "action_receipt_creation_config": {
          "execution": 108059500000,
          "send_not_sir": 108059500000,
          "send_sir": 108059500000
        },
        "burnt_gas_reward": [3, 10],
        "data_receipt_creation_config": {
          "base_cost": {
            "execution": 36486732312,
            "send_not_sir": 36486732312,
            "send_sir": 36486732312
          },
          "cost_per_byte": {
            "execution": 17212011,
            "send_not_sir": 47683715,
            "send_sir": 17212011
          }
        },
        "pessimistic_gas_price_inflation_ratio": [103, 100],
        "storage_usage_config": {
          "num_bytes_account": 100,
          "num_extra_bytes_record": 40
        }
      },
      "wasm_config": {
        "alt_bn128": true,
        "disable_9393_fix": false,
        "discard_custom_sections": true,
        "ed25519_verify": true,
        "eth_implicit_accounts": true,
        "ext_costs": {
          "alt_bn128_g1_multiexp_base": 713000000000,
          "alt_bn128_g1_multiexp_element": 320000000000,
          "alt_bn128_g1_sum_base": 3000000000,
          "alt_bn128_g1_sum_element": 5000000000,
          "alt_bn128_pairing_check_base": 9686000000000,
          "alt_bn128_pairing_check_element": 5102000000000,
          "base": 264768111,
          "bls12381_g1_multiexp_base": 16500000000,
          "bls12381_g1_multiexp_element": 930000000000,
          "bls12381_g2_multiexp_base": 18600000000,
          "bls12381_g2_multiexp_element": 1995000000000,
          "bls12381_map_fp2_to_g2_base": 1500000000,
          "bls12381_map_fp2_to_g2_element": 900000000000,
          "bls12381_map_fp_to_g1_base": 1500000000,
          "bls12381_map_fp_to_g1_element": 252000000000,
          "bls12381_p1_decompress_base": 15000000000,
          "bls12381_p1_decompress_element": 81000000000,
          "bls12381_p1_sum_base": 16500000000,
          "bls12381_p1_sum_element": 6000000000,
          "bls12381_p2_decompress_base": 15000000000,
          "bls12381_p2_decompress_element": 165000000000,
          "bls12381_p2_sum_base": 18600000000,
          "bls12381_p2_sum_element": 15000000000,
          "bls12381_pairing_base": 2130000000000,
          "bls12381_pairing_element": 2130000000000,
          "contract_compile_base": 0,
          "contract_compile_bytes": 0,
          "contract_loading_base": 35445963,
          "contract_loading_bytes": 1089295,
          "ecrecover_base": 278821988457,
          "ed25519_verify_base": 210000000000,
          "ed25519_verify_byte": 9000000,
          "keccak256_base": 5879491275,
          "keccak256_byte": 21471105,
          "keccak512_base": 5811388236,
          "keccak512_byte": 36649701,
          "log_base": 3543313050,
          "log_byte": 13198791,
          "promise_and_base": 1465013400,
          "promise_and_per_promise": 5452176,
          "promise_return": 560152386,
          "read_cached_trie_node": 2280000000,
          "read_memory_base": 2609863200,
          "read_memory_byte": 3801333,
          "read_register_base": 2517165186,
          "read_register_byte": 98562,
          "ripemd160_base": 853675086,
          "ripemd160_block": 680107584,
          "sha256_base": 4540970250,
          "sha256_byte": 24117351,
          "storage_has_key_base": 54039896625,
          "storage_has_key_byte": 30790845,
          "storage_iter_create_from_byte": 0,
          "storage_iter_create_prefix_base": 0,
          "storage_iter_create_prefix_byte": 0,
          "storage_iter_create_range_base": 0,
          "storage_iter_create_to_byte": 0,
          "storage_iter_next_base": 0,
          "storage_iter_next_key_byte": 0,
          "storage_iter_next_value_byte": 0,
          "storage_large_read_overhead_base": 1,
          "storage_large_read_overhead_byte": 1,
          "storage_read_base": 56356845749,
          "storage_read_key_byte": 30952533,
          "storage_read_value_byte": 5611004,
          "storage_remove_base": 53473030500,
          "storage_remove_key_byte": 38220384,
          "storage_remove_ret_value_byte": 11531556,
          "storage_write_base": 64196736000,
          "storage_write_evicted_byte": 32117307,
          "storage_write_key_byte": 70482867,
          "storage_write_value_byte": 31018539,
          "touching_trie_node": 16101955926,
          "utf16_decoding_base": 3543313050,
          "utf16_decoding_byte": 163577493,
          "utf8_decoding_base": 3111779061,
          "utf8_decoding_byte": 291580479,
          "validator_stake_base": 911834726400,
          "validator_total_stake_base": 911834726400,
          "write_memory_base": 2803794861,
          "write_memory_byte": 2723772,
          "write_register_base": 2865522486,
          "write_register_byte": 3801564,
          "yield_create_base": 153411779276,
          "yield_create_byte": 15643988,
          "yield_resume_base": 1195627285210,
          "yield_resume_byte": 47683715
        },
        "fix_contract_loading_cost": false,
        "function_call_weight": true,
        "grow_mem_cost": 1,
        "implicit_account_creation": true,
        "limit_config": {
          "account_id_validity_rules_version": 1,
          "contract_prepare_version": 2,
          "initial_memory_pages": 1024,
          "max_actions_per_receipt": 100,
          "max_arguments_length": 4194304,
          "max_contract_size": 4194304,
          "max_functions_number_per_contract": 10000,
          "max_gas_burnt": 300000000000000,
          "max_length_method_name": 256,
          "max_length_returned_data": 4194304,
          "max_length_storage_key": 2048,
          "max_length_storage_value": 4194304,
          "max_locals_per_contract": 1000000,
          "max_memory_pages": 2048,
          "max_number_bytes_method_names": 2000,
          "max_number_input_data_dependencies": 128,
          "max_number_logs": 100,
          "max_number_registers": 100,
          "max_promises_per_function_call_action": 1024,
          "max_receipt_size": 4194304,
          "max_register_size": 104857600,
          "max_stack_height": 262144,
          "max_total_log_length": 16384,
          "max_total_prepaid_gas": 300000000000000,
          "max_transaction_size": 1572864,
          "max_yield_payload_size": 1024,
          "per_receipt_storage_proof_size_limit": 4000000,
          "registers_memory_limit": 1073741824,
          "wasmer2_stack_limit": 204800,
          "yield_timeout_length_in_blocks": 200
        },
        "math_extension": true,
        "regular_op_cost": 822756,
        "storage_get_mode": "FlatStorage",
        "vm_kind": "NearVm",
        "yield_resume_host_functions": true
      },
      "witness_config": {
        "combined_transactions_size_limit": 4194304,
        "main_storage_proof_size_soft_limit": 4000000,
        "new_transactions_validation_state_size_soft_limit": 572864
      }
    },
    "shard_layout": {
      "V1": {
        "boundary_accounts": [
          "aurora",
          "aurora-0",
          "game.hot.tg",
          "kkuuue2akv_1630967379.near",
          "tge-lockup.sweat"
        ],
        "shards_split_map": [[0], [1], [2, 3], [4], [5]],
        "to_parent_shard_map": [0, 1, 2, 2, 3, 4],
        "version": 3
      }
    },
    "shuffle_shard_assignment_for_chunk_producers": false,
    "target_validator_mandates_per_shard": 68,
    "transaction_validity_period": 86400
  },
  "id": "dontcare"
}
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---

## Best Practices

- Use `finality: "final"` for most recent confirmed protocol configuration
- Use specific `block_id` when you need protocol config for a particular block
- Cache protocol configuration results as they change infrequently
- Use the protocol config to calculate current storage and transaction costs
- Handle network timeouts gracefully in production applications

---
