import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './styles'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handlePlayPress = () => {
    Actions.gameplay()
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
          <View style={styles.gameTitleTextContainerStyles}>
            <Text style={{ fontSize: 20, color: '#344856', fontWeight: '700' }}>
              Game title
            </Text>

            <Text style={{ color: '#344856' }}>Description of game</Text>
          </View>

          <View style={styles.buttonContainerStyle}>
            <View style={styles.buttonStyles}>
              <Button
                onPress={this.handlePlayPress}
                title="Play!"
                color="white"
                accessibilityLabel="Play button for OOLOO Quiz App"
              />
            </View>
          </View>
        </View>

        <View style={styles.newsContainerStyles}>
          <Text>News</Text>
        </View>
      </View>
    )
  }
}

export default Home
