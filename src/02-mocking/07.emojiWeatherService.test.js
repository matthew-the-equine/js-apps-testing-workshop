import emojiWeatherService from './weatherForecast/emojiWeatherService'
import { emojis } from './weatherForecast/emojis'

// 💡 Remember to unskip!
describe.skip(`emojiWeatherService`, () => {
  it(`should should show default temperature emoji`, async () => {
    // given
    const runForecast = emojiWeatherService({
      // setup only what's necessary
    })

    // when
    // running forecast

    // then
    // forecast includes default temperature
  })

  it(`should show season emoji based on date`, async () => {
    // given
    // date service returns summer date new Date('2019-08-01')
    // emoji weather service is set up

    // when
    // running forecast

    // then
    // forecast includes summer emoji
  })

  it(`should show forecast emoji based on the answer from the forecast service`, async () => {
    // given
    // date service returns summer date new Date('2019-08-01')
    // forecast service responds with snowfall
    // emoji weather service is set up

    // when
    // running forecast

    // then
    // forecast includes snowall emoji
  })

  ;[
    { forecastResponse: 'rainfall', expectedEmoji: emojis.rainfall },
    { forecastResponse: 'stormWithRain', expectedEmoji: emojis.stormWithRain },
  ].forEach(({ forecastResponse, expectedEmoji }) => {
    it(`should show rainfall levels when the forecast is ${forecastResponse}`, async () => {
      // given
      // date service returns summer date new Date('2019-08-01')
      // forecast service responds with expected data
      // rainfall service responds with 10
      // emoji weather service is set up

      // when
      // running forecast

      // then
      // forecast includes expected emoji
      // rainfall service is called with correct forecast response
    })
  })

  ;[
    { forecastResponse: 'sunny', expectedEmoji: emojis.sunny },
    { forecastResponse: 'stormWithoutRain', expectedEmoji: emojis.stormWithoutRain },
    { forecastResponse: 'snowfall', expectedEmoji: emojis.snowfall },
  ].forEach(({ forecastResponse, expectedEmoji }) => {
    it(`should not show rainfall levels when the forecast is ${forecastResponse}`, async () => {
      // given
      // date service returns summer date new Date('2019-08-01')
      // forecast service responds with expected data
      // rainfall service responds (yeah, just responds :))
      // emoji weather service is set up

      // when
      // running forecast

      // then
      // forecast does not include the rainfall levels text
      // rainfall service is not called
      // 🦖 How to make this pass?
      // expect(forecast.includes(`${expectedEmoji}`)).toEqual(true)
    })
  })

  // Note: The Rainfall Service(tm) communicates with an IoT device to check the levels
  // When it's really rainy and wet, the device occasionally fails
  // In this situation the support team suggests calling the service again after 10 seconds
  // If you retried 3 times and it's still failing then the device is probably dead and you should stop calling the service
  // Just call the support and they will replace the device :)
  // This test should handle the retries

  // 💡 Note: You need to wait for promises running in the non-async timer callback to complete.
  // From https://stackoverflow.com/a/58716087/308237
  // const flushPromises = () => new Promise(resolve => setImmediate(resolve))

  it(`should omit displaying raifall level when rainfall service fails to respond after third retry`, async () => {
    // given
    // using fake timers
    // date service returns summer date new Date('2019-08-01')
    // forecast service responds with rainfall
    // rainfallService rejects 3 times
    // 💡 Note: use can use mockImplementationOnce

    // emoji weather service is set up

    // when
    // const promise = runForecast()
    // 🤮
    // first retry
    // await flushPromises()
    // run timers

    // second retry
    // await flushPromises()
    // run timers

    // const forecast = await promise

    // then
    // rainfallservice is called 3 times
    // every time with a rainfall
    // forecast does not include the rainfall levels text
  })

  it(`should display rainfall level  when rainfall service fails to respond two times but then returns the response`, async () => {
    // given
    // using fake timers
    // date service returns summer date new Date('2019-08-01')
    // forecast service responds with rainfall
    // rainfallService rejects 3 times
    // and then responds with 10

    // emoji weather service is set up

    // when
    // const promise = runForecast()
    // 🤮
    // first retry
    // await flushPromises()
    // run timers

    // second retry
    // await flushPromises()
    // run timers

    // const forecast = await promise

    // then
    // rainfallservice is called 3 times
    // every time with a rainfall
    // forecast includes the rainfall levels text
  })

  it(`should not retry third time when rainfall service responds with success on a second call`, async () => {
    // given
    // using fake timers
    // date service returns summer date new Date('2019-08-01')
    // forecast service responds with rainfall
    // rainfall service rejects once
    // and then responds with 10

    // emoji weather service is set up

    // when
    // const promise = runForecast()
    // 🤮
    // await flushPromises()
    // jest.advanceTimersByTime(10000)

    // const forecast = await promise

    // then
    // rainfallservice is called 2 times
    // every time with a rainfall
    // forecast includes the rainfall levels text
  })

  it.todo('Exercise: not every emoji is checked and it the code works, implement missing test cases')

  it.todo('test error responses')
  it.todo('temperature response')
  it.todo('show test without fake timers')
  it.todo('or maybe forecastService should make decisions randomly / separate test suite?')
  it.todo('add database')
  it.todo('add service authentication !')
  it.todo('should handle rainfall service timeouts')

  it.todo('Exercise: move the conditional logic of checking rainfall to the rainfallService itself')
  it.todo('Exercise: uncomment the real implementation of the rainfallService that will ruin the tests')
  it.todo('Exercise: add logger')
  it.todo('Exercise: forecastService should make decisions based on date but you cant see it in test :) / separate test suite?')
  it.todo('Advanced Exercise: there are no real services :) you might want to implement them... test first #tddftw http://www.extremeprogramming.org/rules/testfirst.html')
})

// Waiting for better times:

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

