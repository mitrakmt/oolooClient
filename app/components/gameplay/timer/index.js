import React, { Component } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

class Timer extends Component {
  constructor(props) {
    super(props)

    // create animation properties in constructor
    this.timerWidthAnimation = new Animated.Value(this.props.progress)
  }

  componentDidUpdate(prevProps) {
    // update width of Animated.View with subtracted progress props
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.timerWidthAnimation, {
        toValue: this.props.progress,
        duration: 300,
      }).start()
    }
  }

  render() {
    // when component renders, interpolate
    // Add styles that need to be animated to Animated.View

    const widthInterpolated = this.timerWidthAnimation.interpolate({
      inputRange: [0, 300000], // hardcoded value is 5 minutes (300000ms)
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    })

    return (
      <View style={styles.timerOuterView}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(255,255,255,.5)' },
          ]}
        >
          <Animated.View
            style={[
              styles.borderView,
              styles.timerAnimationStyles,
              { width: widthInterpolated },
            ]}
          />
        </View>
      </View>
    )
  }
}

Timer.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default Timer
