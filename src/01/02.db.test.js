// 🦖 Uncomment to start working on the test suite
// import dbModule from './dbModule'

// 🦖 Your job is to replace the comments with actual code, have fun!
// 💡 Remember to unskip!
describe.skip('db', () => {
  // 💡 Remember to unskip!
  it.skip(`should create empty collection when it doesn't exist`, () => {
    // given
    // you are connected to a database

    // when
    // accessing 'user' collection for a first time

    // then
    // calling `findAll` returns and empty collection

    // 💡 Note: the name of the test is not:
    // `should create empty collection with 'findAll' method that returns all entities when it doesn't exist`
    // that's one example of leaking abstraction or implementation details
    // you'll learn more about them later
  })

  // 💡 Remember to unskip!
  it.skip(`should throw an error when accessing collection without name`, () => {
    // given
    // you are connected to a database

    // when
    // accessing a collection without name

    // then
    // a 'provide collection name!' error is thrown
  })

  // 💡 Remember to unskip!
  it.skip(`should return the same collection when accessing it for the second time`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection

    // when
    // accessing 'user' collection for a second time

    // then
    // first collection is the same as second collection
    // (or as a developer would say: it's referentially equal)

    // 💡 Note: you need to call `collection()` twice
  })

  // 💡 Remember to unskip!
  it.skip(`should insert entity to a collection`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection
    // there is a `{ _id: 1, name: [your name] }` entity

    // when
    // inserting an entity

    // then
    // calling `findAll` would find it
  })

  // 💡 Remember to unskip!
  it.skip(`should allow finding entities by id`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection
    // there is a `{ _id: 1, name: [your name] }` entity
    // and the entity is added to the collection

    // when
    // finding the entity by id

    // then
    // entity you found is the same as you expected
  })

  // 💡 Remember to unskip!
  it.skip(`should allow removing entities by id`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection
    // there is a `{ _id: 1, name: [your name] }` entity
    // and the entity is added to the collection

    // when
    // removing an entity by id

    // then
    // entity can no longer be found
  })

  // 💡 Remember to unskip!
  it.skip(`should allow truncating collection`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection
    // there is a `{ _id: 1, name: [your name] }` entity
    // and the entity is added to the collection

    // when
    // truncating the collection

    // then
    // the collection is empty
  })

  // 💡 Remember to unskip!
  it.skip(`should clean up collections when closing connection`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection
    // there is a `{ _id: 1, name: [your name] }` entity
    // and the entity is added to the collection

    // when
    // closing the db

    // then
    // the collection is empty
  })

  // 🦖 Uncomment when you reach this point,
  // move it to the top where it belongs
  // and fix the error
  //
  // afterAll(() => {
  //   if (!dbModule.allCollectionClosed()) {
  //     console.error('close the connection!')
  //   }
  // })
  //
  // 💡 Note: consider using after and before hooks
})
