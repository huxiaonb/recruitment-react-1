'use strict'
import React from 'react'
import { Redirect, Router, Route, IndexRoute, browserHistory } from 'react-router'
import Layout from 'containers/Layout'
import Login from 'containers/auth/Login'
import Main from 'containers/Main'
const AppRoutes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Login} />
        <Route path="main" component={Main} />
      </Route>
    </Router>
  )
}

export default AppRoutes
