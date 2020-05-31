---
date: 2020-05-19
featured: false
title: "Javascript Functions: Higher-order Functions"
cover: "/images/js-ho/ho.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - functions
    - Closure
    - Higher-order
slug: "/javascript-higher-order-functions"
---

## Javascript Higher-order functions:

A higher-order function is any function which either takes an argument as a function or returns a function. If you have been following any of the blog posts in the javascript series, you must have already encountered higher-order functions. The opposite of higher-order functions is first-order functions, which don't take any functions as arguments or return functions as output. In this post, we will look at some of the common scenarios higher-order functions are used, and how to implement them.

![functions](/images/js-abc/functions.png)
[source](https://pixabay.com/photos/learn-mathematics-child-girl-2405206/)

### Higher-order functions: Common examples that don't catch our eyes

We already know the definition of a higher-order function, but the most common use-case of these functions include using them as callback functions. Using the built-in methods such as [**setTimeout**](https://www.w3schools.com/jsref/met_win_settimeout.asp), [**map**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [**filter**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [**addEventListener**](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), etc, are some of the most common use cases of higher-order functions which are implemented as part of our everyday code.

Consider the following first-order examples: 

**Example1**:
```javascript
const getSquaredArray = array => {
  const squaredArray = [];
  for (let i = 0; i < array.length; i++) {
    const number = array[i];
    squaredArray.push(Math.pow(number, 2));
  }
  return squaredArray;
};
getSquaredArray([4,5,6,2,7]);
```
**Example2**: 
```javascript
const getCubedArray = array => {
  const cubedArray = [];
  for (let i = 0; i < array.length; i++) {
    const number = array[i];
    cubedArray.push(Math.pow(number, 3));
  }
  return cubedArray;
};
getCubedArray([4,5,6,2,7]);
```

In the above examples, we are trying to input an array and get a new array with updated values. Most of the operations here are duplicated. The basic functionality here is to iterate through each element of the array and perform an update operation and return the new array with the same number of elements as before.

We can observe a pattern here, two things are repeated twice in the above example:
1. Iteration of array elements
2. Assigning the updated value to a new array and returning the new array

Only the update part is different in both cases. Since in javascript, functions are first-class objects, meaning they can be used exactly like objects,
1. We can assign the function to a variable.
2. We can assign the function to the property of an object.
3. We can send a function as a parameter to another function.
4. We can return a function from another function.

In our above example, we can create a higher-order function, and pass the `update` function to it as a call back. The higer-order function can perform the repetitive operations, and execute the callback function when required. Consider the following code:

```javascript
const higherOrderFunction = (array, callback) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const arrayValue = array[i];
    if(typeof callback === 'function') {
      newArray.push(callback(arrayValue));
    }
  }
  return newArray;
};
higherOrderFunction([4,5,6,2,7], (value) => Math.pow(value,2)); // [16, 25, 36, 4, 49]
higherOrderFunction([4,5,6,2,7], (value) => Math.pow(value,3)); // [64, 125, 216, 8, 343]
```

We can see that most of the repetitive functionality is abstracted by the higher-order function, and the anonymous function handles the local tasks.

If you have worked with arrays in javascript before, you must be aware that this is the functionality of `map()` function in javascript.` map()` acts like a higher-order function, taking an anonymous function as an input, and let it perform a particular operation for each element of the array and return some result.

## Things to note before implementing Higher-order functions:

1. A callback function can be either named or anonymous. Most of the time callback functions are used locally and in asynchronous scenarios, and hence they remain anonymous.
2. A callback function will usually receive certain parameters from the higher-order function. The callback function must be designed to work with these parameters.
3. A callback function's `this` value might change since it is executed from the higher-order function. Care should be taken to preserve its `this` value. To know more about different ways to handle `this` please read [javascript-this](/javascript-understanding-this) and [javascript-apply-call-bind](/javascripts-abc-apply-bind-and-call)
4. A higher-order function should check whether the callback parameter is a `function` before executing it. This can be done using `typeof callback === 'function'`

This article painted a brief picture of how higher-order functions can be implemented, and why they are required. Higher-order functions are mostly used in creating middlewares for web apps, which handle common functionality of incoming or outgoing API calls. I would like to conclude by saying that, one should make use of the functional programming pattern of javascript to its highest advantage.