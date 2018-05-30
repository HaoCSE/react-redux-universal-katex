/* eslint-disable no-console, no-use-before-define */

import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import ReactDOMServer from 'react-dom/server'

import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import App from './containers/App/App'
// import Hi from '../common/containers/Hi'
import { fetchCounter } from './api/counter'

import { StaticRouter as Router, Route } from 'react-router';
// import { ServerRouter, Route } from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Router, Route } from 'react-router';
// import { BrowserRouter as Router, Route } from 'react-router'

import { matchPath } from 'react-router-dom'

import { routes } from './routes'

const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

const handleRender = (req, res) => {
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query)
    const counter = parseInt(params.counter, 10) || apiResult || 0

    // Compile an initial state
    const preloadedState = { counter }

    // Create a new Redux store instance
    const store = configureStore(preloadedState)

    // Render the component to a string
    // on the server
    const context = {}
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <Router
          location={req.url}
          context={context}
        >
          <App/>
        </Router>

      </Provider>
    )



    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      console.log("context");
      console.log(context.url);
      res.writeHead(301, {
        Location: context.url
      })
      res.end()
    } else {
      console.log("no context");
      // we're good, send the response
      // res.write(`
      //   <!doctype html>
      //   <div id="app">${html}</div>
      // `)
      // res.end()
      // inside a request
      const promises = []
      // use `some` to imitate `<Switch>` behavior of selecting only
      // the first to match
      routes.some(route => {
        // use `matchPath` here

        const match = matchPath(req.path, route)
        if (match)
          {
              console.log("match");
              console.log(req.path);
              console.log(route);
              // console.log(req);
              promises.push(route.loadData(match))
          }

        return match
      })

      Promise.all(promises).then(data => {
        console.log("promises");
        console.log(data);
        // return "to client..." //can't
        // do something w/ the data so the client
        // can access it then render the app
      })
    }



    // Grab the initial state from our Redux store
    const finalState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState))
  })
}

// This is fired every time the server side receives a request
app.use(handleRender)

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
