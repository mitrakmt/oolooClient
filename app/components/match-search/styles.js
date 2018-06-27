// Apply to containers for debugging layout
/*
const debuggingStyles = {
  borderWidth: 2,
  borderRadius: 25,
  borderColor: '#E18678',
}
*/

const colors = {
  softCyan: '#97d9d7',
  white: '#ffffff',
  buttonText: '#304857',
  buttonColor: '#01a38d',
  answerSelection: '#18a28d',
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
}

const mainContainerStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '75%',
}

const textContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const searchingContainer = {
  backgroundColor: colors.white,
  height: 300,
  width: 300,
  borderRadius: 10,
  shadowColor: colors.softCyan,
  shadowOpacity: 900,
  shadowRadius: 20,
  shadowOffset: {
    height: 2,
    width: 2,
  },

  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
}

const findingHeader = {
  color: '#344756',
  fontSize: 20,
  fontWeight: '800',
}

const findingAvatar = {
  borderWidth: 3,
  borderRadius: 50,
  padding: '3%',
}

const playerAvatar = {
  width: 75,
  height: 75,
  borderWidth: 1,
  borderRadius: 37,
}

const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
}

const buttonStyles = {
  marginTop: '15%',
  borderRadius: 10,
  backgroundColor: colors.buttonColor,
  width: '50%',
  padding: '3%',
  marginLeft: 'auto',
  marginRight: 'auto',
}

export default {
  containerStyles,
  mainContainerStyles,
  textContainerStyles,
  searchingContainer,
  findingHeader,
  findingAvatar,
  playerAvatar,
  buttonContainerStyle,
  buttonStyles,
}
