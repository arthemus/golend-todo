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
}

module.exports = TodoService
