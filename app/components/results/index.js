import AnimateNumber from 'react-native-animate-number'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import tracker from '../../services/analytics-tracker/analyticsTracker'

import styles from './styles'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    tracker.trackScreenView('Results')
  }

  handleFormatting = (val, statObject) => {
    // quick and dirty handleFormatting, fix for production

    const { format } = statObject
    if (format) {
      if (format === 'time') {
        const timeString = val.toString()
        return `${timeString[0]}m ${timeString[1]}${timeString[2]}s`
      }

      if (format === '%') {
        return `${val}%`
      }
    }

    return val
  }

  renderPlayerColumn = statsArray =>
    statsArray.map(statObject => (
      // <Text key={`${stat}-player`} style={{ color: '#293f4e', fontSize: 15 }}>
      //   {stat}
      // </Text>
      <AnimateNumber
        countBy={5}
        key={`${statObject.value}-player`}
        style={{ color: '#293f4e', fontSize: 15 }}
        timing="linear"
        value={statObject.value}
        formatter={val => this.handleFormatting(val, statObject)}
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
              {this.renderPlayerColumn([
                { format: '%', value: '85' },
                { format: 'time', value: '452' },
                { value: '210' },
                { value: '5' },
              ])}
            </View>

            <View style={styles.statColContainer}>
              {this.renderLabels(['Overall', 'Time', 'Total Score', 'Rank'])}
            </View>

            <View style={styles.statColContainer}>
              {this.renderPlayerColumn([
                { format: '%', value: '90' },
                { format: 'time', value: '439' },
                { value: '236' },
                { value: '6' },
              ])}
            </View>
          </View>

          <View style={styles.buttonStyles}>
            <Button
              onPress={() => Actions.gameplay()}
              title="Play Again!"
              color="white"
              accessibilityLabel="Play again button for OOLOO Quiz App"
            />
            <Button
              onPress={() => Actions.leaderboard()}
              title="Leaderboard"
              color="white"
              accessibilityLabel="Leaderboard"
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
