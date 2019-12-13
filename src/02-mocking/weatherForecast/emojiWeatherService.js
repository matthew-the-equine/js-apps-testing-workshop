import seasonCalculator from './seasonCalculator'
import wait from './wait'
import { emojis } from './emojis'

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
    'spring': emojis.spring,
    'summer': emojis.summer,
    'fall': emojis.fall,
    'winter': emojis.winter,
  })[season]

  const { response: forecastResponse } = await forecastService()

  const forecastEmoji = ({
    'rainfall': emojis.rainfall,
    'stormWithRain': emojis.stormWithRain,
    'snowfall': emojis.snowfall,
  })[forecastResponse]

  const rainfallResponse = await getRainfallResponse(rainfallService, forecastResponse)
  const rainfallLevel = rainfallResponse ? ` [${rainfallResponse.toString()}mm]` : ''

  return `${seasonEmoji} [${localDate}] / ${forecastEmoji}${rainfallLevel} / 🌡️ [20*C ${emojis.comfy}]`
}

export default emojiWeatherService
