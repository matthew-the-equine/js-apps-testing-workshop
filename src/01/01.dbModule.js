let connectionClosed = false

function collection() {
  let entities = []

  return {
    findAll: () => entities,
    insert: entity => { entities = [...entities, entity] },
    findById: id => entities.find(({ _id }) => _id === id) || null,
    remove: id => { entities = [...entities.filter(({ _id }) => _id !== id)] },
    truncate: () => { entities = [] },
  }
}

function db() {
  const collections = {}

  return {
    collection: collectionName => {
      if (!collectionName) {
        throw new Error('provide collection name!')
      }

      if (!collections[collectionName]) {
        collections[collectionName] = collection()
        return collections[collectionName]
      }

      return collections[collectionName]
    },

    close: () => {
      connectionClosed = true
      return 'db connection closed!'
    }
  }
}

const dbModule = {
  connect: connectionString => {
    if (!connectionString) {
      throw new Error('invlid connection string!')
    }
    console.log('connected!')
    return db()
  },
  connectionClosed,
}

export default dbModule
