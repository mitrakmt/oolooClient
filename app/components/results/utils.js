const calculateOverall = (totalCorrect, totalPossible) =>
  (totalCorrect / totalPossible) * 100

const convertMillisecToTime = millis => {
  const minutes = Math.floor(millis / 60000)

  const seconds = ((millis % 60000) / 1000).toFixed(0)

  if (minutes === 0) {
    return `${seconds}s`
  }
  return `${minutes}m ${seconds < 10 ? `0${seconds}s` : `${seconds}s`}`
}

export const prepResultsState = (
  gameResults,
  playerIndex = null,
  numberOfQuestions,
) => {
  const resultsArray = []

  Object.keys(gameResults).forEach(key => {
    if (key === 'totalCorrect') {
      const totalCorrect =
        playerIndex === null
          ? gameResults[key][0]
          : gameResults[key][playerIndex]

      resultsArray[0] = {
        value: calculateOverall(totalCorrect, numberOfQuestions),
        resultKey: 'Overall',
      }
    }

    if (key === 'remainingTime') {
      resultsArray[1] = { value: gameResults[key], resultKey: 'Time' }
    }

    if (key === 'score') {
      const scoreValue =
        playerIndex === null
          ? gameResults[key][0]
          : gameResults[key][playerIndex]

      resultsArray[2] = { value: scoreValue, resultKey: 'Total Score' }
    }
  })

  return resultsArray
}

export const handleFormatting = ({ value, resultKey }) => {
  switch (resultKey) {
    case 'Overall':
      return `${value}%`

    case 'Time':
      return convertMillisecToTime(value)

    case 'Total Score':
      return `${value}`

    case 'Waiting':
      return `Awaiting...`

    default:
      return 'No result'
  }
}

export const generateRandomKey = (value, baseString) => {
  const charArray = 'abcdedfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
    '',
  )

  const len = charArray.length

  let randomKey = ''

  let count = 1

  while (count <= 6) {
    const randomIDX = Math.floor(Math.random() * len)
    randomKey += charArray[randomIDX]
    count += 1
  }

  return `${value}-${baseString}-${randomKey}`
}
