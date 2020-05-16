---
date: 2020-05-16
featured: false
title: "DOM: Javascript's primary use"
cover: "/images/js-dom/dom-bom.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Objects
    - Document
    - DOM
slug: "/dom-javascripts-primary-use"
---

## Document Object model: An introduction

A [**D**ocument **O**bject **M**odel](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)(DOM) is an interface which provides a set of utilities to manipulate XML and HTML documents. Before providing any functionalities to modify DOM, it converts HTML and XML files into tree of objects.

Consider the following snippet: 
```html
<html>
    <head>
        <title>Title</title>
    </head>
    <body>
        <h1>Header</h1>
        <div id="div1">
            <p>paragraph</p>
        </div>
    </body>
</html>
```

Its corresponding document tree can be represented as:

<img src="/images/js-dom/dom.png" alt="DOM" width="600px" />

You can see that all the elements present in the HTML code have been converted into a tree. Individual tags, attributes, and text used in HTML act as the nodes of that tree. The Document Object Model contains several types of nodes:

- `Document` which is the root node of all XML (HTML) documents.
- `Element` which represents a tag
- `Attr` which is a key-value pair representing an attribute key and its corresponding value for a tag.
- `Text` which represents the content of a node.
- `Comment` which represents XML/HTML comments.

Every node present on this DOM tree contains a list of properties. You can obtain this list from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node)

### Access and Modify Nodes:

The DOM is essentially an Object-oriented representation of the web-page and hence it can be modified with any scripting language such as Javascript. Before understanding how to manipulate the DOM, we need to understand the different ways of accessing each node:

- **document.getElementById(id: string)**: This returns an element and all the children inside the element. Note that the `id` used in the HTML elements must be always unique.
- **document.getElementsByClassName(classname: string)**: This returns a *HTMLCollection* containing all the elements matching the classname attribute. The classname attribute is usually repeated across the elements.
- **document.getElementsByName(name: string)**: This is similar to `getElementsByClassName`, but returns the *NodeList* matching the name attribute.
- **document.getElementsByTagName(tag: string)**: This returns a *HTMLCollection* containing all the elements of the given tag.
- **document.querySelector(selector)**: This returns the first element matching the given selector. The selector can be an id(#id), classname(.classname), or a tag(li).
- **document.querySelectorAll(selector)**: This returns a *NodeList* containing all the elements matching the selector.

Note that these queries can be used for any part of the node selected from the HTML document. The queries don't need to be made only on top of the `document` object.

```javascript
const wrapperElement = document.getElementsByClassName('some-class');
const paraElement = wrapperElement.getElementsByTagName('p');
```

### Getting and Setting Attributes:

The `getAttribute`, `setAttribute`, and `removeAttribute` methods can be used on an element to manipulate the attribute values.

```javascript
// Consider the following element:
<img id="title" class="old-class" />

const element = document.querySelector('#title');
const classAttr = element.getAttribute('class'); // old-class
element.setAttribute('class', 'new-class'); // <img id="title" class="new-class" />
element.removeAttribute('class'); // <img id="title" />
```

### Create, Modify, and Replace Nodes:

The HTML nodes can be created and appended to an existing DOM. An existing node element can also be removed or replaced with a new node.
Consider the following example:

```html
<div id="div1">
    <span>text</span>
</div>
```

```javascript
// Create and append to an existing node
const p = document.createElement("p");
const text = document.createTextNode("text1");
p.appendChild(text);

const element = document.getElementById('div1');
element.appendChild(p);
```

```javascript
// Replace an existing node
const element = document.getElementById('div1');
const oldChild = element.firstChild;
const span = document.createElement("span");
const text = document.createTextNode("text1");
span.appendChild(text);
element.replaceChild(span, oldChild);
```

```javascript
// Remove an existing node
const element = document.getElementById('div1');
const childElement = element.firstChild;
element.removeChild(childElement);
```

### Events on Nodes:

One of the important uses of DOM is to capture user-generated events and handle them. This includes user inputs, clicks, scrolls, drag-drop, etc. To capture and handle the events, we should first attach an event handler to an element. This event handler will take a callback function which will be executed when the event is fired. This function can be used to handle the event, set data, or make any API calls.

There are several types of user-generated events which can be handled:
1. **Mouse Events**: *click*, *dblclick*, *mousedown*, *mouseup*, *mouseout*, *mouseover*, *mousemove*.
2. **Keyboard Events**: *keydown*, *keyup*, *keypress*.
3. **DOM Events**: *DOMSubtreeModified*, *DOMNodeInserted*, *DOMNodeRemoved*.
4. **HTML Page Events**: *load*, *unload*, *abort*, *error*, *resize*, *change*, *submit*, *reset*, *scroll*, *focus*, *blur*.

Consider the following example:
```html
<button id="button1">
    <span>Click me</span>
</button>
```

```javascript
const button = document.getElementById('button1');
button.addEventListener('click', handleClick);
function handleClick(event) {
  console.log('This button is clicked');
}
```

This represents the easiest way of adding an event listners and handling those events. Note that there are several javascript libraries ([JQuery](https://jquery.com/), [ReactJs](https://reactjs.org/), [AngularJs](https://angularjs.org/), [VueJs](https://vuejs.org/)) out there and each provides their way of capturing and handling events.
