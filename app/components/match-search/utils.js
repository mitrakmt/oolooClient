import { Animated } from 'react-native'

const createTextAnimationObjects = question => {
  const animatedValues = []
  const animatedSequence = []

  // 1) Split the string into an array
  const questionArray = question.split(' ').map(word => {
    // 2) Define a new Animated.value(0) for each word
    const opacityValue = new Animated.Value(0)

    animatedValues.push(opacityValue)

    // 3) After creating the animated value, create the Animated.timing
    const wordToAnimate = Animated.timing(opacityValue, {
      toValue: 1,
      duration: 100,
    })

    animatedSequence.push(wordToAnimate)

    return word
  })

  return [questionArray, animatedValues, animatedSequence]
}

export default createTextAnimationObjects
