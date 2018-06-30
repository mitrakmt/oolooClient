import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Image, Button, ScrollView } from 'react-native'
import { BarChart, Grid, XAxis } from 'react-native-svg-charts'
/* eslint-disable import/no-extraneous-dependencies */
import * as scale from 'd3-scale' // DO NOT REMOVE eslint-disable comments!
/* eslint-enable import/no-extraneous-dependencies */
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import tracker from '../../services/analytics-tracker/analyticsTracker'

import {
  handleFormatting,
  generateRandomKey,
  formatQuizAnswer,
  prepResultsFor,
  prepAvgByInterestChartData,
} from './utils'
import styles from './styles'

const fill = 'rgb(173, 216, 216)'

// const dummyData1 = {
//   averageByInterest: {
//     data: {
//       Anatomy: 0.8,
//       Biology: 0.56,
//       Radiology: 0.2,
//       Medicine: 0.8,
//       Cytology: 0.56,
//       Genetics: 0.2,
//       Histology: 0.8,
//       Immunology: 0.56,
//       Microbiology: 0.2,
//       Neuroscience: 0.8,
//       Pathology: 0.56,
//       Toxicology: 0.2,
//     },
//   },
//   interestScoreOverTime: {
//     timeInterval: 'week',
//     data: {
//       Medicine: [0.9, 0.55, 0.67, 0.54, 0.4],
//       Biology: [0.8, 0.6, 0.4, 0.38, 0.3],
//       Radiology: [0.7, 0.44, 0.35],
//     },
//   },
// }

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

  renderCharts = ({ data, keys }) =>
    data.map((dataArray, idx) => {
      console.log('the data array is ', dataArray) // [0.8, 0.56, 0.2]

      console.log('the keys array is ', keys[idx]) // ["Anatomy", "Biology", "Radiology"]

      const currentKeysArray = keys[idx]

      return (
        <View style={{ marginTop: '10%', marginBottom: '10%' }}>
          <BarChart
            style={{ height: 200, width: 'auto' }}
            data={dataArray}
            svg={{ fill }}
            contentInset={{ bottom: 30 }}
            // contentInset={{ top: 30, bottom: 30 }} // don't include top contentInset
          >
            <Grid />
          </BarChart>
          <XAxis
            style={{ marginTop: '3%' }}
            scale={scale.scaleBand}
            data={dataArray}
            formatLabel={(value, index) => Math.round(dataArray[index] * 100)}
            // contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 12, fill: 'black' }}
          />
          <XAxis
            // style={{ marginHorizontal: -10 }}
            scale={scale.scaleBand}
            data={currentKeysArray}
            formatLabel={(value, index) => currentKeysArray[index]}
            // contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 12, fill: 'black' }}
          />
        </View>
      )
    })

  render() {
    const { gameResults, playerIndex } = this.props

    let { averagesByInterest } = gameResults

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
              {this.renderCharts(averagesByInterest)}
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
    interestsOverTime: PropTypes.object,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  null,
)(Results)
