import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Login from './components/login'
import rootReducer from './services/redux/reducers'

const createStoreWithMiddleware = applyMiddleware()(createStore)

const App = () => (
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Login />
  </Provider>
)

export default App
