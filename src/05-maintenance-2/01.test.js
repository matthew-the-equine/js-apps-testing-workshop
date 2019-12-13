import {
  goodMovie,
  badMovie,
} from './movie'
import MovieModule from './movieModule'

const batmanProperties = { title: 'Lego Batman' }
const bladeRunnerProperties = { title: 'Blade Runner' }

// 👉 Library of movies produced in USA

// Follow t-rex 🦖 to find the clues.

// 1. How do you like the formatting? :)
// ---
// 2. Does every test conform to the rule:
// "setup only what's necessary to make the test pass"?
// ---
// 3. Does the validation works correctly?
// ---
// 4. Can you make use of the test cases
// ---
// 5. Add a timestamp property to a movie saved in the database
// and fix the failing tests.
// Why do they fail? What can be done better to avoid that during every change?
// ---
// 6. Look at the movie.js, 🏭🏭🏭
// ---
// 7. Try to extract some small methods to express intent
// ---
// 8. What can else can be cleaned up?

describe.only(`Low-level maintenance`, () => {
  let array = []
  beforeEach(() => {
    array = []
  })
  it(`should not reject when saving movie`, async () => {
    const database = { save: jest.fn(() => Promise.resolve()), getAll: jest.fn(() => Promise.resolve([])) }
    const posterApi = { save: jest.fn(() => Promise.resolve()) }
    await MovieModule({
      database,
      posterApi,
    }).addMovie(goodMovie)
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...goodMovie })
  })
  it(`should save sample movie and get poster if not defined`, async () => {
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = { save: jest.fn(() => Promise.resolve()), getAll: jest.fn(() => Promise.resolve([])) }
    const { poster, ...movieWithoutPoster } = goodMovie
    await MovieModule({
      database,
      posterApi,
    }).addMovie(movieWithoutPoster)
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...movieWithoutPoster })
  })
  it(`should save sample movie and get poster if not defined`, async () => {
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = { save: jest.fn(() => Promise.resolve()), getAll: jest.fn(() => Promise.resolve([])) }
    const { poster, ...movieWithoutPoster } = goodMovie
    await MovieModule({
      database,
      posterApi,
    }).addMovie(movieWithoutPoster)
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...movieWithoutPoster })
  })
  it(`get ${146 * 3} total runtime`, async () => {
    const movies = []
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = {
      save: jest.fn(movie => {
        movies.push(movie)
        return Promise.resolve()
      }),
      getAll: jest.fn(() => Promise.resolve(movies)),
    }
    const { poster, ...movieWithoutPoster } = goodMovie
    const movieModule = MovieModule({
      database,
      posterApi,
    })
    // 🦖 What are we testing here? Isn't this too much?
    await movieModule.addMovie(movieWithoutPoster)
    await movieModule.addMovie({ ...movieWithoutPoster, ...batmanProperties })
    await movieModule.addMovie({ ...movieWithoutPoster, ...bladeRunnerProperties })
    const time = await movieModule.getTotalRuntime()
    const { id, ...firstMovie } = database.save.mock.calls[0][0]
    const { id: _, ...secondMovie } = database.save.mock.calls[1][0]
    const { id: omit, ...thirdMovie } = database.save.mock.calls[2][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(firstMovie).toEqual({ poster: 'url', ...movieWithoutPoster })
    expect(secondMovie).toEqual({ poster: 'url', ...movieWithoutPoster, title: batmanProperties.title })
    expect(thirdMovie).toEqual({ poster: 'url', ...movieWithoutPoster, title: bladeRunnerProperties.title })
    expect(time).toEqual(146 * 3)
  })
  it(`favorite director`, async () => {
    // 🦖 How do you like the variables names?
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = {
      save: jest.fn(value => {
        array.push(value)
        return Promise.resolve()
      }),
      getAll: jest.fn(() => Promise.resolve(array)),
    }
    const { poster, ...movieWithoutPoster } = goodMovie
    const movieModule = MovieModule({
      database,
      posterApi,
    })

    await movieModule.addMovie(movieWithoutPoster)
    await movieModule.addMovie({ ...movieWithoutPoster, title: 'LOTR 1', director: 'Peter Jackson'})
    await movieModule.addMovie({ ...movieWithoutPoster, title: 'Jurassic Park', director: 'Steven Spielberg'})
    await movieModule.addMovie({ ...movieWithoutPoster, title: 'LOTR 2', director: 'Peter Jackson'})
    await movieModule.addMovie({ ...movieWithoutPoster, title: 'LOTR 3', director: 'Peter Jackson'})
    // 🦖 Is he just a 'director'?
    const director = await movieModule.getFavoriteDirector()
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...movieWithoutPoster })
    expect(director).toEqual('Peter Jackson')
  })
  it(`validate bad movies`, async () => {
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = {
      save: jest.fn(movie => {
        array.push(movie)
        return Promise.resolve()
      }),
      getAll: jest.fn(() => Promise.resolve(array)),
    }
    const movieModule = MovieModule({
      database,
      posterApi,
    })

    await movieModule.addMovie(goodMovie)
    // 🦖 What happened here?
    // const { id } = database.save.mock.calls[0][0]
    // expect(Number.isInteger(id)).toEqual(true)
    expect(movieModule.addMovie(badMovie)).rejects.toThrow(new Error('This is not a good movie'))
  })
  it(`duplicated movies`, async () => {
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = {
      save: jest.fn(movie => {
        array.push(movie)
        return Promise.resolve()
      }),
      getAll: jest.fn(() => Promise.resolve(array)),
    }
    const movieModule = MovieModule({
      database,
      posterApi,
    })

    await movieModule.addMovie(goodMovie)
    const { id } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieModule.addMovie(goodMovie)).rejects.toThrow(new Error('Movie with this title already exists'))
  })

  // TODO: calculate favorite genre when adding multiple movies
  // TODO: calculate total time watched based on director and genre
  // TODO: documentary movies should be saved in a separate collection
})


