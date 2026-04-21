+++
author = "Rodrigo Calix"
title = "TypeLib JS (part 2) - grouped types"
date = "2024-02-12"
description = "TypeLib JS makes easy to group types, such as numeric or number types, errors, function, truthy, falsy and more!"
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
aliases = ["typelib-js-kinds"]
enableComments = false
canonicalUrl = "https://dev.to/schemetastic/typelib-js-part-2-grouped-types-2g9k"
+++

![Cover image for the post that shows how TypeLib JS groups data types in groups, the shown groups are: `isNumber`, `isNumber`, `isFunction`, `isTruthy`, `isNullish`, `isKinds` the last group wrps the different groups in an array.”](/images/posts/typelib-js-grouped-types/cover.gif)

As I promised in the past article [(Click here if you want to read it)](post/introducing--typelib-js), I'll explain how you can use TypeLib JS to verify groups of data. But before, if you haven't seen it...

Project page: [typelib.schemetastic.com](https://typelib.schemetastic.com/)

---

As we learned in the past article, TypeLib makes data verification easy, for example, you can verify values such as `NaN`, `Infinity` and `-Infinity`. e.g.

```js
type(0/0).is; // "nan"
type(1000/0).is; // "infinity"
type(-1000/0).is; // "-infinity"
type(123).is; // "number"
```

Pretty neat huh? Being able to do that can help you to avoid mistakes that could break your code. Imagine, for example, that you are getting a user input, let's say, a pointer coords X an Y and then that number is divided... but what if one of those numbers gets `0`? An error like that could break the app.

TypeLib is very specific detecting types. For example, it can distinguish between different types of functions, different types of errors and other data. But what if you don't need to be that specific? Maybe you just need to detect any numeric value, any function or any error. That's why TypeLib also includes other properties aside from `.is` to help you to verify wider group types, I'll explain each shortly:

## `.isNumber`
Includes, numbers (bin, octal, decimal, hex), NaN, Infinity and -Infinity.

```js
type(0/0).isNumber; // true
type(1000/0).isNumber; // true
```

## `.isNumeric`
Includes the same types as the `.isNumber` property, but also includes big integers.

```js
type(123n).isNumeric; // true
type(123n).isNumber; // false
```
[Learn more about Big Integers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type)

## `.isFunction`
Includes, normal functions (arrow included), generator functions and classes.

[Classes are a type of function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#defining_classes)

## `.isTruthy`
Any truthy value, e.g. `123`, `"non-empty strings"`, `true`.

[Truthy values](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)

## `.isFalsy`
Any falsy value, e.g. `NaN`, `null`, `undefined`, `""`, `0`, `false`.

[More on falsy values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

## `.isNullish`
`null` and `undefined`. Unlike any other value, they don't have any accessible property.

```js
null.toString; // Uncaught TypeError: null has no properties
```
[Nullish value](https://developer.mozilla.org/en-US/docs/Glossary/Nullish)

## `.isPrimitive`
Almost everything in JS is an object, but some data is treated as primitive values, there are 7 types: numbers, strings, bigint, boolean, symbol, undefined and null.

Don't be misled because `typeof` detects `null` as an object, [This is considered a bug](https://developer.mozilla.org/en-US/docs/Glossary/Null).

[More about primitive types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)

## `.isObject`
Anything that is not a primitive is considered an object, from plain objects `{}`, arrays `[]`, types generated from constructors or classes e.g. `new Blob()`, etc.

## `.isError`
Any kind of error, SyntaxError, TypeError, Error, ReferenceError, etc.

[Learn more about the different types of errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

## `.kinds`
And at last, this property contains an array with all the kinds that a type has based on the above list.

```js
type(123).kinds; // [ "truthy", "numeric", "number", "primitive" ]
type("").kinds; // [ "falsy", "primitive" ]
type(null).kinds; // [ "falsy", "nullish", "primitive" ]
```

In the next article I'll cover how TypeLib makes easier debugging and verifying data with it's methods `.isIt()`, `.isNot()` and its function `typeErrorIf()`.

---

## Support this project
As you can notice, producing this content and this library requires a lot of hours of research and efforts. And this library is offered for free to everyone under the MIT license. **But it would help me a lot if you give it a star 🌟 on GitHub, and if you like it, you can spread the word 📢 if you want to.**

[Link to the repo](https://github.com/schemetastic/typelib-js)
