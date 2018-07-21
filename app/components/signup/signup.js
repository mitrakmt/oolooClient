import React, { Component } from 'react'
import { TextInput, Text, View, Button, Image, Animated } from 'react-native'
import * as EmailValidator from 'email-validator'
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import SearchableDropDown from 'react-native-searchable-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import {
  prepPayload,
  prepGetPayload,
  fetchUser,
  getAvailableSchools,
  createAnimatedStyles,
} from './utils'
import { userAuthenticated } from '../../services/redux/actions/auth'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import AvatarIcon from '../assets/images/avatar_icon.png'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      username: '',
      school: '',
      email: '',
      availableSchools: [],
      onFocusUsername: false,
      onFocusPassword: false,
      onFocusEmail: false,
      usernameInput: {
        BorderColor: new Animated.Value(0),
        Height: new Animated.Value(0),
        Margin: new Animated.Value(0),
      },
      passwordInput: {
        BorderColor: new Animated.Value(0),
        Height: new Animated.Value(0),
        Margin: new Animated.Value(0),
      },
      emailInput: {
        BorderColor: new Animated.Value(0),
        Height: new Animated.Value(0),
        Margin: new Animated.Value(0),
      },
    }
  }

  componentWillMount() {
    const payload = prepGetPayload()
    getAvailableSchools(payload).then(availableSchools => {
      this.setState({
        availableSchools: availableSchools.schools,
      })
    })
    tracker.trackScreenView('Signup')
  }

  onSelect = val => {
    this.setState({
      school: val.name,
    })
  }

  handleUsernameInput = text => {
    this.setState({
      username: text,
    })
  }

  handlePasswordInput = text => {
    this.setState({
      password: text,
    })
  }

  handleEmailInput = text => {
    this.setState({
      email: text,
    })
  }

  startAnimation = (toValue, { BorderColor, Height, Margin }) => {
    let animationsArray = [BorderColor, Height, Margin]

    animationsArray = animationsArray.map(animation =>
      Animated.timing(animation, { toValue, duration: 90 }),
    )

    Animated.sequence(animationsArray).start()
  }

  toggleField = field => {
    // removes placeholder text when user focuses on a field
    // add placeholder text back if length of field is zero after editing is finished
    if (field === 'username') {
      const { onFocusUsername, usernameInput } = this.state

      // toggle onFocus styling for username
      if (onFocusUsername === false) {
        this.setState({ onFocusUsername: true }, () => {
          this.startAnimation(1, usernameInput)
        })
      } else {
        this.setState({ onFocusUsername: false }, () => {
          this.startAnimation(0, usernameInput)
        })
      }
    }

    if (field === 'password') {
      const { onFocusPassword, passwordInput } = this.state

      // toggle onFocus styling for password
      if (onFocusPassword === false) {
        this.setState(
          {
            onFocusPassword: true,
          },
          () => {
            this.startAnimation(1, passwordInput)
          },
        )
      } else {
        this.setState(
          {
            onFocusPassword: false,
          },
          () => {
            this.startAnimation(0, passwordInput)
          },
        )
      }
    }

    if (field === 'email') {
      const { onFocusEmail, emailInput } = this.state

      // toggle onFocus styling for email
      if (onFocusEmail === false) {
        this.setState({ onFocusEmail: true }, () => {
          this.startAnimation(1, emailInput)
        })
      } else {
        this.setState({ onFocusEmail: false }, () => {
          this.startAnimation(0, emailInput)
        })
      }
    }
  }

  handleSubmit = () => {
    const { username, password, email, school } = this.state
    const haveUser = EmailValidator.validate(email)

    if (haveUser) {
      this.signupUser(username, password, email, school)
    } else {
      this.handleError('Email validation failed')
    }
  }

  handleError = error => {
    console.log(error)
  }

  signupUser = async (username, password, email, school) => {
    const payload = prepPayload(username, password, email, school)

    try {
      const serverResponse = await fetchUser(payload)
      if (!serverResponse) {
        this.handleError('failed fetch user?')
      } else {
        this.storeToken(username, serverResponse)
      }
    } catch (err) {
      this.handleError('failed fetch user')
    }
  }

  storeToken = async (username, Authorization) => {
    const { authUser } = this.props

    // Store the credentials, returns a boolean
    await Keychain.setGenericPassword(username, Authorization)

    // Fires off Redux auth action
    authUser(Authorization)

    // Navigate to Home/Let's Play
    Actions.moreInfo()
    // Actions.home()
  }

  render() {
    const animatedUserStyles = createAnimatedStyles(this.state.usernameInput)
    const animatedEmailStyles = createAnimatedStyles(this.state.emailInput)
    const animatedPasswordStyles = createAnimatedStyles(
      this.state.passwordInput,
    )

    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <View style={styles.containerStyles}>
          <View style={styles.headerStyles}>
            <View>
              <Text style={styles.titleStyles}>OOLOO</Text>
            </View>

            <View style={styles.imageVerbiageStyles}>
              <View style={{ width: '40%' }}>
                <Image style={{ width: 90, height: 90 }} source={AvatarIcon} />
              </View>
              <View style={{ width: '60%' }}>
                <Text>
                  Welcome to OOLOO! Show off your knowledge to put your school
                  in the top rankings!
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.formStyles}>
            <View style={styles.inputFieldsContainerStyle}>
              <Animated.View
                style={[styles.usernameContainerStyle, animatedUserStyles]}
              >
                <TextInput
                  style={styles.textInputStyles}
                  placeholder="Username"
                  fontSize={17}
                  autoCapitalize="none"
                  value={this.state.username}
                  onFocus={() => this.toggleField('username')}
                  onChangeText={this.handleUsernameInput}
                  onEndEditing={() => this.toggleField('username')}
                />
              </Animated.View>

              <Animated.View
                style={[styles.passwordContainerStyle, animatedPasswordStyles]}
              >
                <TextInput
                  style={styles.textInputStyles}
                  fontSize={17}
                  autoCapitalize="none"
                  placeholder="Password"
                  secureTextEntry
                  value={this.state.password}
                  onFocus={() => this.toggleField('password')}
                  onChangeText={this.handlePasswordInput}
                  onEndEditing={() => this.toggleField('password')}
                />
              </Animated.View>

              <Animated.View
                style={[styles.emailContainerStyle, animatedEmailStyles]}
              >
                <TextInput
                  style={styles.textInputStyles}
                  fontSize={17}
                  placeholder="Email"
                  autoCapitalize="none"
                  value={this.state.email}
                  onFocus={() => this.toggleField('email')}
                  onChangeText={this.handleEmailInput}
                  onEndEditing={() => this.toggleField('email')}
                />
              </Animated.View>

              <SearchableDropDown
                onItemSelect={school => this.onSelect(school)}
                containerStyle={{
                  padding: 5,
                  width: '80%',
                  marginTop: 15,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                textInputStyle={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  zIndex: 1000,
                  borderRadius: 5,
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  zIndex: 1000,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{
                  color: '#222',
                }}
                itemsContainerStyle={{
                  maxHeight: 90,
                  backgroundColor: 'white',
                }}
                items={this.state.availableSchools}
                defaultIndex={2}
                placeholder="Select School"
                resetValue={false}
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.buttonContainerStyle}>
              <View style={styles.buttonStyles}>
                <Button
                  onPress={this.handleSubmit}
                  title="Get Started"
                  color="white"
                  accessibilityLabel="Signup Button for OOLOO Quiz App"
                />
              </View>

              <View>
                <Button
                  style={styles.signUpTextStyles}
                  onPress={() => Actions.login()}
                  title="Or Login"
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(
  null,
  {
    authUser: userAuthenticated,
  },
)(Signup)
