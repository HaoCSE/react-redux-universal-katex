import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './containers/App/App'

import 'katex/dist/katex.min.css';
// import { BlockMath, InlineMath } from 'react-katex';

// import { StaticRouter as Router, matchPath, Route } from 'react-router';
// import Hi from '../common/containers/Hi'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

console.log("Clientttt");
render(
  <Provider store={store}>
    <Router>
      
    </Router>

  </Provider>,
  rootElement
)
