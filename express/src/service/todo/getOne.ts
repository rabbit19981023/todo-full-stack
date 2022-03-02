import { todoRepo } from '../../entity'

const getOne = async (id: string) => {
  const _id = parseInt(id)
  const todo = await todoRepo.getOne(_id)
  return todo
}

export default getOne
