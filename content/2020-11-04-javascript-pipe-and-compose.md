---
date: 2020-11-04
featured: true
title: "Javascript: Pipe and Compose functions"
cover: "https://i.imgur.com/ZLkRVYL.jpg"
categories: 
    - Programming
tags:
    - pipe
    - Javascript
    - functions
    - compose
slug: "/javascript-pipe-and-compose-functions"
---

## Why do we need pipe or compose?

In one of the previous [articles](/javascript-how-to-create-chainable-functions), we discussed the need for chaining several functions, and how to do them using the `this` operator. While this works fine, there are several drawbacks to using this method:
1. One has to keep track of `this`. And the value must be stored in the `this` operator so that the functions chained later on gets to access this value.
2. The syntax is not quite intuitive. If there are many functions, it would look something like this -> `functionA().functionB().functionC().functionD().......functionZ()`.

To **reduce** the effects of these two caveats, the implementation of `pipe()` and `compose()` functions can be used.

## pipe()

The Pipe is a function implementation that is called with a list of functions and a starting variable. The functions provided in the pipe are called in the same order as they appear. There are two types of implementation for this, with Unary implementation only allowing one variable to be sent, and implementation of multiple variables.

1. Unary implementation:

```javascript
pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

pipe(
    add,
    multiply,
    double,
    divide
)(5)
```

Let's break down the above implementation:

- The `reduce` method provided in javascript's array implementation is being used here. The basic syntax f!or this implementation is as follows: `[1,2,3].reduce((av, val) => av + val, x)`. Here, the function starts with an initial variable `x`, and then it traverses through the array and calls an anonymous function with 2 values, the **accumulated value** and the **current value**. The function implementation is dependant on the user.
- The spread operator is used to transform the input list of functions into an array. It helps in the implementation of the reduce function.
- When the function `reduce` is called, the next function in the list becomes the current value, and the value returned from the previous function becomes the accumulated value.
- The array is iterated through until it reaches the end.

2. Multiple operator implementation:

```javascript
pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

pipe(
    add,
    multiply
)(10, 10);
```

- In this case, since no initial value is supplied, the first argument (function add) is considered as the accumulated value for the first iteration. Hence, the current value naturally becomes the function multiply. We supply the list of arguments `...args` to the accumulated value (function add), and the output from the function is then given to the function multiply. 
- If several arguments must be received by the second function, ensure returning a list of arguments from the first function

![screenshot](https://i.imgur.com/s17rzwv.png)

## compose()

Compose is another pattern for executing multiple functions in a row. It is similar to the `pipe` function, except that the methods are executed in the reverse order to that of the `pipe` method. 

```javascript
compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

compose(
    divide,
    double,
    multiply,
    add
)(5)
```

- The method `reduceRight` is also provided as one of the standard Array iteration implementations. This parses the values from right to left. 
- The list of functions is taken in as an array, and the processing starts from the bottom function `add`.
- The implementation shown above works the same as the `pipe()` implementation.

Note that compose() and pipe() are the programming pattern derived out of the existing javascript implementation, much like currying. These functions are not native to javascript, and cannot be used directly without defining the implementation first.