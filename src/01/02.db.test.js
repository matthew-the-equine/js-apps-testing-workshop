// 🦖 Uncomment to start working on the test suite
// import dbModule from './dbModule'

// 🦖 Your job is to replace the comments with actual code, have fun!
// Remember to unskip the test!
describe.skip('db', () => {
  it(`should create empty collection when it doesn't exist`, () => {
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

  it(`should throw an error when accessing collection without name`, () => {
    // given
    // you are connected to a database

    // when
    // accessing a collection without name

    // then
    // a 'provide collection name!' error is thrown
  })

  it(`should return the same collection when accessing it for the second time`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection

    // when
    // accessing 'user' collection for a second time

    // then
    // first collection is the same as second collection
    // (or as a developer would say: it's referetially equal)

    // 💡 Note: you need to call `collection()` twice
  })

  it(`should insert entity to a collection`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection
    // there is a `{ _id: 1, name: [your name] }` entity

    // when
    // inserting an entity

    // then
    // calling `findAll` would find it
  })

  it(`should allow finding entities by id`, () => {
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

  it(`should allow removing entities by id`, () => {
    // given
    // you are connected to a database
    // you got access to the 'user' collection
    // there is a `{ _id: 1, name: [your name] }` entity
    // and the entity is added to the collection

    // when
    // removing an entity by

    // then
    // entity can no longer be found
  })

  it(`should allow truncating collection`, () => {
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

  it(`should clean up collections when closing connection`, () => {
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
