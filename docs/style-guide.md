---
id: style-guide
title: NEAR Docs Style Guide
sidebar_label: docs style guide
---

every page includes

- title
- main body
- right side table of contents

some pages are also associated with a left side navbar

the table of contents is rendered automatically using H2 and H3 tags in the document

## callouts

there are 5 kinds of callouts

- lesson
- success
- info
- warning
- danger

### lessons

the lesson callout is used to mark the beginning of a lesson

<blockquote class="lesson">
<strong>your turn</strong><br><br>

- time to complete: **5 mins**
- level of difficulty: **trivial**
- prerequisites
  - first prerequisite
  - second prerequisite

</blockquote>

lessons come in 3 levels of difficulty:

- trivial: you will succeed if you copy and paste the sample code as presented
- moderate: trivial ... and also pay close attention surrounding text explanations
- challenging: moderate ... and also refer to documentation and supporting references

### success

the success callout is used to mark the end of a lesson

<blockquote class="success">
<strong>finished!</strong><br><br>

what should we know at this point?

</blockquote>

### info

the info callout is used to point something out to the reader.

yes, there's a rumor the paw marks might have been left by a NEARkat, but who knows?

<blockquote class="info">
<strong>did you know?</strong><br><br>

tell me

</blockquote>


### warning

the warning callout is used to call attention to something that might be confusing

<blockquote class="warning">
<strong>heads up</strong><br><br>

what's up?

</blockquote>

### danger

the danger callout is used to call attention to something that might cause problems with sensitive or valuable data

<blockquote class="danger">
<strong>caution</strong><br><br>

why so serious?

</blockquote>

## code

code is styled using markdown with `single` or triple backticks


```js
let like = this;

// and notice it can be copied using the button at the right --->
```

---

## contributing to the docs?

if you're using Visual Studio Code, create a new User Snippet for markdown.

the JSON below will help you quickly generate callouts with tabbed input

you can read about how this works here: https://code.visualstudio.com/docs/editor/userdefinedsnippets

```json
{
	"NEAR Docs lesson callout": {
		"prefix": "lesson",
		"body": [
			"<blockquote class=\"lesson\">",
			"<strong>your turn</strong><br><br>",
			"",
			"- time to complete: **${1:N mins}**",
			"- level of difficulty: **${2|trivial,moderate,challenging|}**",
			"- prerequisites",
			"  - ${3:first prerequisite}",
			"  - ${4:second prerequisite}",
			"",
			"</blockquote>"
		],
		"description": "lesson callout"
	},
	"NEAR Docs info callout": {
		"prefix": "info",
		"body": [
			"<blockquote class=\"info\">",
			"<strong>did you know?</strong><br><br>",
			"",
			"${1:tell me}",
			"",
			"</blockquote>"
		],
		"description": "info callout"
	},
	"NEAR Docs success callout": {
		"prefix": "success",
		"body": [
			"<blockquote class=\"success\">",
			"<strong>finished!</strong><br><br>",
			"",
			"${1:what should we know?}",
			"",
			"</blockquote>"
		],
		"description": "success callout"
	},
	"NEAR Docs warning callout": {
		"prefix": "warning",
		"body": [
			"<blockquote class=\"warning\">",
			"\t<strong>heads up</strong><br><br>",
			"",
			"${1: what's up?}",
			"",
			"</blockquote>"
		],
		"description": "warning callout"
	},
	"NEAR Docs error callout": {
		"prefix": "error",
		"body": [
			"<blockquote class=\"error\">",
			"<strong>caution</strong><br><br>",
			"",
			"${1:why so serious?}",
			"",
			"</blockquote>"
		],
		"description": "error callout"
	}
}
```
