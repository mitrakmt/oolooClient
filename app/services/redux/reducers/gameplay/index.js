import { GAME_START } from '../../actions/gameplay'

const initialState = {
  duration: null,
  numberOfQuestions: null,
  playerIndex: null,
  startTime: null,
  usernames: {},
  gameStarted: false,
}

const gamePlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_START:
      return action.payload

    default:
      return state
  }
}

export default gamePlayReducer
