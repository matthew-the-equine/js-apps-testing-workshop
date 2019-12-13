import superagent from 'superagent'
import temperatureService from './weatherForecast/temperatureService'

jest.mock('superagent')

// 💡 Remember to unskip!
test.skip('Example: should fetch', async () => {
  const logger = {
    info: () => null,
  }

  const response = {
    temperature: 44,
  }
  const agent = {
    set: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnValue({ body: response }),
  }
  superagent.post.mockReturnValue(agent)

  // when
  const data = await temperatureService({url: 'localhost', logger})
    .getTemperature({ unit: 'C' })

  // then
  expect(data).toEqual(response)
  expect(agent.send.mock.calls[0][0]).toEqual({ unit: 'C' })
})

test.skip('📝 TODO example', () => {
  // ({ api = require('./api'))
})
