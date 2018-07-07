import React, { Component } from 'react'
import { TabBarIOS, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import { Dropdown } from 'react-native-material-dropdown'
import AvatarIcon from '../assets/images/avatar_icon.png'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import {
  prepPayload,
  getUserInterests,
  getInterests,
  getUser,
  deleteInterest,
  setUserInterests,
} from './utils'
import styles from './styles'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addInterestText: '',
    }
  }

  componentWillMount() {
    tracker.trackScreenView('Profile')
    this.getUserInfo()
    this.getAllInterests()
    this.getUserInterests()
  }

  getUserInfo = async () => {
    const token = this.props.auth
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

  getAllInterests = async () => {
    const token = this.props.auth
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

  getUserInterests = async () => {
    const token = this.props.auth
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

  addInterest = async userInterest => {
    const token = this.props.auth
    const payload = prepPayload(token)

    try {
      const addUserInterestResponse = await setUserInterests(payload, {
        interests: [
          this.props.interests.find(element => element.name === userInterest)
            .id,
        ],
      })

      if (!addUserInterestResponse) {
        this.handleError()
      } else {
        this.getUserInterests().then(() => {
          setTimeout(() => {
            this.setState({
              addInterestText: '',
            })
          }, 1000)
        })
      }
    } catch (err) {
      this.handleError()
    }
  }

  editUserInfo = () => {
    Actions.editUserInfo()
  }

  deleteUserInterest = async interestId => {
    const token = this.props.auth
    const payload = prepPayload(token)

    try {
      const deleteInterestResponse = await deleteInterest(payload, interestId)

      if (!deleteInterestResponse) {
        this.handleError()
      } else {
        // make sure backend now returns fill list of interests after deletion
        this.props.postUserInterests(deleteInterestResponse)
        this.getUserInterests()
      }
    } catch (err) {
      this.handleError()
    }
  }

  handleError = () => {}

  handleHomePress = () => {
    Actions.home()
  }

  checkIfInterestAdded = name => {
    let flag = true
    for (let i = 0; i < this.props.userInterests.length; i += 1) {
      if (name === this.props.userInterests[i].name) {
        flag = false
      }
    }
    return flag
  }

  removeInterest = interest => {
    this.deleteUserInterest(
      this.props.interests.find(element => element.name === interest).id,
    )
  }

  renderProfileView = () => {
    const data =
      this.props.interests.length > 0
        ? this.props.interests
            .filter(interest => this.checkIfInterestAdded(interest.name))
            .map(interestObject => ({
              value: interestObject.name,
            }))
        : []

    const userInterests = this.props.userInterests
      ? this.props.userInterests.map(interest => interest.name)
      : []

    return (
      <View style={styles.containerStyles}>
        <Text style={{ fontSize: 15, color: '#01a38d', marginTop: '6%' }}>
          {' '}
          OOLOO
        </Text>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 35, color: '#344856', fontWeight: '300' }}>
            Profile
          </Text>
        </View>

        <View style={styles.profileContainer}>
          <FontAwesome.Button
            name="pencil"
            onPress={this.editUserInfo}
            color="black"
            backgroundColor="white"
            style={{ marginLeft: 'auto' }}
          />
          <View style={styles.userInfoContainer}>
            <Image style={styles.playerAvatar} source={AvatarIcon} />
            <View style={styles.profileContainerText}>
              <Text style={styles.userInfoText}>
                {this.props.user.username}
              </Text>
              {this.props.user.name && (
                <Text style={styles.userInfoText}>{this.props.user.name}</Text>
              )}
              {this.props.user.university && (
                <Text style={styles.userInfoText}>
                  {this.props.user.university}
                </Text>
              )}
              {this.props.user.graduationYear && (
                <Text style={styles.userInfoText}>
                  Class of {this.props.user.graduationYear}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.interestsContainer}>
            <Text style={styles.userInfoText}>Interests</Text>
            <View
              style={{
                width: '80%',
              }}
            >
              {userInterests.map(interest => (
                <View
                  style={{ display: 'flex', flexDirection: 'row' }}
                  key={`userInterestsMap${interest}`}
                >
                  <Text>{interest}</Text>
                  <Text
                    onPress={() => {
                      this.removeInterest(interest)
                    }}
                    style={{
                      marginLeft: 'auto',
                    }}
                  >
                    x
                  </Text>
                </View>
              ))}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Dropdown
                  label="Add an interest"
                  data={data}
                  containerStyle={{
                    height: 50,
                    width: '100%',
                  }}
                  onChangeText={addInterestText =>
                    this.addInterest(addInterestText)
                  }
                  value={this.state.addInterestText}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          iconSize={20}
          onPress={() => Actions.home()}
          title="Home"
          iconName="md-home"
          selectedIconName="md-home"
        >
          {this.renderProfileView()}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          iconSize={20}
          onPress={() => Actions.profile()}
          title="Profile"
          iconName="ios-person"
          selectedIconName="ios-person"
          selected
        >
          {this.renderProfileView()}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          iconSize={20}
          onPress={() => Actions.leaderboard()}
          title="Leaderboard"
          iconName="md-list"
          selectedIconName="md-list"
        >
          {this.renderProfileView()}
        </Icon.TabBarItem>
      </TabBarIOS>
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
  interests: PropTypes.arrayOf(PropTypes.object).isRequired,
  postUserInterests: PropTypes.func.isRequired,
  setInterests: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setUserInterests: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    university: PropTypes.string,
    name: PropTypes.string,
    graduationYear: PropTypes.number,
  }),
  userInterests: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

Profile.defaultProps = {
  user: {
    university: '',
    name: '',
    username: '',
    graduationYear: '',
  },
}

const mapDispatchToProps = dispatch => ({
  postUserInterests: payload => {
    dispatch({ type: 'POST_USER_INTERESTS', payload })
  },
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
