import { Actions } from 'react-native-router-flux'

const gameStart = (
  { duration, numberOfQuestions, playerIndex, startTime, usernames },
  callback,
) => {
  const payload = { duration, numberOfQuestions, playerIndex, startTime }

  payload.gameStarted = true

  // Convert username array to object to avoid PropTypes error
  const usernameObj = {}

  usernames.forEach((name, idx) => {
    if (idx === playerIndex) {
      usernameObj.player = name
    } else {
      usernameObj.opponent = name
    }
  })

  if (usernameObj.opponent === 'Average Scores: ') {
    usernameObj.opponent = 'Average Scores'
  }

  payload.usernames = usernameObj

  // Send payload to Redux store
  callback(payload)

  // Redirect user to GamePlay
  Actions.gameplay()
}

export default gameStart
