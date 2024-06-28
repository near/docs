---
id: blog-posts
title: Blog Posts
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

The Blog post components enable your gateway to promote regular Near Social posts into fully fledged blog posts.
In this article you'll learn how to set up the required components so you can define a custom URL to show a clean feed of blog posts.

## Setup

To set up the Blog post features on your [`near-discovery`](https://github.com/near/near-discovery/) gateway:

1. Add the [`Blog.Feed`](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/Blog.Feed) and [`BlogPostPage`](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/BlogPostPage) components
2. Add `near/widget/Blog.Feed` and `near/widget/BlogPostPage` to your configuration

<Tabs>
<TabItem value="discovery" label="near-discovery" default>

- Edit your `bos-components.ts` configuration file:

<Github fname="bos-components.ts" language="js" value="near-discovery"
    url="https://github.com/near/near-discovery/blob/c275ab7d70a6ee7baf3a88ace1c2e02f605da644/src/data/bos-components.ts"
    start="160" end="165" />

</TabItem>

<TabItem value="viewer" label="nearsocial viewer">

- Edit your `widgets.js` configuration file:

```js title="src/data/widgets.js"
const MainnetWidgets = {
  blog: 'near/widget/Blog.Feed',
  blogPost: 'near/widget/BlogPostPage',
  image: "mob.near/widget/Image",
  default: "mob.near/widget/Homepage",
  viewSource: "mob.near/widget/WidgetSource",
  widgetMetadataEditor: "mob.near/widget/WidgetMetadataEditor",
```

</TabItem>

</Tabs>

### Blog feed URL

To set a custom URL such as `/bosblog` for your Blog feed, and define which users will be shown on it, do the following changes on your `near-discovery` gateway:

<Tabs>
<TabItem value="discovery" label="near-discovery" default>

1. Create a folder `src/pages/<customURL>` for your desired custom path (e.g., `/bosblog`)
2. Add this [`index.tsx`](https://github.com/near/near-discovery/blob/c275ab7d70a6ee7baf3a88ace1c2e02f605da644/src/pages/bosblog/index.tsx) file to `src/pages/bosblog/`:

<Github fname="index.tsx" language="js" value="near-discovery"
    url="https://github.com/near/near-discovery/blob/c275ab7d70a6ee7baf3a88ace1c2e02f605da644/src/pages/bosblog/index.tsx"
    start="1" end="50" />

</TabItem>

<TabItem value="viewer" label="nearsocial viewer">

1. Add this `BlogPage.js` file to `src/pages/`:

```js title="src/pages/BlogPage.js"
import React, { useEffect, useState } from "react";
import { Widget } from "near-social-vm";
import { useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useHashRouterLegacy } from "../hooks/useHashRouterLegacy";

export default function BlogPage(props) {
  useHashRouterLegacy();

  const { widgetSrc } = useParams();
  const query = useQuery();
  const [widgetProps, setWidgetProps] = useState({});
  const src = widgetSrc || props.widgets.default;
  const contributors = ['near', 'jacksonthedev.near'];

  useEffect(() => {
    setWidgetProps(
      [...query.entries()].reduce((props, [key, value]) => {
        props[key] = value;
        return props;
      }, {})
    );
  }, [query]);

  if (widgetProps.accountId && widgetProps.blockHeight) {
    return (
    <div className="d-inline-block position-relative overflow-hidden">
      <Widget src={props.widgets.blogPost} props={widgetProps} />{" "}
    </div>
    );
  }

  widgetProps.contributors = contributors;

  return (
    <div className="d-inline-block position-relative overflow-hidden">
      <Widget src={props.widgets.blog} props={widgetProps} />{" "}
    </div>
  );
}
```

2. Update your `App.js` router file, adding the new route to your custom path (e.g., `/bosblog`):

```js title="src/App.js"
import BlogPage from "./pages/BlogPage";
```

```js title="src/App.js"
            <Route path={"/signin"}>
              <NavigationWrapper {...passProps} />
              <SignInPage {...passProps} />
            </Route>
            <Route path={"/bosblog"}>
              <NavigationWrapper {...passProps} />
              <BlogPage {...passProps} />
            </Route>
```

</TabItem>

</Tabs>

3. Edit the `contributors` list, with the account(s) that you want to showcase on your blog feed:

   ```js
   const contributors = ['near', 'jacksonthedev.near'];
   ```

That's all, your gateway setup is done and you're ready to show your blog feed.
Check the next sections if you want to learn more about the blog post [content formatting](#blog-post-formatting) and how to promote social messages into blog posts.

:::tip

In this code example, only promoted blog posts from users `near` and `jacksonthedev.near` will appear in the Blog feed when someone browses the `/bosblog` URL.

:::

### Promoting posts

If you're using `near-discovery` you're all set, the <kbd>Promote</kbd> menu is already available using the [`v1.Posts.Feed`](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/v1.Posts.Feed) component.

If you're using a different gateway or your own custom feed, and you want to allow users to promote social messages into blog posts, you can integrate this `promoteToBlog` code snippet:

```js
const { accountId, blockHeight, item } = props;

const promoteToBlog = () => {
  if (state.loading) {
    return;
  }

  if (!context.accountId && props.requestAuthentication) {
    props.requestAuthentication();
    return;
  } else if (!context.accountId) {
    return;
  }

  State.update({
    loading: true,
  });

  const data = {
    index: {
      promote: JSON.stringify({
        key: context.accountId,
        value: {
          operation: "add",
          type: "blog",
          post: item,
          blockHeight,
        },
      }),
    },
  };

  Social.set(data, {
    onCommit: () => State.update({ loading: false }),
    onCancel: () =>
      State.update({
        loading: false,
      }),
  });
};
```

:::tip

Check the [`Posts.Menu`](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/Posts.Menu&tab=source) component for a complete implementation that includes a drop-down menu and a button to promote a blog post.

:::

---

## Blog post formatting

When writing blog posts, you can format the content using standard [Markdown syntax](https://www.markdownguide.org/basic-syntax/).
Markdown is an easy-to-read, easy-to-write language for formatting plain text.

The only two special cases that you should keep in mind when writing a blog post are:
- the blog post's title
- an optional header image

#### Header image

To define an image for your blog post, just add a markdown image link at the top of your post:

```md
![header-image](https://example.com/image.png)
```

#### Blog post title

To set the post's title, define it using a top heading tag:

```md
# This is the title of a demo blog post
```

:::tip

If you're new to Markdown, you might want to check this page about [basic writing and formatting syntax](https://www.markdownguide.org/basic-syntax/).

:::

---

## Writing a blog post

Adding a new blog post is simple. To publish a new blog post, you only need to:
1. Write a regular Near Social message

   <img src="/docs/bosblog/blog-promote1.png" width="60%" />

2. Repost the message and convert it to a Blog post

   Once the message has been posted, promoting it to a blog post is straight forward.
   Just click on the repost button, and select the `Blog` option:

   ![blog post](/docs/bosblog/blog-promote2.png)

3. That's it, your blog post has been published, and you can find it under the `Blog` tab in your [social profile](https://dev.near.org/near/widget/ProfilePage?accountId=bucanero.near&tab=blog):

   ![blog post](/docs/bosblog/blog-promote3.png)


:::note

You can find the published blog post example in [this link](https://dev.near.org/near/widget/BlogPostPage?accountId=bucanero.near&blockHeight=117452680&returnLocation=/near/widget/ProfilePage?accountId=bucanero.near&tab=blog).

:::
