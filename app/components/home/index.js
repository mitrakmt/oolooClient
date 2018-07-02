import React, { Component } from 'react'
import { TabBarIOS, Text, View, Button, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import AvatarIcon from '../assets/images/avatar_icon.png'
import styles from './styles'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    tracker.trackScreenView('Home')
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
            <View style={styles.singleNewsItem}>
              <Image style={styles.playerAvatar} source={AvatarIcon} />
              <Text style={styles.singleNewsItemText}>
                NYU just took over Top School!
              </Text>
            </View>

            <View style={styles.singleNewsItem}>
              <Image style={styles.playerAvatar} source={AvatarIcon} />
              <Text style={styles.singleNewsItemText}>
                Sammers00 just scored a 90% on the EKG Challenge!
              </Text>
            </View>

            <View style={styles.singleNewsItem}>
              <Image style={styles.playerAvatar} source={AvatarIcon} />

              <Text style={styles.singleNewsItemText}>
                waynescrew12 just took 2nd place on the leaderboard!
              </Text>
            </View>
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

export default Home
