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

## call-outs

there are 4 kinds of call-outs

- lesson
- info
- warning
- danger

### lessons

the lesson call-out is used to mark the beginning of a lesson

*lessons come in 3 levels of difficulty:*

- *trivial: you will succeed if you copy and paste the sample code as presented*
- *moderate: trivial ... and also pay close attention surrounding text explanations*
- *challenging: moderate ... and also refer to documentation and supporting references*

*steps are called out with large font for easier skimming and the end of lesson is clearly marked with the word "done" and a thick line, all of which is handled via CSS*

*after the steps we include both success and failure verification to capture all possible cases (given prerequisites were met)*



<blockquote class="lesson">
<strong>your turn</strong> <span>do something meaningful</span><br><br>

- time to complete: **N mins**
- level of difficulty: **trivial**
- prerequisites
  - first prerequisite
  - second prerequisite

</blockquote>

<ol class="steps">


<li>do something</li>
<li>then another</li>
<li>and one final thing</li>

</ol>

###### did it work?

**You'll know it worked when** lorem ipsum dolor sit amet

**You'll know it worked when** lorem ipsum dolor sit amet

**You'll know it worked when** lorem ipsum dolor sit amet

###### did something go wrong?

**If you saw something unexpected**, lorem ipsum dolor sit amet

**If you saw something unexpected**, lorem ipsum dolor sit amet

**If you saw something unexpected**, lorem ipsum dolor sit amet

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

the JSON below will help you quickly generate call-outs with tabbed input

you can read about how this works here: https://code.visualstudio.com/docs/editor/userdefinedsnippets

the code seen below is also included with the NEAR Docs repo here:

website/.near/vscode/markdown.json

```json
{
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
	"NEAR Docs warning callout": {
		"prefix": "warning",
		"body": [
			"<blockquote class=\"warning\">",
			"<strong>heads up</strong><br><br>",
			"",
			"${1: what's up?}",
			"",
			"</blockquote>"
		],
		"description": "warning callout"
	},
	"NEAR Docs error callout": {
		"prefix": "danger",
		"body": [
			"<blockquote class=\"danger\">",
			"<strong>caution</strong><br><br>",
			"",
			"${1:why so serious?}",
			"",
			"</blockquote>"
		],
		"description": "error callout"
	},
	"NEAR Docs lesson callout": {
		"prefix": "lesson",
		"body": [
			"<blockquote class=\"lesson\">",
			"<strong>your turn</strong> <span>${1:active lesson title}</span><br><br>",
			"",
			"- time to complete: **${2:N mins}**",
			"- level of difficulty: **${3|trivial,moderate,challenging|}**",
			"- prerequisites",
			"  - ${4:first prerequisite}",
			"  - ${5:second prerequisite}",
			"",
			"</blockquote>"
		],
		"description": "lesson callout"
	},
	"NEAR Docs lesson steps": {
		"prefix": "steps",
		"body": [
			"<ol class=\"steps\">",
			"",
			"  <li>${1:do something}</li>",
			"  <li>${2:then another}</li>",
			"  <li>${3:and one final thing}</li>",
			"",
			"</ol>"
		],
		"description": "success callout"
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
	"NEAR Docs full lesson callout": {
		"prefix": "lessonfull",
		"body": [
			"<blockquote class=\"lesson\">",
			"<strong>your turn</strong> <span>${1:active lesson title}</span><br><br>",
			"",
			"- time to complete: **${2:N mins}**",
			"- level of difficulty: **${3|trivial,moderate,challenging|}**",
			"- prerequisites",
			"  - ${4:first prerequisite}",
			"  - ${5:second prerequisite}",
			"",
			"</blockquote>",
			"",
			"<ol class=\"steps\">",
			"",
			"  <li>do something</li>",
			"  <li>then another</li>",
			"  <li>and one final thing</li>",
			"",
			"</ol>",
			"",
			"###### Did it work?",
			"",
			"**You'll know it worked when** ...",
			"",
			"",
			"",
			"###### Did something go wrong?",
			"",
			"**If you saw something unexpected**, here's what may have happened ...",
			"",
			"",
			"",
			"<blockquote class=\"success\">",
			"<strong>finished!</strong><br><br>",
			"",
			"what should we know?",
			"",
			"</blockquote>"
		],
		"description": "lesson callout"
	},
	"NEAR Docs work in progress callout": {
		"prefix": "wip",
		"body": [
			"<blockquote class=\"warning\">",
			"<strong>work in progress</strong> <span>${1:intended goal of wip}</span><br><br>",
			"",
			"${2: what's happening?  what's planned?}",
			"",
			"</blockquote>"
		],
		"description": "warning callout"
	},
}
```
