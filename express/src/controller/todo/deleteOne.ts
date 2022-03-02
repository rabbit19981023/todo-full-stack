import { Request, Response } from 'express'
import { todoService } from '../../service'
import { Result } from '../../types'

/** DELETE '/api/v1/todos/:id' */
const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  let statusCode: number
  let result: Result

  try {
    const todo = await todoService.deleteOne(id)

    statusCode = 200
    result = {
      status: 'done',
      msg: 'The todo item had been deleted.',
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

export default deleteOne
