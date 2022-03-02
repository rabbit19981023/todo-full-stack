import { Request, Response } from 'express'
import { todoService } from '../../service'
import { Result } from '../../types'

/** POST '/api/v1/todos' */
const addOne = async (req: Request, res: Response) => {
  const { name } = req.body
  let statusCode: number
  let result: Result

  try {
    const todo = await todoService.addOne({ name })

    statusCode = 201
    result = {
      status: 'done',
      msg: 'The new todo item had been created.',
      data: todo
    }

    if (todo === undefined) {
      statusCode = 400
      result = { status: 'error', msg: 'Bad request.' }
    }
  } catch (err) {
    statusCode = 500
    result = { status: 'error', msg: 'Internal server error.' }
    console.error(err)
  }

  res.status(statusCode).json(result)
}

export default addOne
