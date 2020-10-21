---
date: 2020-10-08
featured: true
title: "ReactJS: Multiple refs for handling form elements using react hooks"
cover: "https://i.imgur.com/yRe2ROc.jpg"
categories: 
    - Programming
tags:
    - ReactJs
    - Javascript
    - functions
    - hooks
slug: "/reactjs-multiple-refs-for-handling-form-elements"
---

## Handling forms in React

Dynamic web applications require data to be sent to and fro from the server. Consider any web application that is used in day to day life. The user information is sent to the server via HTML form elements such as inputs (user name, user email), radio buttons (selecting a choice), checkboxes (agreeing to terms and conditions), etc. React library also has its way of handling forms to collect user data. Before we understand how `useRef` can help in handling forms, let's see what are the common methods in which form elements and data can be handled in a React web application.

## Controlled v/s Uncontrolled elements

In React, there are two distinct patterns for handling and updating the form elements that are rendered inside a component:

1. **Controlled elements**: The recommended pattern for handling forms in React is using the controlled elements. In this case, we maintain a state that would get updates every time the user changes the value within the form element. The `onChange` attribute will be provided with a change handler function that would take care of updating the state.

2. **UnControlled elements**: The more natural way the form elements get updated is by letting the form element gets updated by default browser behavior.

While the recommended way is using controlled elements, the amount of re-render increases dramatically when a user has to type in a lot of information. In such cases, providing references and using uncontrolled components would help in the reduction of re-renders.

## useRef for handling a single input element:

```javascript
import React, { useEffect, useRef } from react;

const SingleInput = ({ name }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    if(name) {
      inputRef.current.value = name;
    }
  }, []);
  console.log("Rendering...");
  return(
      <form onSubmit={() => {/* inputRef.current.value */}}>
        <input ref={inputRef} placeholder='Name'></input>
      </form>
  );
}

export default SingleInput;
```

In this example, there is a single input component handled using `ref`, and when the user types in the input, the component is not re-rendered for every change. The handleSubmit function can use `inputRef.current.value` to get the value entered by the user. If any predefined value must be loaded, the `useEffect` method takes care of it by setting the `inputRef.current.value` before the component is mounted.

## useRef for handling a multiple input element:

```javascript
import React, { useEffect, useRef } from react;

const MultipleInput = ({ firstName, lastName, Email }) => {
  const inputRef = useRef({});
  useEffect(() => {
    inputRef.current['first_name'].focus()
    inputRef.current['first_name'].value = firstName;
    inputRef.current['last_name'].value = lastName;
    inputRef.current['email'].value = Email;
  }, []);
  console.log("Rendering...");
  return(
      <form onSubmit={() => {/* inputRef.current.value */}}>
        <input ref={el => inputRef.current['first_name'] = el} placeholder='First Name'></input>
        <input ref={el => inputRef.current['last_name'] = el} placeholder='Last Name'></input>
        <input ref={el => inputRef.current['email'] = el}  placeholder='Email'></input>
      </form>
  );
}

export default MultipleInput;
```

When using multiple form inputs, we have two options:

1. Create a new `ref` for every form element present, and attach it to the input. This will increase the code and also the number of variables (refs) being handled.
2. Create an object or an array using `useRef`. The `inputRef.current` will now be an object, with each key being referenced to a unique input element being handled.

When submitting the form, the same keys can be used to access the value entered by the user. This pattern of using an object for handling multiple input elements can also be implemented with the help of `useState`. However, with every user input, the number of component renders will increase.