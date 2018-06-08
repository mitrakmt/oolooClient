import React, { Component } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './styles'
import Timer from './timer'

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchedQuestion: true,
      questionNumber: '1',
      question:
        'On a peripheral blood smear of a 52 y/o male with fatigue, localized vertebral tenderness, and high serum calcium, you see a cell with an eccentric nucleus and chromatin in a clock-face distribution. What is the immunologic function of the product released by this cell when it binds to its target? On a peripheral blood smear of a 52 y/o male with fatigue, localized vertebral tenderness, and high serum calcium, you see a cell with an eccentric nucleus and chromatin in a clock-face distribution. What is the immunologic function of the product released by this cell when it binds to its target? On a peripheral blood smear of a 52 y/o male with fatigue, localized vertebral tenderness, and high serum calcium, you see a cell with an eccentric nucleus and chromatin in a clock-face distribution. What is the immunologic function of the product released by this cell when it binds to its target?',
      progress: 300,
      answers: ['A: Choice A', 'B: Choice B', 'C: Choice C', 'D: Choice D'],
    }
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  componentDidMount() {}

  onButtonPress() {
    const { socket } = this.props

    socket.emit(
      'say hello',
      'Greetings from RN, I hope this message reaches you!',
      data => {
        console.log('data from socket on server ', data)
      },
    )
  }

  renderAnswerChoices() {
    const { answers } = this.state

    return answers.map(choice => (
      <View key={`${choice}-key`} style={styles.buttonStyles}>
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
              {fetchedQuestion ? `${question}` : ''}
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

function mapStateToProps({ socket }) {
  return {
    socket,
  }
}

GamePlay.propTypes = {
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
    receiveBuffer: PropTypes.array,
    sendBuffer: PropTypes.array,
    subs: PropTypes.array,
    _callbacks: PropTypes.object,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  null,
)(GamePlay)
