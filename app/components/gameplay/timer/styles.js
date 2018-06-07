const timerOuterView = {
  flex: 1, // timerOuterView is set to row, must specify flex: 1 so it can fill all available space
  flexDirection: 'row',
  height: 30,
  marginLeft: '5%',
  marginRight: '5%',
}

const borderView = {
  flex: 1,
  borderColor: '#000',
  borderWidth: 2,
  borderRadius: 4,
}

const timerAnimationStyles = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#128574',
}

export default {
  timerOuterView,
  borderView,
  timerAnimationStyles,
}
