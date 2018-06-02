import { createSelector } from 'reselect'
export const indexSelector = createSelector(
  state => state.routeIndex,
  (routeIndex) => {
    return {
      routeIndex
    }
  }
)
