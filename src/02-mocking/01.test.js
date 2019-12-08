// Zachmurzenie:
// 🌞
// ⛅ light
// 🌧️ rainfal
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

const weatherFactory = subscriber => () => {
  const forecast = `📅 [${(new Date()).toLocaleDateString()}] / 🌞 / 🌡️ [20*C 🤗]`
  subscriber(forecast)
}

describe(`weatherFactory`, () => {
  it(`should allow subscribing to the weather forcast and show default data`, () => {
    // given
    const subscriber = jest.fn()
    const runForecast = weatherFactory(subscriber)

    // when
    runForecast()

    // then
    // console.log(result)
    const forecast = subscriber.mock.calls[0][0]
    console.log({ forecast })
    expect(forecast.includes('📅')).toEqual(true)
    expect(forecast.includes('🌞')).toEqual(true)
    expect(forecast.includes('🌡️ [20*C 🤗]')).toEqual(true)
  })
})
