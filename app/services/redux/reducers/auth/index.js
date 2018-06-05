import { AUTHENTICATED } from '../../actions/auth'

const authReducer = (state = 'No token', action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, auth: action.payload }
    default:
      return state
  }
}

export default authReducer
