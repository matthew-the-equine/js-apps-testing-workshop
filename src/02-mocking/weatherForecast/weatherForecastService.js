import seasonCalculator from './seasonCalculator'

const weatherForecastService = ({ dateService }) => subscriber => {
  const date = dateService()
  const localDate = date.toLocaleDateString()
  const season = seasonCalculator(date)

  const seasonEmoji = ({
    'spring': '🍃',
    'summer': '🌻',
    'fall': '🍂',
    'winter': '☃️',
  })[season]

  const forecast = `${seasonEmoji} [${localDate}] / 🌞 / 🌡️ [20*C 🤗]`
  subscriber(forecast)
}

export default weatherForecastService
