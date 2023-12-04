---
id: state
title: Introduction
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/social-widget"

Borrowing from React, Near Components use the same concepts of state, props and hooks to handle the component's logic.

---

## State
To handle the component's state you can use `useState` hook. The `useState` hook returns a tuple of two values: the current state and a function that updates it.

<WidgetEditor>

```jsx
const [count, setCount] = useState(0);

return (
  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>Click me</button>
  </div>
);

```
</WidgetEditor>

<details markdown="1">
<summary > State API (deprecated) </summary>

You might encounter some components that use the `State` object to handle state. The `State` API was the first implementation to interact with a component's state, but is now not recommended to use it.

#### State.init

`State.init` takes an object as an argument and initializes the state of the component with this object. It'll be no-op if the state is already initialized.

 | param   | required     | type   | description                               |
 |---------|--------------|--------|-------------------------------------------|
 | `state` | **required** | object | an initial state object for the component |

#### State.update

The `State.update` will trigger the state update, and the component will be re-rendered.
It also has an optional argument, the object that will be added to the `state` object using `Object.assign`.
The state will be initialized with the given object if it's not initialized yet.

 | param   | required     | type   | description                      |
 |---------|--------------|--------|----------------------------------|
 | `state` | **required** | object | the state                        |
 | `init`  | _optional_   | object | an optional initial state object |

</details>

---

## Props
Each component has access to a local variable named `props` which holds the properties received as input when the component is composed.

<WidgetEditor id='2'>

```jsx
return (<>
  <p> This component props: {JSON.stringify(props)} </p>
  <p> A component instantiated with the prop {`{name: "Maria"}`}: </p>
  <Widget src="gagdiez.near/widget/Greeter" props={{name: "Maria"}} />
</>)
```
</WidgetEditor>

---

## useEffect Hook

The [`useEffect` hook](https://react.dev/learn/synchronizing-with-effects) is used to handle side effects. It will execute each time one of the dependencies changes.

### Counter with useEffect
<WidgetEditor id='3'>

```jsx
const [count, setCount] = useState(0);
const [visible, setVisible] = useState(false);

useEffect(() => {
  if(count > 5) setVisible(true);
}, [count]);

return (
  <div>
    <p>You clicked {count} times</p>
    <p class="alert alert-danger" hidden={!visible}>
      You clicked more than 5 times
    </p>
    <button onClick={() => setCount(count + 1)}>Click me</button>
  </div>
);  
```
</WidgetEditor>

<hr class="subsection" />

### Fetching data from an API
<WidgetEditor id='4'>

```jsx
const [users, setUsers] = useState({});
const [userToId, setUserToId] = useState({});
const [idToUser, setIdToUser] = useState({});
const [selected, setSelected] = useState([]);
const [posts, setPosts] = useState({});

// fetch users from API
asyncFetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    let u2id = {}
    let id2u = {}
    for(let user of response.body) {
      u2id[user.name] = user.id
      id2u[user.id] = user.name
    }
    setUsers(response.body)
    setUserToId(u2id);
    setIdToUser(id2u);
  })

// fetch posts from API when the selection changes
useEffect(() => {
  let filter = ''
  if (selected.length) {
    for(let select of selected) {
      filter += `userId=${userToId[select]}&`
    }
  }
  asyncFetch(`https://jsonplaceholder.typicode.com/posts?${filter}`)
    .then(response => setPosts(response.body));
}, [selected]);

return (
  <div class="container min-vh-100 min-vw-100">
    <h4> Users </h4>
    <Typeahead
      onChange={(value) => setSelected(value)}
      options={users.map(user => user.name)}
      multiple
    />
    <h4 className="mt-2"> Posts </h4>
    <ul>
      {posts.map(
        post => <li>
          {post.title.substring(0, 40)}...
          - by <b>{idToUser[post.userId]}</b>
        </li>
      )}
    </ul>
  </div>
);  
```
</WidgetEditor>