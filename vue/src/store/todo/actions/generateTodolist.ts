import { State } from '../state'
import { Action } from 'vuex'

const generateTodolist: Action<State, State> = async (ctx) => {
  const response = await fetch('http://localhost:3000/api/v1/todos')
    .then((res) => res.json())
  const todos = response.data
  ctx.commit('generateTodolist', todos)
}

export default generateTodolist
