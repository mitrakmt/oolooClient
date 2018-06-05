import React, { Component } from 'react'
import { TextInput, Text, View, Button } from 'react-native'
import * as EmailValidator from 'email-validator'
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
    let { username } = this.state
    const { password } = this.state
    username = EmailValidator.validate(username)

    console.log('does username have a legit email? ', username)

    if (username) {
      this.setState(
        {
          username: 'Username',
          password: '',
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
    const payload = prepPayload(username, password)

    try {
      const serverResponse = await fetchUser(payload)
      console.log('serverResponse is ', serverResponse)
      if (!serverResponse.Authorization) this.handleError()
    } catch (err) {
      console.log('error from serverResponse ', err)
      this.handleError()
    }
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
