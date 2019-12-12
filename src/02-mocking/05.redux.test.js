import React from 'react'
import {
  createStore,
  // 🦖 Uncomment later:
  // applyMiddleware,
} from 'redux'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { render } from '@testing-library/react'

import EmojiWeather from '../weatherForecast/emojiWeather'
import { emojis } from '../weatherForecast/emojis'
import {
  // 🦖 Uncomment later:
  // fetchForecast,
  // weatherReducer,
} from '../weatherForecast/emojiWeather.store'

const mockStore = configureMockStore()

// 💡 https://testing-library.com/docs/dom-testing-library/cheatsheet
describe('redux tests', () => {
  it('should render rainfall emoji based on fake global state', () => {
    // given
    const store = mockStore({
      season: 'spring',
      forecastResponse: 'rainfall',
      // ...other state
    })
    const text = emojis.rainfall

    // when
    const {
      queryByText,
      debug,
      // container,
      // getByText,
      // getAllByText,
      // getByDisplayValue,
    } = render(
      <Provider store={store}>
        <EmojiWeather />
      </Provider>,
    )

    // 💡 Uncomment too see what renders:
    // debug()

    // then
    expect(queryByText(text, { exact: false })).not.toEqual(null)
    expect(store.getActions()[0]).toEqual({ type: 'FETCH_FORECAST', payload: 'stormWithRain' })

    // and when
    // action is dispatched again
    // ...
    // 🤷
  })

  it('should render rainfall emoji based on real global state', async () => {
    // given
    const actionLoggerMiddleware = store => next => action => next(action)

    const store = createStore(
      // reducer
      // middleware
    )

    // when
    const {
      findByText,
      debug,
    } = render(
      <Provider store={store}>
        <EmojiWeather />
      </Provider>,
    )

    // 💡 Uncomment too see what renders:
    // debug()

    // then
    // expect to find element by stormWithRain text
    // FETCH_FORECAST was called

    // and when
    // we dispatch the action again

    // then
    // expect to find element by snowfall text
    // FETCH_FORECAST was called

    // 👍
  })

  // 📝 TODO: extract setup

  // 📝 TODO: any other ideas?
})