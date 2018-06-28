import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
// import { Actions } from 'react-native-router-flux'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import CountdownCircle from 'react-native-countdown-circle'
// import tracker from '../../services/analytics-tracker/analyticsTracker'
import styles from './styles'

// import socketMiddleware from '../../services/socket-io-client'

class MatchFound extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    // tracker.trackScreenView('Home')
  }

  componentDidMount = () => {}

  render() {
    return (
      <View style={[styles.containerStyles, styles.debuggingStyles]}>
        <View style={styles.mainContainerStyles}>
          <View style={styles.textContainerStyles}>
            <Text
              style={{
                fontSize: 15,
                color: '#01a38d',
              }}
            >
              OOLOO
            </Text>
          </View>

          <View style={styles.searchingContainer}>
            <View style={{ marginTop: '5%' }}>
              <Text style={styles.findingHeader}>Match Found!</Text>
            </View>

            <View style={styles.countdownContainer}>
              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/300/300/any' }}
              />

              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/300/300/any' }}
              />
            </View>

            <View style={styles.buttonContainerStyle}>
              {/* <View style={styles.buttonStyles}>
                <Button
                  onPress={() => Actions.home()}
                  title="Back"
                  color="white"
                  accessibilityLabel="Back button for OOLOO Quiz App Home view"
                />
              </View> */}

              <CountdownCircle
                seconds={15}
                radius={37}
                borderWidth={8}
                color="#01a38d"
                bgColor="#fff"
                textStyle={{ fontSize: 20 }}
                onTimeElapsed={() => console.log('Elapsed!')}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default MatchFound
