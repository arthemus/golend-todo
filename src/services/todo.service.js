const uuid = require('uuid')

const Todo = require('./../models/todo.model')

/**
 * Service class for Todo model with possible business rules for a TODO module.
 * Using a basic implementation of Repository with CRUD operations.
 */
class TodoService {
  constructor (repository) {
    this.repository = repository
  }

  async findAll () {
    return this.repository.read()
  }

  async findById (todoId) {
    return this.repository.read(todoId)
  }

  async create (todoData) {
    if (!todoData) throw new Error('Todo data could not be null or undefined.')
    const { message, due } = todoData
    if (!message || !due) throw new Error('A message description and a due date are necessary to create a new Todo.')
    const todo = new Todo(uuid.v4(), new Date(), message, due)
    this.repository.create(todo)
    return todo
  }

  async update (id, data) {
    const todoObj = await this.findById(id)
    if (!todoObj) throw new Error(`TODO ${id} not found.`)
    const { message, due } = data
    if (!message || !due) throw new Error('A message description and a due date are necessary to create a new Todo.')
    this.repository.update(data)
    return data
  }

  async delete (id) {
    const todoObj = await this.findById(id)
    if (!todoObj) throw new Error(`TODO ${id} not found.`)
    this.repository.delete(id)
    return todoObj
  }
}

module.exports = TodoService
