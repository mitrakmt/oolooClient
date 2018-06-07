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
}

const buttonStyles = {
  borderRadius: 10,
  backgroundColor: colors.buttonColor,
  width: '85%',
  padding: '3%',
  marginTop: '3%',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: 'auto',
}

export default {
  containerStyles,
  QAnswContainer,
  questionContainer,
  buttonStyles,
}
