// We only need to import the modules necessary for initial render

// layout
import {injectReducer} from '../store/reducers';
import WechatLoginLayout from '../layouts/WechatLoginLayout';
import WechatLoginLayoutReducer from '../layouts/WechatLoginLayout/reducer';

import BaseLayoutReducer from '../layouts/BaseLayout/reducer';
import BaseLayout from '../layouts/BaseLayout';

import DdLayoutReducer from '../layouts/DdLayout/reducer';
import layoutEhrReducer from '../layouts/Ehr/reducer';
import DdLayout from '../layouts/DdLayout';

import TrainLayout from '../layouts/TrainLayout';
import TrainLayoutReducer from '../layouts/TrainLayout/reducer';

// routes fowarding
import UserLoginWechat from './User/LoginWechat';

/**
 * user
 */
import UserLoginDd from './User/LoginDd';

// 首页
import Index from './Index/index';
// 导入
import Import from './Import';
// 绩效
import PerformanceUser from './Performance/User';
import PerformanceUsers from './Performance/Users';
import PerformanceDepartment from './Performance/Department';
import PerformanceDepartments from './Performance/Departments';
import PerformanceOkrFeedbackList from './Performance/Okr/Feedback/List';
import PerformanceOkrFeedbackEdit from './Performance/Okr/Feedback/Edit';
import PerformanceOkrFeedbackDetail from './Performance/Okr/Feedback/Detail';
import PerformanceLoveFeedbackDetail from './Performance/Love/Feedback/Detail';
import PerformanceLoveFeedbackList from './Performance/Love/Feedback/List';
import PerformanceAmoebaFeedbackList from './Performance/Amoeba/Feedback/List';

// import ShowBecomeIndex from './Show/Become/Index';
// import ShowLeaveIndex from './Show/Leave/Index';
// import ShowPromotionIndex from './Show/Promotion/Index';
// import ShowTrainIndex from './Show/Train/Index';


/**
 * recruit
 */
// Dd
import DdIndex from './Recruit/Dd/Index';

import DdInterviewUserList from './Recruit/Dd/Interview/UserList';

import DdBackStageJob from './Recruit/Dd/BackStage/Job';
import DdBackStageHrContact from './Recruit/Dd/BackStage/HrContact';
import DdBackStageJobType from './Recruit/Dd/BackStage/JobType';
import RecruitDdOfferSend from './Recruit/Dd/Offer/Send';

import DdBackCrawlingCv from './Recruit/Dd/BackStage/CrawlingCv';
import DdBackCvDetail from './Recruit/Dd/BackStage/CvDetail';
// wechat
import WechatPersonalCenterCv from './Recruit/Wechat/PersonalCenter/Cv';
import WechatPersonalCenterCvEdit from './Recruit/Wechat/PersonalCenter/CvEdit';
// base
import BaseSubscriptionIndex from './Recruit/Base/Subscription/index';
import BaseSubscriptionKnow from './Recruit/Base/Subscription/Know';
import BaseSubscriptionLearn from './Recruit/Base/Subscription/Learn';
import BaseSubscriptionVisit from './Recruit/Base/Subscription/Visit';
import BaseSubscriptionAdviseFeedback from './Recruit/Base/Subscription/Advise/Feedback';
import BaseSubscriptionAdviseProblem from './Recruit/Base/Subscription/Advise/Problem';

import BaseInterviewCheckIn from './Recruit/Base/Interview/CheckIn';
import BaseInterviewAnalysisQRCode from './Recruit/Base/Interview/AnalysisQRCode';
import BaseInterviewQRCodes from './Recruit/Base/Interview/QRCodes';

import BaseRecruitmentIndex from './Recruit/Base/Recruitment/Index';
import BaseRecruitmentCampusIndex from './Recruit/Base/Recruitment/Campus/Index';
import BaseRecruitmentList from './Recruit/Base/Recruitment/Campus/RecruitmentList';
import BaseRecruitmentDetail from './Recruit/Base/Recruitment/Campus/RecruitmentDetail';

