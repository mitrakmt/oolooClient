const colors = {
  softCyan: '#97d9d7',
  darkCyan: '#2f5658',
  grayishBlue: '#aebcc5',
  white: '#ffffff',
  textInputColor: '#5c7a7b',
  buttonColor: '#01a38d',
}

const baseInputField = {
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderLeftWidth: 0,
  borderBottomWidth: 1.5,
  height: 50,
}

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
}

const formStyles = {
  backgroundColor: colors.white,

  display: 'flex',
  justifyContent: 'space-around',

  top: '53%',
  height: '70%',
  width: '70%',
  borderRadius: 10,

  shadowColor: colors.softCyan,
  shadowOpacity: 900,
  shadowRadius: 20,
  shadowOffset: {
    height: 2,
    width: 2,
  },
}

const usernameContainerStyle = {
  borderBottomColor: colors.darkCyan,
  ...baseInputField,
  marginLeft: '7%',
  marginRight: '7%',
}

const passwordContainerStyle = {
  ...baseInputField,
  marginTop: '10%',
  marginLeft: '10%',
  marginRight: '10%',
  borderBottomColor: colors.grayishBlue,
}

const errorContainerStyle = {
  marginLeft: '10%',
  marginRight: '10%',
}

const textInputStyles = {
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: '7%',
}

const buttonStyles = {
  borderRadius: 10,
  backgroundColor: colors.buttonColor,
  width: '50%',
  padding: '3%',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const styles = {
  containerStyles,
  formStyles,
  usernameContainerStyle,
  passwordContainerStyle,
  errorContainerStyle,
  textInputStyles,
  buttonStyles,
}

export default styles
