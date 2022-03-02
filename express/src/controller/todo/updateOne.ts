import { Request, Response } from 'express'
import { todoService } from '../../service'
import { Result } from '../../types'

/** PATCH '/api/v1/todos/:id' */
const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, is_complete } = req.body
  let statusCode: number
  let result: Result

  try {
    const todo = await todoService.updateOne(id, { name, is_complete })

    statusCode = 200
    result = {
      status: 'done',
      msg: 'The todo item had been updated.',
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

export default updateOne
