import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import AppRoutes from './routes'
import AppReducers from './reducers'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let store = createStore(AppReducers)

render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('root')
)
