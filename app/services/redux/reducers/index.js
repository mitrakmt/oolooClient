import { combineReducers } from 'redux'
import authReducer from './auth'
import gameplayReducer from './gameplay'
import gameResultsReducer from './gameresults'

const rootReducer = combineReducers({
  auth: authReducer,
  playerIndex: gameplayReducer,
  gameResults: gameResultsReducer,
})

export default rootReducer
