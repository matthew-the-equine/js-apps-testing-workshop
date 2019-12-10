import seasonCalculator from './seasonCalculator'
import wait from './wait'

const tenSeconds = 10000

const getRainfallResponse = async (rainfallService, forecastResponse) => {
  if (['sunny', 'snowfall', 'stormWithoutRain'].includes(forecastResponse)) {
    return null
  }

  try {
    // first call
    const { response: rainfallResponse } = await rainfallService(forecastResponse)
    return rainfallResponse
  } catch(error) {
    try {
      // second call in case of error
      await wait(tenSeconds)
      const { response: rainfallResponse } = await rainfallService(forecastResponse)
      return rainfallResponse
    } catch (error) {
      try {
        // third call in case of error
        await wait(tenSeconds)
        const { response: rainfallResponse } = await rainfallService(forecastResponse)
        return rainfallResponse
      } catch (error) {
        return null
      }
    }

  }
}

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

  const rainfallResponse = await getRainfallResponse(rainfallService, forecastResponse)
  const rainfallLevel = rainfallResponse ? ` [${rainfallResponse.toString()}mm]` : ''

  return `${seasonEmoji} [${localDate}] / ${forecastEmoji}${rainfallLevel} / 🌡️ [20*C 🤗]`
}

export default emojiWeatherService
