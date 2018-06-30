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
  averagesByInterest,
  interestsOverTime,
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
    averagesByInterest,
    interestsOverTime,
  }

  return {
    type: GAME_RESULTS,
    payload,
  }
}
