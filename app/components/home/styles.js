const colors = {
  buttonColor: '#01a38d',
}

// Apply to containers for debugging layout
const debuggingStyles = {
  borderWidth: 2,
  borderRadius: 25,
  borderColor: '#E18678',
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
}

const textContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const contentContainerStyles = {
  height: '40%',
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  ...debuggingStyles,
}

const newsHeaderContainer = {
  height: '20%',
  ...debuggingStyles,
}

const newsItemsContainerStyles = {
  display: 'flex',
  height: '75%',
  justifyContent: 'space-around',
  ...debuggingStyles,
}

const singleNewsItem = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
}

const playerAvatar = {
  width: 50,
  height: 50,
  borderWidth: 1,
  borderRadius: 25,
}

const singleNewsItemText = {
  marginLeft: '3%',
  color: '#344856',
  fontWeight: '800',
}

const gameTitleContainerStyles = {
  width: '50%',
  height: '28%',
  // borderWidth: 2,
  // borderRadius: 25,
  // borderColor: '#E18678',

  ...debuggingStyles,

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

export default {
  containerStyles,
  textContainerStyles,
  contentContainerStyles,
  newsHeaderContainer,
  singleNewsItem,
  newsItemsContainerStyles,
  playerAvatar,
  singleNewsItemText,

  gameTitleContainerStyles,
  gameTitleTextContainerStyles,
  buttonContainerStyle,
  buttonStyles,
}
