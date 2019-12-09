import seasonCalculator from './seasonCalculator'

const emojiWeatherService = ({ dateService, forecastService }) => async subscriber => {
  const date = dateService()
  const localDate = date.toLocaleDateString()
  const season = seasonCalculator(date)

  const seasonEmoji = ({
    'spring': '🍃',
    'summer': '🌻',
    'fall': '🍂',
    'winter': '☃️',
  })[season]

  const { response: forecastResponse } = await forecastService('rainfall')

  const forecastEmoji = ({
    'rainfall': '🌧️',
  })[forecastResponse]

  const emojiForecast = `${seasonEmoji} [${localDate}] / ${forecastEmoji} / 🌡️ [20*C 🤗]`
  subscriber(emojiForecast)
}

export default emojiWeatherService
