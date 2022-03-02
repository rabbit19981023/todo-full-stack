<template>
  <div class="counter">
    <p class="counter-text">{{ counter }}</p>
    <button
      class="btn btn-sm btn-primary me-2 btn-increment"
      @click="increment"
    >increment</button>
    <button
      class="btn btn-sm btn-danger btn-decrement"
      @click="decrement"
    >decrement</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../store/counter'

export default defineComponent({
  setup() {
    const store = useStore()
    const counter = computed(() => store.state.count)

    const increment = () => {
      store.dispatch('increment')
    }

    const decrement = () => {
      store.dispatch('decrement')
    }

    return {
      counter,
      increment,
      decrement
    }
  },
})
</script>
