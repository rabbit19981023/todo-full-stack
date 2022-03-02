import { StoreOptions } from 'vuex'

interface State {
  count: number
}

const state: StoreOptions<State>["state"] = () => {
  return {
    count: 0
  }
}

export default state
export { State }
