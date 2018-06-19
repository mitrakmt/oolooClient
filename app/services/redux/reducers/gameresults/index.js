import { GAME_RESULTS } from '../../actions/gameresults'

const initialState = {
  remainingTime: null,
  score: [],
  totalAnswered: [],
  totalCorrect: [],
  gameID: null,
  answers: [],
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
