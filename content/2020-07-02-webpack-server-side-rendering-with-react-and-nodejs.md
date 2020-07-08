---
date: 2020-07-02
featured: false
title: "Webpack: Server side rendering with React and NodeJs"
cover: "https://i.imgur.com/ifwlpAU.jpg"
categories: 
    - Programming
tags:
    - Javascript
    - Webpack
    - NodeJs
    - React
    - Server
    - Client
slug: "/webpack-server-side-rendering-with-react-and-nodejs"
---

## Webpack: A bundling tool for javascript

Webpack is a module bundler mainly used for bundling javascript files to be used in the browser. In recent years, the javascript has grown to an extent where it has become the preferred language of choice for web development, both client and server-side. 

As web development evolved from using static HTML pages towards the dynamic generation of markup through javascript, the amount of javascript files also started to increase. If your project is using different packages and libraries for frontend development, you will need a tool that bundles all your modular code and dependencies together in one file. Webpack is an efficient tool for bundling your javascript code used for client-side development.

In this article we will go through the step by step implementation for **server-side** and **client-side** rendering of a **React** and **NodeJs** app.

## Client-side v/s Server-side rendering

In **server-side** rendered web applications, the server processes the javascript code and generates the HTML markup. This markup is sent to the client, which is immediately processed and rendered by the browser. In this scenario, the browser never waits for any javascript files, it processes the markup and renders the web app. The initial render time taken by a server-side rendered web app is quite less. Since the server provides the generated markup, search engines can easily crawl through the site-related data. Any changes to be applied on top of the server-rendered web app based on user interaction will be handled by the client-side code.

In a pure **client-side** rendered web applications, the server would only send an empty HTML along with the relevant javascript files. The client upon downloading the javascript file will start processing it and generates markup on the fly. After the markup is generate, the content will be rendered on the web browser. In this scenario, the browser will wait for the javascript files to be downloaded, and then it processes these files to generated the markup and then renders the web app. The initial render time taken by a client-only web app is more. The client-side rendered web applications also arent good for SEO as the search engines will get only the initial empty markup being sent by the browser.

Since the same code can be rendered via the server, instead of using a third-party hosting service, one can use NodeJs to server the web application. To use NodeJs for serving the content, one should bundle the javascript files in a compatible manner for both client and the server. Webpack is a tool that comes in handy for this purpose.

## Let's start coding: Production Mode

Let's look at the webpack config required for the client and server in production mode.

**Common config**
```javascript
{
  mode: 'production',
  devtool: 'source-map'
}
```

Production mode ensures that the webpack optimizes code over the build time. 

**Client config - load files**
```javascript
{
  entry: path.resolve(__dirname, '/path/to/your/index/file'),
  output: {
    path: path.resolve(__dirname, '/path/to/your/build/folder'),
    filename: 'js/[name].[chunkhash:8].js',
  },
}
```

The chunkhash provided with filename ensures that each time the name of the file generated via build is different. This will bypass any javascript file caching done by the browsers.

**Client config - rules for parsing files**
```javascript
{
  test: /\.(js)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
},
{
  test: /\.(css|s[ac]ss)$/i,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
  ],
},
```

This suggests that any javascript file would be parsed using `babel-loader`. Any stylesheets would be parsed using `css-loader` and `sass-loader`(if sass files are present). The `MiniCssExtractPlugin` extracts css from the javascript and adds it to a different file. This can be loaded eventually by the server.

**Client config - optimize bundle**
```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
  },
}
```

This is the basic level of optimization done to our bundle. The webpack will separate the main file containing our code, and all the javascript coming from npm packages into separate files. Using this we can ensure that the code responsible for painting the webpage contains minimum size possible.

**Client config - plugin details**

```javascript
plugins: [
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contentHash:8].css',
  }),
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
  }),
],
```

The `ManifestPlugin` will generate a manifest file containing the details of our hashed file names to be included in our project.

We have our client config to generate client-side code, let us now look at generating server-side bundle to be served by **nodejs**

**Server config - load files**
```javascript
target: 'node',
entry: path.resolve(__dirname, '/path/to/your/server/index/file'),
output: {
  path: path.resolve(__dirname, '/path/to/your/server/build/folder'),
  libraryTarget: 'umd',
},
```

The `libraryTarget` denotes how the module definitions are supported. `umd` is a universal pattern that supports the module definitions from both commonjs (used in NodeJs) and Asynchronous (used in frontend libraries) pattern. To learn more on this, please refer to this [article](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/)


**Server config - rules for parsing files**
```javascript
{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    plugins: [
      [
        'css-modules-transform',
        {
          camelCase: true,
          extensions: ['.css', '.scss'],
          generateScopedName: '[hash:base64]',
        },
      ],
      'dynamic-import-node',
    ],
  },
},
{
  test: /\.s[ac]ss$/i,
  use: [
    {
      loader: 'css-loader/locals',
      options: {
        localsConvention: 'camelCase',
        modules: true,
      },
    },
    'sass-loader',
  ],
},
```

This configuration would support the usage of `.css` files as modules inside javascript files.

**Server config - bundle external nodejs dependencies**
```javascript
externals: [nodeExternals()]
```

Now that we have both client and server config, `webpack-cli` can be used to build our files compatible with both client and server. Once these files are generated they can be served via a plain HTML template using **nodejs**.