import io from 'socket.io-client'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`
const socketMiddleware = (auth, context) => {
  // Connect to socket
  const socket = io(`${DEV_API_URL}/?token=${auth}`)

  socket.emit('gameStart', gameData => {
    console.log('gameStarted: ', gameData)
  })

  socket.on('answerResults', answerResult => {
    console.log('answerResult: ', answerResult)
  })
  socket.on('gameResults', results => {
    console.log('results: ', results)
  })
  socket.on('question', ({ question, questionNumber, possibleAnswers }) => {
    console.log('question: ', question)
    console.log('possibleAnswers ', possibleAnswers)
    console.log('questionNumber ', questionNumber)

    context.setState({
      question,
      questionNumber,
      possibleAnswers,
    })
  })

  context.setState({ socket })
}

export default socketMiddleware
