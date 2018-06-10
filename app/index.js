import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { Router, Scene } from 'react-native-router-flux'
import GamePlay from './components/gameplay'
import Login from './components/login'
import Results from './components/results'
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
    <Router>
      <Scene key="root">
        <Scene
          initial
          key="login"
          component={Login}
          title="Login"
          hideNavBar="true"
        />
        <Scene
          key="gameplay"
          component={GamePlay}
          title="Game Play"
          hideNavBar="true"
        />

        <Scene
          key="results"
          component={Results}
          title="Results"
          hideNavBar="true"
        />
      </Scene>
    </Router>
  </Provider>
)

export default App
