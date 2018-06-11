import { Actions } from 'react-native-router-flux'
import io from 'socket.io-client'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`

const socketMiddleware = (auth, context, callbacks) => {
  // Connect to socket
  const socket = io(`${DEV_API_URL}/?token=${auth}`)

  socket.emit('gameStart', gameData => {
    console.log('gameStarted: ', gameData)
  })

  socket.on('answerResults', ({ remainingTime }) => {
    // 'correct', 'questionNumber', 'score', 'totalAnswered', 'totalCorrect' available from server
    // store 'remainingTime' in local state

    context.setState({
      progress: remainingTime,
    })
  })
  socket.on('gameResults', results => {
    // 'answers', 'gameID' available from server
    const { remainingTime, score, totalAnswered, totalCorrect } = results

    console.log('gameResults ', results)
    callbacks.socketGameResults(
      score,
      totalAnswered,
      totalCorrect,
      remainingTime,
    )

    // Will we have a race condition after firing action creator?

    // Navigate to Results
    Actions.results()
  })
  socket.on('question', response => {
    const { question, questionNumber, possibleAnswers } = response

    console.log('question from sockets ', response)
    // on gameInit, questionNumber starts at 0
    context.setState({
      question,
      questionNumber,
      possibleAnswers,
    })
  })

  context.setState({ socket })
}

export default socketMiddleware
