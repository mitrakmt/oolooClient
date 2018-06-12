const generateRandomKey = (choice, questionNumber) => {
  const randomNumber = Math.floor(Math.random() * 10000)
  return `${choice}-${randomNumber.toString()}-${questionNumber}-key`
}

export default generateRandomKey
