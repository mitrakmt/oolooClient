import { SET_USER } from '../../actions/user/user'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}

export default userReducer
