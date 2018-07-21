const colors = {
  softCyan: '#97d9d7',
  mediumCyan: '#00aa82',
  darkCyan: '#2f5658',
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
  height: '90%',
  marginTop: '3%',
  overflow: 'scroll',
}

const textContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 0,
  justifyContent: 'space-between',
}

const profileContainer = {
  backgroundColor: colors.white,
  height: '70%',
  width: '85%',
  borderRadius: 10,
  padding: 10,
  shadowColor: colors.softCyan,
  shadowOpacity: 900,
  shadowRadius: 20,
  shadowOffset: {
    height: 2,
    width: 2,
  },
}

const userInfoContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

const profileContainerText = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}

const profileImage = {
  width: '30%',
  height: '100%',
  marginRight: 30,
  borderRadius: 40,
}

const userInfoText = {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: '3%',
}

const userSubInfoText = {
  fontSize: 12,
  marginBottom: '3%',
}

const headerContainer = {
  height: '10%',
}

const interestsContainer = {
  padding: 20,
  paddingTop: 40,
}

const playerAvatar = {
  width: 75,
  height: 75,
  borderWidth: 1,
  borderRadius: 37,
  marginRight: 15,
}

const bottomContainerStyles = {
  height: '40%',
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const buttonContainerStyle = {
  height: '35%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
}

const buttonStyles = {
  borderRadius: 10,
  backgroundColor: colors.buttonColor,
  width: '50%',
  padding: '3%',
  marginLeft: 'auto',
  marginRight: 'auto',
}

export default {
  containerStyles,
  textContainerStyles,
  userInfoContainer,
  profileImage,
  profileContainer,
  headerContainer,
  userInfoText,
  userSubInfoText,
  profileContainerText,
  interestsContainer,
  bottomContainerStyles,
  buttonContainerStyle,
  buttonStyles,
  playerAvatar,
}
