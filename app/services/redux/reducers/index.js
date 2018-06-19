import { combineReducers } from 'redux'
import authReducer from './auth'
import gamePlayReducer from './gameplay'
import gameResultsReducer from './gameresults'
import answerResultsReducer from './answer-results'

const rootReducer = combineReducers({
  auth: authReducer,
  gameStart: gamePlayReducer,
  answerResults: answerResultsReducer,
  gameResults: gameResultsReducer,
})

export default rootReducer
