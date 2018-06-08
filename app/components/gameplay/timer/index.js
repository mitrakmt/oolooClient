import React, { Component } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.animation = new Animated.Value(this.props.progress)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: 300,
      }).start()
    }
  }

  render() {
    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 300],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    })

    return (
      <View style={styles.timerOuterView}>
        <View style={styles.borderView}>
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(255,255,255,.5)' },
            ]}
          >
            <Animated.View
              style={[
                styles.timerAnimationStyles,
                { width: widthInterpolated },
              ]}
            />
          </View>
        </View>
      </View>
    )
  }
}

Timer.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default Timer
