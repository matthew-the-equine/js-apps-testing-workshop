const defaultActionHandler = state => state
const reducerFactory = ({
  initialState,
  actionHandlers,
}) => ( // Reducer starts here
  state = initialState,
  { type, payload },
) => {
  const actionHandler = actionHandlers[type] || defaultActionHandler
  return actionHandler(state, payload, type)
}

describe.skip(`TodoReducer`, () => {
  it('should map state with provided action handler v1', () => {
    // given
    const initialState = {}
    const TEST_ACTION_TYPE = 'TEST_ACTION_TYPE'
    const testActionHandlerReturnValue = { testKey: 'new test value' }
    const testActionHandler = jest.fn(() => testActionHandlerReturnValue)

    const actionHandlers = {
      [TEST_ACTION_TYPE]: testActionHandler,
    }
    const payload = 'test payload'
    const prevState = { testKey: 'test value' }
    const action = { type: TEST_ACTION_TYPE, payload }

    // when
    const reducer = reducerFactory({ initialState, actionHandlers })
    const nextState = reducer(prevState, action)

    // then
    expect(testActionHandler).toHaveBeenCalledWith(prevState, payload, TEST_ACTION_TYPE)
    expect(nextState).toEqual(testActionHandlerReturnValue)
  })

  it('should map state with provided action handler v2', () => {
    // given
    const initialState = {
      testKey: 'a',
      otherKeyThatShouldNotBeChanged: 'b',
    } // 👈 initial state
    const TEST_ACTION_TYPE = 'TEST_ACTION_TYPE'
    const testActionHandler = (state, payload) => (
      { ...state, testKey: payload + ' all is good' }
    ) // 👈 an example handler

    const actionHandlerThatShouldNotBeFired = (state, payload) => ({ testKey: 'everything is broken' })

    const actionHandlers = {
      'OTHER_ACTION_TYPE': actionHandlerThatShouldNotBeFired,
      [TEST_ACTION_TYPE]: testActionHandler,
    }
    const payload = 'test payload'
    const action = { type: TEST_ACTION_TYPE, payload } // 👈 action we test and the payload

    // when
    const reducer = reducerFactory({ initialState, actionHandlers })
    const nextState = reducer(initialState, action) // 👈 calling reducer

    // then
    expect(nextState).toEqual({
      testKey: 'test payload all is good',
      otherKeyThatShouldNotBeChanged: 'b',
    }) // 👈 changes only what we need
  })
})
