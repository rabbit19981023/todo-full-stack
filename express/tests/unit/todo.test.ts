import { Todo, todoRepo } from '../../src/entity'
import { todoService } from '../../src/service'
import { NewTodo, PartialTodo } from '../../src/types'

describe('Create a todo', () => {
  // mock func
  const mockAddOne = async (newTodo: NewTodo) => {
    const { name } = newTodo
    const todo = { id: 1, name, is_complete: false }
    return todo
  }

  it('success', async () => {
    /** arrange */
    // fake data
    const newTodo: NewTodo = { name: 'mock name' }

    // mock database operation
    const spyAddOne = jest.spyOn(todoRepo, 'addOne')
      .mockImplementation(mockAddOne)

    /** act */
    const actual = await todoService.addOne(newTodo)

    // restore the mock
    spyAddOne.mockRestore()

    /** assert */
    expect(actual).toEqual({
      id: 1,
      name: 'mock name',
      is_complete: false
    })
  })

  it('success: req.body has additional prop', async () => {
    /** arrange */
    // fake data
    const newTodo = {
      name: 'mock name',
      ADDITIONAL_PROP: 'ADDTIONAL PROP'
    } as NewTodo

    // mock database operation
    const spyAddOne = jest.spyOn(todoRepo, 'addOne')
      .mockImplementation(mockAddOne)

    /** act */
    const actual = await todoService.addOne(newTodo)

    // restore the mock
    spyAddOne.mockRestore()

    /** assert */
    expect(actual).toEqual({
      id: 1,
      name: 'mock name',
      is_complete: false
    })
  })

  it('invalid input: empty object', async () => {
    /** arrange */
    // fake data
    const newTodo = {} as NewTodo

    /** act */
    const actual = await todoService.addOne(newTodo)

    /** assert */
    expect(actual).toBe(undefined)
  })
})

describe('Read all todos', () => {
  // fake data
  const mockTodos: Todo[] = [
    { id: 1, name: 'mock name', is_complete: false },
    { id: 2, name: 'mock name', is_complete: false },
    { id: 3, name: 'mock name', is_complete: false },
    { id: 4, name: 'mock name', is_complete: false },
    { id: 5, name: 'mock name', is_complete: false },
  ]

  // mock func
  const mockGetAll = async () => {
    return mockTodos
  }

  it('success', async () => {
    /** arrange */
    // mock database operation
    const spyGetAll = jest.spyOn(todoRepo, 'getAll')
      .mockImplementation(mockGetAll)

    /** act */
    const actual = await todoService.getAll()

    // restore the mock
    spyGetAll.mockRestore()

    /** assert */
    expect(actual).toEqual(mockTodos)
  })
})

describe('Read a todo', () => {
  // mock func
  const mockGetOne = async (id: number) => {
    let todo: Todo | undefined

    if (id >= 1) {
      todo = { id, name: 'mock name', is_complete: false }
    }

    return todo
  }

  it('success', async () => {
    /** arrange */
    // mock database operation
    const spyGetOne = jest.spyOn(todoRepo, 'getOne')
      .mockImplementation(mockGetOne)

    /** act */
    const actual = await todoService.getOne('1')

    // restore the mock
    spyGetOne.mockRestore()

    /** assert */
    expect(actual).toEqual({
      id: 1,
      name: 'mock name',
      is_complete: false
    })
  })

  it('invalid input: no item exists with given ID', async () => {
    /** arrange */
    // mock database operation
    const spyGetOne = jest.spyOn(todoRepo, 'getOne')
      .mockImplementation(mockGetOne)

    /** act */
    const actual = await todoService.getOne('0')

    // restore the mock
    spyGetOne.mockRestore()

    /** assert */
    expect(actual).toBe(undefined)
  })

  it('invalid input: ID cannot be `string`', async () => {
    /** arrange */
    // mock database operation
    const spyGetOne = jest.spyOn(todoRepo, 'getOne')
      .mockImplementation(mockGetOne)

    /** act */
    const actual = await todoService.getOne('item')

    // restore the mock
    spyGetOne.mockRestore()

    /** assert */
    expect(actual).toBe(undefined)
  })
})

