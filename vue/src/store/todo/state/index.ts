import { StoreOptions } from 'vuex'

interface Todo {
  id: number,
  name: string,
  is_complete: boolean
}

interface State {
  todos: Todo[]
}

const state: StoreOptions<State>["state"] = () => {
  return {
    todos: []
  }
}

export default state
export { Todo, State }
