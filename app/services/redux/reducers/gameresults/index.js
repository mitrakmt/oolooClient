import { GAME_RESULTS } from '../../actions/gameresults'
import { GAME_START } from '../../actions/gameplay'

const initialState = {
  remainingTime: null,
  score: [],
  totalAnswered: [],
  totalCorrect: [],
  gameID: null,
  answers: [],
  finishedTime: [],
  ranks: [],
}

const gameResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_RESULTS:
      return { ...state, ...action.payload }
    case GAME_START:
      return { ...state, ...initialState }
    default:
      return state
  }
}

export default gameResultsReducer
