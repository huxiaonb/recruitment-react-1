import { combineReducers } from 'redux'
import user from 'reducers/auth/user'
import position from 'reducers/position/position'


const AppReducers = combineReducers({
  user,
  position
})

export default AppReducers
