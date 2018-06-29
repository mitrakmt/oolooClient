import { Actions } from 'react-native-router-flux'

const gameResults = (
  {
    remainingTime,
    score,
    totalAnswered,
    totalCorrect,
    gameID,
    answers,
    finishedTime,
    ranks,
  },
  callback,
  intervalID,
) => {
  // socketGameResults
  callback(
    remainingTime,
    score,
    totalAnswered,
    totalCorrect,
    gameID,
    answers,
    finishedTime,
    ranks,
  )

  // clear setInterval
  clearInterval(intervalID)

  // Navigate to Results
  Actions.results()
}

export default gameResults
