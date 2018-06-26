import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import styles from './styles'
import tracker from '../../services/analytics-tracker/analyticsTracker'
import { fetchLeaderboard, prepPayload } from './utils'

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'top players',
      users: [],
      schools: [],
    }
  }

  componentWillMount() {
    tracker.trackScreenView('Leaderboard')
    const payload = prepPayload(this.props.auth)
    fetchLeaderboard(payload).then(status => {
      this.setState(status)
    })
  }

  yourSchoolTab = () => {
    this.setState({
      activeTab: 'your school',
    })
  }

  topPlayersTab = () => {
    this.setState({
      activeTab: 'top players',
    })
  }

  handleResultsPress = () => {
    Actions.results()
  }

  render() {
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
                {this.state.users.map(player => (
                  <Text
                    key={`player${player.rank}/name${player.username}`}
                    style={
                      player.isYou
                        ? styles.myPlayersLeaderboardEntry
                        : styles.playersLeaderboardTextStyles
                    }
                  >
                    {`${player.rank}. ${player.username} (${player.points})`}
                  </Text>
                ))}
              </View>
            )}
            {this.state.activeTab === 'your school' && (
              <View style={styles.schoolLeaderboardStyles}>
                {this.state.schools.map(school => (
                  <Text
                    key={`school${school.rank}/name${school.name} (${
                      school.points
                    })`}
                    style={
                      school.isYourSchool
                        ? styles.mySchoolsLeaderboardEntry
                        : styles.schoolLeaderboardTextStyles
                    }
                  >
                    {`${school.rank}. ${school.name} (${school.points})`}
                  </Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.bottomContainerStyles}>
            <View style={styles.buttonContainerStyle}>
              <View style={styles.resultsButtonStyles}>
                <Button
                  onPress={this.handleResultsPress}
                  title="Results"
                  color="white"
                  accessibilityLabel="Home button for OOLOO Quiz App"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  }
}

Leaderboard.propTypes = {
  auth: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Leaderboard)
