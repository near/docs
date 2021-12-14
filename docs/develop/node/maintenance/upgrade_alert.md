---
id: upgrade_alert
title: Validator Node Upgrade  Alert
sidebar_label: Node Maintenance
description: How to setup an alert for validator nodes upgrading.
---

# Protocol Upgrade alerts

<blockquote class="warning">
<strong>Heads up</strong><br /><br />

As node build and version information is also available on-chain, a metric based on on-chain data would be more reliable. That metric is a work in progress.
</blockquote>

Validator nodes periodically submit telemetry data, which is stored in a publicly-accessible PostgresSQL database.
Note that the nodes can opt out of submitting the telemetry data, and the telemetry data isn't guaranteed to be accurate.

With these caveats clarified, let's define an upgrade alert. The instructions were tested only in Grafana.

Step 1. Add a PostgreSQL data source with the following credentials:

* [Testnet](https://github.com/near/near-explorer/blob/master/backend/config/env-indexer-testnet#L14-L17)
* [Mainnet](https://github.com/near/near-explorer/blob/master/backend/config/env-indexer-mainnet#L14-L17)

Step 2. Add a dashboard with a graph panel with the following SQL query. Grafana only supports alerts on the Graph panels, therefore this needs a workaround to fit the table table into a timeseries format.

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

Step 3. Go to the alert tab and change the condition to `WHEN last () OF query (A, 10s, now) IS ABOVE 0.5 `

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
    ) AS upgraded_ratio;
```

Step 5. Optionally add a table with the number of nodes running a newer version than your node:

```
SELECT (
  (
    SELECT COUNT(*)
    FROM nodes
    WHERE is_validator
      AND (now() - last_seen) < INTERVAL '15 MINUTE'
    ) AS num_validators
  ,(
    SELECT COUNT(*)
    FROM nodes
    WHERE agent_version > (
        SELECT MAX(agent_version)
        FROM nodes
        WHERE moniker = '$your_validator_moniker'
        )
      AND is_validator
      AND (now() - last_seen) < INTERVAL '15 MINUTE'
    ) AS upgraded_validators
  ,(
    (
      SELECT CAST(COUNT(*) AS FLOAT)
      FROM nodes
      WHERE agent_version > (
          SELECT MIN(agent_version)
          FROM nodes
          WHERE moniker = '$your_validator_moniker'
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

