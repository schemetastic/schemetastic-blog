+++
author = "Rodrigo Calix"
title = "Introducing TypeLib JS - simplified type detection and debugging"
date = "2024-02-07"
description = "Verifying data types in JS is hard! And it can easily break code!!! TypeLib JS makes it easy to validate +35 data types"
tags = [
    "javascript",
    "opensource",
    "code-quality",
    "library"
]
categories = [
    "javascript",
    "library"
]
series = ["TypeLib-JS"]
aliases = ["typelib-js-intro"]
enableComments = false
canonicalUrl = "post/introducing--typelib-js-8bd"
+++

![Cover image for the post that shows a comparisson of TypeLib JS agains the typeof operator, TypeLib shows null, array, blob and nan types detection, while typeof shows for these: object, object, object and number.”](/images/posts/introducing-typelib-js/cover.gif)

If you want to see it in action, check out the project landing page at: [typelib.schemetastic.com](https://typelib.schemetastic.com)

## Why I created this project?
**Verifying data types in JS is hard! And it can easily break code!!!
🫳🎤**

...

🤏🎤 Okay, let explain in more detail.

JavaScript can handle dozens of types of data (most of them are some sort of object), but each type behaves differently, for example, a `"string"` doesn't behave in the same way as a `new String("does")`.

To show you this, check some outputs that the native `typeof` returns:

```js
typeof []; // object
typeof NaN; // number
typeof Infinity; // number
typeof null; // object [this is a bug actually]
typeof new Date(); // object
typeof new String("does"); // object
typeof new Blob(); // object
```
Arguably, `NaN`, `Infinity` and `-Infinity` are like numbers... but not exactly, these are the kind of things that can break code if you are not aware of. If you wanted to individually verify these types, you would need to use different methods. TypeLib provides a unified experience to verify types.

Now check the TypeLib JS outputs for the same data:

```js
type([]).is; // array
type(NaN).is; // nan
type(Infinity).is; // infinity
type(null).is; // null
type(new Date()).is; // date
type(new String("does")).is; // stringobject
type(new Blob()).is; // blob
```
It makes more sense, doesn't it? You are actually receiving the results you are expecting with no complication, and it is semantic! But not just that, TypeLib was successfully tested with over 35 types of data... but... what if you don't need to be so specific? 

TypeLib JS also classifies data in 9 different groups, for example, the `.isNumeric` property classifies numbers, NaN, Infinity, -Infinity and Big integers in that group. **In the next post that will be released in the next few days, I will explain this in detail; And in a different post, I will explain how you can use it to debug code with `typeErrorIf`.**

## How to install TypeLib JS?

In the terminal:
```shell
npm i typelib-js
```
You can check the documentation for more details, (link of the repo below).

## Support the project!

To create this project, I had to spend weeks researching, writing code, tests and documentation, making the website and more. And it's free under the MIT license.

**One of the best ways to support this, is giving me a star 🌟 on GitHub, and if you want to, you can spread the word 📢. Of that way, more people will use it.**

[Link to the repo 🌟](https://github.com/schemetastic/typelib-js)
