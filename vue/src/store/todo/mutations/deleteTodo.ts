import { Todo, State } from "../state"
import { Mutation } from 'vuex'

const deleteTodo: Mutation<State> = (state, todo: Todo) => {
  const id = todo.id
  const todos = state.todos
  const targetTodo = todos.find(todo => todo.id === id)
  
  if (targetTodo) {
    const index = todos.indexOf(targetTodo)
    todos.splice(index, 1)
  }
}

export default deleteTodo
