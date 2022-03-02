import { Todo, getTodoRepo } from './'

const getOne = async (id: number) => {
  const repo = getTodoRepo()
  let todo: Todo | undefined

  if (id >= 1) {
    todo = await repo.findOne({ where: { id } })
  }

  return todo
}

export default getOne
