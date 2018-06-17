import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import { prepResultsState, handleFormatting } from './utils'
import styles from './styles'

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
    const scoreCount = gameResults.score.length

    // don't we have to use UNSAFE_componentWillMount()
    tracker.trackScreenView('Results')

    // before CM, check to see if we have both player results
    // if we only have one pair of scores, we only have the player's results
    if (scoreCount === 1) {
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

  renderPlayerColumn = (statsArray = false) => {
    const noData = [
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
      { value: 'n/a', resultKey: 'Waiting' },
    ]

    const arrayToIterate = statsArray === false ? noData : statsArray

    return arrayToIterate.map(statObject => (
      <AnimateNumber
        countBy={5}
        key={`${statObject.value}-player`}
        style={{ color: '#293f4e', fontSize: 15 }}
        timing="linear"
        value={statObject.value}
        formatter={() => handleFormatting(statObject)}
      />
    ))
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

  render() {
    const { playerResults, opponentResults } = this.state

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
            <View>
              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/300/300/any' }}
              />
              <Text style={{ color: '#293f4e', textAlign: 'center' }}>
                Player 1
              </Text>
            </View>

            <View>
              <Text
                style={{ color: '#293f4e', fontSize: 30, fontWeight: 'bold' }}
              >
                vs.
              </Text>
            </View>

            <View>
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
              {this.renderPlayerColumn(playerResults)}
            </View>

            <View style={styles.statColContainer}>
              {this.renderLabels(['Overall', 'Time', 'Total Score', 'Rank'])}
            </View>

            <View style={styles.statColContainer}>
              {opponentResults === null
                ? this.renderPlayerColumn(false)
                : this.renderPlayerColumn(opponentResults)}
            </View>
          </View>
          {/* end statContainer  */}

          <View style={styles.buttonStyles}>
            <Button
              onPress={() => Actions.gameplay()}
              title="Play Again!"
              color="white"
              accessibilityLabel="Play again button for OOLOO Quiz App"
            />
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({
  gameResults,
  gameStart: { numberOfQuestions, playerIndex },
}) {
  return {
    gameResults,
    numberOfQuestions,
    playerIndex,
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
}

export default connect(
  mapStateToProps,
  null,
)(Results)
