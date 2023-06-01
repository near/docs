---
id: typeahead
title: TypeAhead Component
sidebar_label: TypeAhead
---
import {WidgetEditor} from "@site/src/components/social-widget"

The `TypeAhead` component provides a type-ahead input field for selecting an option from a list of choices. This component is imported from the `react-bootstrap-typeahead` package; more information about the component can be found [here](https://github.com/ericgio/react-bootstrap-typeahead).

<hr class="subsection" />

### Example

The code example below demonstrates how to use the `TypeAhead` component to create an input field for selecting a fruit from a list of options.

<WidgetEditor id='1' height="220px">

```jsx
const options = ["Apple", "Banana", "Cherry", "Durian", "Elderberry"];

return (
  <div class="container min-vh-100 min-vw-100">
    <Typeahead
      options={options}
      multiple
      onChange={(value) => {State.update({choose: value})}}
      placeholder='Choose a fruit...'
    />
    <hr />
    <p> Selected: {JSON.stringify(state.choose)} </p>
  </div>
);
```

</WidgetEditor>