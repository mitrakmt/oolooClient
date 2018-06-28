export const SOCKET_CONNECTED = 'SOCKET_CONNECTED'

export const socketConnected = socket => ({
  type: SOCKET_CONNECTED,
  payload: socket,
})
