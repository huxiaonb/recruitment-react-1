import React from 'react'
import { browserHistory } from 'react-router'

import {Paper, RaisedButton, Divider, TextField} from 'material-ui'

const style = {
  height: 300,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}

const LoginForm = ({user, inputHandler, loginHandler}) => {
  const onChange = type =>
     e => {
      e.preventDefault()
      user[type] = e.target.value
      inputHandler(user)
    }


  return (
    <Paper style={style} zDepth={2}>
      <TextField
        hintText="User"
        value={user.username}
        onChange={onChange('username')}
         />
      <TextField
        hintText="Password"
        type="password"
        value={user.password}
        onChange={onChange('password')}
      />
      <RaisedButton label="Login"  onClick={() => loginHandler(user)}/>
    </Paper>
  )
}

export default LoginForm
