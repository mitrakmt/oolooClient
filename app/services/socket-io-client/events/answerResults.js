const answerResults = (data, context) => {
  // 'score', 'totalAnswered', 'totalCorrect' available from server

  // store 'remainingTime' in local state
  context.setState({
    progress: data.remainingTime,
  })
}

export default answerResults
