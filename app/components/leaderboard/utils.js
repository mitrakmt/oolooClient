const API_URL = `https://ooloo-api-dev.herokuapp.com/api`

export const prepPayload = token => {
  const payload = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }

  return payload
}

export const fetchLeaderboard = async payload => {
  const serverResponse = await fetch(`${API_URL}/leaderboard`, payload)
    .then(response => response.json())
    .then(leaderboards => leaderboards)

  return serverResponse
}
