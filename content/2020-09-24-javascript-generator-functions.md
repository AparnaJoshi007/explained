---
date: 2020-09-24
featured: false
title: "Javascript: Generator functions"
cover: "https://i.imgur.com/7misYP9.jpg"
categories: 
    - Programming
tags:
    - javascript
    - frontend
    - functions
slug: "/javascript-generator-functions"
---

## What is a generator function?

Generator functions are a new class of functions that were introduced by the EcmaScript 2015 standard. A generator is a function that can be paused mid-way at any point during the execution and resumed whenever required. The best part about the generator functions is that they preserve the execution context until they reach the end of the function. The variable values within the generators remain intact until the function execution is concluded.

## How does a generator function work?

A normal function in javascript cannot be paused halfway through the execution. The control enters a function, executes it till the end and then the control goes out of the function.

```javascript
function normalFunction() {
    console.log("I am executing");
    var data = 3;
    console.log("I am still executing", data);
    data = 4;
    console.log("I am done executing", data);
}
```

Two things to be noted here: 
- The control goes out of the function only after it is fully executed.
- The function execution starts from the very first line, regardless of where it is called from.

### Generator function:

Generator functions behave in an unorthodox way. These functions can be exited mid-way through, and the function execution can be resumed from a different line of code, not necessarily from the beginning. A generator function has the following characteristics:

- Generator function can be exited before it fully completes execution.
- Generator function execution can be resumed from any line, not necessarily the first line.
- Generator function returns an iterator object. The object can be used to execute the function call multiple times.
- Generator function returns a sequence of values instead of a single value

## How to create and use a generator function

The syntax for the creation of a generator function is to use "*" (an asterisk) before the function name. The generator function also comes with two new keywords that are not commonly used:
1. **yield**: The place where yield is used is the place where the function pauses the execution. This keyword can also be used to return any data.
2. **next**: The next acts much like a callback function. When it is called, the generator function resumes its execution.

Let's look at an example: 

```javascript
function * generatorFunc() {
    var value = "value";
    console.log("I am starting my execution ", value);
    yield "value1";

    console.log("I am resuming execution after first pause ", value);
    yield "value2";

    console.log("I am resuming execution after second pause ", value);
}

const generator = generatorFunction();
console.log(generator.next().value); // I am starting my execution value 
// vaule1
console.log(generator.next().value); // I am resuming execution after first pause value
// value2
console.log(generator.next().value); // I am resuming execution after second pause value
// undefined
```

1. The generator function is like any normal function, with the `yield` keyword where the function needs to be paused.
2. The first call to the generator function doesn't start the execution of the code inside the function, however, it instantiates the function returns a generator object.
3. The subsequent calls to the generator function is made by calling the `next()` function on the `generatorObject` that was returned from the function.
4. The value returned from the `yield` comes back to the main control.
5. The variable values within the generator function is preserved throughout the execution.



## Uses of generators

The implementation of the generator function seems a little unorthodox, however, generator functions have many use cases:

### Using generators as iterators:

Since a generator function can be repeatedly called, these functions can be used as iterators. While normally iterators can be implemented using an object and looping through the object, generator functions can simplify this.

```javascript
function * loopme() {
    yield "One";
    yield "Two";
    yield "Three";
}

for(const val of loopme()){
    console.log(val);
}

// One
// Two
// Three
```

A generator function inside a `for--of` loop can be iterated. This way, the return values can be used much like any other for loop implementations.

### Async functions:

The normal way of handling asynchronous functions is using promises and chaining `then()` to a promise.

```javascript
function foo() {
    return new Promise((resolve, reject) => {resolve(3)});
}

foo()
.then((val) => console.log(val))
.catch((err) => console.log(err));
```

The same can be implemented using generator function as follows:

```javascript
function foo() {
    return new Promise((resolve, reject) => {resolve(3)});
}

function *asyncFunc() {
    var data = yield foo();
    console.log(data);
}
```

This looks similar to `async-await` implementation. Instead of using `async`, we are using `yield`. The `asyncFunc` can be now called like any normal promise using `next()`.

```javascript
var asyncFuncObj = asyncFunc();
var promiseObj = asyncFuncObj.next().value;

promsieObj
.then((val) => console.log(val))
.catch((err) => console.log(err));
```

When the `asyncFunc` is called, the object returned is similar to the "pending state" of a promise.

![suspended](https://i.imgur.com/fHrhm3n.png)

Note that the function is in a suspended state.

## Advantages of generator functions

### Lazy evaluation:

The generator functions implement a lazy evaluation technique. This means the values inside the generator functions are only computed when they are needed. Let's look at an example

```javascript
function * lazy() {
    var x = 2;
    var y = yield x;
    return y + x;
}

var lazyObj = lazy();
lazyObj.next()
console.log('sum: ', lazyObj.next(3).value);
```
Here, the value of `y` is computed only when the generator function is executed for the second time. Until then, `y` is not evaluated. Since the values are computed on the fly, the generator functions are **memory-efficient**. Only the required values are stored in memory.

It is important to note that, once the generator function has completed its execution, it cannot be iterated using the same object again. A new object must be created to iterate through the function again.





