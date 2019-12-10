
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

import emojiWeatherService from './weatherForecast/emojiWeatherService'

// Season:
const springEmoji = '🍃'
const summerEmoji = '🌻'
const fallEmoji = '🍂'
const winterEmoji = '☃️'

// General:
const sunnyEmoji = '🌞'
const rainfallEmoji =  '🌧️'
const stormWithoutRainEmoji = '🌩️'
const stormWithRainEmoji = '⛈️'
const snowfallEmoji = '🌨️'

describe(`emojiWeatherService`, () => {
  it(`should allow subscribing to the weather forcast and show default emojis`, async () => {
    // given
    const runForecast = emojiWeatherService({
      dateService: () => new Date(),
      forecastService: () => Promise.resolve({ response: null }),
      rainfallService: () => Promise.resolve({ response: null }),
    })

    // when
    const forecast = await runForecast()

    // then
    console.log(forecast)

    const optimalTemperature = '🌡️ [20*C 🤗]'

    expect(forecast.includes(winterEmoji)).toEqual(true) // TODO: a mistake to fix
    // expect(forecast.includes(sunnyEmoji)).toEqual(true) // TODO: removed because other test covers it
    expect(forecast.includes(optimalTemperature)).toEqual(true)
  })

  it(`should show season emoji based on date`, async () => {
    // given
    const summerDate = new Date('2019-08-01')
    const dateService = () => summerDate
    const runForecast = emojiWeatherService({
      dateService,
      forecastService: () => Promise.resolve({ response: null }),
      rainfallService: () => Promise.resolve({ response: null }),
    })

    // when
    const forecast = await runForecast()

    // then
    console.log({ forecast })

    expect(forecast.includes(summerEmoji)).toEqual(true)
  })

  it(`should show forecast emoji based on the answer from the forecast service`, async () => {
    // given
    const summerDate = new Date('2019-08-01')
    const dateService = () => summerDate
    const forecastService = () => Promise.resolve({ response: 'snowfall' })
    const rainfallService = () => Promise.resolve({ response: null })

    const runForecast = emojiWeatherService({ dateService, forecastService, rainfallService })

    // when
    const forecast = await runForecast()

    // then
    console.log({ forecast })

    expect(forecast.includes(snowfallEmoji)).toEqual(true)
  })

  ;[
    { forecastResponse: 'rainfall', expectedEmoji: rainfallEmoji },
    { forecastResponse: 'stormWithRain', expectedEmoji: stormWithRainEmoji },
  ].forEach(({ forecastResponse, expectedEmoji }) => {
    it(`should show rainfall levels when the forecast is ${forecastResponse}`, async () => {
      // given
      const summerDate = new Date('2019-08-01')
      const dateService = () => summerDate
      const forecastService = () => Promise.resolve(({ response: forecastResponse }))
      const rainfallService = jest.fn(() => Promise.resolve(({ response: 10 })))

      const runForecast = emojiWeatherService({ dateService, forecastService, rainfallService })

      // when
      const forecast = await runForecast()

      // then
      console.log({ forecast })

      expect(forecast.includes(`${expectedEmoji} [10mm]`)).toEqual(true)
      expect(rainfallService.mock.calls[0][0]).toEqual(forecastResponse)
    })
  })

  it.skip(`should not show rainfall levels when it's not raining`, async () => {

  })

  it.todo('test error responses')
  it.todo('show test without fake timers')
  it.todo('forecastService can sometimes fail due to weather :)')
  it.todo('there are no real services :) where are they?')
  it.todo('forecastService should make decisions based on date but you cant see it in test :) / separate test suite?')
  it.todo('or maybe forecastService should make decisions randomly / separate test suite?')
  it.todo('add database')
  it.todo('add service authentication !')
})
