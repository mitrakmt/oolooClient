const devEnvironment = true

const dummyData = {
  remainingTime: 268240,
  score: [8, 6],
  totalAnswered: [10, 7],
  totalCorrect: [],
}

const convertMillisecToTime = millis => {
  const minutes = Math.floor(millis / 60000)

  const seconds = ((millis % 60000) / 1000).toFixed(0)

  if (minutes === 0) {
    return `${seconds}s`
  }
  return `${minutes}m ${seconds < 10 ? `0${seconds}s` : `${seconds}s`}`
}

export const prepResultsState = gameResults => {
  // expect gameResults from props

  const resultsArray = []

  if (devEnvironment === true) {
    // for development, delete when BE is complete

    Object.keys(dummyData).forEach(key => {
      resultsArray.push({ value: dummyData[key], resultKey: key })
    })
  } else {
    Object.keys(gameResults).forEach(key => {
      resultsArray.push({ value: gameResults[key], resultKey: key })
    })
  }

  return resultsArray
}

export const handleFormatting = ({ value, resultKey }) => {
  switch (resultKey) {
    case 'score':
      return value.length === 0 ? '0' : `${value.pop()}`

    case 'totalAnswered':
      return value.length === 0 ? '0' : `${value.pop()}`

    case 'totalCorrect':
      return value.length === 0 ? '0' : `${value.pop()}`

    case 'remainingTime':
      return convertMillisecToTime(value)

    default:
      return 'No result'
  }
}
