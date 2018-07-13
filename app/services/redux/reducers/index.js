import { combineReducers } from 'redux'
import authReducer from './auth'
import gamePlayReducer from './gameplay'
import gameResultsReducer from './gameResults'
import interestsReducer from './interests/interests'
import userInterestsReducer from './userinterests/userinterests'
import userReducer from './user/user'
import displayMatchFoundReducer from './displaymatchfound'
import socketReducer from './socket'

// import leaderboardReducer from './leaderboard/leaderboard'

const rootReducer = combineReducers({
  auth: authReducer,
  gameStart: gamePlayReducer,
  gameResults: gameResultsReducer,
  interests: interestsReducer,
  userInterests: userInterestsReducer,
  user: userReducer,
  socket: socketReducer,
  displayMatchFound: displayMatchFoundReducer,
})

export default rootReducer
