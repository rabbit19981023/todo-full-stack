import { State } from '../state'
import { Mutation } from 'vuex'

const decrement: Mutation<State> = (state) => {
  state.count -= 1
}

export default decrement
