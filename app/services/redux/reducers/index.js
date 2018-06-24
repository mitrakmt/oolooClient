import { combineReducers } from 'redux'
import authReducer from './auth'
import gamePlayReducer from './gameplay'
import gameResultsReducer from './gameresults'
import interestsReducer from './interests/interests'
import userInterestsReducer from './userinterests/userinterests'
import userReducer from './user/user'
// import leaderboardReducer from './leaderboard/leaderboard'

const rootReducer = combineReducers({
  auth: authReducer,
  gameStart: gamePlayReducer,
  gameResults: gameResultsReducer,
  interests: interestsReducer,
  userInterests: userInterestsReducer,
  user: userReducer,
})

export default rootReducer
