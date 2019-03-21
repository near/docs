# Expert: Running a Multi-Node AlphaNet locally

_Note: This is advanced functionality which may be more brittle than usual. It is not necessary in order to simply write contracts. Proceed at your own peril._

Navigate to the root of the project. To start the network from a new state remove the storage:

```text
rm -rf test1 test2
```

We are going to be using test1 and test2 folders for the storage of the corresponding nodes. So make sure both of them have generated keypairs:

```text
cargo run --package keystore -- keygen --test-seed alice.near -p test1/storage/keystore/
cargo run --package keystore -- keygen --test-seed bob.near -p test2/storage/keystore/
```

Launch the boot node:

```text
cargo run --release -- --addr 127.0.0.1:3000 --rpc_port 3030 --base-path=test1 --test-network-key-seed 1 --chain-spec-file ./node/configs/res/poa_testnet_chain.json -a alice.near -k 4mhK4txd8Z5r71iCZ41UguSHuHFKUeCXPHv646DbQPYi
```

The boot node will print the string that we can use to boot from it. For example:

```text
To boot from this node: 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY
```

Launch the second node using the first one as the boot:

```text
cargo run --release -- --addr 127.0.0.1:3001 --rpc_port 3031 --base-path=test2 --test-network-key-seed 2 --chain-spec-file ./node/configs/res/poa_testnet_chain.json --boot-nodes 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY -a bob.near -k 22skMptHjFWNyuEWY22ftn2AbLPSYpmYwGJRGwpNHbTV
```

Submit account creation transaction on one node:

```text
pynear create_account jason 1 --public-key 22skMptHjFWNyuEWY22ftn2AbLPSYpmYwGJRGwpNHbTV
```

Verify that the account was created by checking it on the other node:

```text
pynear view_account -a jason -u http://127.0.0.1:3031/
```

## Running more nodes locally

This subsection explains how one can run more than two nodes locally. First, start with the clean storage:

```text
rm -rf test1 test2 test3 test4
```

Generate the spec file:

```text
cargo run --package alphanet --bin generate_test_spec -- -n 4 -c node/configs/res/mynet_chain.json
```

Generate keys for each node:

```text
cargo run --package keystore -- keygen --test-seed near.0 -p test1/storage/keystore/
cargo run --package keystore -- keygen --test-seed near.1 -p test2/storage/keystore/
cargo run --package keystore -- keygen --test-seed near.2 -p test3/storage/keystore/
cargo run --package keystore -- keygen --test-seed near.3 -p test4/storage/keystore/
```

In separate terminals run:

```text
cargo run -- --addr 127.0.0.1:3000 --rpc_port 3030 --base-path=test1 --test-network-key-seed 1 --chain-spec-file ./node/configs/res/mynet_chain.json -a near.0 -k 82M8LNM7AzJHhHKn6hymVW1jBzSwFukHp1dycVcU7MD
cargo run -- --addr 127.0.0.1:3001 --rpc_port 3031 --base-path=test2 --test-network-key-seed 2 --chain-spec-file ./node/configs/res/mynet_chain.json -a near.1 -k CTVkQMjLyr4QzoXrTDVzfCUp95sCJPwLJZ34JTiekxMV --boot-nodes 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY
cargo run -- --addr 127.0.0.1:3002 --rpc_port 3032 --base-path=test3 --test-network-key-seed 3 --chain-spec-file ./node/configs/res/mynet_chain.json -a near.2 -k EJ1DMa6s2ngC5GtZb3Z2DZzat2xFZ34j15VLY37dcdXX --boot-nodes 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY
cargo run -- --addr 127.0.0.1:3003 --rpc_port 3033 --base-path=test4 --test-network-key-seed 4 --chain-spec-file ./node/configs/res/mynet_chain.json -a near.3 -k 3DToePHssYc75SsxZgzgVLwXE8XQXKjdpdL7CT7D34UE --boot-nodes 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY
```

