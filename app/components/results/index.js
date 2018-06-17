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
    }
  }

  componentWillMount() {
    const { playerIndex, numberOfQuestions } = this.state
    const { gameResults } = this.props

    // don't we have to use UNSAFE_componentWillMount()
    tracker.trackScreenView('Results')

    prepResultsState(gameResults, playerIndex, numberOfQuestions)
  }

  renderPlayerColumn = statsArray =>
    statsArray.map(statObject => (
      <AnimateNumber
        countBy={5}
        key={`${statObject.value}-player`}
        style={{ color: '#293f4e', fontSize: 15 }}
        timing="linear"
        value={statObject.value}
        formatter={() => handleFormatting(statObject)}
      />
    ))

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
                Player 2
              </Text>
            </View>
          </View>
          {/* end versusContainer  */}

          <View style={styles.statContainer}>
            <View style={styles.statColContainer}>
              {this.renderPlayerColumn([])}
            </View>

            <View style={styles.statColContainer}>
              {this.renderLabels(['Overall', 'Time', 'Total Score', 'Rank'])}
            </View>

            <View style={styles.statColContainer}>
              {this.renderPlayerColumn([])}
            </View>
          </View>

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
  gameResults: { numberOfQuestions, playerIndex },
  gameStart,
}) {
  return {
    numberOfQuestions,
    playerIndex,
    gameInfo: gameStart,
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
