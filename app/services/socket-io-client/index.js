import { Actions } from 'react-native-router-flux'
import io from 'socket.io-client'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`

// have access to 'question answered' sockets event

const socketMiddleware = (auth, context, callbacks) => {
  let intervalID

  // Connect to socket
  const socket = io(`${DEV_API_URL}/?token=${auth}`)

  socket.on('gameStart', response => {
    callbacks.gameStart(response)

    intervalID = setInterval(() => {
      context.setState(state => ({
        gameStart: true,
        progress: state.progress - 1000,
      }))
    }, 1000)
  })

  socket.on('answerResults', response => {
    // 'correct', 'questionNumber', 'score', 'totalAnswered', 'totalCorrect' available from server
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

    context.setState({
      question,
      questionNumber,
      possibleAnswers,
    })
  })

  // Store Socket in state
  context.setState({ socket })
}

export default socketMiddleware
