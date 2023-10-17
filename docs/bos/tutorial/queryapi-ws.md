---
id: queryapi-websockets
title: WebSocket-enabled Components with QueryAPI
sidebar_label: WebSockets & QueryAPI
---

In this article you'll learn how to create a B.O.S. component that gathers information from a [QueryAPI indexer](../queryapi/intro.md) using WebSockets.
In this example, the QueryAPI indexer monitors the widget activity on the blockchain, and the BOS component gets that information using WebSockets.

:::info

[QueryAPI](../queryapi/intro.md) is a fully managed solution to build indexer functions, extract on-chain data, store it in a database, and be able to query it using GraphQL endpoints.

:::

## QueryAPI indexer

The [Widget Activity indexer](https://near.org/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=roshaan.near/widget-activity-feed&view=editor-window) keeps track of any widget activity on the `social.near` smart contract. Whenever a Widget transation is found, the data is stored in a Postgres database.

### DB schema

The schema for the indexer's database is pretty simple:

```sql title=schema.sql
CREATE TABLE
  "widget_activity" (
    "id" SERIAL NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "widget_name" VARCHAR NOT NULL,
    "block_height" DECIMAL(58, 0) NOT NULL,
    "receipt_id" VARCHAR NOT NULL,
    "block_timestamp" DECIMAL(20, 0) NOT NULL,
    CONSTRAINT "widgets_pkey" PRIMARY KEY ("id")
  );

CREATE INDEX
  idx_widget_activity_block_timestamp ON widget_activity (block_timestamp);
```

### Indexer logic

In the following code snippet, you can find the simple indexer logic that filters widget transactions from the `social.near` smart contract, and if it finds widget development activity, then it adds a record to the `widget_activity` table defined previously.

:::tip
Learn more about [QueryAPI indexing functions](../queryapi/index-function.md) and build your own indexers.
:::

```js title=indexerLogic.js
  // Add your code here
  const SOCIAL_DB = "social.near";

  const nearSocialWidgetTxs = block
    .actions()
    .filter((action) => action.receiverId === SOCIAL_DB)
    .flatMap((action) =>
      action.operations
        .map((operation) => operation["FunctionCall"])
        .filter((operation) => operation?.methodName === "set")
        .map((functionCallOperation) => ({
          ...functionCallOperation,
          args: base64decode(functionCallOperation.args),
          receiptId: action.receiptId, // providing receiptId as we need it
        }))
        .filter((functionCall) => {
          const accountId = Object.keys(functionCall.args.data)[0];
          return Object.keys(functionCall.args.data[accountId]).includes(
            "widget"
          );
        })
    );

  if (nearSocialWidgetTxs.length > 0) {
    console.log("Found BOS Widget Development Activity...");
    const blockHeight = block.blockHeight;
    const blockTimestamp = block.header().timestampNanosec;
    console.log(nearSocialWidgetTxs);
    await Promise.all(
      nearSocialWidgetTxs.map(async (widgetEditTx) => {
        const accountId = Object.keys(widgetEditTx.args.data)[0];
        const widgetName = Object.keys(
          widgetEditTx.args.data[accountId]["widget"]
        )[0];

        console.log(`ACCOUNT_ID: ${accountId}`);
        console.log(widgetName);
        await handleWidgetTx(
          accountId,
          widgetName,
          blockHeight,
          blockTimestamp,
          widgetEditTx.receiptId
        );
        console.log(widgetEditTx);
      })
    );
  }
}
```

---

This is the JavaScript function that calls the GraphQL mutation `InsertWidgetActivity` that adds a record to the `widget_activity` table:

```js title=indexerLogic.js
  async function handleWidgetTx(
    accountId,
    widgetName,
    blockHeight,
    blockTimestamp,
    receiptId
  ) {
    console.log(accountId, blockHeight, blockTimestamp, receiptId);
    try {
      const mutationData = {
        activity: {
          account_id: accountId,
          widget_name: widgetName,
          block_height: blockHeight,
          block_timestamp: blockTimestamp,
          receipt_id: receiptId,
        },
      };
      await context.graphql(
        `mutation InsertWidgetActivity($activity: roshaan_near_widget_activity_feed_widget_activity_insert_input = {}) {
  insert_roshaan_near_widget_activity_feed_widget_activity_one(object: $activity) {
    id
  }
}`,
        mutationData
      );
    } catch (e) {
      console.log(`Could not add widget activity to DB, ${e}`);
    }
  }
```

## Using WebSockets

Add `WebSocket` object and support native events for function arguments (needed to get data). Websockets are automatically closed when a VM instance is stopped.

Example using WebSocket for the FT transfer events. It handles reconnects.

```js
if (state.ws === undefined) {
  const eventsFilter = {
    status: "SUCCESS",
    event: {
      event: "ft_transfer",
    },
  };

  function startWebSocket(processEvents) {
    let ws = State.get().ws;

    if (ws) {
      ws.close();
      return;
    }

    ws = new WebSocket("wss://events.near.stream/ws");

    ws.onopen = () => {
      console.log(`Connection to WS has been established`);
      ws.send(
        JSON.stringify({
          secret: "near-social-events",
          filter: eventsFilter,
          fetch_past_events: 10,
        })
      );
    };
    ws.onclose = () => {
      State.update({ ws: null });
      console.log(`WS Connection has been closed`);
      State.get().startWebSocket(processEvents);
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      processEvents(data.events);
    };
    ws.onerror = (err) => {
      State.update({ ws: null });
      console.log("WebSocket error", err);
    };

    State.update({ ws });
  }

  function processEvent(event) {
    return {
      time: new Date(parseFloat(event.block_timestamp) / 1e6),
      event: event.event,
      accountId: event.account_id,
      predecessorId: event.predecessor_id,
    };
  }

  function processEvents(events) {
    events = events.flatMap(processEvent);
    events.reverse();

    State.update((state) => {
      const prevActions = state.actions || [];
      state.actions = [
        ...events.filter(
          (event) =>
            prevActions.length === 0 ||
            event.time.getTime() > prevActions[0].time.getTime()
        ),
        ...prevActions,
      ].slice(0, 10);
      return state;
    });
  }

  State.init({
    startWebSocket,
  });
  state.startWebSocket(processEvents);
}

return state.actions;
```

---

## Component

[Widget Activity Feed source code](https://near.org#/near/widget/ComponentDetailsPage?src=roshaan.near/widget/query-api-widget-feed), powered by QueryAPI

[Widget Activity indexer](https://near.org/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=roshaan.near/widget-activity-feed&view=editor-window)

```js
//props widget_activity_feed

const GRAPHQL_ENDPOINT = "near-queryapi.api.pagoda.co";

const LIMIT = 10;
const accountId = props.accountId || "roshaan.near" || context.accountId;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;
const SmallTitle = styled.h3`
  color: black;
  font-weight: 600;
  font-size: 18px;
  line-height: 15px;
  text-transform: uppercase;

  @media (max-width: 770px) {
    margin-bottom: 16px;
  }
`;
const TableElement = styled.td`
  word-wrap: break-word;
  font-family: "Roboto Mono", monospace;
  font-size: 11px;
  background-color: rgb(255, 255, 255);
  color: rgb(32, 33, 36);
`;
const Subheading = styled.h2`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 10px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;
`;
const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  border: ${(div) => (div.selected ? "1px solid black" : "1px solid #eceef0")};
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  padding: 10px;  
  margin: 10px;  
  width: 80%;     
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-direction: column;
  > * {
    min-width: 0;
  }
`;
const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  align-items: center;

`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${(p) => (p.bold ? "black !important" : "#687076 !important")};
  white-space: nowrap;
`;

State.init({
  widgetActivities: [],
  widgetActivityCount: 0,
  startWebSocketWidgetActivity: null,
  initialFetch: false,
  soundEffect:
    "https://bafybeic7uvzmhuwjficgctpleov5i43rteavwmktyyjrauwi346ntgja4a.ipfs.nftstorage.link/",
});

const widgetActivitySubscription = `
  subscription IndexerQuery {
    roshaan_near_widget_activity_feed_widget_activity(
      order_by: {block_timestamp: desc}
      limit: ${LIMIT}
    ) {
      account_id
      block_height
      block_timestamp
      id
      receipt_id
      widget_name
    }
  }
`;

const subscriptionWidgetActivity = {
  type: "start",
  id: "widgetActivity", // You can use any unique identifier
  payload: {
    operationName: "IndexerQuery",
    query: widgetActivitySubscription,
    variables: {},
  },
};
function processWidgetActivity(activity) {
  return { ...activity };
}
function startWebSocketWidgetActivity(processWidgetActivities) {
  let ws = State.get().ws_widgetActivity;

  if (ws) {
    ws.close();
    return;
  }

  ws = new WebSocket(`wss://${GRAPHQL_ENDPOINT}/v1/graphql`, "graphql-ws");

  ws.onopen = () => {
    console.log(`Connection to WS has been established`);
    ws.send(
      JSON.stringify({
        type: "connection_init",
        payload: {
          headers: {
            "Content-Type": "application/json",
            "Hasura-Client-Name": "hasura-console",
            "x-hasura-role": "roshaan_near",
          },
          lazy: true,
        },
      })
    );

    setTimeout(() => ws.send(JSON.stringify(subscriptionWidgetActivity)), 50);
  };

  ws.onclose = () => {
    State.update({ ws_widgetActivity: null });
    console.log(`WS Connection has been closed`);
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("received data", data);
    if (data.type === "data" && data.id === "widgetActivity") {
      processWidgetActivities(data.payload.data);
    }
  };

  ws.onerror = (err) => {
    State.update({ ws_widgetActivity: null });
    console.log("WebSocket error", err);
  };

  State.update({ ws_widgetActivity: ws });
}

function processWidgetActivities(incoming_data) {
  let incoming_widgetActivities =
    incoming_data.roshaan_near_widget_activity_feed_widget_activity.flatMap(
      processWidgetActivity
    );
  const newActivities = [
    ...incoming_widgetActivities.filter((activity) => {
      return (
        state.widgetActivities.length == 0 ||
        activity.block_timestamp > state.widgetActivities[0].block_timestamp
      );
    }),
  ];
  if (newActivities.length > 0 && state.widgetActivities.length > 0) {
    const sound = new Audio(state.soundEffect);
    sound.play();
  }
  const prevActivities = state.prevActivities || [];
  State.update({ widgetActivities: [...newActivities, ...prevActivities] });
}

if (state.ws_widgetActivity === undefined) {
  State.update({
    startWebSocketWidgetActivity: startWebSocketWidgetActivity,
  });
  state.startWebSocketWidgetActivity(processWidgetActivities);
}

return (
  <div>
    <Title>
      Widget Activity Feed{" "}
      <TextLink href="https://near.org/dataplatform.near/widget/QueryApi.App">
        {" "}
        Powered By QueryAPI{" "}
      </TextLink>
    </Title>
    <RowContainer>
      {state.widgetActivities.map((activity, i) => (
        <Card>
          <div>
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ blockHeight: activity.block_height }}
            />{" "}
            ago
          </div>
          <CardBody>
            <div key={i}>
              <Text bold>Widget Name: {activity.widget_name}</Text>
              <Text bold>Account ID: {activity.account_id}</Text>
            </div>
          </CardBody>
          <CardFooter>
            <TextLink
              href={`/#/near/widget/ComponentDetailsPage?src=${activity.account_id}/widget/${activity.widget_name}`}
            >
              View
            </TextLink>
          </CardFooter>
        </Card>
      ))}
    </RowContainer>
  </div>
);
```

---

