 // We only need to import the modules necessary for initial render
import {injectReducer} from '../store/reducers'
import Home from './Home'
import LoginRoute from './Login'
import DingdingRoute from './Dingding'
import ModuleRoute from './Kernel/Module'
import PermissionRoute from './Kernel/Permission'
import AccessDeniedRoute from './Kernel/AccessDenied'
import ScorePreferencesRoute from './Performance/Score/Preferences'
import {TaxesViewRouter, TaxesAddViewRouter} from './Remuneration/Taxes'
import FieldRoute from './Profile/Field'
import {SalaryViewRouter, SalaryAddViewRouter} from './Remuneration/Salary'
import {FundViewRouter, FundAddViewRouter} from './Remuneration/Fund'
import InsuranceRoute from './Remuneration/Insurance'
import {ProfileViewRouter, ProfileAddStepFirstViewRouter, ProfileAddStepSecondViewRouter, ProfileEmployeeDetailsViewRouter} from './Profile'
import OrganizationRoute from './Organization'
import {CompleteViewRouter} from './Profile/Complete'
import {MyprofileViewRouter} from './Profile/Myprofile'
import {MachineViewRouter, MachineAddViewRouter} from './Attendance/Machine'
import {MyCalendarViewRouter} from './Attendance/MyCalendar'
import {MyWorkmateViewRouter} from './Attendance/MyWorkmate'
import {CycleViewRouter, CycleAddViewRouter} from './Attendance/Cycle'
import {RuleViewRouter, RuleLeaveAddViewRouter, RuleAddViewRouter} from './Attendance/Rule'
import {CalendarViewRouter, CalendarAddViewRouter} from './Attendance/Calendar'
import {SolutionViewRouter, SolutionAddViewRouter , SolutionFlowDesignViewRouter} from './Workflow/Solution'
import {StartViewRouter,StartApprovalViewRouter} from './Workflow/Start'
import {HistoryViewRouter,DetailsViewRouter} from './Workflow/History'
import {PendingViewRouter,ApproveViewRouter} from './Workflow/Pending'
import {SignedViewRouter,SignedDetailsViewRouter} from './Workflow/Signed'
import {CopytoViewRouter,CopytoDetailsViewRouter} from './Workflow/Copyto'
import AuthRoute from './Auth'
import {JumpViewRouter} from './Jump'
export const createRoutes = (store) => [
    {
        "path": '/',
        "indexRoute": Home(store),
        "childRoutes": [
            Home(store),
            ModuleRoute(store),
            PermissionRoute(store),
            ScorePreferencesRoute(store),
            FieldRoute(store),
            ProfileViewRouter(store),
            ProfileAddStepFirstViewRouter(store),
            ProfileAddStepSecondViewRouter(store),
            ProfileEmployeeDetailsViewRouter(store),
            TaxesViewRouter(store),
            TaxesAddViewRouter(store),
            SalaryViewRouter(store),
            SalaryAddViewRouter(store),
            FundViewRouter(store),
            FundAddViewRouter(store),
            InsuranceRoute(store),
            OrganizationRoute(store),
            CompleteViewRouter(store),
            MyprofileViewRouter(store),
            MachineViewRouter(store),
            MachineAddViewRouter(store),
            MyCalendarViewRouter(store),
            CycleViewRouter(store),
            CycleAddViewRouter(store),
            RuleViewRouter(store),
            RuleLeaveAddViewRouter(store),
            RuleAddViewRouter(store),
            CalendarViewRouter(store),
            CalendarAddViewRouter(store),
            SolutionViewRouter(store),
            SolutionAddViewRouter(store),
            SolutionFlowDesignViewRouter(store),
            StartViewRouter(store),
            StartApprovalViewRouter(store),
            HistoryViewRouter(store),
            DetailsViewRouter(store),
            PendingViewRouter(store),
            ApproveViewRouter(store),
            SignedViewRouter(store),
            SignedDetailsViewRouter(store),
            CopytoViewRouter(store),
            CopytoDetailsViewRouter(store),
            MyWorkmateViewRouter(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                const coreLayout = require('../layouts/CoreLayout').default
                const reducer = require('../layouts/CoreLayout/reducers').default

                injectReducer(store, {
                    "key": 'coreLayout',
                    reducer
                })
                cb(null, coreLayout)
            }, 'coreLayout')
        }
    },
    {
        "path": '/hrs',
        "indexRoute": LoginRoute(store),
        "childRoutes": [
            LoginRoute(store),
            AccessDeniedRoute,
            DingdingRoute(store),
            AuthRoute(store),
            JumpViewRouter(store)
        ],
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                const normalLayout = require('../layouts/NormalLayout').default
                const reducer = require('../layouts/NormalLayout/reducer').default

                injectReducer(store, {
                    "key": 'normalLayout',
                    reducer
                })
                cb(null, normalLayout)
            }, 'normalLayout')
        }
    }
]
export default createRoutes