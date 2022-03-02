<template>
  <div class="todo-list">
    <input
      class="create form-control d-inline w-auto"
      type="text"
      placeholder="enter your todo here"
      v-model="newTodo"
    >
    <button
      class="create btn btn-sm btn-primary ms-2"
      @click="createTodo(newTodo)"
    >create</button>

    <div
      :class="[ { 'is-complete': todo.is_complete }, 'todo', 'my-2' ]"
      v-for="todo in todos"
      :key="todo.id"
    >
      <span class="name">{{ todo.name }}</span>
      <button
        class="complete btn btn-sm btn-success ms-2"
        @click="completeTodo(todo.id)"
      >complete</button>
      <button
        class="delete btn btn-sm btn-danger ms-2"
        @click="deleteTodo(todo.id)"
      >delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { Todo, useStore } from '../store/todo'

export default defineComponent({
  setup() {
    const store = useStore()
    const todos = computed(() => store.state.todos)
    const newTodo = ref<Todo["name"]>('')

    const createTodo = (name: string) => {
      store.dispatch('createTodo', name)
    }

    const completeTodo = (id: number) => {
      store.dispatch('completeTodo', id)
    }

    const deleteTodo = (id: number) => {
      store.dispatch('deleteTodo', id)
    }

    onMounted(() => {
      store.dispatch('generateTodolist')
    })

    return {
      todos,
      newTodo,
      createTodo,
      completeTodo,
      deleteTodo
    }
  },
})
</script>

<style scoped>

.todo.is-complete {
  opacity: .5
}

</style>
