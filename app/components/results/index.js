import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Image, Button, ScrollView } from 'react-native'
import { LineChart, Grid, XAxis } from 'react-native-svg-charts'
/* eslint-disable import/no-extraneous-dependencies */
import * as scale from 'd3-scale' // DO NOT REMOVE eslint-disable comments!
/* eslint-enable import/no-extraneous-dependencies */
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import InterestsAverageChart from './charts/InterestsAverageChart'
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

  renderBarCharts = incomingData => {
    if (incomingData.length === 0) {
      return null
    }

    const results = incomingData.pop()

    console.log('results to send to barChart ', results) // Leave for debugging

    return (
      <View>
        <InterestsAverageChart results={results} />
      </View>
    )
  }

  renderLineCharts = data => {
    const dataObj = data.data
    const dataKeys = Object.keys(dataObj)
    const daysOfWeek = {
      0: 'M',
      1: 'T',
      2: 'W',
      3: 'Th',
      4: 'F',
      5: 'Sat',
      6: 'Sun',
    }

    if (dataKeys.length === 0) {
      return null
    }

    console.log('incoming data for renderLineCharts ', data)

    return dataKeys.map(key => {
      const randomKey = generateRandomKey(key, 'LineChart')

      return (
        <View key={randomKey} style={{ marginBottom: '15%' }}>
          <Text style={{ textAlign: 'center', fontWeight: '800' }}>{key}</Text>
          <LineChart
            style={{ height: 200, width: 'auto' }}
            data={dataObj[key]}
            svg={{ stroke: 'rgb(52,71,86)', width: 10 }}
            contentInset={{ bottom: 30 }}
            gridMin={0} // Secret Sauce: what enables showing all the bars
            bandwidth={5}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginTop: '1.5%' }}
            scale={scale.scaleBand}
            data={dataObj[key]}
            formatLabel={(value, index) =>
              `${Math.round(dataObj[key][index] * 100)}%`
            }
            svg={{ fontSize: 12, fill: 'black' }}
          />
          <XAxis
            style={{ marginTop: '1.5%' }}
            scale={scale.scaleBand}
            data={dataObj[key]}
            formatLabel={(value, index) => `${daysOfWeek[index]}`}
            svg={{ fontSize: 12, fill: 'black' }}
          />
        </View>
      )
    })
  }

  render() {
    const { gameResults, playerIndex } = this.props

    let { averagesByInterest } = gameResults
    const { interestsOverTime } = gameResults

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

    averagesByInterest = prepAvgByInterestChartData(averagesByInterest)

    console.log('averagesByInterest ', averagesByInterest)

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

          {/* <ScrollView
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
          </ScrollView> */}

          <ScrollView>
            <View style={{ height: 'auto' }}>
              {this.renderBarCharts(averagesByInterest)}
              {this.renderLineCharts(interestsOverTime)}
            </View>
          </ScrollView>

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
    averagesByInterest: PropTypes.array,
    interestsOverTime: PropTypes.shape({
      data: PropTypes.object,
      time: PropTypes.string,
    }),
  }).isRequired,
}

export default connect(
  mapStateToProps,
  null,
)(Results)
