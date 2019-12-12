// const express = require('express')
// const app = express()
// const port = 3678

// app.get('/temperature', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// export default app

import request from 'superagent'

const INTERNAL_SERVER_ERROR = 500
class HttpError extends Error {
  constructor(message, httpStatusCode = INTERNAL_SERVER_ERROR, details = null) {
    super(message)

    this.name = 'HttpError'
    Error.captureStackTrace(this, this.constructor)

    this.httpStatusCode = httpStatusCode
    this.details = details
  }
}
const BAD_GATEWAY_STATUS_CODE = 502
const BAD_REQUEST_STATUS_CODE = 400
const BadGatewayError = (message, details) => new HttpError(message, BAD_GATEWAY_STATUS_CODE, details)
const BadRequestError = (message, details) => new HttpError(message, BAD_REQUEST_STATUS_CODE, details)

const temperatureService = ({ url, authorizationHeader, logger }) => {
  const isConnectivityError = errorCode => [
    'ENOTFOUND',
    'ECONNRESET',
    'ECONNREFUSED',
    'ETIMEDOUT',
  ].includes(errorCode)

  const getTemperature = async ({ unit }) => {
    try {
      const { body } = await request
        .post(url)
        .set('Authorization', authorizationHeader)
        .send({ unit })

      return body
    } catch (error) {
      logger.info(error)

      if (isConnectivityError(error.code)) {
        throw BadGatewayError(`Error connecting to the temperature service`)
      }

      throw BadRequestError('Error parsing the unit')
    }
  }

  return { getTemperature }
}

export default temperatureService




