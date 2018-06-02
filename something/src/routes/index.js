// We only need to import the modules necessary for initial render
import {injectReducer} from '../store/reducers';

import CoreLayout from '../layouts/CoreLayout';
import CoreLayoutReducer from '../layouts/CoreLayout/reducer';

import BaseLayout from '../layouts/BaseLayout';
import BaseLayoutReducer from '../layouts/BaseLayout/reducer';

import CourseraLayout from '../layouts/CourseraLayout';
import CourseraLayoutReducer from '../layouts/CourseraLayout/reducer';


// Test
import TestTpl from './TestModule/TestTpl';
import UserLogin from './User/Login';

import SomethingIndex from './Something/Index';

// Car
import CarLayoutReducer from '../layouts/CarLayout/reducer';
import CarIndex from './Car/Index';
import CarAdd from './Car/Add';
import CarEdit from './Car/Edit';

// Book
import BookLayoutReducer from '../layouts/BookLayout/reducer';
import BookIndex from './Book/Index';
import BookRecommendReady from './Book/RecommendReady';
import BookRecommend from './Book/Recommend';
import BookDetail from './Book/Detail';
import BookRecommendList from './Book/RecommendList';
import BookLikeList from './Book/LikeList';
import BookThinkingPublish from './Book/Thinking/Publish';
import BookThinkingDetail from './Book/Thinking/Detail';
import BookTestSearch from './Book/TestSearch';
import BookBookLikeList from './Book/BookLikeList';
import BookLibrary from './Book/Library';
import BookPersonalCenter from './Book/PersonalCenter';
import BookSearch from './Book/BookSearch';

// Think
import ThinkLayoutReducer from '../layouts/ThinkLayout/reducer';
import ThinkIndex from './Think/Index';
import ThinkPublish from './Think/Publish';
import ThinkDetail from './Think/Detail';

// Account
import Account from './Account/Index';
import AccountPersonal from './Account/Personal';
import AccountGroup from './Account/Group';

//Coursera
import Field from './Coursera/Field';
import Table from './Coursera/Table';
import Index from './Coursera/Index';


/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => [
    {
        path : '/think',
        indexRoute : ThinkIndex(store),
        childRoutes : [
            ThinkPublish(store), ThinkDetail(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'coreLayout', reducer : CoreLayoutReducer});
                injectReducer(store, {key : 'thinkLayout', reducer : ThinkLayoutReducer});
                cb(null, CoreLayout);
            })
        }
    },

    {
        path : '/book',
        indexRoute : BookIndex(store),
        childRoutes : [
            BookRecommendReady(store), BookRecommend(store), BookDetail(store), BookRecommendList(store), BookLikeList(store), BookThinkingPublish(store), BookThinkingDetail(store),
            BookTestSearch(store), BookBookLikeList(store), BookLibrary(store), BookPersonalCenter(store), BookSearch(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'coreLayout', reducer : CoreLayoutReducer});
                injectReducer(store, {key : 'bookLayout', reducer : BookLayoutReducer});
                cb(null, CoreLayout);
            })
        }
    },

    {
        path : '/car',
        indexRoute : CarIndex(store),
        childRoutes : [
            CarAdd(store), CarEdit(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'coreLayout', reducer : CoreLayoutReducer});
                injectReducer(store, {key : 'carLayout', reducer : CarLayoutReducer});
                cb(null, CoreLayout);
            })
        }
    },

    {
        path : '/something',
        childRoutes : [
            TestTpl(store), UserLogin(store),
            Account(store), AccountPersonal(store), AccountGroup(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'baseLayout', reducer : BaseLayoutReducer});
                cb(null, BaseLayout);
            })
        }
    },
    {
        path : '/coursera',
        childRoutes : [
            Field(store),
            Table(store),
            Index(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'courseraLayout', reducer : CourseraLayoutReducer});
                cb(null, CourseraLayout);
            })
        }
    }
]

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
