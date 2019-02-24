import { get } from 'lodash'
import { createSelector } from 'reselect'

export const userSelector = state => get(state, ['user'])
export const emailSelector = createSelector(
	userSelector,
	user => get(user, ['email'])
)
export const isLoadingSelector = createSelector(
	userSelector,
	user => get(user, ['isLoading'])
)

export const errorSelector = createSelector(
	userSelector,
	user => get(user, ['error'])
)
