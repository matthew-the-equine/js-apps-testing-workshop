// Example: Test setup powinien zawierać minimalną wymaganą ilość potrzebną do przeprowadzenia testu

import { goodMovie as sampleMovie } from './movie'
import MovieModule from './movieModule'

// 👉 Library of movies produced in USA
// 🦖 Exercise 1: don't change the tests, check what is really needed in the movie js properties
describe.only(`Minimal Setup`, () => {
  it(`should save sample movie`, async () => {
    // given
    const database = { save: jest.fn(() => Promise.resolve()) }
    const posterApi = { save: jest.fn(() => Promise.resolve()) }

    // when
    // 🦖 Exercise 2: do we need the posterApi here?
    await MovieModule({
      database,
      posterApi,
    }).addMovie(sampleMovie)

    // then
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...sampleMovie })
  })

  it(`should save sample movie and get poster if not defined`, async () => {
    // given
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = { save: jest.fn(() => Promise.resolve()) }

    // when
    const { poster, ...movieWithoutPoster } = sampleMovie
    await MovieModule({
      database,
      posterApi,
    }).addMovie(movieWithoutPoster)

    // then
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...movieWithoutPoster })
  })

  it(`should save sample movie and get poster if not defined`, async () => {
    // given
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = { save: jest.fn(() => Promise.resolve()) }

    // when
    const { poster, ...movieWithoutPoster } = sampleMovie
    await MovieModule({
      database,
      posterApi,
    }).addMovie(movieWithoutPoster)

    // then
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...movieWithoutPoster })
  })

  it(`should calculate total time watched when adding a movie`, async () => {
    // given
    const movies = []
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = {
      save: jest.fn(movie => {
        movies.push(movie)
        return Promise.resolve()
      }),
      getAll: jest.fn(() => Promise.resolve(movies)),
    }

    // when
    const { poster, ...movieWithoutPoster } = sampleMovie
    const movieModule = MovieModule({
      database,
      posterApi,
    })
    await movieModule.addMovie(movieWithoutPoster)
    await movieModule.addMovie(movieWithoutPoster)
    await movieModule.addMovie(movieWithoutPoster)
    const totalTime = await movieModule.getTotalRuntime()

    // then
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...movieWithoutPoster })
    expect(totalTime).toEqual(146 * 3)
  })

  it(`should calculate favorite director when adding a movie`, async () => {
    // given
    const movies = []
    const posterApi = { getPoster: () => Promise.resolve('url') }
    const database = {
      save: jest.fn(movie => {
        movies.push(movie)
        return Promise.resolve()
      }),
      getAll: jest.fn(() => Promise.resolve(movies)),
    }

    // when
    const { poster, ...movieWithoutPoster } = sampleMovie
    const movieModule = MovieModule({
      database,
      posterApi,
    })

    await movieModule.addMovie(movieWithoutPoster)
    await movieModule.addMovie({ ...movieWithoutPoster, director: 'Peter Jackson'})
    await movieModule.addMovie({ ...movieWithoutPoster, director: 'Steven Spielberg'})
    await movieModule.addMovie({ ...movieWithoutPoster, director: 'Peter Jackson'})
    await movieModule.addMovie({ ...movieWithoutPoster, director: 'Peter Jackson'})
    const favoriteDirector = await movieModule.getFavoriteDirector()

    // then
    const { id, ...movieProps } = database.save.mock.calls[0][0]
    expect(Number.isInteger(id)).toEqual(true)
    expect(movieProps).toEqual({ poster: 'url', ...movieWithoutPoster })
    expect(favoriteDirector).toEqual('Peter Jackson')
  })

  // TODO validate it doesn't pass Rian Johnson as a director or writer of Star Wars
  // TODO: check if movie already exist and throw exception
  // TODO: calculate favorite genre when adding multiple movies
  // TODO: calculate total time watched based on director and genre
  // TODO: documentary movies should be saved differently
  // TODO: remove some properties and add documentary movies
  // TODO: add validation that shall not pass xxx movies

  // TODO: Exercise add property to the movie
})


