import React, { Component } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import styles from './styles'
import Timer from './timer'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchedQuestion: true,

      progress: 300,

      questionNumber: null,
      question: '',
      possibleAnswers: [],
    }
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  componentDidMount() {
    const { auth } = this.props

    // Connect to socket
    const socket = io(`${DEV_API_URL}/?token=${auth}`)

    socket.emit('gameStart', gameData => {
      console.log('gameStarted: ', gameData)
    })

    socket.on('answerResults', answerResult => {
      console.log('answerResult: ', answerResult)
    })
    socket.on('gameResults', results => {
      console.log('results: ', results)
    })
    socket.on('question', ({ question, questionNumber, possibleAnswers }) => {
      console.log('question: ', question)
      console.log('possibleAnswers ', possibleAnswers)
      console.log('questionNumber ', questionNumber)

      this.setState({
        question,
        questionNumber,
        possibleAnswers,
      })
    })
  }

  onButtonPress() {
    console.log('this.state is ', this.state)
  }

  renderAnswerChoices() {
    const { possibleAnswers, questionNumber } = this.state

    return possibleAnswers.map(choice => (
      <View key={`${choice}-${questionNumber}-key`} style={styles.buttonStyles}>
        <Button
          onPress={this.onButtonPress}
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
          <Text style={{ fontSize: 15, color: '#01a38d', marginBottom: '3%' }}>
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
}

export default connect(
  mapStateToProps,
  null,
)(GamePlay)
