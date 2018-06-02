import {injectReducer} from '../store/reducers';

// layout
import LayoutAppReducer from '../layouts/App/reducer';
import LayoutApp from '../layouts/App';

// app
import Index from './App/Index';

export const createRoutes = (store) => [
    {
        path : '/',
        indexRoute : Index(store),
        childRoutes : [

        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'LayoutApp', reducer : LayoutAppReducer});
                cb(null, LayoutApp);
            })
        }

    }
]

export default createRoutes;
