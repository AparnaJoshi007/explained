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


In javascript objects are the building blocks of our application. Everything translates into an object (Functions, Arrays, Strings, Objects). Since javascript already provides the `prototype` attribute on every object, using this object-oriented programming can be achieved in javascript. On top of this, ES6 has now introduced a new way of implementing OOP in Javascript.

![object](/images/js-oops/object.png)

The 3 main valuable techniques object-oriented programming provides us are 
1. Inheritance: Objects can inherit methods and properties from other objects
2. Encapsulation: Every object is responsible for handling a complete set of functionalities. Meaning, the object holds data and methods encapsulated inside it to perform all the operations required.
3. Polymorphism: Objects can share the same interface, however, the way they are accessed defines its underlying functionality.

In javascript, **Inheritance** and **Encapsulation** are the two techniques that can be used under the hood of Object-oriented programming. This article will aim at explaining two ways in which OOP can be achieved in javascript.

## Function-based inheritance and encapsulation: Using prototypes

In the function-based inheritance, we define a constructor function and add the properties(methods and objects) which can be inherited by other constructors. Each constructor function contains all the private methods and variables, along with added inheritable properties to perform a given set of operations. The following code shows how object-oriented programming can be achieved using constructor methods.

```javascript
function Vehicle(name, cost, engineType) {
    this.name = name | '';
    this.cost = cost | 0;
    this.engineType = engineType | 'petrol';

}

Vehicle.prototype = {
    constructor: Vehicle,
    getEngineType: function ()  {
        return this.engineType;
    },
    calculateEmi: function ()  {
        return this.cost * 0.12;
    },
    setEngineType: function (type)  {
        this.engineType = type; 
    }
}

var vehicle1 = new Vehicle('Lamborghini Gallardo', 20000, 'petrol');
console.log(vehicle1.getEngineType()); // petrol
vehicle1.setEngineType('diesel');
console.log(vehicle1.getEngineType()); // diesel
```

The above example demonstrates just the encapsulation part of object-oriented programming. The constructor function `Vehicle` has relevant properties and methods defined to work with its data. Let's use this constructor function to inherit its methods in another object and then go through all the pieces of code.

```javascript
function Car(model, hasFuel, color, name, cost, engineType ) {
    this.model = model | '';
    this.hasFuel = hasFuel | false;
    this.color = color | '';
    this.name = name | '';
    this.cost = cost | 0;
    this.engineType = engineType | 'petrol';
}

Car.prototype = new Vehicle();
// Car.prototype = Object.create( Vehicle.prototype );
// This works too
Car.prototype.constructor = Car;

var lambo = new Car('gallardo', true, 'yellow', 'Lamborighini', 20000, 'petrol');
console.log(lambo.calculateEmi()); // 2400
```

The inheritance is created in the following ways:

1. The `Vehicle` constructor function is created and it contains a list of properties on its object.
2. The `Vehicle` constructor function has sharable methods added to its prototype.
3. The `Car` constructor function is created which contains a list of properties on its object.
4. The prototype of `Car` is pointed to the instance of `Vehicle` constructor function.
    This can be done in several ways, two of the most common ones are highlighted here:
    ```javascript
    Car.prototype = new Vehicle();
    Car.prototype = Object.create( Vehicle.prototype );
    ```
5. The prototype of `Car` is overriden, and `prototype.constructor` now points to `Vehicle` constructor function. 
    ```javascript
    Car.prototype.constructor = Car;
    ```
    This line of code sets the prototype.constructor back to `Car` constructor function.
6. The new object created using the `Car` constructor function contains all the properties and methods present on the `Vehicle` constructor function.
7. `lambo.calculateEmi()` calls the function defined on Vehicle.prototype, the value of `this` now points to the context of `lambo` object.
    ```javascript
    calculateEmi: function ()  {
        return this.cost * 0.12;
    }
    ```
    In this method `this.cost` is now equal to `lambo.cost`. The cost is calculated and returned.

## Class-based inheritance and encapsulation: ES6

In the Class-based inheritance, we use the class keyword provided by ES6. The class contains a constructor function where the variables are initialized. It also contains shared methods that behave similarly to the methods added to the **prototype**. The following code shows how object-oriented programming can be achieved using ES6 Class.

```javascript
class Vehicle {
    constructor(name, cost, engineType){
        this.name = name | '';
        this.cost = cost | 0;
        this.engineType = engineType | 'petrol';
    }

    getEngineType()  {
        return this.engineType;
    }

    calculateEmi()  {
        return this.cost * 0.12;
    }

    setEngineType(type)  {
        this.engineType = type; 
    }
}

class Car extends Vehicle{
    constructor(model, hasFuel, color, name, cost, engineType) {
        super(name, cost, engineType);
        this.model = model | '';
        this.hasFuel = hasFuel | false;
        this.color = color | '';
    }
}

var lambo = new Car('gallardo', true, 'yellow', 'Lamborighini', 20000, 'petrol');
console.log(lambo.calculateEmi()); // 2400
```

This example is a replica of the above example demonstrated. However, it is implemented using `class`. Let's go through the code and see what's happening.

1. The class `Vehicle` is created. ES6 provides a separate function called `constructor` which acts as the constructor function for the given class. If no constructor is defined, this will be an empty function.
2. The sharable methods are added to this `Vehicle` class.
3. The class `Car` is created. ES6 provides a function `super` which can be used to invoke the parent function. This is quite similar to using `Car.prototype = new Vehicle()`. It calls the parent function's constructor.
4. The new object `lambo` is created which contains all the properties of `Car` and `Vehicle`. When `lambo.calculateEmi()` is called, it accesses the method present in the `Vehicle` class and gives the result.

To fully understand the concept of inheritance and implement it without running into any pitfalls, the concept of [this](https://www.w3schools.com/js/js_this.asp) must be mastered. This article has aimed at demonstrating some of the popular methods of implementing OOP in javascript and I am hopeful you understood at least the general concepts. Please use these patterns in your JavaScript applications and Happy coding.  