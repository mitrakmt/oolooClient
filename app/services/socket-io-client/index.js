import io from 'socket.io-client'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`

const socketMiddleware = (auth, context, callbacks) => {
  // Connect to socket
  const socket = io(`${DEV_API_URL}/?token=${auth}`)

  socket.emit('gameStart', gameData => {
    console.log('gameStarted: ', gameData)
  })

  socket.on('answerResults', ({ questionNumber, remainingTime }) => {
    // 'correct', 'score', 'totalAnswered', 'totalCorrect' available from server
    // store 'correct', 'questionNumber' in local state
    context.setState({
      questionNumber: questionNumber + 1,
      progress: remainingTime,
    })
  })
  socket.on(
    'gameResults',
    ({ remainingTime, score, totalAnswered, totalCorrect }) => {
      // 'answers', 'gameID' available from server
      callbacks.socketGameResults(
        score,
        totalAnswered,
        totalCorrect,
        remainingTime,
      )
    },
  )
  socket.on('question', ({ question, questionNumber, possibleAnswers }) => {
    // on gameInit, questionNumber starts at 0
    context.setState({
      question,
      questionNumber: questionNumber + 1,
      possibleAnswers,
    })
  })

  context.setState({ socket })
}

export default socketMiddleware
