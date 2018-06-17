import { Actions } from 'react-native-router-flux'
import io from 'socket.io-client'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`

// have access to 'question answered' sockets event

const socketMiddleware = (auth, context, callbacks) => {
  // Connect to socket
  const socket = io(`${DEV_API_URL}/?token=${auth}`)

  // setInterval for Timer component
  const intervalID = setInterval(() => {
    context.setState(state => ({ progress: state.progress - 1000 }))
  }, 1000)

  socket.on('gameStart', ({ playerIndex }) => {
    // playerIndex, duration, numberOfQuestions, startTime available from server
    callbacks.gameStart(playerIndex)
  })

  socket.on('answerResults', response => {
    // 'correct', 'questionNumber', 'score', 'totalAnswered', 'totalCorrect' available from server
    // store 'remainingTime' in local state

    console.log('response from answerResults ', response)

    context.setState({
      progress: response.remainingTime,
    })
  })

  socket.on(
    'gameResults',
    ({ remainingTime, score, totalAnswered, totalCorrect, gameID }) => {
      // 'answers' available from server

      callbacks.socketGameResults(
        score,
        totalAnswered,
        totalCorrect,
        remainingTime,
        gameID,
      )

      // clear setInterval
      clearInterval(intervalID)

      // Will we have a race condition after firing action creator?
      // Navigate to Results
      Actions.results()
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

  // Store Socket and intervalID in state
  context.setState({ socket })
}

export default socketMiddleware
