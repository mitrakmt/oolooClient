import { Animated } from 'react-native'
import React from 'react'
import styles from './styles'

export const generateRandomKey = (choice, questionNumber) => {
  const randomNumber = Math.floor(Math.random() * 10000)
  return `${choice}-${randomNumber.toString()}-${questionNumber}-key`
}

export const runTimerOnce = questionAnimation => {
  Animated.timing(questionAnimation, {
    toValue: 1,
    duration: 400,
  }).start()
}

export const animateStopwatch = (timerIconAnimation, tickTockProgress) => {
  Animated.timing(timerIconAnimation, {
    toValue: tickTockProgress,
    duration: 300,
  }).start()
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
