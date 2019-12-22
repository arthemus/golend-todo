const r = require('./../src/helpers/response.helper')

test('Success without data return empty body.', () => {
  expect(r.success(null)).toEqual({ body: '', headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'x-requested-with' }, statusCode: 200 })
})

test('Success with not Object data.', () => {
  expect(r.success(1)).toEqual({ body: '1', headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'x-requested-with' }, statusCode: 200 })
})

test('Failure without err message return original argument.', () => {
  expect(r.failure(1)).toEqual({ body: '{"error":1}', headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'x-requested-with' }, statusCode: 500 })
})

test('Failure with err message.', () => {
  expect(r.failure({ message: 'Error!' })).toEqual({ body: '{"error":"Error!"}', headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'x-requested-with' }, statusCode: 500 })
})
