import { Actions } from 'react-native-router-flux'
import { Animated } from 'react-native'
import io from 'socket.io-client'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`
// const TEMP_AUTH =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUyOTI5ODAzNX0.me_DL5FV7q8ueyp_7vpUZ19x5G7TQtYn2ZLrlFnZHhc'

// have access to 'question answered' sockets event

const socketMiddleware = (auth, context, callbacks) => {
  let intervalID

  // Connect to socket
  // Continue using TEMP_AUTH until backend teams finds permanent fix
  const socket = io(`${DEV_API_URL}/?token=${auth}`)

  socket.on(
    'gameStart',
    ({ duration, numberOfQuestions, playerIndex, startTime, usernames }) => {
      const payload = { duration, numberOfQuestions, playerIndex, startTime }

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

      callbacks.gameStart(payload)

      // setInterval to update timer and tickTock progress
      intervalID = setInterval(() => {
        context.setState(state => ({
          playerIndex,
          gameStart: true,
          progress: state.progress - 1000,
          tickTockProgress: state.tickTockProgress === 0 ? 1 : 0,
        }))
      }, 1000)
    },
  )

  socket.on('answerResults', response => {
    // 'score', 'totalAnswered', 'totalCorrect' available from server

    // store 'remainingTime' in local state
    context.setState({
      progress: response.remainingTime,
    })
  })

  socket.on(
    'gameResults',
    ({
      remainingTime,
      score,
      totalAnswered,
      totalCorrect,
      gameID,
      answers,
      finishedTime,
      ranks,
    }) => {
      context.setState(
        {
          progress: 300000,
        },
        () => {
          callbacks.socketGameResults(
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
    },
  )

  socket.on('question', ({ question, questionNumber, possibleAnswers }) => {
    // on gameInit, questionNumber starts at 0
    // incrementing questionNumber in state will cause server crash

    const [
      questionArray,
      animatedValues,
      animatedSequence,
    ] = callbacks.createTextAnimationObjects(question)

    context.setState({
      questionNumber,
      possibleAnswers,
      questionArray,
      animatedValues,
      animatedSequence,
    })
  })

  // Store Socket in state
  context.setState({ socket, questionAnimation: new Animated.Value(0) })
}

export default socketMiddleware
