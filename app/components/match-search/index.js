import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import CountdownCircle from 'react-native-countdown-circle'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
// import tracker from '../../services/analytics-tracker/analyticsTracker'
import styles from './styles'
// import createTextAnimationObjects from './utils'
import { gameResults } from '../../services/redux/actions/gameresults'
import { startTheGame } from '../../services/redux/actions/gameplay'
import { socketConnected } from '../../services/redux/actions/socket'
import { matchFound } from '../../services/redux/actions/matchfound'
// import socketMiddleware from '../../services/socket-io-client'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`

class MatchSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    // tracker.trackScreenView('Home')
  }

  componentDidMount = () => {
    const { auth, connectSocket, foundMatch } = this.props

    /*
    const { auth, socketGameResults, gameStart, connectSocket } = this.props
    const context = this

    const callbacks = {
      socketGameResults,
      gameStart,
      createTextAnimationObjects,
      connectSocket,
    }

    // Create socket and store in Redux
    socketMiddleware(auth, context, callbacks)
    */

    const socket = io(`${DEV_API_URL}/?token=${auth}`)

    console.log('socket is ', socket)
    console.log('\n')

    socket.on('matchFound', ({ interests }) => {
      foundMatch(interests) // send interests to Redux store
      Actions.matchFound()
    })

    connectSocket(socket)
  }

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
              <Text style={styles.findingHeader}>
                Finding worthy opponent...
              </Text>
            </View>

            <View style={styles.countdownContainer}>
              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/300/300/any' }}
              />

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

function mapStateToProps({ auth }) {
  return {
    auth,
  }
}

MatchSearch.propTypes = {
  auth: PropTypes.string.isRequired,
  // socketGameResults: PropTypes.func.isRequired,
  // gameStart: PropTypes.func.isRequired,
  connectSocket: PropTypes.func.isRequired,
  foundMatch: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {
    socketGameResults: gameResults,
    gameStart: startTheGame,
    connectSocket: socketConnected,
    foundMatch: matchFound,
  },
)(MatchSearch)
