
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
const snowfallEmoji = '🌨️'
const rainfallEmoji =  '🌧️'
const stormWithRainEmoji = '⛈️'
const stormWithoutRainEmoji = '🌩️'

// 💡 Note: The service implementation is stupid sometimes, it mimics the real life examples
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

  ;[
    { forecastResponse: 'sunny', expectedEmoji: sunnyEmoji },
    { forecastResponse: 'stormWithoutRain', expectedEmoji: stormWithoutRainEmoji },
    { forecastResponse: 'snowfall', expectedEmoji: snowfallEmoji },
  ].forEach(({ forecastResponse, expectedEmoji }) => {
    it(`should not show rainfall levels when the forecast is ${forecastResponse}`, async () => {
      // given
      const summerDate = new Date('2019-08-01')
      const dateService = () => summerDate
      const forecastService = () => Promise.resolve(({ response: forecastResponse }))
      const rainfallService = jest.fn()

      const runForecast = emojiWeatherService({ dateService, forecastService, rainfallService })

      // when
      const forecast = await runForecast()

      // then
      const rainfallLevelsText = 'mm]'
      expect(forecast.includes(rainfallLevelsText)).not.toEqual(true)
      expect(rainfallService.mock.calls.length).toEqual(0)
    })
  })

  // Note: The Rainfall Service(tm) communicates with an IoT device to check the levels
  // When it's really rainy and wet, the device occasionally fails
  // In this situatio the support team suggests calling the service again after 10 second
  // If you retried 3 times then the device is probably dead and you should stop calling the service
  // Just call the support and they will replace the device :)
  // This test should handle the retries

  // Wait for promises running in the non-async timer callback to complete.
  // From https://stackoverflow.com/a/58716087/308237
  const flushPromises = () => new Promise(resolve => setImmediate(resolve))

  it(`should omit displaying raifall level when rainfall service fails to respond after third retry`, async () => {
    // given
    jest.useFakeTimers()

    const summerDate = new Date('2019-08-01')
    const dateService = () => summerDate
    const forecastService = () => Promise.resolve(({ response: 'rainfall' }))
    const rainfallService = jest.fn()
      .mockImplementationOnce(() => Promise.reject('first error'))
      .mockImplementationOnce(() => Promise.reject('second error'))
      .mockImplementationOnce(() => Promise.reject('third error'))

    const runForecast = emojiWeatherService({ dateService, forecastService, rainfallService })

    // when
    const promise = runForecast()
    // 🤮
    await flushPromises()
    jest.runAllTimers()
    await flushPromises()
    jest.runAllTimers()

    const forecast = await promise

    // then
    const rainfallLevelsText = 'mm]'
    expect(rainfallService.mock.calls[0][0]).toEqual('rainfall')
    expect(rainfallService.mock.calls[1][0]).toEqual('rainfall')
    expect(rainfallService.mock.calls[2][0]).toEqual('rainfall')
    expect(forecast.includes(rainfallLevelsText)).not.toEqual(true)
  })

  it(`should display rainfall level  when rainfall service fails to respond two times but then returns the response`, async () => {
    // given
    jest.useFakeTimers()

    const summerDate = new Date('2019-08-01')
    const dateService = () => summerDate
    const forecastService = () => Promise.resolve(({ response: 'rainfall' }))
    const rainfallService = jest.fn()
      .mockImplementationOnce(() => Promise.reject('first error'))
      .mockImplementationOnce(() => Promise.reject('second error'))
      .mockImplementationOnce(() => Promise.resolve(({ response: 10 })))

    const runForecast = emojiWeatherService({ dateService, forecastService, rainfallService })

    // when
    const promise = runForecast()
    // 🤮
    await flushPromises()
    jest.advanceTimersByTime(10000)
    await flushPromises()
    jest.advanceTimersByTime(10000)

    const forecast = await promise

    // then
    expect(rainfallService.mock.calls[0][0]).toEqual('rainfall')
    expect(rainfallService.mock.calls[1][0]).toEqual('rainfall')
    expect(rainfallService.mock.calls[2][0]).toEqual('rainfall')
    expect(forecast.includes('[10mm]')).toEqual(true)
  })

  it(`should not retry third time when rainfall service responds with success on a second call`, async () => {
    // given
    jest.useFakeTimers()

    const summerDate = new Date('2019-08-01')
    const dateService = () => summerDate
    const forecastService = () => Promise.resolve(({ response: 'rainfall' }))
    const rainfallService = jest.fn()
      .mockImplementationOnce(() => Promise.reject('first error'))
      .mockImplementationOnce(() => Promise.resolve(({ response: 10 })))

    const runForecast = emojiWeatherService({ dateService, forecastService, rainfallService })

    // when
    const promise = runForecast()
    // 🤮
    await flushPromises()
    jest.advanceTimersByTime(10000)

    const forecast = await promise

    // then
    expect(rainfallService.mock.calls.length).toEqual(2)
    expect(rainfallService.mock.calls[0][0]).toEqual('rainfall')
    expect(rainfallService.mock.calls[1][0]).toEqual('rainfall')
    expect(forecast.includes('[10mm]')).toEqual(true)
  })

  it.todo('test error responses')
  it.todo('temperature response')
  it.todo('show test without fake timers')
  it.todo('or maybe forecastService should make decisions randomly / separate test suite?')
  it.todo('add database')
  it.todo('add service authentication !')
  it.todo('not every emoji is checked and it works :wink:')
  it.todo('should handle rainfall service timeouts')

  it.todo('Exercise: move the conditional logic of checking rainfall to the rainfallService itself')
  it.todo('Exercise: uncomment the real implementation of the rainfallService that will ruin the tests')
  it.todo('Exercise: add logger')
  it.todo('Exercise: forecastService should make decisions based on date but you cant see it in test :) / separate test suite?')
  it.todo('Advanced Exercise: there are no real services :) you might want to implement them... test first #tddftw http://www.extremeprogramming.org/rules/testfirst.html')
})
