const API_URL = `https://ooloo-api-dev.herokuapp.com/api`

export const prepGetPayload = token => {
  const payload = {
    mode: 'cors',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }

  return payload
}

export const getUser = async payload => {
  const serverResponse = await fetch(`${API_URL}/user`, payload)
    .then(response => response.json())
    .then(user => user)

  return serverResponse
}

export const getNews = async payload => {
  const serverResponse = await fetch(`${API_URL}/news`, payload)
    .then(response => response.json())
    .then(news => news.newsItems)

  return serverResponse
}
