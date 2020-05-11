---
date: 2020-05-12
featured: false
title: "Object-Oriented programming with Javascript"
cover: "/images/js-oops/oops.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Objects
    - OOPS
    - Inheritance
    - prototype
    - proto
---

## OOPS in Javascript: Why it is required?

The object-oriented programming refers to a paradigm in which structured, reusable pieces of code called **objects** are created, and its functionalities are borrowed by several other pieces of code. In most of the traditional programming languages, object-oriented programming is implemented with the help of `Class`. In Javascript, however, OOP is implemented using `Function` (Usage of ES6 provides `class` model too, more on that later). 
Prerequisites:
- [Basics of javascript objects](/basics-of-javascript-objects)
- [Javascript Prototype: Inner workings of Objects](/javascript-prototype-inner-workings-of-objects)


In javascript objects are the building blocks of our application. Everything translates into an object (Functions, Arrays, Strings, Objects). Since javascript already provides the `prototype` attribute on every object, using this object-oriented programming can be achieved in javascript.

The 3 main valuable techniques object-oriented programming provides us are 
1. Inheritance: Objects can inherit methods and properties from other objects
2. Encapsulation: Every object is responsible for handling a complete set of functionalities. Meaning, the object holds data and methods encapsulated inside it to perform all the operations required.
3. Polymorphism: Objects can share the same interface, however, the way they are accessed defines its underlying functionality.

In javascript, **Inheritance** and **Encapsulation** are the two techniques that can be used under the hood of Object-oriented programming. This article will aim at explaining two ways in which OOP can be achieved in javascript.