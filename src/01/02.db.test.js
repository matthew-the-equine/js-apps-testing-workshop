import dbModule from './dbModule'

describe('db', () => {
  it(`should throw an error when trying to access collection without name`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')

    // when
    expect(() => testDb.collection())
      // then
      .toThrow('provide collection name!')
  })

  it(`should create empty collection when it doesn't exist`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')

    // when
    const collection = testDb.collection('user')

    // then
    expect(collection.findAll()).toEqual([])

    // 💡 Note: the name of the test is not:
    // `should create empty collection with 'findAll' method that returns all entities when it doesn't exist`
    // that's one example of leaking abstraction or implementation details
    // you'll learn more about them later
  })

  it(`should return already created collection`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')
    const collection = testDb.collection('user')

    // when
    const theSameCollection = testDb.collection('user')

    // then
    expect(collection === theSameCollection).toEqual(true)
    // or use `toBe`
    // expect(collection).toBe(theSameCollection)
  })

  it(`should insert entity to a collection`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')
    const collection = testDb.collection('user')
    const entity = { _id: 1, name: 'Krzyś' }

    // when
    collection.insert(entity)

    // then
    expect(collection.findAll()).toEqual([entity])
  })

  it(`should allow finding entities by id`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')
    const collection = testDb.collection('user')
    const entity = { _id: 1, name: 'Krzyś' }
    collection.insert(entity)

    // when
    const entityById = collection.findById(1)

    // then
    expect(entityById).toEqual(entity)
  })

  it(`should allow removing entities by id`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')
    const collection = testDb.collection('user')
    const entity = { _id: 1, name: 'Krzyś' }
    collection.insert(entity)

    // when
    collection.remove(entity._id)

    // then
    expect(collection.findById(1)).toEqual(null)
  })

  it(`should allow truncating collection`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')
    const collection = testDb.collection('user')
    const entity = { _id: 1, name: 'Krzyś' }
    collection.insert(entity)

    // when
    collection.truncate()

    // then
    expect(collection.findAll()).toEqual([])
  })

  it(`should clean up collections when closing connection`, () => {
    // given
    const testDb = dbModule.connect('db://localhost:3000')
    const collection = testDb.collection('user')
    const entity = { _id: 1, name: 'Krzyś' }
    collection.insert(entity)

    // when
    testDb.close()

    // then
    expect(collection.findAll()).toEqual([])
  })

  afterAll(() => {
    if (!dbModule.allCollectionClosed()) {
      console.error('close the connection!')
    }
  })
})
