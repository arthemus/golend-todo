const uuid = require('uuid')
const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, './../data/mock-todos.json')
const MOCK_DATA = JSON.parse(fs.readFileSync(file, 'utf8'))

const Repository = require('./../src/repositories/todo.repository')

beforeEach(() => {
  const file = path.resolve(__dirname, './../.db')
  const fileExists = fs.existsSync(file)
  if (fileExists) {
    fs.unlinkSync(file)
  }
})

test('Init repository with mock data.', () => {
  expect(MOCK_DATA).toEqual(Repository.init(true).read())
})

test('Sync db data without db file.', () => {
  Repository.init().read()
  const file = path.resolve(__dirname, './../.db')
  const fileExists = fs.existsSync(file)
  expect(fileExists).toBe(true)
})

test('No test repository with database file.', () => {
  const file = path.resolve(__dirname, './../.db')
  Repository.init(false)
  const fileExists = fs.existsSync(file)
  expect(fileExists).toBe(true)
  const dbData = Repository.init(false).read()
  expect(dbData).toEqual(MOCK_DATA)
})

test('Creating a existing item.', () => {
  const rInstance = Repository.init(true)
  const originalData = rInstance.read()
  rInstance.create({
    id: 'deb4508d-4fd1-47a4-9b04-20c5a895a656',
    created: '2019-12-22T11:37:18.374Z',
    message: 'Deliver Golend project test',
    due: '2020-01-05T00:00:00'
  })
  const updatedData = rInstance.read()
  expect(updatedData.length).toBe(originalData.length)
})

test('Creating a new item.', () => {
  const rInstance = Repository.init(true)
  const originalData = rInstance.read()
  rInstance.create({
    id: uuid.v4(),
    created: new Date(),
    message: 'Testing code for a better project.',
    due: new Date()
  })
  const updatedData = rInstance.read()
  expect(updatedData.length).toBe(originalData.length + 1)
})

test('Reading default todo list data.', () => {
  const instance = Repository.init(true)
  expect(instance.data).toEqual(MOCK_DATA)
})

test('Getting full data with id as null.', () => {
  const data = Repository.init(true).read(null)
  expect(data).toEqual(MOCK_DATA)
})

test('Getting item from ID.', () => {
  const data = Repository.init(true).read('deb4508d-4fd1-47a4-9b04-20c5a895a656')
  expect(data.message).toBe('Deliver Golend project test')
})

test('Getting item from wrong ID.', () => {
  const data = Repository.init(true).read('1')
  expect(data).toEqual({})
})

test('Updating message item.', () => {
  const rInstance = Repository.init(true)
  const data = rInstance.read('deb4508d-4fd1-47a4-9b04-20c5a895a656')
  expect(data.message).toBe('Deliver Golend project test')
  data.message = 'Delivering a project test'
  rInstance.update(data)
  const updated = rInstance.read('deb4508d-4fd1-47a4-9b04-20c5a895a656')
  expect(updated.message).toBe('Delivering a project test')
})

test('Deleting a wrong item ID.', () => {
  const rInstance = Repository.init(true)
  const originalData = rInstance.read()
  rInstance.delete(1)
  const updatedData = rInstance.read()
  expect(updatedData).toEqual(originalData)
})

test('Deleting and check new list.', () => {
  const rInstance = Repository.init(true)
  const originalData = rInstance.read()
  rInstance.delete('deb4508d-4fd1-47a4-9b04-20c5a895a656')
  const updatedData = rInstance.read()
  expect(updatedData.length).toBe(originalData.length - 1)
})
