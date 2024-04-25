---
id: blog-posts
title: Blog Posts
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

The Blog post components enable your gateway to promote regular social posts into fully fledged blog posts.
In this article you'll learn how to set up the required components so you can define a custom URL to show a clean feed of blog posts.

## Setup

To set up the Blog post features on your [`near-discovery`](https://github.com/near/near-discovery/) gateway:

1. Add the [`Blog.Feed`](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/Blog.Feed) and [`BlogPostPage`](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/BlogPostPage) components
2. Add `Blog.Feed` and `BlogPostPage` to your `bos-components.ts` configuration:

<CodeTabs>
    <Github fname="bos-components.ts" language="js" value="Edit"
        url="https://github.com/near/near-discovery/blob/c275ab7d70a6ee7baf3a88ace1c2e02f605da644/src/data/bos-components.ts"
        start="160" end="165" />
</CodeTabs>


### Blog feed URL

To set a custom URL such as `/bosblog` for your Blog feed, and define which users will be shown on it, do the following changes on your `near-discovery` gateway:

1. Create a folder `src/pages/<customURL>` for your desired custom path (e.g., `/bosblog`)
2. Add this [`index.tsx`](https://github.com/near/near-discovery/blob/c275ab7d70a6ee7baf3a88ace1c2e02f605da644/src/pages/bosblog/index.tsx) file
3. Edit the `contributors` list, with the account(s) that you want to showcase on your blog feed:
   ```js
   const contributors = ['near', 'jacksonthedev.near'];
   ```

<CodeTabs>
    <Github fname="index.tsx" language="js" value="Create"
        url="https://github.com/near/near-discovery/blob/c275ab7d70a6ee7baf3a88ace1c2e02f605da644/src/pages/bosblog/index.tsx"
        start="1" end="50" />
</CodeTabs>

That's all, your gateway setup is done and you're ready to show your blog feed.
Check the next sections if you want to learn more about the blog post [content formatting](#blog-post-formatting) and how to promote social messages into blog posts.

:::tip

In this code example, only promoted blog posts from users `near` and `jacksonthedev.near` will appear in the Blog feed when someone browses the `/bosblog` URL.

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
1. Write a regular social message
2. Promote the message and convert it to a Blog post

<img src="/docs/bosblog/blog-promote1.png" width="60%" />

#### Promote a message to blog post

Once the message has been posted, promoting it to a blog post is straight forward.
Just click on the 3 dots next to your post (`...`), and select the `Promote this Post to Blog` option:

![blog post](/docs/bosblog/blog-promote2.png)

:::note

You can find the published blog post example in [this link](https://near.org/near/widget/BlogPostPage?accountId=bucanero.near&blockHeight=117452680&returnLocation=/near/widget/ProfilePage?accountId=bucanero.near&tab=blog).

:::

That's it, your blog post has been promoted and published, and you can find it under the `Blog` tab in your [social profile](https://near.org/near/widget/ProfilePage?accountId=bucanero.near&tab=blog):

![blog post](/docs/bosblog/blog-promote3.png)
