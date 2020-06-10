---
date: 2020-06-12
featured: false
title: "How to host a blog using GatsbyJs"
cover: "https://i.imgur.com/YPifhdH.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Blog
    - Gatsby
    - React
    - Static
    - SPA
slug: "/how-to-blog-using-gatsbyjs"
---

## GatsbyJs: An open source framework to build blazing fast websites and apps

**How to use Gatsby and configure a site fast?**

You can always use the Gatsby Cli and start building your website from ground up, this would take some significant amount of time. I would recommend the easy way of using one of the [gatsby starters](https://www.gatsbyjs.org/starters/?v=2). 

Gatsby provides a wide range of starter websites for you to choose. You can select whichever content format you are most comfortable with, select an easily usable hosting platform and a theme which agrees with your taste. Once you select a good starter website, do the following steps to get your site running

* Run the following command in your terminal 
`gatsby new gatsby-starter-blog <your chosen starter>`
* You can find the site config under `/data/SiteConfig.js` file. Change the contents of the file as per your requirements.
* The images and icons related to your site will stay under `/static` folder. You can make changes to this folder to add your own assets.
* If your site is using a markdown, you can find the blog content under `/content` folder. Change these markdowns with your own blogposts. If your starter pack is using one of the CMS tools, create your own API keys and replace them in the config.
* Push all these changes to github.
* Find the hosting platform used and provide it your github codebase link. This will get your site up and running within minutes.


