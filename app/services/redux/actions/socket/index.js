export const GAME_RESULTS_FROM_SOCKETS = 'GAME_RESULTS_FROM_SOCKETS'

export const gameResultsFromSockets = (
  score,
  totalAnswered,
  totalCorrect,
  remainingTime,
  gameID,
) => {
  const payload = {
    score,
    totalAnswered,
    totalCorrect,
    remainingTime,
    gameID,
  }

  return {
    type: GAME_RESULTS_FROM_SOCKETS,
    payload,
  }
}
