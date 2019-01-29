const colors = {
  softCyan: '#97d9d7',
  darkCyan: '#2f5658',
  grayishBlue: '#aebcc5',
  white: '#ffffff',
  titleColor: '#01a38d',
  textInputColor: '#5c7a7b',
  buttonColor: '#01a38d',
}

const headerContainer = {
  height: '20%',
}

const baseInputField = {
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderLeftWidth: 0,
  borderBottomWidth: 1.5,
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '98%',
}

const headerStyles = {
  height: '30%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const titleStyles = {
  color: colors.titleColor,
  fontSize: 55,
  marginBottom: '10%',
}

const imageVerbiageStyles = {
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',

  marginLeft: '12%',
  marginRight: '12%',
}

const formStyles = {
  backgroundColor: colors.white,

  display: 'flex',
  justifyContent: 'space-around',
  height: '65%',
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

const inputFieldsContainerStyle = {
  height: '50%',
  marginTop: 15,
}

const nameContainerStyle = {
  ...baseInputField,
  marginTop: '5%',
}

const graduationYearContainerStyle = {
  ...baseInputField,
  marginTop: '5%', // provides spacing between username & password input fields
}

const errorContainerStyle = {
  marginLeft: '10%',
  marginRight: '10%',
}

const buttonContainerStyle = {
  height: '35%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: 25,
  marginTop: 100,
}

const textInputStyles = {
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: 7,
  color: '#385557',
}

const buttonStyles = {
  borderRadius: 10,
  backgroundColor: colors.buttonColor,
  width: '50%',
  padding: '3%',
  marginTop: '3%',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const signUpTextStyles = {
  color: '#294c4e',
  fontSize: 16,
  marginTop: 10,
  textDecorationLine: 'underline',
  fontWeight: '800',
}

const backButton = {
  marginTop: 20,
}

const styles = {
  containerStyles,
  headerStyles,
  backButton,
  titleStyles,
  imageVerbiageStyles,
  headerContainer,
  formStyles,
  inputFieldsContainerStyle,
  nameContainerStyle,
  graduationYearContainerStyle,
  errorContainerStyle,
  buttonContainerStyle,
  textInputStyles,
  buttonStyles,
  signUpTextStyles,
}

export default styles
