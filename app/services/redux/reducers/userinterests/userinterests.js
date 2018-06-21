import { SET_USER_INTERESTS } from '../../actions/userinterests/userinterests'

const userInterestsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USER_INTERESTS:
      return action.payload
    default:
      return state
  }
}

export default userInterestsReducer
