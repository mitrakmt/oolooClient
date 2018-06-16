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
}

const textContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 0,
  justifyContent: 'space-between',
}

const headerTextStyles = {
  fontSize: 20,
  color: colors.darkCyan,
  marginBottom: '3%',
  fontWeight: '300',
}

const leaderboardContainer = {
  backgroundColor: colors.white,

  height: '75%',
  width: '85%',

  borderRadius: 10,
  paddingTop: 10,

  shadowColor: colors.softCyan,
  shadowOpacity: 900,
  shadowRadius: 20,
  shadowOffset: {
    height: 2,
    width: 2,
  },
}

const buttonStyles = {
  width: '40%',
  marginTop: '1%',
  marginRight: '3%',
  height: 43,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  backgroundColor: colors.white,
}

const selectedButtonStyles = {
  width: '40%',
  marginTop: '1%',
  marginRight: '3%',
  height: 43,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  backgroundColor: colors.buttonColor,
}

const buttonTextStyles = {
  fontSize: 20,
  fontWeight: '600',
  color: colors.darkCyan,
  marginTop: -13,
}

const selectedButtonTextStyles = {
  fontSize: 20,
  fontWeight: '600',
  backgroundColor: colors.mediumCyan,
  padding: 12,
  borderRadius: 10,
  marginTop: '5%',
  color: colors.white,
}

const buttonContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

const navButton = {
  backgroundColor: colors.blue,
  color: colors.white,
}

const questionContainer = {
  padding: '5%',
  fontWeight: '700',
}

const leaderboardContainerStyle = {
  margin: '7%',
}

const playerLeaderboardStyles = {}

const playersLeaderboardTextStyles = {
  fontSize: 16,
  fontWeight: '500',
  color: colors.darkCyan,
  marginBottom: '4%',
}

const schoolLeaderboardStyles = {
  marginLeft: 'auto',
}

const schoolLeaderboardTextStyles = {
  fontSize: 16,
  color: colors.darkCyan,
  fontWeight: '500',
  marginBottom: '4%',
  marginLeft: 'auto',
}

const mySchoolsLeaderboardEntry = {
  fontSize: 16,
  color: '#1a2d30',
  fontWeight: '700',
  marginBottom: '4%',
  marginLeft: 'auto',
}

const myPlayersLeaderboardEntry = {
  fontSize: 16,
  color: '#1a2d30',
  fontWeight: '700',
  marginBottom: '4%',
}

export default {
  containerStyles,
  textContainerStyles,
  buttonContainer,
  questionContainer,
  leaderboardContainerStyle,
  buttonStyles,
  navButton,
  leaderboardContainer,
  buttonTextStyles,
  playerLeaderboardStyles,
  schoolLeaderboardStyles,
  playersLeaderboardTextStyles,
  schoolLeaderboardTextStyles,
  headerTextStyles,
  selectedButtonTextStyles,
  selectedButtonStyles,
  myPlayersLeaderboardEntry,
  mySchoolsLeaderboardEntry,
}
