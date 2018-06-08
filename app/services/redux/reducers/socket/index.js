import { SOCKET_CONNECTED } from '../../actions/socket'

const socketReducer = (state = 'No socket connection', action) => {
  switch (action.type) {
    case SOCKET_CONNECTED:
      return action.payload
    default:
      return state
  }
}

export default socketReducer
