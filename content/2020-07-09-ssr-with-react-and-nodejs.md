---
date: 2020-07-09
featured: true
title: "Server side rendering with React and NodeJs"
cover: "https://i.imgur.com/UnCFQpQ.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - NodeJs
    - React
    - Server
    - Client
slug: "/server-side-rendering-with-react-and-nodejs"
---

## Why do we need server-side rendering?

Over the past decade, javascript has grown to be the most popular and powerful language of the web. The javascript libraries and frameworks have made it possible to generate and render an entire webpage on the client without having to send the generated HTML content from a server. Libraries such as [ReactJs](http://reactjs.org/) has optimized the way HTML content is rendered on a client to a great extent, due to which, many people are moving towards client-side rendering only.

However, the old way of rendering HTML content via server (server-side rendering) has its benefits and advantages.

- **Server-side rendering has faster initial page load**: Since the HTML is served directly from the server, the browser need not wait until the javascript is downloaded and processed before painting the page. It ensures that an initial layout of the web page is available quickly.

- **Server-side rendering ensures better SEO**: The search engines often crawl through your routes to analyze the content and update its ranking. If the webpage is rendered completely on the client, the search engines will get dummy content when they try to crawl through the webpage routes. Server-side rendering provides better information about the webpages to the crawlers.


## Creating your app with React and Nodejs

For this article, we will start from scratch without using any boilerplates such as [creat-react-app](https://github.com/facebook/create-react-app). However, the following instructions can be followed to render an existing app from the server-side. Please note that this article only covers the production mode configuration for javascript files. Any stylesheets added to the app will fail. We can further enhance the config to accommodate styles as well.

Let us go to our project folder and do an `npm init`. Provide the default information to the questions asked to create the config. When it is done you should have a `package.json` file in your project folder.

We will start by installing some of the basic packages required for a react and nodejs application.

```javascript
npm install --save react react-dom express
```

Create a folder to contain all your client-sside files

```javascript
mkdir src && touch src/index.js
```

Here is the entry point of our client application:

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrate(
  <App />,
  document.getElementById('root')
);
```

The `App` is the root component containing all your client-side code. This would include your `routes`, any state management libraries such as `redux`.
`ReactDOM.hydrate` is used when the app is rendered on the server-side as well. This will ensure that react will only hydrate the content already rendered by the server. React will attempt to attach event listeners and any other client-side enhancements to the existing markup. 

Next, we add the root file containing all the clientside code:
```javascript
// src/App.js

import React from 'react';

const App = () => {
  return (
    <div>React App</div>
  );
};
export default App;
```

Create a folder to contain your server-side code. This will be divided into 3 parts so that the server-side content is better managed.

- indexHtml.js: A javascript file containing our base HTML markup. This will contain a function which will take the server-generated markup, attach it to the main `div` and provide back the HTML content as a string

- server.js: This file contains server-side code to generate the markup and serve it as a response.

- index.js: This file will start your server on a given port.

Let us go ahead and add these files to our project.

```javascript
mkdir server && touch server/index.js && touch server/indexHtml.js && touch server/server.js
```

The HTML basic markup would contain the following code

```javascript
// server/indexHtml.js
export const indexHtml = ({ markup }) => {
  return `
    <!doctype html>
    <html lang="en">
      <body>
        <div id="root">${markup}</div>
        <script type="text/javascript" src="js/main.js" defer></script>
        <script type="text/javascript" src="js/vendors~main.js" defer></script>
      </body>
    </html>
  `;
};
```

Add the following code to `server.js`. This is used for building server-side HTML and serving it.

```javascript
// server/server.js

import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import { indexHtml } from './indexHtml';

export const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.use((req, res) => {
  const markup = ReactDOMServer.renderToString(<App />);
  const fullMarkup = indexHtml({
    markup,
  });
  res.status(200).send(fullMarkup);
});
```

Finally, add the following code to the `index.js` file which would be used to start our server.

```javascript
// server/index.js

const { app } = require('../dist/server');
const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, (err) => {
  if (err) {
    return console.error(chalk.red(err));
  }

  return console.info(
      `Server running on port ${PORT}`
  );
});
```

We are using two unknown folders `build` and `dist`. When the webpack is used to bundle our files, the `build` folder will contain javascript files for client-side rendering, and the `dist` folder will contain server files for server-side rendering.

## Adding babel and webpack

We have the react and nodejs app is ready, however, they are not bundled yet to be served using Nodejs. Add `babel` related packages and config to ensure our ES6 code is transformed into commonjs which can be rendered by nodejs. Add `webpack` related packages and config to provide instructions on how the project should be built.

Install some of the basic packages required for babel and webpack.

```javascript
npm install --save @babel/core @babel/preset-env @babel/preset-react babel-loader babel-plugin-dynamic-import-node core-js 

npm install --save webpack webpack-node-externals webpack-cli
```

Add `.babelrc` file at the root of your folder. This file will contain the configurations which will enable babel to transpile your code.

```javascript
// .babelrc
{
  "presets": [
     [
         "@babel/env",
         {
            "useBuiltIns": "usage",
            "corejs": "3.0.0",
            "targets": {
                "browsers": ">1%, not dead, not ie 11, not op_mini all",
                "node": 10
            }
         }
      ], 
      "@babel/react"
  ],
  "plugins" : [
      "dynamic-import-node"
  ]
}
```

Add `webpack.config.js` file at the root of your folder. This file will contain the configurations using which webpack will build your project.

```javascript
// webpack.config.js

const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    mode: 'production',
    devtool: 'source-map',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'js/[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [new TerserJSPlugin({})],
    },
  },
  {
    mode: 'production',
    target: 'node',
    node: {
      __dirname: true,
    },
    entry: path.resolve(__dirname, './server/server.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'server.js',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
      ],
    },
    externals: [nodeExternals()],
  }
];
```

To understand each configuration in the webpack file, please refer to the following article: [Webpack: Server side rendering with React and NodeJs](/webpack-server-side-rendering-with-react-and-nodejs)

## Ready to build and serve

Now that we have all the configurations and files required for our server-side rendered project, we will add scripts to our `package.json` file to build our project and serve it.

Add the following scripts to `package.json` file

```javascript
// package.json

"scripts": {
  "build": "webpack",
  "server": "node server/index.js"
},
```

Build your project using `npm run build`. You will have a **build** and a **dist** folder created at the root of your project.

Run your server using `npm run server`. This will bring your server up and running at port **5001**.

Visit your website by hitting http://localhost:5001/

Let us now confirm that your website is server-rendered.

1. Disable javascript on your browser: Go to settings on your browser. Under `debugger` you will find a check box stating **Disable javascript**. Check this option

![Debugger](https://i.imgur.com/WWi99zQ.png)

2. Reload your browser window. You should see the `javascript disabled` icon as your page reloads. 

![js-disabled](https://i.imgur.com/EziIquu.png)

If you can see the same content and experience before you disabled javascript, then congratulations. You have a fully functioning server-side rendered react application. If you had any difficulties in following this tutorial, please refer to my github repository: https://github.com/AparnaJoshi007/ssr-react-and-node
