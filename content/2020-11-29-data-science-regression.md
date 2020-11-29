---
date: 2020-11-29
featured: true
title: "Data Science: Regression"
cover: "https://i.imgur.com/KI5Caks.png"
categories: 
    - Technology
tags:
    - Javascript
    - statistics
    - datascience
    - frontend
    - regression
slug: "/data-science-regression"
---

## Background

In the [previous article](/data-science-data-visualization-javascript), we analyzed the data representing the statistics of javascript during the year 2019. The data visualization showed us how various types of javascript developers are distributed across the countries. In this article, we will look at linear and logistic regression mechanisms that can be applied to the data to predict the type of javascript developers and the various technologies that will gain more usage in the future. We will particularly look at using several descriptive features given by the users to predict whether they work in AngularJS or not. 


## Data Preprocessing

The `combineddf` used for visualizing various charts to see the data distribution will be again used for regression. Since most of the descriptive features are categorical we will be using `LabelEncoder` to transform this to Numerical data. This can be done in two ways:

1. Use the `LabelEncoder` method from `sklearn.preprocessing` library: 

```javascript
encoder = LabelEncoder()
df_LE = combineddf.apply(encoder.fit_transform)
print('Replacing categories by numerical labels: ')
print(df_LE.head())
```

This method would replace all the categorical columns/features with numeric features.

2. Use `replace` to find the various categories and replace them with appropriate numeric value: 

```javascript
filtered_df = combineddf[combineddf["yearly_salary"].notna()];
cleanup_nums = {"yearly_salary": { "work_for_free": 0, "0_10": 1, "10_30": 2, "30_50": 3, "50_100": 4, "100_200": 5, "more_than_200": 6}}
filtered_df.replace(cleanup_nums, inplace=True)
print(filtered_df)
```

This method will transform the `yearly_salary` column to numeric. 

The transformation would be done for `yearly_salary`, `years_of_experience`, and `job_title` categorical features. And these are the features we will be used for classifying the data. We will also transform the column `angular` to predict how many users would be using angularjs given their descriptive features. 

## Logistic regression - linear model

The first step is to apply a linear model for logistic regression. This means we would try to see if the data can be fit using a straight line. The logistic regression would give out a function that separates the two output classes of data (In our case whether the person codes/uses AngularJs or not). Using a linear model, we would get a function that represents a straight line.

![logisticfunction](https://i.imgur.com/oCbajJD.png)

```javascript
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import seaborn as sns
from sklearn import metrics

data_req = filtered_df[:1000]

feature_cols_react = ['yearly_salary', 'years_of_experience', 'backend_proficiency', 'css_proficiency']
X = data_req[feature_cols_react] # Features
y = data_req['angular'] # Target variable

X_train ,X_test ,y_train ,y_test = train_test_split(X,y,test_size=0.2,random_state=0)

logreg = LogisticRegression(solver = 'lbfgs', C=1e5);
logreg.fit(X_train,y_train);


y_pred=logreg.predict(X_test)
cnf_matrix = metrics.confusion_matrix(y_test, y_pred)
print("confusion matrix \n", cnf_matrix)
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
print("Precision :",metrics.precision_score(y_test, y_pred))
print("Recall:",metrics.recall_score(y_test, y_pred))
```

In the above code:
1. We are first selecting the set of columns to be used as descriptive features. These include an array having the values 'yearly_salary', 'years_of_experience', 'backend_proficiency', and 'css_proficiency'. 
2. Next we select the target we want to predict 'angular'.
3. The data is now split into a training set and test set.
4. The logistic-regression function from sklearn.linear_model is now used to fit the training data.
5. The test set can be used for the prediction and verification of our model.

Following are the metrics obtained:

- Accuracy of the classification: 81%
- Confusion matrix: ![cnf-matrix-1](https://i.imgur.com/9OZhWhK.png)

We can see that the model is overfitting, and is classifying every data point to be an angular js user. In other words, the number of false positives in the predicted data is very high. 


## Logistic regression - Polynomial model

The linear model used for classifying data is overfitting. The simpler way to solve this would be to provide different attributes as descriptive features and check their effect on the model. The reason for overfitting can be:
- The amount of data used for training is less
- The Data has too many 1's compared to 0's for the Brown frogs.
- The logistic regression is also sensitive to the outliers.

We can either use a different algorithm or try the polynomial logistic regression function. 

```javascript
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import seaborn as sns
from sklearn import metrics
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline

data_req = filtered_df;

feature_cols_react = ['yearly_salary', 'css_proficiency']
X = data_req[feature_cols_react] # Features
y = data_req['angular'] # Target variable

X_train ,X_test ,y_train ,y_test = train_test_split(X,y,test_size=0.2,random_state=0)

poly = PolynomialFeatures(degree = 2, interaction_only=False, include_bias=False)
X_poly = poly.fit_transform(X_train)

logreg = LogisticRegression(solver = 'liblinear', multi_class = 'ovr');
logreg.fit(X_poly,y_train);

X_poly_test = poly.transform(X_test);
y_pred = logreg.predict(X_poly_test)

y_pred=logreg.predict(X_poly_test)

cnf_matrix = metrics.confusion_matrix(y_test, y_pred)
print("confusion matrix \n", cnf_matrix)
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
print("Precision :",metrics.precision_score(y_test, y_pred))
print("Recall:",metrics.recall_score(y_test, y_pred))
```

1. The training set obtained by splitting the data is now transformed into the set of polynomial features of degree 2. This increases the number of features that would be used as independent variables. 
2. The logistic regression function can now fit the model and predict the data.


Following are the metrics obtained:

- Accuracy of the classification: 69%
- Confusion matrix: ![cnf-matrix-2](https://i.imgur.com/klK8I0U.png)

We can see that the model is also overfitting, however, its accuracy has come down to 69%. But note that this model is predicting the values in both categories and is not completely biased to one side. This shows that logistic regression is sensitive to outliers is not the best type of algorithm that can be used for prediction. We can use better ML algorithms. In the next post let us explore SVMs and how they can be used to better predict the values from the same data.