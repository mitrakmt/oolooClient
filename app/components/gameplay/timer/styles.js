const timerOuterView = {
  flex: 1, // remove flex: 1 to adjust timerOuterView by width
  flexDirection: 'row',
  height: 30,
  marginLeft: '3%',
  marginRight: '7%',
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
