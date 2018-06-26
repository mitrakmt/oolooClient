const API_URL = `https://ooloo-api-dev.herokuapp.com/api`

export const prepPayload = token => {
  // change values in prod, only for testing
  const payload = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }

  return payload
}

export const getUser = async payload => {
  const apiPayload = payload
  apiPayload.method = 'GET'
  const serverResponse = await fetch(`${API_URL}/user`, apiPayload)
    .then(response => response.json())
    .then(user => user)

  return serverResponse
}

export const getInterests = async payload => {
  const apiPayload = payload
  apiPayload.method = 'GET'
  const serverResponse = await fetch(`${API_URL}/interest/list`, apiPayload)
    .then(response => response.json())
    .then(interests => interests)

  return serverResponse
}

export const getUserInterests = async payload => {
  const apiPayload = payload
  apiPayload.method = 'GET'
  const serverResponse = await fetch(`${API_URL}/interest`, apiPayload)
    .then(response => response.json())
    .then(interests => interests)

  return serverResponse
}

export const deleteInterest = async (payload, interestId) => {
  const apiPayload = payload
  apiPayload.method = 'DELETE'
  apiPayload.body = {
    interestId,
  }
  const serverResponse = await fetch(`${API_URL}/interest`, apiPayload)
    .then(response => response.json())
    .then(interests => interests)

  return serverResponse
}
