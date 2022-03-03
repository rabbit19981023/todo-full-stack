import { shallowMount, VueWrapper } from '@vue/test-utils'
import Todo from '@/components/Todo.vue'
import { createStore, ActionContext } from 'vuex'
import { key, storeOptions, State, Todo as TodoItem } from '@/store/todo'
import { nextTick } from 'vue'

const factory = () => {
  const store = createStore(storeOptions)
  return shallowMount(Todo, {
    global: {
      plugins: [
        [store, key]
      ]
    }
  })
}

describe('Todo.vue', () => {
  it('generate todo list', async () => {
    /** arrange */
    // fake data
    const todos: TodoItem[] = [
      { id: 1, name: '1st todo', is_complete: false },
      { id: 2, name: '2nd todo', is_complete: false },
      { id: 3, name: '3rd todo', is_complete: false },
      { id: 4, name: '4th todo', is_complete: false },
      { id: 5, name: '5th todo', is_complete: false }
    ]

    // mock vuex store action
    mockGenerateTodolist(todos)

    const wrapper = factory()

    /** act */
    // wait for Vue re-render as state changes
    await nextTick()

    /** assert */
    expect(wrapper.findAll('.todo').length).toBe(5)
  })

  it('create a todo', async () => {
    /** arrange */
    // fake data
    const todos: TodoItem[] = []

    // mock vuex store actions
    mockGenerateTodolist(todos)
    mockCreateTodo()

    const wrapper = factory()

    /** act */
    await createTodo(wrapper)

    /** assert */
    expect(wrapper.find('.todo .name').text()).toEqual('read a book')
  })

  it('complete a todo', async () => {
    /** arrange */
    // fake data
    const todos: TodoItem[] = []

    // mock vuex store action
    mockGenerateTodolist(todos)
    mockCompleteTodo()

    const wrapper = factory()
    await createTodo(wrapper)

    /** act */
    await wrapper.find('button.complete').trigger('click')

    /** assert */
    expect(wrapper.find('.todo').classes()).toContain('is-complete')
  })

  it('delete a todo', async () => {
    /** arrrange */
    // fake data
    const todos: TodoItem[] = []

    // mock vuex store actions
    mockGenerateTodolist(todos)
    mockDeleteTodo()

    const wrapper = factory()
    await createTodo(wrapper)

    /** act */
    await wrapper.find('button.delete').trigger('click')

    /** assert */
    expect(wrapper.find('.todo').exists()).toBe(false)
  })
})

/** utils */
const mockGenerateTodolist = (todos: TodoItem[]) => {
  const mockFunc = async (ctx: ActionContext<State, State>) => {
    ctx.commit('generateTodolist', todos)
  }

  // manual mock Vuex store action (mock http request)
  (storeOptions.actions!).generateTodolist = jest.fn()
    .mockImplementation(mockFunc)
}

const mockCreateTodo = () => {
  const mockFunc = async (ctx: ActionContext<State, State>, name: string) => {
    if (name) {
      const todo = {
        id: ctx.state.todos.length + 1,
        name,
        is_complete: false
      }
      ctx.commit('createTodo', todo)
      return
    }
    alert('please typing your todo!')
  }

  // manual mock Vuex store action (mock http request)
  (storeOptions.actions!).createTodo = jest.fn()
    .mockImplementation(mockFunc)
}

const mockCompleteTodo = () => {
  const mockFunc = async (ctx: ActionContext<State, State>, id: number) => {
    const todos = ctx.state.todos
    const targetTodo = todos.find(todo => todo.id === id)

    if (targetTodo) {
      targetTodo.is_complete = !targetTodo.is_complete
      ctx.commit('completeTodo', targetTodo)
      return
    }

    alert('invalid operation!')
  }

  // manual mock Vuex store action (mock http request)
  (storeOptions.actions!).completeTodo = jest.fn()
    .mockImplementation(mockFunc)
}

const mockDeleteTodo = () => {
  const mockFunc = async (ctx: ActionContext<State, State>, id: number) => {
    const todos = ctx.state.todos
    const targetTodo = todos.find(todo => todo.id === id)

    if (targetTodo) {
      ctx.commit('deleteTodo', targetTodo)
      return
    }

    alert('invalid operation!')
  }

  // manual mock Vuex store action (mock http request)
  (storeOptions.actions!).deleteTodo = jest.fn()
    .mockImplementation(mockFunc)
}

const createTodo = async (wrapper: VueWrapper<any>) => {
  await wrapper.find('input.create').setValue('read a book')
  await wrapper.find('button.create').trigger('click')
}
