const API_URL = `https://ooloo-api-dev.herokuapp.com/api`

export const prepPayload = (username, password) => {
  // change values in prod, only for testing
  const body = JSON.stringify({
    email: username,
    password,
  })

  const payload = {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }

  return payload
}

export const fetchUser = async payload => {
  const serverResponse = await fetch(`${API_URL}/user/login`, payload)
    .then(response => {
      console.log('serverResponse inside fetch ', response)

      return response.json()
    })
    .then(token => token.Authorization)

  return serverResponse
}
