import { AUTHENTICATED } from '../../actions/auth'

const authReducer = (state = 'No token', action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.payload
    default:
      return state
  }
}

export default authReducer
