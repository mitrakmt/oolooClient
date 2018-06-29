import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SlotMachine from 'react-native-slot-machine'
import Icon from 'react-native-vector-icons/FontAwesome'
import events from '../../services/socket-io-client/'
import { startTheGame } from '../../services/redux/actions/gameplay'
// import tracker from '../../services/analytics-tracker/analyticsTracker'
import styles from './styles'

const MedicalIcons = ['stethoscope', 'heartbeat', 'ambulance', 'flask']
// Icons not available in library: dna, tablets, hospital, file-prescription, notes-medical

class MatchFound extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    // tracker.trackScreenView('Home')
  }

  componentDidMount = () => {
    // on CDM, connect Socket to gameStart, pass gameStart Action to event CB
    const { socket, gameStart } = this.props

    socket.on('gameStart', data => events.gameStart(data, gameStart))
  }

  renderSlotIcon = index => {
    const displayIndex = index > 3 ? index % 2 : index
    return (
      <Text>
        <Icon color="#fff" name={MedicalIcons[displayIndex]} size={25} />
      </Text>
    )
  }

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

          <View style={styles.foundContainer}>
            <View style={styles.topContainer}>
              <View>
                <Text style={styles.headerStyling}>Match Found!</Text>
              </View>

              <View style={styles.avatarFoundContainer}>
                <View>
                  <Image
                    style={styles.playerAvatar}
                    source={{ url: 'https://placeimg.com/300/300/any' }}
                  />
                </View>
                <View>
                  <Image
                    style={styles.playerAvatar}
                    source={{ url: 'https://placeimg.com/300/300/any' }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <SlotMachine
                text="0123"
                range="0123456789"
                renderContent={c => this.renderSlotIcon(c)}
              />
            </View>
          </View>
        </View>

        <View style={styles.roundStartsContainer}>
          <Text style={styles.headerStyling}>Round starting in...</Text>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ socket }) {
  return {
    socket,
  }
}

MatchFound.propTypes = {
  socket: PropTypes.shape({
    acks: PropTypes.object,
    connected: PropTypes.bool,
    disconnected: PropTypes.bool,
    flags: PropTypes.object,
    id: PropTypes.string,
    ids: PropTypes.number,
    io: PropTypes.object,
    json: PropTypes.object,
    nsp: PropTypes.string,
    query: PropTypes.string,
    receiveBuffer: PropTypes.array,
    sendBuffer: PropTypes.array,
    subs: PropTypes.array,
    _callbacks: PropTypes.object,
  }).isRequired,

  gameStart: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { gameStart: startTheGame },
)(MatchFound)
