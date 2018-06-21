import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Image, Button, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import {
  prepResultsState,
  handleFormatting,
  generateRandomKey,
  formatQuizAnswer,
} from './utils'
import styles from './styles'

class Results extends Component {
  constructor(props) {
    super(props)

    const { numberOfQuestions, playerIndex, usernames } = this.props

    this.state = {
      numberOfQuestions,
      playerIndex,
      playerResults: null,
      opponentResults: null,
      username: usernames[playerIndex],
    }
  }

  componentWillMount() {
    const { playerIndex, numberOfQuestions } = this.state
    const { gameResults } = this.props
    const { score } = gameResults
    const scoreLength = score.length

    tracker.trackScreenView('Results')

    console.log('gameResults inside CWM ', gameResults)

    // before CM, check to see if we have both player results
    // if we only have one pair of scores, we only have the player's results
    if (scoreLength === 1) {
      this.setState({
        playerResults: prepResultsState(
          gameResults,
          null,
          'Player',
          numberOfQuestions,
          false,
        ),
        opponentResults: prepResultsState(null, null, null, null, true),
      })
    } else {
      // If we get an array with length 2, check for null
      // which means we're still waiting for the opponent's results
      const opponentResults = score.includes(null)
        ? prepResultsState(null, null, null, null, true)
        : prepResultsState(
            gameResults,
            playerIndex,
            'Opponent',
            numberOfQuestions,
            false,
          )

      const playerResults = prepResultsState(
        gameResults,
        playerIndex,
        'Player',
        numberOfQuestions,
        false,
      )

      this.setState({
        playerResults,
        opponentResults,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    // newly received results from opponent are available in nextProps
    const newGameResults = nextProps.gameResults

    const { playerIndex, numberOfQuestions } = this.state

    console.log('gameResults inside CWRP ', newGameResults)

    const playerResults = prepResultsState(
      newGameResults,
      playerIndex,
      'Player',
      numberOfQuestions,
      false,
    )

    const opponentResults = prepResultsState(
      newGameResults,
      playerIndex,
      'Opponent',
      numberOfQuestions,
      false,
    )

    console.log('the newGameResults are ', newGameResults)

    this.setState({
      playerResults,
      opponentResults,
    })
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
    const { playerResults, opponentResults, username } = this.state

    const { gameResults, opponentIndex, usernames } = this.props

    console.log('playerResults when render ', playerResults)
    console.log('opponentResults when render ', opponentResults)
    console.log('usernames inside render ', usernames)

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
                {!username ? `You` : `${username}`}
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
                {usernames[opponentIndex] || 'Your Opponent'}
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
              {opponentResults === null
                ? this.renderPlayerColumn(false)
                : this.renderPlayerColumn(opponentResults, 'Opponent')}
            </View>
          </View>
          {/* end statContainer  */}

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
  gameStart: { numberOfQuestions, playerIndex, usernames, opponentIndex },
}) {
  return {
    gameResults,
    numberOfQuestions,
    usernames,
    playerIndex,
    opponentIndex,
  }
}

Results.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  playerIndex: PropTypes.number.isRequired,
  usernames: PropTypes.shape({
    0: PropTypes.string,
    1: PropTypes.string,
  }).isRequired,
  opponentIndex: PropTypes.string.isRequired,

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
