import { combineReducers } from 'redux'
import authReducer from './auth'
import socketReducer from './socket'

const rootReducer = combineReducers({
  auth: authReducer,
  socket: socketReducer,
})

export default rootReducer
