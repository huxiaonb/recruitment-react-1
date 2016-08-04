import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import LoginForm from 'components/auth/LoginForm'
import { inputUser } from 'actions/auth/user'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputHandler: (user) => {
      dispatch(inputUser(user))
    },
    loginHandler: ({username, password}) => {
      if(username && password &&username === password) {
        browserHistory.push('main')
      } else {
        dispatch(inputUser({
          password : ''
        }))
      }
    }
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default Login
