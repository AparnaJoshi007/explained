---
date: 2020-05-22
featured: true
title: "Machine Learning: Cost Function"
cover: "/images/ml-cf/gd.jpg"
categories: 
    - Programming
tags:
    - ArtificialIntelligence
    - MachineLearning
    - Algorithm
    - Functions
    - Cost Function
slug: "/machine-learning-cost-function"
---

## Machine Learning - The Supervised kind

Machine learning is the ability of computer algorithms to improve continuously through experience. One of the most common types of machine learning techniques include supervised learning. In learning algorithms, we have two sets of values - the [***Input Features***](https://en.wikipedia.org/wiki/Feature_(machine_learning)) and the [***Output Variables***](https://en.wikipedia.org/wiki/Machine_learning#Supervised_learning).
Most of the supervised learning algorithms are classified into two types of problems:
1. **Regression**: In regression problems, we have a set of continuous input features, mapped against the output variables. The problem is to predict a real-valued output against an anonyomous input feature, as close to the actual value as possible.
2. **Classification**: In classification problems, we have a set of inputs belonging to a given category. The problem is to map anonymous input values into discreete categories.

In this article, we shall discuss about the [**Regression**](https://en.wikipedia.org/wiki/Regression_analysis) type problems in machine learning, the definition of **cost function** and the need for minimizing it.

## What is Regression? What scenarios require regression method of problem solving in machine learning?

Regression is a mathematical problem solving method in which a we try to formulate a function through which an unknown variable can be predicted, whose value depends upon the values of known variables.

Assume that we have the problem of predicting the monetary value of house based on three factors: **Dimensions**, **Number of bedrooms**, and **Age of the house**. One can say that, the value of the house increases if the **Dimensions** and **Number of bedrooms** increases. On the otherhand, the value of house decreases if the **Age** increases

In this problem, 
- [**Unknown/Dependent variable**](https://en.wikipedia.org/wiki/Dependent_and_independent_variables)(**y**): Value of the house
- [**Known/Independent variable/s**](https://en.wikipedia.org/wiki/Dependent_and_independent_variables)(x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>): Dimension, Number of bedrooms, Age
- **Regression function example**: **f(x)** = **&theta;<sub>1</sub>x<sub>1</sub>** + **&theta;<sub>2</sub>x<sub>2</sub>** + **&theta;<sub>2</sub>x<sub>2</sub>**

Where, **x<sub>1</sub>**, **x<sub>2</sub>**, and **x<sub>3</sub>** represent Dimension, No.of bedrooms and Age respectively. **y** is the correct value of the house. The co-efficients **&theta;<sub>1</sub>**, **&theta;<sub>2</sub>**, and **&theta;<sub>3</sub>** of the independent variables **x<sub>1</sub>**, **x<sub>2</sub>**, and **x<sub>3</sub>** will change according to the training samples given while formulating the regression function **f(x)**.

If we have only one independent variable(**x**), we call this as **linear regression**. For the sake of simplicity, I will be using linear regression in the rest of the article.

## Cost of the hypothesis function
<img src="/images/ml-cf/cost.jpg" alt="cost" width="600px" />

[source](https://pixabay.com/illustrations/bitcoin-currency-technology-money-3089728/)

Consider the linear regression problem containing only one independent variable. Let's define the linear regression function by: 

**f(x)** = **&theta;<sub>0</sub>** + **&theta;<sub>1</sub>x**

This function is a hypothesis function in which we say that, for certain value of **&theta;<sub>0</sub>** and **&theta;<sub>1</sub>**, given the value of **x**, we get the predictions of **f(x)** very close to the actual value. 

Let us consider two graphs. **Graph 1 contains the plot of output *y* versus the input values *x* as dots on a graph**. **Graph 2 contains the plot of hypothesis function *f(x)* plotted on the graph as a straight line**. If we merge these two graphs and represent them in a single graph, the distance between the **predicted value**(a point on the hypothesis function) and the **actual value**(training sample value) represents the cost of individual predictions.

**Let us view this graph:**

<img src="/images/ml-cf/graph1.png" alt="graph1" width="600px" />

**In the above graph:**
1. Individual points on the graph represent each training sample **y** v/s **x**.
2. The line on the graph represents the hypothesis function **f(x)**
3. The distance between the points and the line represents the **cost** for the individual training sample

**Cost representation**: We have seen the representation of cost graphically. Let us try to derrive a mathematical equation out of this graphical representation. We define the following parameters used in the cost funciton.

- J(**&theta;<sub>i</sub>**) => Individual Cost function.
- f(**x<sub>i</sub>**) => Hypothesis function for **i<sub>th</sub>** training set.
- **y<sub>i</sub>** => **i<sub>th</sub>** value in training set.

The individual costs can defined as the difference between the value of hypothesis function and the actual value:
J(**&theta;<sub>1</sub>**) = f(**x<sub>1</sub>**) - **y<sub>1</sub>**, J(**&theta;<sub>2</sub>**) = f(**x<sub>2</sub>**) - **y<sub>2</sub>**

The total cost of all the values present in the training set can be represented as: **Total cost** = **&Sigma;<sub>0-i</sub>** (f(**x<sub>i</sub>**) - **y<sub>i</sub>**)

## Minimizing cost function: We don't wana spend too much now, Do we?

The final goal of linear regression is to find the hypothesis function using training samples, such that the final total cost of the hypothesis function is minimal. Let us derrive the equation that represents cost function to be minimized.

1. We know that the total cost of the hypothesis function, given a training set can be defined as: Total cost = **&Sigma;<sub>0-i</sub>** (f(**x<sub>i</sub>**) - **y<sub>i</sub>**)

2. We want the cost to be minimum, in other words, the difference between (f(**x<sub>i</sub>**) and **y<sub>i</sub>**) should be minimum. Note that when we square an integer, its value increases, however, if we square a fraction, its value decreases. 
Squaring the the difference will make sure that the cost is at its absolute minimum: Total cost = J(**&theta;<sub>i</sub>**) = **&Sigma;<sub>0-i</sub>** (f(**x<sub>i</sub>**) - **y<sub>i</sub>**)<sup>2</sup>

3. Let us consider that the training sample has `m` number of values in it. The average cost can be represented as: (**&Sigma;<sub>0-i</sub>** (f(**x<sub>i</sub>**) - **y<sub>i</sub>**)<sup>2</sup>)/**m**

**Hence the average cost function to be minimized can be represented as:**
J(**&theta;**) = (**&Sigma;<sub>0-i</sub>** (f(**x<sub>i</sub>**) - **y<sub>i</sub>**)<sup>2</sup>)/**m**

If we substitute the hypothesis function with the actual values of **&theta;** and **x**, we get the cost function as:

J(**&theta;**) = (**&Sigma;<sub>0-i</sub>** ((**&theta;<sub>0</sub>** + **&theta;<sub>1</sub>x<sub>i</sub>**) - **y<sub>i</sub>**)<sup>2</sup>)/**m**

There are many algorithms that can be implemented to minimize this cost function. **Gradient descent** is one such algorithm commonly used, however, note that there are more than one ways to reduce the cost function. I hope this article gave an insight on understanding how the average cost function is derrived from the hypothesis function in linear regression.