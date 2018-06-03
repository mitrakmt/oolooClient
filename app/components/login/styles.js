const colors = {
  softCyan: '#97d9d7',
  darkCyan: '#2f5658',
  grayishBlue: '#aebcc5',
  white: '#ffffff',
  textInputColor: '#5c7a7b',
  buttonColor: '#01a38d',
}

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
}

const formStyles = {
  padding: 20,
  backgroundColor: colors.white,

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

const usernameContainerStyles = {
  borderBottomColor: colors.darkCyan,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderLeftWidth: 0,
  borderBottomWidth: 1.5,
  height: 50,
}

const passwordContainerStyle = {
  ...usernameContainerStyles,
  marginTop: '10%',
  marginLeft: '10%',
  marginRight: '10%',
  borderBottomColor: colors.grayishBlue,
}

const textInputStyles = {
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: '7%',
}

const buttonStyles = {
  borderRadius: 10,
  backgroundColor: colors.buttonColor,
  top: '25%',
  width: '50%',
  padding: '3%',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const styles = {
  containerStyles,
  formStyles,
  usernameContainerStyles,
  passwordContainerStyle,
  textInputStyles,
  buttonStyles,
}

export default styles
