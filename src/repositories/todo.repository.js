const fs = require('fs')
const path = require('path')

/**
 * This class could be replaced for a Database connection
 * or a better implementation using AWS S3 bucket.
 * The main idea it is how to provide a data source
 * and basic CRUD methods to manager the information.
 */
class TodoRepository {
  constructor (data) {
    this.data = data
  }

  static init (forTests = false) {
    let file
    if (/false/i.test(forTests)) {
      file = path.resolve(__dirname, './../../.db')
      const fileExists = fs.existsSync(file)
      if (fileExists) {
        console.log('File already exists...')
        const dbData = JSON.parse(fs.readFileSync(file, 'utf8'))
        return new TodoRepository(dbData)
      }
    }
    file = path.resolve(__dirname, './../../data/mock-todos.json')
    const todoMockdata = JSON.parse(fs.readFileSync(file, 'utf8'))
    const repository = new TodoRepository(todoMockdata)
    repository.sync()
    return repository
  }

  sync () {
    const stringData = JSON.stringify(this.data)
    const file = path.resolve(__dirname, './../../.db')
    fs.writeFileSync(file, stringData, 'utf8')
  }

  create (data) {
    const item = this.data.find(o => o.id === data.id)
    if (item) return
    this.data.push(data)
    this.sync()
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
    this.sync()
  }

  delete (id) {
    const index = this.data.findIndex(o => o.id === id)
    if (index > -1) {
      this.data.splice(index, 1)
      this.sync()
    }
  }
}

module.exports = TodoRepository
