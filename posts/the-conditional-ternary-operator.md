+++
author = "Rodrigo Calix"
title = "The conditional (ternary) operator in JS is simpler than it seems"
date = "2022-10-25"
description = "Probably in some occasion you have seen pieces of JS code from other programmers and suddenly you saw something like a question mark (`?`) and then a colon (`:`) and maybe you didn't knew what was going on there, I remember this happened to me and I felt a little confused, but after I learned this I realized how handy and useful it is in so many situations."
tags = [
    "javascript",
    "tips",
    "beginners"
]
categories = [
    "javascript"
]
series = ["Things-I-Wish-I-Knew-Before-In-JavaScript"]
aliases = ["the-conditional-ternary-operator"]
enableComments = false
+++
In the previous part of this series I talked about how you can shorten your conditionals with truthy and falsy values. So if you haven't read that one I would recommend that you do cause this is a continuation, [Link here!](post/shorter-conditionals-truthy-falsy-values)
___

![Cover image for the post that shows a simpler way to read a JS conditional”](/images/posts/conditional-ternary-operator/cover.png)

Probably in some occasion you have seen pieces of JS code from other programmers and suddenly you saw something like a question mark (`?`) and then a colon (`:`) and maybe you didn't knew what was going on there, I remember this happened to me and I felt a little confused, but after I learned this I realized how handy and useful it is in so many situations. 

First I'll explain how does it work and then I'll show 3 use cases were it can be helpful.

## What is the conditional (ternary) operator?
It helps you to make decisions in your code, it basically does something similar to what you could do with an `if`, `else` and `else if` statements but in a shorter way. You can use them to assign content or execute code. First you declare a condition, if the condition is met, then the expression after the `?` (question mark) is executed, else, the expression after the `:` (colon) is executed, for example:

```javascript
// logs: "condition it's true"
console.log(true ? "condition it's true" : "condition it's false");

// logs: "condition it's false"
console.log(false ? "condition it's true" : "condition it's false");
```

You can also chain the ternary operator, after the `:` (colon), you could add another condition and repeat the process again, for example:

```javascript
let greeting = "Hallo y'all!";

// logs: "wut? 🤨", cause none of the conditions is met
console.log(greeting == "hello" ? "world" : greeting == "welcome" ? 'everyone' : "wut? 🤨");
```
 To make it easier to you, I made a graphic that shows you a simple way of how you could read a conditional (ternary) operator in the code:

![The graphic shows a text that says something like: "if" condition met "then" expression when true, "else" expression when false](/images/posts/conditional-ternary-operator/ternary-graphic.png)

But I also made one of how you could read a chained conditional (ternary) operator:

![The graphic shows a text that says something like: "if" condition met "then" expression when true, "else if" another condition, "then" expression when true, "else" expression when false](/images/posts/conditional-ternary-operator/chained-ternary-graphic.png)

Let me clarify that these graphics only show you a way or an equivalent of how you could read them for easier understanding.

Now lets see a few cases were you could use the ternary operator.
## Use cases

### Assign values

Did you ever wrote a code like this?

```javascript
function doesApprove(score){
    let message = "";
    if(score >= 75){
        message = "You approved!"
    } else{
        message = "Sorry, try again. You can do it!"
    }
    return message;
}

console.log(doesApprove(60));
```

I did things like this in the past, but with the ternary operator you could reduce this function statements into two lines, or one line.

Two lines if you need the variable for some reason:

```javascript
function doesApprove(score){
    let message = score >= 75 ? "You approved!" : "Sorry, try again, you can do it!";
    return message;
}

console.log(doesApprove(75));
```

One line when adding it directly to the `return` statement:
```javascript
function doesApprove(score){
    return score >= 75 ? "You approved!" : "Sorry, try again, you can do it!";
}

console.log(doesApprove(100));
```

Did you notice how practical it is? I showed it to you in this way to let you know that you can use it to assign data to variables but also to `return` statements, or basically where you need to assign data.

### Code execution
I wouldn't say this is very common, probably cause `if` and `else` statements provide more semantic when it comes to code execution, but to show you that this is possible I'll give you an example.

Lets say that you are writing an app that requires the use of the Blob constructor, if this feature is available in the browser, the app will be rendered, else it will show an alert to tell you that the browser is outdated:

```javascript

// Initiate the script
initiate();

function initiate(){
    isBlobCompatible() ? renderApp() : notCompatibleMsg();
}

/**
 * test if the Blob constructor is present
 * @returns {Boolean}
**/
function isBlobCompatible(){
    try{
        new Blob();
        return true;
    } catch (error){
        return false;
    }
}

// Render the app
function renderApp(){
    console.log('Render the app!');
}

// Sends an alert when the browser is not compatible
function notCompatibleMsg(){
    alert("Sorry but your browser is not compatible");
}
```
If you test this in the console of your browser is very likely that you will get a log saying "Render the app!", cause modern browsers have the blob feature, but if you change the `new Blob()` part in the code for a feature that doesn't exist, and probably never will, like `new Rickroll()`, you would get an alert that says "Sorry but your browser is not compatible".

As you can see, it was the ternary operator the one who executed the code, even though it might not be common to use it like this, there could be cases where this becomes handy.

### String interpolation
This could also apply to value assignments, but I thought I should show you how practical the ternary operator becomes in this cases.

For example, let's say you want to display a really happy face (😆) if someone score is equal to 100,  a happy face (😁) if the score is greater than or equal to 75, and a sad face (😖) if It's below 75:

```javascript

function scoreMessage(score){
    return `Score: ${score} ${score == 100 ? '😆' : score >= 75 ? '😁': '😖'}`
}

// logs: Score: 80 😁
console.log(scoreMessage(80));

// logs: Score: 74 😖
console.log(scoreMessage(74));

// logs: Score: 100 😆
console.log(scoreMessage(100));

```

You could also use it with HTML to conditionally display GUI elements or not, to dynamically change content... theres a lot here that I wish I could show you!!!

## Final thoughts
There's so much you can do with two characters (`?`, `:`), this is something that when I learned it, it felt somehow like an step up in my JavaScript learning, I hope you feel the same too and that you give it a good use.

## Useful references

- MDN Web Docs | [Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

**Note: None person or website mentioned in this article is sponsoring this content**

## Until the next time!
If you feel like you have learned something or liked this article, be sure to read the next part of this series that I will publish the next Tuesday, November 1.

*This is a more recently (2023) modified article that I originally published at DEV: [Link to the original post](post/the-conditional-ternary-operator)*

