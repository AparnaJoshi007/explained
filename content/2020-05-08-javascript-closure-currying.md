---
date: 2020-05-08
featured: false
title: "Javascript Closures, Partial functions and Currying"
cover: "/images/js-closure/closure.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Closure
    - Partial Functions
    - Currying
    - Higher-order
slug: "/javascript-closures-partial-functions-and-currying"
---

## Closure and Currying: An Introduction

**Closures** are important concept javascript programmers should understand in order to write better code. While this concept might not be evident, we use it often without understanding its implications. No matter how much experience you have in writing javascript code, you might have created closures without realizing it.

Before understanding closures, you must have knowledge of the concept of [scope](/javascript-scope-and-hoisting-understanding-block-scope) in javascript.

The closure is an inner function having access to the outer function's variables and parameters. In other words, the inner function has access to its scope chain. What makes things interesting is that the inner function cannot access the outer function's *arguments* object. However, it can still access the parameters in the outer function's declaration.

```javascript
function getFullName(firstName, lastName) {
  var introMessage = "Hello ";
  function getName() {
    return introMessage + firstName + " " + lastName;
  }
  return getName();
}

var message = getFullName("Jensen", "Ackles");
console.log(message); // Hello Jensen Ackles
```

While this might seem like an obvious piece of code, closures have much greater uses. Before the advent of ES6, Closures were sometimes also used to create an object-oriented pattern in javascript. Callback functions provided in an asynchronous method execution are all closures.

**Closure properties**
1. **Closures have access to the outer function's context even after the function has finished executing**. This is because the variable scope which was available during function creation is maintained throughout, even after the function is executed. This concept can be used to create [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function). Data handling libraries such as [Redux](https://redux.js.org/), even javascript's array manipulating methods such as [map](https://www.w3schools.com/jsref/jsref_map.asp) and [filter](https://www.w3schools.com/jsref/jsref_filter.asp) use this pattern.

```javascript
function getFirstName(firstName) {
  function addLastName(lastName) {
    return firstName + " " + lastName;
  }
  return addLastName;
}

var name = getFirstName("Jensen");
var fullName = name("Ackles");
```

2. **Closures only have access to outer function's values by reference, and not the actual value itself**. This means any change in the outer function's values will be reflected inside the closure. This concept can be further enhanced to implement the object-oriented pattern in javascript.

```javascript
function secretId() {
  id = 1234;
  return {
    getID: function() {
      return id;
    },
    setID: function(var newId) {
      id = newId;
    }
  }
}

var secretInfo = secretId();
secretInfo.getID(); // 1234
secretInfo.setID(5678);
secretInfo.getID(); // 5678
```

## Partial function application and Currying

A lot of people new to javascript get confused about **partial function application** and **currying**. In fact, the concept of partial application is used to create curry functions in javascript. Let us understand what is a partial application and see the difference between partial application and currying

<img src="/images/js-closure/curry.png" alt="currying" width="600px">
[source](https://pixabay.com/photos/thai-curry-green-curry-curry-chili-1736806/)

Partial function application is a concept in which a function takes multiple arguments, operates on a few of these arguments, and returns a function with a lesser number of input arguments for further usage.

```javascript
function getURI(host, domain) {
  function getURIWithPath(path, port) {
    return host + "://" + domain + ":" + port + path
  }
  return getURIWithPath;
}
var partialURI = getURI("https", "www.google.com");
var getFullURI = partialURI("/api/path/", 3000);
console.log(getFullURI); // https://www.google.com:3000/api/path/
```

**Currying** is a special case of partial function application in which, a function takes multiple arguments, but returns a function which takes exactly one argument. Getting **square** of a function can be one such case where currying could be used.

```javascript
function powerC(pow) {
  var result = 1;
  function power(val) {
    for(var i = 0; i < pow; i++) {
      result = result * val;
    }
    return result;
  }

  return power;
}

var square = powerC(2);
var result = square(3);
console.log(result); //9
```

Notice that the power function is enhanced to act as a function which only squares using currying. Also, the function `power` in the above example acts as a closure. Closure, partial application and currying are the basic concepts in javascript, however, powerful javascript libraries, and utility methods are created using them.