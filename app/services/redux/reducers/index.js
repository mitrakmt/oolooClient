import { combineReducers } from 'redux'
import authReducer from './auth'
import gameResultsReducer from './gameResults'
import leaderboardReducer from './leaderboard/leaderboard'

const rootReducer = combineReducers({
  auth: authReducer,
  gameResults: gameResultsReducer,
})

export default rootReducer
