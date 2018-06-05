const API_URL = `https://ooloo-api-dev.herokuapp.com/api/`

export const prepPayload = (username, password) => {
  const body = JSON.stringify({
    email: username !== 'test@test.com' ? {} : username,
    password: password.length > 1 ? 'password' : password,
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
  const serverResponse = await fetch(`${API_URL}/user/login`, payload).then(
    response => {
      console.log('serverResponse inside fetch ', response)

      return response.json()
    },
  )

  return serverResponse
}
