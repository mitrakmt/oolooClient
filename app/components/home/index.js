import React, { Component } from 'react'
import { TabBarIOS, Text, View, Button, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import tracker from '../../services/analytics-tracker/analyticsTracker'
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
    Actions.gameplay()
  }

  renderHomeView() {
    return (
      <View style={styles.containerStyles}>
        <View style={styles.textContainerStyles}>
          <Text style={{ fontSize: 15, color: '#01a38d', marginBottom: '3%' }}>
            {' '}
            OOLOO
          </Text>
          <Text style={{ fontSize: 33, color: '#344856', fontWeight: '300' }}>
            HEAD TO HEAD TRIVIA
          </Text>
        </View>

        <View style={styles.gameTitleContainerStyles}>
          <View style={styles.gameTitleTextContainerStyles}>
            <Text style={{ fontSize: 20, color: '#344856', fontWeight: '700' }}>
              Game title
            </Text>

            <Text style={{ color: '#344856' }}>Description of game</Text>
          </View>

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

        <View style={styles.newsContainerStyles}>
          <View>
            <Text style={{ fontSize: 35, color: '#344856', fontWeight: '300' }}>
              News
            </Text>
          </View>

          <View style={styles.newsItemsContainerStyles}>
            <View style={styles.singleNewsItem}>
              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/150/150/any' }}
              />
              <Text style={styles.singleNewsItemText}>
                NYU just took over Top School!
              </Text>
            </View>

            <View style={styles.singleNewsItem}>
              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/150/150/any' }}
              />
              <Text style={styles.singleNewsItemText}>
                Sammers00 just scored a 90% on the EKG Challenge!
              </Text>
            </View>

            <View style={styles.singleNewsItem}>
              <Image
                style={styles.playerAvatar}
                source={{ url: 'https://placeimg.com/150/150/any' }}
              />
              <Text style={styles.singleNewsItemText}>
                waynescrew12 just took 2nd place on the leaderboard!
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          iconName="home"
          iconSize={20}
          // onPress={ () => this._setSelectedTab('home') }
          selected
          title="home"
        >
          {this.renderHomeView()}
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

export default Home
