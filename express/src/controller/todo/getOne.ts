import { Request, Response } from 'express'
import { todoService } from '../../service'
import { Result } from '../../types'

/** GET '/api/v1/todos/:id' */
const getOne = async (req: Request, res: Response) => {
  const { id } = req.params
  let statusCode: number
  let result: Result

  try {
    const todo = await todoService.getOne(id)

    statusCode = 200
    result = {
      status: 'done',
      msg: 'Got a todo item by given ID.',
      data: todo
    }

    if (todo === undefined) {
      statusCode = 404
      result = { status: 'error', msg: 'No todo item had been found.' }
    }
  } catch (err) {
    statusCode = 500
    result = { status: 'error', msg: 'Internal server error.' }
    console.error(err)
  }

  res.status(statusCode).json(result)
}

export default getOne
