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

  display: 'flex',
  justifyContent: 'space-between',
}

const gameTitleTextContainerStyles = {
  height: '40%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
}

const buttonContainerStyle = {
  height: '35%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginTop: 80,
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
  height: '35%',
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
}

const newsItemsContainerStyles = {
  display: 'flex',
  height: '50%',
  justifyContent: 'space-between',
}

export default {
  containerStyles,
  textContainerStyles,
  gameTitleContainerStyles,
  gameTitleTextContainerStyles,
  buttonContainerStyle,
  buttonStyles,
  newsContainerStyles,
  newsItemsContainerStyles,
}
