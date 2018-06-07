import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionNumber: '1',
    }
  }

  render() {
    const { questionNumber } = this.state
    return (
      <View style={styles.containerStyles}>
        <View>
          <Text>{`Question ${questionNumber}/20`}</Text>
        </View>

        <View style={styles.QAnswContainer}>
          <Text style={styles.questionContainer}>
            On a peripheral blood smear of a 52 y/o male with fatigue, localized
            vertebral tenderness, and high serum calcium, you see a cell with an
            eccentric nucleus and chromatin in a clock-face distribution. What
            is the immunologic function of the product released by this cell
            when it binds to its target?
          </Text>

          <View style={styles.answersContainerStyle} />
        </View>
      </View>
    )
  }
}

export default GamePlay
