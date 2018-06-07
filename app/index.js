import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import GamePlay from './components/gameplay'
import rootReducer from './services/redux/reducers'

const environment = 'Development'
const devMiddleware = []

if (environment === 'Development') {
  const logger = createLogger({
    logErrors: true,
  })

  devMiddleware.push(logger)
}

const createStoreWithMiddleware = applyMiddleware(...devMiddleware)(createStore)
const store = createStoreWithMiddleware(rootReducer)
const App = () => (
  <Provider store={store}>
    <GamePlay />
  </Provider>
)

export default App
