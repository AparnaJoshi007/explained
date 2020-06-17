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

## GatsbyJs: An open-source framework to build blazing-fast websites

GatsbyJs is a free open source framework based on ReactJs that helps developers build websites within a matter of seconds. The [GatsbyJs](https://www.gatsbyjs.org/) website provides pretty good documentation on how to build your website from scratch. GatsbyJs has rich open source support, and support of many npm packages for setting up content, SEO, styling, search, pagination, analytics, deployment, etc.

One can always use the Gatsby CLI and start building your website from the ground up, this would take some significant amount of time. However, I would recommend the easy way of using one of the [gatsby starters](https://www.gatsbyjs.org/starters/?v=2). 

Gatsby provides a wide range of starter websites for you to choose from. You can select whichever content format you are most comfortable with, select an easily usable hosting platform and a theme that agrees with your taste. Once you select a good starter website, do the following steps to get your site running

* Run the following command in your terminal 
`gatsby new gatsby-starter-blog <your chosen starter>`
* You can find the site config under the `/data/SiteConfig.js` file. Change the contents of the file as per your requirements.
* The images and icons related to your site will stay under `/static` folder. You can make changes to this folder to add your assets.
* If your site is using a markdown, you can find the blog content under the `/content` folder. Change these markdowns with your blogposts. If your starter pack is using one of the CMS tools, create your API keys, and replace them in the config.
* Push all these changes to GitHub  .
* Find the hosting platform used and provide it your GitHub codebase link. This will get your site up and running within minutes.

In this blog, I will provide brief instructions on how I set up my blog using GatsbyJs.

**How I used Gatsby and configure this website?**

1. ***Pick a starter and create a new gatsby project***: For my project, I have used to following starter pack. You can either visit the GitHub page and clone this project or use Gatsby CLI to set up the project locally

```javascript
gatsby new gatsby-markdown-blog-starter https://github.com/ammarjabakji/gatsby-markdown-blog-starter
```

2. ***Understanding project structure***: GatsbyJs isn't that difficult to understand. The project has a set of predefined **folder structure** and **config files** which can be changed to configure the site as per your requirements.

**Understanding important files**
```javascript 
package.json // This file contains the list of all packages required for the project. It also contains certain scripts that are used to build and run the project
netlify.toml // This file contains instructions for deploying the project on netlify
gatsby-config.js // This file contains the metadata, plugins, and other general configuration. GatsbyJs uses various packages to support different features.
gatsby-node.js // Gatsby provides several node APIs. These API functions can be used to configure and create pages for your site.
gatsby-browser.js // This file helps in creating a wrapper element using which we can define functions to handle and respond to actions coming from the browser.
gatsby-ssr.js // This file helps in altering static HTML files as they are being Server-Side Rendered (SSR) by Gatsby
```

**Understanding important folder structure**

```javascript 
static/ // This folder contains static files such as images and icon which can be served directly 
data/ // This folder generally contains a site config file required for SEO
content/ // This folder contains markups that can be used to create blog content.
src/templates/ // This folder contains javascript files which are used to create an HTML template for rendering dynamic data in the same format
src/pages/ // Every file in this folder acts as a new page
src/layouts/ // This can be used to add common UI components such as header and SEO related content
src/components/ // This folder contains all the building block UI components for the site
```

3. ***Personalising site config***: The next step is to personalize site data. This can be done by altering the configuration provided in the `data/siteConfig.js` file.

4. ***Editing markdowns for blogs***: Start editing files inside the `content` folder. These files will be manifested as each blog.

5. ***Adding pagination***: Edit `gatsby-node.js` file to add the following config for pagination. This would create a list of pages that can be queried using page numbers from **Graphql**. Each page would contain the given number of posts

```javascript
const postsPerPage = 9;
const numPages = Math.ceil(postsEdges.length / postsPerPage);
Array.from({ length: numPages }).forEach((x, i) => {
  createPage({
    path: i === 0 ? `/blog-list/` : `/blog-list/${i + 1}`,
    component: blogListPage,
    context: {
      limit: postsPerPage,
      skip: i * postsPerPage,
      numPages,
      currentPage: i + 1,
    },
  });
});
```

Edit the `blog-list.js` template file to add the pagination component along with the list of blog posts at the bottom. This need not be necessarily `blog-list.js` file. You can edit any template file and add pagination to it.

```javascript
<ul className={styles.pagination}>
    {!isFirst && (
    <li>
        <Link to={prevPage} rel="prev">
        ← Previous
        </Link>
    </li>
    )}
    {Array.from({ length: numPages }, (_, i) => (
        <li>
        <Link key={`pagination-number${i + 1}`} to={`/blog-list/${i === 0 ? "" : i + 1}`}>
            {i + 1}
        </Link>
        </li>
    ))}
    {!isLast && (
        <li>
        <Link to={nextPage} rel="next">
            Next →
        </Link>
        </li>
    )}
</ul>
```

5. ***Adding Search***: To add a search to your gatsby project you can use a wide variety of plugins and packages. I would recommend using **elastic-lunr**. Install `@gatsby-contrib/gatsby-plugin-elasticlunr-search` npm package into the project.

Edit the `gatsby-config.js` file and add the following configuration:

```javascript
{
    resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
    options: {
    // Fields to index
    fields: [`title`, `categories`, `tags`],
    // How to resolve each field`s value for a supported node type
    resolvers: {
        // For any node of type MarkdownRemark, list how to resolve the fields` values
        MarkdownRemark: {
        title: node => node.frontmatter.title,
        categories: node => node.frontmatter.categories,
        tags: node => node.frontmatter.tags,
        path: node => node.frontmatter.slug,
        },
    },
    // Optional filter to limit indexed nodes
    filter: (node) =>
        node.frontmatter.tags !== 'exempt',
    },
},
```

Edit the query in pages where you want the search to work by adding the following query to the existing graphql query:

```javascript 
siteSearchIndex {
    index
}
```

Also, add the following data to the pages to initialize elastic-lunr search.

```javascript
import { Index as ElasticIndex } from "elasticlunr"
const searchIndex = data.siteSearchIndex.index; // Note: siteSearchIndex comes from the graphql query we edited
const getOrCreateIndex = () => {
    return ElasticIndex.load(searchIndex);
  }
const index = getOrCreateIndex(); // This index must be used by the search component

```

Finally Add the function to query the search data and display the results:

```javascript
const search = e => {
    const query = e.target.value
    const results = searchIndex.search(query, {}).map(({ ref }) => 
    searchIndex.documentStore.getDoc(ref));
}
```

6. ***Deploying to Netlify***: GatsbyJs provides support to a wide variety of static web hosting services, however, netlify has been easiest of them all. Login to netlify and link your GitHub account. Choose your GitHub repository containing the GatsbyJs project. With one click your website will be deployed.

## Adding new features

I have given examples on how to add certain important features required by any blogging website, however, the GatsbyJs project can be further enhanced to add `Google Analytics`, `Google AdSense`, `Amazon ads`, `Newsletter` etc. My [github](https://github.com/AparnaJoshi007/explained) project has all these configurations setup. You can either clone my project and edit the `siteconfig.js` file to launch your blog or refer to my project to add these additional features to your site. Happy blogging :)