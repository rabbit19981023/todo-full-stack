import { Todo, todoRepo } from '../../entity'
import { PartialTodo } from '../../types'

const updateOne = async (id: string, partial: PartialTodo) => {
  const _id = parseInt(id)
  const { name, is_complete } = partial
  const _partial: PartialTodo = {}
  let todo: Todo | undefined

  if (typeof name === 'string') {
    _partial.name = name
  }

  if (typeof is_complete === 'boolean') {
    _partial.is_complete = is_complete
  }

  if (
    _partial.name !== undefined ||
    _partial.is_complete !== undefined
  ) {
    todo = await todoRepo.updateOne(_id, _partial)
  }

  return todo
}

export default updateOne
