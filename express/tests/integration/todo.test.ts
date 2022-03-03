import connection from '../../src/db'
import Server from '../../src/server'
import request from 'supertest'
import utils from '../utils'
import { todoRepo, Todo } from '../../src/entity'

beforeEach(async () => {
  await connection.create()
})

afterEach(async () => {
  await connection.close()
})

const globalApp = new Server().getApp()

type Expected = {
  statusCode: number,
  headers: string[] | RegExp[],
  body: {
    status: 'done' | 'error',
    msg: string,
    data?: Todo | Todo[]
  }
}

const processTestCase = (actual: request.Response, expected: Expected) => {
  expect(actual.statusCode).toEqual(expected.statusCode)
  expect(actual.headers["content-type"]).toMatch(expected.headers[0])
  expect(actual.headers["content-type"]).toMatch(expected.headers[1])
  expect(actual.body).toMatchObject(expected.body)
}

describe('Create a todo', () => {
  it('201, created', async () => {
    /** arrange */

    /** act */
    // create a todo
    const actual = await utils.createTodo(globalApp)

    /** assert */
    const expected: Expected = {
      statusCode: 201,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'done',
        msg: 'The new todo item had been created.',
        data: { id: 1, name: 'read a book', is_complete: false }
      }
    }
    processTestCase(actual, expected)
  })

  it('201, created: req.body has additional prop', async () => {
    /** arrange */

    /** act */
    const actual = await request(globalApp)
      .post('/api/v1/todos')
      .send({
        name: 'read a book',
        ADDITIONAL_PROP: 'ADDITIONAL PROP'
      })

    /** assert */
    const expected: Expected = {
      statusCode: 201,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'done',
        msg: 'The new todo item had been created.',
        data: { id: 1, name: 'read a book', is_complete: false }
      }
    }
    processTestCase(actual, expected)
  })

  it('400, bad request: empty req.body', async () => {
    /** arrange */

    /** act */
    const actual = await request(globalApp)
      .post('/api/v1/todos')
      .send({})

    /** assert */
    const expected: Expected = {
      statusCode: 400,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Bad request.' }
    }
    processTestCase(actual, expected)
  })

  it('500, server error: database error', async () => {
    /** arrange */
    // mock database operation error (manual mock)
    const originAddOne = todoRepo.addOne
    todoRepo.addOne = jest.fn()
      .mockImplementation(async () => { throw new Error() })

    /** act */
    const actual = await utils.createTodo(globalApp)

    // restore the mock
    todoRepo.addOne = originAddOne

    /** assert */
    const expected: Expected = {
      statusCode: 500,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Internal server error.' }
    }
    processTestCase(actual, expected)
  })
})

describe('Read all todos', () => {
  it('200, ok', async () => {
    /** arrange */
    // create 5 todos
    for (let i = 0; i < 5; i++) {
      await utils.createTodo(globalApp)
    }

    /** act */
    const actual = await request(globalApp).get('/api/v1/todos')

    /** assert */
    const expected: Expected = {
      statusCode: 200,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'done',
        msg: 'Got all todo items.',
        data: [
          { id: 1, name: 'read a book', is_complete: false },
          { id: 2, name: 'read a book', is_complete: false },
          { id: 3, name: 'read a book', is_complete: false },
          { id: 4, name: 'read a book', is_complete: false },
          { id: 5, name: 'read a book', is_complete: false },
        ]
      }
    }
    processTestCase(actual, expected)
  })

  it('500, server error', async () => {
    /** arrange */
    await utils.createTodo(globalApp)

    // mock database operation error (spy on function)
    const spyGetAll = jest.spyOn(todoRepo, 'getAll')
      .mockImplementation(() => { throw new Error() })

    /** act */
    const actual = await request(globalApp).get('/api/v1/todos')

    // restore the mock
    spyGetAll.mockRestore()

    /** assert */
    const expected: Expected = {
      statusCode: 500,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Internal server error.' }
    }
    processTestCase(actual, expected)
  })
})

describe('Read a todo', () => {
  it('200, ok', async () => {
    /** arrange */
    // create a todo
    await utils.createTodo(globalApp)

    /** act */
    const actual = await request(globalApp).get('/api/v1/todos/1')

    /** assert */
    const expected: Expected = {
      statusCode: 200,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'done',
        msg: 'Got a todo item by given ID.',
        data: { id: 1, name: 'read a book', is_complete: false }
      }
    }
    processTestCase(actual, expected)
  })

  it('404, not found: item with given ID not exists', async () => {
    /** arrange */

    /** act */
    const actual = await request(globalApp).get('/api/v1/todos/1')

    /** assert */
    const expected: Expected = {
      statusCode: 404,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'error',
        msg: 'No todo item had been found.'
      }
    }
    processTestCase(actual, expected)
  })

  it('404, not found: invalid `req.params.id`', async () => {
    /** arrange */

    /** act */
    const actual = await request(globalApp).get('/api/v1/todos/item')

    /** assert */
    const expected: Expected = {
      statusCode: 404,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'error',
        msg: 'No todo item had been found.'
      }
    }
    processTestCase(actual, expected)
  })

  it('500, server error', async () => {
    /** arrange */
    await utils.createTodo(globalApp)

    // mock database operation error
    const spyGetOne = jest.spyOn(todoRepo, 'getOne')
      .mockImplementation(() => { throw new Error() })

    /** act */
    const actual = await request(globalApp).get('/api/v1/todos/1')

    // restore the mock
    spyGetOne.mockRestore()

    /** assert */
    const expected: Expected = {
      statusCode: 500,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Internal server error.' }
    }
    processTestCase(actual, expected)
  })
})

