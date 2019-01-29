import { SOCKET_CONNECTED } from '../../actions/socket'

const initialState = {}

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CONNECTED:
      console.log('action', action.payload)
      return action.payload

    default:
      return state
  }
}

export default socketReducer
