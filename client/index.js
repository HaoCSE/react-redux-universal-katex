import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'

import 'katex/dist/katex.min.css';
// import { BlockMath, InlineMath } from 'react-katex';

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

console.log("server or client");
render(
  <Provider store={store}>
    <App/>

  </Provider>,
  rootElement
)
