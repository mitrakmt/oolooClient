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
  height: '100%',
  marginTop: '3%',
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

  height: '75%',
  width: '85%',

  borderRadius: 10,
  padding: 20,

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
  height: '110%',
  marginRight: 30,
  borderRadius: 40,
}

const userInfoText = {
  fontSize: 16,
  fontWeight: '600',
}

const interestsContainer = {
  padding: 20,
  paddingTop: 40,
}

export default {
  containerStyles,
  textContainerStyles,
  userInfoContainer,
  profileImage,
  profileContainer,
  userInfoText,
  profileContainerText,
  interestsContainer,
}
