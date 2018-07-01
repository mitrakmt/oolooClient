/*
 * Helper Functions
 */

const checkForValidValue = (value, resultKey) => {
  let result

  if (resultKey === 'totalCorrect' || resultKey === 'score') {
    if (Array.isArray(value) && (value.includes(null) || value.length === 0)) {
      result = 0
    } else if (value === null) {
      result = 0
    } else {
      result = value
    }
  }

  if (resultKey === 'ranks') {
    if (Array.isArray(value) && value.length === 0) {
      result = 0
    } else {
      ;[result] = value
    }
  }

  return result
}

const filterForPlayer = (filteringIndex, gameResults, key) => {
  const result = gameResults[key].filter((_, idx) => idx === filteringIndex)
  return result
}

// Will return an array with a value, or null
const filterForOpponent = (filteringIndex, gameResults, key) => {
  const result = gameResults[key].filter((_, idx) => idx !== filteringIndex)
  return result
}

const calculateOverall = (totalCorrect, totalPossible) => {
  const result = Math.round((totalCorrect / totalPossible) * 100)

  return !(result >= 0) ? 0 : result
}

const convertMillisecToTime = millis => {
  const minutes = Math.floor(millis / 60000)

  const seconds = ((millis % 60000) / 1000).toFixed(0)

  if (minutes === 0) {
    return `${seconds}s`
  }
  return `${minutes}m ${seconds < 10 ? `0${seconds}s` : `${seconds}s`}`
}

/*
 * Results Data Rendering Functions
 */

// If you're only getting the player's result, don't need a filterIdx
// If you're getting a player and opponent's results, you need the filterIdx
export const prepResultsFor = (
  gameResults,
  filteringIndex = null,
  resultsFor,
  numberOfQuestions,
  waiting = false,
) => {
  const resultsArray = []

  // If we don't want to show a player what an opponent's Overall %
  // is while they wait for quiz to end, we can send the 'Await' payload
  // for the Opponent Results column
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
          ? checkForValidValue(
              filterForPlayer(filteringIndex, gameResults, key),
              'ranks',
            )
          : checkForValidValue(
              filterForOpponent(filteringIndex, gameResults, key),
              'ranks',
            )

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

/*
 * Chart Rendering Functions
 */

const extractAverageByInterest = dataArray => {
  const results = {
    data: [],
    keys: [],
  }

  let averageByInterestValuesData = []

  let averageByInterestKeys = []

  for (let i = 0; i < dataArray.length; i += 1) {
    const currentDataObj = dataArray[i]

    const currentKey = Object.keys(currentDataObj).pop()

    let currentValue = currentDataObj[currentKey]

    currentValue = !(currentValue >= 0) ? 0 : currentValue

    averageByInterestValuesData.push(currentValue)

    averageByInterestKeys.push(currentKey)

    // If the currentDataObj is the 3rd in a series or if we'v reached the last one
    if ((i + 1) % 3 === 0 || i + 1 === dataArray.length) {
      results.data.push(averageByInterestValuesData)
      results.keys.push(averageByInterestKeys)

      averageByInterestValuesData = []
      averageByInterestKeys = []
    }
  }

  return [results]
}

export const prepAvgByInterestChartData = (data = []) => {
  if (data.length === 0) {
    return []
  }

  return extractAverageByInterest(data)
}
