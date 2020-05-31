---
date: 2020-05-15
title: "Javascript's ABC: Apply, Bind and Call"
featured: false
cover: "https://i.imgur.com/JObI4uy.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Objects
    - this
    - functions
    - apply
    - call
    - bind
slug: "/javascripts-abc-apply-bind-and-call"
---

## The need for Apply, Bind and Call in Javascript

Functions in javascript are nothing but objects, and hence every function has `this` parameter. They also come with a set of built-in methods, including ***Apply, Call, and Bind***. Before deep-diving into the uses and application of these methods, one should understand the [concept of **this**](/javascript-understanding-this) in javascript. `this` in javascript generally holds the context in which the function is being executed, and the ***Apply, Call, and Bind*** methods helps us to modify this context. In this article, we will learn about the application of these methods and the different scenarios in which these methods would come in handy.

![functions](https://i.imgur.com/PJvVCJb.png)
[source](https://pixabay.com/photos/learn-mathematics-child-girl-2405206/)

## Applications of Bind method:

We use the **Bind()** method in javascript to call a function with the value of `this` set explicitly. The **Bind()** method allows us to specify which object will be bound to `this` when a function is executed. This might seem unnecessary since the value of `this` is usually set when a method is executed, however, in certain contexts `this` object might not be the same as what is expected, and we need to explicitly bind its value to a particular object type.

Let's consider the following example: Callback functions

```javascript
var person = {
    firstName: "Jensen",
    lastName: "Ackles",
    fullName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

setTimeout(person.fullName, 1000); // undefined undefined
setTimeout(person.fullName.bind(person), 1000); // Jensen Ackles
```

There are several more cases when bind is used to fix the calling method's context: 
1. **Callback functions in event handlers**: User-generated events are usually handled by passing a callback method as an event handler. Refer to the following link to understand how bind works inside a callback function : [JSFIDDLE LINK](https://jsfiddle.net/MinuteProgramming/b68dtfe0/4/)

Usually, when callback methods are executed, they are executed on top of a global variable (**window** in case of the browser). Hence, the context of `this` changes to global scope(to know more [click here](/javascript-understanding-this)). When a bind method is used, it fixes the context of the function permanently, preserving the values of the object upon which the function should operate on.

2. **Borrowing methods**: This context of a method also changes when it is borrowed from another object. We can use bind to set the value of `this` to the object of interest.

## Applications of Apply and Call:

Apply and call methods work similar to each other, with a slight variation in the syntax. They are usually used to borrow functions temporarily from one object to another. Consider the following example: 


```javascript
var person1 = {
    firstName: "Jensen",
    lastName: "Ackles",
    showFullName: function (message) {
        return message + " " + this.firstName + " " + this.lastName;
    }
}

var person2 = {
    firstName: "Dean",
    lastName: "Winchester",
}

person2.fullName = person1.showFullName("Hello");
console.log(person2.fullName); // Hello Jensen Ackles - this refers to person1 object
person2.fullName = person1.showFullName.apply(person2, ["Hello"]); 
console.log(person2.fullName); // Hello Dean Winchester - this refers to person2 object
fullName = person1.showFullName.call(person2, "Hello"); // Hello Dean Winchester - this refers to person2 object
```

- **Apply** is usually used when a method operating on an array must be executed in a given context.
- **Call** is used when a limited set of parameters are to be supplied to a function to be executed in a given context.

***Apply, Call, and Bind*** methods are one of the oldest feature addition to javascript, and they are still used in the modern-day javascript programming. Even the most powerful libraries such as **ReactJs** make use of **bind** when defining functions on its classes.

