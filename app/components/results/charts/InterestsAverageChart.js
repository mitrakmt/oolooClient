import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { BarChart, Grid, XAxis } from 'react-native-svg-charts'
/* eslint-disable import/no-extraneous-dependencies */
import * as scale from 'd3-scale' // DO NOT REMOVE eslint-disable comments!
/* eslint-enable import/no-extraneous-dependencies */
import { generateRandomKey } from '../utils'

const fill = 'rgb(173, 216, 216)'

const InterestsAverageChart = ({ results }) => {
  const { data, keys } = results

  return data.map((dataArray, idx) => {
    const currentKeysArray = keys[idx]

    const randomKey = generateRandomKey(idx, 'InterestsAverageChart')

    return (
      <View key={randomKey} style={{ marginBottom: '15%' }}>
        <BarChart
          style={{ height: 200, width: 'auto' }}
          data={dataArray}
          svg={{ fill, width: 10 }}
          contentInset={{ bottom: 30 }}
          gridMin={0} // Secret Sauce: what enables showing all the bars
          bandwidth={5}
        >
          <Grid />
        </BarChart>
        <XAxis
          style={{ marginTop: '1.5%' }}
          scale={scale.scaleBand}
          data={dataArray}
          formatLabel={(value, index) =>
            `${Math.round(dataArray[index] * 100)}%`
          }
          svg={{ fontSize: 12, fill: 'black' }}
        />
        <XAxis
          scale={scale.scaleBand}
          data={currentKeysArray}
          formatLabel={(value, index) => currentKeysArray[index]}
          svg={{ fontSize: 12, fill: 'black' }}
        />
      </View>
    )
  })
}

InterestsAverageChart.propTypes = {
  results: PropTypes.shape({
    data: PropTypes.array,
    keys: PropTypes.array,
  }).isRequired,
}

export default InterestsAverageChart
