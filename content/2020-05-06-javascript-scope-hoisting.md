---
date: 2020-05-06
featured: false
title: "Javascript scope and hoisting: Understanding block scope"
cover: "/images/js-scope-hoisting/scope-hoisting.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Scope
    - Hoisting
    - var
    - let
    - const
slug: "/javascript-scope-and-hoisting-understanding-block-scope"
---

## Introduction to Scope and Hoisting

Every programming language has its own rules regarding the scope of the data being stored during program execution. The term *Scope* refers to space in the program where the data can be accessed. Traditionally Javascript only had two types of scopes: **Global and Function scope**.
With the introduction of **ES6**, Javascript is introduced with the third type of scope - **Block scope**. 

**Hoisting** is a feature unique to Javascript. Hoisting in javascript refers to the variable and function declaration being moved up to the top of the scope.


![access](/images/js-scope-hoisting/access.png)
[source](https://pixabay.com/illustrations/key-keyhole-lock-security-unlock-2114046/)

In this article, we will understand the meaning scope in javascript, the implications of ES6 (block scoping), and the effects of hoisting.

## Global and Function scope

Javascript mainly has two types of scope: **Global and Function scope**. 

**Global scope** refers to all the variables declared in a JS file that are not inside any function. These variables have access anywhere in the file. **Function scope** refers to a limited private scope that the variable gets within the function it is declared. This variable can be accessed anywhere within the function, but not outside it. Let us try to illustrate with an example. Consider the following lines of code:

```javascript
// Copy paste this block of code in your file to try it out!!!
var globalVariable = "globalVariable is in global scope";

function func1() {
  var variable1 = "variable1 is in func1 scope";
}

function func2() {
  var variable2 = "variable2 is in func2 scope";
  console.log(variable1); //Uncaught ReferenceError: variable1 is not defined
}
console.log(variable1); //Uncaught ReferenceError: variable1 is not defined
```
In the above code, `globalVariable` exists throughout the JS file. Hence, it can be accessed anywhere. Since javascript code mostly executes in the browser, it is good to know what **global scope** means in the context of a browser. In any web browser, the global scope is created for us, and the `window` object lies in the global scope. Hence in the browser, the `globalVariable` can be accessed either directly or through the window object `window.globalVariable`. Since in web development we might have several javascript files, it is important to know that all the variables declared with the global scope in these files are available in the window object. This is an important point to note, if multiple files contain the same variable name declared in the global scope, unexpected code behaviors might arise because the same variable might get overridden in different files.

The `variable1` exists only inside the function `func1`, and it can be accessed only inside this function. The global space and `func2` do not have access to this variable. The `console.log` statements in both places will throw an error. 

## Scope chain and Variable look-up

Consider next piece of code:
```javascript
var globalVariable = "globalVariable is in global scope";

function outerFunc() {
  var outerVariable = "outerVariable is in outerFunc scope";

  function innerFunc() {
    var innerVariable = "innerVariable is in innerFunc scope";
    console.log(innerVariable); //Same scope
    console.log(outerVariable); //Parent scope or outer scope
    console.log(globalVariable); //Global scope
  }
}
```
The above code might confuse those not familiar with javascript. `innerVariable` is in the scope of `innerFunc`, however, `outerVariable` and `globalVariable` are also accessible here. This is because, javascript first checks for the existence of a variable within the current scope, if the variable is not present, it looks up for the variable in its immediate parent scope, and so on until the global scope is reached. If the variable is not present anywhere during this look up, javascript throws Reference error. 

The set of nested scopes forming a scope ladder is called **Scope Chain**, and this process of checking for a variable through the scope chain in ascending order is called **Variable lookup**. Note that the variable lookup is unidirectional, and happens only from one scope to its parent scope.

## Let and Const

ES6 introduced two new ways of holding data in the application. **let** and **const**. These are two additional ways to declare and use data in the JS program. `let` is quite similar to `var`. Using `let` we can declare and use variables anywhere in the program just like `var`. The value assigned to the variable can also be changed whenever we want as long as the scope of the variable remains valid.

```javascript
// consider having only the following piece of code in your file.

var variable1 = "This is declared using var";
let variable2 = "This is declared using let";

```

`const` is used to define a value, however, this value doesn't change throughout the execution. The values assigned with the `const` keyword cannot be changed, any attempt made to change this will result in an error. It is also the reason why `const` must be assigned a value during the declaration phase itself.

```javascript
var variable1;
let variable2;
const variable3 = "Constant value";
const variable4; // Uncaught SyntaxError: Missing initializer in const declaration

variable1 = "This can be reassigned";
variable2 = "This can also be reassigned";
variable3 = "Cannot be reassigned"; // Uncaught TypeError: Assignment to constant variable.
```
Note that, even if arrays and objects are declared with const, their inner values can be changed.

## [ES6(ES2015)](https://www.w3schools.com/js/js_es6.asp) and Block scope

With the advent of ES6, javascript was introduced with a new type of scope, `let` and `const` allows us to declare and use the variables with block scope. Block scope means that any variable declared within a pair of brackets `{}` can only be used within those brackets. This also means that the variables declared within `if-else` blocks, `for` loop blocks will all have block scoping when they are declared with `let` or `const`. It is important to note, however, that ES6 still doesn't give ~~block scoping~~ capabilities to ~~`var`~~. Since *let* provides block scoping which is more in line with other object-oriented programming languages, it is preferred over the usage of *var*
Consider the following lines of code:
```javascript
function func1() {
  var variable1 = "Grapes";

  if(true) {
    var variable2 = "Bananas";
    let apples = "Oranges";
    console.log(apples); // Works - Block Scope
    console.log(variable1); // Works - Function Scope
    console.log(variable2); // Works - Function Scope
  }
console.log(apples); // Doesn't work - Out of the block
console.log(variable1); // Works - Function Scope
console.log(variable2); // Works - Function Scope
}
console.log(apples); // Doesn't work - Out of the block
console.log(variable1); // Doesn't work - Out of the function
console.log(variable2); // Doesn't work - Out of the function
```

## Hoisting and Temporal dead zone

Variable hoisting is important to understand certain unexpected behavior codes have in javascript. All data values declared/defined using `var`, `let`, `const`, and the functions are hoisted in javascript. This means that the declaration is moved up its scope. Javascript is executed in two phases: **Parse phase** and **Execution phase**. During the parsing phase, memory allocation, scope creation, and hoisting are carried out. Consider the following example: 
```javascript
function func1() {
  console.log("This is some dummy code");
  var variable1 = "Hoisting Demo";
  let variable2 = "Hoisting";
}
```

The javascript code translates this peice of code to:
```javascript
function func1() {
  var variable1;
  let variable2;
  console.log("This is some dummy code");
  variable1 = "Hoisting Demo";
  variable2 = "Hoisting";
}
```

However, there is a small catch in variable hoisting. During variable hoisting, the variable declared with `var` is assigned `undefined` value. However, those declared with `const` and `let` are **not assigned** anything. This leads to the creation of *Temporal Dead Zone*. Because of this, even if the variable declared with `var` is used before its declaration, the code doesn't throw any error. However, if the variable declared using `let` or `const` is used before they are declared, we get an error.

```javascript
console.log(variable1); // Works with value undefined
console.log(variable2); // Uncaught ReferenceError: Cannot access 'b' before initialization
console.log(constant1); // Uncaught ReferenceError: Cannot access 'b' before initialization

var variable1 = "Hoisting Demo";
let variable2 = "Hoisting";
const constant1 = "Hoisting Demo";
```

## Final catch

So far we know that `var` allows function scoping and `let` allows block scoping. However, there is another difference between the two. If a [closure](https://www.w3schools.com/js/js_function_closures.asp) is created within the loop, variables declared using `let` will be bound to the value during the current iteration of the loop, whereas the value of `var` variables will be the current value of the variable. Consider the following example:

```javascript
for(var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log('The number is ' + i);
  });
}

for(let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log('The number is ' + i);
  });
}
```
The `for` loop created using `var` will print the number 10, ten times. This is because 10 is the final current value of `i`. However, the `for` loop containing `let` will print the numbers from 0 to 9, this is because the value of let is preserved and is bound to the current iteration value. This is an important concept which will be helpful when dealing with asynchronous functions within the loops. 

Variable scope and hoisting are the basic concepts of javascript which help us in building applications. Note that with the addition of `let` and `const` we have only introduced the possibility of having block scope in javascript. The global and function scope always remains whether we use var, let, or const.
I hope that this article helped you understand the usage of `var, let and const` at a much deeper level.