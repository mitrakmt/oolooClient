import React, { Component } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import Timer from './timer'

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchedQuestion: true,
      questionNumber: '1',
      question:
        'On a peripheral blood smear of a 52 y/o male with fatigue, localized vertebral tenderness, and high serum calcium, you see a cell with an eccentric nucleus and chromatin in a clock-face distribution. What is the immunologic function of the product released by this cell when it binds to its target?',
      progress: 300,
      answers: ['A: Choice A', 'B: Choice B', 'C: Choice C', 'D: Choice D'],
    }
  }

  componentDidMount() {}

  renderAnswerChoices() {
    const { answers } = this.state

    return answers.map(choice => (
      <View key={`${choice}-key`} style={styles.buttonStyles}>
        <Button
          onPress={() => console.log(`${choice}`)}
          title={`${choice}`}
          color="white"
          accessibilityLabel={`${choice}`}
        />
      </View>
    ))
  }

  render() {
    const { fetchedQuestion, questionNumber, question } = this.state
    console.log('this.state inside GamePlay ', this.state)
    console.log('\n')
    console.log('this.props inside GamePlay ', this.props)
    return (
      <View style={styles.containerStyles}>
        <View>
          <Text>{fetchedQuestion ? `Question ${questionNumber}/20` : ''}</Text>
        </View>

        <View style={styles.QAnswContainer}>
          <ScrollView style={{ height: 20 }}>
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

function mapStateToProps({ auth, socket }) {
  return {
    auth,
    socket,
  }
}
export default connect(
  mapStateToProps,
  null,
)(GamePlay)
