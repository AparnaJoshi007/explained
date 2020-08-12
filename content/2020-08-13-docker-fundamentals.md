---
date: 2020-08-12
featured: true
title: "Docker fundamentals: Everything you need to know about docker"
cover: "https://i.imgur.com/lnjhGgu.jpg"
categories: 
    - Technology
tags:
    - Docker
    - container
slug: "/docker-fundamentals-everything-you-need-to-know-about-docker"
---

## What is docker?

Over the years, we have had many definitions for [docker](https://www.docker.com/). The simplest one is that it is a product that provides OS-level virtualization. The difference between docker and traditional virtual machines is that docker runs on the host OS. It doesn't spin up and operating system. 

The traditional virtual machines run on a Hypervisor installed on top of the host OS, however they spin up their own operating systems. This also means that the code complied/built on these systems can run only in the given environment. They cannot be executed on any given operating system out there.

Dockers (technically known as docker containers) however run on a platform called docker engine. The docker engine also runs on a host OS, however, it is the docker engine that is OS dependant. The code compiled/built inside the docker containers is not dependant on OS. As long you have the compatible version of the Docker engine running on any given OS, your code can be executed inside the docker engine.

This offers a very handy way of managing and shipping the code from the developer's laptop directly into a production environment. This tutorial introduces the fundamental concepts required to use docker even in your development environment and easily manage the images and containers.

## Some basic concepts and handy docker commands

To understand docker, you first need to understand the most basic concept in it. Images and Containers are the building blocks of docker.

**[Images](https://docs.docker.com/engine/reference/commandline/images/)** in docker are nothing but built piece of software that can be run on any docker-engine regardless of the environment. These images can be locally built, or they can be simply downloaded from the docker registry (if they are already present). The docker registry is a storage space for docker images. Docker registry contains a bunch of ready to use basic development environment images such as Nodejs. Any image specific to your project can be built from these basic images.

One can use a DockerFile to configure and build an image specific to your project.

1. To list the images present on your machine run the following command:

```javascript
// List all active images
docker images
```

2. Many times, certain intermediate images are built while building an image for a given project. To list all the images present on your machine, including intermediary and dangling images, run the following command:

```javascript
// List all images, including dangling and intermediary
docker images -a
```

**[Containers](https://www.docker.com/resources/what-container)** are the running instances of docker images. Your code that is already built in the docker image creation phase will be run inside the container.

1. To list the set of running containers in your machine run the following command:

```javascript
// List running containers
docker ps
```

2. To list the containers, including the ones that have stopped running, use the following command:

```javascript
// List all the containers on the host machine
docker ps -a
```

3. If you already have an image downloaded in your local machine or the public docker registry, you can use the Docker command-line interface to spin up the instance.

```javascript
// Run a given image
docker run -d -p 27017:27017 --name mongodb mongo
```
`docker run`, along with the name of the image is sufficient to bring up a container. However, if you want to run this as a background process, you use the flag `-d`. To expose a particular port inside docker to your host machine, you use the flag `-p port:port`. To name your container, you can use the flag `--name <container name>`.

4. If you want to take control of your container and use its command line directly on your host machine, use the following command

```javascript
// Run a containers bash
docker exec -it <container name> /bin/bash
```

## Understanding docker and host IP addresses

One of the common frustrating experiences with docker is not being able to figure out how the docker and host IP addresses work.

1. **Docker to Host**: Any image running inside the docker will be available to the host machine at the localhost address, provided the docker is exposing the port to the host machine.

If your container is running `MongoDB`, and you have exposed it as `-p 27017:27017`, which means, the `27017` port of docker is linked to `27017` port of host machine. You can access this database on your host machine at `localhost:27017`.

2. **Host to Docker**: Any image running on a host (**This could also include an image that is running in docker, which is exposed to the host**), can be accessed inside docker via `host.docker.internal:port`.

Let's say, you have a Redis instance running in your local machine on port `6379`, and you want to access it inside your docker container running a nodejs application. You can use `host.docker.internal:6379` to connect to your Redis instance.

3. **Docker to docker**: If you want to directly communicate between 2 docker images, you can set up a bridge network and link these images to the network. This way all the docker containers running on the network can access each other's resources: https://docs.docker.com/network/bridge/


## Understanding dangling images

One of the reasons why docker might seem to be an overhead is due to the creation of dangling images. To understand what are dangling images, let us understand how an image is built using a docker engine.

1. Docker takes a base image from the registry and starts building your image.
2. During the process, docker sometimes creates multiple intermediate images. Intermediate images are created when docker tries to install a bunch of packages (For example npm modules). These images are tagged as `<none>:<none>`. These are required images and the docker will have internal links to these images. Every time you rebuild your docker image using the same code, the intermediate images are reused, and hence the build process takes less time. In the case of a production build however, these images can be discarded/deleted.
3. Docker finally builds an image and tags it with the appropriate image name. This is the final image that is ready to run as a container.

Dangling images are created when the final images lose the link to the intermediate images. This could happen because you deleted the final image, and left out the other images linked to it.
Dangling images take a huge part of your hard disk space and can be deleted using the following command:

```javascript
// remove all dangling images
docker rmi $(docker images -f "dangling=true" -q)
```

## DockerFile explained
Dockerfile is used to instruct the docker engine on how an image must be built. This file commonly lists the following details:
1. **FROM <base image>**: Specifies the base image using which the image must be built
2. **WORKDIR <directory>**: Specifies the working directory inside the docker. 
3. **COPY <pathinhost pathindocker>**: Specifies the project path in the host machine that must be copied inside the docker.
4. **RUN <cmd>**: Specifies the commands to run to install dependencies inside docker.
5. **EXPOSE <port>**: Specifies the port on the docker container that must be exposed to the host machine.
6. **CMD [<cmd>]**: Specifies the exact command that must be run to start an application.

## Docker compose explained
While the image built using Dockerfile can be easily run using docker CLI, it is handy to use docker-compose instead. This especially helps while deploying code to production environments, since docker-compose is a YAML file.

Docker-compose files usually start by specifying the version of docker to be used, the services that must be built, and the corresponding dockerfiles to build them. It also lists the depending service. One of the advantages of using dockerfile is the fact that any depending service will be automatically spun up and connected to your main service. This avoids the need to use a bridge network for manually connecting them.

Run the following commands to build and bring up your containers

```javascript
// run docker compose
docker-compose -f <docker compose file> build
docker-compose -f <docker compose file> up
```

## Docker v/s Kubernetes

We have understood much of what docker is, it is finally time to understand another term that is closely used with docker. Docker and Kubernetes are completely different. Docker is a platform that facilitates containerization, while Kubernetes provides an orchestration layer for these containers. In other words, docker brings up containers and Kubernetes handles them.