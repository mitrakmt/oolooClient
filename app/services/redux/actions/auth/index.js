export const AUTHENTICATED = 'AUTHENTICATED'

export const userAuthenticated = token => ({
  type: AUTHENTICATED,
  payload: token,
})
