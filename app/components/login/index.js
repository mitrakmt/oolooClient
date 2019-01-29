import React, { Component } from 'react'
import {
  AsyncStorage,
  TextInput,
  Text,
  View,
  Button,
  Animated,
  Image,
  KeyboardAvoidingView,
} from 'react-native'
import * as EmailValidator from 'email-validator'
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import styles from './styles'
import { prepPayload, fetchUser, createAnimatedStyles } from './utils'
import { userAuthenticated } from '../../services/redux/actions/auth'
import AvatarIcon from './img/ooloo-login-avatar.png'
import tracker from '../../services/analytics-tracker/analyticsTracker'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      isError: false,
      password: 'Password',
      togglePassword: false,
      username: 'Username',
      onFocusUsername: false,
      onFocusPassword: false,
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
    }
  }

  componentWillMount() {
    tracker.trackScreenView('Login')
    AsyncStorage.getItem('userCredentials').then(credentialsJson => {
      if (credentialsJson) {
        const credentials = JSON.parse(credentialsJson)
        this.loginUser(credentials.userName, credentials.userPassword)
      }
    })
  }

  startAnimation = (toValue, { BorderColor, Height, Margin }) => {
    let animationsArray = [BorderColor, Height, Margin]

    animationsArray = animationsArray.map(animation =>
      Animated.timing(animation, { toValue, duration: 90 }),
    )

    Animated.sequence(animationsArray).start()
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

  toggleField = field => {
    // removes placeholder text when user focuses on a field
    // add placeholder text back if length of field is zero after editing is finished

    if (field === 'username') {
      const { username, onFocusUsername, usernameInput } = this.state

      if (username.length === 0) {
        this.setState({ username: 'Username' })
      } else if (username.match(/Username/i)) {
        this.setState({ username: '' })
      }

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
      const { password, onFocusPassword, passwordInput } = this.state

      if (password.length === 0) {
        this.setState({ togglePassword: false })
      } else if (password.match(/Password/i)) {
        this.setState({ togglePassword: true })
      }

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
  }

  handleSubmit = () => {
    const { username, password } = this.state
    AsyncStorage.setItem(
      'userCredentials',
      JSON.stringify({
        userName: username,
        userPassword: password,
      }),
    )
    const haveUser = EmailValidator.validate(username)

    if (haveUser) {
      this.setState(
        {
          password: 'Password',
        },
        () => this.loginUser(username, password),
      )
    } else {
      this.handleError()
    }
  }

  handleError = () => {
    this.setState({
      errorMessage:
        'There was an error processing your request. Please try again.',
      isError: true,
    })
  }

  loginUser = async (username, password) => {
    const payload = prepPayload(username, password)

    try {
      const serverResponse = await fetchUser(payload)

      if (!serverResponse) {
        this.handleError()
      } else {
        this.storeToken(username, serverResponse)
      }
    } catch (err) {
      this.handleError()
    }
  }

  storeToken = async (username, Authorization) => {
    const { authUser } = this.props

    // Store the credentials, returns a boolean
    await Keychain.setGenericPassword(username, Authorization)

    // Fires off Redux auth action
    authUser(Authorization)

    // Navigate to Home/Let's Play
    Actions.home()
  }

  render() {
    const { errorMessage, isError, togglePassword } = this.state

    const animatedUserStyles = createAnimatedStyles(this.state.usernameInput)
    const animatedPasswordStyles = createAnimatedStyles(
      this.state.passwordInput,
    )

    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
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
                  Welcome back to OOLOO! Now that you&#39;ve rested up,
                  let&#39;s see what you&#39;ve got!
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
                  placeholder={this.state.username}
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
                  secureTextEntry={togglePassword}
                  value={this.state.password}
                  onFocus={() => this.toggleField('password')}
                  onChangeText={this.handlePasswordInput}
                  onEndEditing={() => this.toggleField('password')}
                />
              </Animated.View>
            </View>

            <View style={styles.errorContainerStyle}>
              <Text style={{ textAlign: 'center', color: '#f14169' }}>
                {isError ? errorMessage : null}
              </Text>
            </View>

            <View style={styles.buttonContainerStyle}>
              <View style={styles.buttonStyles}>
                <Button
                  onPress={this.handleSubmit}
                  title="Log in!"
                  color="white"
                  accessibilityLabel="Log in button for OOLOO Quiz App"
                />
              </View>

              <View>
                <Button
                  style={styles.signUpTextStyles}
                  onPress={() => Actions.signup()}
                  title="Or Sign Up"
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  null,
  {
    authUser: userAuthenticated,
  },
)(Login)
