
# BTB test backend



## About porject
Tech stack: javascript/typescript, node.js, nest.js, typeorm, postgreSQL, winston

Patterns and solutions:
- CQRS: I used the cqrs pattern to reduce the number of injected dependencies and divide the logic into read and write areas, this pattern also allows you to roll back changes when a request ends in an error,
- Result: I used the Result pattern to create a simple interface for receiving the result of the executed code, also to avoid causing errors outside the controller,
- Entity, mapper and repository patterns: to create a clear project structure with possible expansion in the future, it also allows you to create a homogeneous application structure that can be easily maintained


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_HOST`
`DATABASE_PORT`
`DATABASE_USERNAME`
`DATABASE_PASSWORD`
`DATABASE_NAME`


## Run Locally

Clone the project

```bash
  git clone https://github.com/EvgeniBarsuck/btb-back.git
```

Go to the project directory

```bash
  cd btb-back
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  docker compose up --build
```

For test

```bash
  yarn test
```


## API Reference

#### For get requests you don't need to pass auth key

```http
  GET /blogs
```

#### For requests that change data you need to provide an access token

```http
  POST /blogs
```

| Parameter            | Type        | Description                       |
| :--------------------| :---------- | :-------------------------------- |
| `authorization`      | `in header` | **Required**                      |



## Running Tests

To run unit tests, run the following command

```bash
  npm run test
```

