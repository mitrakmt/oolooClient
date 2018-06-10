import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import styles from './styles'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

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
              <Text>Player 1</Text>
            </View>
            <View>
              <Text>vs.</Text>
            </View>

            <View>
              <Text>Player 2</Text>
            </View>
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
