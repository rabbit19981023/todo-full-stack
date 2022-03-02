import { State } from '../state'
import { Action } from 'vuex'

const createTodo: Action<State, State> = async (ctx, name: string) => {
  if (name) {
    const newTodo = { name }

    const response = await fetch('http://localhost:3000/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(newTodo)
    }).then(res => res.json())

    const todo = response.data

    ctx.commit('createTodo', todo)
    return
  }

  alert('please typing your todo!')
}

export default createTodo
