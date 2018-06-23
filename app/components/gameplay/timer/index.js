import React, { Component } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

class Timer extends Component {
  constructor(props) {
    super(props)

    // create animation properties in constructor
    this.timerWidthAnimation = new Animated.Value(this.props.progress)
    this.colorAnimation = new Animated.Value(this.props.progress)
  }

  componentDidUpdate(prevProps) {
    // update width of Animated.View with subtracted progress props
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.timerWidthAnimation, {
        toValue: this.props.progress,
        duration: 200,
      }).start()

      Animated.timing(this.colorAnimation, {
        toValue: this.props.progress,
        duration: 200,
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

    const BGColorInterpolated = this.colorAnimation.interpolate({
      inputRange: [0, 30000, 60000, 120000, 180000, 240000, 300000],
      outputRange: [
        'rgb(236, 94, 75)',
        'rgb(236, 94, 75)',
        'rgb(238, 127, 79)',
        'rgb(229, 180, 91)',
        'rgb(229, 180, 91)',
        'rgb(185,169, 95)',
        'rgb(18, 133, 116)',
      ],
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
              {
                width: widthInterpolated,
                backgroundColor: BGColorInterpolated,
              },
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
