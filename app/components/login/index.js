import React, { Component } from 'react'
import { TextInput, Text, View, Button, Image, Animated } from 'react-native'
import * as EmailValidator from 'email-validator'
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import styles from './styles'
import { prepPayload, fetchUser } from './utils'
import { userAuthenticated } from '../../services/redux/actions/auth'

import LoginAvatar from './img/ooloo-login-avatar.png'

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
      animateBordercolor: new Animated.Value(0),
      animateMargin: new Animated.Value(0),
      animateHeight: new Animated.Value(0),
    }
  }

  createAnimatedStyles = () => {
    const { animateBordercolor, animateHeight, animateMargin } = this.state

    const borderBottomColor = animateBordercolor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aebcc5', '#2f5658'],
    })

    const height = animateHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 60],
    })

    const margin = animateMargin.interpolate({
      inputRange: [0, 1],
      outputRange: ['15%', '7%'],
    })

    return {
      borderBottomColor,
      height,
      marginRight: margin,
      marginLeft: margin,
    }
  }

  startAnimation = toValue => {
    const { animateBordercolor, animateHeight, animateMargin } = this.state
    let animationsArray = [animateBordercolor, animateHeight, animateMargin]

    animationsArray = animationsArray.map(animation =>
      Animated.timing(animation, { toValue }),
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
      const { username, onFocusUsername } = this.state
      if (username.length === 0) {
        this.setState({ username: 'Username' })
      } else if (username.match(/Username/i)) {
        this.setState({ username: '' })
      }

      // toggle onFocus styling for username
      if (onFocusUsername === false) {
        this.setState({ onFocusUsername: true }, () => {
          this.startAnimation(1)
        })
      } else {
        this.setState({ onFocusUsername: false }, () => {
          this.startAnimation(0)
        })
      }
    }

    if (field === 'password') {
      const { password, onFocusPassword } = this.state
      if (password.length === 0) {
        this.setState({ password: 'Password', togglePassword: false })
      } else if (password.match(/Password/i)) {
        this.setState({ password: '', togglePassword: true })
      }

      // toggle onFocus styling for password
      if (onFocusPassword === false) {
        this.setState({ onFocusPassword: true })
      } else {
        this.setState({ onFocusPassword: false })
      }
    }
  }

  handleSubmit = () => {
    const { username, password } = this.state
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
      console.error('Error on loginUser attempt => ', err)
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

    const animatedStyling = this.createAnimatedStyles()

    return (
      <View style={styles.containerStyles}>
        <View style={styles.headerStyles}>
          <View>
            <Text style={styles.titleStyles}>OOLOO</Text>
          </View>

          <View style={styles.imageVerbiageStyles}>
            <View style={{ width: '40%' }}>
              <Image style={{ width: 90, height: 90 }} source={LoginAvatar} />
            </View>
            <View style={{ width: '60%' }}>
              <Text>
                Welcome to OOLOO! Show off your knowledge to put your school in
                the top rankings!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.formStyles}>
          <View style={styles.inputFieldsContainerStyle}>
            <Animated.View
              style={[styles.usernameContainerStyle, animatedStyling]}
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
              style={[styles.passwordContainerStyle, animatedStyling]}
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
              <Text style={styles.signUpTextStyles}>Or Sign Up</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(
  null,
  {
    authUser: userAuthenticated,
  },
)(Login)
