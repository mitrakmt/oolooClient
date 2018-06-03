import React, { Component } from 'react'
import { TextInput, View } from 'react-native'
import styles from './styles'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Username',
    }
  }

  render() {
    return (
      <View style={styles.containerStyles}>
        <View style={styles.formStyles}>
          <View style={styles.inputStyles}>
            <TextInput placeholder={this.state.username} />
          </View>
        </View>
      </View>
    )
  }
}

export default Login
