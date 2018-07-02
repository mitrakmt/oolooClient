import matchFound from './events/matchFound'
import gameStart from './events/gameStart'
import questionEvent from './events/question'
import gameResults from './events/gameResults'
import questionAnswered from './events/questionAnswered'
import answerResults from './events/answerResults'

// const TEMP_AUTH =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUyOTI5ODAzNX0.me_DL5FV7q8ueyp_7vpUZ19x5G7TQtYn2ZLrlFnZHhc'

const events = {
  matchFound,
  gameStart,
  questionEvent,
  gameResults,
  questionAnswered,
  answerResults,
}

export default events
