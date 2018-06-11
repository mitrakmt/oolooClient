import React, { Component } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './styles'
import Timer from './timer'
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
    }
  }

  componentDidMount() {
    const { auth, socketGameResults } = this.props
    const context = this

    const callbacks = { socketGameResults }

    // Create socket and store in local state
    socketMiddleware(auth, context, callbacks)

    setInterval(() => {
      this.setState(state => ({ progress: state.progress - 1000 }))
    }, 1000)
  }

  onButtonPress = answer => {
    const { socket, questionNumber } = this.state

    const payload = {
      answer,
      questionNumber,
    }

    console.log('socket is ', socket)
    console.log('payload is ', payload)

    socket.emit('answer', payload)
  }

  renderAnswerChoices() {
    const { possibleAnswers, questionNumber } = this.state

    return possibleAnswers.map(choice => (
      <View key={`${choice}-${questionNumber}-key`} style={styles.buttonStyles}>
        <Button
          onPress={() => this.onButtonPress(`${choice}`)}
          title={`${choice}`}
          color="white"
          accessibilityLabel={`${choice}`}
        />
      </View>
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
            {fetchedQuestion ? `Question ${questionNumber}/20` : ''}
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