import BaseTestRobotMessage from './Recruit/Base/TestRobotMessage';
import BaseSearchLink from './Recruit/Base/SearchLink';

/**
 * train
 */
//Coursera
import TrainCourseraField from './Train/Coursera/Field';
import TrainCourseraIndex from './Train/Coursera/Index';
import TrainCourseraChart from './Train/Coursera/Chart';
import TrainCourseraLatest from './Train/Coursera/Latest';
import TrainCourseraPersonal from './Train/Coursera/Personal';
import TrainCourseraDepartmentList from './Train/Coursera/DepartmentList';
import TrainCourseraManagement from './Train/Coursera/Management';


/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => [
    {
        path : '/user',
        childRoutes : [
            UserLoginDd(store), UserLoginWechat(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'baseLayout', reducer : BaseLayoutReducer});
                cb(null, BaseLayout);
            })
        }
    },

    {
        path : '/',
        indexRoute : Index(store),
        childRoutes : [
            Import(store),

            PerformanceUser(store), PerformanceUsers(store), PerformanceDepartment(store), PerformanceDepartments(store), PerformanceOkrFeedbackList(store), PerformanceOkrFeedbackEdit(store),
            PerformanceOkrFeedbackDetail(store), PerformanceLoveFeedbackDetail(store), PerformanceLoveFeedbackList(store), PerformanceAmoebaFeedbackList(store),

            // ShowBecomeIndex(store),
            // ShowLeaveIndex(store),
            // ShowPromotionIndex(store),
            // ShowTrainIndex(store),
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'ddLayout', reducer : DdLayoutReducer});
                injectReducer(store, {key : 'layoutEhr', reducer : layoutEhrReducer});
                cb(null, DdLayout);
            })
        }
    },

    // 招聘 不需要鉴权
    {
        path : '/recruit/base',
        indexRoute : BaseSubscriptionIndex(store),
        childRoutes : [
            BaseSubscriptionKnow(store), BaseSubscriptionLearn(store), BaseSubscriptionVisit(store),
            BaseSubscriptionAdviseFeedback(store), BaseSubscriptionAdviseProblem(store),BaseInterviewAnalysisQRCode(store),

            BaseInterviewCheckIn(store), BaseInterviewQRCodes(store),

            BaseRecruitmentIndex(store), BaseRecruitmentCampusIndex(store), BaseRecruitmentList(store), BaseRecruitmentDetail(store),

            BaseTestRobotMessage(store), BaseSearchLink(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'baseLayout', reducer : BaseLayoutReducer});
                cb(null, BaseLayout);
            })
        }
    },
    {
        path : '/train',
        indexRoute : TrainCourseraIndex(store),
        childRoutes : [
            TrainCourseraField(store),
            TrainCourseraChart(store),
            TrainCourseraLatest(store),
            TrainCourseraPersonal(store),
            TrainCourseraDepartmentList(store),
            TrainCourseraManagement(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'ddLayout', reducer : DdLayoutReducer});
                injectReducer(store, {key : 'TrainLayout', reducer : TrainLayoutReducer});
                cb(null, DdLayout);
            })
        }

    },
    {
        // 招聘 需要微信鉴权
        path : '/recruit/wechat',
        // indexRoute : RecruitIndex(store),
        childRoutes : [
            WechatPersonalCenterCv(store), WechatPersonalCenterCvEdit(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'wechatLoginLayout', reducer : WechatLoginLayoutReducer});
                cb(null, WechatLoginLayout);
            })
        }
    },

    // 招聘 需要钉钉鉴权
    {
        path : '/recruit/dd',
        indexRoute : DdIndex(store),
        childRoutes : [
            // 后台管理
            DdBackStageJob(store), DdBackStageHrContact(store), DdBackStageJobType(store), DdBackCrawlingCv(store), DdBackCvDetail(store),
            // 面试管理
            DdInterviewUserList(store),
            // 招聘发放
            RecruitDdOfferSend(store)

        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                injectReducer(store, {key : 'ddLayout', reducer : DdLayoutReducer});
                cb(null, DdLayout);
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
