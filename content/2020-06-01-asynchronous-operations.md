---
date: 2020-06-01
featured: true
title: "Javascript Async Operations: Make your web dynamic"
cover: "https://i.imgur.com/lrj2vD6.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - functions
    - asynchronous
    - dynamic
slug: "/javascript-async-operations"
---

## Asynchronous tasks in Javascript:

One of the most powerful features of javascript is its ability to execute code asynchronously. Most of the programming languages are designed in such a way that the code is executed as soon as it is found. Asynchronous execution simply means that a piece of code is executed at a later point of time when a certain asynchronous task is performed. This asynchronous task could be anything: 
1. A countdown from a timer ended 
2. A user performed a specific action
3. An API call returned the data

In many scenarios, once an asynchronous task is performed, we would want to perform another operation to handle what happens next. This could include things like reloading page, refreshing content, changing the webpage styles, etc. In this article, we will see different ways in which asynchronous tasks can be handled.

## Call back functions: The old way

One of the early ways to handle async operations was to provide an anonymous callback function which could be executed once the task was completed. While this looks like a quick and easy solution, it leads to confusion when we have to deal with multiple callbacks, nested one inside another.

```javascript
const makePizza = () => {
    getDough(function(dough) {
        getCheese(dough, function(cheese) {
            bakePizza(dough, cheese, function(pizza) {
                return pizza;
            })
        })
    })
}

makePizza();
//Callback Hell
```

This is what programmers call the `CallBack Hell`. The nested loop of anonymous functions to be executed one after another increases the complexity of the code. We can however try to reduce this complexity to some extent by modularizing the code. Here's an example of how this could be achieved.

```javascript
const makePizza = (nextStep) => {
    pizza = nextStep(getCheese);
}

function getDough(nextStep) {
    const dough = getDoughFromShelf();
    nextStep(dough, bakePizza);
}

function getCheese(dough, nextStep) {
    const cheese = getCheeseFromShelf();
    nextStep(dough, cheese)
}

function bakePizza(dough, cheese) {
    const pizza = makePizza(dough, cheese);
    return pizza;
}

makePizza(getDough);
```

While this can be used to solve the problem of callback hell, if there are too many operations nested, this list of functions becomes hard to maintain. ES6 provided an easier way to deal with callback hell with the introduction of `Promises`.

## Promises: Deal with nested callbacks flatly

[ES6](https://es6.io/) provides [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to deal with callback functions. By using `then` and chaining the nested functions, we can provide a list of anonymous callback functions to execute in the given order.


```javascript
function makePizza() {
    const pizza = getDough())
                    .then((dough) => getCheese(dough))
                    .then((dough, cheese) => bakePizza(dough, cheese));

    return pizza;
}
 
makePizza();
```

We can also write functions to be executed and pass them as parameters to `then`. This would ensure the reusability of code. While this provides a neat way of dealing with async operations, we can still see that the functions chained one after another, and it is hard to debug the data coming from these callbacks.

## Async Await: The new way to handle asynchronous tasks
ES2017 introduced asynchronous functions. With this, our call back functions can be labeled `async`, and these functions can be called with  `await` keyword just like calling synchronous function. However, the change here is that the next line of code will be executed only after the `async` function returns data or errors out.

```javascript
async function makePizza() {
    const dough = await getDough();
    const cheese =  await getCheese(dough);
    const pizza =  await bakePizza(dough, cheese);
    return pizza;
}

makepizza();
```

The functions `getDough`, `getCheese` and `bakePizza` should be defined as `async` functions. The makePizza function executes each `await` operation and stops the rest of the execution until the operation/function returns any data.

## Parallel execution of asynchronous functions

So far we have seen that the asynchronous functions are executed one after another in the order in which they are called. However, in some cases, we might want to execute asynchronous functions parallelly because their execution doesn't depend on each other. 

1. **Promise.all**: Promise.all() can be used to execute async functions parallelly.

```javascript
const asyncFunction = () => {
    return new Promise((resolve) => {
        console.log("I am executed parallelly")
        setTimeout(resolve, 1000)
    })
}

const promise1 = asyncFunction();
const promise2 = asyncFunction();

Promise.all([promise1, promise2]).then(() => {
   console.log("I am executed in the end");
});
```

When you execute the above code, the `asyncFunction` is called at the same time, and the function exits after the setTimeout is completed.

2. **async-await**: async-await can also be used for parallel execution of functions.

```javascript
const asyncFunction = () => {
    return new Promise((resolve) => {
        console.log("I am executed parallelly")
        setTimeout(resolve, 1000);
    })
}

async function parallel() {
    const await1 = asyncFunction();
    const await2 = asyncFunction();
    await await1;
    await await2;

    console.log("I am executed in the end");
}

parallel();
```

The `await1` and `await2` holds the promise returned by the `asyncFuntion`. Note that the function execution won't stop the flow. The `await` keyword stops the follow and waits until the `async` function has returned. In the above example, both the functions are fired at the same time, and hence they are parallelly executed.

## Handling errors in asynchronous operations

Asynchronous operations are usually performed to get the data from an external resource. This has an enormous chance of failure due to a variety of reasons. The errors given by the async operations must be handled properly.

1. **Using catch in promises**: Just like the Promises provide `then` to chain the callback functions and get the data from the asynchronous operation, they also provide a `catch` block. This can be used to catch the error returned during execution. Note that if there are several `then` operations chained together, the first `error` will call the `catch` block and stop further execution.

```javascript
function makePizza() {
    const pizza = getDough())
                    .then((dough) => getCheese(dough))
                    .then((dough, cheese) => bakePizza(dough, cheese))
                    .catch((err) => console.log(err));

    return pizza;
}
 
makePizza();
```

> 1. If getDough() fails, the `catch` block is executed immediately. The chained `then` callbacks won't be executed. 
> 2. If getDough() is successful, the next `then` block is executed.

2. **Using try-catch block**: This is the more popular and common way to handle errors in asynchronous operations. The piece of code executing the async function will be wrapped inside a `try-catch` block. Any error will stop further execution and immediately jump to catch block

```javascript
async function makePizza() {
    let pizza;
    try {
        const dough = await getDough();
        const cheese =  await getCheese(dough);
        pizza =  await bakePizza(dough, cheese);
    } catch(err) {
        console.log(err);
    }

    return pizza;
}

makepizza();
```

## Promises v/s Asynchronous functions:

The Asynchronous functions provided with ES2017 are not a replacement for the promises. Asynchronous functions are simply an alternative to the promises. When several callbacks could be nested, async functions provide a better, cleaner way of handling code. We can use both of these implementations in the code depending upon the coding standards used. Since asynchronous functions are provided with ES2017, certain browsers might not fully support it, and a polyfill might be required.