import { todoRepo } from '../../entity'

const getAll = async () => {
  const todos = await todoRepo.getAll()
  return todos
}

export default getAll
