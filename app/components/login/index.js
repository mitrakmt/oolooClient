import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native'
import * as EmailValidator from 'email-validator'
import styles from './styles'

const API_URL = `https://ooloo-api.herokuapp.com/api`

const prepPayload = (username, password) => {
  const body = JSON.stringify({
    email: username !== 'test@test.com' ? 'test@test.com' : username,
    password: password.length > 1 ? 'password' : password,
  })

  const payload = {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }

  return payload
}

const loginUser = async (username, password) => {
  const payload = prepPayload(username, password)

  try {
    const serverResponse = await fetch(`${API_URL}/user/login`, payload).then(
      response => {
        console.log('serverResponse inside fetch ', response)

        return response.json()
      },
    )

    console.log('the serverResponse is ', serverResponse)
  } catch (error) {
    console.log('error from serverResponse ', error)
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Username',
      password: '',
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
        () => loginUser(username, password),
      )
    }
  }

  render() {
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
