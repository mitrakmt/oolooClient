import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.containerStyles}>
        <View style={styles.textContainerStyles}>
          <Text style={{ fontSize: 15, color: '#01a38d', marginBottom: '3%' }}>
            {' '}
            OOLOO
          </Text>
          <Text style={{ fontSize: 33, color: '#344856' }}>
            HEAD TO HEAD TRIVIA
          </Text>
        </View>

        <View style={styles.gameTitleContainerStyles}>
          <Text>Game title</Text>
        </View>

        <View style={styles.newsContainerStyles}>
          <Text>News</Text>
        </View>
      </View>
    )
  }
}

export default Home
