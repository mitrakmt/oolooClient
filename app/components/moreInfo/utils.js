const API_URL = `https://ooloo-api-dev.herokuapp.com/api`

export const prepPayload = (name, graduationYear) => {
  const body = JSON.stringify({
    name,
    graduationYear,
  })

  const payload = {
    mode: 'cors',
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  }

  return payload
}

export const saveUserData = async payload => {
  const serverResponse = await fetch(`${API_URL}/user`, payload)
    .then(response => {
      console.log('serverResponse inside fetch ', response)

      return response.json()
    })
    .then(user => user)

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
