export const MATCH_FOUND = 'MATCH_FOUND'

export const matchFound = interests => ({
  type: MATCH_FOUND,
  payload: interests,
})
