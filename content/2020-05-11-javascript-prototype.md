---
date: 2020-05-11
featured: false
title: 'Javascript Prototype: Inner workings of Objects'
cover: "/images/js-prototype/prototype.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Objects
    - prototype
    - proto
slug: "/javascript-prototype-inner-workings-of-objects"
---

## Javascript Prototype: First detailed look into objects

**Prototype** is an attribute every object contains in javascript (unless the object is created using `Object.create(null)`), however, its inner workings are known to very few. Understanding how the prototype attribute gets assigned is an important concept, using which inheritance can be applied in javascript. Before understanding the prototype, you must know some basic principles and usage of **objects**. If you aren't familiar with objects, please read my article [Basics of javascript objects](/basics-of-javascript-objects). In this article, we will deep dive into how prototypes are assigned during object creation, and why this is important. 

![inner workings](/images/js-prototype/innerworking.png)
[source](https://pixabay.com/photos/road-bike-gear-vintage-594164/)

## What is the prototype property and what does it contain?

Every javascript **constructor function**, created using any of the methods available, contains a property. This is the **prototype** property. It is important to note that, the prototype property is an object in itself.

1. The prototype property of the constructor function can be used to access/modify the methods, and other properties present in the prototype object which was assigned during its creation.
2. Every prototype object has a property called **constructor**. This property points to the **Constructor Function** itself.

Lets see an example to understand this better:
```javascript
function Name(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = firstName + " " + lastName
}

var jensen = new Name("Jensen", "Ackles");
console.log(jensen);
```

If I try to access this `console.log`, which contains all the properties of the object `jensen`, we get the following result.

![screen1](/images/js-prototype/screen1.jpg)

This is how things have worked so far: 
1. **Name** is a constructor function. It contains the **prototype** property.
2. This prototype property has an attribute called **constructor** which points to **Name** constructor function itself. Any further attributes can be added to this property.
3. When the new object `jensen` was created using the **Name** constructor, this object got access to all of the properties belonging to Name function, including its prototype.
4. The **prototype** of the `Name` constructor function can be accessed from the new object `jensen` using `__proto__` object.
5. Since **prototype** itself is an object, it also contains a **prototype** attribute. This is how the [**prototype** chain](/javascript-prototype-inner-workings-of-objects#prototype-chain) is created.

Several browsers have added support to accessing the constructor function's prototype through the `__proto__` object. Even though it's not recommended in javascript programming(This feature is non-standard and might not work as expected in all the browsers), it can be used to check the workings of prototype chain quickly during development.

Another alternative to `__proto__` include `Object.getPrototypeOf()` or `objectInstance.constructor.prototype`. If you consider the above example, it can be used in the following ways to access the same prototype property:

```javascript
Object.getPrototypeOf(jensen);
jensen.constructor.prototype;
```
![screen3](/images/js-prototype/screen3.jpg)

## Prototype chain

When an object is created, it is usually created from some constructor function. If none of the user-defined constructors were used, it means that the object was created using the javascript's **Object Constructor**. This implies that any object created is ultimately inherited from the javascript's Object constructor.

Let's look at the following object created, and see what their `__proto__` object contains.

```javascript
function Fruit() {
    this.value = 10;
    this.quantity = 35;
}

function Apple(name, color) {
    this.name = name;
    this.color = color
}

Apple.prototype = new Fruit();

var apple1 = new Apple("Apple", "Red");
console.log(apple1);
```

If we inspect the inner properties of the object `apple1`, we can observe the following: 
 
1. The object **apple1** contains two main properties - `name` and `color`. These properties have the same value which was assigned to them during its creation.
2. The `__proto__` property of the object apple1 points to the instance of the `Fruit` object. This, in turn, contains two more properties `value` and `quantity`.

![screen2](/images/js-prototype/screen2.jpg)

3. If we inspect the `__proto__` property of the Fruit instance, we see that it ultimately points to the prototype of the **javascript's Object**.
4. When a property is not present directly on an object, javascript moves up the **prototype chain** to find the property in its immediate prototype. Much like the javascript's [scope chain](/javascript-scope-and-hoisting-understanding-block-scope), the prototype chain also goes up the ladder until **Object.prototype** is reached.

## Uses of Prototype: Inheritance and Built-in methods

The Prototype is widely used in javascript to implement inheritance. Traditionally javascript was used only for scripting, and it had no requirement to provide object-oriented programming features like other languages. However, the concept of the prototype can be used to inherit methods and properties from one constructor function to another.

Consider the following example: 
```javascript
function Fruit() {
    this.value = 10;
    this.quantity = 35;
}

Fruit.prototype.setValue = function(value) {
    this.value = value;
}

function Apple(name, color) {
    this.name = name;
    this.color = color
}

Apple.prototype = new Fruit();

var apple1 = new Apple("Apple", "Red");
apple1.setValue(20);

console.log(apple1.name); // Apple
console.log(apple1.value); // 20
console.log(apple1.quantity); // 35
```

In the above example, even though the new object `apple1` doesn't have the properties `value` and `quantity`, we are still able to access them. Point to be noted that the `setValue` method added on the prototype property of **Fruit constructor** is also accessible through the object `apple1`. This is how inheritance is implemented in javascript.

When objects are created using any constructor, it comes along with certain inbuilt methods that can be applied to the object. *hasOwnProperty (), isPrototypeOf (), propertyIsEnumerable (), toLocaleString (), toString (), and valueOf ().* are some of the built-in methods which are readily available to all the objects. This is because all objects in JavaScript inherit properties and methods from **Object.prototype**.

All built-in Constructors such as `Array(), Number(), String(), etc` were all created from **javascript's Object** constructor, and their prototype is also assigned to **Object.prototype**. I 

## Problems with prototypes

Prototypes in javascript have a lot of uses, it is used for inheriting the methods of parent functions, it can be also used to abstract the data layer and expose only the getter and setter methods to manipulate values belonging to various Objects. However, prototypes have its drawbacks. All the properties added on the prototype object is **common** to every instance of the object that is created using its **constructor Function**. Any change in one of the properties will be reflected in all the objects.

Consider the following example: 
```javascript
function Apple(name, color) {
    this.name = name;
    this.color = color
}

Apple.prototype.value = 20;

var apple1 = new Apple("Apple", "Red");
var apple2 = new Apple("Apple2", "Wheatish Red");

console.log(apple1.name); // Apple
console.log(apple1.value); // 20
console.log(apple2.value); // 20

Apple.prototype.value = 40;
console.log(apple1.value); // 40
console.log(apple2.value); // 40

apple1.value = 30;
console.log(apple1.value); // 30
console.log(apple2.value); // 40
```

In the above example, changes made directly on the constructor's prototype was reflected in all its objects, however, when the property `value` inside the object `apple1` is changed, it doesn't reflect in the other objects. This is because `apple1` has now created its own property `value`, and from this instance onwards `apple1.value` will always be referenced to its own property `value` and not the inherited property.

To mitigate this issue, a combination of **Constructor - Prototype** pattern can be implemented. The data values belonging to the object can be kept private and unique using the **Constructor function**. The common methods which can be shared among all the objects to manipulate data can be added to the **Prototype object**.

I hope this article was able to provide a detailed overview of the prototype property and its uses. If you have any questions regarding the concepts described in the article please feel free to reach out to me.