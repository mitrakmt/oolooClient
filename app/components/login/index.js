import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native'
import * as EmailValidator from 'email-validator'
import styles from './styles'
import { loginUser } from './utils'

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
