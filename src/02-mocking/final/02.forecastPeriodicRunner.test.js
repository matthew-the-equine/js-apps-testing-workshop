const forecastPeriodicRunner = runForecast => {
  setInterval(() => {
    runForecast().then(forecast => console.log(forecast))
  }, 1000)
}

describe.skip('forecast periodic runner (final)', () => {
  it('should said hello', () => {
    // given
    jest.useFakeTimers()
    let value

    // when
    const timerId = setInterval(() => { value = 'hello' }, 10000)
    jest.advanceTimersByTime(10000)
    clearInterval(timerId)

    // and
    const secondTimerId = setTimeout(() => { value += ' there' }, 10000)
    jest.runAllTimers()
    clearTimeout(secondTimerId)

    // then
    expect(value).toEqual('hello there')
  })

  it('should periodically run a callback', () => {
    jest.useFakeTimers()

    const runForecast = jest.fn(() => Promise.resolve('🕺'))

    forecastPeriodicRunner(runForecast)

    jest.advanceTimersByTime(3000)

    expect(runForecast).toHaveBeenCalledTimes(3)
  })
})
