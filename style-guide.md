This style guide provides a set of editorial guidelines for anyone writing developer
documentation for NEAR related projects.

# Goals and audience

This guide codifies and records style decisions so that you can write documentation
that is consistent with existing documentation, and ensure that what you write is
as easy as possible to understand. We hope that you'll join us in striving for
high-quality documentation.

> **Note**: Everything in this guide is a guideline, not a draconian rule. Therefore,
> there might be contexts where it makes sense to diverge from our guidelines to make
> your documentation better.

# Tone and content

## Be conversational and friendly

Aim for a voice and tone that's conversational, friendly, and respectful without being
overly colloquial or frivolous; a voice that's casual and natural and approachable, not
pedantic or pushy. Try to sound like a knowledgeable friend who understands what the
developer wants to do.

Remember that many readers are not native English speakers, many of them come from
cultures different from yours, and your document may be translated into other languages
(see [Language and grammar](#language-and-grammar) for more on this). 

## Don't pre-announce in the documentation

Avoid documenting future features or products, even in innocuous ways (i.e, "we're
currently considering _\<possible feature enhancement\>_...").

## Use descriptive link text

When you're writing link text, use a phrase that describes what the reader will see after
following the link. Links should make sense without the surrounding text. That can take
either of two forms:

- The exact text of the title or heading you're referencing.
- A description of the destination page capitalized as ordinary paragraph text.

## Page titles and headings

Page titles should use title case (for example, "Deploy your App in Production"). Headings
within a page should use sentence case (for example "Test your app with a simple UI").

## Typography

Please use the following conventions, which are derived from Google's style guide and from
developer documentation published by O'Rielly media group:

- `code font` is used for command-line input and output, and for references to code entity
  names (variables, types, etc).
- *`italic code font`* is used to show where a reader should swap in the name of a server
  or other implementation-specific detail in a syntax example or command example.
- *italic font* is used when introducing a term for the first time
- **Bold font** is used for file and directory names, UI names, error message text, and
  for emphasis

## Write accessibly

General guidelines to improve reading accessibility:

- Place a paragraph's key information in the first sentence to aid in *scannability*. To
  learn more about scannability, see [How Users Read on the
  Web](https://www.nngroup.com/articles/how-users-read-on-the-web/).
- Break up walls of text (large paragraphs) to aid in scannability. You can do this by
  separating paragraphs, adding headings, and using lists.
- Use shorter sentences, and avoid complex-compound sentences. Try to use fewer than 26
  words per sentence.
- Define acronyms and abbreviations on first use, and repeat acronym definitions as necessary
  to avoid confusing readers.
- Use parallel writing structures for similar things. For example, items in a list should
  be similar.

## Write for a global audience

We write our documentation in US English, but it should be as accessible as possible to the
worldwide developer community. The rules below help developers who use machine translation to
read NEAR docs, or who speak English as a secondary language:

- Use the present tense.
- Write dates and times in unambiguous and clear ways.
- Provide context. Don't assume the reader already knows what you're talking about.
- Avoid negative constructions when possible. Consider whether it’s necessary to tell the user
  what they can’t do instead of what they can.
- Use the active voice. The subject of the sentence is the person or thing performing the action.
  With passive voice, it's often hard for readers to figure out who's supposed to do something.
- Address the reader directly. Use *you*, instead of *the user* or *they*.
- Define abbreviations. Abbreviations can be confusing out of context, and they don't translate
  well. Spell things out whenever possible, at least the first time you use a given term.
- Don't use the same word to mean different things.

# Language and grammar

Following the guidelines below ensures that our documentation is as approachable as possible for
as many readers as possible. In fact, all of these language and grammar guidelines improve the
results of machine translating documentation into other languages.

## Use the second person

> Use "you" rather than "we."

In general, use the second person to refer to the reader in your docs rather than the first
person— *you* instead of *we*.

It's also important to figure out who the *you* is that you're addressing (a developer? a sysadmin?
someone else?), and to be consistent about that. Make it clear to the reader who you expect them
to be (sometimes with an explicit *audience* sentence near the beginning of the document).

Finally, always use the third person when describing NEAR's actions or features (avoid "this
lets us" in favor of "this lets NEAR").

## Use active voice

> Make clear who's performing the action.

In general, use the active voice (in which the grammatical subject of the sentence is the person
or thing performing the action) instead of passive voice (in which the grammatical subject of
the sentence is the person or thing being acted upon), though there are exceptions. For example:

Not recommended:

* ”The service is queried, and an acknowledgment is sent.”
* “The service is queried by you, and an acknowledgment is sent by the server.”

Recommended:

* “Send a query to the service. The server sends an acknowledgment.“

## Use standard American spelling and punctuation

In general, in cases where American spelling differs from Commonwealth/"British" spelling, use
the American spelling.

## Put conditional clauses before instructions, not after

Say you want to tell the audience to do something in a particular circumstance. If possible,
mention the circumstance before you provide the instruction; that way, the reader can skip the
instruction if the circumstance doesn't apply.

# Formatting, punctuation, and organization

* Use numbered lists for sequences.
* Use bulleted lists for most other lists.
* Use description lists for pairs of related pieces of data.

> Use numbered lists for sequences, bulleted lists in most other contexts, and description
> lists for pairs of related pieces of data.

* Use serial commas.

> Use commas to separate items in series, and use commas to separate certain kinds of clauses.
> In a series of three or more items, use a comma before the final *and* or *or*.

* Put code-related text in `code font`.

> In ordinary text sentences (as opposed to, say, code samples), use code font to mark up most
> things that have anything to do with code (example variables, product keywords, etc).
> In Markdown, use backticks (`).

* Put UI elements in **bold**.

> If you do document elements of the UI, put UI element names in **bold**, and use appropriate
> nouns and verbs to describe how to interact with them.

* Use unambiguous date formatting.

> Expressing dates and times in a clear and unambiguous way helps support writing for a global
> audience and reduces confusion. We recommend using the YYYY-MM-DD format for dates.

# Credits and more style guidance

This style guide is inspired by and borrows from [Google's developer documentation style
guide](https://developers.google.com/style/), which you can use for anything not covered here.
For anything not found in Google's style guide, see
[Microsoft's Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).
