import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Image, Button, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import { prepResultsState, handleFormatting, generateRandomKey } from './utils'
import styles from './styles'

const devEnvironment = true

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfQuestions: this.props.numberOfQuestions,
      playerIndex: this.props.playerIndex,
      playerResults: null,
      opponentResults: null,
    }
  }

  componentWillMount() {
    const { playerIndex, numberOfQuestions } = this.state
    const { gameResults } = this.props
    const scoreLength = gameResults.score.length

    tracker.trackScreenView('Results')

    // before CM, check to see if we have both player results
    // if we only have one pair of scores, we only have the player's results
    if (scoreLength === 1) {
      this.setState({
        playerResults: prepResultsState(gameResults, null, numberOfQuestions),
      })
    } else {
      this.setState({
        playerResults: prepResultsState(
          gameResults,
          playerIndex,
          numberOfQuestions,
        ),
        opponentResults: prepResultsState(gameResults, null, numberOfQuestions),
      })
    }
  }

  componentWillReceiveProps(prevProps) {
    // when we initially only received one set of results,
    // use CWRP to compare length of old score array with
    // length of new score array received from server via Redux store
    const oldScoreLength = prevProps.gameResults.score.length
    const { gameResults } = this.props

    const newScoreLength = gameResults.score.length

    const { playerIndex, numberOfQuestions } = this.state

    if (newScoreLength > oldScoreLength) {
      this.setState({
        playerResults: prepResultsState(
          gameResults,
          playerIndex,
          numberOfQuestions,
        ),
        opponentResults: prepResultsState(gameResults, null, numberOfQuestions),
      })
    }
  }

  renderPlayerColumn = (statsArray = false, baseString = 'Player') => {
    // if we're still waiting for opponent's results, use noData array
    // to fill opponent results column
    let noData = [
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
    ]

    // remove devEnironment references as soon as we start receiving Ranking
    // info from server
    noData = devEnvironment === true ? noData.slice(0, 3) : noData

    const arrayToIterate = statsArray === false ? noData : statsArray

    return arrayToIterate.map(statObject => {
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

  renderQuizResults = answerResults => {
    const results = []

    for (let i = 0; i <= 9; i += 1) {
      const key = generateRandomKey(
        answerResults[i],
        `Player Question ${i + 1} Answer`,
      )
      results.push(
        <Text style={{ fontWeight: '700' }} key={key}>
          Question {i + 1}:{' '}
          {answerResults[i] === 'false' ? 'Incorrect' : 'Correct'}
        </Text>,
      )
    }

    return results
  }

  render() {
    const { playerResults, opponentResults } = this.state
    const { answerResults } = this.props

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
              <Text style={{ color: '#293f4e', textAlign: 'center' }}>You</Text>
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
                Your Opponent
              </Text>
            </View>
          </View>
          {/* end versusContainer  */}

          <View style={styles.statContainer}>
            <View style={styles.statColContainer}>
              {this.renderPlayerColumn(playerResults, 'Player')}
            </View>

            <View style={styles.statColContainer}>
              {this.renderLabels(
                devEnvironment
                  ? ['Overall', 'Time', 'Total Score']
                  : ['Overall', 'Time', 'Total Score', 'Rank'],
              )}
            </View>

            <View style={styles.statColContainer}>
              {opponentResults === null
                ? this.renderPlayerColumn(false)
                : this.renderPlayerColumn(opponentResults, 'Opponent')}
            </View>
          </View>
          {/* end statContainer  */}

          <View style={styles.scrollButtonContainer}>
            <ScrollView
              style={{
                padding: '5%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '5%',
                width: '60%',
              }}
            >
              {this.renderQuizResults(answerResults)}
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
          {/* end scrollview/buttons container */}
        </View>
      </View>
    )
  }
}

function mapStateToProps({
  gameResults,
  gameStart: { numberOfQuestions, playerIndex },
  answerResults,
}) {
  return {
    gameResults,
    numberOfQuestions,
    playerIndex,
    answerResults,
  }
}

Results.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  playerIndex: PropTypes.number.isRequired,

  gameResults: PropTypes.shape({
    gameID: PropTypes.number,
    remainingTime: PropTypes.number,
    score: PropTypes.array,
    totalAnswered: PropTypes.array,
    totalCorrect: PropTypes.array,
  }).isRequired,

  answerResults: PropTypes.shape({
    0: PropTypes.string,
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
    6: PropTypes.string,
    7: PropTypes.string,
    8: PropTypes.string,
    9: PropTypes.string,
  }).isRequired,
}

export default connect(
  mapStateToProps,
  null,
)(Results)
