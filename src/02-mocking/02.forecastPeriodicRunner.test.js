const forecastPeriodicRunner = runForecast => {
  setInterval(() => {
    runForecast().then(forecast => console.log(forecast))
  }, 1000)
}

describe.skip('forecast periodic runner', () => {
  // 💡 Example:
  it('should said hello', () => {
    let value
    const timerId = setInterval(() => { value = 'hello' }, 10000)
    // const secondTimerId = setTimeout(() => { value += ' there' }, 10000)

    expect(value).toEqual('hello')
    // expect(value).toEqual('hello there')
  })

  // 👉 TODO: Make the test pass
  it('should periodically run a callback', () => {
    // given
    const runForecast = jest.fn(() => Promise.resolve('🕺'))

    // when
    forecastPeriodicRunner(runForecast)

    // then
    expect(runForecast).toHaveBeenCalledTimes(3)
  })
})
