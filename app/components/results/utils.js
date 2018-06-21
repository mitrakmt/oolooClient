const checkForValidValue = (value, resultKey) => {
  let result
  if (resultKey === 'totalCorrect') {
    result = value === undefined || value.length === 0 ? 0 : value
  }

  if (resultKey === 'score') {
    result = value === undefined || value.length === 0 ? 0 : value
  }

  return result
}

const filterForPlayer = (filteringIndex, gameResults, key) =>
  filteringIndex === null
    ? gameResults[key][0]
    : gameResults[key][filteringIndex]

const filterForOpponent = (filteringIndex, gameResults, key) =>
  gameResults[key].filter((_, idx) => idx !== filteringIndex)

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

// If you're only getting the player's result, don't need a filterIdx
// If you're getting a player and opponent's results, you need the filterIdx
export const prepResultsState = (
  gameResults,
  filteringIndex = null,
  resultsFor,
  numberOfQuestions,
  waiting = false,
) => {
  const resultsArray = []

  if (waiting === true) {
    return [
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
    ]
  }

  Object.keys(gameResults).forEach(key => {
    if (key === 'totalCorrect') {
      const totalCorrect =
        resultsFor === 'Player'
          ? checkForValidValue(
              filterForPlayer(filteringIndex, gameResults, key),
              'totalCorrect',
            )
          : checkForValidValue(
              filterForOpponent(filteringIndex, gameResults, key),
              'totalCorrect',
            )

      resultsArray[0] = {
        value: calculateOverall(totalCorrect, numberOfQuestions),
        resultKey: 'Overall',
      }
    }

    if (key === 'finishedTime') {
      const timeValue =
        resultsFor === 'Player'
          ? filterForPlayer(filteringIndex, gameResults, key)
          : filterForOpponent(filteringIndex, gameResults, key)

      resultsArray[1] = { value: timeValue, resultKey: 'Time' }
    }

    if (key === 'score') {
      const scoreValue =
        resultsFor === 'Player'
          ? checkForValidValue(
              filterForPlayer(filteringIndex, gameResults, key),
              'score',
            )
          : checkForValidValue(
              filterForOpponent(filteringIndex, gameResults, key),
              'score',
            )

      resultsArray[2] = { value: scoreValue, resultKey: 'Total Score' }
    }

    if (key === 'ranks') {
      const rankValue =
        resultsFor === 'Player'
          ? filterForPlayer(filteringIndex, gameResults, key)
          : filterForOpponent(filteringIndex, gameResults, key)

      resultsArray[3] = { value: rankValue, resultKey: 'Rank' }
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

    case 'Rank':
      return `${value}`

    case 'Waiting':
      return `Awaiting...`

    default:
      return 'No result'
  }
}

export const formatQuizAnswer = (resultObj, idx) => {
  if (resultObj === undefined) {
    return `Question ${idx + 1}: Incorrect - No Response Submitted`
  }

  const correctResponse = `Question ${idx + 1}: Correct - ${resultObj.answer}`

  const incorrectResponse = `Question ${idx + 1}: Incorrect - ${
    resultObj.answer
  }`

  return resultObj.correct === true ? correctResponse : incorrectResponse
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
