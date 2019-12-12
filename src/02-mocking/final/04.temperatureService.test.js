import nock from 'nock'
import service from '../weatherForecast/temperatureService'

const host = 'https://localhost:6000'
const endpoint = '/temperature'
const serviceUrl = `${host}${endpoint}`
const authorizationHeader = 'secret123'

const mockServer = () => nock(host)
  // lowercase 'authorization' by design
  .matchHeader('authorization', 'secret123')
  // .log(console.log) // uncomment if needed
  .post(endpoint)

describe.skip(`temperatureService`, () => {
  beforeEach(() => {
    nock.disableNetConnect()
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  it(`should call underlying http service`, async () => {
    // given
    const assert = mockServer().reply(200)

    // when
    await service({ url: serviceUrl, authorizationHeader }).getTemperature({})

    // then
    assert.done()
  })

  it(`should parse OK 200 response payload`, async () => {
    // given
    const sampleResponse = {
      temperature: 44,
    }
    const assert = mockServer().reply(200, sampleResponse)

    // when
    const response = await service({
      url: serviceUrl,
      authorizationHeader,
    }).getTemperature({ unit: 'C' })

    // then
    assert.done()
    expect(response).toEqual(sampleResponse)
  })

  it(`should parse Bad Request 400 response payload`, async () => {
    // given
    const assert = mockServer().reply(400)
    const logger = {
      info: jest.fn(),
    }

    // when
    try {
      await service({ url: serviceUrl, authorizationHeader, logger }).getTemperature({})
    } catch (error) {
      // then
      assert.done()
      expect(logger.info.mock.calls[0][0].name).toEqual('Error')
      expect(logger.info.mock.calls[0][0].status).toEqual(400)

      expect(error.name).toEqual('HttpError')
      expect(error.httpStatusCode).toEqual(400)

      return
    }

    expect.fail('the test should throw an error!')
  });

  [
    'ENOTFOUND',
    'ECONNRESET',
    'ECONNREFUSED',
    'ETIMEDOUT',
  ].forEach(errorCode => {
    it(`should parse service unavailable errors: ${errorCode}`, async () => {
      // given
      const assert = mockServer().replyWithError({ code: errorCode, name: errorCode })
      const logger = {
        info: jest.fn(),
      }

      // when
      try {
        await service({ url: serviceUrl, authorizationHeader, logger }).getTemperature({})
      } catch (error) {
        // then
        assert.done()
        expect(logger.info.mock.calls[0][0].name).toEqual(errorCode)
        expect(logger.info.mock.calls[0][0].code).toEqual(errorCode)
        // eslint-disable-next-line no-undefined
        expect(logger.info.mock.calls[0][0].status).toEqual(undefined)

        expect(error.name).toEqual('HttpError')
        expect(error.httpStatusCode).toEqual(502)
        expect(error.message.includes(serviceUrl)).toEqual(false) // the error should never include the url

        return
      }

      expect.fail('the test should throw an error!')
    })

    it.todo(`Test what happens when the authorization header doesn't match`)
    it.todo(`(optional): Implement the actual service and replace the mock, is it possible to test everything now?`)
  })
})
