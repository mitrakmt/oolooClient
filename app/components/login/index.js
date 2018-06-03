import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native'
import * as EmailValidator from 'email-validator'
import styles from './styles'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Username',
      password: 'Password',
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
    const { username } = this.state

    const isEmail = EmailValidator.validate(username)

    console.log('does username have a legit email? ', isEmail)

    this.setState({
      username: 'Username',
      password: 'Password',
    })
  }

  render() {
    console.log('login state is ', this.state)
    return (
      <View style={styles.containerStyles}>
        <View style={styles.formStyles}>
          <View style={styles.usernameContainerStyles}>
            <TextInput
              style={styles.textInputStyles}
              placeholder={this.state.username}
              fontSize={17}
              autoCapitalize="none"
              placeholderTextColor="#5c7a7b"
              onChangeText={this.handleUsernameInput}
            />
          </View>

          <View style={styles.passwordContainerStyle}>
            <TextInput
              style={styles.textInputStyles}
              placeholder={this.state.password}
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
