---
id: maintenance
title: Node Maintenance
sidebar_label: Node Maintenance
description: NEAR Node Maintenance and Network Updates
---

## Updating a Node {#updating-a-node}

As a decentralized network, every update to NEAR Protocol needs some coordination between end users, platforms, developers, and validators. [`nearup`](https://github.com/near/nearup) provides scripts to launch NEAR Protocol `testnet` and `betanet` nodes. Unless it is executed with the switch `--binary-path`, `nearup` will automatically update the local binaries if NEAR's boot nodes fork the network and change the genesis checksum.

For security-critical applications and for validators, `nearup` can run a locally compiled binary of [`nearcore`](https://github.com/near/nearcore), but such updates have to be done manually. Since validators are responsible for creating new blocks, coordination in this process is necessary to avoid any network stall.


## Nearcore Planned Updates {#nearcore-planned-updates}

NEAR merges node updates from [nearcore releases](https://github.com/near/nearcore/releases) following the schedule shown on the public [NEAR Community Google Calendar](https://calendar.google.com/calendar/u/0/embed?src=nearprotocol.com_ltk89omsjnc2ckgbtk6h9157i0@group.calendar.google.com).

Typically, `testnet` and `mainnet` releases are four weeks apart to allow nearcore to be tested thoroughly on `testnet` before promotion to `mainnet`. From time to time, due to changes in engineering calendar and the nature of the release, release dates may change. Please refer to the [NEAR Community Google Calendar](https://calendar.google.com/calendar/u/0/embed?src=nearprotocol.com_ltk89omsjnc2ckgbtk6h9157i0@group.calendar.google.com) for the most updated release dates.
- `testnet` Monday at 15:00 UTC. The release tag is mapped with `x.y.z-rc.1`
- `mainnet` Monday at 15:00 UTC (typically 4 weeks after `testnet` release). The release tag is mapped with `x.y.z`


<blockquote class="warning">
<strong>Heads up</strong><br /><br />

`betanet` provides cutting-edge testing grounds for validators, with daily updates and frequent hard-forks. For more information on nodes that are running on `betanet`, please see the [betanet analysis group on the governance forum](https://gov.near.org/t/betanet-analysis-group-reports/339).
</blockquote>


## Nearcore Emergency Updates {#nearcore-emergency-updates}

We may issue a `[CODE_YELLOW_TESTNET]` or `[CODE_YELLOW_MAINNET]` if the network is suffering minor issues, or a new software release introduces incompatibilities and requires additional testing.

NEAR Protocol team will use the tag `[CODE_RED_TESTNET]` or `[CODE_RED_MAINNET]` in the Validator Announcement channel on [Discord](https://discord.gg/xsrHaCb), followed by email instructions for coordination. Some updates may follow a confidential process, as explained on [nearcore/SECURITY.md](https://github.com/near/nearcore/blob/master/SECURITY.md) docs.

NEAR's team will be mostly active on [Github](https://github.com/near/nearcore), and with limited participation on Discord and Telegram.

## Protocol Upgrade alerts

Note: Node build and version is also available on-chain and a metric based on on-chain data is a work in progress.

Validator nodes voluntarily regularly submit telemetry data, which is stored in a publicly-accessible PostgresSQL database.
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

