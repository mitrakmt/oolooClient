import { Animated } from 'react-native'

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
