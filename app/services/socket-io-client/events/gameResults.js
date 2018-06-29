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

  // Why did we need to set the context back to 300000?

  /*
  context.setState(
    {
      progress: 300000,
    },
    () => {
      //socketGameResults
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
    },
  )
  */
}

export default gameResults
