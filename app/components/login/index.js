import React, { Component } from 'react'
import { TextInput, Text, View, Button } from 'react-native'
import * as EmailValidator from 'email-validator'
import * as Keychain from 'react-native-keychain'
import { prepPayload, fetchUser } from './utils'
import styles from './styles'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Username',
      password: '',
      status: {},
    }
    this.handleUsernameInput = this.handleUsernameInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
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

  handleSubmit() {
    let haveUser = this.state.username
    const { password } = this.state
    haveUser = EmailValidator.validate(haveUser)

    if (haveUser) {
      this.setState(
        {
          password: '',
        },
        () => this.loginUser('test@test.com', password), // use this.state.username in prod
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
    // Store the credentials, returns a boolean
    const storeToken = await Keychain.setGenericPassword(
      username,
      Authorization,
    )

    console.log('did we store the token? ', storeToken)

    await Keychain.resetGenericPassword() // Returns a boolean if Keychain was reset
  }

  render() {
    const { status } = this.state
    return (
      <View style={styles.containerStyles}>
        <View style={styles.formStyles}>
          <View style={styles.usernameContainerStyles}>
            <TextInput
              style={styles.textInputStyles}
              placeholder={this.state.username}
              value={this.state.username}
              fontSize={17}
              autoCapitalize="none"
              placeholderTextColor="#5c7a7b"
              onChangeText={this.handleUsernameInput}
            />
          </View>

          <View style={styles.passwordContainerStyle}>
            <TextInput
              style={styles.textInputStyles}
              value={this.state.password}
              fontSize={16}
              autoCapitalize="none"
              secureTextEntry="true"
              placeholderTextColor="#5c7a7b"
              onChangeText={this.handlePasswordInput}
            />
          </View>

          <View>
            <Text>{status.error ? status.error.message : null}</Text>
          </View>

          <View style={styles.buttonStyles}>
            <Button
              onPress={this.handleSubmit}
              title="Log in!"
              color="white"
              accessibilityLabel="Log in button for OOLOO Quiz App"
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Login
