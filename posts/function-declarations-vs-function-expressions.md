+++
author = "Rodrigo Calix"
title = "When to use Function declarations or Function expressions in JavaScript?"
date = "2022-10-04"
description = "Common functions in JS are defined in two ways, as function declarations or as function expressions, wanna learn which one to use and when?"
tags = [
    "javascript",
    "code-quality",
    "beginners"
]
categories = [
    "javascript"
]
series = ["Things-I-Wish-I-Knew-Before-In-JavaScript"]
aliases = ["function-declarations-vs-function-expressions"]
enableComments = false
+++
## What are function declarations and function expressions?

Basically you can define functions with the `function` keyword at least in two ways:

 with a **Function declaration** which starts with the `function` keyword, then the name of the function, then the arguments `()`, and finally the statements`{}`; Also as a **Function expression** which can be stored in a variable, a constant or passed through a function argument, the syntax is quite similar to a function declaration, however, a function expression can be anonymous or be named.

Here's an example of a function declaration:

```javascript
function toggleSwitch(/*arguments*/){
    // statements
}
```

An anonymous function expression:
```javascript
const toggleSwitch = function(/*arguments*/){
    // statements
}
```

A named function expression:
```javascript
const toggleSwitch = function switch(/*arguments*/){
    // statements
}

```

You could call all of those functions in the same way, with `toggleSwitch()`. So... what's the difference? Can I just use the one that looks prettier? Although it might seems like that, there are actual differences in the way they operate in your code, once you know them is easier to know which to use. Let's dig into it!

## Differences between each type of function
### Hoisting
Function declarations are available in it's scope from up to down in your code, but a function expression can't be called unless it has already been declared. This means that you can refer to a function declaration even before it has been declared, but not in a function expression. For example:

This one works and the content is logged:
```javascript
callMeMaybe();

function callMeMaybe(){
    console.log("here's my number 😏");
}
```

This one would throw an error:
```javascript
callMeMaybe();
// ReferenceError: Cannot access 'callMeMaybe' before initialization

const callMeMaybe = function(){
    console.log("Where you think you're going, baby?");
}

// Credit: Carly Rae Jepsen
```
So if for some reason you need to have access to functions on your code before they've been declared (perhaps to avoid obfuscation of other core functions, or to improve understanding of your code to others), then knowing this becomes handy.

### With `const` and `let` variables you can create block-scoped functions easily
constants and let variables are block-scoped. constants can only be defined once, and let variables even though they can be redefined, they can't be redefined twice with the `let` declaration unlike `var` statements. Same happens if you use them to define functions. For example:

This one throws a SyntaxError cause you can't have two constants with the same name:
```javascript
const hello = function(){
    console.log("Hello");
}

// SyntaxError: Identifier 'hello' has already been declared
const hello = function(){
    console.log("is it me you're looking for?");
}

hello();

// Credit: Lionel Richie
```

But you can redefine a Function Declaration:

```javascript
function hello(){
    console.log("Hello, it's me");
}

function hello(){
    console.log("Hello from the other siiide!");
}

hello();
// logs: "Hello from the other siiide!"

// Credit: Adele
```

This is useful if you need to block the scope of your functions to avoid their overriding from other sources and get unexpected behaviors. Also this can make debugging easier.

### Other things to take in account

- With variables you can make an object of functions (or methods) using the object definition syntax (`{}`), which could lead to more organized code. You could also add methods to a function declaration like this `myFunction.someMethod = ...`, however this was more of a consideration back in the old days, nowadays you could use classes which provide a nicer syntax. Still... there are notable differences I would say.
- Since function expressions can be anonymous, this might lead to confusion when that function has an error, but if you name them you can get more specificity in a [stack trace](https://developer.mozilla.org/en-US/docs/Web/API/console#stack_traces). However this could become more obvious when you define a function expression outside of a variable, like in a promise chain.

## Which approach should I use?
As many things in life, it depends, each project is different and there are tons of ways to achieve the same thing.

In my personal opinion, I would generally use function declarations cause I think they provide an easier readability. Having the word "function" at the start of a line makes it easier to know that you are defining a function than having "const" or "let" at the start of a line, it's also nice to know I can use them anywhere I want in their current scope. But in general I would rather use function expressions inside function declarations cause inside a function I would normally define variables to complement what the function actually does. But again, it depends, how do you think it best suits your needs?

At the end of the day I would say it depends a lot on you, the people and the project you are working on. So hopefully this article has given you useful insights about JavaScript functions.

## Some useful references that were used for this article:
- Go Make Things | [Function expressions vs. function declarations revisisted](https://gomakethings.com/function-expressions-vs.-function-declarations-revisisted/)
- MDN Web Docs | [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- MDN Web Docs | [Function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) 
- SentinelOne blog | [JavaScript Stack Trace: Understanding It and Using It to Debug](https://www.sentinelone.com/blog/javascript-stack-trace-understanding-it-and-using-it-to-debug/)

**Note: None person or website mentioned in this article is sponsoring this content**

## Until the next time!
I'll upload the next part of this [series](post/shorter-conditionals-truthy-falsy-values) next Tuesday, October 11th. If you liked this one, stick with me!

*This is a more recently (2023) modified article that I originally published at DEV: [Link to the original post](post/function-declarations-vs-function-expressions)*
