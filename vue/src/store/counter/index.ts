import { InjectionKey } from 'vue'
import { Store, StoreOptions, createStore, useStore as baseUseStore } from 'vuex'
import state, { State } from './state'
import mutations from './mutations'
import actions from './actions'

const storeOptions: StoreOptions<State> = {
  state,
  mutations,
  actions
}

const key: InjectionKey<Store<State>> = Symbol()

const store = createStore(storeOptions)

const useStore = () => {
  return baseUseStore(key)
}

export { key, store, storeOptions, useStore }
