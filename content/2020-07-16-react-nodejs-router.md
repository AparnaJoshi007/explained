---
date: 2020-07-09
featured: true
title: "Routing with React and Nodejs"
cover: "https://i.imgur.com/ShLYJrq.png"
categories: 
    - Programming
tags:
    - Javascript
    - NodeJs
    - React
    - Server
    - Client
    - Router
slug: "/routing-with-react-and-nodejs"
---

## Routing: Client-side and Server-side routes

In the previous article we provided a basic setup for [server side rendering with react and nodejs](/server-side-rendering-with-react-and-nodejs). Once we have the application running, we need to add routes to our application to handle different pages displaying various contents to the user. In a traditional application, these routes were individual HTML pages added to handle each route of a given application. In the modern single-page applications built with a javascript framework, such routing is handled using a router such as [react-router-dom](https://www.npmjs.com/package/react-router-dom).

In this article, we will go through our previous application and add routes that can be handled by both client and server.

## Basic setup: 

Let us begin the setup by adding react-router-dom to our project.

```javascript
npm install --save react-router-dom
```

On the client-side, simply wrap the main `App` component with `BrowserRouter`. 

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

On the server-side, we will use the stateless `StaticRouter` component and provide it with location and context information.

```javascript
// server/server.js

import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App';
import { indexHtml } from './indexHtml';

export const app = express();

// Serve generated assets
app.use(express.static(path.resolve(__dirname, '../build')));
app.use((req, res) => {
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const fullMarkup = indexHtml({
    markup,
  });
  res.status(200).send(fullMarkup);
});
```

The `StaticRouter` component expects a **location** and **context** prop. The location would be the current **URL** which is part of our request object. The context prop can be used for storing information about the route that is being rendered.

## Adding routes:

Let us first add a couple of pages to which the router should redirect when a link is provided.

```javascript
// src/Home.js

import React from 'react';
import Nav from './Nav';

const Home = () => {
  return (
    <div>
      <Nav />
      I am home
    </div>
  );
};
export default Home;
```

```javascript
// src/Page1.js

import React from 'react';
import Nav from './Nav';

const Page1 = () => {
  return (
    <div>
      <Nav />
      React App Page1
    </div>
  );
};
export default Page1;
```


```javascript
// src/Page2.js

import React from 'react';
import Nav from './Nav';

const Page2 = () => {
  return (
    <div>
      <Nav />
      React App Page2
    </div>
  );
};
export default Page2;
```

Once this is done, we will also add a component that handles navigation for these routes.

```javascript
// src/Nav.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <ul>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/page1">Page1</NavLink></li>
        <li><NavLink to="/page2">Page2</NavLink></li>
      </ul>
    </div>
  );
};
export default Nav;
```

Now that we have the components ready, we can add the routes which would render the component based on the route hit by the user.

```javascript
// src/routes.js

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />}/>
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </Switch>
  );
};

export default Routes;
```

**We are using the Switch component to render only one matching route. The router scans through the routes in the given order, and renders the first matched route.**

**The prop `exact` is used only for the path `/`. This is because `/` matches every possible route. And hence, we ask the router only to go to the Home page if the URL matches the exact location given in the path.**

The final task is to add a 404 route handler, which would redirect all the invalid routes to a 404 page.

```javascript
// src/Notfound.js

import React from 'react';

const Notfound = () => {
  return <div>Page not found :(</div>;
};

export default Notfound;
```

We will modify the router and add the following code towards the end.

```javascript
// src/routes.js

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import Notfound from './Notfound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />}/>
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
      <Route component={Notfound} />
    </Switch>
  );
};

export default Routes;
```

This would mean any unhandled route would be finally redirected to the `NotFound` page.

We will now add the `Routes` component to the `App.js` file. The URL being accessed by the browser will first hit the route component, and the correct page is displayed.


Build your project using `npm run build`. You will have a **build** and a **dist** folder created at the root of your project.

Run your server using `npm run server`. This will bring your server up and running at port **5001**.

1. Navigating to http://localhost:5001/ should display the Home page
2. Navigating to http://localhost:5001/page1 should display the Page1 content
3. Navigating to http://localhost:5001/page2 should display the Page2 content

Congratulation, you have successfully added routes to your server-side rendered react application. If you had any difficulties in following this tutorial, please refer to my GitHub repository: https://github.com/AparnaJoshi007/ssr-react-and-node
