---
date: 2020-08-20
featured: false
title: "Deploy NodeJs API using docker"
cover: "https://i.imgur.com/5SaBoN8.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - NodeJs
    - Heroku
    - Docker
    - Authentication
    - Mongodb
slug: "/nodejs-deploy-with-docker"
---

## Prerequisites

Before we get to this tutorial, you need a basic setup of nodejs and mongodb application. If you don't have any setup, please refer to the [NodeJS authentication with Passport, JWT and MongoDB Part1](/nodejs-authentication-with-passport-jwt-and-mongodb) for reference.

## Adding Docker to your project

First thing you need to do is install docker desktop. Docker provides a pretty documentation to install and run docker in your machine. Please follow the link given below to install docker engine and docker compose in your local environment.

- [Windows users](https://docs.docker.com/docker-for-windows/install/): You can use the instructions given in the link to download docker desktop and install it on your windows machine. Both docker engine and docker compose comes with this installation.

- [Mac users](https://docs.docker.com/docker-for-mac/install/): Follow the link to download docker desktop and install it on your MacOS. Both docker engine and docker compse comes with this installation.

- Linux - Ubuntu: Follow [this](https://docs.docker.com/engine/install/ubuntu/) link to install docker [engine](https://docs.docker.com/engine/install/ubuntu/). And follow [this](https://docs.docker.com/compose/install/) link to install docker [compose](https://docs.docker.com/compose/install/)


## Adding Dockerfile

The dockerfile contains the instructions on how your project must be built inside its containers.

Create a new file with the name `Dockerfile` inside the root directory of your project and add the following code to it.

```javascript
// Dockerfile

FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8001
CMD [ "npm", "run", "start" ]
```

Behind the scenes these are the instructions we are giving docker.
- Docker downloads a base image containing nodejs version 12.
- Docker sets its working directory under `usr/src/app` inside the container.
- Docker copies the `package.json` file from our local project directory to `app` directories root folder.
- Docker then runs `npm install` in the root directory and installs required `node_modules`.
- Docker then copies all the files under the project into `app` directory.

![screenshot](https://i.imgur.com/jOEwrfT.png)

- Docker then exposes port 8001 to the host machine.
- It sets the execution command to be `npm run start`

## Adding docker-compose file

The docker-compose file helps in bringing up multiple containers together using one command. In this file, one can add details regarding different services the project depends on such as Databases, Logging tools, etc.

Adding the `docker-compose.yml` file at the root of your project.

```javascript
// docker-compose.yml

version: '3.8'
services:
  api:
    build:
      context: .
    ports:
      - '8001:8001'
    depends_on:
      - mongo
  mongo:
    image: mongo
    ports:
      - '27017:27017'

```

This file has listed mongodb as one of the dependencies for the project.

Change the `.env` file and add the DB_URL parameter value equivalent to dockers internal IP address

```javascript
DB_URI=mongodb://host.docker.internal:27017/demo
```

Now that all the files are added, run the following command to build the docker image:

```
docker-compose build
``` 

Finally run:

```
docker-compose up
```

This should bring your application up and run it on port 8001. Congratulations, you have successfully added built and deployed your app using docker. If you had any difficulties in following this tutorial, please refer to my GitHub repository: https://github.com/AparnaJoshi007/nodejs-authentication-api/