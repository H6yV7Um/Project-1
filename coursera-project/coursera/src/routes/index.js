import {injectReducer} from '../store/reducers';

// layout
import LayoutBaseReducer from '../layouts/Base/reducer';
import LayoutBase from '../layouts/Base';
import LayoutDdReducer from '../layouts/Dd/reducer';
import LayoutDd from '../layouts/Dd';
import LayoutCourseraReducer from '../layouts/Coursera/reducer';
import LayoutCoursera from '../layouts/Coursera';

// user
import UserLogin from './User/Login';

// coursera
import Import from './Coursera/Import';
import Field from './Coursera/Field';
import Index from './Coursera/Index';
import Chart from './Coursera/Chart';
import Latest from './Coursera/Latest';
import Personal from './Coursera/Personal';
import DepartmentList from './Coursera/DepartmentList';
import Management from './Coursera/Management';


export const createRoutes = (store) => [
    {
        path : '/user',
        childRoutes : [
            UserLogin(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'layoutBase', reducer : LayoutBaseReducer});
                cb(null, LayoutBase);
            })
        }
    },
    {
        path : '/',
        indexRoute : Index(store),
        childRoutes : [
            Import(store),
            Field(store),
            Chart(store),
            Latest(store),
            Personal(store),
            DepartmentList(store),
            Management(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'layoutDd', reducer : LayoutDdReducer});
                injectReducer(store, {key : 'LayoutCoursera', reducer : LayoutCourseraReducer});
                cb(null, LayoutDd);
            })
        }

    }
]

export default createRoutes;
