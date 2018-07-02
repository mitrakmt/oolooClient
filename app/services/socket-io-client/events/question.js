import { Animated } from 'react-native'

const questionEvent = (
  { question, questionNumber, possibleAnswers },
  callback,
  context,
) => {
  // on gameInit, questionNumber starts at 0
  // incrementing questionNumber in state will cause server crash

  const [questionArray, animatedValues, animatedSequence] = callback(question)

  context.setState({
    questionNumber,
    possibleAnswers,
    questionArray,
    animatedValues,
    animatedSequence,
    questionAnimation: new Animated.Value(0),
  })
}

export default questionEvent
