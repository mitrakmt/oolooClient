const colors = {
  softCyan: '#97d9d7',
  darkCyan: '#2f5658',
  grayishBlue: '#aebcc5',
  white: '#ffffff',
}

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
}

const formStyles = {
  padding: 20,
  backgroundColor: colors.white,

  top: '53%',
  height: '70%',
  width: '70%',
  borderRadius: 10,

  shadowColor: colors.softCyan,
  shadowOpacity: 900,
  shadowRadius: 20,
  shadowOffset: {
    height: 2,
    width: 2,
  },
}

const inputStyles = {
  borderBottomColor: colors.darkCyan,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderLeftWidth: 0,
  borderBottomWidth: 1.5,
  height: 50,
}

const styles = {
  containerStyles,
  formStyles,
  inputStyles,
}

export default styles
