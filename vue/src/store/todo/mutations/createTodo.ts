import { Todo, State } from '../state'
import { Mutation } from 'vuex'

const createTodo: Mutation<State> = (state, todo: Todo) => {
  state.todos.push(todo)
}

export default createTodo
