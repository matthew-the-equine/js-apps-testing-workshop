import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { render } from '@testing-library/react'

import EmojiWeather from '../weatherForecast/emojiWeather'
import { emojis } from '../weatherForecast/emojis'
import { weatherReducer, fetchForecast } from '../weatherForecast/emojiWeather.store'

const mockStore = configureMockStore()

// 💡 https://testing-library.com/docs/dom-testing-library/cheatsheet
describe('redux tests (final)', () => {
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
    // 💡 naive implementation:
    const allActions = []
    const actionLoggerMiddleware = store => next => action => {
      allActions.push(action)
      return next(action)
    }

    const store = createStore(
      weatherReducer,
      applyMiddleware(actionLoggerMiddleware),
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
    expect(await findByText(emojis.stormWithRain, { exact: false })).not.toEqual(null)
    expect(allActions[0]).toEqual({ type: 'FETCH_FORECAST', payload: 'stormWithRain' })

    // and when
    store.dispatch(fetchForecast('snowfall'))

    // then
    expect(await findByText(emojis.snowfall, { exact: false })).not.toEqual(null)
    expect(allActions[1]).toEqual({ type: 'FETCH_FORECAST', payload: 'snowfall' })

    // 👍
  })

  // 📝 TODO: extract setup

  // 📝 TODO: any other ideas?
})
