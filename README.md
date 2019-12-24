# golend-todo
Golend Serverless project.

This is the Golend program test backend with few endpoints around a basic TODO system using Nodejs, Jest and Serverless framework.

## To Run
### Install the dependencies

```
npm install
```

To run the unit test coverage and get a first view of the main project files:

```
npm run test
```

This project is using `Serverless` framework to optimise and simplify the deploy for a Cloud provider as AWS. In this case is not necessary deploy all endpoints before test, it is possible to run the project locally using the plugin `serverless-offline`:

```
npm run start
```

After this is possible tests the following endpoints:

```
GET: http://localhost:6000/api/todo
GET: http://localhost:6000/api/todo/{id}
POST: http://localhost:6000/api/todo
PUT: http://localhost:6000/api/todo/{id}
DELETE: http://localhost:6000/api/todo/{id} *extra
```

For the POST and PUT endpoints is necessary to pass a body object with details for each TODO record.

To create a new TODO:

```json
{
  "message": "",
  "due": ""
}
```

To update an existing TODO:

```json
{
  "id": "",
  "created": "",
  "message": "",
  "due": ""
}
```

### TODO

1 - Improving test coverage.

2 - Fixing Update endpoint to keep the original created date if a new one is passed in the payload.

3 - Improving error messages.
