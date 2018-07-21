import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import InterestsAverageChart from './charts/InterestsAverageChart'
import InterestsLineChart from './charts/InterestsLineChart'
import ProfileImage from '../../shared-components/profile-image/profileImage'
import tracker from '../../services/analytics-tracker/analyticsTracker'

import {
  handleFormatting,
  generateRandomKey,
  formatQuizAnswer,
  prepResultsFor,
  prepAvgByInterestChartData,
} from './utils'
import styles from './styles'

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

  findOpponentImageId = playerImageIds => {
    let foundOppId = null
    for (let i = 0; i < playerImageIds.length; i += 1) {
      if (playerImageIds[i] !== this.props.id) {
        foundOppId = playerImageIds[i]
      }
    }
    return foundOppId
  }

  checkBarChartData = () => {
    const { gameResults } = this.props

    let { averagesByInterest } = gameResults

    const { interestsOverTime } = gameResults

    averagesByInterest = prepAvgByInterestChartData(averagesByInterest)

    // If we don't get both of the data charts from server, render the
    // quiz result answers as backup
    if (
      averagesByInterest.length === 0 ||
      Object.keys(interestsOverTime.data).length === 0
    ) {
      return (
        <ScrollView
          style={{
            padding: '5%',
            marginBottom: '5%',
            height: '25%',
          }}
        >
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {this.renderQuizResults(gameResults.answers)}
          </View>
        </ScrollView>
      )
    }

    return (
      <ScrollView>
        <View style={{ height: 'auto' }}>
          {this.renderBarCharts(averagesByInterest)}
          {this.renderLineCharts(interestsOverTime)}
        </View>
      </ScrollView>
    )
  }

  renderBarCharts = incomingData => {
    if (incomingData.length === 0) {
      return null
    }

    const results = incomingData.pop()

    return (
      <View>
        <InterestsAverageChart results={results} />
      </View>
    )
  }

  renderLineCharts = incomingData => {
    const dataKeys = Object.keys(incomingData.data)

    if (dataKeys.length === 0) {
      return null
    }

    return (
      <View>
        <InterestsLineChart results={incomingData} />
      </View>
    )
  }

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

  renderLabels = labelArray =>
    labelArray.map(label => (
      <Text
        key={`${label}-label`}
        style={{ color: '#293f4e', fontWeight: 'bold', fontSize: 20 }}
      >
        {label}
      </Text>
    ))

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

  render() {
    const {
      playerIndex,
      gameResults,
      displayMatchFound: { playerImageIds },
    } = this.props

    const { usernames, numberOfQuestions } = this.state
    const opponentImageId = this.findOpponentImageId(playerImageIds)

    const opponentResults = prepResultsFor(
      gameResults,
      playerIndex,
      'Opponent',
      numberOfQuestions,
    )

    const playerResults = prepResultsFor(
      gameResults,
      playerIndex,
      'Player',
      numberOfQuestions,
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
          <View style={styles.versusContainer}>
            <View style={styles.avatarContainer}>
              <ProfileImage style={styles.playerAvatar} id={this.props.id} />
              <Text
                style={{
                  marginTop: '5%',
                  color: '#293f4e',
                  textAlign: 'center',
                }}
              >
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
              <ProfileImage style={styles.playerAvatar} id={opponentImageId} />

              <Text
                style={{
                  marginTop: '5%',
                  color: '#293f4e',
                  textAlign: 'center',
                }}
              >
                {usernames.opponent}
              </Text>
            </View>
          </View>

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

          {this.checkBarChartData()}

          <View style={styles.buttonContainer}>
            <View style={styles.buttonStyles}>
              <Button
                onPress={() => Actions.matchSearch()}
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
  user,
  displayMatchFound,
}) {
  return {
    gameResults,
    numberOfQuestions,
    usernames,
    playerIndex,
    id: user.id,
    displayMatchFound,
  }
}

Results.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  playerIndex: PropTypes.number.isRequired,
  usernames: PropTypes.shape({
    player: PropTypes.string,
    opponent: PropTypes.string,
  }).isRequired,
  id: PropTypes.number.isRequired,
  gameResults: PropTypes.shape({
    remainingTime: PropTypes.number,
    score: PropTypes.array,
    totalAnswered: PropTypes.array,
    totalCorrect: PropTypes.array,
    gameID: PropTypes.number,
    answers: PropTypes.array,
    finishedTime: PropTypes.array,
    ranks: PropTypes.array,
    averagesByInterest: PropTypes.array,
    interestsOverTime: PropTypes.shape({
      data: PropTypes.object,
      time: PropTypes.string,
    }),
  }).isRequired,
  displayMatchFound: PropTypes.shape({
    playerImageIds: PropTypes.array,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  null,
)(Results)
