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
    graphData,
  },
  callback,
  intervalID,
) => {
  const averagesByInterest = graphData.averagesByInterest.data
  const interestsOverTime = graphData.interestsOverTime.data

  callback(
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
  )

  // clear setInterval
  clearInterval(intervalID)

  // Navigate to Results
  Actions.results()
}

export default gameResults
