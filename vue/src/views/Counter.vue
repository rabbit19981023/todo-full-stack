<template>
  <div class="counter">
    <CounterComponent />
  </div>
</template>

<script>
import CounterComponent from '@/components/Counter.vue'

export default {
  name: 'Counter',
  components: {
    CounterComponent
  }
}
</script>
