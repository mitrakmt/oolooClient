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
  mediumCyan: '#00aa82',
  darkCyan: '#2f5658',
  white: '#ffffff',
  buttonText: '#304857',
  buttonColor: '#01a38d',
  answerSelection: '#18a28d',
}

const headerContainer = {
  height: '20%',
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '90%',
  marginTop: '3%',
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

  height: '70%',
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

const buttonContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

const leaderboardContainerStyle = {
  margin: 7,
}

const playerLeaderboardStyles = {}

const playersLeaderboardTextStyles = {
  fontSize: 12,
  fontWeight: '500',
  color: colors.darkCyan,
  marginBottom: '4%',
}

const schoolLeaderboardStyles = {
  marginLeft: 'auto',
}

const schoolLeaderboardTextStyles = {
  fontSize: 12,
  color: colors.darkCyan,
  fontWeight: '500',
  marginBottom: '4%',
  marginLeft: 'auto',
}

const mySchoolsLeaderboardEntry = {
  fontSize: 12,
  color: '#1a2d30',
  fontWeight: '700',
  marginBottom: '4%',
  marginLeft: 'auto',
}

const myPlayersLeaderboardEntry = {
  fontSize: 12,
  color: '#1a2d30',
  fontWeight: '700',
  marginBottom: '4%',
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

const resultsButtonStyles = {
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
  buttonContainer,
  leaderboardContainerStyle,
  buttonStyles,
  leaderboardContainer,
  playerLeaderboardStyles,
  schoolLeaderboardStyles,
  playersLeaderboardTextStyles,
  schoolLeaderboardTextStyles,
  headerTextStyles,
  selectedButtonStyles,
  myPlayersLeaderboardEntry,
  headerContainer,
  mySchoolsLeaderboardEntry,
  bottomContainerStyles,
  buttonContainerStyle,
  resultsButtonStyles,
}
