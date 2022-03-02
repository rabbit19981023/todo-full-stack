import { Todo, getTodoRepo } from './'
import { PartialTodo } from '../../types'

const updateOne = async (id: number, partial: PartialTodo) => {
  const repo = getTodoRepo()
  let todo: Todo | undefined

  if (id >= 1) {
    await repo.update({ id }, partial)
    todo = await repo.findOne({ where: { id } })
  }

  return todo
}

export default updateOne
