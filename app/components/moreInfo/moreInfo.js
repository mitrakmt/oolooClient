import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Text, View, Button, Image, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import styles from './styles'
import { prepPayload, saveUserData, createAnimatedStyles } from './utils'
import tracker from '../../services/analytics-tracker/analyticsTracker'

import LoginAvatar from './img/ooloo-login-avatar.png'

class MoreInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graduationYear: '',
      name: '',
      onFocusName: false,
      onFocusGraduationYear: false,
      nameInput: {
        BorderColor: new Animated.Value(0),
        Height: new Animated.Value(0),
        Margin: new Animated.Value(0),
      },
      graduationYearInput: {
        BorderColor: new Animated.Value(0),
        Height: new Animated.Value(0),
        Margin: new Animated.Value(0),
      },
    }
  }

  componentWillMount() {
    tracker.trackScreenView('More Info - Signup')
  }

  startAnimation = (toValue, { BorderColor, Height, Margin }) => {
    let animationsArray = [BorderColor, Height, Margin]

    animationsArray = animationsArray.map(animation =>
      Animated.timing(animation, { toValue, duration: 200 }),
    )

    Animated.sequence(animationsArray).start()
  }

  handleNameInput = text => {
    this.setState({
      name: text,
    })
  }

  handleGraduationYearInput = text => {
    this.setState({
      graduationYear: text,
    })
  }

  toggleField = field => {
    // removes placeholder text when user focuses on a field
    // add placeholder text back if length of field is zero after editing is finished
    if (field === 'name') {
      const { onFocusName, nameInput } = this.state

      // toggle onFocus styling for username
      if (onFocusName === false) {
        this.setState({ onFocusName: true }, () => {
          this.startAnimation(1, nameInput)
        })
      } else {
        this.setState({ onFocusName: false }, () => {
          this.startAnimation(0, nameInput)
        })
      }
    }

    if (field === 'graduationYear') {
      const { onFocusGraduationYear, graduationYearInput } = this.state

      // toggle onFocus styling for username
      if (onFocusGraduationYear === false) {
        this.setState({ onFocusGraduationYear: true }, () => {
          this.startAnimation(1, graduationYearInput)
        })
      } else {
        this.setState({ onFocusGraduationYear: false }, () => {
          this.startAnimation(0, graduationYearInput)
        })
      }
    }
  }

  handleSubmit = () => {
    const { name, graduationYear } = this.state

    this.saveUser(name, graduationYear)
  }

  handleError = () => {
    console.log('error')
  }

  saveUser = async (name, graduationYear) => {
    const token = this.props.auth
    const payload = prepPayload(token, name, graduationYear)

    try {
      const serverResponse = await saveUserData(payload)

      if (!serverResponse) {
        this.handleError()
      } else {
        Actions.home()
      }
    } catch (err) {
      this.handleError()
    }
  }

  render() {
    const animatedNameStyles = createAnimatedStyles(this.state.nameInput)
    const animatedGraduationYearStyles = createAnimatedStyles(
      this.state.graduationYearInput,
    )

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
                Thanks for signing up! Almost there, just a bit more info needed
                please!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.formStyles}>
          <View style={styles.inputFieldsContainerStyle}>
            <Animated.View
              style={[styles.nameContainerStyle, animatedNameStyles]}
            >
              <TextInput
                style={styles.textInputStyles}
                placeholder="Name"
                fontSize={17}
                autoCapitalize="none"
                value={this.state.name}
                onFocus={() => this.toggleField('name')}
                onChangeText={this.handleNameInput}
                onEndEditing={() => this.toggleField('name')}
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.graduationYearContainerStyle,
                animatedGraduationYearStyles,
              ]}
            >
              <TextInput
                style={styles.textInputStyles}
                fontSize={17}
                placeholder="Graduation Year"
                autoCapitalize="none"
                value={this.state.email}
                onFocus={() => this.toggleField('graduationYear')}
                onChangeText={this.handleGraduationYearInput}
                onEndEditing={() => this.toggleField('graduationYear')}
              />
            </Animated.View>
          </View>

          <View style={styles.buttonContainerStyle}>
            <View style={styles.buttonStyles}>
              <Button
                onPress={this.handleSubmit}
                title="Done!"
                color="white"
                accessibilityLabel="Log in button for OOLOO Quiz App"
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  }
}

MoreInfo.propTypes = {
  auth: PropTypes.string.isRequired,
}

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoreInfo)
