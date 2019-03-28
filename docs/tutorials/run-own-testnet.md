---
name: Deploying your own alphanet
route: /tutorials/run-own-testnet
menu: Tutorials
description: An overview of how to run a local alphanet cluster using docker as well as a walkthrough of deploying your own alphanet cluster to GCP.
---

# Run an alphanet locally or deploy to GCP

## Running a local alphanet cluster via docker

Follow instructions for installing docker [here](https://docs.docker.com/install/#supported-platforms)

Navigate to the root of `nearprotocol/nearcore`. To start a local alphanet, execute the following script.

```bash
./ops/local_alphanet.sh
```

When the script finishes executing, you can access the following:

* NEARStudio at localhost:80
* HTTP interface of a node at localhost:3030

## Deploying an alphanet cluster to Google Cloud Platform

Note: This will require your payment information. However, you can start a 365 day free trial with $300 of credits. Be sure to remove your payment information after testing, if you do not wish to continue with Google Cloud Platform.

1\) Visit the [compute engine](https://console.cloud.google.com/compute) page and sign up for a free trial.

2\) Choose to enable billing.

3\) Follow instructions for installing and initializing gcloud CLI [here](https://cloud.google.com/sdk/docs/quickstarts)

4\) Navigate to the root of `nearprotocol/nearcore` and execute the following:

```bash
./ops/deploy_alphanet.sh
```

To look up the IP's of the running instances, run:

```bash
gcloud compute instances list
```

