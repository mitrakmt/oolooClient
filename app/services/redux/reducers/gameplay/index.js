import { GAME_START } from '../../actions/gameplay'

const gameplayReducer = (state = 'No Player Index', action) => {
  switch (action.type) {
    case GAME_START:
      return action.payload

    default:
      return state
  }
}

export default gameplayReducer
