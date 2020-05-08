---
date: 2020-05-09
featured: false
title: "Basics of javascript objects"
cover: "/images/js-objects/objects.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Objects
    - Dot Notation
    - Bracket Notation
    - JSON
---

## Javascript Objects at a glance

Objects are the most fundamental data type present in javascript. Javascript has two types of data. The primitive data type is the immutable data types whose data is stored as values. In other words, any variable holding value of the primitive data type will always have its memory allocated. **Number**, **String**, **Boolean**, **undefined**, and **null** are the primitive data types in javascript. In this article, we will understand some basic concepts related to objects and how they can be created and used.

**What are objects?**
An object is a list of items that are stored in the form of key-value pairs. The value stored in the object can be of any valid type in javascript. The keys are usually strings or numbers. 

Consider a simple object:
```javascript
var simpleObject = { firstName: "Jensen", lastName: "Ackles"};
```

In this object, **firstName** and **lastName** are the keys, and **Jensen** and **Ackles** are the values. 
The keys in an object can be either `strings` or `numbers`. When `numbers` are used as keys, the values must be accessed using [**bracket** notation](/basics-of-javascript-objects#accessing-properties-of-an-object) only.

## Data stored by value v/s stored by reference

Before we understand what are objects and how they work, we need to understand how data manipulation works when it is stored by **value** or stored by **reference**

```javascript
var variable1 = "Data1";
var variable2 = variable1;

variable1 = "Data2";

console.log(variable1); //Data2
console.log(variable2); //Data1
```
Data is always stored by value in primitive types. Due to this, each variable has its memory location allocated, and are distinct from one another, even if they are created through the assignment. Any changes made to one variable, will not affect the other unless a reassignment is made.

```javascript
var variable1 = { name: "Javascript" };
var variable2 = variable1;

variable1.name = "Java";

console.log(variable1.name); //Java
console.log(variable2.name); //Java
```
Data is stored by reference in objects. Hence, when a new object is created through an assignment, it refers to the existing object from which the data was copied. Any changes in the first object are reflected in the second one.
To mitigate this effect, one can use [**shallow or deep copying**](/basics-of-javascript-objects#shallow-copying-vs-deep-copying) of objects.

## Attributes of object data properties

Every value present in the object contains 3 more attributes that define how these property values can be used.

- **Configurable**: Specifies whether a property can be changed or deleted.
- **Enumerable**: Specifies whether the property can be accessed through the for..in loop.
- **Writable**: Specifies whether the property can be changed. These attributes can be used to define certain supporting properties/methods. For example, the `array` datatype has an inherent `length` property. However, this is non enumerable, and is often used during array manipulation. `Object.defineProperty` can be used to set/change these properties.
```javascript
Object.defineProperty( newObject, 'name', {
   value: "Jensen Ackles",
   writable: true,
   enumerable: true,
   configurable: true
});
```

## Own and Inherited properties of objects

Javascript objects include own properties, as well as inherited properties. Own properties are properties that were defined on the objects, during its creation, or through the assignment. Inherited properties are those which are inherited from the object's [Prototype](https://www.w3schools.com/js/js_object_prototypes.asp) object. 

To check whether a property exists on object, `in` operator can be used.
```javascript
var name = { fullName : "Jensen Ackles" };
console.log("fullName" in name);  // true - The property is its own property
console.log("lastName" in name); // false - The property doesn't exist
console.log("toString" in name); // true - inherited property
```

To check whether the object has a particular property as its own, we can use `hasOwnProperty` method.
```javascript
var name = { fullName : "Jensen Ackles" };
console.log(name.hasOwnProperty("fullName"));  // true - The property is its own property
console.log(name.hasOwnProperty("lastName")); // false - The property doesn't exist
console.log(name.hasOwnProperty("toString")); // false - inherited property
```
The **enumerable** properties associated with an object can be accessed through iteration. [for..in](https://www.w3schools.com/jsref/jsref_forin.asp) loop or regular [for](https://www.w3schools.com/js/js_loop_for.asp) loop can be used to access these properties(own/inherited). The ~~**non enumerable**~~ properties, such as methods inherited from Objects [prototype]((https://www.w3schools.com/js/js_object_prototypes.asp)), cannot be iterated.

## Primitive ways of creating Objects

1. **Object Literals**: The most common and easiest way of creating an object is by using object literal syntax.
```javascript
var movies = {};
var fruits = {
    name: "Apple",
    color: "red"
}
```

2. **Object constructor**: Object constructors can be used to create an object. In this case, we create an empty object and start adding its properties.
```javascript
var movie = new Object();
movie.name = "Memento";
movie.director = "Christopher Nolan";
```

There are two more ways of creating the object, [**object.create**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) and [**object.assign**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). However, these methods are usually used to create an object from an existing object.

## Advanced ways of creating Objects

The more programmatic way of creating objects include using either **constructor** or **prototype** pattern. Imagine a scenario when an object has certain core property that keeps changing, however, it also requires internal methods to handle and manipulate these properties. Creating a duplicate object consisting of the core properties and methods seems repetitive. Instead, we can use these advanced ways of creating objects and create new objects using a base template(constructor). This is specially used when the same object is used in multiple places. Object inheritance is implemented using these patterns. 

1. **Constructor pattern**: In the constructor pattern, we can define a function that acts as a constructor, taking in certain properties. The methods common to all the objects created using this constructor can also be defined inside it.

```javascript
function Fruits (name, color, value) {
    this.name = name;
    this.color = color;
    this.value = value;

    this.getName = function() {
        return this.name;
    }

    this.getValue = function() {
        return this.value;
    }

    this.changeValue = function(newValue) {
        this.value = newValue
    }
}
```
With the basic constructor in place, we can define/create our own `Fruit` object with the properties we require anywhere in the code without much repitition.

```javascript
var apple = new Fruits("Apple", "red", 20);
console.log(apple.getName()); // Apple
apple.changeValue(50);
console.log(apple.getValue()); // 50
```

2. **Prototype pattern**: In this pattern, the initial object is created through a constructor. However, the common methods and properties can be added through the object's [prototype]((https://www.w3schools.com/js/js_object_prototypes.asp)) property.

```javascript
function Fruits (name, color, value) {
    this.name = name;
    this.color = color;
    this.value = value;
}

Fruits.prototype.getName = function() {
        return this.name;
    }
Fruits.prototype.getValue = function() {
        return this.value;
    }
```

We can call the constructor this same way as before. The functions added to the prototype acts as a common function shared between all the objects created using this constructor.

```javascript
var mango = new Fruits("Mango", "Yello", 70);
console.log(mango.getName()); // Mango
console.log(mango.getValue()); // 70
```

## Accessing properties of an Object

1. **Dot Notation**: The most common way of accessing object properties is through dot notation. We use a `.`(dot) followed by the property name to access its value. Point to be noted that this type of access works only if the property names(keys) are `strings` **without any space**.
```javascript
var fruits = {
    name: "Apple",
    color: "red"
}
console.log(fruits.name); // Apple
console.log(fruits.color); // red
```

2. **Bracket Notation**: The most preferred way of accessing object values are through bracket notation. This also confirms uniformity and provides access to all types of keys which can be used in objects. Numbers, string (with or without spaces), even variables containing object property name can be used in this notation.
```javascript
var fruits = {
    name: "Apple",
    color: "red"
}
var c = "color";
fruits[1] = "fruit value";
console.log(fruits["name"]); // Apple
console.log(fruits[c]); // red
console.log(fruits[1]); // fruit value
```

## Shallow Copying v/s Deep copying

In one of the earlier examples, we saw that the objects can be copied from one variable to another. However, this copy exists only by reference. Physically there won't be two different copies in the variables. There are two more ways of copying objects to avoid this reference during copying.

1. **Shallow Copying**: Using `Object.assign`, shallow copying can be implemented when we only want the outermost level to be copied by value. Objects can be nested, and these nested values will still be stored through the reference.

```javascript
var fruit = {
  name: "Apple",
  valueSimple: 20
};
var fruitCopy = Object.assign({}, fruit);

console.log(fruitCopy); // { name: "Apple", valueSimple: 20 }
fruit.valueSimple = 50;
console.log(fruit); // { name: "Apple", valueSimple: 50 }
console.log(fruitCopy); // { name: "Apple", valueSimple: 20 }
```

If the above example had a nested object, the change in value would be reflected in all the objects created using `Object.assign`.

```javascript
var fruit = {
  name: "Apple",  
  valueNested: {
      inr: 20
    }
};
var fruitCopy = Object.assign({}, fruit);

console.log(fruitCopy); // { name: "Apple", valueNested: {inr: 20 } }
fruit.valueNested.inr = 50;
console.log(fruit); // { name: "Apple", valueNested: {inr: 50 } }
console.log(fruitCopy); // { name: "Apple", valueNested: {inr: 50 } } - Nested value are stored by reference.
```

2. **Deep Copying**: Real-life data might contain multiple levels of nesting. One way to completely copy the object, without any reference is through iteration through all the nested levels and using `Object.assign`. While this is tedious, we have a simple solution. `Object.parse` and `JSON.stringify`.

```javascript
var fruit = {
  name: "Apple",  
  valueNested: {
      inr: 20
    }
};
var fruitCopy = JSON.parse(JSON.stringify(fruit));

console.log(fruitCopy); // { name: "Apple", valueNested: {inr: 20 } }
fruit.valueNested.inr = 50;
console.log(fruit); // { name: "Apple", valueNested: {inr: 50 } }
console.log(fruitCopy); // { name: "Apple", valueNested: {inr: 20 } }
```

Objects are first-class citizens in javascript. Almost all complex data types, including functions, are created from the javascript's `Object`. Understanding the basics of object creation and usage should certainly help in the long run.