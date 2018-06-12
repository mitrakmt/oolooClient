import React, { Component } from 'react'
import { Text, View, ScrollView, Button, Animated } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo'
import PropTypes from 'prop-types'
import styles from './styles'
import Timer from './timer'
import generateRandomKey from './utils'
import { gameResultsFromSockets } from '../../services/redux/actions/socket'
import socketMiddleware from '../../services/socket-io-client'

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchedQuestion: true,
      progress: 300000,
      questionNumber: null,
      question: '',
      possibleAnswers: [],
      chosenAnswer: null,
      buttonAnimation: new Animated.Value(0),
      buttonColor: '#344856',
    }
  }

  componentDidMount() {
    const { auth, socketGameResults } = this.props
    const context = this

    const callbacks = { socketGameResults }

    // Create socket and store in local state
    socketMiddleware(auth, context, callbacks)
  }

  componentDidUpdate(_, prevState) {
    // When a new question comes from sockets, reset button animation
    if (prevState.questionNumber !== this.state.questionNumber) {
      this.resetButtonAnimation()
    }
  }

  onButtonPress = (answer, idx) => {
    const { socket, buttonAnimation, questionNumber } = this.state

    // Button backgroundColor animates
    this.setState({ chosenAnswer: idx }, () => {
      Animated.timing(buttonAnimation, {
        toValue: 1,
      }).start()
    })

    const payload = {
      answer,
      questionNumber,
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

  renderAnswerChoices() {
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
            ? [styles.buttonStyles, animatedStyle]
            : styles.buttonStyles
        }
      >
        <Button
          onPress={() => this.onButtonPress(`${choice}`, idx)}
          title={`${choice}`}
          color={idx === chosenAnswer ? '#ffffff' : buttonColor}
          accessibilityLabel={`${choice}`}
        />
      </Animated.View>
    ))
  }

  render() {
    const { fetchedQuestion, questionNumber, question } = this.state

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
            {fetchedQuestion ? `Question ${questionNumber + 1}/10` : ''}
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
}

export default connect(
  mapStateToProps,
  { socketGameResults: gameResultsFromSockets },
)(GamePlay)
