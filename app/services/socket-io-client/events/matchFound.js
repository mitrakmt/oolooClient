import { Actions } from 'react-native-router-flux'

const matchFound = ({ interests, playerIndex, usernames }, callback) => {
  // Create matchFound payload to display in MatchFound view
  const matchFoundObj = {}

  matchFoundObj.interests = interests

  usernames.forEach((name, idx) => {
    if (idx === playerIndex) {
      matchFoundObj.player = name
    } else {
      matchFoundObj.opponent = name
    }
  })

  callback(matchFoundObj) // Send matchFoundObj to Redux store

  Actions.matchFound()
}

export default matchFound