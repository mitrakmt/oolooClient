export const GAME_RESULTS = 'GAME_RESULTS'

export const gameResults = (
  remainingTime,
  score,
  totalAnswered,
  totalCorrect,
  gameID,
  answers,
  finishedTime,
  ranks,
) => {
  const payload = {
    remainingTime,
    score,
    totalAnswered,
    totalCorrect,
    gameID,
    answers,
    finishedTime,
    ranks,
  }

  return {
    type: GAME_RESULTS,
    payload,
  }
}
