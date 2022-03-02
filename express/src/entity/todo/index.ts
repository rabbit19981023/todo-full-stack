import { getRepository } from 'typeorm'

import Todo from './Todo'

import getAll from './getAll'
import getOne from './getOne'
import addOne from './addOne'
import updateOne from './updateOne'
import deleteOne from './deleteOne'

const todoRepo = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne
}

const getTodoRepo = () => {
  return getRepository(Todo, process.env.NODE_ENV)
}

export { Todo, todoRepo, getTodoRepo }
