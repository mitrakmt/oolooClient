import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import { prepResultsState, handleFormatting } from './utils'
import styles from './styles'

const dummyData = [
  { value: [10], resultKey: 'score' },
  { value: [7], resultKey: 'totalAnswered' },
  { value: [3], resultKey: 'totalCorrect' },
  { value: 30400, resultKey: 'remainingTime' },
  { value: 28, resultKey: 'gameID' },
]

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerResults: prepResultsState(this.props),
    }
  }

  componentWillMount() {
    // don't we have to use UNSAFE_componentWillMount()
    tracker.trackScreenView('Results')
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
    const { playerResults } = this.state
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
              {this.renderPlayerColumn(playerResults)}
            </View>

            <View style={styles.statColContainer}>
              {this.renderLabels(['Overall', 'Time', 'Total Score', 'Rank'])}
            </View>

            <View style={styles.statColContainer}>
              {this.renderPlayerColumn(dummyData)}
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

function mapStateToProps({ gameResults }) {
  return {
    gameResults,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Results)
