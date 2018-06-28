// Apply to containers for debugging layout

const debuggingStyles = {
  borderWidth: 2,
  borderRadius: 25,
  borderColor: '#E18678',
}

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
  justifyContent: 'space-around',
  height: '100%',
  marginTop: '5%',
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

const foundContainer = {
  backgroundColor: colors.white,
  height: 400,
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
  justifyContent: 'space-between',
  alignItems: 'center',
}

const topContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '60%',
}

const headerStyling = {
  color: '#344756',
  fontSize: 20,
  fontWeight: '800',
  textAlign: 'center',
}

const avatarFoundContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '85%',
}

const playerAvatar = {
  width: 75,
  height: 75,
  borderWidth: 1,
  borderRadius: 37,
}

const bottomContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '40%',
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

const roundStartsContainer = {
  height: '15%',
  display: 'flex',
  justifyContent: 'flex-start',
}

export default {
  debuggingStyles,
  containerStyles,
  mainContainerStyles,
  textContainerStyles,
  foundContainer,
  topContainer,
  headerStyling,
  avatarFoundContainer,
  playerAvatar,
  bottomContainer,
  buttonStyles,
  roundStartsContainer,
}
