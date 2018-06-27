import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import styles from './styles'

class MatchSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    tracker.trackScreenView('Home')
  }

  componentDidMount = () => {
    /*
    const { auth, socketGameResults, gameStart } = this.props
    const context = this

    const callbacks = {
      socketGameResults,
      gameStart,
      createTextAnimationObjects,
    }

    // Create socket and store in local state
    socketMiddleware(auth, context, callbacks)
    */
  }

  render() {
    return (
      <View style={[styles.containerStyles, styles.debuggingStyles]}>
        <View style={styles.mainContainerStyles}>
          <View style={[styles.textContainerStyles, styles.debuggingStyles]}>
            <Text
              style={{
                fontSize: 15,
                color: '#01a38d',
                // marginBottom: '3%',
              }}
            >
              {' '}
              OOLOO
            </Text>
          </View>

          <View style={[styles.searchingContainer, styles.debuggingStyles]}>
            <View>
              <Text>Finding worthy opponent...</Text>
            </View>

            <View>
              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/300/300/any' }}
              />
            </View>

            <View style={styles.buttonContainerStyle}>
              <View style={styles.buttonStyles}>
                <Button
                  onPress={() => Actions.home()}
                  title="Back"
                  color="white"
                  accessibilityLabel="Back button for OOLOO Quiz App Home view"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default MatchSearch
