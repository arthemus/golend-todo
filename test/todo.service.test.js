const fs = require('fs')
const path = require('path')

const Repository = require('./../src/repositories/todo.repository')
const Service = require('./../src/services/todo.service')

const file = path.resolve(__dirname, './../data/mock-todos.json')
const MOCK_DATA = JSON.parse(fs.readFileSync(file, 'utf8'))

test('Returning all todo data.', () => {
  const service = new Service(Repository.init())
  return service.findAll().then((data) => {
    expect(data).toEqual(MOCK_DATA)
  })
})

test('Returning a todo by id.', () => {
  const service = new Service(Repository.init())
  return service.findById('70758d61-596b-4fc1-8b0d-fe5f2a0eb8af').then((data) => {
    expect(data.message).toBe('Cut the grass')
  })
})

test('Creating a new todo record.', () => {
  const service = new Service(Repository.init())
  return service.create({ message: 'Creating TODO.', due: new Date() }).then((data) => {
    expect(data.message).toBe('Creating TODO.')
  })
})

test('Creating a new todo without data.', () => {
  const service = new Service(Repository.init())
  return service
    .create(null)
    .catch(err => expect(err).toEqual(Error('Todo data could not be null or undefined.')))
})

test('Creating a new todo without message.', () => {
  const service = new Service(Repository.init())
  return service
    .create({ due: new Date() })
    .catch(err => expect(err).toEqual(Error('A message description and a due date are necessary to create a new Todo.')))
})
