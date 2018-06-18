import { GET_LEADERBOARDS } from '../../actions/leaderboard/leaderboard'

const leaderboardReducer = (state, action) => {
  switch (action.type) {
    case GET_LEADERBOARDS:
      return action.payload
    default:
      return state
  }
}

export default leaderboardReducer
