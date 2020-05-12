---
date: 2020-05-13
featured: false
title: "Javascript understanding `this`"
cover: "/images/js-this/this.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Objects
    - this
    - functions
    - prototype
---

## Javascript's **this** and **that**, and few others:

The ***this*** keyword in javascript is perhaps the most ambiguous thing to follow through when we are writing code. It sometimes confuses even the most experienced javascript developers. This article aims at explaining all the concepts related to ***this*** in javascript, especially the parts were understanding the mechanism of ***this*** becomes tricky. Sit back and enjoy the journey.

***this*** in javascript is used similarly to how pronouns are used in the English language. Usually, we write "Jensen is studying javascript because he wants to learn web development". In the given example, note the usage of pronoun `he` to refer to John. The pronoun `he` acts as a referent to the person `John`. Similarly in Javascript, the keyword `this` acts as a referent to the object which is being executed in the current context.

Consider the following example: 
```javascript
 var person = {
    firstName: "Jensen",
    lastName: "Ackles",
    fullName: function () {
        ​//using this
        console.log(this.firstName + " " + this.lastName);
        ​// using object name
        console.log(person.firstName + " " + person.lastName);
    }
}

person.fullName();
```

In the following code both `this` and `person` works, however, using the keyword `this` to refer to object is favored for two reasons:
1. A global object with the same name `person` could be present, and the code might try to access the global object.
2. Sometimes the name of the object is not known to the code which is executing it, `this` keyword simplifies it by bringing in the reference to the object which holds the current context. 

Note that, `this` keyword can be used globally, however, in **strict mode**, `this` holds the value of undefined in global functions and in anonymous functions that are not bound to any object.

## Basics of `this`: Clarifying misunderstandings

All javascript functions have properties, just like objects contain properties. Whenever a function is executed, it gets `this` property assigned to it with the **value of the object that invokes the function**. The property `this` ALWAYS holds the reference to the object, and it is usually used inside the function to access the properties and methods on the object.

If we consider the above example, the `fullName` function is executed from the object `person`. The property `this` used inside the fullName function now refers to the object `person`. 

**Big principle**: The biggest concept to understand about the property `this` is the fact that, the value of `this` is not assigned until an object invoked the function. Even though it appears as if the value of `this` should be equal to the value of the object inside which the function is defined, that is not true. Until an object invokes the function where `this` is used, the value is not assigned, and the value of `this` is equal to the value of the **object** invoking the function in most circumstances. However, there are certain exceptional scenarios when `this` doesn't have the value of the invoking object, and these scenarios will be explained later.

## This in global scope:

The value of `this` as explained earlier contains the value of the invoking object. In the global scope, the code is executed in the browser, and all global variables and functions are defined on the ***window*** object. Therefore, when `this` is used inside global functions, it holds the value of ***window*** object. Consider the following example:

```javascript
var firstName = "Dean";
var lastName = "Winchester";
function showFullName() {
    console.log(this.firstName + " " + this.lastName);
}

var person = {
    firstName: "Jensen",
    lastName: "Ackles",
    showFullName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

showFullName (); // Dean Winchester - this refers to global window object
window.showFullName (); // Dean Winchester - this refers to window object
person.showFullName (); // Jensen Ackles - this refers to person object
```

## The context of `this` can be changed

Though we said that the value of `this` usually holds the value of the object which invokes the function, it can be changed in many scenarios. The common scenarios when the value of this changes are: 
- Borrowing a method that uses `this`
- Assign a method that uses `this` 
- Callback function using `this`.
- `this` used inside a closure.

Let's look at an example which demonstrates the possibility and then tackle different scenarios where value of `this` acts differently:

```javascript
var person1 = {
    firstName: "Jensen",
    lastName: "Ackles",
    showFullName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

var person2 = {
    firstName: "Dean",
    lastName: "Winchester",
}

person1.showFullName (); // Jensen Ackles - this refers to person1 object
person1.showFullName.apply(person2);
person1.showFullName (); // Dean Winchester - this refers to person2 object
```


