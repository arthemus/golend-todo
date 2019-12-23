// const uuid = require('uuid')
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
