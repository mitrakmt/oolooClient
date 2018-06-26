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
const baseStatsPositioning = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
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
  justifyContent: 'space-between',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const ResultsContainer = {
  display: 'flex',
  justifyContent: 'space-around',

  backgroundColor: colors.white,
  padding: '1%',

  height: '75%', // originally 70%
  width: '85%',

  borderRadius: 10,

  shadowColor: colors.softCyan,
  shadowOpacity: 900,
  shadowRadius: 20,
  shadowOffset: {
    height: 2,
    width: 2,
  },
}

const versusContainer = {
  ...baseStatsPositioning,
  marginTop: '5%',
  height: 'auto', // originally 30%
}

const avatarContainer = {
  width: '35%',
  display: 'flex',
  alignItems: 'center',
}

const playerAvatar = {
  width: 75,
  height: 75,
  borderWidth: 1,
  borderRadius: 37,
}

const statContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: '8%',
}

const statColContainer = {
  display: 'flex',
  alignItems: 'center',
  height: 'auto',
  justifyContent: 'space-around',
}

const buttonContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
}

const buttonStyles = {
  borderRadius: 10,
  backgroundColor: colors.buttonColor,
  width: 'auto',
  padding: '2%',
  marginLeft: 'auto',
  marginRight: 'auto',
}

export default {
  containerStyles,
  textContainerStyles,
  ResultsContainer,
  versusContainer,
  avatarContainer,
  playerAvatar,
  statContainer,
  statColContainer,
  buttonContainer,
  buttonStyles,
}
