import { GAME_RESULTS } from '../../actions/gameresults'

const initialState = {
  gameID: null,
  remainingTime: null,
  score: [],
  totalAnswered: [],
  totalCorrect: [],
}

const gameResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_RESULTS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default gameResultsReducer
