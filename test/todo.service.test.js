const fs = require('fs')
const path = require('path')

const Repository = require('./../src/repositories/todo.repository')
const Service = require('./../src/services/todo.service')

const file = path.resolve(__dirname, './../data/mock-todos.json')
const MOCK_DATA = JSON.parse(fs.readFileSync(file, 'utf8'))

test('Returning all todo data.', () => {
  const service = new Service(Repository.init(true))
  return service.findAll().then((data) => {
    expect(data).toEqual(MOCK_DATA)
  })
})

test('Returning a todo by id.', () => {
  const service = new Service(Repository.init(true))
  return service.findById('70758d61-596b-4fc1-8b0d-fe5f2a0eb8af').then((data) => {
    expect(data.message).toBe('Cut the grass')
  })
})

test('Creating a new todo record.', () => {
  const service = new Service(Repository.init(true))
  return service.create({ message: 'Creating TODO.', due: new Date() }).then((data) => {
    expect(data.message).toBe('Creating TODO.')
  })
})

test('Creating a new todo without data.', () => {
  const service = new Service(Repository.init(true))
  return service
    .create(null)
    .catch(err => expect(err).toEqual(Error('Todo data could not be null or undefined.')))
})

test('Creating a new todo without message.', () => {
  const service = new Service(Repository.init(true))
  return service
    .create({ due: new Date() })
    .catch(err => expect(err).toEqual(Error('A message description and a due date are necessary to create a new Todo.')))
})

test('Updating a todo record.', () => {
  const service = new Service(Repository.init(true))
  return service
    .update('9a19b0d9-2d69-45e2-8fd4-28d8c8ebad07', {
      id: '9a19b0d9-2d69-45e2-8fd4-28d8c8ebad07',
      created: '2019-12-22T11:35:02.101Z',
      message: 'Clean the house tomorrow',
      due: '2019-12-26T00:00:00'
    }).then(() => {
      return service
        .findById('9a19b0d9-2d69-45e2-8fd4-28d8c8ebad07')
        .then((data) => {
          expect(data.message).toBe('Clean the house tomorrow')
        })
    })
})

test('Updating a todo record without correct message.', () => {
  const service = new Service(Repository.init(true))
  return service
    .update('9a19b0d9-2d69-45e2-8fd4-28d8c8ebad07', {})
    .catch(err => expect(err).toEqual(Error('A message description and a due date are necessary to create a new Todo.')))
})

test('Updating a todo record without id.', () => {
  const service = new Service(Repository.init(true))
  return service
    .update(null, {})
    .catch(err => expect(err).toEqual(Error('A Todo ID is necessary.')))
})

test('Updating a todo record with wrong id.', () => {
  const service = new Service(Repository.init(true))
  return service
    .update('123', {})
    .catch(err => expect(err).toEqual(Error('TODO 123 not found.')))
})

test('Deleting a todo record.', () => {
  var originalCount
  const service = new Service(Repository.init(true))
  return service.findAll().then((data) => {
    originalCount = data.length
    return service.delete('9a19b0d9-2d69-45e2-8fd4-28d8c8ebad07').then(() => {
      return service.findAll().then((afterDelete) => {
        expect(afterDelete.length).toBe(originalCount - 1)
      })
    })
  })
})

test('Deleting todo record with wrong id.', () => {
  const service = new Service(Repository.init(true))
  return service
    .delete('123')
    .catch(err => expect(err).toEqual(Error('TODO 123 not found.')))
})
