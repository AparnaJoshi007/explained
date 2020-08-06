---
date: 2020-07-30
featured: false
title: "NodeJS authentication with Passport, JWT and MongoDB Part1"
cover: "https://i.imgur.com/E1jbLnH.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - NodeJs
    - Server
    - Authentication
    - Passport
    - Mongodb
slug: "/nodejs-authentication-with-passport-jwt-and-mongodb"
---

## NodeJs as a microservice.

Node.js is an open-source, JavaScript runtime environment that executes JavaScript code outside a web browser. While NodeJs is only an engine where javascript can be executed, several frameworks can be used on top of nodejs to build robust web applications and APIs.

In this article, we will be using the **express** framework on NodeJs to provide authentication endpoints that can be plugged into any frontend application. We will use [passport-local](http://www.passportjs.org/packages/passport-local/) strategy to set up a local authentication middleware, MongoDB for storing user data, and JWT for authenticating users.

## Prerequisites

Before we get to coding, you need to install NodeJs and MongoDB on your system. Please install NodeJs by referring to the [official nodejs downloads page](https://nodejs.org/en/download/) (It is better to install the latest LTS version of NodeJs on your machine). 

MongoDB has many editions, please download the MongoDB community edition to follow this tutorial.

- [Install MongoDB on macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- [Install MongoDB on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- [Install MongoDB on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

## Authentication using session v/s JWT

When using [passport-local](http://www.passportjs.org/packages/passport-local/), there are two ways in which user information can be exchanged between the APIs. 

- **Sessions**: In this approach, the server creates a session when the user logs in, provides the corresponding `sessionid` to the user. The user can then send this `sessionid` in the subsequent requests. The drawback of using this approach is the fact that the session identifier must be kept in memory and we need to make sure that the client hits the same server for every request. It also poses certain challenges when we want to implement API to API authorization in a microservice architecture.

- **JSON Web Tokens(JWT)**: JWTs are nothing but encrypted tokens containing some information regarding the user. These tokens are created by the server, providing minimal user information (such as userID) and sent to the client. It is the responsibility of the client to store this token and send it along with every request. JWTs are excellent for API to API authorization, however, they also provide certain challenges. When using JWTs, the token must be stored securely and additional mechanisms should be implemented to invalidate tokens and refresh them periodically to maintain its trust and safety.

## Onward to the code

Once you have the prerequisite setup ready, start the code by creating a space for a new node app:

``` npm init ```

You'll be prompted to provide some information regarding the project, once this step is complete, a `package.json` file will be created in your project.

Let us add **express** and certain related npm packages required for setting up basic server and authentication.

```javascript
npm install --save express body-parser mongoose passport passport-local morgan dotenv bcryptjs jsonwebtoken
```

Now that required packages are installed, add the `index.js` file where the main code for API setup will go.

```javascript
// index.js

const DEFAULT_PORT = process.env.DEFAULT_PORT || 8001;
const HOST = process.env.HOST || '0.0.0.0';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import dotenv from 'dotenv';

import connect from './models';
import { router as authRoutes, setUserModel } from './routes/auth';
import getLocalSignupStrategy from './passport/local-signup';
import getLocalLoginStrategy from './passport/local-login';

dotenv.config();

const app = express();

const DB_URI = process.env.DB_URI;
connect(DB_URI);
const User = mongoose.model('User');
setUserModel(User);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use('local-signup', getLocalSignupStrategy(User));
passport.use('local-login', getLocalLoginStrategy(User));
app.use('/auth', authRoutes);


app.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log('\n\tStarting server...');
  console.log(`Running locally at ${HOST}:${DEFAULT_PORT}`);
});
```

We begin by creating an `express` app. The `DB_URI` is the connection string to connect to MongoDB. We also need to import the `usermodel` that is used for adding users to our database and set them for further use in authentication routes and passport.

**Morgan** is a package used to control the nodejs logging. **BodyParser** helps in parsing JSON sent to our server.

We then set up `passport` in our app and use two strategies for `user signup` and `user login`.

The `app.listen` will officially start our server in the given port. If you start the server, it will now throw an error since we have a lot of components to be added to our project. 

The next step is to add the dotenv file to our project and add a few required env variables.

```javascript
// .env

DEFAULT_PORT=8001
HOST=0.0.0.0
DB_URI=mongodb://localhost:27017/demo
ACCESS_TOKEN_SECRET=mysecret
```

Let us now begin by adding our Database user model. Create a folder named `models` and add the following files in it.

```javascript
// models/index.js

import mongoose from 'mongoose';

import UserSchema from './schemas/user';

const connect = (uri) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  mongoose.model('User', UserSchema);
};

export default connect;
```

Now create a new folder in `models` called `schemas` and add the following schema for the **User**.

```javascript
// models/schemas/user.js

import mongoose from 'mongoose';
import {
  compare,
  genSalt,
  hash,
} from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true },
  name: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});


UserSchema.methods.comparePassword = function (password) {
  return compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});

export default UserSchema;
```

Now we have a basic model, schema, and methods for creating and adding users to our database. The next step is to add passport authentication strategies.

Create a folder `passport` and add the following files for user login and signup.

```javascript
// passport/local-signup.js

import { Strategy as PassportLocalStrategy } from 'passport-local';

const getStrategy = (User) => new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, async (req, email, password, done) => {
  const newUser = new User({
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
  });

  try {
    await newUser.save();
    done(null);
  } catch (err) {
    console.error(err);
    done(err);
  }
});

export default getStrategy;
```

```javascript
// passport/local-login.js

import { Strategy as PassportLocalStrategy } from 'passport-local';
import { sign } from 'jsonwebtoken';

const getStrategy = (User) => new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return done('Wrong Credentials');
    }

    const matched = await user.comparePassword(password.trim());

    if (!matched) {
      return done('Wrong Credentials');
    }

    done(null, 
      sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET));
  } catch (e) {
    console.error(e);
    done('Some unknown error');
  }
});

export default getStrategy;
```

The final step is to add routes for authentication. Create a folder `routes` and add the following file inside it.

```javascript
// routes/auth.js

import { Router } from 'express';
import passport from 'passport';

let User;
const router = new Router();

const setUserModel = (userModel) => {
  User = userModel;
};

router.post('/signup', (req, res, next) => {
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.json({
        error: err
      });
    }

    return res.status(200).end();
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  return passport.authenticate('local-login', (error, accessToken) => {
    if (error !== null) {
      return res.json({
        error: err
      });
    }

    return res.json({
      payload: {
        accessToken,
      },
    });
  })(req, res, next);
});

module.exports = {
  setUserModel,
  router
};

```

Now to run the server lets add some babel packages which would transpile our ES6 code.

```javascript
npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env nodemon
```

Add the `.babelrc` file at the root of your project folder.

```javascript
{
  "presets": [
    "@babel/preset-env"
  ]
}

```

Add the following script under `package.json` file. This would be used to start your server.

```javascript
"start": "nodemon --exec babel-node --use_strict ./index.js"
```

Now let's run `npm run start`. You should see the following screen on your terminal.

![screen-shot](https://i.imgur.com/EDFKzNb.jpg)

Use postman, try to hit the `http://localhost:8001/auth/signup` endpoint with the details of your email-id and password. This request should be successful.

![screen-shot](https://i.imgur.com/3uU66kf.png)

Use the same email-id and password and hit the `/login` endpoint. Your response should be successful and should contain `accessToken` assigned for your `userid`.

![screen-shot](https://i.imgur.com/fmpvDAv.png)

Congratulation, you have successfully created a nodejs application with passport-local and JWT for authentication. If you had any difficulties in following this tutorial, please refer to my GitHub repository: https://github.com/AparnaJoshi007/nodejs-authentication-api/