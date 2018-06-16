const API_URL = `https://ooloo-api-dev.herokuapp.com/api`

export const prepPayload = () => {
  const payload = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token', // TODO: Get real token here
    },
  }

  return payload
}

export const fetchLeaderboard = async payload => {
  const serverResponse = await fetch(`${API_URL}/leaderboard`)
    .then(response => response.json())
    .then(leaderboards => leaderboards)

  return serverResponse
}
