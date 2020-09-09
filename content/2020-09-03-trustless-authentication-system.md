---
date: 2020-09-03
featured: false
title: "Trustless Authentication system with NodeJS and NuID"
cover: "https://i.imgur.com/WWlhvwS.jpg"
categories: 
    - Technology
tags:
    - Nodejs
    - Trustless
    - blockchain
    - database
    - storage
slug: "/trustless-authenticaiton-system"
---

## What does trustless mean?

The daily interactions we have either with real people or with our devices and applications require some level of trust between the interacting parties. When we create an account in Google, we are trusting our details such as username, mobile number, password with google to store it securely, preserve it, and use it whenever as per our instructions. However, there is a factor of trust involved here. 
Now imagine a system that doesn't need your true identification, a system where individuals can be completely anonymous and exchange value or information without requiring the factor of trust with one another or with a third party. Such a system is truly **#trustless**

The best example of a trustless system that has recently gained a lot of traction is [blockchain](https://en.wikipedia.org/wiki/Blockchain) based applications

## Trustless authentication

How does a normal authentication system work? The user chooses an `Id` and `Password` he wishes to authenticate with. These passwords are stored in the database of an application(usually a hashed version of it). Every time the user needs to be authenticated, the passwords are compared.

![traditional](https://i.imgur.com/pcbx0sv.png)

While the traditional authentication systems are simple and amazing, it puts the user accounts at jeopardy. Nearly 81% of data breaches that happened over the last few years are due to stolen and weak passwords.

Now think of a system where the passwords or its hashes are not stored. A system where the user's password is used similar to a **private ssh key**. The key is never shared, nor it is stored anywhere but the user's local storage (in this case, it's the user's mind). In such a system, the user's id would be public (similar to a public ssh key), but it reveals no information about the user whatsoever. Such a system provides a truly trustless authentication and [NuID](https://nuid.io/) has made it possible for us. NuID leverages a zero-knowledge cryptographic algorithm and distributed ledger technology to remove the need to store passwords in your system. The following [datahseet](https://nuid.io/pdf/data-sheet.pdf) clearly describes how they are achieving a trustless authentication system with the help of a zero-knowledge proof protocol.

![nu.id](https://i.imgur.com/uBgiFCM.png)

## Implementing trustless authentication with NodeJS and NuID

**Prerequisites**: You need a basic understanding of how a NodeJS application works. Please refer to this [tutorial](https://aparnajoshi.netlify.app/nodejs-authentication-with-passport-jwt-and-mongodb) to understand how to set up and work with a NodeJS application

**NuID**: Signup to the developer portal of NuID. Once you login, you'll be provided with NuID API key. Copy the API key into your `.env` file at the root of your project.

```javascript
NUID_API_KEY=<Your NuID API Key>
```

Install the following dependencies into your NodeJS project.

```javascript
npm i --save @nuid/zk node-fetch express body-parser mongoose dotenv
```

Note that we are not using any libraries to implement an authentication system in nodejs. This will be handled by `@nuid/zk` package and their APIs instead.

Create an `index.js` file at the root of your directory, and add the following code to it.

```javascript
const DEFAULT_PORT = process.env.DEFAULT_PORT || 8001;
const HOST = process.env.HOST || '0.0.0.0';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import connect from './src/models';
import { router as authRoutes, setUserModel } from './src/routes/auth';

dotenv.config();

const app = express();

const DB_URI = process.env.DB_URI;
connect(DB_URI);
const User = mongoose.model('User');
setUserModel(User);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/nuid-auth', authRoutes);

app.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log('\n\tStarting server...');
  console.log(`Running locally at ${HOST}:${DEFAULT_PORT}`);
});
```

This file is trying to set up a simple express app. The part of the implementation to focus on is the route `nuid-auth`. This route will be handling all the authentication logic for you.

Add the database models in the project. We are using MongoDB. To install MongoDB on your system, refer to this [link](https://aparnajoshi.netlify.app/nodejs-authentication-with-passport-jwt-and-mongodb#prerequisites).

Create a new file `index.js` under `/models` folder and add the following code:

```javascript
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true },
  nuid: { type: String, unique: true, required: true },
});

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

The next step is to add the singup route for your users. Create a file `auth.js` under `/routes` directory and add the following code:

```javascript
import { Router } from 'express';
import Zk from '@nuid/zk';
import { createCredentials } from '../utils/nuid';

let User;
const router = new Router();

const setUserModel = (userModel) => {
  User = userModel;
};

router.post('/signup', async (req, res) => {
  try {
    let verifiableSecret = Zk.verifiableFromSecret(req.body.password);
    let credentials = await createCredentials(verifiableSecret);

    let id = credentials['nu/id'];
    const newUser = new User({
      email: req.body.email,
      nuid: id
    });
    await newUser.save();
    return res.status(200).end();
  } catch(err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = {
  setUserModel,
  router
};
```

Create a `/utils` folder where we add the methods to handle API calls to NuID's servers. Create a `nuid.js` file under this folder and add the following code

```javascript
import fetch from 'node-fetch';

const apiRootUrl = 'https://auth.nuid.io';
const apiKey = process.env.NUID_API_KEY;

const createCredentials = (verifiable) => {
  const body = JSON.stringify({
    'nuid.credential/verified': verifiable
  });

  const opts = {
    method: 'POST',
    headers: getHeaders(),
    body: body
  };

  return fetch(`${apiRootUrl}/credential`, opts).then(res => res.json());
}

const getHeaders = () => {
  const headers = {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json'
  };

  return headers;
}

module.exports = {
  createCredentials
}
```

When the user signs up, the user's public credentials will be created using the cryptographic proof provided by the user. Once the credentials are created, we are only storing the `nu/id` of the user in the system. This `nu/id` is similar to a public ssh key. One cannot determine any information about the user by obtaining this id. It is also publically available. When the user profile is created, the public credentials are also added to ethereum's rinkeby network (**This is available only during preview time**).

![rinkeby](https://i.imgur.com/9B0SnNy.png)

Now that we have the public credentials of the user-created, let's try to authenticate the user. Add a new route in the `auth.js` file for the user `login`.

```javascript

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email.trim() });
    if (!user) {
      return done('Wrong Credentials');
    }

    // Get credentials of the user using public id
    let credentialResponse = await getCredentails(user.nuid);
    console.log(user.nuid)
    let nuidCredential = credentialResponse['nuid/credential'];
    
    // Challenge the credentials obtained using id. This step is required as the /challenge endpoint works with the credentials not registered with NuID
    let credentialChallengeResponse = await challengeCredentials(nuidCredential);
    let nuidJwt = credentialChallengeResponse['nuid.credential.challenge/jwt'];
    let challenge = decodeJwtPayload(nuidJwt);

    // Verify the user's secret with their token obtained from "challenge" step
    let proofForVerification = Zk.proofFromSecretAndChallenge(req.body.password, challenge);
    let verifiedProof = await verifyProof(proofForVerification, nuidJwt);

    if(verifiedProof.status === 200) {
      let localJwt = sign({ id: user.nuid }, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({
        jwt: localJwt
      });
    }    
  }catch(err) {
    console.log(err);
    res.status(400).send(err);
  }
});
```

Also, add the corresponding methods to make API calls to the NuID's servers. Add the following code in the `nuid.js` file

```javascript

const getCredentails = (id) => {
  const opts = {
    method: 'GET',
    headers: getHeaders()
  };

  return fetch(`${apiRootUrl}/credential/${id}`, opts).then(res => res.json());
}

const challengeCredentials = (credential) =>  {
  const body = JSON.stringify({
    'nuid/credential': credential
  });

  const opts = {
    method: 'POST',
    headers: getHeaders(),
    body: body
  };

  return fetch(`${apiRootUrl}/challenge`, opts).then(res => res.json());
}

const verifyProof = (proof, jwt) => {
  const body = JSON.stringify({
    'nuid.credential.challenge/jwt': jwt,
    'nuid.credential/proof': proof
  });

  const opts = {
    method: 'POST',
    headers: getHeaders(),
    body: body
  };

  return fetch(`${apiRootUrl}/challenge/verify`, opts).then(res => res);
}

const decodeJwtPayload = (jwt) => {
  let payloadBase64 = jwt.split('.')[1];
  let json = Buffer.from(payloadBase64, 'base64').toString();

  return JSON.parse(json);
}
```

This is how the verification stage works: 

1. The user's public id (nu/id) will be posted to `/credential/${id}` obtain the user public credential data. This is done using `await getCredentails(user.nuid);`
2. The user's credential data is then challenged by hitting the `/challenge` endpoint to obtain a **short-lived token**.
3. This token is decoded and used to obtain proof from the user's password. 
4. The proof and the token is finally used to verify the authenticity of the user via  `/challenge/verify` endpoint.

Once you have successfully registered a user, check your database system. Note that only the `nu/id` is stored in them, and it doesn't contain any of the secrets from the user.

![database](https://i.imgur.com/lUc0ylw.png)

If you followed through the tutorial, then voila!!! You have a trustless authentication system at your hand. If you want to check how you can add authorization to your endpoints using this method or you had any difficulties in following this tutorial, please refer to my GitHub repository: https://github.com/AparnaJoshi007/nodejs-nuid. Please feel free to ping me if you have any doubts. Cheers!!!




