const API_URL = `https://ooloo-api-prod.herokuapp.com/api`

export const prepPayload = (username, password, email, school) => {
  const body = JSON.stringify({
    username,
    password,
    email,
    school,
  })

  const payload = {
    mode: 'cors',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  }

  return payload
}

export const prepGetPayload = () => {
  const payload = {
    mode: 'cors',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  return payload
}

export const fetchUser = async payload => {
  const serverResponse = await fetch(`${API_URL}/user`, payload)
    .then(response => response.json())
    .then(token => token.Authorization)

  return serverResponse
}

export const getAvailableSchools = async payload => {
  const serverResponse = await fetch(`${API_URL}/school`, payload)
    .then(response => response.json())
    .then(schools => schools)

  return serverResponse
}

export const createAnimatedStyles = ({ BorderColor, Height, Margin }) => {
  const borderBottomColor = BorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#aebcc5', '#2f5658'],
  })

  const height = Height.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 60],
  })

  const margin = Margin.interpolate({
    inputRange: [0, 1],
    outputRange: ['15%', '7%'],
  })

  return {
    borderBottomColor,
    height,
    marginRight: margin,
    marginLeft: margin,
  }
}
