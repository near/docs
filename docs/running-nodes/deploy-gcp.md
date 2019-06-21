
# Setup GCP machine

Create new instance, with at least 2 vCPU and 3.75 GB of RAM.
Select Ubuntu 18.04 LTS or later.
Allocate 100GB of persistent storage.

Add firewall rules to allow traffic to 24567 port from all IPs (0.0.0.0/0)

# Setup NEARCore

SSH into the machine (there is "SSH" button in the console or use gcloud ssh command).

Run:

```bash
sudo apt update
sudo apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler
git clone https://github.com/nearprotocol/nearcore.git
cd nearcore
```

# Run validator

```bash
./scripts/run_validator.py
```

This will ask you for account id to run validator on (if you want to just run a node, you can pass empty).
Will print the public key that should be used for staking.
And will start node in background inside the docker.

If you want to check the logs inside the docker, you can use `docker logs --follow nearcore`.

Alternatively, you can build and run validator on this machine, just use `--local` flag to switch off the Docker.
This will install Rust and compile the binary.
