---
date: 2020-10-01
featured: false
title: "Javascript: How to create chainable functions"
cover: "https://i.imgur.com/G70YPrc.jpg"
categories: 
    - Programming
tags:
    - javascript
    - frontend
    - functions
    - this
slug: "/javascript-how-to-create-chainable-functions"
---

## What is the need to chain a function?

Functions are the first-class citizens in javascript. Every method or pattern implementation is done through functions. Many times in programming, we face a situation where we need to call a series of functions one after the other, passing the value from one step to the next step. Normally, handling such a sequence of function calls looks something like this:

```javascript
const finalResult = function1(
  function2(
    function3()
  )
);

OR

const result3 = function3();
const result2 = function2(result3);
const finalResult = function1(result2);
```

In both cases, we are trying to pass the output of the innermost function to its immediate outer function. While this works well for three functions, imagine a scenario where there are multiple function calls to be repeated this way.

1. **Pattern one** would lead to [callback hell](http://callbackhell.com/), resulting in unreadable code.
2. **Pattern two** would lead to unnecessary variables stored in memory, leading to a slow, unresponsive website.

The solution to these two problems is writing methods that can be chained to the next method in the sequence. If you have used any of the built-in array methods in javascript, you have surely come across chainable functions.

```javascript
var arr = [10, 20, 33, 45, 56, 60, 70, 46, 23, 34, 98, 67];

var doubleArr = arr.filter(val => val > 50).map(val => val*2);
// (5) [112, 120, 140, 196, 134]
```

Chainable functions in javascript is a design paradigm in which the output of one function is sent as the input to another. In the above code, the `arr` is sent to the `filter` function, this filters out elements with value more than 50. The filtered shorter array values are then passed to the `map` function, which doubles each value and returns. Let's see how the chainable functions can be created.

## This - makes chainable functions possible

In javascript, the keyword `this` acts as a reference to the object which is being executed in the current context. The next piece of the article assumes that you are familiar with `this` and how it works in javascript. To understand more, refer to [Javascript understanding this](/javascript-understanding-this)

Consider the following code:

```javascript
function function1() {
  console.log("i am function 1");
  return this;
}

function function2() {
  console.log("i am function 2");
  return this;
}

 function function3() {
  console.log("i am function 3");
  return this;
}

function1().function2().function3();
```

![screenshot](https://i.imgur.com/OZD42O6.png)

As you can see, the above functions can be chained together. However, we still aren't passing values from one function to another. To do this, we should add the functions under a single class, and manipulate the instance properties. Since any given instance will have a unique value, and the value can be accessed using `this` inside the methods belonging to the instance, we make use of the instance properties for function chaining.

Consider the following class:
```javascript
class Roots {
  constructor() {
    this.value;
  }

  data(val) {
    this.value = val;
    return this;
  }

  sq() {
    var val = this.value
    this.value = val*val;
    return this;
  }

  cube() {
    var val = this.value
    this.value = val*val*val;
    return this;
  }

  sqRoot() {
    this.value = Math.sqrt(this.value);
    return this;
  }
}

var calculate = new Roots();
var result = calculate.data(2).sq().cube().sqRoot();
// result = { value: 8 }
```

The main idea behind chaining functions is to store the value as a property inside `this` and any changes should be applied to the stored value. The value stored is passed to the functions that are chained. Writing chainable methods to operate on similar types of objects can help improve the readability and memory in javascript programming.

