import React, { Component } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import styles from './styles'

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchedQuestion: true,
      questionNumber: '1',
      question:
        'On a peripheral blood smear of a 52 y/o male with fatigue, localized vertebral tenderness, and high serum calcium, you see a cell with an eccentric nucleus and chromatin in a clock-face distribution. What is the immunologic function of the product released by this cell when it binds to its target?',
    }
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  render() {
    const { fetchedQuestion, questionNumber, question } = this.state
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
            <View style={styles.buttonStyles}>
              <Button
                onPress={() => console.log('A: Choice A')}
                title="A: Choice A"
                color="white"
                accessibilityLabel="Log in button for OOLOO Quiz App"
              />
            </View>

            <View style={styles.buttonStyles}>
              <Button
                onPress={() => console.log('B: Choice B')}
                title="B: Choice B"
                color="white"
                accessibilityLabel="Log in button for OOLOO Quiz App"
              />
            </View>

            <View style={styles.buttonStyles}>
              <Button
                onPress={() => console.log('C: Choice C')}
                title="C: Choice C"
                color="white"
                accessibilityLabel="Log in button for OOLOO Quiz App"
              />
            </View>

            <View style={{ ...styles.buttonStyles, marginBottom: '3%' }}>
              <Button
                onPress={() => console.log('D: Choice D')}
                title="D: Choice D"
                color="white"
                accessibilityLabel="Log in button for OOLOO Quiz App"
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default GamePlay
