import { State } from '../state'
import { Action } from 'vuex'

const completeTodo: Action<State, State> = async (ctx, id: number) => {
  const todos = ctx.state.todos
  const targetTodo = todos.find(todo => todo.id === id)

  if (targetTodo) {
    const partial = {
      // toggle boolean value
      is_complete: !targetTodo.is_complete
    }

    const url = `http://localhost:3000/api/v1/todos/${id}`
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(partial)
    }).then(res => res.json())

    const todo = response.data

    ctx.commit('completeTodo', todo)
    return
  }

  alert('invalid operation!')
}

export default completeTodo
