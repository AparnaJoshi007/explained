---
date: 2020-05-18
featured: true
title: "Javascript Events: Capture, Target, Bubble"
cover: "/images/js-events/bubble.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Events
    - EventHandling
    - Event apture
    - Event target
    - Event Bubble
slug: "/javascript-events-capture-target-bubble"
---

## Javascript events and event handling:

Events are actions occurring on a webpage due to various types of interaction from the user. These include interactions such as mouse click, keypress, scroll, resize, etc. The user interactions are usually performed on an HTML element, and when any type of interaction is performed, an event is fired. This event will simply follow its life cycle(event propagation) unless an event-handler is registered to perform any operation in response to the event.

The standard DOM Events has 3 phases of event propagation:
- [**Event Capturing phase**](/javascript-events-capture-target-bubble/#event-capture): the event goes down to the element.
- [**Event Target phase:**](/javascript-events-capture-target-bubble/#event-target) the event has reached the element.
- [**Event Bubbling phase**](/javascript-events-capture-target-bubble/#event-bubbling): the event is bubbled up from the element.

Note that not every DOM event bubbles up. There are some exceptions to this. The `focus` event doesn't bubble up the DOM tree.

![propagation](/images/js-events/propogation.jpg)
[source](https://pixabay.com/photos/escalator-rise-top-climbing-aid-474197/)

In this article, we will understand the life cycle of the events, the execution phase of event handlers, and how to manipulate default browser behavior when an event is fired.

## Event Capture

Event capture is the first phase of event propagation when a user interaction happens in the browser. In this phase, the user event propagates down the [DOM tree](/dom-javascripts-primary-use) until it reaches the target node which generated the event. During this phase, the event is transferred through the DOM chain passing through every node which is the parent of the target event.

Generally when event handlers are added to HTML code, they are not triggered during the event capture phase unless it is explicitly specified. We can do this while registering an event handler. Consider the follow code: 

```html
<div id="div1">
    <button id="button1"></button>
</div>
```
```javascript
const divElement = document.getElementById("div1");
const buttonElement = document.getElementById("button1");

divElement.addEventListener(<eventname>, <callback>, {capture: true});
```

The following piece of code will fire the callback function during the event capture phase. This means that the callback function is executed even before the event has reached the `buttonElement`.

## Event Target

The `event.target` is the innermost DOM element which caused the event to be fired. Since an event is captured and bubbled up, it is important to know the value `event.target` holds.

In javascript, an event is also an object which is propagated through the DOM tree. This object holds 2 important values:

1. `event.target`: This is the target element that caused the event. Its value doesn't change no matter where in the DOM tree the event resides currently.
2. `event.currentTarget`/ `this`: This is the element that currently contains the event. It can be either the during capture phase or bubble phase. It's value changes based on which element is currently having the event in possession. 

![target](/images/js-events/target.png)
[source](https://pixabay.com/photos/bulls-eye-bull-darts-game-win-1044725/)

## Event Bubbling

Once the event has reached its target(**event.target**), the same event starts bubbling up the DOM tree. Any event handlers attached to the event will be now triggered by default. Note that, all the event handlers attached to the elements in the DOM tree will be triggered.

```javascript
const divElement = document.getElementById("div1");
const buttonElement = document.getElementById("button1");

divElement.addEventListener(<eventname>, <callback2>);
buttonElement.addEventListener(<eventname>, <callback1>);
```

When the corresponding event attached to the listeners is triggered, both the callback functions will be executed in the following order: 1. `callback1` 2. `callback2`

To sumup the whole flow of event propagation, consider the following code:

```javascript
const divElement = document.getElementById("div1");
const buttonElement = document.getElementById("button1");

divElement.addEventListener("click", alert(Capture: Div), {capture: true});
buttonElement.addEventListener("click", alert(Capture: Button), {capture: true})

divElement.addEventListener("click", alert(Bubble: Div));
buttonElement.addEventListener("click", alert(Capture: Button));
```

When the click event is fired on the **button**, the following alerts are fired in the given order:
1. **alert(Capture: Div)**
2. **alert(Capture: Button)**
3. **alert(Bubble: Button)**
4. **alert(Bubble: Div)**

Note that, the event is only propagated until the target element which caused the event to be fired. If the user clicked on the `div` instead of `button`, only the event handlers attached to the `div` will be executed, in the following order:
1. **alert(Capture: Div)**
2. **alert(Bubble: Div)**

## Overriding browser defaults

The default behavior of the event lifecycle includes capture, target, and bubble-up, however, these behaviors can be overridden with the builtin methods given by javascript.

- **stopPropagation()**: `event.stopPropagation()` will stop the event from bubbling up the DOM tree. When one of the child elements handling the event uses `stopPropagation`, the event stops and the parent element will no longer handle the event. stopPropagation while useful, can be a double-edged sword. Sometimes events such as `load` are fired at the page level, and it is good not to stop its propagation. 

```javascript
const divElement = document.getElementById("div1");
const buttonElement = document.getElementById("button1");

divElement.addEventListener("click", alert(Bubble: Div));
buttonElement.addEventListener("click", function(e){
    alert(Capture: Button));
    e.stopPropagation();
}
```

Since `stopPropagation()` is used, only **alert(Bubble: Button)** method will be executed.

- **stopImmediatePropagation()**: If multiple event handlers are attached to the same event, the handlers are called in the order in which they are registered. `event.stopImmediatePropagation()` prevents other listeners of the same event from being called.

- **preventDefault()**: Certain events like radio/checkbox clicks, input keypress, performs default action. `event.preventDefault()` will stop the default behaviour. This is generally used to build controlled forms in libraries such as [ReactJS](https://reactjs.org/)

```html
<form>
  <label for="checkbox1">Checkbox:</label>
  <input type="checkbox" id="checkbox1"/>
</form>
```

```javascript
const checkBoxElement = document.getElementById("checkbox1");

checkBoxElement.addEventListener("click", function(e){
    e.preventDefault();
}
```

In the above example, `event.preventDefault()` will prevent the checkbox from even being in `checked` state by user clicks. **PreventDefault** works only if the event is cancelable, to check whether an event is cancelable, use `event.cancelable`

It is important to understand the direction, timing, and purpose of events to perform better event handling in webpages. I hope this article provided all the information you needed regarding event propagation.