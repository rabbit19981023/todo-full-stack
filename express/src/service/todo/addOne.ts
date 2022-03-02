import { Todo, todoRepo } from '../../entity'
import { NewTodo } from '../../types'

const addOne = async (newTodo: NewTodo) => {
  const { name } = newTodo
  let todo: Todo | undefined

  if (typeof name === 'string') {
    todo = await todoRepo.addOne(newTodo)
  }

  return todo
}

export default addOne
