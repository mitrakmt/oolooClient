export const POST_USER_INTERESTS = 'POST_USER_INTERESTS'
export const SET_INTERESTS = 'SET_INTERESTS'

export const postInterests = interests => ({
  type: POST_USER_INTERESTS,
  payload: interests,
})

export const setInterests = interests => ({
  type: SET_INTERESTS,
  payload: interests,
})
