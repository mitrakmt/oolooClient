import { Actions } from 'react-native-router-flux'

const matchFound = ({ interests }, callback) => {
  callback(interests) // Send interests to Redux store
  Actions.matchFound()
}

export default matchFound
