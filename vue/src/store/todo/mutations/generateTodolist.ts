import { Todo, State } from "../state"
import { Mutation } from 'vuex'

const generateTodolist: Mutation<State> = (state, todos: Todo[]) => {
  state.todos = []
  
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i]
    state.todos.push(todo)
  }
}

export default generateTodolist
