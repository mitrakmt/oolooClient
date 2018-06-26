import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Image, Button, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { VictoryBar, VictoryChart } from 'victory-native'
import tracker from '../../services/analytics-tracker/analyticsTracker'

import {
  handleFormatting,
  generateRandomKey,
  formatQuizAnswer,
  prepResultsFor,
} from './utils'
import styles from './styles'

const dummyData = [
  { subject: 'Medicine', percentage: 80 },
  { subject: 'Biology', percentage: 56 },
  { subject: 'Radiology', percentage: 20 },
]

class Results extends Component {
  constructor(props) {
    super(props)

    const { numberOfQuestions, playerIndex, usernames } = this.props

    this.state = {
      numberOfQuestions,
      playerIndex,
      usernames,
    }
  }

  componentWillMount() {
    tracker.trackScreenView('Results')
  }

  renderPlayerColumn = (statsArray, baseString = 'Player') =>
    statsArray.map(statObject => {
      const randomKey = generateRandomKey(statObject.value, baseString)

      return (
        <AnimateNumber
          countBy={5}
          key={randomKey}
          style={{ color: '#293f4e', fontSize: 15 }}
          timing="linear"
          value={statObject.value}
          formatter={() => handleFormatting(statObject)}
        />
      )
    })

  renderLabels = labelArray =>
    labelArray.map(label => (
      <Text
        key={`${label}-label`}
        style={{ color: '#293f4e', fontWeight: 'bold', fontSize: 20 }}
      >
        {label}
      </Text>
    ))

  renderQuizResults = answerResults => {
    const { playerIndex } = this.state

    // Iterate through parent answerResults array
    return answerResults.map((result, idx) => {
      const key = generateRandomKey(
        result.answer,
        `Player Question ${idx + 1} Answer`,
      )

      // Get the resultObject for the player
      const resultObj = !result[playerIndex] ? undefined : result[playerIndex]

      return (
        <Text style={{ fontWeight: '700' }} key={key}>
          {formatQuizAnswer(resultObj, idx)}
        </Text>
      )
    })
  }

  render() {
    const { gameResults, playerIndex } = this.props

    const { usernames, numberOfQuestions } = this.state

    const opponentResults = prepResultsFor(
      gameResults,
      playerIndex,
      'Opponent',
      numberOfQuestions,
      false,
    )

    const playerResults = prepResultsFor(
      gameResults,
      playerIndex,
      'Player',
      numberOfQuestions,
      false,
    )

    return (
      <View style={styles.containerStyles}>
        <View style={styles.textContainerStyles}>
          <Text style={{ fontSize: 15, color: '#01a38d', marginBottom: '3%' }}>
            {' '}
            OOLOO
          </Text>
          <Text style={{ fontSize: 20 }}>Results</Text>
        </View>

        <View style={styles.ResultsContainer}>
          <ScrollView>
            <View style={styles.versusContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.playerAvatar}
                  source={{ url: 'https://placeimg.com/300/300/any' }}
                />
                <Text style={{ color: '#293f4e', textAlign: 'center' }}>
                  {usernames.player}
                </Text>
              </View>

              <View>
                <Text
                  style={{ color: '#293f4e', fontSize: 30, fontWeight: 'bold' }}
                >
                  vs.
                </Text>
              </View>

              <View style={styles.avatarContainer}>
                <Image
                  style={styles.playerAvatar}
                  source={{ url: 'https://placeimg.com/300/300/any' }}
                />

                <Text style={{ color: '#293f4e', textAlign: 'center' }}>
                  {usernames.opponent}
                </Text>
              </View>
            </View>
            {/* end versusContainer  */}

            <View style={styles.statContainer}>
              <View style={styles.statColContainer}>
                {this.renderPlayerColumn(playerResults, 'Player')}
              </View>

              <View style={styles.statColContainer}>
                {this.renderLabels(['Overall', 'Time', 'Total Score', 'Rank'])}
              </View>

              <View style={styles.statColContainer}>
                {this.renderPlayerColumn(opponentResults, 'Opponent')}
              </View>
            </View>
            {/* end statContainer  */}
          </ScrollView>

          <ScrollView
            contentContainerStyles={{ width: 'auto' }}
            style={{
              height: '40%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <VictoryChart
              // domainPadding will add space to each side of VictoryBar to
              // prevent it from overlapping the axis
              domainPadding={20}
            >
              <VictoryBar
                data={dummyData}
                x="subject"
                y="percentage"
                style={{ data: { fill: '#01a38d' } }}
              />
            </VictoryChart>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonStyles}>
              <Button
                onPress={() => Actions.gameplay()}
                title="Play Again!"
                color="white"
                accessibilityLabel="Play again button for OOLOO Quiz App"
              />
            </View>
            <View style={styles.buttonStyles}>
              <Button
                onPress={() => Actions.leaderboard()}
                title="Leaderboard"
                color="white"
                accessibilityLabel="Leaderboard"
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({
  gameResults,
  gameStart: { numberOfQuestions, playerIndex, usernames },
}) {
  return {
    gameResults,
    numberOfQuestions,
    usernames,
    playerIndex,
  }
}

Results.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  playerIndex: PropTypes.number.isRequired,
  usernames: PropTypes.shape({
    player: PropTypes.string,
    opponent: PropTypes.string,
  }).isRequired,

  gameResults: PropTypes.shape({
    remainingTime: PropTypes.number,
    score: PropTypes.array,
    totalAnswered: PropTypes.array,
    totalCorrect: PropTypes.array,
    gameID: PropTypes.number,
    answers: PropTypes.array,
    finishedTime: PropTypes.array,
    ranks: PropTypes.array,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  null,
)(Results)
