import React, { Component } from 'react'
import { TextInput, View } from 'react-native'
import styles from './styles'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Username',
      password: 'Password',
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
              fontSize={20}
              placeholderTextColor="#5c7a7b"
            />
          </View>

          <View style={styles.passwordContainerStyle}>
            <TextInput
              style={styles.textInputStyles}
              placeholder={this.state.password}
              fontSize={16}
              placeholderTextColor="#5c7a7b"
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Login
