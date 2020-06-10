---
date: 2020-06-11
featured: true
title: "Get your own blog: A comparison between Gatsby, NextJs, Hugo, and Jekyllrb"
cover: "https://i.imgur.com/g0kMi1y.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Blog
    - Ruby
    - React
    - Static
    - SPA
slug: "/a-comparison-between-gatsby-nextjs-hugo-jekyllrb"
---

## Blogging platforms: Traditional v/s Modern

**Blogging** has been one of the most relaxing and intriguing professions of all time. A lot of us do blogging as a hobby project because we are fascinated by a concept and want to share it with the world. Whether you are a professional blogger or a hobbyist, I am sure you must have had many choices put forth ahead of you before you choose one platform for blogging. The trends in blogging have continuously changed over the years. What was once being put out as static pages hosted using 3rd party platforms have changed to personal self-hosted blogging sites. Hence, today we have **two big** choices when we want to choose a way to blog. 

![story](https://i.imgur.com/Me07WsM.png)

1. **Traditional platforms**: The traditional platforms include the 3rd party hosted blogging sites. Here we choose a blog hosting platform such as Wordpress, Blogger, Wix, Squarespace, etc. We don't have to worry about the technical part of creating a static website for a blog (unless you want to customize the site by writing your code). These platforms provide 1000s of free and paid themes to choose from and start to blog. We also need not worry about hosting the pages, taking care of security, adding in analytics to check the viewer traffic, etc. I would highly recommend you choose this platform if you have no prior knowledge of coding, or you do not wish to learn to code.

2. **Self-Developed, Self-Hosted blogs**: If you are a programmer, or have even slightest interest in learning how the inner mechanics of a static blog works, I suggest you take the second approach. It is much easier to customize and add your features to the blog if you develop a blog and host it yourself. You also won't have to rely on a 3rd party customer service to fix your blog if the servers are down for some reason.

In this article, I will be discussing the features of 4 main tools that can be used to set up a self-developed, self-hosted blogging site, almost as quickly as you'd set up a Wordpress blog.

## [GatsbyJs](https://www.gatsbyjs.org/)

[Gatsbyjs](https://www.gatsbyjs.org/) is the framework using which this blog was built, it is also one of the easiest and intuitive ways to get your blog running. To develop your blog with gatsby, you should have some minimum knowledge of how **HTML, CSS, and React** works. Reacts official website [ReactJS.Org](https://reactjs.org/) was also built using gatsby, which makes it all the more appealing.

<img src="https://i.imgur.com/YPifhdH.jpg" alt="GatsbyJs" width="600px" />

**Here are some information on major working parts of a GatsbyJs site:**

- **Content**: Content is the king of any blogging platform. With GatsbyJs, you can either use content from CMS such as [Drupal](https://www.drupal.org/home), [Wordpress](https://wordpress.org/), [Contentful](https://www.contentful.com/) or write [markdown] content which can be stored within the codebase itself. If you have a backend service or a database containing data, you can use them too.
- **Build**: Gatsby has a powerful frontend stack with [ReactJs](https://reactjs.org/), with Graphql working as a backend query language. In this case, backend means the place where your data is stored. Graphql helps in querying data either from CMS, or a markdown, or from a public API.
- **Web Hosting**: Gatsby also provides a wide range of plugins to host in various static webhosting platforms such as [Netlify](https://www.netlify.com/), [AWS Amplify](https://aws.amazon.com/amplify/), [Github Pages](https://pages.github.com/), [Surge.sh](http://surge.sh/), [Aerobatic](https://www.aerobatic.com/), etc.

## [NextJS](https://nextjs.org/)

[NextJs](https://nextjs.org/) is a react based framework building production-ready, pre-rendered apps. To develop your blog with NextJs, you should have some minimum knowledge of how **HTML, CSS, and React** works. NextJs has a great [documentation](https://nextjs.org/learn/basics/create-nextjs-app) showing step by step procedures to get your blog page running.

<img src="https://i.imgur.com/Kxu5Xer.png" alt="NextJs" width="600px" />

**Here are some information on major working parts of a NextJS site:**

- **Content**: While NextJS supports various CMS platforms such as Wordpress, Sanity, Contentful, Agility for getting the content, it lacks documentation on specific usages. However, it provides [example sites](https://nextjs.org/docs/basic-features/data-fetching) which can be used as a starter package to build your application.
- **Build**: NextJs has a powerful frontend stack with [ReactJs](https://reactjs.org/), NextJs API working as the backend query language. NextJS provides APIs such as `getStaticProps`, `getStaticProps`, and `getServerSideProps`, helps in querying data either from CMS, or from a markdown, or a public API.
- **Web Hosting**: NextJs provides its own hosting platform such as [Vercel](https://vercel.com/). However, other hosting platforms like [Netlify](https://www.netlify.com/), [Github Pages](https://pages.github.com/), [Surge.sh](http://surge.sh/), [Aerobatic](https://www.aerobatic.com/), etc, using [Static HTML Export](https://nextjs.org/docs/deployment#static-html-export).


## [Hugo](https://gohugo.io/)

[Huge](https://gohugo.io/) is a command-line framework that can be used to quickly generate static sites. To develop your blog with Hugo, you should have some minimum knowledge of how **HTML and CSS** work. You also need some knowledge of how the navigation and multi-page website development work.

<img src="https://i.imgur.com/BTWZF7X.jpg" alt="Hugo" width="600px" />

**Here are some information on major working parts of a Hugo site:**

- **Content**: You can use command-line options to generate a new markdown that serves as content for the Hugo website. 
- **Build**: Hugo provides various built-in themes that you can adopt to generate the basic structure of your static website. This way you would have a full-fledged themed website, and you will have the power to customize it as per your requirement.
- **Web Hosting**: Hugo site provides various methods of deployment since it is a multipage static web application. You can use Hugo's documentation and choose your favorite platform for [deployment](https://gohugo.io/hosting-and-deployment/).

## [Jekyll](https://jekyllrb.com/)

[Jekyll](https://jekyllrb.com/) is a framework built on top of [Ruby](https://www.ruby-lang.org/en/). To develop your blog with Jekyll, you should have some minimum knowledge of how **HTML and CSS** works. You also need some knowledge of how navigation and multi-page development works.

<img src="https://i.imgur.com/gJkwgR1.png" alt="Jekyll" width="600px" />

**Here are some information on major working parts of a Jekyll site:**

- **Content**: The recommended way of providing content to the Jekyll website is by the usage of markdowns. 
- **Build**: Jekyll provides various gems to generate and structure your static website. It also provides gems to query your markdown content and display it on your site. The entire site is built on top of a structured format of folders.
- **Web Hosting**: Since the sites generated using Jekyll are like multipage server-rendered websites, it can be deployed in any of the cloud hosting platforms. Jekyll provides various alternatives and documentation to follow steps and easily [deploy](https://jekyllrb.com/docs/deployment/) your static site.


Whether you use a CMS to build your blog or use one of these modern frameworks for building websites, the quality of content is what matters to the users. There is of course a third way of doing things, which is building your website ground up and using a server-side framework like [dotnet](https://dotnet.microsoft.com/), [java springboot](https://spring.io/projects/spring-boot) or nodejs(https://nodejs.org/) to serve it. I hope this article provided you with enough information to make a reasonable choice to build your blog. Cheers!