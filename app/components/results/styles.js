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
  backgroundColor: colors.white,

  height: '70%',
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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',

  height: '25%',
}

const playerAvatar = {
  width: 75,
  height: 75,
  borderWidth: 1,
  borderRadius: 37,
}

export default {
  containerStyles,
  textContainerStyles,
  ResultsContainer,
  versusContainer,
  playerAvatar,
}
