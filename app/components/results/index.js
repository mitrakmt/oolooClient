import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

import styles from './styles'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  renderStatBlock = (playerOneStat, playerTwoStat, statName) => (
    <View style={styles.statContainer}>
      <View>
        <Text style={{ color: '#293f4e', fontSize: 15 }}>{playerOneStat}</Text>
      </View>

      <View>
        <Text
          style={{
            color: '#293f4e',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {statName}
        </Text>
      </View>

      <View>
        <Text style={{ color: '#293f4e', fontSize: 15 }}>{playerTwoStat}</Text>
      </View>
    </View>
  )

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

          <View>
            {this.renderStatBlock('85%', '90%', 'Overall')}
            {this.renderStatBlock('4 m 8 s', '5 m 14 s', 'Time')}
            {this.renderStatBlock('210', '235', 'Total Score')}
            {this.renderStatBlock('5', '6', 'Rank ')}
          </View>

          <View />
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