describe('Update a todo', () => {
  // fake data
  const originTodo = {
    id: 1,
    name: 'origin name',
    is_complete: false
  }

  // mock func
  const mockUpdateOne = async (id: number, partial: PartialTodo) => {
    let todo: Todo | undefined

    if (id === originTodo.id) {
      todo = { ...originTodo, ...partial }
    }

    return todo
  }

  it('success: only update `name`', async () => {
    /** arrange */
    // fake data
    const partial: PartialTodo = { name: 'updated name' }
    const spyUpdateOne = jest.spyOn(todoRepo, 'updateOne')
      .mockImplementation(mockUpdateOne)

    /** act */
    const actual = await todoService.updateOne('1', partial)

    // restore the mock
    spyUpdateOne.mockRestore()

    /** assert */
    expect(actual).toEqual({
      id: 1,
      name: 'updated name',
      is_complete: false
    })
  })

  it('success: only update `is_complete`', async () => {
    /** arrange */
    // fake data
    const partial: PartialTodo = { is_complete: true }
    const spyUpdateOne = jest.spyOn(todoRepo, 'updateOne')
      .mockImplementation(mockUpdateOne)

    /** act */
    const actual = await todoService.updateOne('1', partial)

    // restore the mock
    spyUpdateOne.mockRestore()

    /** assert */
    expect(actual).toEqual({
      id: 1,
      name: 'origin name',
      is_complete: true
    })
  })

  it('invalid input: no item exists with given ID', async () => {
    /** arrange */
    // fake data
    const partial = { name: 'updated name' }

    // mock database operation
    const spyUpdateOne = jest.spyOn(todoRepo, 'updateOne')
      .mockImplementation(mockUpdateOne)

    /** act */
    const actual = await todoService.updateOne('0', partial)

    // restore the mock
    spyUpdateOne.mockRestore()

    /** assert */
    expect(actual).toBe(undefined)
  })

  it('invalid input: ID cannot be `string`', async () => {
    /** arrange */
    // fake data
    const partial = { name: 'updated name' }

    // mock database operation
    const spyUpdateOne = jest.spyOn(todoRepo, 'updateOne')
      .mockImplementation(mockUpdateOne)

    /** act */
    const actual = await todoService.updateOne('item', partial)

    // restore the mock
    spyUpdateOne.mockRestore()

    /** assert */
    expect(actual).toBe(undefined)
  })
})

describe('Delete a todo', () => {
  // fake data
  const mockTodo: Todo = {
    id: 1,
    name: 'mock name',
    is_complete: false
  }

  // mock func
  const mockDeleteOne = async (id: number) => {
    let todo: Todo | undefined

    if (id === mockTodo.id) {
      todo = mockTodo
    }

    return todo
  }

  it('success', async () => {
    /** arrange */
    // mock database operation
    const spyDeleteOne = jest.spyOn(todoRepo, 'deleteOne')
      .mockImplementation(mockDeleteOne)

    /** act */
    const actual = await todoService.deleteOne('1')

    // restore the mock
    spyDeleteOne.mockRestore()

    /** assert */
    expect(actual).toEqual(mockTodo)
  })

  it('invalid input: no item exists with given ID', async () => {
    /** arrange */
    // mock database operation
    const spyDeleteOne = jest.spyOn(todoRepo, 'deleteOne')
      .mockImplementation(mockDeleteOne)

    /** act */
    const actual = await todoService.deleteOne('0')

    // restore the mock
    spyDeleteOne.mockRestore()

    /** assert */
    expect(actual).toBe(undefined)
  })

  it('invalid input: ID cannot be `string`', async () => {
    /** arrange */
    // mock database operation
    const spyDeleteOne = jest.spyOn(todoRepo, 'deleteOne')
      .mockImplementation(mockDeleteOne)

    /** act */
    const actual = await todoService.deleteOne('item')

    // restore the mock
    spyDeleteOne.mockRestore()

    /** assert */
    expect(actual).toBe(undefined)
  })
})
