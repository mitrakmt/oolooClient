import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { LineChart, Grid, XAxis } from 'react-native-svg-charts'
/* eslint-disable import/no-extraneous-dependencies */
import * as scale from 'd3-scale' // DO NOT REMOVE eslint-disable comments!
/* eslint-enable import/no-extraneous-dependencies */
import { generateRandomKey } from '../utils'

const InterestsLineChart = ({ results }) => {
  const dataObj = results.data

  const dataKeys = Object.keys(dataObj)

  const daysOfWeek = {
    0: 'M',
    1: 'T',
    2: 'W',
    3: 'Th',
    4: 'F',
    5: 'Sat',
    6: 'Sun',
  }

  return dataKeys.map(key => {
    const randomKey = generateRandomKey(key, 'LineChart')

    return (
      <View key={randomKey} style={{ marginBottom: '15%' }}>
        <Text style={{ textAlign: 'center', fontWeight: '800' }}>{key}</Text>
        <LineChart
          style={{ height: 200, width: 'auto' }}
          data={dataObj[key]}
          svg={{ stroke: 'rgb(52,71,86)', width: 10 }}
          contentInset={{ bottom: 30 }}
          gridMin={0} // Secret Sauce: what enables showing all the bars
          bandwidth={5}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginTop: '1.5%' }}
          scale={scale.scaleBand}
          data={dataObj[key]}
          formatLabel={(value, index) =>
            `${Math.round(dataObj[key][index] * 100)}%`
          }
          svg={{ fontSize: 12, fill: 'black' }}
        />
        <XAxis
          style={{ marginTop: '1.5%' }}
          scale={scale.scaleBand}
          data={dataObj[key]}
          formatLabel={(value, index) => `${daysOfWeek[index]}`}
          svg={{ fontSize: 12, fill: 'black' }}
        />
      </View>
    )
  })
}

InterestsLineChart.propTypes = {
  results: PropTypes.shape({
    data: PropTypes.shape({
      Biology: PropTypes.array,
      'Master Of Nothing': PropTypes.array,
      Medicine: PropTypes.array,
      Radiology: PropTypes.array,
    }),
    time: PropTypes.string,
  }).isRequired,
}

export default InterestsLineChart
