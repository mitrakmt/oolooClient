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
import Timer from './timer'
import { gameResults } from '../../services/redux/actions/gameresults'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import events from '../../services/socket-io-client'
import styles from './styles'
import {
  generateRandomKey,
  animateStopwatch,
  createTextAnimationObjects,
} from './utils'

class GamePlay extends Component {
  constructor(props) {
    super(props)

    // Get these props from Redux store
    const { playerIndex, gameStarted } = this.props

    this.state = {
      gameStarted,
      progress: 300000,
      playerIndex,
      tickTockProgress: 1,
      questionNumber: null,
      animatedValues: [],
      possibleAnswers: [],
      chosenAnswer: null,
      buttonAnimation: new Animated.Value(0),
      timerIconAnimation: new Animated.Value(0),
      buttonColor: '#344856',
    }
  }

  componentWillMount() {
    tracker.trackScreenView('Gameplay')
  }

  componentDidMount = () => {
    // on CDM, set Timer interval, hook up Socket events

    // Get socket from Redux
    const { socket, socketGameResults } = this.props

    const context = this

    const intervalID = setInterval(() => {
      this.setState(state => ({
        gameStart: true,
        progress: state.progress - 1000,
        tickTockProgress: state.tickTockProgress === 0 ? 1 : 0,
      }))
    }, 1000)

    // retrieves question and sets up animated question
    socket.on('question', data =>
      events.questionEvent(data, createTextAnimationObjects, context),
    )

    // updates progress for Timer
    socket.on('answerResults', data => events.answerResults(data, context))

    socket.on('question answered', events.questionAnswered)

    socket.on('gameResults', data =>
      events.gameResults(data, socketGameResults, intervalID),
    )
  }

  componentDidUpdate = (_, prevState) => {
    // When a new question comes from sockets, reset button animation
    if (prevState.questionNumber !== this.state.questionNumber) {
      this.resetButtonAnimation()

      Animated.sequence(this.state.animatedSequence).start()
    }
  }

  onButtonPress = (answer, idx) => {
    const { buttonAnimation, questionNumber, playerIndex } = this.state
    const { socket } = this.props

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

    // Wait to allow Animation to finish, then send answer to server

    setTimeout(() => {
      socket.emit('answer', payload)
    }, 200)
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

  renderFadeInAnimatedQuestion = () => {
    const { animatedValues, questionArray, gameStart } = this.state

    if (!gameStart) {
      return (
        <Text style={styles.initialScroll}>
          {gameStart ? '' : 'Please wait for the quiz to load...'}
        </Text>
      )
    }

    return questionArray.map((word, index) => {
      const opacity = animatedValues[index].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      })

      const key = generateRandomKey(word, index)

      return (
        <Animated.Text
          key={key}
          style={[styles.questionTextContainer, { opacity }]}
        >
          {word}
        </Animated.Text>
      )
    })
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
      gameStarted,
      progress,
      questionNumber,
      tickTockProgress,
      timerIconAnimation,
    } = this.state

    if (gameStarted === true) {
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
            {!gameStarted ? '' : `Question ${questionNumber + 1}/10`}
          </Text>
        </View>

        <View style={styles.QAnswContainer}>
          <ScrollView
            contentContainerStyle={
              !gameStarted ? '' : styles.questionScrollContainer
            }
          >
            {this.renderFadeInAnimatedQuestion()}
          </ScrollView>

          <View style={styles.answersContainerStyle}>
            {this.renderAnswerChoices()}
          </View>

          <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
            {this.renderAnimatedIcon()}
            <Timer progress={progress} />
          </View>
          <View>
            <Text style={{ marginBottom: '3%', marginLeft: '7%' }}>
              {parseFloat(progress / 1000)} seconds left
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ auth, socket, gameStart }) {
  return {
    auth,
    socket,
    playerIndex: gameStart.playerIndex,
    gameStarted: gameStart.gameStarted,
  }
}

GamePlay.propTypes = {
  playerIndex: PropTypes.number.isRequired,
  gameStarted: PropTypes.bool.isRequired,
  socketGameResults: PropTypes.func.isRequired,
  socket: PropTypes.shape({
    acks: PropTypes.object,
    connected: PropTypes.bool,
    disconnected: PropTypes.bool,
    flags: PropTypes.object,
    id: PropTypes.string,
    ids: PropTypes.number,
    io: PropTypes.object,
    json: PropTypes.object,
    nsp: PropTypes.string,
    query: PropTypes.string,
    receiveBuffer: PropTypes.array,
    sendBuffer: PropTypes.array,
    subs: PropTypes.array,
    _callbacks: PropTypes.object,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  {
    socketGameResults: gameResults,
  },
)(GamePlay)
