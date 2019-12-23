'use strict'

const r = require('./../helpers/response.helper')
const Repository = require('./../repositories/todo.repository')
const Service = require('./../services/todo.service')

module.exports.findAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const service = new Service(Repository.init())
  service
    .findAll()
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}

module.exports.findById = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const service = new Service(Repository.init())
  const todoId = event.pathParameters.id
  service
    .findById(todoId)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const service = new Service(Repository.init())
  const data = event.body && JSON.parse(event.body)
  service
    .create(data)
    .then((data) => callback(null, r.success(data)))
    .catch((err) => callback(null, r.failure(err)))
}
