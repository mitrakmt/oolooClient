const devEnvironment = true

const dummyData = [
  { value: [5], resultKey: 'score' },
  { value: [10], resultKey: 'totalAnswered' },
  { value: [4], resultKey: 'totalCorrect' },
  { value: 39900, resultKey: 'remainingTime' },
  { value: 28, resultKey: 'gameID' },
]

const convertMillisecToTime = millis => {
  const minutes = Math.floor(millis / 60000)

  const seconds = ((millis % 60000) / 1000).toFixed(0)

  if (minutes === 0) {
    return `${seconds}s`
  }
  return `${minutes}m ${seconds < 10 ? `0${seconds}s` : `${seconds}s`}`
}

export const prepResultsState = ({ gameResults }) => {
  const resultsArray = []

  if (devEnvironment === true) {
    dummyData.forEach(obj => {
      resultsArray.push({ value: obj.value, resultKey: obj.resultKey })
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
