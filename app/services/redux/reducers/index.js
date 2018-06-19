import { combineReducers } from 'redux'
import authReducer from './auth'
import gamePlayReducer from './gameplay'
import gameResultsReducer from './gameresults'
// import leaderboardReducer from './leaderboard/leaderboard'

const rootReducer = combineReducers({
  auth: authReducer,
  gameStart: gamePlayReducer,
  gameResults: gameResultsReducer,
})

export default rootReducer
