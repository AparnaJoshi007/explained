---
date: 2020-08-07
featured: true
title: "NodeJS authentication with Passport, JWT and MongoDB Part2"
cover: "https://i.imgur.com/E1jbLnH.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - NodeJs
    - Refreshtoken
    - Accesstoken
    - Authentication
    - Passport
    - Mongodb
slug: "/nodejs-authentication-with-passport-jwt-and-mongodb-part2"
---

## Prerequisites

Before we get to this tutorial, you need a basic setup of nodejs and mongodb application with passport-local authentication strategy integrated to it. If you don't have this setup, please refer to the [part1](/nodejs-authentication-with-passport-jwt-and-mongodb) of this tutorial.

## Adding a new endpoint and middleware to check user authentication

Before hitting any endpoint and performing a database query to get the data, it is essential to understand the user context. This could be to limit or block an unknown entity from accessing our endpoints, or to get user context for retrieveing relevant data. In nodejs it is easy to add an authentication or authorization middleware for the endpoints that you choose to secure. 

Let us begin by adding a middleware which takes a bearer token in the `Authorization` header and returns appropriate response. Create a new folder `middleware` and add the following file to it.

```javascript
// /middleware/authenticate.js

import mongoose from 'mongoose';
import { verify } from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const unauthenticated = () => res.status(401).end();
  const unauthorized = () => res.status(403).end();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return unauthenticated();
  }

  const token = authHeader.split(' ')[1];
  if(!token) {
    return unauthenticated();
  }
    
  verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return unauthorized(); 
    }

    const { id: userId } = decoded;

    try {
      const user = await mongoose.model('User').findById(userId);

      if (!user) {
        unauthorized();
      } else {
        req.user = user;
        next();
      }
    } catch (e) {
      unauthorized();
    }
  });
};

export default authenticate;
```

The idea is to use the as a middleware through which the request will be routed from anytime our endpoints are hit.

Let us now add a custom endpoint which needs to be authenticated. Add a new file under the routes folder and add the following code.

```javascript
// /routes/posts.js

import { Router } from 'express';

const router = new Router();

const posts = [
  {
    name: "Test",
    showTitle: "popeye the sailor man"
  },
  {
    name: "tom",
    showTitle: "tom and jerry"
  }
]

router.get('/posts', (req, res) => {
  res.json(posts.filter(post => post.name === req.user.name));
});

module.exports = { router };
```

This endpoint is simply filtering an array of posts to return back the post the user requested. In a much more complicated scenario, this could be an endpoint request all the posts written by the user. In such scenario, we would first authenticate the user, get the `userId` and then query for the posts belonging to this `userId`.

Add the following code to our `index.js` file (server file), to add our authentication middleware.

```javascript
// index.js

import authenticate from './middleware/authenticate';
import { router as postRoutes } from './routes/posts';
app.use('/api', authenticate, postRoutes);
```

If you try to hit `/api/posts` endpoint without any authorization, the server will return a 401 claiming that the user is unauthorized.

![screen-shot1](https://i.imgur.com/ytbHWn8.png)

If you login to your server and use the `accesstoken` in the `Authorization` header and hit this endpoint, you should be able to get the results.

![screen-shot2](https://i.imgur.com/e4ERYqz.png)

Congratulation, you have successfully added a middelware to check the user authentication before making any API calls. If you had any difficulties in following this tutorial, please refer to my GitHub repository: https://github.com/AparnaJoshi007/nodejs-authentication-api/