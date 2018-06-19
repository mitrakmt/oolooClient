import { QUESTION_ANSWERED } from '../../actions/answer-results'

const initialState = {
  0: 'No Answer Provided',
  1: 'No Answer Provided',
  2: 'No Answer Provided',
  3: 'No Answer Provided',
  4: 'No Answer Provided',
  5: 'No Answer Provided',
  6: 'No Answer Provided',
  7: 'No Answer Provided',
  8: 'No Answer Provided',
  9: 'No Answer Provided',
}

const answerResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUESTION_ANSWERED:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default answerResultsReducer
