import { reducer } from './03._reduxModule'

// 💡 Remember to unskip!
describe.skip(`TodoReducer`, () => {
  it.only(`should add todo`, () => {
    // given
    const newTodo = { id: 0, name: 'do stuff' }

    // when
    const result = reducer(
      undefined,
      { type: 'ADD_TODO', todo: newTodo },
    )

    // then
    expect(result).toEqual({
      todos: [
        newTodo,
      ],
    })
  })

  it(`should update todo`, () => {
    // given
    const newTodo = { id: 0, name: 'do stuff' }
    const updatedTodo = { id: 0, name: 'do stuff better', bonus: '🐹' }
    const state = reducer(
      undefined,
      { type: 'ADD_TODO', todo: newTodo },
    )

    // when
    const result = reducer(
      state,
      { type: 'ADD_TODO', todo: updatedTodo },
    )

    // then
    expect(result).toEqual({
      todos: [
        updatedTodo,
      ],
    })
  })

  it.todo(`📝 TODO: export...`)
})
