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

![this object](/images/js-this/thisobj.png)
[source](https://pixabay.com/photos/wood-phone-apple-iphone-photo-2542913/)

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
person1.showFullName.apply(person2); // Dean Winchester - this refers to person2 object
```

You can see how the value of this changed simply because we used apply and forced the context of this to **person2**

## `this` when borrowing methods:

Borrowing methods is a common practice in javascript development. Sometimes methods are defined in a different object, and we would want to use it on our object without repeating the code. Considering the above example:

```javascript
var person1 = {
    firstName: "Jensen",
    lastName: "Ackles",
    showFullName: function () {
        return this.firstName + " " + this.lastName;
    }
}

var person2 = {
    firstName: "Dean",
    lastName: "Winchester",
}

person2.fullName = person1.showFullName() 
console.log(person2.fullName); // Jensen Ackles - this refers to person1 object
person2.fullName = person1.showFullName.apply(person2); 
console.log(person2.fullName); // Dean Winchester - this refers to person2 object
```

Using `apply` during the execution of the method, and providing the object on which `this` value must be set will fix the problems when borrowing methods.

## `this` when a method is assigned to a variable:

The value of `this` gets assigned to the context of a different object when we assign a method that uses ***this*** to a variable:


```javascript
var person = {
    firstName: "Jensen",
    lastName: "Ackles",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}

var showFullName = person.fullName;
console.log(showFullName()); // undefined undefined
```

Instead of getting the value **"Jensen Ackles"**, we got **"undefined undefined"**. This is because, when the method was borrowed, its context is not set to the global variable. Since the global window object doesn't contain the value of `firstName` and `lastName`, they are printed as **undefined**. To fix this problem, we can set the value of `this` to a particular object indefinitely using `bind`:

```javascript
var person = {
    firstName: "Jensen",
    lastName: "Ackles",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}

var showFullName = person.fullName.bind(person);
console.log(showFullName()); // Jensen Ackles
```

## `this` when used inside a method as a callback:

The value of `this` goes out of context when it is used in a function provided as a callback:

```javascript
var person = {
    firstName: "Jensen",
    lastName: "Ackles",
    fullName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

setTimeout(person.fullName, 1000); // undefined undefined
```

The above code works similar to how the context of `this` changes when it is assgined to a variable. One can assume that the setTimeOut function has a variable which takes the function as a parameter, and then it executes on the global object. Since global object doesn't contain the definition to **firstName** and **lastName**, the value is printed as `undefined`.

To fix this, we need to bind the value of `this` to the object on which it should be applied. This is a pattern most commonly seen when we are defining callback functions to the javascript events.

```javascript
setTimeout(person.fullName.bind(person), 1000); // Jensen Ackles
```

## `this` when used inside a closure:

Another instance when the value of `this` is misunderstood is when `this` is used inside closures.

```javascript
var person = {
    fullName: "Jensen Ackles",
    getDetails: function () {
        var closureFunction  =  function() {
            console.log(this.fullName); // undefined
            console.log(this); // global window object
        }
        closureFunction();
    }
}

person.getDetails();
```

The value of `this` doesn't refer to person object, rather it refers to the global window object. We have two ways of mitigating this problem:

**1. Assign the value of `this` to an explicit variable, and then use that variable to access the properties.**

```javascript
var person = {
    fullName: "Jensen Ackles",
    getDetails: function () {
        var personObj =  this;
        var closureFunction  =  function() {
            console.log(personObj.fullName); // Jensen Ackles
            console.log(personObj); // person Object
        }
        closureFunction();
    }
}

person.getDetails();
```

**2. Use arrow function provided by **ES6** : Arrow function preserves the context of `this`.**

```javascript
var person = {
    fullName: "Jensen Ackles",
    getDetails: function () {
        var closureFunction  = () => {
            console.log(this.fullName); // Jensen Ackles
            console.log(this); // person Object
        }
        closureFunction();
    }
}

person.getDetails();
```

This article has aimed at providing a detailed understanding on how `this` is used in javascript, and has warned about the pitfalls which can be avoided while using `this`. Using javascripts **apply, call, bind and arrow functions**, we can control the value of `this` to meet our needs. As a final note, please remember that the value of `this` is usually the object on which the function is called.


