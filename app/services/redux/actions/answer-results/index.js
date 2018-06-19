export const QUESTION_ANSWERED = 'QUESTION_ANSWERED'

export const answeredCorrectly = (index, bool) => {
  const payload = {}

  payload[index] = `${bool}`

  return {
    type: QUESTION_ANSWERED,
    payload,
  }
}
