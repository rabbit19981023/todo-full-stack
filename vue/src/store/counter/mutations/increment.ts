import { State } from '../state'
import { Mutation } from 'vuex'

const increment: Mutation<State> = (state) => {
  state.count += 1
}

export default increment
