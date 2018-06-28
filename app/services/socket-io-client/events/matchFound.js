import { Actions } from 'react-native-router-flux'

const matchFound = ({ interests }, callback) => {
  console.log('interests inside matchFound ', interests)

  callback(interests) // send interests to Redux store
  Actions.matchFound()
}

export default matchFound
