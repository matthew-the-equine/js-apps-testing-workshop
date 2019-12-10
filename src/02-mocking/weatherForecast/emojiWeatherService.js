import seasonCalculator from './seasonCalculator'

const emojiWeatherService = ({
  dateService,
  forecastService,
  rainfallService,
}) => async () => {
  const date = dateService()
  const localDate = date.toLocaleDateString()
  const season = seasonCalculator(date)

  const seasonEmoji = ({
    'spring': '🍃',
    'summer': '🌻',
    'fall': '🍂',
    'winter': '☃️',
  })[season]

  const { response: forecastResponse } = await forecastService()

  const forecastEmoji = ({
    'rainfall': '🌧️',
    'stormWithRain': '⛈️',
    'snowfall': '🌨️',
  })[forecastResponse]

  const { response: rainfallResponse } = await rainfallService(forecastResponse)

  const rainfallLevel = rainfallResponse ? ` [${rainfallResponse.toString()}mm]` : ''

  return `${seasonEmoji} [${localDate}] / ${forecastEmoji}${rainfallLevel} / 🌡️ [20*C 🤗]`
}

export default emojiWeatherService
