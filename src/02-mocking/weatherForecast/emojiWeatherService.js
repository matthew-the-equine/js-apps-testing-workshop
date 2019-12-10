import seasonCalculator from './seasonCalculator'

const emojiWeatherService = ({ dateService, forecastService }) => async () => {
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

  return `${seasonEmoji} [${localDate}] / ${forecastEmoji} / 🌡️ [20*C 🤗]`
}

export default emojiWeatherService
