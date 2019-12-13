const favoriteGenresAnalytics = async genre => console.log('logged!', genre)
const favoriteDirectorAnalytics = async director => console.log('logged!', director)

// don't balme me https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
const mode = (arr) => {
  return arr.sort((a,b) =>
    arr.filter(v => v===a).length - arr.filter(v => v===b).length,
  ).pop()
}

const getPoster = async (posterApi, movie) => {
  if (!movie.poster) {
    const posterUrl = await posterApi.getPoster(movie.title)
    return { ...movie, poster: posterUrl }
  }

  return movie
}

const validateGoodMovie = movie => {
  if (movie.director === 'Rian Johnson' && movie.title.includes('Star Wars')) {
    throw new Error('This is not a good movie')
  }

  if (movie.writer.includes('Rian Johnson') && movie.title.includes('Star Wars')) {
    throw new Error('This is not a good movie')
  }
}

const MovieModule = ({
  database,
  posterApi,
}) => {
  const addMovie = async movie => {
    if (movie.country !== 'USA') {
      throw new Error('Not an USA movie')
    }

    validateGoodMovie(movie)

    const allMovies = await database.getAll()
    const duplicate = allMovies.find(({title}) => title === movie.title)

    if (duplicate) {
      throw new Error('Movie with this title already exists')
    }

    const id = Date.now()

    const movieToSave = await getPoster(posterApi, {
      ...movie,
      id,
      // 🦖 uncomment when needed
      // timestamp: (new Date()).toISOString(),
    })

    await database.save(movieToSave)
    return Promise.resolve(movieToSave)
  }

  const getTotalRuntime = async () => {
    const allMovies = await database.getAll()
    const totalRuntime = allMovies
      .map(({ runtime }) => runtime)
      .reduce((acc, next) => {
        acc = acc + parseInt(next.split(' ')[0])
        return acc
      }, 0)

    return totalRuntime
  }

  const getFavoriteDirector = async () => {
    const allMovies = await database.getAll()
    const directors = allMovies
      .map(({ director }) => director)

    const favoriteDirector = mode(directors)
    return favoriteDirector
  }

  return {
    addMovie,
    getTotalRuntime,
    getFavoriteDirector,
  }
}

export default MovieModule
