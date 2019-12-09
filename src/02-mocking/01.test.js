// General:
// 🌞
// ⛅ light rainfall
// 🌧️ rainfall
// 🌩️ storm without rain
// ⛈️ storm with rain
// 🌨️ snowfall

// 🌡️ Temperature:
// 🥶 temp <= 0
// 🤧 temp > 0 && temp <= 12
// 🤗 temp > 12 && temp <= 25
// 🙃 temp > 25 && temp <= 30
// 🥵 temp > 30

// 💧 Rainfall (mm/h) (light, moderate, heavy, violent):
// rainfall === 0
// rainfall < 2.5
// rainfall >= 2.5 && rainfall < 10
// rainfall >= 10 && rainfall < 50
// rainfall >= 50

// TODO use calendar emoji 📅

import weatherForecastService from './weatherForecast/weatherForecastService'

// Season:
const springEmoji = '🍃'
const summerEmoji = '🌻'
const fallEmoji = '🍂'
const winterEmoji = '☃️'

describe(`weatherForecastService`, () => {
  it(`should allow subscribing to the weather forcast and show default emojis`, () => {
    // given
    const subscriber = jest.fn()
    const runForecast = weatherForecastService({
      dateService: () => new Date(),
    })

    // when
    runForecast(subscriber)

    // then
    const forecast = subscriber.mock.calls[0][0]

    console.log(forecast)

    const sunnyDay = '🌞'
    const optimalTemperature = '🌡️ [20*C 🤗]'

    expect(forecast.includes(winterEmoji)).toEqual(true) // TODO: a mistake to fix
    expect(forecast.includes(sunnyDay)).toEqual(true)
    expect(forecast.includes(optimalTemperature)).toEqual(true)
  })

  it(`should show season emoji based on date`, () => {
    // given
    const summerDate = new Date('2019-08-01')
    const dateService = () => summerDate
    const subscriber = jest.fn()
    const runForecast = weatherForecastService({ dateService })

    // when
    runForecast(subscriber)

    // then
    const forecast = subscriber.mock.calls[0][0]

    console.log({ forecast })

    expect(forecast.includes(summerEmoji)).toEqual(true)
  })
})
