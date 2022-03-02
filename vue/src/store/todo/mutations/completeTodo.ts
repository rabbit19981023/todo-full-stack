import { Todo, State } from '../state'
import { Mutation } from 'vuex'

const completeTodo: Mutation<State> = (state, todo: Todo) => {
  const id = todo.id
  const todos = state.todos
  const targetTodo = todos.find(todo => todo.id === id)

  if (targetTodo) {
    targetTodo.is_complete = todo.is_complete
  }
}

export default completeTodo
