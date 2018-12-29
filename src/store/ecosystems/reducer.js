import Cookie from 'js-cookie'
import { FETCHING_ECOSYSTEMS_SUCCESS, SET_CURRENT_ECOSYSTEM } from './action-types'

const initialState = {
  items: [],
  currentEcosystem: Cookie.get('currentEcosystem')
}

export function ecosystemsReducer (state = initialState, { type, payload }) {
  switch (type) {
    case FETCHING_ECOSYSTEMS_SUCCESS: {
      return {
        ...state,
        items: payload
      }
    }
    case SET_CURRENT_ECOSYSTEM: {
      return {
        ...state,
        currentEcosystem: payload.id
      }
    }
    default:
      return state
  }
}