describe('Update a todo', () => {
  it('200, ok: only update `req.body.name`', async () => {
    /** arrange */
    // create a todo
    await utils.createTodo(globalApp)

    /** act */
    const actual = await request(globalApp)
      .patch('/api/v1/todos/1')
      .send({ name: 'programming whole a day!' })

    /** assert */
    const expected: Expected = {
      statusCode: 200,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'done',
        msg: 'The todo item had been updated.',
        data: {
          id: 1,
          name: 'programming whole a day!',
          is_complete: false
        }
      }
    }
    processTestCase(actual, expected)
  })

  it('200, ok: only update `req.body.is_complete`', async () => {
    /** arrange */
    // create a todo
    await utils.createTodo(globalApp)

    /** act */
    const actual = await request(globalApp)
      .patch('/api/v1/todos/1')
      .send({ is_complete: true })

    /** assert */
    const expected: Expected = {
      statusCode: 200,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'done',
        msg: 'The todo item had been updated.',
        data: { id: 1, name: 'read a book', is_complete: true }
      }
    }
    processTestCase(actual, expected)
  })

  it('400, bad request: item with given ID not exists', async () => {
    /** arrange */
    // create a todo item
    await utils.createTodo(globalApp)

    /** act */
    const actual = await request(globalApp).patch('/api/v1/todos/1')

    /** assert */
    const expected: Expected = {
      statusCode: 400,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Bad request.' }
    }
    processTestCase(actual, expected)
  })

  it('400, bad request: invalid `req.params.id`', async () => {
    /** arrange */
    // create a todo item
    await utils.createTodo(globalApp)

    /** act */
    const actual = await request(globalApp).patch('/api/v1/todos/item')

    /** assert */
    const expected: Expected = {
      statusCode: 400,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Bad request.' }
    }
    processTestCase(actual, expected)
  })

  it('400, bad request: invalid `req.body`', async () => {
    /** arrange */
    // create a todo item
    await utils.createTodo(globalApp)

    /** act */
    const actual = await request(globalApp)
      .patch('/api/v1/todos/1')
      .send({
        name: 123, // expect `string`
        is_complete: 456 // expect `string`
      })

    /** assert */
    const expected: Expected = {
      statusCode: 400,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Bad request.' }
    }
    processTestCase(actual, expected)
  })

  it('500, server error', async () => {
    /** arrange */
    await utils.createTodo(globalApp)

    // mock database operation error
    const spyUpdateOne = jest.spyOn(todoRepo, 'updateOne')
      .mockImplementation(() => { throw new Error() })

    /** act */
    const actual = await request(globalApp)
      .patch('/api/v1/todos/1')
      .send({ name: 'solving leetcode problems' })

    // restore the mock
    spyUpdateOne.mockRestore()

    /** assert */
    const expected: Expected = {
      statusCode: 500,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Internal server error.' }
    }
    processTestCase(actual, expected)
  })
})

describe('Delete a todo', () => {
  it('200, ok', async () => {
    /** arrange */
    // create a todo
    await utils.createTodo(globalApp)

    /** act */
    const actual = await request(globalApp).delete('/api/v1/todos/1')

    /** assert */
    const expected: Expected = {
      statusCode: 200,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: {
        status: 'done',
        msg: 'The todo item had been deleted.',
        data: { id: 1, name: 'read a book', is_complete: false }
      }
    }
    processTestCase(actual, expected)
  })

  it('400, bad request: item with given ID not exists', async () => {
    /** arrange */

    /** act */
    const actual = await request(globalApp).delete('/api/v1/todos/1')

    /** assert */
    const expected: Expected = {
      statusCode: 400,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Bad request.' }
    }
    processTestCase(actual, expected)
  })

  it('400, bad request: invalid `req.params.id`', async () => {
    /** arrange */

    /** act */
    const actual = await request(globalApp).delete('/api/v1/todos/item')

    /** assert */
    const expected: Expected = {
      statusCode: 400,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Bad request.' }
    }
    processTestCase(actual, expected)
  })

  it('500, server error', async () => {
    /** arrange */
    await utils.createTodo(globalApp)

    // mock database operation error
    const spyDeleteOne = jest.spyOn(todoRepo, 'deleteOne')
      .mockImplementation(() => { throw new Error() })

    /** act */
    const actual = await request(globalApp).delete('/api/v1/todos/1')

    // restore the mock
    spyDeleteOne.mockRestore()

    /** assert */
    const expected: Expected = {
      statusCode: 500,
      headers: [/application\/json/i, /charset=utf-8/i],
      body: { status: 'error', msg: 'Internal server error.' }
    }
    processTestCase(actual, expected)
  })
})
