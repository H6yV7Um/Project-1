import { injectReducer } from '../store/reducers';
// layout
import LayoutCionReducer from '../layouts/Coin/reducer'
import LayoutCoin from '../layouts/Coin'
// app
import Index from './Coin/Index'
export const createRoutes = (store) => [
  {
    path : '/',
    indexRoute : Index(store),
    childRoutes : [
    ],
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        injectReducer(store, {key : 'LayoutCoin', reducer : LayoutCionReducer});
        cb(null, LayoutCoin);
      }, 'layout')
    }
  }
]
export default createRoutes
