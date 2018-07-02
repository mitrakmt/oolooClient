import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { Router, Scene } from 'react-native-router-flux'
import GamePlay from './components/gameplay'
import Home from './components/home'
import MatchSearch from './components/match-search'
import MatchFound from './components/match-found'
import Login from './components/login'
import Signup from './components/signup/signup'
import MoreInfo from './components/moreInfo/moreInfo'
import Leaderboard from './components/leaderboard/leaderboard'
import Results from './components/results'
import Profile from './components/profile/profile'

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
          key="signup"
          component={Signup}
          title="Signup"
          hideNavBar="true"
        />
        <Scene
          key="moreInfo"
          component={MoreInfo}
          title="More Info"
          hideNavBar="true"
        />
        <Scene
          key="home"
          component={Home}
          title="Home/Let's Play"
          hideNavBar="false"
        />

        <Scene
          key="matchSearch"
          component={MatchSearch}
          title="Match Search"
          hideNavBar="false"
        />

        <Scene
          key="matchFound"
          component={MatchFound}
          title="Match Found"
          hideNavBar="false"
        />

        <Scene
          key="profile"
          component={Profile}
          title="Profile"
          hideNavBar="false"
        />
        <Scene
          key="leaderboard"
          component={Leaderboard}
          title="Leaderboard"
          hideNavBar="false"
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
