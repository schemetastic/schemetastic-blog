+++
author = "Rodrigo Calix"
title = "Squeeze out the potential of template literals in JS"
date = "2022-11-01"
description = "Back in the old days if you wanted to interpolate strings with variables and do line breaks you would usually use complicated methods to do this, sometimes they were like a nightmare to work with, however with template literals the game changed and now the experience is a lot smoother."
tags = [
    "javascript",
    "deeper-learning",
    "tips",
    "beginners"
]
categories = [
    "javascript"
]
series = ["Things-I-Wish-I-Knew-Before-In-JavaScript"]
aliases = ["squeeze-template-literals-potential"]
+++
In the previous part of this series I talked about how you can shorten your conditionals with truthy and falsy values. So if you haven't read that one I would recommend that you do cause this is a continuation, [Link here!](post/shorter-conditionals-truthy-falsy-values)
___
In the past article I mentioned about string interpolation and how does the ternary operator becomes handy in these cases, however I knew that there was a lot more to say about it. But instead of focusing on the ternary operator, this time I'll focus more on the template literals (or template strings).

First I'll talk about what are template literals and then I'll give you a few tips and examples to help you squeeze out it's potential.

Lets get started!

## What are template literals?
Back in the old days if you wanted to interpolate strings with variables and do line breaks, you would probably do something like: 

```javascript
function welcomeMsg(userName){
    var msg = "Hello " +  userName + ". Welcome! \n\
We work hard to give you a good experience.\n\
We even use escape sequences and backslashes \n\
in our code to do line breaks!"
    console.log(msg)
}

welcomeMsg('Mom');
/*logs: Hello Mom. Welcome! 
We work hard to give you a good experience.
We even use escape sequences and backslashes 
in our code to do line breaks!*/
```

Sometimes this was like a nightmare to work with, however with template literals the game changed and now the experience is a lot smoother.

To define them, instead of using apostrophes (`'`) or quotation marks (`"`), you use backticks (`` ` ``). They literally add what's inside of them, so if you make line jumps they are automatically added, but more than that, you can easily do string interpolations with embedded expressions by adding the dollar sign and curly brackets `${expr}`, let's see an example:

```javascript
/**
 * Generates a garden with string literals
 * @param {String} flower A unicode of a flower
 * @param {String} animal A unicode of an animal
 * @param {String} house A unicode of a house
*/
function generateGarden(flower, animal, house){
    console.log(`
            🌤️

    🦋  🦋
🌲🌲${flower.repeat(3)}${animal}${house}🌲
`);
}

generateGarden('🌹','🐕', '🏡');
/*logs:
            🌤️

    🦋  🦋
🌲🌲🌹🌹🌹🐕🏡🌲
*/

generateGarden('🌻','🐇', '🛖');
/*logs:
            🌤️

    🦋  🦋
🌲🌲🌻🌻🌻🐇🛖🌲
*/
```

Pretty smooth huh? Now let me give you a few tips so you can max out even more they potential.

## A few tips to squeeze out the potential of template literals
As you surely notice, in the embedded expressions you can add variables that have content, and it will be displayed in the output. But you are not limited to that, cause you also can:

### Use them with built-in objects and methods
Inside of them you can use string manipulation and conversion methods like `toLowerCase()`, `replace()`, `repeat()` (like in the example above); But also you could use mathematical operations and also number transformation methods like `parseInt()`, `toFixed()`. Lets see an example:

```javascript
let pubTitle = 'Simple & lightweight JS frameworks';
let rating = 5;
let words = 800;

console.log(`
Post: ${pubTitle.toUpperCase()}
Rating: ${"⭐".repeat(rating)}
Estimated Reading time: ${(words/240).toFixed(1)} minutes 🕒
`);

/*logs: 
Post: SIMPLE & LIGHTWEIGHT JS FRAMEWORKS
Rating: ⭐⭐⭐⭐⭐
Estimated Reading time: 3.3 minutes 🕒
*/
```

### Create your own custom functions to return content
Of course, you don't want to over bloat the content you embed in the string literals, in these cases, writing your own custom functions that return a string becomes a handy approach. For example:


```javascript
// To-do list
const todo = [
    'Get out from bed',
    'Stop procrastinating',
    'Have a nice day!'
]

/**
 * Transforms an array into a list with bullets
 * @param {Array} todoList A list of to-dos
 * @returns {String} the to-do list with bullets and line breaks
*/
function getTodoList(todoList){
    // Add a bullet to every item
    todoList.forEach(function(item, index){
        todoList[index] = `◉ ${item}`
    });
    // convert the array to a string and replace commas with line breaks
    return todoList.toString().replaceAll(',', '\n');
};

console.log(`
To-do list of Today!
${getTodoList(todo)}
`);

/*logs:
To-do list of Today!
◉ Get out from bed
◉ Stop procrastinating
◉ Have a nice day!
*/
```

### Use operators to conditionally display content 
Also you can use operators such as the ternary operator (`?`, `:`), the OR (`||`) operator, and others to conditionally display content.

I already covered a bit of this in the [past article](post/the-conditional-ternary-operator#string-interpolation) but I'll give you another example of it:

```javascript
console.log(`Network status: ${navigator.onLine ? 'Online ✅' : 'Offline ❌'}`);
```
If you turn off your network connection and then test this line of code in your browser console, you should receive a message like this: `Network status: Offline ❌`. If you turn on your network connection and run that line of code, you should receive the message `Network status: Online ✅`.

### Closing words
Yes, for sure you could have done things like these in the past before string literals were incorporated in JS, but the difference is that now you actually want to do those things instead of searching for other alternatives. For example, now you might not need to add a template system in your project cause JS already comes with one, this could mean less packages installation and less maintenance for your project.

Hopefully this article gave you ideas so you can use template literals in a creative way.

## Useful references

- MDN Web Docs | [Template literals (Template strings)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

**Note: None person or website mentioned in this article is sponsoring this content**

### Until the next time
The next week I'll publish another article, but... for now this series will have a stop, maybe in the future I'll add more articles. The next two weeks I want to write about different stuff, then I'll focus on some projects of mine but I still plan to write and post more articles here.

Thanks to all the readers of this series I hope you have learn new cool things and I hope I made you feel like you step up your JS skills!

*This is a more recently (2023) modified article that I originally published at DEV: [Link to the original post](post/squezee-out-template-literals-potential)*