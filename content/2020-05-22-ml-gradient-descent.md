---
date: 2020-05-22
featured: true
title: "Machine Learning: Gradient Descent"
cover: "/images/ml-gradient-descent/gd.jpg"
categories: 
    - Programming
tags:
    - Artificial Intelligence
    - Machine learning
    - Algorithm
    - Functions
    - Gradient Descent
    - Cost
slug: "/machine-learning-gradient-descent"
---

## Machine Learning - The Supervised kind

Machine learning is the ability of computer algorithms to improve continuously through experience. One of the most common types of machine learning techniques include supervised learning. In learning algorithms, we have two sets of values - the [***Input Features***](https://en.wikipedia.org/wiki/Feature_(machine_learning)) and the [***Output Variables***](https://en.wikipedia.org/wiki/Machine_learning#Supervised_learning).
Most of the supervised learning algorithms are classified into two types of problems:
1. Regression: In regression problems, we have a set of continuous input features, mapped against the output variables. The problem is to predict a real-valued output against an anonyomous input feature, as close to the actual value as possible.
2. Classification: In classification problems, we have a set of inputs belonging to a given category. The problem is to map anonymous input values into discreete categories.

In this article, we shall discuss about the [**Regression**](https://en.wikipedia.org/wiki/Regression_analysis) type problems in machine learning, the definition of **cost function** and the need for minimizing it. In particular we will be discussing **Gradient Descent** as a effective method to minimize the cost function.

## What is Regression? What scenarios require regression method of problem solving in machine learning?

Regression is a statistics mathematical problem solving method in which a we try to formulate a function through which a dependent variable value can be predicted, given the independent variable values.

Assume that we have the problem of predicting the value of house based on three factors: **Dimensions**, **Number of bedrooms**, and **Age of the house**. In this problem, 
- Dependent variable: Value of the house
- Independent variables: Dimension, Number of bedrooms, Age
- Regression function: f(y) = **&theta;<sub>1</sub>x<sub>1</sub>** + **&theta;<sub>2</sub>x<sub>2</sub>** + **&theta;<sub>2</sub>x<sub>2</sub>**

Where, **x<sub>1</sub>**, **x<sub>2</sub>**, and **x<sub>3</sub>** represent Dimension, No.of bedrooms and Age respectively. The co-efficients **&theta;<sub>1</sub>**, **&theta;<sub>2</sub>**, and **&theta;<sub>3</sub>** of the independent variables **x<sub>1</sub>**, **x<sub>2</sub>**, and **x<sub>3</sub>** will change according to the training samples given while formulating the regression function.

If we have only one independent variable(**x<sub>1</sub>**), we call this as linear regression. For the sake of simplicity, I will be using linear regression in the rest of the article.

## Cost function

## Minimizing cost function: We don't wana spend too much

## Gradient descent