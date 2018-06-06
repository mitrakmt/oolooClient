import React, { Component } from 'react'
import { TextInput, Text, View, Button } from 'react-native'
import * as EmailValidator from 'email-validator'
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import styles from './styles'
import { prepPayload, fetchUser } from './utils'
import { userAuthenticated } from '../../services/redux/actions/auth'

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
    let haveUser = this.state.username
    const { password } = this.state
    haveUser = EmailValidator.validate(haveUser)

    if (haveUser) {
      this.setState(
        {
          password: 'Password',
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
        <View style={styles.formStyles}>
          <View>
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

export default connect(
  null,
  { authUser: userAuthenticated },
)(Login)
