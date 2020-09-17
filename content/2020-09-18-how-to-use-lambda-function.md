---
date: 2020-09-18
featured: false
title: "How to use Lambda functions in Netlify"
cover: "https://i.imgur.com/vQItHnT.jpg"
categories: 
    - Programming
tags:
    - Nodejs
    - Lambda
    - Devops
slug: "/how-to-use-lambda-function-in-netlify"
---

## What is a lambda function?

By definition, [lambda functions](https://en.wikipedia.org/wiki/Anonymous_function) are anonymous functions that are not bound to any identifiers. These functions are usually passed as arguments to other higher-order functions. However, when it comes to Netlify or any cloud provider, lambda functions take a different meaning. Lambda functions are a great way to define a small chunk of serverless code to run on your applications' behalf. Let's say you have an application running purely on the client-side, and you need a small chunk of code to be executed on the server-side, bringing up a whole new server, and deploying just to perform one small task seems a bit of overhead. In such scenarios, the lambda function comes to the rescue.

## Netlify lambda

Netlify is a cloud offering that also provides lambda functions, without an AWS account, and with function management handled directly within Netlify. These serverless functions are version-controlled, built, and deployed along with the rest of the Netlify site.

In this tutorial, we will implement a lambda function to handle a POST call coming from your site. This call makes another call to a public API and returns the data to your website.

Go to the root folder of your project and install the following package:

```javascript
npm install netlify-lambda
```

This package helps you to build your lambda function locally so you can make API calls and test the functionality.

Open `netlify.toml` file and add the folder path where is lambda function resides. It is essential to add this under the **build** step of your netlify file. This will ensure that the lambda function gets built every time to build and deploy your changes.

```javascript
// netlify.toml
[build]
  publish = "public"
  command = "yarn run build"
  functions = "lambda"
```

Now that we have the build path ready, its time to write lambda functions. Create a new folder `lambda` and an `index.js` file. Add your lambda function.

```javascript
// lambda/index.js

const { REVUE_KEY } = process.env;
const fetch = require("node-fetch");

const API_ENDPOINT = "https://someendpoint";

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    //  Add any other headers as per requirement
  };

  if (event.httpMethod === 'OPTIONS') {
    callback(null, { statusCode: '204', headers });
    return;
  }

  if(event.httpMethod === 'POST') {
    const { email } = JSON.parse(event.body) || "";
    const { name } = JSON.parse(event.body) || "";

    return  fetch(`${API_ENDPOINT}/api/v2/subscribers`, {
        method: 'POST',  
        headers: {
            'Authorization': `Token ${ENDPOINT_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "name": name,
            "double_opt_in": true
        })
    })
    .then(() =>  ({ statusCode: 201 }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
  }
};
```

The lambda functions are basically any javascript function that works on top of events. When a http method is called, you determine the type of method and perform an appropriate action.

In the above lambda function, we are handling requests to two methods. `OPTIONS` and `POST`. This execution of the methods remain same as any other asynchronous function. 

## Calling lambda function


Once you write the lambda function, it is important to call it and ensure it works as intended. All lambda functions deployed in netlify can be accessed under the URL `base_url/.netlify/functions/lambda_function_file_name`. Use this URL and make a POST call to your method.

Start your lambda function by using the following command:

```javascript
netlify-lambda build <folder>
netlify-lambda install [folder]
```

Once the lambda function is running, you can call it using `fetch` just any other API call.

```javascript
fetch(`${base_url}/.netlify/functions/index`, {
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "name": name
        })
    })
```

Push your changes and deploy them on netlify.


If you followed through the tutorial, then voila!!! You have a lambda function running in Netlify. If you had any difficulties in following this tutorial, please refer to my GitHub repository: https://github.com/AparnaJoshi007/explained. Please feel free to ping me if you have any doubts. Cheers!!!
