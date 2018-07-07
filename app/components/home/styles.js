// Apply to containers for debugging layout
/*
const debuggingStyles = {
  borderWidth: 2,
  borderRadius: 25,
  borderColor: '#E18678',
}
*/

const colors = {
  buttonColor: '#01a38d',
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '90%',
}

const textContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const newsContainerStyles = {
  height: '40%',
  width: '55%',
  maxWidth: '55%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const newsHeaderContainer = {
  height: '20%',
}

const newsItemsContainerStyles = {
  display: 'flex',
  height: '75%',
  justifyContent: 'space-around',
}

const singleNewsItem = {
  display: 'flex',
  marginLeft: -20,
  marginRight: 10,
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

const avatarViewPlaceholder = {
  width: 50,
  height: 50,
  borderWidth: 1,
  borderRadius: 25,
  backgroundColor: 'rgba(1, 163, 141, .1)',
}

const singleNewsItemText = {
  marginLeft: '3%',
  color: '#344856',
  fontWeight: '800',
}

// Layout for bottomContainer will change with design changes
const bottomContainerStyles = {
  height: '40%',
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
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
  newsContainerStyles,
  newsHeaderContainer,
  singleNewsItem,
  newsItemsContainerStyles,
  playerAvatar,
  avatarViewPlaceholder,
  singleNewsItemText,
  bottomContainerStyles,
  buttonContainerStyle,
  buttonStyles,
}
