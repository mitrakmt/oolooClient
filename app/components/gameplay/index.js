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
import generateRandomKey from './utils'
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
      questionNumber: null,
      question: 'A new challenger is being selected. Get ready!',
      possibleAnswers: [],
      chosenAnswer: null,
      buttonAnimation: new Animated.Value(0),
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
        toValue: 0.3,
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
    setTimeout(() => socket.emit('answer', payload), 800)
  }

  resetButtonAnimation = () => {
    this.setState({
      buttonAnimation: new Animated.Value(0),
      chosenAnswer: null,
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

    const animatedStyle = {
      backgroundColor: interpolateBGColor,
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
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: '600' }}
              color={idx === chosenAnswer ? '#ffffff' : buttonColor}
            >
              {choice}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    ))
  }

  render() {
    const { gameStart, questionNumber, question } = this.state

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
          <ScrollView>
            <Text style={styles.questionContainer}>
              {question ? `${question}` : ''}
            </Text>
          </ScrollView>

          <View style={styles.answersContainerStyle}>
            {this.renderAnswerChoices()}
          </View>

          <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
            <View style={{ marginLeft: '7%' }}>
              <Icon name="stopwatch" size={25} />
            </View>

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
