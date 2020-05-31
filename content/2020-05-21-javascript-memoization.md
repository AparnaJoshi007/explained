---
date: 2020-05-21
featured: false
title: "Javascript Memoization: An Optimization technique"
cover: "/images/js-memoization/memoize.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - functions
    - Memoization
    - Functional programming
    - Performance
    - Closure
slug: "/javascript-memoization-optimization-technique"
---

## Javascript Memoization:

Memoization is a programming technique in which expensive function calls are cached such that their repeated usage can be served from the cache instead of running the function again and again. An expensive function is considered a function that takes some significant amount of computation time. Memoization is especially useful with recursive function calls in which the same function is repeatedly called with the same arguments. The cost of the recursive function increase with the input value sometimes, and the memoization technique can save a lot of time. Since the output of the calculation is the same, it can be cached and returned directly instead of calculating. 

<img src="/images/js-memoization/loop.png" alt="loop" width="600px" />

[source](https://pixabay.com/photos/stained-glass-spiral-circle-pattern-1181864/)

In simple words, **memoize** is a technique used to reduce repetitive computations. Consider the factorial function implemented using recursion:

```javascript
function factorial(n) {
    if(n === 1) return 1;
    return n * factorial(n-1);
}
```

If we want to compute `factorial(3)`, it would internally call `factorial(2)` and `factorial(1)`. If these values were already stored, we could easily return it from the cache. The real value of memoization is realized when we compute `factorial(25)`. Instead of running factorial function **24 times**, we could return `factorial(24)` stored in memoize function and save the computing time.

Before understanding how to implement memoize, one should be familiar with javascript [**closures**](/javascript-closures-partial-functions-and-currying) and [**higher-order**](/javascript-higher-order-functions) functions.

## Memoize example

A memoize function makes use of the concept of **higher-order** functions and **closures** to accept the base function, cache its value, and return the results.

Consider the following function:
```javascript
function memoize(recursiveFunction) {
    var cache = {};
    return function() {
        var key = JSON.stringify(arguments);
        if(cache[key]) {
            return cache[key];
        }
        else {
            var val = recursiveFunction.apply(this, arguments);
            cache[key] = val;
            return val;
        }
    }
}
```

We can memoize the factorial function using the following code:
```javascript
var factorial = memoize(function(n) {
    console.log("computing factorial of: ", n);
    if(n === 1) return 1;
    return n * factorial(n-1);
});

console.log("output - ", factorial(3)); 
// computing factorial of: 3
// computing factorial of: 2
// computing factorial of: 1
// output - 6

console.log("output - ", factorial(3));
// output - 6

console.log("output - ", factorial(5));
// computing factorial of: 5
// computing factorial of: 4
// output - 120
```

Let's go through each part of the memoize function and understand what's happening.
1. Memoize function is a higher-order function that takes in the **recursive function** to be memoized as an argument.
2. A cache is initialized inside the memoize function, this cache is an object and hence it would hold key-value pairs.
3. A closure function is created that holds the logic for implementing the caching technique.
4. The **first part** of the function computes the `key` and checks if the cache object holds the value for the given `key`. If the value exists, it is returned and the function exits.
5. The **second part** of the function executes the actual **recursive function** and stores its output in the cache with the computed `key`. 
6. The closure function holding the logic for the caching technique is returned.
7. The memoized function can be now used to get the results in an optimized way.

Note that memoization is only creating an object and storing the pre-computed values as key-value pairs. However, memoization must be carefully used because it stores large amounts of data. Also note that, if the function executed inside memoization contains the usage of `this`, its value must be carefully handled. *It is best to implement memoization only for pure functions which contain repetitive calculations.*