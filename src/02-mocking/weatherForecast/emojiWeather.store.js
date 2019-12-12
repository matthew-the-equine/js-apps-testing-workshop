export const fetchForecast = (payload = 'stormWithRain') => ({ type: 'FETCH_FORECAST', payload })

export const weatherReducer = (
  state = {
    season: 'spring',
    forecastResponse: null,
  },
  action,
) => {
  switch(action.type) {
    case 'FETCH_FORECAST':
      return ({
      ...state,
      forecastResponse: action.payload,
    })
    default:
      return state
  }
}
