import bodyParser from 'body-parser'

const temperatureRoute = (req, res) => {
  if (req.body.unit === 'C') {
    return res.send({ temperature: 44 })
  }

  return res.send({ temperature: 111 })
}

const runExpressApp = ({
  port = 3678,
}) => {
  const express = require('express')
  const app = express()

  app.use(bodyParser.json())

  app.get('/temperature', temperatureRoute)

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

  return app
}

describe.skip('express app route', () => {
  it(`should response with 44 when calling with 'C' unit`, () => {
    // given
    const body = { unit: 'C' }

    // when
    temperatureRoute({ body }, {
      send: response => {
        // then
        expect(response).toEqual({ temperature: 44 })
      },
    })
  })
  it(`should response with 111 when calling with 'F' unit`, () => {
    // given
    const body = { unit: 'F' }

    // when
    temperatureRoute({ body }, {
      send: response => {
        // then
        expect(response).toEqual({ temperature: 111 })
      },
    })
  })
})

// 📝 TODO: res.send vs return {}
