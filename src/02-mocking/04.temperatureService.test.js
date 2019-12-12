import nock from 'nock'
import service from './weatherForecast/temperatureService'

const host = 'https://localhost:6000'
const endpoint = '/temperature'
const serviceUrl = `${host}${endpoint}`
const authorizationHeader = 'secret123'

const mockServer = () => nock(host)
  // lowercase 'authorization' by design
  .matchHeader('authorization', 'secret123')
  // .log(console.log) // uncomment if needed
  .post(endpoint)

// 💡 Remember to unskip!
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
    // const sampleResponse = {
    //   temperature: 44,
    // }
    // server responds with a OK json

    // when
    // calling the service with example payload: { unit: 'C' }

    // then
    // the request was done
    // response matches sample response
  })

  it(`should parse Bad Request 400 response payload`, async () => {
    // given
    // server responds with Bad Request
    // we have a logger that logs the service errors

    // when
    // trying to call the service with incorrect {} payload

    // then
    // the request was done
    // logger logged the name of the Error
    // logger logged the status of the Error

    // and
    // the service returned HttpError
    // with http status code 400

    // 💡 you might need this if you use try/catch
    // expect.fail('the test should throw an error!')
  });

  [
    'ENOTFOUND',
    'ECONNRESET',
    'ECONNREFUSED',
    'ETIMEDOUT',
  ].forEach(errorCode => {
    it(`should parse service unavailable errors: ${errorCode}`, async () => {
      // given
      // server responds with specified error like: { code: errorCode, name: errorCode }
      // 💡 hint: use `replyWithError` nock method
      // we have a logger that logs the service errors

      // when
      // trying to call the service

      // then
      // the request was done
      // logger logged the name of the Error
      // logger logged the code of the Error
      // logger logged the status of the Error is undefined

      // and
      // the service returned HttpError
      // with http status code 502
      // the error message does not include the url of the service we are calling (end user shouldn't see it)

      // 💡 you might need this if you use try/catch
      // expect.fail('the test should throw an error!')
    })

    it.todo(`(optional): Test what happens when the authorization header doesn't match`)
    it.todo(`(optional): Implement the actual service and replace the mock, is it possible to test everything now?`)
  })
})
