import { Request, Response } from 'express'
import { todoService } from '../../service'
import { Result } from '../../types'

/** GET '/api/v1/todos' */
const getAll = async (req: Request, res: Response) => {
  let statusCode: number
  let result: Result

  try {
    const todos = await todoService.getAll()

    statusCode = 200
    result = {
      status: 'done',
      msg: 'Got all todo items.',
      data: todos
    }
  } catch (err) {
    statusCode = 500
    result = { status: 'error', msg: 'Internal server error.' }
    console.error(err)
  }

  res.status(statusCode).json(result)
}

export default getAll
