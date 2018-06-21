import { SET_INTERESTS } from '../../actions/interests/interests'

const interestsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_INTERESTS:
      return action.payload
    default:
      return state
  }
}

export default interestsReducer
