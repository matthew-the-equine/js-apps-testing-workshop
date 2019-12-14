import bodyParser from 'body-parser'

const runExpressApp = ({
  port = 3678,
}) => {
  const express = require('express')
  const app = express()

  app.use(bodyParser.json())

  app.get('/temperature', (req, res) => {
    if (req.body.unit === 'C') {
      return res.send({ temperature: 44 })
    }

    return res.send({ temperature: 111 })

  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

  return app
}

// 💡 Remember to unskip!
describe.skip('express app route', () => {
  it.only(`should respond with 44 when calling with 'C' unit`, () => {
    // 💪 just do it
  })
  it(`should respond with 111 when calling with 'F' unit`, () => {
    // 💪 just do it
  })
})
