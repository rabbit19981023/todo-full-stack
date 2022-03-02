import { todoRepo } from '../../entity'

const deleteOne = async (id: string) => {
  const _id = parseInt(id)
  const todo = await todoRepo.deleteOne(_id)
  return todo
}

export default deleteOne
