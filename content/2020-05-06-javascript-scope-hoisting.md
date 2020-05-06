---
date: 2020-05-06
featured: false
title: "Javascript scope and hoisting: Understanding block scope"
cover: "/images/js-scope-hoisting/scope-hoisting.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Scope
    - Hoisting
    - var
    - let
    - const
---

## Introduction to Scope and Hoisting

Every programming language has its own rules regarding the scope of the data being stored during program execution. The term *Scope* refers to the space with in the program where the data can be accessed. Traditionally Javascript only had two types of scopes : **Global and Function scope**.
With the introduction of **ES6**, Javascript is introduced with a thrid type of scope - **Block scope**. 

**Hoisting** is a feature unique to Javascript. Hoisting in javascript refers to the variable and function declaration being moved up to the top of the scope.


![access](/images/js-scope-hoisting/access.png)
[source](https://pixabay.com/illustrations/key-keyhole-lock-security-unlock-2114046/)

In this article we will understand the meaning scope in javascript, the implications of ES6 (block scoping), and the effects of hoisting.

## Global and Function scope

Javascript mainly has two types of scope : **Global and Function scope**. 

**Global scope** refers to all the variables declared in a JS file that are not inside any function. These variables have access anywhere in the file. **Function scope** refers to a limited private scope that the variable gets within the function it is declared. This variable can be accessed anywhere within the function, but not outside it. Let us try to illustrate with an example. Consider the following lines of code:

```javascript
// Copy paste this block of code in your file to try it out!!!
var globalVariable = "globalVariable is in global scope";

function func1() {
  var variable1 = "variable1 is in func1 scope";
}

function func2() {
  var variable2 = "variable2 is in func2 scope";
  console.log(variable1); //Uncaught ReferenceError: variable1 is not defined
}
console.log(variable1); //Uncaught ReferenceError: variable1 is not defined
```
In the above code, `globalVariable` exists throughout the JS file. Hence, it can be accessed anywhere. Since javascript code mostly executes in the browser, it is good to know what **global scope** means in the context of a browser. In any web browser, the global scope is created for us, and the `window` object lies in the global scope. Hence in the browser, the `globalVariable` can be accessed either directly or through the window object `window.globalVariable`. Since in web development we might have several javascript files, it is important to know that all the variables declared with the global scope in these files are available in the window object. This is an important point to note, if multiple files contain same variable name being declared in the global scope, unexpected code behaviours might arise because the same variable might get overriden in different files.

The `variable1` exists only inside the function `func1`, and it can be accessed only inside this function. The global space and `func2` donot have access to this variable. The `console.log` statements in both places will throw an error. 

If we use a venn diagram, we can depict the scope of these variables in the following manner:

![Venn1](/images/js-scope-hoisting/venn1.jpg)

## Scope chain and Variable look-up

Consider next piece of code:
```javascript
var globalVariable = "globalVariable is in global scope";

function outerFunc() {
  var outerVariable = "outerVariable is in outerFunc scope";

  function innerFunc() {
    var innerVariable = "innerVariable is in innerFunc scope";
    console.log(innerVariable); //Same scope
    console.log(outerVariable); //Parent scope or outer scope
    console.log(globalVariable); //Global scope
  }
}
```



## ES6 and Block scope

## Hoisting

## Let and Const

// Const in case of objects and arrays

The Big Oxmox advised her not to do so, because there were thousands of bad
Commas, wild Question Marks and devious Semikoli, but the Little Blind Text
didn’t listen. She packed her seven versalia, put her initial into the belt and
made herself on the way.

- This however showed weasel
- Well uncritical so misled
  - this is very interesting
- Goodness much until that fluid owl

When she reached the first hills of the **Italic Mountains**, she had a last
view back on the skyline of her hometown _Bookmarksgrove_, the headline of
[Alphabet Village](http://google.com) and the subline of her own road, the Line
Lane. Pityful a rhetoric question ran over her cheek, then she continued her
way. On her way she met a copy.

### Overlaid the jeepers uselessly much excluding

But nothing the copy said could convince her and so it didn’t take long until a
few insidious Copy Writers ambushed her, made her drunk with
[Longe and Parole](http://google.com) and dragged her into their agency, where
they abused her for their projects again and again. And if she hasn’t been
rewritten, then they are still using her.

> Far far away, behind the word mountains, far from the countries Vokalia and
> Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
> right at the coast of the Semantics, a large language ocean.

It is a paradisematic country, in which roasted parts of sentences fly into your
mouth. Even the all-powerful Pointing has no control about the blind texts it is
an almost unorthographic life One day however a small line of blind text by the
name of Lorem Ipsum decided to leave for the far World of Grammar.

### According a funnily until pre-set or arrogant well cheerful

The Big Oxmox advised her not to do so, because there were thousands of bad
Commas, wild Question Marks and devious Semikoli, but the Little Blind Text
didn’t listen. She packed her seven versalia, put her initial into the belt and
made herself on the way.

1.  So baboon this
2.  Mounted militant weasel gregariously admonishingly straightly hey
3.  Dear foresaw hungry and much some overhung
4.  Rash opossum less because less some amid besides yikes jeepers frenetic
    impassive fruitlessly shut

When she reached the first hills of the Italic Mountains, she had a last view
back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet
Village and the subline of her own road, the Line Lane. Pityful a rhetoric
question ran over her cheek, then she continued her way. On her way she met a
copy.

> The copy warned the Little Blind Text, that where it came from it would have
> been rewritten a thousand times and everything that was left from its origin
> would be the word "and" and the Little Blind Text should turn around and
> return to its own, safe country.

But nothing the copy said could convince her and so it didn’t take long until a
few insidious Copy Writers ambushed her, made her drunk with Longe and Parole
and dragged her into their agency, where they abused her for their projects
again and again. And if she hasn’t been rewritten, then they are still using
her. Far far away, behind the word mountains, far from the countries Vokalia and
Consonantia, there live the blind texts.

#### Silent delightfully including because before one up barring chameleon

Separated they live in Bookmarksgrove right at the coast of the Semantics, a
large language ocean. A small river named Duden flows by their place and
supplies it with the necessary regelialia. It is a paradisematic country, in
which roasted parts of sentences fly into your mouth.

Even the all-powerful Pointing has no control about the blind texts it is an
almost unorthographic life One day however a small line of blind text by the
name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox
advised her not to do so, because there were thousands of bad Commas, wild
Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.

##### Wherever far wow thus a squirrel raccoon jeez jaguar this from along

She packed her seven versalia, put her initial into the belt and made herself on
the way. When she reached the first hills of the Italic Mountains, she had a
last view back on the skyline of her hometown Bookmarksgrove, the headline of
Alphabet Village and the subline of her own road, the Line Lane. Pityful a
rhetoric question ran over her cheek, then she continued her way. On her way she
met a copy.

###### Slapped cozy a that lightheartedly and far

The copy warned the Little Blind Text, that where it came from it would have
been rewritten a thousand times and everything that was left from its origin
would be the word "and" and the Little Blind Text should turn around and return
to its own, safe country. But nothing the copy said could convince her and so it
didn’t take long until a few insidious Copy Writers ambushed her, made her drunk
with Longe and Parole and dragged her into their agency, where they abused her
for their projects again and again.


```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]

function gatsbyfunc() {
  console.log("this is logging");
}
```