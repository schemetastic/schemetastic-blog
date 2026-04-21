+++
author = "Rodrigo Calix"
title = "Tips for better and readable conditionals in JS"
date = "2022-10-18"
description = "Probably you have realized of how hard and confusing can it be to read long conditionals in JS, in this article I'll give you some tips to make them shorter and readable."
tags = [
    "javascript",
    "code-quality",
    "beginners",
    "tips"
]
categories = [
    "javascript"
]
series = ["Things-I-Wish-I-Knew-Before-In-JavaScript"]
aliases = ["better-readable-conditionals-js"]
+++

In the previous part of this series, I talked about how you can shorten your conditionals with truthy and falsy values. If you haven’t read that one I would recommend that you do it because this is a continuation, [Link here!](post/shorter-conditionals-truthy-falsy-values)
___


Probably you have realized of how hard and confusing can it be to read a long conditional...

Let me give you a few examples of that, and later in the post I’ll give you better solutions to them:

1 - Let's say that you want to pass through a function a Rick Astley's song as a favorite, within a list of 3 options;
```javascript
function favRickSong(favSong){
    if(favSong === 'Never Gonna Give You Up' || favSong === 'Together Forever' || favSong === 'Take Me to Your Heart'){
        /* Some code goes here... */
    }
}
```

2 - Now if you wanted to pass an array with a list of star ratings from 1-5 based on the Rick Astley’s songs above, and you wanted to check if it’s properly defined e.g. [5,4,4].

```javascript
if(Array.isArray(songsRatings) == true && songsRatings.length == 3 && songsRatings.every((item) => {return !(item < 1 || item > 5)})){
    /* Some other code goes here... */
}
```
And just for fun, let's imagine some weird function that allows you to do both things, and an evil programmer who wants to see the entire company burn if he gets fired, mix it all up in one condition.

```javascript
function rickrollTheCEO(favSong, songsRatings){
    if((favSong === 'Never Gonna Give You Up' || favSong === 'Together Forever' || favSong === 'Take Me to Your Heart') && (Array.isArray(songsRatings) == true && songsRatings.length == 3 && songsRatings.every((item) => {return !(item < 1 || item > 5)}))){
        neverGonnaSayGoodbye();
    }
}
```

Does any of this make sense? Probably not, but the methods I'll give you do, so let's get started!

## 1 - Using string arrays to search a value
Sometimes when coding you have to make choices based on a set of string values, let's look at the first example where you want to choose between a set of Rick Astley's songs:

Instead of this:
```javascript
if(favSong === 'Never Gonna Give You Up' || favSong === 'Together Forever' || favSong === 'Take Me to Your Heart'){
    /* Some code goes here... */
}
```
You could make a list within an array of those songs, like this:

```javascript
const rickSongs = [
    'Never Gonna Give You Up',
    'Together Forever',
    'Take Me to Your Heart'
];

if(rickSongs.includes(favSong)){
    rickroll();
}
```
Even though the code is vertically larger is more organized, and when you get to read the conditional is easier to understand. Also, this approach lets you easily scale the list of options or modify it as it might happen in the future. 

## 2 - isVariables and isFunctions
You could also make variables that contain conditionals, or functions that return a boolean, this can be helpful if your conditions are way too long or if a set of procedures would opaque the surrounding code, also if it’s a code that you’ll reuse, this approach can help you to avoid repeating that code over and over and also have more organized code.

JavaScript has methods like this already implemented, for example there is the method `Array.isArray()`, `isNaN()`, and others, but you could make your own custom methods, let's see a few examples:

Let’s say that you want to check if a qualification ranges between 0-100, but also, you want to check if a username is a string, and its length is lower than 21, you could write a condition like this:
```javascript
if((qualification >= 0 && qualification <= 100) && (typeof username == 'string' && username.length < 21)){
    /* your code... */
}
```
But you could make it easier to understand by declaring in advance variables with those conditions, like this:
```javascript
let isValidRange = qualification >= 0 && qualification <= 100;
let isValidUsername = typeof username == 'string' && username.length < 21;

if(isValidRange && isValidUsername){
    /* your code... */
}
```
When reading the variable name in the code it's easier to know what's going on, also notice that when using the word "is" at the beginning of the variable it's easier to realize that it will return a boolean.

Even though this is a simple example, this approach becomes useful in larger conditionals or more complex code, now let's review an example with functions.

Going back to the second example at the top of the post where you want to check if an array is a valid stars rating, so the array must have exactly 3 items, but also each item must range between 1-5:

Instead of this:
```javascript
if(Array.isArray(songsRatings) == true && songsRatings.length == 3 && songsRatings.every((item) => {return !(item < 1 || item > 5)})){
    /* your code... */
}
```
Even though is possible, you might want to transform this into a utility function that return a boolean, like this:

```javascript

if(isValidRating(ratings)){
    /* your code */
}

/**
 * Allows you to verify if an array is a valid rating
 * @param {Array} ratings This are the ratings for each song
 * @returns {Boolean} if the ratings are valid return `true`, otherwise `false`
*/
function isValidRating(ratings){
    // If the rating param isn't an array return false
    if(!Array.isArray(ratings)) return false;
    
    // If the ratings length is different from 3 return false
    if(ratings.length != 3) return false;

    // Check if every item is between 1 and 5 and return a boolean
    return ratings.every((item) => {return !(item < 1 || item > 5)});
}
```

When you create functions to handle long conditions separately, it gets easier to document your code with comments, and when you revisit that code in the future it will be easy to know what's going on there. This can be specially useful when you need to reuse code, instead of repeating the same code, just use that utility function.

## Final thoughts
I think sometimes is okay to write conditionals that are a bit large, maybe to keep certain flow in your code, but in many cases, following these methods can help you to write more organized conditionals that are easier to read for others and even for you from the future (and if you are like me… you from just some days later… maybe (hire me please)).

Remember the third example from the start of this article? Using the methods shown in this article, that long conditional could be reduced to this:

```javascript
if(rickSongs.includes(favSong) && isValidRating(ratings)){
    neverGonnaGiveYouUpGoodEmployee(); //But please don't name a function this large
}
```
These tips can help you to write higher quality code and if you implement them well, hopefully they _never gonna let you down._

## Useful references
Go Make Things | [Naming Things in JavaScript](https://gomakethings.com/naming-things-in-javascript/)

**Note: None person or website mentioned in this article is sponsoring this content**

## Until the next one!
If you feel like you have learned something or liked this article, be sure to read the next part of this series that I will publish the next Tuesday, October 25.

*This is a more recently (2023) modified article that I originally published at DEV: [Link to the original post](post/better-and-readable-conditionals)*