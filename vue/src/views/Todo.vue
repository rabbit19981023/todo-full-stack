<template>
  <div class="todo">
    <TodoComponent />
  </div>
</template>

<script>
import TodoComponent from '@/components/Todo.vue'

export default {
  name: 'Todo',
  components: {
    TodoComponent
  }
}
</script>
