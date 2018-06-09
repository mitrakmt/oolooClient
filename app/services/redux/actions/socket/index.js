export const GAME_RESULTS_FROM_SOCKETS = 'GAME_RESULTS_FROM_SOCKETS'

export const gameResultsFromSockets = (
  score,
  totalAnswered,
  totalCorrect,
  remainingTime,
) => {
  const payload = {
    score,
    totalAnswered,
    totalCorrect,
    remainingTime,
  }

  return {
    type: GAME_RESULTS_FROM_SOCKETS,
    payload,
  }
}
