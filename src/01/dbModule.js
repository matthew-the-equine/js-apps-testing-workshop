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
  let collections = {}
  let connectionClosed = false

  return {
    collection: collectionName => {
      if (!collectionName) {
        throw new Error('provide collection name!')
      }

      if (!collections[collectionName]) {
        collections = {
          ...collections,
          [collectionName]: collection(),
        }
        return collections[collectionName]
      }

      return collections[collectionName]
    },

    close: () => {
      connectionClosed = true

      Object.keys(collections).forEach(collectionName => {
        collections[collectionName].truncate()
        delete collections[collectionName]
      })

      collections = {}

      return 'db connection closed!'
    },

    isConnectionClosed: () => {
      return connectionClosed
    },
  }
}

const dbModule = {
  databases: [],
  connect(connectionString) {
    if (!connectionString) {
      throw new Error('invlid connection string!')
    }

    console.log('connected!')

    const newDb = db()
    this.databases = [...this.databases, newDb]

    return newDb
  },
  allCollectionClosed() {
    return this.databases.every(db => db.isConnectionClosed())
  },
}

export default dbModule
