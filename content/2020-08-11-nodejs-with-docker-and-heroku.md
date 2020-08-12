---
date: 2020-08-11
featured: false
title: "Deploy NodeJs API to heroku using docker"
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
slug: "/nodejs-deploy-with-docker-and-heroku"
---

## Prerequisites

Before we get to this tutorial, you need a basic setup of nodejs and mongodb application. If you don't have any setup, please refer to the [NodeJS authentication with Passport, JWT and MongoDB Part1](/nodejs-authentication-with-passport-jwt-and-mongodb) for reference.

## Adding Docker to your project

First thing you need to do is install docker desktop. Docker provides a pretty documentation to install and run docker in your machine. Please follow the link given below to install docker engine and docker compose in your local environment.

- [Windows users](https://docs.docker.com/docker-for-windows/install/): You can use the instructions given in the link to download docker desktop and install it on your windows machine. Both docker engine and docker compose comes with this installation.

- [Mac users](https://docs.docker.com/docker-for-mac/install/): Follow the link to download docker desktop and install it on your MacOS. Both docker engine and docker compse comes with this installation.

- Linux - Ubuntu: Follow [this](https://docs.docker.com/engine/install/ubuntu/) link to install docker [engine](https://docs.docker.com/engine/install/ubuntu/). And follow [this](https://docs.docker.com/compose/install/) link to install docker [compose](https://docs.docker.com/compose/install/)




Congratulation, you have successfully added a middelware to check the user authentication before making any API calls. If you had any difficulties in following this tutorial, please refer to my GitHub repository: https://github.com/AparnaJoshi007/nodejs-authentication-api/