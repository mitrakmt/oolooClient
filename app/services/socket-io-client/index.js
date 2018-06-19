import { Actions } from 'react-native-router-flux'
import { Animated } from 'react-native'
import io from 'socket.io-client'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`
const TEMP_AUTH =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUyOTI5ODAzNX0.me_DL5FV7q8ueyp_7vpUZ19x5G7TQtYn2ZLrlFnZHhc'

// have access to 'question answered' sockets event

const socketMiddleware = (auth, context, callbacks) => {
  let intervalID

  // Connect to socket
  // Continue using TEMP_AUTH until backend teams finds permanent fix
  const socket = io(`${DEV_API_URL}/?token=${TEMP_AUTH}`)

  socket.on('gameStart', response => {
    callbacks.gameStart(response)

    intervalID = setInterval(() => {
      context.setState(state => ({
        playerIndex: response.playerIndex,
        gameStart: true,
        progress: state.progress - 1000,
      }))
    }, 1000)
  })

  socket.on('answerResults', ({ remainingTime, correct, questionNumber }) => {
    // 'score', 'totalAnswered', 'totalCorrect' available from server

    // store 'remainingTime' in local state
    context.setState(
      {
        progress: remainingTime,
      },
      () => {
        // store answerResults for previous question in Redux store
        callbacks.isAnswerCorrect(questionNumber, correct)
      },
    )
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
    }) => {
      context.setState(
        {
          progress: 300000,
        },
        () => {
          callbacks.socketGameResults(
            score,
            totalAnswered,
            totalCorrect,
            remainingTime,
            gameID,
            answers,
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

    // when we get a new question from the server, start animating the question
    const { questionAnimation } = context.state

    context.setState(
      {
        question,
        questionNumber,
        possibleAnswers,
      },
      () => {
        Animated.timing(questionAnimation, {
          toValue: 1,
          duration: 400,
        }).start()
      },
    )
  })

  // Store Socket in state
  context.setState({ socket, questionAnimation: new Animated.Value(0) })
}

export default socketMiddleware
