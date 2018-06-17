export const GAME_START = 'GAME_START'

export const startTheGame = playerIndex => ({
  type: GAME_START,
  payload: playerIndex,
})
