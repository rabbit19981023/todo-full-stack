import { State } from "../state"
import { Action } from 'vuex'

const deleteTodo: Action<State, State> = async (ctx, id: number) => {
  if (typeof id === 'number' && id >= 1) {
    const url = `http://localhost:3000/api/v1/todos/${id}`
    const response = await fetch(url, { method: 'DELETE' })
      .then(res => res.json())

    const todo = response.data

    ctx.commit('deleteTodo', todo)
    return
  }

  alert('invalid operation!')
}

export default deleteTodo
