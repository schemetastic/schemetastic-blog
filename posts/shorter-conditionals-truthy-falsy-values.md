+++
author = "Rodrigo Calix"
title = "Shorter conditionals with Truthy and Falsy values in JS"
date = "2022-10-11"
description = "I know that when you are working with conditions in JS very easily you could end up with an `if` statement with a lot of AND's (`&&`) but also a lot of OR's (`||`), this can lead to a long condition that can be hard to read and also bring some complications to your code (more than the ones that probably already have), that's why in this part of the series and the next one I'll give you a few tips to make conditionals shorter and easier to read."
tags = [
    "javascript",
    "tips",
    "beginners"
]
categories = [
    "javascript"
]
series = ["Things-I-Wish-I-Knew-Before-In-JavaScript"]
aliases = ["truthy-falsy-values-for-shorter-conditionals"]
enableComments = false
+++

I know that when you are working with conditions in JS very easily you could end up with an `if` statement with a lot of AND's (`&&`) but also a lot of OR's (`||`), this can lead to a long condition that can be hard to read and also bring some complications to your code (more than the ones that probably already have), that's why in this part of the series and the next one I'll give you a few tips to make conditionals shorter and easier to read. 

In this part I'll show you how you can rely on truthy and falsy values to shorten your conditions, but first let me give you...

## A brief intro to conditionals
Conditionals allow you to make choices with logic in your code by providing you a Boolean context, this means that a conditional can be `true` or `false`. A few small examples:

```javascript
// logs true
console.log(Array.isArray(['css', 'js']) == true)

// logs false
console.log(Array.isArray(['css', 'js']) == false)

// logs true cause the condition is met
console.log(isNaN(123) == false)
```
Conditionals can be used in a wide range of cases, but for practical purposes, we'll use them in this article with the **`if`** statement which you can use to evaluate a condition, **when it's conditions are evaluated as `true` then it's statements are executed**.

```javascript
if(Array.isArray("I'm a string") == false){
    // The condition it's true, so the code is executed
    console.log('The value is not an Array');
}
```

But you might ask...

## What are truthy and falsy values?
In a Boolean context, [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) values are considered to be `true` and [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) values are considered to be `false`.

Let's see a few examples:
```javascript
Boolean(true) //true
Boolean(false) //false

Boolean(123) //true
Boolean(-123) //true
Boolean(0) //false
Boolean(NaN) //false

Boolean("She loves me?") //true, and yet somehow false, haha.
Boolean("") //false

Boolean({}) //true
Boolean([]) //true

Boolean() //false, because it's undefined
```
Within conditionals, these types of values are evaluated in this way too:

```javascript
function truthyOrFalsy(value){
    if(value){
        console.log("Truthy")
    } else{
        console.log("Falsy")
    }
}

// logs "Truthy"
truthyOrFalsy("Can I succeed?");
```

Now that those things are clear, let's get started with the first tip to shorten your conditions.

## You don't always need the equality (`==`) and inequality (`!=`) operators
As you saw in the example above you don't always need to use these operators to verify data, in many cases you can rely on truthy and falsy values to shorten your condition. However this can be a bit tricky at first, so I think one of the best ways to show you this is by giving you some use cases.

### When you use functions or methods that return a boolean
Methods such as `Array.isArray()`, `isNaN()`, `String.prototype.includes()` among many others, return boolean values. If you are using any of these methods, it is very likely that you don't need these operators. For example:

Let's say that you want to check if an argument is an array:
```javascript
function checkCart(cart){
    if(Array.isArray(cart)){
        console.log("The cart argument is an Array");
    }
}

// logs: "The cart argument is an Array"
checkCart(['t-shirt', 'costume']);
```

Again, you don't need the equality operator cause you can only expect a boolean, in this case a `true` value. But what if I'm expecting a `false` value? for that we can use the [Logical NOT operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) (`!`), this operator converts a falsy value to truthy and vice versa, for example: 

```javascript
console.log(!true) //false
console.log(!false) //true

console.log(!"She loves me?") //false, makes more sense to me now.
console.log(!undefined) //true
```
So if you are expecting a value to be false, you can use this operator cause it will basically transform the `false` value to `true`, making that your condition be truth. Now an example of this:

```javascript
function message(msg){
    if(!msg.includes('fail!')) console.log(msg);
}
message("You can succeed!");
```


### When you are expecting or not that an argument has a value
This can be another good use case if you only need to know if a function argument or a variable has or not some value, for example:

```javascript
function setConfig(params){
    if(!params) throw Error('No parameters provided');
    // Your code if `params` is defined
    var userParams = validateParams(params);
}

//Uncaught Error: No parameters provided
setConfig();
```
If we wanted to check if a string is empty:
```javascript
function isEmptyString(str){
    if(!str && typeof str == 'string'){
        console.log('Empty string');
    } else {
        return;
    }
}

//logs: "Empty string"
isEmptyString("");
```

## Summary
Understanding how conditionals work and what are truthy and falsy values, can help you to make shorter conditionals that can be easier and simpler to read, this works not only with `if` statements, you can use this approach with template literals, the conditional (ternary) operator, and basically where you can use conditionals.

## Helpful references
- MDN Web Docs | [Making decisions in your code - conditionals](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals)
- MDN Web Docs | [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
- MDN Web Docs | [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 
- MDN Web Docs | [Logical NOT operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

**Note: None person or website mentioned in this article is sponsoring this content**

## Until next time!

If you feel like you have learned something or liked this article, be sure to read the next part of this series that I will publish the next Tuesday, October 18. In that part I'll give you more tips on how to shorten your conditionals and make them easier to read.

*This is a more recently (2023) modified article that I originally published at DEV: [Link to the original post](post/shorter-conditionals-truthy-falsy-values)*