const colors = {
  buttonColor: '#01a38d',
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

const gameTitleContainerStyles = {
  width: '50%',
  height: '28%',
  // marginLeft: 'auto',
  // marginRight: 'auto',
  borderWidth: 2,
  borderRadius: 25,
  borderColor: '#E18678',
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

const newsContainerStyles = {
  height: '40%',
  width: '90%',
  borderWidth: 1,
}

export default {
  containerStyles,
  textContainerStyles,
  gameTitleContainerStyles,
  buttonContainerStyle,
  buttonStyles,
  newsContainerStyles,
}
