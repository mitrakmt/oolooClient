import React, { Component } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

class Timer extends Component {
  constructor(props) {
    super(props)

    // create animation property in constructor
    this.animation = new Animated.Value(this.props.progress)
  }

  componentDidUpdate(prevProps) {
    console.log('this.props inside CDU ', this.props.progress)
    // update width of Animated.View with subtracted progress props
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: 300,
      }).start()
    }
  }

  render() {
    // when component renders, interpolate
    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 300000], // hardcoded value is 5 minutes (300000ms)
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
