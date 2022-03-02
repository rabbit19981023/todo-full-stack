import { Todo, getTodoRepo } from './'
import { NewTodo } from '../../types'

const addOne = async (newTodo: NewTodo) => {
  const { name } = newTodo
  const repo = getTodoRepo()

  const entity = new Todo()
  entity.name = name
  entity.is_complete = false

  const todo = await repo.save(entity)
  return todo
}

export default addOne
