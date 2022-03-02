import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'
import { createStore } from 'vuex'
import { key, storeOptions } from '@/store/counter'

const factory = () => {
  const store = createStore(storeOptions)
  return shallowMount(Counter, {
    global: {
      plugins: [
        [store, key]
      ]
    }
  })
}

describe('Counter.vue', () => {
  it('increase number by 1', async () => {
    /** arrange */
    const wrapper = factory()

    /** act */
    await wrapper.find('.btn-increment').trigger('click')

    /** assert */
    expect(wrapper.find('.counter-text').text()).toBe('1')
  })

  it('decrease number by 1', async () => {
    /** arrange */
    const wrapper = factory()

    /** act */
    await wrapper.find('.btn-decrement').trigger('click')

    /** assert */
    expect(wrapper.find('.counter-text').text()).toBe('-1')
  })
})
