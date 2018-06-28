import { Actions } from 'react-native-router-flux'

const gameStart = (
  { duration, numberOfQuestions, playerIndex, startTime, usernames },
  callback,
) => {
  const payload = { duration, numberOfQuestions, playerIndex, startTime }

  console.log('gameStart fired!')

  // convert username array to object to avoid PropTypes error
  const usernameObj = {}

  usernames.forEach((name, idx) => {
    if (idx === playerIndex) {
      usernameObj.player = name
    } else {
      usernameObj.opponent = name
    }
  })

  payload.usernames = usernameObj

  callback(payload)

  Actions.gameplay()

  // MUST INCLUDE THIS IN GAMEMPLAY

  /*
  // setInterval to update timer and tickTock progress
  intervalID = setInterval(() => {
    context.setState(state => ({
      playerIndex,
      gameStart: true,
      progress: state.progress - 1000,
      tickTockProgress: state.tickTockProgress === 0 ? 1 : 0,
    }))
  }, 1000)
  */
}

export default gameStart
