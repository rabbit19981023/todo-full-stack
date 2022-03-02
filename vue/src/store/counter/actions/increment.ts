import { State } from '../state'
import { Action } from 'vuex'

const increment: Action<State, State> = (ctx) => {
  ctx.commit('increment')
}

export default increment
