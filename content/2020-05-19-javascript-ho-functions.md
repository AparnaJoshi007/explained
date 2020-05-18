---
date: 2020-05-19
featured: false
title: "Javascript Functions: Higher-order Functions"
cover: "/images/js-ho/ho.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Function
    - Closure
    - Higher-order
---

## Javascript Higher-order functions:

A higher-order function is any function which either takes an argument as a function or returns a function. If you have been following any of the blog posts in the javascript series, you must have already encountered higher-order functions. The opposite of higher-order functions is first-order functions, which don't take any functions as arguments or return functions as output. In this post, we will look at some of the common scenarios higher-order functions are used, and how to implement them.

![functions](/images/js-abc/functions.png)
[source](https://pixabay.com/photos/learn-mathematics-child-girl-2405206/)

### Higher-order functions: Common examples that don't catch our eyes

We already know the definition of a higher-order function, but the most common use-case of these functions include using them as callback functions. Using the built-in methods such as [**setTimeout**](https://www.w3schools.com/jsref/met_win_settimeout.asp), [**map**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [**filter**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [**addEventListener**](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), etc, are some of the most common use cases of higher-order functions which are implemented as part of our everyday code.

Consider the following examples: 
**Example1**:
```javascript
var array1 = [1, 2, 3, 3, 56, 7, 89, 4, 5];
var newArray = array1.filter((a) => a > 5);
```
**Example2**: 
```javascript
for(let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log('The number is ' + i);
  });
}
```

Both of these examples show a demonstration of higher-order functions. `Filter` and `SetTimeout` both take an anonymous function as the input and execute them at a given point of time based on their internal functionality.

## Why higher-order functions?