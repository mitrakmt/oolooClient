import React, { Component } from 'react'
import { Button, Text, View, Animated } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './styles'
import tracker from '../../services/analytics-tracker/analyticsTracker'

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'top players',
    }
  }

  componentWillMount() {
    tracker.trackScreenView('Leaderboard')
  }

  yourSchoolTab = () => {
    // Animated.timing(this.state.buttonAnimation, {
    //   toValue: 0.5,
    // }).start()

    this.setState({
      activeTab: 'your school',
    })
  }

  topPlayersTab = () => {
    // Animated.timing(this.state.buttonAnimation, {
    //   toValue: 0.5,
    // }).start()

    this.setState({
      activeTab: 'top players',
    })
  }

  render() {
    // const interpolateBGColor = this.state.buttonAnimation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['#ffffff', 'teal'],
    // })
    // const animatedStyle = {
    //   backgroundColor: interpolateBGColor,
    // }
    const players = [
      {
        place: 1,
        name: 'Michael Mitrakos',
      },
      {
        place: 2,
        name: 'Mike Flores',
      },
      {
        place: 3,
        name: 'Drew Neillie',
      },
      {
        place: 4,
        name: 'Bob Jones',
      },
      {
        place: 5,
        name: 'Sidney Crosby',
      },
      {
        place: 6,
        name: 'James Baldwin',
      },
      {
        place: 7,
        name: 'Gabe Mitrakos',
      },
      {
        place: 8,
        name: 'Bill Cower',
      },
      {
        place: 9,
        name: 'Sam James',
      },
      {
        place: 10,
        name: 'Rick James',
      },
      {
        place: 103,
        name: 'Your name',
      },
    ]
    const schools = [
      {
        place: 1,
        name: 'Miami University',
      },
      {
        place: 2,
        name: 'Ohio University',
      },
      {
        place: 3,
        name: 'Ohio State University',
      },
      {
        place: 4,
        name: 'Florida University',
      },
      {
        place: 5,
        name: 'Pittsburgh University',
      },
      {
        place: 6,
        name: 'Penn State University',
      },
      {
        place: 7,
        name: 'Azusa Pacific University',
      },
      {
        place: 8,
        name: 'California University',
      },
      {
        place: 9,
        name: 'San Diego University',
      },
      {
        place: 10,
        name: 'Austin University',
      },
      {
        place: 104,
        name: 'Your University',
      },
    ]
    return (
      <View style={styles.containerStyles}>
        <Text
          style={{
            fontSize: 15,
            color: '#01a38d',
            marginBottom: '3%',
          }}
        >
          {' '}
          OOLOO
        </Text>
        <View style={styles.textContainerStyles}>
          <Text style={styles.headerTextStyles}>LEADERBOARD</Text>
        </View>

        <View style={styles.leaderboardContainer}>
          <View style={styles.buttonContainer}>
            <View
              style={
                this.state.activeTab === 'top players'
                  ? styles.selectedButtonStyles
                  : styles.buttonStyles
              }
            >
              <Button
                onPress={this.topPlayersTab}
                title="Top Players"
                color={
                  this.state.activeTab === 'top players' ? 'white' : '#2f5658'
                }
                accessibilityLabel="Top Players"
              />
            </View>
            <View
              style={
                this.state.activeTab === 'your school'
                  ? styles.selectedButtonStyles
                  : styles.buttonStyles
              }
            >
              <Button
                onPress={this.yourSchoolTab}
                title="Your School"
                color={
                  this.state.activeTab === 'your school' ? 'white' : '#2f5658'
                }
                accessibilityLabel="Your School"
              />
            </View>
          </View>
          <View style={styles.leaderboardContainerStyle}>
            {this.state.activeTab === 'top players' && (
              <View style={styles.playerLeaderboardStyles}>
                {players.map((player, index) => (
                  <Text
                    key={`player${player.id}/name${player.name}`}
                    style={
                      index === players.length - 1
                        ? styles.myPlayersLeaderboardEntry
                        : styles.playersLeaderboardTextStyles
                    }
                  >
                    {`${player.place}. ${player.name}`}
                  </Text>
                ))}
              </View>
            )}
            {this.state.activeTab === 'your school' && (
              <View style={styles.schoolLeaderboardStyles}>
                {schools.map((school, index) => (
                  <Text
                    key={`school${school.id}/name${school.name}`}
                    style={
                      index === schools.length - 1
                        ? styles.mySchoolsLeaderboardEntry
                        : styles.schoolLeaderboardTextStyles
                    }
                  >
                    {`${school.place}. ${school.name}`}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    // auth,
    // leaderboard,
  }
}

Leaderboard.propTypes = {
  // auth: PropTypes.string.isRequired,
  // leaderboard: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps)(Leaderboard)
