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
}

const QAnswContainer = {
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

const questionContainer = {
  padding: '5%',
  fontWeight: '700',
}

const answersContainerStyle = {
  marginBottom: '3%',
}

const buttonStyles = {
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#A1A1A1',
  width: '85%',
  marginTop: '3%',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: 35, // fixed for dev, should be 'auto' for prod
}

export default {
  containerStyles,
  textContainerStyles,
  QAnswContainer,
  questionContainer,
  answersContainerStyle,
  buttonStyles,
}
