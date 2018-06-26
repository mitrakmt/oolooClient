import { Animated } from 'react-native'
import React from 'react'
import styles from './styles'

export const generateRandomKey = (choice, indexNumber) => {
  const randomNumber = Math.floor(Math.random() * 10000)
  return `${choice}-${randomNumber.toString()}-${indexNumber}-key`
}

export const animateStopwatch = (timerIconAnimation, tickTockProgress) => {
  Animated.timing(timerIconAnimation, {
    toValue: tickTockProgress,
    duration: 300,
  }).start()
}

export const createTextAnimationObjects = question => {
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

export const renderAnimatedFlyingQuestion = (question, questionAnimation) => {
  const translateX = questionAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 1],
    extrapolate: 'clamp',
  })

  const transform = [{ translateX }]

  return (
    <Animated.Text style={[styles.questionContainer, { transform }]}>
      {question}
    </Animated.Text>
  )
}
