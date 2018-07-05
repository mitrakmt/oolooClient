import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TextInput,
  Text,
  View,
  Button,
  Animated,
  KeyboardAvoidingView,
} from 'react-native'
import SearchableDropDown from 'react-native-searchable-dropdown'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import styles from './styles'
import {
  prepPayload,
  saveUserData,
  createAnimatedStyles,
  prepGetPayload,
  getUser,
  getAvailableSchools,
} from './utils'
import tracker from '../../services/analytics-tracker/analyticsTracker'

class MoreInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graduationYear: '',
      name: '',
      university: '',
      availableSchools: [],
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
    const payload = prepGetPayload()
    this.getUserInfo()
    getAvailableSchools(payload).then(availableSchools => {
      this.setState({
        availableSchools: availableSchools.schools,
        name: this.props.user.name,
        university: this.props.user.university,
        graduationYear: this.props.user.graduationYear,
      })
    })
    tracker.trackScreenView('Edit user Info')
  }

  getUserInfo = async () => {
    const token = this.props.auth
    const payload = prepPayload(token)

    try {
      const getUserResponse = await getUser(payload)

      if (!getUserResponse) {
        this.handleError()
      } else {
        this.props.setUser(getUserResponse)
      }
    } catch (err) {
      this.handleError()
    }
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

  handleSchoolInput = school => {
    this.setState({
      university: school.name,
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
    const { name, graduationYear, university } = this.state

    this.saveUser(name, graduationYear, university)
  }

  handleError = () => {
    console.log('error')
  }

  saveUser = async (name, graduationYear, university) => {
    const token = this.props.auth
    const payload = prepPayload(token, name, graduationYear, university)

    try {
      const serverResponse = await saveUserData(payload)

      if (!serverResponse) {
        this.handleError()
      } else {
        Actions.profile()
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
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <View style={styles.containerStyles}>
          <Text
            style={{
              fontSize: 15,
              color: '#01a38d',
              marginBottom: '3%',
            }}
          >
            {' '}
            OOLOO
          </Text>
          <View style={styles.textContainerStyles}>
            <Text style={styles.headerTextStyles}>EDIT INFO</Text>
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
                  value={this.state.graduationYear.toString()}
                  onFocus={() => this.toggleField('graduationYear')}
                  onChangeText={this.handleGraduationYearInput}
                  onEndEditing={() => this.toggleField('graduationYear')}
                />
              </Animated.View>

              <SearchableDropDown
                onItemSelect={university => this.handleSchoolInput(university)}
                containerStyle={{
                  padding: 5,
                  width: '80%',
                  marginTop: 15,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                textInputStyle={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  zIndex: 1000,
                  borderRadius: 5,
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  zIndex: 1000,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{
                  color: '#222',
                }}
                itemsContainerStyle={{
                  maxHeight: 90,
                  backgroundColor: 'white',
                }}
                items={this.state.availableSchools}
                defaultIndex={2}
                placeholder={this.props.user.university || 'Select university'}
                resetValue={false}
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.buttonContainerStyle}>
              <View style={styles.buttonStyles}>
                <Button
                  onPress={this.handleSubmit}
                  title="Save"
                  color="white"
                  accessibilityLabel="Save user info"
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps({ auth, user }) {
  return {
    auth,
    user,
  }
}

MoreInfo.propTypes = {
  auth: PropTypes.string.isRequired,
  user: PropTypes.shape({
    graduationYear: PropTypes.number,
    name: PropTypes.string,
    university: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
}

MoreInfo.defaultProps = {
  user: {
    graduationYear: '',
    name: '',
    university: '',
  },
}

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoreInfo)
