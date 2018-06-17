import { combineReducers } from 'redux'
import authReducer from './auth'
import gameplayReducer from './gameplay'
import gameResultsReducer from './gameResults'

const rootReducer = combineReducers({
  auth: authReducer,
  playerIndex: gameplayReducer,
  gameResults: gameResultsReducer,
})

export default rootReducer
