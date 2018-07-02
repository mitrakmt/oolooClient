import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import CountdownCircle from 'react-native-countdown-circle'
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import styles from './styles'
import { gameResults } from '../../services/redux/actions/gameresults'
import { startTheGame } from '../../services/redux/actions/gameplay'
import { socketConnected } from '../../services/redux/actions/socket'
import { matchFound } from '../../services/redux/actions/matchfound'
import events from '../../services/socket-io-client/'
import AvatarIcon from '../assets/images/avatar_icon.png'

const DEV_API_URL = `https://ooloo-api-dev.herokuapp.com`

class MatchSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      errorMessage:
        "We couldn't find a match, please use the Back button to return to the Home page and try again.",
    }
  }

  componentDidMount = async () => {
    // On CDM, check for tokens stored in Redux and Keychain.
    // If we have a token, create & store socket, else show error.
    const { auth } = this.props
    const storedToken = await this.retrieveStoredToken()

    if (!auth && !storedToken) {
      this.setState(
        {
          isError: true,
          errorMessage:
            "There was a problem storing your credentials. We'll direct you to the Login page in a few moments.",
        },
        () => {
          setTimeout(() => Actions.login(), 10000)
        },
      )
    }

    if (auth) {
      this.createAndStoreSocket(auth)
    } else {
      this.createAndStoreSocket(storedToken)
    }
  }

  retrieveStoredToken = async () => {
    // Retreive the credentials
    let credentials = await Keychain.getGenericPassword()

    if (credentials) {
      credentials = credentials.password
    } else {
      console.log('No credentials stored in Keychain')
      credentials = null
    }

    return credentials
  }

  createAndStoreSocket = auth => {
    const { connectSocket, foundMatchAction } = this.props

    const socket = io(`${DEV_API_URL}/?token=${auth}`)

    socket.on('matchFound', data => events.matchFound(data, foundMatchAction))

    connectSocket(socket)
  }

  displayMatchError = () => {
    const { isError, errorMessage } = this.state
    return (
      <View style={styles.errorContainerStyle}>
        <Text style={{ textAlign: 'center', color: '#f14169' }}>
          {isError ? errorMessage : null}
        </Text>
      </View>
    )
  }

  render() {
    const { isError } = this.state
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

          <View style={styles.searchingContainer}>
            <View style={{ marginTop: '5%' }}>
              <Text style={styles.findingHeader}>
                Finding a worthy opponent...
              </Text>
            </View>

            <View style={styles.countdownContainer}>
              <Image style={styles.playerAvatar} source={AvatarIcon} />

              <CountdownCircle
                seconds={!isError ? 15 : 1}
                radius={37}
                borderWidth={8}
                color="#01a38d"
                bgColor="#fff"
                textStyle={{ fontSize: 20 }}
                onTimeElapsed={() =>
                  // Wait another 20 seconds for Sockets, then display error
                  setTimeout(() => this.setState({ isError: true }), 20000)
                }
              />
            </View>

            {this.displayMatchError()}

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
  connectSocket: PropTypes.func.isRequired,
  foundMatchAction: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {
    socketGameResults: gameResults,
    gameStart: startTheGame,
    connectSocket: socketConnected,
    foundMatchAction: matchFound,
  },
)(MatchSearch)
