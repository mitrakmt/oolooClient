import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
// import { Actions } from 'react-native-router-flux'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

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
      <View style={styles.containerStyles}>
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

          <View style={[styles.debuggingStyles, styles.foundContainer]}>
            <View style={{ marginTop: '2%' }}>
              <Text style={styles.findingHeader}>Match Found!</Text>
            </View>

            <View style={[styles.debuggingStyles, styles.avatarFoundContainer]}>
              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/300/300/any' }}
              />

              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/300/300/any' }}
              />
            </View>

            <View style={styles.buttonContainerStyle} />
          </View>
        </View>
      </View>
    )
  }
}

export default MatchFound
