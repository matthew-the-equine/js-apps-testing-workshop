const messyAddTodoActionHandler = (todos, newTodo) => {
  const existingTodo = todos.find(todo => todo.id === newTodo.id)

  if (existingTodo) {
    const state = [
      ...todos.filter(todo => todo.id !== newTodo.id),
      {
        ...existingTodo,
        ...newTodo,
      },
    ]

    return state
  }

  const state= [
    ...todos,
    newTodo,
  ]

  return state

}

export const reducer = (
  state = {
    todos: [],
  },
  action,
) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: messyAddTodoActionHandler(state.todos, action.todo),
      }
    default:
      return state
  }
}
