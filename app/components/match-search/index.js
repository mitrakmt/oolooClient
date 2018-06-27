import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
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
            <Text>Placeholder</Text>

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
