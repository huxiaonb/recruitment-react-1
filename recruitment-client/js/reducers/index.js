import { combineReducers } from 'redux'
import user from 'reducers/auth/user'


const AppReducers = combineReducers({
  user
})

export default AppReducers
