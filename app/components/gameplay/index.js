import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo'
import PropTypes from 'prop-types'
import styles from './styles'
import Timer from './timer'
import { generateRandomKey, runTimerOnce, animateStopwatch } from './utils'
import { gameResults } from '../../services/redux/actions/gameresults'
import { startTheGame } from '../../services/redux/actions/gameplay'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import socketMiddleware from '../../services/socket-io-client'

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameStart: false,
      progress: 300000,
      tickTockProgress: 1,
      questionNumber: null,
      question: 'A new challenger is being selected. Get ready!',
      possibleAnswers: [],
      chosenAnswer: null,
      buttonAnimation: new Animated.Value(0),
      questionAnimation: new Animated.Value(0),
      timerIconAnimation: new Animated.Value(0),
      buttonColor: '#344856',
    }
  }

  componentWillMount() {
    tracker.trackScreenView('Gameplay')
  }

  componentDidMount = () => {
    const { auth, socketGameResults, gameStart } = this.props
    const context = this

    const callbacks = { socketGameResults, gameStart }

    // Create socket and store in local state
    socketMiddleware(auth, context, callbacks)
  }

  componentDidUpdate = (_, prevState) => {
    // When a new question comes from sockets, reset button animation
    if (prevState.questionNumber !== this.state.questionNumber) {
      this.resetButtonAnimation()
    }
  }

  onButtonPress = (answer, idx) => {
    const { socket, buttonAnimation, questionNumber, playerIndex } = this.state

    // Button backgroundColor animates
    this.setState({ chosenAnswer: idx }, () => {
      Animated.timing(buttonAnimation, {
        toValue: 1,
      }).start()
    })

    // continue sending payload with playerIndex until
    // backend team approves removal
    const payload = {
      answer,
      questionNumber,
      playerIndex,
    }

    // Wait 800ms to allow Animation to finish, then send answer to server
    // Also, reset the question animation here

    setTimeout(() => {
      socket.emit('answer', payload)
      this.setState({
        questionAnimation: new Animated.Value(0),
      })
    }, 500)
  }

  resetButtonAnimation = () => {
    this.setState({
      buttonAnimation: new Animated.Value(0),
      chosenAnswer: null,
    })
  }

  renderAnimatedIcon = () => {
    const { timerIconAnimation } = this.state

    const tickTock = timerIconAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['-48deg', '48deg'],
    })

    const transform = [{ rotate: tickTock }]

    return (
      <View style={{ marginLeft: '7%' }}>
        <Animated.Text style={[{ transform }]}>
          <Icon name="stopwatch" size={25} />
        </Animated.Text>
      </View>
    )
  }

  renderAnimatedQuestion = () => {
    const { questionAnimation, question } = this.state

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

  renderAnswerChoices = () => {
    const {
      possibleAnswers,
      chosenAnswer,
      questionNumber,
      buttonAnimation,
      buttonColor,
    } = this.state

    const interpolateBGColor = buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ffffff', '#01a38d'],
    })

    const interpolateTextColor = buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#293f4e', '#ffffff'],
    })

    const animatedStyle = {
      backgroundColor: interpolateBGColor,
    }

    const textStyle = {
      color: interpolateTextColor,
    }

    return possibleAnswers.map((choice, idx) => (
      <Animated.View
        key={generateRandomKey(choice, questionNumber)}
        style={
          idx === chosenAnswer
            ? [animatedStyle, styles.buttonStyles]
            : styles.buttonStyles
        }
      >
        <TouchableWithoutFeedback
          onPress={() => this.onButtonPress(`${choice}`, idx)}
        >
          <Animated.Text
            style={
              idx === chosenAnswer
                ? [textStyle, { fontSize: 20, fontWeight: '600' }]
                : [{ fontSize: 20, fontWeight: '600', color: buttonColor }]
            }
          >
            {choice}
          </Animated.Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    ))
  }

  render() {
    const {
      gameStart,
      questionNumber,
      questionAnimation,
      tickTockProgress,
      timerIconAnimation,
    } = this.state

    // Run the animation one time before connecting to the socket server
    if (gameStart === false) {
      runTimerOnce(questionAnimation)
    } else {
      // As soon as game starts, Animate stopWatch on each rerender
      animateStopwatch(timerIconAnimation, tickTockProgress)
    }

    return (
      <View style={styles.containerStyles}>
        <View style={styles.textContainerStyles}>
          <Text
            style={{
              fontSize: 15,
              color: '#01a38d',
              marginBottom: '3%',
            }}
          >
            {' '}
            OOLOO
          </Text>
          <Text style={{ fontSize: 20 }}>
            {!gameStart ? '' : `Question ${questionNumber + 1}/10`}
          </Text>
        </View>

        <View style={styles.QAnswContainer}>
          <ScrollView>{this.renderAnimatedQuestion()}</ScrollView>

          <View style={styles.answersContainerStyle}>
            {this.renderAnswerChoices()}
          </View>

          <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
            {this.renderAnimatedIcon()}
            <Timer progress={this.state.progress} />
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  }
}

GamePlay.propTypes = {
  auth: PropTypes.string.isRequired,
  socketGameResults: PropTypes.func.isRequired,
  gameStart: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {
    socketGameResults: gameResults,
    gameStart: startTheGame,
  },
)(GamePlay)
