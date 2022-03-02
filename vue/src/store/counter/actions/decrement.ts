import { State } from '../state'
import { Action } from "vuex"

const decrement: Action<State, State> = (ctx) => {
  ctx.commit('decrement')
}

export default decrement
