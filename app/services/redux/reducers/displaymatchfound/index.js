import { MATCH_FOUND } from '../../actions/matchfound'

const initialState = {
  player: null,
  opponent: null,
  interests: [],
}

const displayMatchFoundReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATCH_FOUND:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default displayMatchFoundReducer
