import { GAME_RESULTS } from '../../actions/gameresults'

const gameResultsReducer = (state = 'No Game Results', action) => {
  switch (action.type) {
    case GAME_RESULTS:
      return action.payload
    default:
      return state
  }
}

export default gameResultsReducer
