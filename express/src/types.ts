import { Todo } from './entity'

type Result = {
  status: 'done' | 'error',
  msg: string,
  data?: Todo[] | Todo | undefined
}

type NewTodo = {
  name: string
}

type PartialTodo = {
  name?: string,
  is_complete?: boolean
}

export { Result, NewTodo, PartialTodo }
