import { getTodoRepo } from './'

const getAll = async () => {
  const repo = getTodoRepo()
  const todos = await repo.find({})
  return todos
}

export default getAll
