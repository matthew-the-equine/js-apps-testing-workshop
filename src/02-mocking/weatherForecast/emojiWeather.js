import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchForecast } from '../weatherForecast/emojiWeather.store'
import { emojis } from './emojis'

const seasonSelector = state => state.season
const forecastResponseSelector = state => state.forecastResponse

const EmojiWeather = ({ season, forecastResponse, fetchForecast }) => {
  useEffect(() => {
    fetchForecast()
  }, [fetchForecast])

  const seasonEmoji = ({
    'spring': emojis.spring,
    'summer': emojis.summer,
    'fall': emojis.fall,
    'winter': emojis.winter,
  })[season]

  const forecastEmoji = ({
    'rainfall': emojis.rainfall,
    'stormWithRain': emojis.stormWithRain,
    'snowfall': emojis.snowfall,
  })[forecastResponse] || null

  const forecastString = `${seasonEmoji} [${(new Date()).toLocaleString()}] / ${forecastEmoji} / 🌡️ [20*C ${emojis.comfy}]`

  return (
    <div>
      {forecastString}
    </div>
  )
}

export default connect(
  state => ({
    season: seasonSelector(state),
    forecastResponse: forecastResponseSelector(state),
  }),
  {
    fetchForecast,
  },
)(EmojiWeather)
