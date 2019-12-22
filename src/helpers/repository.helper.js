const fs = require('fs')
const path = require('path')

/**
 * This class could be replaced for a Database connection
 * or a better implementation using AWS S3 bucket.
 * The main idea it is how to provide a data source
 * and basic CRUD methods to manager the information.
 */
class Repository {
  constructor (data) {
    this.data = data
  }

  static init () {
    const file = path.resolve(__dirname, './../../data/mock-todos.json')
    const todoMockdata = JSON.parse(fs.readFileSync(file, 'utf8'))
    return new Repository(todoMockdata)
  }

  create (data) {
    const item = this.data.find(o => o.id === data.id)
    if (item) return
    this.data.push(data)
  }

  read (id) {
    if (id) {
      const item = this.data.find(o => o.id === id)
      if (!item) return {}
      return item
    }
    return [...this.data]
  }

  update (data) {
    const index = this.data.findIndex(o => o.id === data.id)
    this.data[index] = data
  }

  delete (id) {
    const index = this.data.findIndex(o => o.id === id)
    if (index > -1) {
      this.data.splice(index, 1)
    }
  }
}

module.exports = Repository
