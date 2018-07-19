import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { TabBarIOS, Text, View, Button, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import AvatarIcon from '../assets/images/avatar_icon.png'
import { getNews, prepGetPayload, getUser } from './utils'
import styles from './styles'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
    }
  }

  componentWillMount() {
    const token = this.props.auth
    const payload = prepGetPayload(token)
    getNews(payload).then(news => {
      this.setState({
        news,
      })
    })
    this.getUserInfo()
    tracker.trackScreenView('Home')
  }

  getUserInfo = async () => {
    const token = this.props.auth
    const payload = prepGetPayload(token)

    try {
      const getUserResponse = await getUser(payload)

      if (!getUserResponse) {
        this.handleError()
      } else {
        this.props.setUser(getUserResponse)
      }
    } catch (err) {
      this.handleError()
    }
  }

  handlePlayPress = () => {
    Actions.matchSearch()
  }

  renderHomeView() {
    return (
      <View style={styles.containerStyles}>
        <View style={styles.textContainerStyles}>
          <Text style={{ fontSize: 15, color: '#01a38d', marginTop: '6%' }}>
            {' '}
            OOLOO
          </Text>
        </View>

        <View style={styles.newsContainerStyles}>
          <View style={styles.newsHeaderContainer}>
            <Text style={{ fontSize: 35, color: '#344856', fontWeight: '300' }}>
              News
            </Text>
          </View>

          <View style={styles.newsItemsContainerStyles}>
            {this.state.news.map(newsItem => (
              <View
                style={styles.singleNewsItem}
                key={`newsItem-homeScreen-${newsItem.content}`}
              >
                <Image style={styles.playerAvatar} source={AvatarIcon} />
                <Text style={styles.singleNewsItemText}>
                  {newsItem.content}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomContainerStyles}>
          <View style={styles.buttonContainerStyle}>
            <View style={styles.buttonStyles}>
              <Button
                onPress={this.handlePlayPress}
                title="Play!"
                color="white"
                accessibilityLabel="Play button for OOLOO Quiz App"
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          iconSize={20}
          onPress={() => Actions.home()}
          title="Home"
          iconName="md-home"
          selectedIconName="md-home"
          selected
        >
          {this.renderHomeView()}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          iconSize={20}
          onPress={() => Actions.profile()}
          title="Profile"
          iconName="ios-person"
          selectedIconName="ios-person"
        >
          {this.renderHomeView()}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          iconSize={20}
          onPress={() => Actions.leaderboard()}
          title="Leaderboard"
          iconName="md-list"
          selectedIconName="md-list"
        >
          {this.renderHomeView()}
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: payload => {
    dispatch({ type: 'SET_USER', payload })
  },
})

Home.propTypes = {
  auth: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
