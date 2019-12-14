import dbModule from './dbModule'

describe.skip('dbModule', () => {
  it(`should connect to a database when connection string is provided`, () => {
    // given
    const connectionString = 'db://localhost:3000'

    // when
    const testDb = dbModule.connect(connectionString)

    // then
    expect(typeof testDb.collection).toEqual('function')

    // 💡 Note: don't do this: `should return a db instance when calling 'connect' with 'connectionString'`
  })

  it(`should not connect to a database when connection string is not provided`, () => {
    // given
    // no connection string provided

    // when
    const connectingWithoutConnectionString = () => dbModule.connect()

    // then
    expect(connectingWithoutConnectionString).toThrow('invalid connection string!')
  })

  it(`should close db connection`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')

    // when
    const closedMessage = testDb.close()

    // then
    expect(closedMessage).toEqual('db connection closed!')
    expect(testDb.isConnectionClosed()).toEqual(true)

    // 💡 Note: we have two assertions here
    // 1. one that checks the message
    // 2. one that checks if the `isConnectionClosed` property is `true`
    // We use both of those assertions to test if the 'feature' is working.
    // That's what it means to have "one coherent assertion".
    // It doesn't mean there needs to be only one `expect` per test.
  })
})
