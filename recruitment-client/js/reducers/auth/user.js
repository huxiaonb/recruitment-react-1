const user = (state = { username : '', password: ''}, action) => {
  switch (action.type) {
    case 'INPUT_USER':
      return Object.assign({}, state, action.user)
    default:
      return state
  }
}

export default user
