---
id: upgrade_alert
title: Validator Node Upgrade Alert
sidebar_label: Validator Node Upgrade Alert
description: How to setup an alert for validator nodes upgrading.
---

# Alerting for Validator Node Upgrades

Please note that once 80% of the validator nodes switch to a new protocol version, the upgrade will occur in 2 epochs. Any validator node who doesn't upgrade in time will be kicked. The following provides a network upgrade ratio which allows validators to see what percentage of the validator nodes has upgraded to a new protocol version. 

<blockquote class="warning">
<strong>Heads up</strong><br /><br />

Information about node version and build is available on-chain. A metric based on on-chain data would be more reliable, and that metric is already under construction.
</blockquote>

Validator nodes periodically submit telemetry data, which is stored in a publicly-accessible PostgresSQL database.
Note that the nodes can opt out of submitting the telemetry data, and the telemetry data isn't guaranteed to be accurate.

With these caveats clarified, let's define an upgrade alert. The instructions were tested only in Grafana.

Step 1. Add a PostgreSQL data source with the following credentials:

* `telemetry_testnet` for testnet: https://github.com/near/near-explorer/blob/master/backend/config/env-indexer-testnet
* `telemetry_mainnet` for mainnet: https://github.com/near/near-explorer/blob/master/backend/config/env-indexer-mainnet

Step 2. Add a dashboard with a Graph panel with the following SQL query. Grafana only supports alerts on the Graph panels, therefore this needs a workaround to fit the Table data into a Graph format.

```
SELECT $__time(time_sec)
  ,upgraded_ratio
FROM (
  SELECT NOW() - INTERVAL '1' SECOND AS time_sec
    ,(
      (
        SELECT CAST(COUNT(*) AS FLOAT)
        FROM nodes
        WHERE agent_version > (
            SELECT MIN(agent_version)
            FROM nodes
            WHERE is_validator
              AND (now() - last_seen) < INTERVAL '15 MINUTE'
            )
          AND is_validator
          AND (now() - last_seen) < INTERVAL '15 MINUTE'
        ) / (
        SELECT COUNT(*)
        FROM nodes
        WHERE is_validator
          AND (now() - last_seen) < INTERVAL '15 MINUTE'
        )
      ) AS upgraded_ratio
  ) AS inner_table
WHERE $__timeFilter(time_sec);
```

Step 3. Go to the alert tab and change the condition to `WHEN last () OF query (A, 10s, now) IS ABOVE 0.65` or similar.

Step 4. Optionally add a table with min and max version of the validator nodes:

```
SELECT (
    SELECT MIN(agent_version)
    FROM nodes
    WHERE is_validator
      AND (now() - last_seen) < INTERVAL '15 MINUTE'
    ) AS min_version
  ,(
    SELECT MAX(agent_version)
    FROM nodes
    WHERE is_validator
      AND (now() - last_seen) < INTERVAL '15 MINUTE'
    ) AS max_version
  ,(
    SELECT COUNT(*)
    FROM nodes
    WHERE is_validator
      AND (now() - last_seen) < INTERVAL '15 MINUTE'
    ) AS num_validators
  ,(
    SELECT COUNT(*)
    FROM nodes
    WHERE agent_version = (
        SELECT MAX(agent_version)
        FROM nodes
        WHERE is_validator
          AND (now() - last_seen) < INTERVAL '15 MINUTE'
        )
      AND is_validator
      AND (now() - last_seen) < INTERVAL '15 MINUTE'
    ) AS upgraded_validators
  ,(
    (
      SELECT CAST(COUNT(*) AS FLOAT)
      FROM nodes
      WHERE agent_version = (
          SELECT MAX(agent_version)
          FROM nodes
          WHERE is_validator
            AND (now() - last_seen) < INTERVAL '15 MINUTE'
          )
        AND is_validator
        AND (now() - last_seen) < INTERVAL '15 MINUTE'
      ) / (
      SELECT COUNT(*)
      FROM nodes
      WHERE is_validator
        AND (now() - last_seen) < INTERVAL '15 MINUTE'
      )
    ) AS upgraded_ratio;
```

Step 5. Optionally add a table with the number of nodes running a newer version than your node:

```
SELECT (
    SELECT COUNT(*)
    FROM nodes
    WHERE is_validator
      AND (now() - last_seen) < INTERVAL '15 MINUTE'
    ) AS num_validators
  ,(
    SELECT COUNT(*)
    FROM nodes
    WHERE agent_version > (
        SELECT agent_version
        FROM nodes
        WHERE moniker = '$YOUR_VALIDATOR_MONIKER'
        )
      AND is_validator
      AND (now() - last_seen) < INTERVAL '15 MINUTE'
    ) AS upgraded_validators
  ,(
    (
      SELECT CAST(COUNT(*) AS FLOAT)
      FROM nodes
      WHERE agent_version > (
          SELECT agent_version
          FROM nodes
          WHERE moniker = '$YOUR_VALIDATOR_MONIKER'
          )
        AND is_validator
        AND (now() - last_seen) < INTERVAL '15 MINUTE'
      ) / (
      SELECT COUNT(*)
      FROM nodes
      WHERE is_validator
        AND (now() - last_seen) < INTERVAL '15 MINUTE'
      )
    ) AS upgraded_ratio;
```

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
