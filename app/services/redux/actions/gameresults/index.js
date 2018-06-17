export const GAME_RESULTS = 'GAME_RESULTS'

export const gameResults = (
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
    type: GAME_RESULTS,
    payload,
  }
}
