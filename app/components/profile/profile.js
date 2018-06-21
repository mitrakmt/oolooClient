import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './styles'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import { prepPayload, getUserInterests, getInterests, getUser } from './utils'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const token = this.props.auth
    tracker.trackScreenView('Profile')
    this.getUserInfo(token)
    this.getAllInterests(token)
    this.getUserInterests(token)
  }

  getUserInfo = async token => {
    const payload = prepPayload(token)

    try {
      const getUserResponse = await getUser(payload)

      if (!getUserResponse) {
        this.handleError()
      } else {
        this.props.setUser(getUserResponse)
      }
    } catch (err) {
      this.handleError()
    }
  }

  getAllInterests = async token => {
    const payload = prepPayload(token)

    try {
      const getInterestsResponse = await getInterests(payload)

      if (!getInterestsResponse) {
        this.handleError()
      } else {
        this.props.setInterests(getInterestsResponse.interests)
      }
    } catch (err) {
      this.handleError()
    }
  }

  getUserInterests = async token => {
    const payload = prepPayload(token)

    try {
      const getUserInterestsResponse = await getUserInterests(payload)

      if (!getUserInterestsResponse) {
        this.handleError()
      } else {
        this.props.setUserInterests(getUserInterestsResponse)
      }
    } catch (err) {
      this.handleError()
    }
  }

  handleError = () => {}

  render() {
    return (
      <View style={styles.containerStyles}>
        <Text
          style={{
            fontSize: 18,
            color: '#01a38d',
            marginBottom: '3%',
          }}
        >
          {' '}
          OOLOO
        </Text>
        <View style={styles.textContainerStyles}>
          <Text style={styles.headerTextStyles}>PROFILE</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.userInfoContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri:
                  'https://facebook.github.io/react-native/docs/assets/favicon.png',
              }}
            />
            <View style={styles.profileContainerText}>
              <Text style={styles.userInfoText}>Michael Mitrakos</Text>
              <Text style={styles.userInfoText}>Title</Text>
              <Text style={styles.userInfoText}>Miami University</Text>
              <Text style={styles.userInfoText}>Class of 2020</Text>
            </View>
          </View>

          <View style={styles.interestsContainer}>
            <Text style={styles.userInfoText}>Interests</Text>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ auth, user, interests, userInterests }) {
  return {
    auth,
    user,
    interests,
    userInterests,
  }
}

Profile.propTypes = {
  auth: PropTypes.string.isRequired,
  setInterests: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setUserInterests: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setInterests: payload => {
    dispatch({ type: 'SET_INTERESTS', payload })
  },
  setUser: payload => {
    dispatch({ type: 'SET_USER', payload })
  },
  setUserInterests: payload => {
    dispatch({ type: 'SET_USER_INTERESTS', payload })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
