import { Todo, getTodoRepo } from './'

const deleteOne = async (id: number) => {
  const repo = getTodoRepo()
  let todo: Todo | undefined

  if (id >= 1) {
    todo = await repo.findOne({ where: { id } })
    await repo.delete({ id })
  }

  return todo
}

export default deleteOne
