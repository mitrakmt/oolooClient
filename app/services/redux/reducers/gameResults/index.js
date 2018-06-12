import { GAME_RESULTS_FROM_SOCKETS } from '../../actions/socket'

const gameResultsReducer = (state = 'No Game Results', action) => {
  switch (action.type) {
    case GAME_RESULTS_FROM_SOCKETS:
      return action.payload
    default:
      return state
  }
}

export default gameResultsReducer
