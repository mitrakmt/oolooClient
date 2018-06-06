import React, { Component } from 'react'
import { TextInput, Text, View, Button, Image } from 'react-native'
import * as EmailValidator from 'email-validator'
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import styles from './styles'
import { prepPayload, fetchUser } from './utils'
import { userAuthenticated } from '../../services/redux/actions/auth'
import LoginAvatar from './img/ooloo-login-avatar.png'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Username',
      password: 'Password',
      status: {},
      togglePassword: false,
    }
    this.handleUsernameInput = this.handleUsernameInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
    this.toggleField = this.toggleField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleUsernameInput(text) {
    this.setState({
      username: text,
    })
  }

  handlePasswordInput(text) {
    this.setState({
      password: text,
    })
  }

  toggleField(field) {
    // removes placeholder text when user focuses on a field
    // add placeholder text back if length of field is zero after editing is finished
    if (field === 'username') {
      const { username } = this.state
      if (username.length === 0) {
        this.setState({ username: 'Username' })
      } else if (username.match(/Username/i)) {
        this.setState({ username: '' })
      }
    }

    if (field === 'password') {
      const { password } = this.state
      if (password.length === 0) {
        this.setState({ password: 'Password', togglePassword: false })
      } else if (password.match(/Password/i)) {
        this.setState({ password: '', togglePassword: true })
      }
    }
  }

  handleSubmit() {
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

  handleError() {
    this.setState({
      status: {
        error: {
          message:
            'There was an error processing your request. Please try again.',
        },
      },
    })
  }

  loginUser = async (username, password) => {
    console.log('username is ', username)
    console.log('password is ', password)
    const payload = prepPayload(username, password)

    try {
      const serverResponse = await fetchUser(payload)

      if (!serverResponse) {
        this.handleError()
      } else {
        this.storeToken(username, serverResponse)
      }
    } catch (err) {
      console.log('error from serverResponse ', err)
      this.handleError()
    }
  }

  storeToken = async (username, Authorization) => {
    const { authUser } = this.props

    // Store the credentials, returns a boolean
    const storeToken = await Keychain.setGenericPassword(
      username,
      Authorization,
    )

    console.log('did we store the token? ', storeToken)

    authUser(Authorization)

    await Keychain.resetGenericPassword() // Returns a boolean if Keychain was reset
  }

  render() {
    const { status, togglePassword } = this.state

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
            <View style={styles.usernameContainerStyle}>
              <TextInput
                style={styles.textInputStyles}
                placeholder={this.state.username}
                fontSize={17}
                autoCapitalize="none"
                value={this.state.username}
                onFocus={() => this.toggleField('username')}
                onChangeText={this.handleUsernameInput}
                onEndEditing={() => this.toggleField('username')}
                placeholderTextColor="#5c7a7b"
              />
            </View>

            <View style={styles.passwordContainerStyle}>
              <TextInput
                style={styles.textInputStyles}
                fontSize={16}
                autoCapitalize="none"
                secureTextEntry={togglePassword}
                value={this.state.password}
                onFocus={() => this.toggleField('password')}
                onChangeText={this.handlePasswordInput}
                onEndEditing={() => this.toggleField('password')}
                placeholderTextColor="#5c7a7b"
              />
            </View>
          </View>

          <View style={styles.errorContainerStyle}>
            <Text style={{ textAlign: 'center', color: '#f14169' }}>
              {status.error ? status.error.message : null}
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
              <Text style={{ fontSize: 16, textDecorationLine: 'underline' }}>
                Or Sign Up
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(
  null,
  { authUser: userAuthenticated },
)(Login)
