export const GAME_RESULTS = 'GAME_RESULTS'

export const gameResults = (
  remainingTime,
  score,
  totalAnswered,
  totalCorrect,
  gameID,
  answers,
) => {
  const payload = {
    remainingTime,
    score,
    totalAnswered,
    totalCorrect,
    gameID,
    answers,
  }

  return {
    type: GAME_RESULTS,
    payload,
  }
}
